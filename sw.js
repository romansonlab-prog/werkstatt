const CACHE = "werkflow-v3";
const ASSETS = [
  "/bg-truck.png",
  "/dashboard.html",
  "/werkstatt.html",
  "/waschhalle.html",
  "/stapler.html",
  "/fahrer.html",
  "/manifest-dashboard.json",
  "/manifest-werkstatt.json",
  "/manifest-waschhalle.json",
  "/manifest-stapler.json",
  "/manifest-fahrer.json",
];

self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) {
      return c.addAll(ASSETS);
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
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function(e) {
  // Network first — always get fresh data from Supabase
  if (e.request.url.includes("supabase.co")) {
    return;
  }
  // Cache first for static assets
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request).then(function(response) {
        if (response && response.status === 200 && response.type === "basic") {
          var clone = response.clone();
          caches.open(CACHE).then(function(c) { c.put(e.request, clone); });
        }
        return response;
      });
    }).catch(function() {
      return caches.match(e.request);
    })
  );
});
