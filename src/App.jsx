import { useState, useRef, useEffect } from "react";

// ─── PRICE LIST (subcategorized, alphabetized) ──────────
const CREW_LIST = [
  { role: "Art Director", sub: "Creative & Direction", S: 500, G: 1000, D: 2500 },
  { role: "Casting Director", sub: "Creative & Direction", S: 600, G: 403, D: 900 },
  { role: "Creative Director", sub: "Creative & Direction", S: 800, G: 1500, D: 4000 },
  { role: "Director", sub: "Creative & Direction", S: 1000, G: 2000, D: 5000 },
  { role: "Producer", sub: "Creative & Direction", S: 750, G: 1200, D: 1800 },
  { role: "Production Design/Art Dir", sub: "Creative & Direction", S: 500, G: 1000, D: 2500 },
  { role: "Scriptwriting/Concept Dev", sub: "Creative & Direction", S: 600, G: 1200, D: 3000 },
  { role: "Camera Operator", sub: "Camera & Lighting", S: 800, G: 1500, D: 3500 },
  { role: "Cinematographer", sub: "Camera & Lighting", S: 1500, G: 1800, D: 3000 },
  { role: "Digitech", sub: "Camera & Lighting", S: 500, G: 1000, D: 1500 },
  { role: "Director of Photography (DP)", sub: "Camera & Lighting", S: 1200, G: 2500, D: 6000 },
  { role: "Gaffer (Lighting Lead)", sub: "Camera & Lighting", S: 400, G: 800, D: 2000 },
  { role: "Grip (Camera Support)", sub: "Camera & Lighting", S: 350, G: 700, D: 1800 },
  { role: "Photographer", sub: "Camera & Lighting", S: 800, G: 1400, D: 2500 },
  { role: "Videographer", sub: "Camera & Lighting", S: 800, G: 1200, D: 2000 },
  { role: "Composer", sub: "Audio", S: 800, G: 1500, D: 4000 },
  { role: "Sound Designer", sub: "Audio", S: 600, G: 1200, D: 3000 },
  { role: "Sound Engineer", sub: "Audio", S: 400, G: 800, D: 2000 },
  { role: "Sound Mixer", sub: "Audio", S: 450, G: 900, D: 2200 },
  { role: "Voice-over Artist", sub: "Audio", S: 600, G: 1200, D: 3000 },
  { role: "Extras", sub: "Styling & Talent", S: 200, G: 500, D: 750 },
  { role: "Hair & Makeup Artist", sub: "Styling & Talent", S: 600, G: 800, D: 2000 },
  { role: "Model", sub: "Styling & Talent", S: 200, G: 500, D: 1000 },
  { role: "Set Designer", sub: "Styling & Talent", S: 700, G: 1000, D: 1400 },
  { role: "Wardrobe Stylist", sub: "Styling & Talent", S: 600, G: 800, D: 2000 },
  { role: "Colorist", sub: "Post-Production", S: 500, G: 1000, D: 2500 },
  { role: "Editor (Photo)", sub: "Post-Production", S: 400, G: 700, D: 1500 },
  { role: "Editor (Post Production)", sub: "Post-Production", S: 1000, G: 1500, D: 2500 },
  { role: "Editor (Video)", sub: "Post-Production", S: 1000, G: 1500, D: 1800 },
  { role: "Motion Graphics Designer", sub: "Post-Production", S: 500, G: 1000, D: 2500 },
  { role: "Photo Retouch", sub: "Post-Production", S: 400, G: 600, D: 1000 },
  { role: "VFX Artist", sub: "Post-Production", S: 500, G: 800, D: 1500 },
  { role: "AV", sub: "Production Support", S: 400, G: 750, D: 1200 },
  { role: "Location Scout", sub: "Production Support", S: 500, G: 1000, D: 1500 },
  { role: "Pre-Production Coordinator", sub: "Production Support", S: 700, G: 1400, D: 3500 },
  { role: "Production Assistant", sub: "Production Support", S: 200, G: 400, D: 1000 },
];
const EQUIP_LIST = [
  { role: "Camera Package", sub: "Camera & Lenses", S: 350, G: 800, D: 2000 },
  { role: "Gimbal / Stabilizer", sub: "Camera & Lenses", S: 150, G: 350, D: 800 },
  { role: "Lens Kit", sub: "Camera & Lenses", S: 200, G: 500, D: 1500 },
  { role: "Monitor / Playback", sub: "Camera & Lenses", S: 100, G: 300, D: 800 },
  { role: "Backdrops / Seamless", sub: "Lighting & Grip", S: 75, G: 200, D: 500 },
  { role: "Fog / Haze Machine", sub: "Lighting & Grip", S: 75, G: 200, D: 500 },
  { role: "Generator", sub: "Lighting & Grip", S: 200, G: 500, D: 1200 },
  { role: "Grip Package", sub: "Lighting & Grip", S: 150, G: 400, D: 1000 },
  { role: "Lighting Package", sub: "Lighting & Grip", S: 250, G: 600, D: 1800 },
  { role: "Audio Package", sub: "Audio & Tech", S: 150, G: 400, D: 1200 },
  { role: "Drone", sub: "Audio & Tech", S: 400, G: 800, D: 2000 },
  { role: "Hard Drive / Media Storage", sub: "Audio & Tech", S: 50, G: 150, D: 400 },
  { role: "Teleprompter", sub: "Audio & Tech", S: 150, G: 300, D: 600 },
  { role: "Walkie Talkies", sub: "Audio & Tech", S: 50, G: 100, D: 250 },
  { role: "HMU Supplies", sub: "Set & Styling", S: 100, G: 300, D: 800 },
  { role: "Props", sub: "Set & Styling", S: 300, G: 750, D: 1500 },
  { role: "Wardrobe / Styling Supplies", sub: "Set & Styling", S: 150, G: 400, D: 1000 },
  { role: "Craft Services / Catering", sub: "Logistics", S: 200, G: 500, D: 1500 },
  { role: "Equipment Rental", sub: "Logistics", S: 500, G: 1000, D: 2500 },
  { role: "Hotel", sub: "Logistics", S: 300, G: 600, D: 1000 },
  { role: "Insurance", sub: "Logistics", S: 500, G: 1000, D: 2500 },
  { role: "Kit Fee", sub: "Logistics", S: 400, G: 700, D: 1000 },
  { role: "Transportation / Vehicle", sub: "Logistics", S: 200, G: 500, D: 1500 },
];
const LOC_LIST = [
  { role: "On Sight Location", sub: "Venues", S: 400, G: 600, D: 1000 },
  { role: "Parking / Basecamp", sub: "Venues", S: 100, G: 300, D: 800 },
  { role: "Permit Fee", sub: "Venues", S: 200, G: 500, D: 1500 },
  { role: "Studio Rental", sub: "Venues", S: 800, G: 1500, D: 2400 },
  { role: "Travel & Accommodations", sub: "Travel", S: 400, G: 750, D: 1500 },
];

