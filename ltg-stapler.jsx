import { useState } from "react";

// -- Supabase --
const SB_URL = "https://vtswzvrflqoueowylidy.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0c3d6dnJmbHFvdWVvd3lsaWR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0OTY4NTEsImV4cCI6MjA5MjA3Mjg1MX0.xfsewg1ZGW4UDlNJAAYR-wwXStcVJIWOyCAOavuxnRI";
const sbInsert = async (table, data) => {
  try {
    await fetch(SB_URL + "/rest/v1/" + table, {
      method: "POST",
      headers: { "apikey": SB_KEY, "Authorization": "Bearer " + SB_KEY,
        "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify(data)
    });
  } catch(e) { console.error("sb:", e); }
};



const C = {
  bg:      "#0f1117",
  surface: "#1a1d27",
  border:  "#2e3350",
  navy:    "#1a2744",
  orange:  "#f97316",
  red:     "#dc2626",
  yellow:  "#d97706",
  green:   "#16a34a",
  blue:    "#3b82f6",
  white:   "#f1f5f9",
  gray3:   "#94a3b8",
  gray5:   "#64748b",
};

const LOCATIONS = [
  { id:"hoc1", name:"HOC 1", contact:"Lager HOC 1", phone:"+49 6205 2092-100" },
  { id:"hoc2", name:"HOC 2", contact:"Lager HOC 2", phone:"+49 6205 2092-101" },
  { id:"hoc3", name:"HOC 3", contact:"Lager HOC 3", phone:"+49 6205 2092-102" },
  { id:"hoc4", name:"HOC 4", contact:"Lager HOC 4", phone:"+49 6205 2092-103" },
  { id:"hoc5", name:"HOC 5", contact:"Lager HOC 5", phone:"+49 6205 2092-104" },
  { id:"jd",   name:"John Deere Bruchsal", contact:"Schichtleiter", phone:"+49 7251 000-000" },
];

const FORKLIFTS = [
  { id:"stg019", name:"STG-019", brand:"Linde H35",   loc:"hoc4" },
  { id:"stg044", name:"STG-044", brand:"Still RX60",  loc:"hoc2" },
  { id:"stg107", name:"STG-107", brand:"Linde E25",   loc:"hoc1" },
  { id:"stg221", name:"STG-221", brand:"Toyota 8FBN", loc:"hoc3" },
  { id:"stg305", name:"STG-305", brand:"Jungheinrich", loc:"hoc5" },
  { id:"stg401", name:"STG-401", brand:"Linde H20",   loc:"jd"   },
];

const T = {
  de: {
    title:"Stapler Störung",
    subtitle:"LTG Hockenheim",
    selectLocation:"Standort wählen",
    selectForklift:"Stapler wählen",
    describeIssue:"Problem beschreiben",
    urgency:"Dringlichkeit",
    urgent:"🔴 DRINGEND — Arbeit steht still",
    canWait:"🟡 Kann warten",
    yourName:"Ihr Name / Kontakt",
    photo:"Foto aufnehmen",
    send:"STÖRUNG MELDEN",
    sent:"Gesendet!",
    sentDesc:"Werkstatt und Schef wurden benachrichtigt",
    newReport:"Neue Meldung",
    placeholder:"z.B. Stapler fährt nicht an, Hydraulik defekt...",
    namePlaceholder:"Name und Telefon",
    locationLabel:"Standort",
    forkliftLabel:"Stapler",
    required:"* Pflichtfeld",
    sending:"Wird gesendet...",
    contact:"Ansprechpartner vor Ort",
  },
  ru: {
    title:"Поломка погрузчика",
    subtitle:"LTG Хокенхайм",
    selectLocation:"Выберите склад",
    selectForklift:"Выберите погрузчик",
    describeIssue:"Описание проблемы",
    urgency:"Срочность",
    urgent:"🔴 СРОЧНО — работа стоит",
    canWait:"🟡 Может подождать",
    yourName:"Ваше имя / контакт",
    photo:"Сделать фото",
    send:"СООБЩИТЬ О ПОЛОМКЕ",
    sent:"Отправлено!",
    sentDesc:"Механики и шеф уведомлены",
    newReport:"Новое сообщение",
    placeholder:"Например: погрузчик не заводится, течёт масло...",
    namePlaceholder:"Имя и телефон",
    locationLabel:"Склад",
    forkliftLabel:"Погрузчик",
    required:"* обязательное поле",
    sending:"Отправляется...",
    contact:"Контактное лицо на месте",
  },
  en: {
    title:"Forklift Breakdown",
    subtitle:"LTG Hockenheim",
    selectLocation:"Select location",
    selectForklift:"Select forklift",
    describeIssue:"Describe the problem",
    urgency:"Urgency",
    urgent:"🔴 URGENT — work stopped",
    canWait:"🟡 Can wait",
    yourName:"Your name / contact",
    photo:"Take photo",
    send:"REPORT BREAKDOWN",
    sent:"Sent!",
    sentDesc:"Workshop and management notified",
    newReport:"New report",
    placeholder:"E.g. forklift won't start, hydraulics leaking...",
    namePlaceholder:"Name and phone",
    locationLabel:"Location",
    forkliftLabel:"Forklift",
    required:"* required",
    sending:"Sending...",
    contact:"On-site contact person",
  },
  uk: {
    title:"Поломка навантажувача",
    subtitle:"LTG Хокенхайм",
    selectLocation:"Оберіть склад",
    selectForklift:"Оберіть навантажувач",
    describeIssue:"Опис проблеми",
    urgency:"Терміновість",
    urgent:"🔴 ТЕРМІНОВО — робота зупинилась",
    canWait:"🟡 Може зачекати",
    yourName:"Ваше ім'я / контакт",
    photo:"Зробити фото",
    send:"ПОВІДОМИТИ ПРО ПОЛОМКУ",
    sent:"Надіслано!",
    sentDesc:"Механіки та шеф повідомлені",
    newReport:"Нове повідомлення",
    placeholder:"Наприклад: навантажувач не заводиться...",
    namePlaceholder:"Ім'я та телефон",
    locationLabel:"Склад",
    forkliftLabel:"Навантажувач",
    required:"* обов'язкове поле",
    sending:"Надсилається...",
    contact:"Контактна особа на місці",
  },
  ro: {
    title:"Defectiune Stivuitor",
    subtitle:"LTG Hockenheim",
    selectLocation:"Selectati locatia",
    selectForklift:"Selectati stivuitorul",
    describeIssue:"Descrieti problema",
    urgency:"Urgenta",
    urgent:"🔴 URGENT — lucrul s-a oprit",
    canWait:"🟡 Poate astepta",
    yourName:"Numele dvs / contact",
    photo:"Faceti o poza",
    send:"RAPORTEAZA DEFECTIUNEA",
    sent:"Trimis!",
    sentDesc:"Atelierul si conducerea au fost notificate",
    newReport:"Raport nou",
    placeholder:"Ex: stivuitorul nu porneste...",
    namePlaceholder:"Nume si telefon",
    locationLabel:"Locatie",
    forkliftLabel:"Stivuitor",
    required:"* obligatoriu",
    sending:"Se trimite...",
    contact:"Persoana de contact",
  },
  hu: {
    title:"Targonca Meghibasodas",
    subtitle:"LTG Hockenheim",
    selectLocation:"Helyszin kivalasztasa",
    selectForklift:"Targonca kivalasztasa",
    describeIssue:"Problema leirasa",
    urgency:"Surgosseg",
    urgent:"🔴 SURGOS — a munka megallt",
    canWait:"🟡 Var hat",
    yourName:"Neve / kapcsolat",
    photo:"Fenykep keszitese",
    send:"MEGHIBASODAS BEJELENTESE",
    sent:"Elkuldve!",
    sentDesc:"A muhely es a vezetes ertesitve",
    newReport:"Uj jelentes",
    placeholder:"Pl: a targonca nem indul...",
    namePlaceholder:"Nev es telefon",
    locationLabel:"Helyszin",
    forkliftLabel:"Targonca",
    required:"* kotelezo",
    sending:"Kuldes...",
    contact:"Helyszini kapcsolattarto",
  },
  cs: {
    title:"Porucha Voziku",
    subtitle:"LTG Hockenheim",
    selectLocation:"Vyberte misto",
    selectForklift:"Vyberte vozik",
    describeIssue:"Popis problemu",
    urgency:"Nalejhavost",
    urgent:"🔴 NALEJHAVE — prace stoji",
    canWait:"🟡 Muze pockat",
    yourName:"Vase jmeno / kontakt",
    photo:"Vyfotit",
    send:"NAHLASIT PORUCHU",
    sent:"Odeslano!",
    sentDesc:"Dilna a vedeni byli informovani",
    newReport:"Nova zprava",
    placeholder:"Napr: vozik nestartuje...",
    namePlaceholder:"Jmeno a telefon",
    locationLabel:"Misto",
    forkliftLabel:"Vozik",
    required:"* povinne",
    sending:"Odesilani...",
    contact:"Kontaktni osoba na miste",
  },
};

const LANGS = [
  { code:"de", flag:"🇩🇪" },
  { code:"ru", flag:"🇷🇺" },
  { code:"en", flag:"🇬🇧" },
  { code:"uk", flag:"🇺🇦" },
  { code:"ro", flag:"🇷🇴" },
  { code:"hu", flag:"🇭🇺" },
  { code:"cs", flag:"🇨🇿" },
];

function LTGLogo() {
  return (
    <svg width="72" height="26" viewBox="0 0 120 44" fill="none">
      <text x="0" y="32" fontFamily="Arial Black, sans-serif"
        fontWeight="900" fontSize="36" fill="#ffffff" letterSpacing="-1">LTG</text>
      <rect x="0" y="37" width="108" height="5" fill="#e2001a" rx="1"/>
    </svg>
  );
}

export default function App() {
  const [lang, setLang] = useState("de");
  const [step, setStep] = useState("form"); // form | sent
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    location: "", forklift: "", description: "",
    urgency: "", contactName: "", photos: [],
  });

  const t = T[lang];
  const loc = LOCATIONS.find(l => l.id === form.location);
  const forkliftsForLoc = form.location
    ? FORKLIFTS.filter(f => f.loc === form.location)
    : FORKLIFTS;

  const canSubmit = form.location && form.forklift && form.description && form.urgency && form.contactName;

  const handlePhoto = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    Promise.all(files.map(file => new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = ev => resolve(ev.target.result);
      reader.readAsDataURL(file);
    }))).then(results => setForm(f => ({ ...f, photos: [...f.photos, ...results] })));
  };

  const removePhoto = (idx) => setForm(f => ({ ...f, photos: f.photos.filter((_,i) => i !== idx) }));

  const [staplerAlertId, setStaplerAlertId] = useState(null);
  const [staplerStatus, setStaplerStatus] = useState("open");

  const handleSubmit = function() {
    if (!canSubmit) return;
    setSending(true);
    var alertId = "ST" + Date.now();
    setStaplerAlertId(alertId);
    setStaplerStatus("open");
    sbInsert("alerts", {
      id: alertId,
      type: form.urgency === "urgent" ? "breakdown" : "other",
      plate: form.forklift || null,
      location: form.location || "",
      description: form.description || "",
      urgency: form.urgency || "wait",
      sender: form.contactName || "stapler",
      sender_app: "stapler",
      status: "open",
    }).catch(function(e){ console.error("stapler:", e); });
    setSending(false);
    setStep("sent");
    var poll = setInterval(function() {
      fetch(SB_URL + "/rest/v1/alerts?id=eq." + alertId + "&select=status", {
        headers: { "apikey": SB_KEY, "Authorization": "Bearer " + SB_KEY }
      }).then(function(r){ return r.json(); })
        .then(function(d){
          if (d && d[0]) {
            setStaplerStatus(d[0].status);
            if (d[0].status === "done") clearInterval(poll);
          }
        }).catch(function(){});
    }, 10000);
  };

  const reset = () => {
    setStep("form");
    setForm({ location:"", forklift:"", description:"", urgency:"", contactName:"", photos:[] });
  };

  if (step === "sent") {
    const isUrgent = form.urgency === "urgent";
    return (
      <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'DM Sans','Segoe UI',sans-serif",
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        padding:24, color:C.white }}>
        <div style={{ width:"100%", maxWidth:420, textAlign:"center" }}>
          <div style={{ fontSize:80, marginBottom:16 }}>{isUrgent ? "🚨" : "✅"}</div>
          <div style={{ fontSize:24, fontWeight:900, marginBottom:8,
            color: isUrgent ? C.red : C.green }}>
            {t.sent}
          </div>
          <div style={{ fontSize:15, color:C.gray3, marginBottom:16 }}>
            {t.sentDesc}
          </div>
          <div style={{ background: staplerStatus === "done" ? "#16a34a22" : staplerStatus === "inProgress" ? "#f59e0b22" : "#3b82f622",
            border: "1px solid " + (staplerStatus === "done" ? "#22c55e" : staplerStatus === "inProgress" ? "#f59e0b" : "#3b82f6"),
            borderRadius:10, padding:"12px 16px", marginBottom:24 }}>
            <div style={{ fontSize:13, fontWeight:700,
              color: staplerStatus === "done" ? "#22c55e" : staplerStatus === "inProgress" ? "#f59e0b" : "#60a5fa" }}>
              {staplerStatus === "done" ? "[+] Erledigt" :
               staplerStatus === "inProgress" ? "Mechaniker in Arbeit..." : "Gesendet - warte auf Mechaniker..."}
            </div>
          </div>

          <div style={{ background:C.surface, border:"1px solid "+C.border,
            borderRadius:16, padding:20, marginBottom:24, textAlign:"left" }}>
            <div style={{ display:"flex", gap:12, marginBottom:12 }}>
              <span style={{ background: isUrgent ? C.red+"22" : C.yellow+"22",
                color: isUrgent ? C.red : C.yellow,
                borderRadius:20, padding:"4px 12px", fontSize:13, fontWeight:700 }}>
                {isUrgent ? "🔴 DRINGEND" : "🟡 Kann warten"}
              </span>
            </div>
            <div style={{ fontSize:14, color:C.gray3, marginBottom:6 }}>
              <strong style={{ color:C.white }}>
                {(FORKLIFTS.find(f=>f.id===form.forklift) || {}).name}
              </strong>
              {" — "}{loc ? loc.name : ""}
            </div>
            <div style={{ fontSize:13, color:C.gray5 }}>{form.description}</div>
          </div>

          {loc && (
            <div style={{ background:C.navy, border:"1px solid "+C.border,
              borderRadius:12, padding:16, marginBottom:24, textAlign:"left" }}>
              <div style={{ fontSize:12, color:C.gray5, marginBottom:8,
                textTransform:"uppercase", letterSpacing:"0.5px" }}>
                {t.contact}
              </div>
              <div style={{ fontWeight:700, marginBottom:4 }}>{loc.contact}</div>
              <div style={{ fontSize:14, color:C.orange }}>{loc.phone}</div>
            </div>
          )}

          <button onClick={reset}
            style={{ width:"100%", background:C.orange, color:"#000",
              border:"none", borderRadius:12, padding:"16px 0",
              fontWeight:900, fontSize:16, cursor:"pointer" }}>
            {t.newReport}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight:"100vh", background:C.bg,
      fontFamily:"'DM Sans','Segoe UI',sans-serif", color:C.white }}>

      {/* Header */}
      <div style={{ background:C.navy, borderBottom:"1px solid "+C.border,
        padding:"0 20px", height:56,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        position:"sticky", top:0, zIndex:100 }}>
        <LTGLogo />
        <div style={{ display:"flex", gap:3, background:"#243258", borderRadius:10, padding:3 }}>
          {LANGS.map(l => (
            <button key={l.code} onClick={() => setLang(l.code)}
              style={{ padding:"4px 7px", borderRadius:7, border:"none",
                cursor:"pointer", fontSize:13,
                background: lang===l.code ? C.orange : "transparent",
                opacity: lang===l.code ? 1 : 0.5, transition:"all 0.15s" }}>
              {l.flag}
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div style={{ background:"linear-gradient(135deg, #1a2744 0%, #111a30 100%)",
        padding:"24px 20px 20px", textAlign:"center",
        borderBottom:"1px solid "+C.border }}>
        <div style={{ fontSize:32, marginBottom:8 }}>🏗</div>
        <div style={{ fontSize:20, fontWeight:900, letterSpacing:"-0.5px" }}>{t.title}</div>
        <div style={{ fontSize:13, color:C.gray5, marginTop:4 }}>{t.subtitle}</div>
      </div>

      {/* Form */}
      <div style={{ padding:"20px 16px", maxWidth:500, margin:"0 auto" }}>

        {/* Location */}
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:12, fontWeight:700, color:C.gray3,
            textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:8 }}>
            {t.locationLabel}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {LOCATIONS.map(l => (
              <button key={l.id} onClick={() => setForm(f => ({...f, location:l.id, forklift:""}))}
                style={{ padding:"12px 8px", borderRadius:10, textAlign:"center",
                  border:"1px solid "+(form.location===l.id ? C.orange : C.border),
                  background: form.location===l.id ? C.orange+"22" : C.surface,
                  color: form.location===l.id ? C.orange : C.gray3,
                  fontWeight:700, fontSize:13, cursor:"pointer",
                  transition:"all 0.15s" }}>
                {l.name}
              </button>
            ))}
          </div>
        </div>

        {/* Forklift */}
        {form.location && (
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:12, fontWeight:700, color:C.gray3,
              textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:8 }}>
              {t.forkliftLabel}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {forkliftsForLoc.map(fork => (
                <button key={fork.id} onClick={() => setForm(f => ({...f, forklift:fork.id}))}
                  style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                    padding:"12px 16px", borderRadius:10,
                    border:"1px solid "+(form.forklift===fork.id ? C.orange : C.border),
                    background: form.forklift===fork.id ? C.orange+"22" : C.surface,
                    cursor:"pointer", transition:"all 0.15s" }}>
                  <div style={{ textAlign:"left" }}>
                    <div style={{ fontWeight:800, fontSize:15,
                      color: form.forklift===fork.id ? C.orange : C.white }}>
                      {fork.name}
                    </div>
                    <div style={{ fontSize:12, color:C.gray5, marginTop:2 }}>{fork.brand}</div>
                  </div>
                  {form.forklift===fork.id && (
                    <span style={{ fontSize:20 }}>✅</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Urgency */}
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:12, fontWeight:700, color:C.gray3,
            textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:8 }}>
            {t.urgency}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {[
              { k:"urgent",   label:t.urgent,   color:C.red,    bg:C.red+"22"    },
              { k:"canwait",  label:t.canWait,  color:C.yellow, bg:C.yellow+"22" },
            ].map(opt => (
              <button key={opt.k} onClick={() => setForm(f => ({...f, urgency:opt.k}))}
                style={{ padding:"14px 18px", borderRadius:12, textAlign:"left",
                  border:"1px solid "+(form.urgency===opt.k ? opt.color : C.border),
                  background: form.urgency===opt.k ? opt.bg : C.surface,
                  color: form.urgency===opt.k ? opt.color : C.gray3,
                  fontWeight:700, fontSize:14, cursor:"pointer",
                  transition:"all 0.15s" }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:12, fontWeight:700, color:C.gray3,
            textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:8 }}>
            {t.describeIssue} *
          </div>
          <textarea value={form.description}
            onChange={e => setForm(f => ({...f, description:e.target.value}))}
            placeholder={t.placeholder}
            style={{ width:"100%", background:C.surface, border:"1px solid "+C.border,
              borderRadius:10, padding:"12px 14px", color:C.white,
              fontSize:14, resize:"vertical", minHeight:90,
              fontFamily:"inherit", outline:"none", boxSizing:"border-box" }} />
        </div>

        {/* Contact name */}
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:12, fontWeight:700, color:C.gray3,
            textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:8 }}>
            {t.yourName} *
          </div>
          <input value={form.contactName}
            onChange={e => setForm(f => ({...f, contactName:e.target.value}))}
            placeholder={t.namePlaceholder}
            style={{ width:"100%", background:C.surface, border:"1px solid "+C.border,
              borderRadius:10, padding:"12px 14px", color:C.white,
              fontSize:14, outline:"none", boxSizing:"border-box",
              fontFamily:"inherit" }} />
        </div>

        {/* Photo */}
        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:12, fontWeight:700, color:C.gray3,
            textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:8 }}>
            {t.photo}
          </div>
          <label style={{ display:"flex", alignItems:"center", justifyContent:"center",
            gap:10, border:"2px dashed "+C.border, borderRadius:10,
            padding:"18px 20px", cursor:"pointer", color:C.gray3,
            fontSize:14, fontWeight:600, background:C.surface }}>
            <span style={{ fontSize:24 }}>📷</span>
            <span>{t.photo}</span>
            <input type="file" accept="image/*" multiple style={{ display:"none" }}
              onChange={handlePhoto} />
          </label>
          {form.photos.length > 0 && (
            <div style={{ display:"flex", gap:8, marginTop:10, flexWrap:"wrap" }}>
              {form.photos.map((src, i) => (
                <div key={i} style={{ position:"relative" }}>
                  <img src={src} alt=""
                    style={{ width:90, height:70, objectFit:"cover",
                      borderRadius:8, border:"1px solid "+C.border, display:"block" }} />
                  <button onClick={() => removePhoto(i)}
                    style={{ position:"absolute", top:-6, right:-6, width:22, height:22,
                      borderRadius:"50%", background:C.red, border:"none",
                      color:"#fff", fontSize:13, cursor:"pointer",
                      display:"flex", alignItems:"center", justifyContent:"center" }}>
                    x
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button onClick={handleSubmit} disabled={!canSubmit || sending}
          style={{ width:"100%", borderRadius:14, padding:"18px 0",
            fontWeight:900, fontSize:17, border:"none", cursor: canSubmit ? "pointer" : "not-allowed",
            background: !canSubmit ? C.border
              : form.urgency === "urgent" ? C.red : C.orange,
            color: !canSubmit ? C.gray5 : "#fff",
            opacity: canSubmit ? 1 : 0.6,
            letterSpacing:"0.5px", transition:"all 0.2s",
            boxShadow: canSubmit && form.urgency==="urgent"
              ? "0 4px 20px "+C.red+"66" : "none" }}>
          {sending ? t.sending : t.send}
        </button>

        <div style={{ textAlign:"center", fontSize:12, color:C.gray5, marginTop:12 }}>
          {t.required}
        </div>
      </div>
    </div>
  );
}
