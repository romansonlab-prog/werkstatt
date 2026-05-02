const CACHE = "werkflow-v4";
const ASSETS = [
  "/bg-truck.png",
  "/manifest-dashboard.json",
  "/manifest-werkstatt.json",
  "/manifest-waschhalle.json",
  "/manifest-stapler.json",
  "/manifest-fahrer.json",
];

// HTML-страницы намеренно НЕ кешируем при install — они пойдут network-first.
// Это гарантирует, что любая правка werkstatt.html / dashboard.html и т.д.
// долетит до пользователя при следующем запросе, а не застрянет в кеше.

self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) {
      // Кешируем по одному, чтобы один битый ассет не убивал весь install.
      return Promise.all(
        ASSETS.map(function(url) {
          return c.add(url).catch(function(err) {
            console.warn("[SW] skip caching", url, err);
          });
        })
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; })
            .map(function(k) { return caches.delete(k); })
      );
    }).then(function() {
      return self.clients.claim();
    }).then(function() {
      // Говорим всем открытым вкладкам: я новый, перезагрузись.
      return self.clients.matchAll({ type: "window" }).then(function(clients) {
        clients.forEach(function(client) {
          client.postMessage({ type: "SW_UPDATED", version: CACHE });
        });
      });
    })
  );
});

self.addEventListener("message", function(e) {
  if (e.data && e.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", function(e) {
  var req = e.request;
  var url = new URL(req.url);

  // Supabase — всегда напрямую в сеть, никакого кеша.
  if (url.hostname.indexOf("supabase.co") !== -1) {
    return;
  }

  // Только GET кешируем.
  if (req.method !== "GET") {
    return;
  }

  var isHTML =
    req.mode === "navigate" ||
    req.destination === "document" ||
    url.pathname.endsWith(".html") ||
    url.pathname === "/";

  var isJS = url.pathname.endsWith(".js");

  // NETWORK-FIRST для HTML и JS — это лечит проблему "старый werkstatt.html в кеше".
  // Свежая версия идёт в кеш, но при онлайне всегда тянем сеть.
  if (isHTML || isJS) {
    e.respondWith(
      fetch(req, { cache: "no-store" })
        .then(function(response) {
          if (response && response.status === 200 && response.type === "basic") {
            var clone = response.clone();
            caches.open(CACHE).then(function(c) { c.put(req, clone); });
          }
          return response;
        })
        .catch(function() {
          // Сети нет — отдаём что есть в кеше как fallback.
          return caches.match(req);
        })
    );
    return;
  }

  // CACHE-FIRST для статики (картинки, манифесты, иконки).
  e.respondWith(
    caches.match(req).then(function(cached) {
      return cached || fetch(req).then(function(response) {
        if (response && response.status === 200 && response.type === "basic") {
          var clone = response.clone();
          caches.open(CACHE).then(function(c) { c.put(req, clone); });
        }
        return response;
      });
    }).catch(function() {
      return caches.match(req);
    })
  );
});