const PM = {};
[...CREW_LIST, ...EQUIP_LIST, ...LOC_LIST].forEach(p => { PM[p.role] = p; });
const lkP = (r, t) => PM[r]?.[t] || 0;
const groupOpts = list => {
  const subs = [...new Set(list.map(i => i.sub))];
  return subs.map(s => ({ sub: s, items: list.filter(i => i.sub === s).map(i => i.role) }));
};
const CG = groupOpts(CREW_LIST), EG = groupOpts(EQUIP_LIST), LG = groupOpts(LOC_LIST);

const DUR = [{ l: "1 Year", m: 1 }, { l: "3 Years", m: 1.5 }, { l: "Perpetual", m: 2 }];
const MEDIA = [
  { l: "Both - Digital + Print", m: 2, g: "all" },
  { l: "All Digital Media", m: 1.2, g: "digital" }, { l: "Company Website", m: 1, g: "digital" },
  { l: "Digital Posters", m: 0.5, g: "digital" },
  { l: "Internet Advertising", m: 0.75, g: "digital" }, { l: "Intranet", m: 0.2, g: "digital" },
  { l: "Mobile", m: 0.25, g: "digital" }, { l: "PR (Digital)", m: 0.25, g: "digital" },
  { l: "Regional Website", m: 0.75, g: "digital" }, { l: "Social Media", m: 0.75, g: "digital" },
  { l: "TV", m: 1, g: "digital" },
  { l: "All Print Media", m: 1, g: "print" }, { l: "Ambient", m: 0.25, g: "print" },
  { l: "Brochures", m: 0.5, g: "print" }, { l: "Collateral", m: 0.75, g: "print" },
  { l: "Direct Mail (Print)", m: 0.75, g: "print" }, { l: "International Media", m: 0.13, g: "print" },
  { l: "Marketing Aids", m: 0.15, g: "print" }, { l: "OOH (Out of Home)", m: 0.8, g: "print" },
  { l: "Packaging", m: 0.5, g: "print" }, { l: "POS (Point of Sale)", m: 0.5, g: "print" },
  { l: "Posters", m: 0.5, g: "print" }, { l: "PR (Print)", m: 0.2, g: "print" },
  { l: "Press", m: 0.75, g: "print" },
];
const REG = [
  { l: "Africa", m: 0.7 }, { l: "Asia (Excl Japan)", m: 1.5 }, { l: "Asia (Inc Japan)", m: 1.75 },
  { l: "Caribbean", m: 1 }, { l: "Central America", m: 1 }, { l: "Europe (EU)", m: 2 },
  { l: "Europe (Non EU)", m: 2.5 }, { l: "Europe", m: 3 }, { l: "Latin America", m: 2 },
  { l: "Middle East", m: 1.5 }, { l: "Nordics", m: 1.25 }, { l: "North America", m: 2.5 },
  { l: "Oceania/Australasia", m: 0.8 }, { l: "South America", m: 0.7 }, { l: "USA", m: 1.5 },
  { l: "Worldwide", m: 3 },
];
const BRATES = [
  { l: "Social Media / Small Digital", v: 500 }, { l: "Web / Email Campaign", v: 1000 },
  { l: "Regional Campaign", v: 2000 }, { l: "National Advertising", v: 3500 },
  { l: "Major Brand Campaign", v: 5000 }, { l: "Enterprise / Global", v: 10000 },
];
const TIER = {
  S: { l: "Silver", c: "from-slate-400 to-slate-300", bg: "bg-slate-500/20", bd: "border-slate-400/40", tx: "text-slate-300" },
  G: { l: "Gold", c: "from-amber-400 to-yellow-300", bg: "bg-amber-500/20", bd: "border-amber-400/40", tx: "text-amber-300" },
  D: { l: "Diamond", c: "from-cyan-300 to-blue-300", bg: "bg-cyan-500/20", bd: "border-cyan-400/40", tx: "text-cyan-300" },
};
const $ = n => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n || 0);
let _id = 0; const nid = () => ++_id;
const itemPrice = i => i.isCustom ? (i.customRate || 0) : lkP(i.role, i.tier);
const secTotal = items => items.reduce((s, i) => s + (i.qty || 0) * itemPrice(i), 0);

// ─── UI PRIMITIVES ──────────────────────────────────────
function NI({ value, onChange, placeholder = "0", className = "" }) {
  return <input type="number" min={0} value={value || ""} onChange={e => onChange(parseFloat(e.target.value) || 0)} placeholder={placeholder}
    className={`w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 transition-all placeholder:text-white/15 ${className}`} />;
}
function TI({ value, onChange, placeholder = "" }) {
  return <input type="text" value={value || ""} onChange={e => onChange(e.target.value)} placeholder={placeholder}
    className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 transition-all placeholder:text-white/15" />;
}
function Tog({ checked, onChange }) {
  return <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => onChange(!checked)}>
    <div className={`w-9 h-5 rounded-full transition-all relative flex-shrink-0 ${checked ? "bg-emerald-500" : "bg-white/10"}`}>
      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${checked ? "left-[18px]" : "left-0.5"}`} />
    </div>
    <span className={`text-[10px] font-medium uppercase tracking-wider ${checked ? "text-emerald-400" : "text-white/20"}`}>{checked ? "Booked" : "Pending"}</span>
  </div>;
}
function Card({ children, className = "" }) {
  return <div className={`bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 ${className}`}>{children}</div>;
}
function TS({ value, onChange }) {
  return <div className="flex flex-col items-center gap-0.5">
    <span className="text-white/15 text-[8px] uppercase tracking-widest">Tier</span>
    <div className="flex gap-0.5 bg-white/[0.04] rounded-lg p-0.5">
    {Object.entries(TIER).map(([k, c]) => <button key={k} onClick={() => onChange(k)}
      className={`relative rounded-md font-bold transition-all px-2 py-1 text-[11px] ${value === k ? `${c.bg} ${c.bd} border ${c.tx}` : "text-white/20 hover:text-white/35 border border-transparent"}`}>
      {k}{value === k && <span className={`absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br ${c.c}`} />}
    </button>)}
    </div>
  </div>;
}
function GDD({ value, onChange, groups, placeholder }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef(null);
  useEffect(() => { const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h); }, []);
  const ql = (q || "").toLowerCase();
  const f = groups.map(g => ({ ...g, items: g.items.filter(i => i.toLowerCase().includes(ql)) })).filter(g => g.items.length > 0);
  return <div ref={ref} className="relative">
    <input type="text" value={open ? q : (value || "")} onChange={e => { setQ(e.target.value); if (!open) setOpen(true); }}
      onFocus={() => { setOpen(true); setQ(value || ""); }} placeholder={placeholder}
      className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 transition-all placeholder:text-white/15 pr-6" />
    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white/15 text-[9px] pointer-events-none">{open ? "▲" : "▼"}</span>
    {open && <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-neutral-900/95 backdrop-blur border border-white/10 rounded-lg shadow-2xl shadow-black/60 max-h-64 overflow-y-auto">
      {f.map(g => <div key={g.sub}>
        <div className="px-3 pt-2.5 pb-1 sticky top-0 bg-neutral-900/95 z-10"><span className="text-white/20 text-[9px] uppercase tracking-widest font-semibold">{g.sub}</span></div>
        {g.items.map(o => <button key={o} onClick={() => { onChange(o); setQ(""); setOpen(false); }}
          className={`w-full text-left px-3 py-1.5 text-sm transition-colors hover:bg-purple-500/15 ${o === value ? "text-purple-300 bg-purple-500/10" : "text-white/55 hover:text-white"}`}>{o}</button>)}
      </div>)}
      {f.length === 0 && <div className="px-3 py-3 text-white/20 text-sm">No matches</div>}
    </div>}
  </div>;
}

// Budget row
function BRow({ item, up, rm, groups, isCrew }) {
  const p = itemPrice(item);
  const tot = (item.qty || 0) * p;
  return <div className="border-t border-white/[0.04] pt-2.5 first:border-0 first:pt-0">
    <div className="flex gap-2 items-center">
      <div className="flex-1 min-w-0">
        {item.isCustom ? <TI value={item.role} onChange={v => up("role", v)} placeholder="Custom item name..." />
          : <GDD value={item.role} onChange={v => up("role", v)} groups={groups} placeholder="Select..." />}
      </div>
      {!item.isCustom && <div className="flex-shrink-0"><TS value={item.tier} onChange={v => up("tier", v)} /></div>}
      <div className="w-14 flex-shrink-0"><NI value={item.qty} onChange={v => up("qty", v)} /></div>
      {item.isCustom
        ? <div className="w-20 flex-shrink-0"><NI value={item.customRate} onChange={v => up("customRate", v)} placeholder="$" /></div>
        : <div className="w-16 text-right flex-shrink-0"><span className="font-mono text-xs text-white/25">{p > 0 ? $(p) : ""}</span></div>}
      <div className="w-20 text-right flex-shrink-0"><span className={`font-mono text-sm ${tot > 0 ? "text-white/70" : "text-white/10"}`}>{tot > 0 ? $(tot) : "—"}</span></div>
      <div className="flex gap-0.5 flex-shrink-0">
        <button onClick={() => up("showNotes", !item.showNotes)} className={`p-1 rounded transition-colors ${item.showNotes ? "text-purple-400" : "text-white/10 hover:text-white/30"}`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4z"/></svg>
        </button>
        <button onClick={rm} className="text-white/10 hover:text-red-400 transition-colors text-sm p-1">×</button>
      </div>
    </div>
    {item.showNotes && <textarea value={item.notes || ""} onChange={e => up("notes", e.target.value)} placeholder="Notes..."
      className="w-full mt-2 bg-white/[0.08] border border-white/[0.08] rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-purple-400/30 resize-none h-14 placeholder:text-white/25" />}
    {isCrew && item.qty > 0 && item.role && <div className="mt-2 space-y-1.5">
      {Array.from({ length: item.qty }, (_, i) => {
        const m = item.members?.[i] || {};
        const uM = (f, v) => { const ms = [...(item.members || Array(item.qty).fill({}))]; ms[i] = { ...ms[i], [f]: v }; up("members", ms); };
        return <div key={i} className="flex gap-2 items-center ml-3 pl-3 border-l-2 border-purple-500/15">
          <span className="text-white/10 text-[10px] w-3">{i + 1}</span>
          <div className="flex-1"><TI value={m.name} onChange={v => uM("name", v)} placeholder="Crew member name..." /></div>
          <div className="w-20"><NI value={m.actual} onChange={v => uM("actual", v)} placeholder="Rate" /></div>
          <Tog checked={m.booked || false} onChange={v => uM("booked", v)} />
        </div>;
      })}
    </div>}
    {!isCrew && item.qty > 0 && (item.role || item.isCustom) && <div className="mt-2 flex gap-2 items-center ml-3 pl-3 border-l-2 border-white/[0.06]">
      <div className="flex-1"><NI value={item.actualRate} onChange={v => up("actualRate", v)} placeholder="Actual rate..." /></div>
      <Tog checked={item.booked || false} onChange={v => up("booked", v)} />
    </div>}
  </div>;
}

// Budget section
function BSec({ title, icon, color, items, setItems, groups, isCrew }) {
  const mk = (custom = false) => ({ id: nid(), role: "", qty: 0, tier: "S", notes: "", showNotes: false, members: [], booked: false, actualRate: 0, isCustom: custom, customRate: 0 });
  const up = (id, f, v) => setItems(items.map(i => i.id === id ? { ...i, [f]: v } : i));
  const total = secTotal(items);
  return <div className="mb-6">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2"><span className={`text-base ${color}`}>{icon}</span>
        <h3 className={`text-sm font-semibold uppercase tracking-wider ${color}`} style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{title}</h3></div>
      {total > 0 && <span className="font-mono text-sm text-white/35">{$(total)}</span>}
    </div>
    {items.length > 0 && <div className="space-y-1">
      <div className="hidden sm:flex gap-2 text-white/15 text-[9px] uppercase tracking-widest px-1 pb-1">
        <div className="flex-1">Item</div><div className="w-[88px] text-center">Tier</div><div className="w-14 text-center">Qty</div>
        <div className="w-16 text-right">Rate</div><div className="w-20 text-right">Total</div><div className="w-14"></div>
      </div>
      {items.map(item => <BRow key={item.id} item={item} up={(f, v) => up(item.id, f, v)} rm={() => setItems(items.filter(i => i.id !== item.id))} groups={groups} isCrew={isCrew} />)}
    </div>}
    <div className="flex gap-3 mt-3">
      <button onClick={() => setItems([...items, mk()])} className={`text-xs ${color} opacity-40 hover:opacity-100 transition-opacity flex items-center gap-1`}>
        <span className="text-base leading-none">+</span> Add {title.toLowerCase().replace(/s$/, "")}
      </button>
      <button onClick={() => setItems([...items, mk(true)])} className="text-xs text-white/20 hover:text-white/50 transition-opacity flex items-center gap-1">
        <span className="text-base leading-none">+</span> Custom item
      </button>
    </div>
  </div>;
}

// ─── PAGES ──────────────────────────────────────────────

function BudgetPage({ crew, setCrew, equip, setEquip, loc, setLoc, aPct, setAPct, cPct, setCPct }) {
  const prod = secTotal(crew) + secTotal(equip) + secTotal(loc);
  const fee = prod * (aPct / 100);
  const cont = prod * (cPct / 100);
  return <div>
    <div className="mb-6">
      <h2 style={{ fontFamily: "'Instrument Sans', sans-serif" }} className="text-xl font-bold text-white tracking-tight mb-1">Production Budget</h2>
      <p className="text-white/25 text-xs">Add items to each section. Assign crew names, set actual rates, and mark as booked when confirmed.</p>
    </div>
    <Card>
      <BSec title="Crew" icon="◉" color="text-purple-400" items={crew} setItems={setCrew} groups={CG} isCrew />
      <div className="border-t border-white/[0.06] my-5" />
      <BSec title="Equipment" icon="⬡" color="text-orange-400" items={equip} setItems={setEquip} groups={EG} isCrew={false} />
      <div className="border-t border-white/[0.06] my-5" />
      <BSec title="Locations" icon="◈" color="text-emerald-400" items={loc} setItems={setLoc} groups={LG} isCrew={false} />
      <div className="border-t border-white/[0.06] mt-6 pt-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-white/25 text-xs uppercase tracking-widest">Agency Fee %</span>
                <NI value={aPct} onChange={setAPct} placeholder="15" className="w-20" />
              </div>
              <p className="text-white/12 text-[10px]">Suggested agency fee between 15–30% based on project scope</p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-white/25 text-xs uppercase tracking-widest">Contingency %</span>
                <NI value={cPct} onChange={setCPct} placeholder="5" className="w-20" />
              </div>
              <p className="text-white/12 text-[10px]">Buffer for unexpected costs, typically 5–10%</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white/20 text-xs mb-1">Production {$(prod)} + Agency {$(fee)} + Contingency {$(cont)}</div>
            <div className="text-white/30 text-[10px] uppercase tracking-widest mb-0.5">Total Budget</div>
            <div className="text-2xl font-bold text-purple-400" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{$(prod + fee + cont)}</div>
          </div>
        </div>
      </div>
    </Card>
  </div>;
}

function UsagePage({ usage, setUsage }) {
  const up = (f, v) => setUsage({ ...usage, [f]: v });
  const dm = DUR.find(o => o.l === usage.duration)?.m || 0;
  const mm = MEDIA.find(o => o.l === usage.media)?.m || 0;
  const rm = REG.find(o => o.l === usage.region)?.m || 0;
  const fee = usage.baseRate * dm * mm * rm;
  const [custom, setCustom] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const mRef = useRef(null), rRef = useRef(null);
  useEffect(() => { const h = e => { if (mRef.current && !mRef.current.contains(e.target)) setMediaOpen(false); if (rRef.current && !rRef.current.contains(e.target)) setRegionOpen(false); }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h); }, []);

  return <div>
    <div className="mb-6">
      <h2 style={{ fontFamily: "'Instrument Sans', sans-serif" }} className="text-xl font-bold text-white tracking-tight mb-1">Usage Rights Calculator</h2>
      <p className="text-white/25 text-xs">Calculate licensing fees based on how the content will be used.</p>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <Card>
        <h3 className="text-white/35 text-xs uppercase tracking-widest mb-3">What type of project is this?</h3>
        <div className="space-y-1.5">
          {BRATES.map(o => <button key={o.l} onClick={() => { up("baseRate", o.v); setCustom(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all border flex justify-between ${!custom && usage.baseRate === o.v ? "bg-purple-500/15 text-purple-300 border-purple-400/30" : "text-white/35 border-white/[0.05] hover:border-white/15 hover:text-white/55"}`}>
            <span>{o.l}</span>
          </button>)}
          <button onClick={() => setCustom(true)} className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all border ${custom ? "bg-purple-500/15 text-purple-300 border-purple-400/30" : "text-white/35 border-white/[0.05] hover:border-white/15"}`}>Custom Amount</button>
          {custom && <NI value={usage.baseRate} onChange={v => up("baseRate", v)} placeholder="Enter base rate..." className="mt-1" />}
        </div>
      </Card>
      <div className="space-y-5">
        <Card>
          <h3 className="text-white/35 text-xs uppercase tracking-widest mb-3">Duration</h3>
          <div className="flex gap-2">{DUR.map(o => <button key={o.l} onClick={() => up("duration", o.l)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all border ${usage.duration === o.l ? "bg-purple-500/15 text-purple-300 border-purple-400/30" : "text-white/30 border-white/[0.05] hover:border-white/15"}`}>{o.l}</button>)}</div>
        </Card>
        <Card>
          <h3 className="text-white/35 text-xs uppercase tracking-widest mb-3">Media Type</h3>
          <div ref={mRef} className="relative">
            <button onClick={() => setMediaOpen(!mediaOpen)} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm border transition-all flex justify-between items-center ${usage.media ? "text-white border-white/10" : "text-white/20 border-white/[0.05]"}`}>
              <span className="truncate">{usage.media || "Select media type..."}</span><span className="text-white/15 text-[9px]">{mediaOpen ? "▲" : "▼"}</span>
            </button>
            {mediaOpen && <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-neutral-900/95 backdrop-blur border border-white/10 rounded-xl shadow-2xl shadow-black/60 max-h-64 overflow-y-auto">
              {MEDIA.filter(o => o.g === "all").map(o => <button key={o.l} onClick={() => { up("media", o.l); setMediaOpen(false); }} className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-purple-500/15 ${o.l === usage.media ? "text-purple-300 bg-purple-500/10" : "text-white/70"}`}>{o.l}</button>)}
              <div className="px-4 pt-3 pb-1"><span className="text-white/20 text-[9px] uppercase tracking-widest">Digital</span></div>
              {MEDIA.filter(o => o.g === "digital").map(o => <button key={o.l} onClick={() => { up("media", o.l); setMediaOpen(false); }} className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-purple-500/15 ${o.l === usage.media ? "text-purple-300 bg-purple-500/10" : "text-white/45"}`}>{o.l}</button>)}
              <div className="px-4 pt-3 pb-1"><span className="text-white/20 text-[9px] uppercase tracking-widest">Print</span></div>
              {MEDIA.filter(o => o.g === "print").map(o => <button key={o.l} onClick={() => { up("media", o.l); setMediaOpen(false); }} className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-purple-500/15 ${o.l === usage.media ? "text-purple-300 bg-purple-500/10" : "text-white/45"}`}>{o.l}</button>)}
            </div>}
          </div>
        </Card>
        <Card>
          <h3 className="text-white/35 text-xs uppercase tracking-widest mb-3">Region</h3>
          <div ref={rRef} className="relative">
            <button onClick={() => setRegionOpen(!regionOpen)} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm border transition-all flex justify-between items-center ${usage.region ? "text-white border-white/10" : "text-white/20 border-white/[0.05]"}`}>
              <span className="truncate">{usage.region || "Select region..."}</span><span className="text-white/15 text-[9px]">{regionOpen ? "▲" : "▼"}</span>
            </button>
            {regionOpen && <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-neutral-900/95 backdrop-blur border border-white/10 rounded-xl shadow-2xl shadow-black/60 max-h-52 overflow-y-auto">
              {REG.map(o => <button key={o.l} onClick={() => { up("region", o.l); setRegionOpen(false); }} className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-purple-500/15 ${o.l === usage.region ? "text-purple-300 bg-purple-500/10" : "text-white/45"}`}>{o.l}</button>)}
            </div>}
          </div>
        </Card>
      </div>
    </div>
    <Card className="mt-5">
      <div className="flex items-center justify-between">
        <div className="text-white/15 text-xs">{[usage.baseRate ? $(usage.baseRate) : "—", usage.duration || "—", usage.media || "—", usage.region || "—"].join("  ·  ")}</div>
        <div className="text-right">
          <div className="text-white/30 text-[10px] uppercase tracking-widest mb-0.5">Total Usage Fee</div>
          <div className="text-2xl font-bold text-purple-400" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{fee > 0 ? $(fee) : "Select all options above"}</div>
        </div>
      </div>
    </Card>
  </div>;
}

function DashPage({ crew, equip, loc, usage, aPct, cPct }) {
  const bC = secTotal(crew), bE = secTotal(equip), bL = secTotal(loc), bT = bC + bE + bL;
  const aC = crew.reduce((s, i) => s + (i.members || []).reduce((ms, m) => ms + (m?.booked ? (m?.actual || 0) : 0), 0), 0);
  const aE = equip.reduce((s, i) => s + (i.booked ? (i.actualRate || 0) * (i.qty || 0) : 0), 0);
  const aL = loc.reduce((s, i) => s + (i.booked ? (i.actualRate || 0) : 0), 0);
  const aT = aC + aE + aL;
  const dm = DUR.find(o => o.l === usage.duration)?.m || 0;
  const mm = MEDIA.find(o => o.l === usage.media)?.m || 0;
  const rm = REG.find(o => o.l === usage.region)?.m || 0;
  const uF = usage.baseRate * dm * mm * rm;
  const aF = bT * (aPct / 100);
  const cF = bT * (cPct / 100);
  const fin = bT + aF + cF + uF;
  const bkC = crew.reduce((s, i) => s + (i.members?.filter(m => m?.booked)?.length || 0), 0);
  const ttC = crew.reduce((s, i) => s + (i.members?.length || 0), 0);
  const bkE = equip.filter(i => i.booked).length, ttE = equip.filter(i => i.role || i.isCustom).length;
  const bkL = loc.filter(i => i.booked).length, ttL = loc.filter(i => i.role || i.isCustom).length;
  const rows = [
    { l: "Crew", b: bC, a: aC, bk: `${bkC}/${ttC}`, color: "text-purple-400" },
    { l: "Equipment", b: bE, a: aE, bk: `${bkE}/${ttE}`, color: "text-orange-400" },
    { l: "Locations", b: bL, a: aL, bk: `${bkL}/${ttL}`, color: "text-emerald-400" },
  ];
  const mx = Math.max(bT, aT, 1);
  const hasData = bT > 0 || aT > 0;

  return <div>
    <div className="mb-6"><h2 style={{ fontFamily: "'Instrument Sans', sans-serif" }} className="text-xl font-bold text-white tracking-tight">Production Estimate</h2></div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {[{ l: "Estimate", v: bT, c: "text-white" }, { l: "Confirmed", v: aT, c: "text-white" }, { l: "Usage Fee", v: uF, c: uF > 0 ? "text-white" : "text-white/15" }, { l: "Final Project", v: fin, c: "text-purple-400" }].map(s =>
        <Card key={s.l}><div className="text-white/30 text-[10px] uppercase tracking-widest mb-1">{s.l}</div>
          <div className={`text-lg font-bold ${s.c}`} style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{$(s.v)}</div></Card>)}
    </div>
    {hasData ? <>
      <Card className="mb-6">
        <h3 className="text-white/30 text-xs uppercase tracking-widest mb-4">Budget vs Confirmed</h3>
        <div className="space-y-4">{rows.map(r => <div key={r.l}>
          <div className="flex justify-between text-sm mb-1.5">
            <div className="flex items-center gap-2"><span className={`${r.color} font-medium`}>{r.l}</span><span className="text-white/12 text-[10px]">{r.bk} booked</span></div>
            <span className={`font-mono text-xs ${r.b - r.a >= 0 ? "text-emerald-400/60" : "text-red-400"}`}>{r.b - r.a >= 0 ? "+" : ""}{$(r.b - r.a)}</span>
          </div>
          <div className="relative h-4 bg-white/[0.04] rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-white/[0.06] rounded-full transition-all duration-700" style={{ width: `${(r.b / mx) * 100}%` }} />
            <div className="absolute top-0 left-0 h-full bg-purple-500/50 rounded-full transition-all duration-700" style={{ width: `${(r.a / mx) * 100}%` }} />
          </div>
          <div className="flex justify-between text-[10px] text-white/15 mt-1"><span>Budget: {$(r.b)}</span><span>Confirmed: {$(r.a)}</span></div>
        </div>)}</div>
      </Card>
      <Card>
        <h3 className="text-white/30 text-xs uppercase tracking-widest mb-4">Final Cost Breakdown</h3>
        <div className="space-y-2.5">
          {[{ l: "Production Cost", v: bT }, { l: `Agency Fee (${aPct}%)`, v: aF }, { l: `Contingency (${cPct}%)`, v: cF }, { l: "Usage / Licensing Fee", v: uF }].map(r =>
            <div key={r.l} className="flex justify-between items-center"><span className="text-white/35 text-sm">{r.l}</span><span className="text-white font-mono text-sm">{$(r.v)}</span></div>)}
          <div className="pt-3 border-t border-white/[0.06] flex justify-between items-center">
            <span className="text-white font-semibold" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Final Project Cost</span>
            <span className="text-2xl font-bold text-purple-400" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{$(fin)}</span>
          </div>
        </div>
      </Card>
    </> : <Card>
      <div className="text-center py-12">
        <div className="text-white/10 text-4xl mb-3">◎</div>
        <p className="text-white/25 text-sm mb-1">No items in your budget yet</p>
        <p className="text-white/12 text-xs">Head to the Budget tab to start adding crew, equipment, and locations.</p>
      </div>
    </Card>}
  </div>;
}

// ─── APP ────────────────────────────────────────────────
const TABS = [{ id: "dashboard", l: "Dashboard", i: "◆" }, { id: "budget", l: "Budget", i: "◎" }, { id: "usage", l: "Usage Rights", i: "⬢" }];

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [crew, setCrew] = useState([]);
  const [equip, setEquip] = useState([]);
  const [loc, setLoc] = useState([]);
  const [aPct, setAPct] = useState(15);
  const [cPct, setCPct] = useState(5);
  const [usage, setUsage] = useState({ baseRate: 0, duration: "", media: "", region: "" });

  const prod = secTotal(crew) + secTotal(equip) + secTotal(loc);
  const dm = DUR.find(o => o.l === usage.duration)?.m || 0;
  const mm = MEDIA.find(o => o.l === usage.media)?.m || 0;
  const rm = REG.find(o => o.l === usage.region)?.m || 0;
  const fin = prod + prod * (aPct / 100) + prod * (cPct / 100) + usage.baseRate * dm * mm * rm;

  return <div className="min-h-screen bg-neutral-950 text-white" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Instrument+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <div className="fixed inset-0 pointer-events-none overflow-hidden"><div className="absolute -top-1/3 -left-1/4 w-full h-full rounded-full opacity-[0.035]" style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 60%)" }} /></div>
    <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
      <aside className="hidden lg:flex flex-col w-60 border-r border-white/[0.06] p-6 flex-shrink-0">
        <div className="mb-10">
          <div className="flex items-center gap-2.5 mb-0.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-400/20 flex items-center justify-center"><span className="text-purple-400 text-sm font-bold">PS</span></div>
            <span className="font-semibold text-white tracking-tight" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Purple Spider Agency</span>
          </div>
          <p className="text-white/15 text-[10px] ml-[42px] tracking-widest uppercase">Production Budget</p>
        </div>
        <nav className="space-y-1 flex-1">{TABS.map(t => <button key={t.id} onClick={() => setTab(t.id)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${tab === t.id ? "bg-purple-500/10 text-purple-300 border border-purple-400/15" : "text-white/30 hover:text-white/50 hover:bg-white/[0.02] border border-transparent"}`}>
          <span className="text-base">{t.i}</span>{t.l}
        </button>)}</nav>
        <div className="mb-4 pt-4 border-t border-white/[0.06]">
          <div className="text-white/12 text-[10px] uppercase tracking-widest mb-2">Tiers</div>
          <div className="space-y-1">{Object.entries(TIER).map(([k, c]) => <div key={k} className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${c.c}`} /><span className={`text-[11px] ${c.tx} opacity-50`}>{c.l}</span>
          </div>)}</div>
        </div>
        <div className="pt-4 border-t border-white/[0.06]">
          <div className="text-white/12 text-[10px] uppercase tracking-widest mb-1">Project Total</div>
          <div className="text-xl font-bold text-purple-400" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{$(fin)}</div>
        </div>
      </aside>
      <div className="lg:hidden border-b border-white/[0.06] p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-400/20 flex items-center justify-center"><span className="text-purple-400 text-xs font-bold">PS</span></div>
            <span className="font-semibold text-sm text-white" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Purple Spider Agency</span>
          </div>
          <span className="text-purple-400 font-bold text-sm" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>{$(fin)}</span>
        </div>
        <div className="flex gap-1.5">{TABS.map(t => <button key={t.id} onClick={() => setTab(t.id)}
          className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all border ${tab === t.id ? "bg-purple-500/15 text-purple-300 border-purple-400/20" : "text-white/25 border-white/[0.05]"}`}>{t.l}</button>)}</div>
      </div>
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-4xl">
        {tab === "dashboard" && <DashPage crew={crew} equip={equip} loc={loc} usage={usage} aPct={aPct} cPct={cPct} />}
        {tab === "budget" && <BudgetPage crew={crew} setCrew={setCrew} equip={equip} setEquip={setEquip} loc={loc} setLoc={setLoc} aPct={aPct} setAPct={setAPct} cPct={cPct} setCPct={setCPct} />}
        {tab === "usage" && <UsagePage usage={usage} setUsage={setUsage} />}
      </main>
    </div>
  </div>;
}
