import { useState, useEffect } from "react";

const SCREENS = ["home", "report", "track", "patterns", "confirm"];

const harmCategories = [
  { id: "credit", icon: "💳", label: "Loan / Credit Denial", desc: "Unfairly rejected by a financial AI system" },
  { id: "content", icon: "🚫", label: "Content Removed / Silenced", desc: "Posts flagged or account restricted wrongly" },
  { id: "hiring", icon: "📋", label: "Hiring / Employment", desc: "Screened out by an automated recruitment system" },
  { id: "biometric", icon: "👁️", label: "Biometric / Identity", desc: "Misidentified by face recognition or ID system" },
  { id: "government", icon: "🏛️", label: "Government / Public Service", desc: "Denied benefits or flagged by a state AI system" },
  { id: "other", icon: "⚡", label: "Other AI Harm", desc: "Something else caused by an automated system" },
];

const languages = ["English", "Yoruba", "Hausa", "Igbo", "Swahili", "Français", "Pidgin"];

const mockPatterns = [
  { id: 1, system: "QuickCredit App", company: "FinTech Lagos Ltd", reports: 847, locations: ["Lagos", "Abuja", "Ibadan"], category: "credit", severity: "high", trend: "+23% this week", summary: "Users consistently denied loans despite meeting stated criteria. Pattern suggests demographic bias in scoring model." },
  { id: 2, system: "JobMatch AI", company: "RecruitPro Africa", reports: 312, locations: ["Nairobi", "Kampala"], category: "hiring", severity: "high", trend: "+8% this week", summary: "Applicants from certain postal codes systematically screened out before human review stage." },
  { id: 3, system: "ContentGuard", company: "Social Platform X", reports: 1204, locations: ["Multiple"], category: "content", severity: "critical", trend: "+41% this week", summary: "Yoruba and Igbo language content removed at 6x the rate of English content with equivalent meaning." },
  { id: 4, system: "CityID System", company: "Municipal Authority", reports: 156, locations: ["Accra"], category: "biometric", severity: "medium", trend: "Stable", summary: "Darker skin tones showing significantly higher false rejection rates at government service centers." },
];

const steps = ["Category", "Details", "Evidence", "Contact", "Review"];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState("English");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({ company: "", system: "", description: "", impact: "", evidence: [], contact: "", anonymous: false, consent: false });
  const [activePattern, setActivePattern] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [animateIn, setAnimateIn] = useState(true);
  const [trackId, setTrackId] = useState("");

  useEffect(() => {
    setAnimateIn(false);
    const t = setTimeout(() => setAnimateIn(true), 50);
    return () => clearTimeout(t);
  }, [screen, step]);

  const navigate = (s) => { setScreen(s); setStep(0); };

  const handleSubmit = () => {
    setSubmitted(true);
    setScreen("confirm");
  };

  return (
    <div style={{ fontFamily: "'Crimson Pro', Georgia, serif", minHeight: "100vh", background: "#0a0a0a", color: "#f0ede6", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #111; } ::-webkit-scrollbar-thumb { background: #c8a96e; }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .card-hover { transition: all 0.25s ease; cursor: pointer; }
        .card-hover:hover { transform: translateY(-2px); border-color: #c8a96e !important; }
        .btn-primary { background: #c8a96e; color: #0a0a0a; border: none; padding: 14px 32px; font-family: 'DM Mono', monospace; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.2s ease; }
        .btn-primary:hover { background: #e0c08a; }
        .btn-ghost { background: transparent; color: #c8a96e; border: 1px solid #c8a96e44; padding: 12px 28px; font-family: 'DM Mono', monospace; font-size: 13px; letter-spacing: 0.08em; cursor: pointer; transition: all 0.2s ease; }
        .btn-ghost:hover { border-color: #c8a96e; background: #c8a96e11; }
        .input-field { background: #111; border: 1px solid #2a2a2a; color: #f0ede6; padding: 14px 16px; font-family: 'Crimson Pro', serif; font-size: 16px; width: 100%; transition: border-color 0.2s; outline: none; }
        .input-field:focus { border-color: #c8a96e66; }
        .input-field::placeholder { color: #444; }
        .severity-critical { color: #ff4444; } .severity-high { color: #ff8c42; } .severity-medium { color: #c8a96e; }
        .progress-bar { height: 2px; background: #1a1a1a; width: 100%; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, #c8a96e, #e0c08a); transition: width 0.4s ease; }
        .pattern-pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .noise { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.025; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); z-index: 9999; }
      `}</style>

      <div className="noise" />

      {/* Nav */}
      <nav style={{ borderBottom: "1px solid #1e1e1e", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, position: "sticky", top: 0, background: "#0a0a0aee", backdropFilter: "blur(12px)", zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => navigate("home")}>
          <div style={{ width: 32, height: 32, border: "1.5px solid #c8a96e", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 10, height: 10, background: "#c8a96e" }} />
          </div>
          <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: "0.05em" }}>VOICE</span>
          <span style={{ fontSize: 12, color: "#555", fontFamily: "'DM Mono', monospace", marginTop: 1 }}>/ AI Harm Registry</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <select value={lang} onChange={e => setLang(e.target.value)} style={{ background: "#111", border: "1px solid #222", color: "#888", padding: "6px 10px", fontFamily: "'DM Mono', monospace", fontSize: 11, cursor: "pointer", outline: "none" }}>
            {languages.map(l => <option key={l}>{l}</option>)}
          </select>
          <button className="btn-ghost" style={{ padding: "8px 16px", fontSize: 12 }} onClick={() => navigate("track")}>Track Case</button>
          <button className="btn-primary" style={{ padding: "10px 20px", fontSize: 12 }} onClick={() => navigate("report")}>Report Harm</button>
        </div>
      </nav>

      {/* SCREENS */}
      <div className={animateIn ? "fade-up" : ""} style={{ opacity: animateIn ? 1 : 0 }}>

        {/* HOME */}
        {screen === "home" && (
          <div>
            {/* Hero */}
            <div style={{ padding: "100px 32px 80px", maxWidth: 900, margin: "0 auto", position: "relative" }}>
              <div style={{ position: "absolute", top: 40, right: 0, width: 400, height: 400, background: "radial-gradient(circle, #c8a96e08 0%, transparent 70%)", pointerEvents: "none" }} />
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#c8a96e", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24 }}>
                Africa's AI Harm Registry
              </div>
              <h1 style={{ fontSize: "clamp(42px, 7vw, 78px)", fontWeight: 300, lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.02em" }}>
                When AI systems<br /><em style={{ fontStyle: "italic", color: "#c8a96e" }}>harm communities,</em><br />we keep record.
              </h1>
              <p style={{ fontSize: 20, color: "#888", lineHeight: 1.7, maxWidth: 560, marginBottom: 48, fontWeight: 300 }}>
                A structured platform for documenting, organizing, and escalating harms caused by automated systems — built for and by African communities.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <button className="btn-primary" style={{ fontSize: 14 }} onClick={() => navigate("report")}>Document a Harm →</button>
                <button className="btn-ghost" onClick={() => navigate("patterns")}>View Active Patterns</button>
              </div>
            </div>

            {/* Stats */}
            <div style={{ borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", padding: "40px 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 0, maxWidth: 900, margin: "0 auto" }}>
              {[
                { n: "2,519", l: "Reports Filed" },
                { n: "47", l: "Patterns Identified" },
                { n: "12", l: "Cases Escalated" },
                { n: "8", l: "Outcomes Achieved" },
              ].map((s, i) => (
                <div key={i} style={{ padding: "24px 32px", borderRight: i < 3 ? "1px solid #1a1a1a" : "none" }}>
                  <div style={{ fontSize: 40, fontWeight: 300, color: "#c8a96e", letterSpacing: "-0.03em" }}>{s.n}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* Active Patterns Preview */}
            <div style={{ padding: "80px 32px", maxWidth: 900, margin: "0 auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
                <div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#555", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>Active Patterns</div>
                  <h2 style={{ fontSize: 28, fontWeight: 300 }}>Systemic Harms Detected</h2>
                </div>
                <button className="btn-ghost" style={{ fontSize: 12 }} onClick={() => navigate("patterns")}>View All →</button>
              </div>
              <div style={{ display: "grid", gap: 1 }}>
                {mockPatterns.slice(0, 3).map(p => (
                  <div key={p.id} className="card-hover" onClick={() => { setActivePattern(p); navigate("patterns"); }}
                    style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", padding: "24px 28px", display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "center" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, padding: "3px 8px", border: `1px solid`, borderColor: p.severity === "critical" ? "#ff444433" : p.severity === "high" ? "#ff8c4233" : "#c8a96e33", color: p.severity === "critical" ? "#ff4444" : p.severity === "high" ? "#ff8c42" : "#c8a96e", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                          {p.severity === "critical" && <span className="pattern-pulse">● </span>}{p.severity}
                        </span>
                        <span style={{ color: "#555", fontFamily: "'DM Mono', monospace", fontSize: 11 }}>{p.reports} reports</span>
                      </div>
                      <div style={{ fontSize: 18, marginBottom: 4 }}>{p.system} <span style={{ color: "#555", fontSize: 14 }}>— {p.company}</span></div>
                      <div style={{ fontSize: 14, color: "#666", lineHeight: 1.5 }}>{p.summary.substring(0, 90)}...</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#c8a96e" }}>{p.trend}</div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#444", marginTop: 4 }}>{p.locations.join(", ")}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How it works */}
            <div style={{ padding: "60px 32px 100px", maxWidth: 900, margin: "0 auto", borderTop: "1px solid #1a1a1a" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#555", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 40 }}>How It Works</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>
                {[
                  { n: "01", t: "Document", d: "Guided intake captures your experience with evidence — in your language, on any device." },
                  { n: "02", t: "Connect", d: "Your report joins others. Patterns emerge. Individual cases become collective evidence." },
                  { n: "03", t: "Escalate", d: "Cases route to lawyers, journalists, and regulators with the tools to act." },
                  { n: "04", t: "Resolve", d: "You're kept informed at every step. Every outcome is recorded publicly." },
                ].map(s => (
                  <div key={s.n}>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 32, color: "#1e1e1e", fontWeight: 300, marginBottom: 12 }}>{s.n}</div>
                    <div style={{ fontSize: 20, marginBottom: 8, fontWeight: 400 }}>{s.t}</div>
                    <div style={{ fontSize: 15, color: "#666", lineHeight: 1.6 }}>{s.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* REPORT */}
        {screen === "report" && (
          <div style={{ maxWidth: 720, margin: "0 auto", padding: "60px 32px" }}>
            {/* Progress */}
            <div style={{ marginBottom: 48 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                {steps.map((s, i) => (
                  <div key={s} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: i === step ? "#c8a96e" : i < step ? "#555" : "#2a2a2a", transition: "color 0.3s" }}>{s}</div>
                ))}
              </div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
            </div>

            {/* Step 0: Category */}
            {step === 0 && (
              <div>
                <h2 style={{ fontSize: 32, fontWeight: 300, marginBottom: 8 }}>What kind of harm occurred?</h2>
                <p style={{ color: "#666", marginBottom: 40, fontSize: 16 }}>Select the category that best describes your experience.</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {harmCategories.map(c => (
                    <div key={c.id} className="card-hover" onClick={() => setSelectedCategory(c.id)}
                      style={{ padding: "20px", border: `1px solid ${selectedCategory === c.id ? "#c8a96e" : "#1e1e1e"}`, background: selectedCategory === c.id ? "#c8a96e0a" : "#0f0f0f", transition: "all 0.2s" }}>
                      <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
                      <div style={{ fontSize: 16, marginBottom: 4 }}>{c.label}</div>
                      <div style={{ fontSize: 13, color: "#555", lineHeight: 1.4 }}>{c.desc}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 32, display: "flex", justifyContent: "flex-end" }}>
                  <button className="btn-primary" onClick={() => selectedCategory && setStep(1)} style={{ opacity: selectedCategory ? 1 : 0.3 }}>Continue →</button>
                </div>
              </div>
            )}

            {/* Step 1: Details */}
            {step === 1 && (
              <div>
                <h2 style={{ fontSize: 32, fontWeight: 300, marginBottom: 8 }}>Tell us what happened</h2>
                <p style={{ color: "#666", marginBottom: 40, fontSize: 16 }}>Be as specific as you can. Your details help identify patterns.</p>
                <div style={{ display: "grid", gap: 20 }}>
                  <div>
                    <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Company / Organization</label>
                    <input className="input-field" placeholder="e.g. QuickCredit, Facebook, City Council..." value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Name of AI system or app (if known)</label>
                    <input className="input-field" placeholder="e.g. the loan application, hiring portal..." value={formData.system} onChange={e => setFormData({ ...formData, system: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>What happened?</label>
                    <textarea className="input-field" rows={5} placeholder="Describe the decision that was made and how it affected you. Include dates if you remember them." value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} style={{ resize: "vertical" }} />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Impact on your life</label>
                    <textarea className="input-field" rows={3} placeholder="How did this affect you — financially, personally, professionally?" value={formData.impact} onChange={e => setFormData({ ...formData, impact: e.target.value })} style={{ resize: "vertical" }} />
                  </div>
                </div>
                <div style={{ marginTop: 32, display: "flex", justifyContent: "space-between" }}>
                  <button className="btn-ghost" onClick={() => setStep(0)}>← Back</button>
                  <button className="btn-primary" onClick={() => setStep(2)}>Continue →</button>
                </div>
              </div>
            )}

            {/* Step 2: Evidence */}
            {step === 2 && (
              <div>
                <h2 style={{ fontSize: 32, fontWeight: 300, marginBottom: 8 }}>Do you have evidence?</h2>
                <p style={{ color: "#666", marginBottom: 40, fontSize: 16 }}>Screenshots, rejection notices, emails — anything helps. You can also continue without evidence.</p>
                <div style={{ border: "1px dashed #2a2a2a", padding: "60px 32px", textAlign: "center", cursor: "pointer", transition: "border-color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#c8a96e44"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#2a2a2a"}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>📎</div>
                  <div style={{ fontSize: 16, marginBottom: 4 }}>Upload files</div>
                  <div style={{ fontSize: 13, color: "#555" }}>Screenshots, PDFs, images — max 10MB each</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#333", marginTop: 16, letterSpacing: "0.1em" }}>ALL FILES ARE ENCRYPTED AND TAMPER-SEALED ON UPLOAD</div>
                </div>
                <div style={{ marginTop: 24, background: "#0f0f0f", border: "1px solid #1a1a1a", padding: "20px 24px" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#c8a96e", marginBottom: 8 }}>WHAT COUNTS AS EVIDENCE?</div>
                  <div style={{ fontSize: 14, color: "#666", lineHeight: 1.8 }}>
                    Screenshots of rejection messages · Automated emails · App notifications · Error messages · Any communications from the company
                  </div>
                </div>
                <div style={{ marginTop: 32, display: "flex", justifyContent: "space-between" }}>
                  <button className="btn-ghost" onClick={() => setStep(1)}>← Back</button>
                  <button className="btn-primary" onClick={() => setStep(3)}>Continue →</button>
                </div>
              </div>
            )}

            {/* Step 3: Contact */}
            {step === 3 && (
              <div>
                <h2 style={{ fontSize: 32, fontWeight: 300, marginBottom: 8 }}>How can we reach you?</h2>
                <p style={{ color: "#666", marginBottom: 40, fontSize: 16 }}>To update you on your case. Anonymous reporting is available.</p>
                <div style={{ display: "grid", gap: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", border: `1px solid ${formData.anonymous ? "#c8a96e" : "#1a1a1a"}`, cursor: "pointer", background: formData.anonymous ? "#c8a96e08" : "transparent" }}
                    onClick={() => setFormData({ ...formData, anonymous: !formData.anonymous })}>
                    <div style={{ width: 18, height: 18, border: `1.5px solid ${formData.anonymous ? "#c8a96e" : "#333"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {formData.anonymous && <div style={{ width: 10, height: 10, background: "#c8a96e" }} />}
                    </div>
                    <div>
                      <div style={{ fontSize: 15 }}>Submit anonymously</div>
                      <div style={{ fontSize: 13, color: "#555" }}>No contact details stored. You won't receive case updates.</div>
                    </div>
                  </div>
                  {!formData.anonymous && (
                    <div>
                      <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Phone number or email</label>
                      <input className="input-field" placeholder="+234 or your email address" value={formData.contact} onChange={e => setFormData({ ...formData, contact: e.target.value })} />
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#333", marginTop: 8, letterSpacing: "0.05em" }}>Used only for case updates. Never shared without your permission.</div>
                    </div>
                  )}
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "16px 20px", border: `1px solid ${formData.consent ? "#c8a96e" : "#1a1a1a"}`, cursor: "pointer", background: formData.consent ? "#c8a96e08" : "transparent" }}
                    onClick={() => setFormData({ ...formData, consent: !formData.consent })}>
                    <div style={{ width: 18, height: 18, border: `1.5px solid ${formData.consent ? "#c8a96e" : "#333"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      {formData.consent && <div style={{ width: 10, height: 10, background: "#c8a96e" }} />}
                    </div>
                    <div>
                      <div style={{ fontSize: 15 }}>Share anonymized data with researchers</div>
                      <div style={{ fontSize: 13, color: "#555" }}>Helps build evidence for policy change. Your identity is never shared.</div>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 32, display: "flex", justifyContent: "space-between" }}>
                  <button className="btn-ghost" onClick={() => setStep(2)}>← Back</button>
                  <button className="btn-primary" onClick={() => setStep(4)}>Review Report →</button>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div>
                <h2 style={{ fontSize: 32, fontWeight: 300, marginBottom: 8 }}>Review your report</h2>
                <p style={{ color: "#666", marginBottom: 40, fontSize: 16 }}>Once submitted, your report is sealed and cannot be altered.</p>
                <div style={{ border: "1px solid #1e1e1e", background: "#0f0f0f" }}>
                  {[
                    { label: "Category", value: harmCategories.find(c => c.id === selectedCategory)?.label || "—" },
                    { label: "Company", value: formData.company || "—" },
                    { label: "System", value: formData.system || "—" },
                    { label: "Description", value: formData.description ? formData.description.substring(0, 100) + "..." : "—" },
                    { label: "Submission", value: formData.anonymous ? "Anonymous" : formData.contact || "—" },
                    { label: "Research consent", value: formData.consent ? "Yes" : "No" },
                  ].map((r, i) => (
                    <div key={i} style={{ padding: "16px 24px", borderBottom: i < 5 ? "1px solid #1a1a1a" : "none", display: "grid", gridTemplateColumns: "140px 1fr", gap: 16 }}>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", paddingTop: 2 }}>{r.label}</div>
                      <div style={{ fontSize: 15, color: "#ccc" }}>{r.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 32, display: "flex", justifyContent: "space-between" }}>
                  <button className="btn-ghost" onClick={() => setStep(3)}>← Back</button>
                  <button className="btn-primary" onClick={handleSubmit}>Submit Report →</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CONFIRM */}
        {screen === "confirm" && (
          <div style={{ maxWidth: 600, margin: "0 auto", padding: "100px 32px", textAlign: "center" }}>
            <div style={{ width: 64, height: 64, border: "1.5px solid #c8a96e", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", fontSize: 24 }}>✓</div>
            <h2 style={{ fontSize: 36, fontWeight: 300, marginBottom: 16 }}>Report submitted</h2>
            <p style={{ color: "#666", fontSize: 17, lineHeight: 1.7, marginBottom: 40 }}>Your experience has been recorded and sealed. Our team will review it within 48 hours and match it to any existing patterns.</p>
            <div style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", padding: "24px", marginBottom: 40 }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Your Case ID</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 22, color: "#c8a96e", letterSpacing: "0.1em" }}>VCE-2024-{Math.floor(Math.random() * 9000) + 1000}</div>
              <div style={{ fontSize: 13, color: "#444", marginTop: 8 }}>Save this to track your case status</div>
            </div>
            <button className="btn-primary" onClick={() => navigate("home")}>Return Home</button>
          </div>
        )}

        {/* PATTERNS */}
        {screen === "patterns" && (
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 32px" }}>
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#555", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>Pattern Registry</div>
              <h2 style={{ fontSize: 36, fontWeight: 300, marginBottom: 8 }}>Systemic AI Harms</h2>
              <p style={{ color: "#666", fontSize: 16 }}>Patterns emerge when multiple people report the same system causing similar harm.</p>
            </div>
            <div style={{ display: "grid", gap: 2 }}>
              {mockPatterns.map(p => (
                <div key={p.id} className="card-hover" onClick={() => setActivePattern(activePattern?.id === p.id ? null : p)}
                  style={{ background: "#0f0f0f", border: `1px solid ${activePattern?.id === p.id ? "#c8a96e44" : "#1a1a1a"}` }}>
                  <div style={{ padding: "28px", display: "grid", gridTemplateColumns: "1fr 200px", gap: 24, alignItems: "start" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, padding: "3px 8px", border: "1px solid", borderColor: p.severity === "critical" ? "#ff444433" : p.severity === "high" ? "#ff8c4233" : "#c8a96e33", color: p.severity === "critical" ? "#ff4444" : p.severity === "high" ? "#ff8c42" : "#c8a96e", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                          {p.severity === "critical" && <span className="pattern-pulse">● </span>}{p.severity}
                        </span>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#444", textTransform: "uppercase", letterSpacing: "0.1em" }}>{harmCategories.find(c => c.id === p.category)?.label}</span>
                      </div>
                      <h3 style={{ fontSize: 22, fontWeight: 400, marginBottom: 4 }}>{p.system}</h3>
                      <div style={{ fontSize: 14, color: "#555", marginBottom: 12 }}>{p.company}</div>
                      <p style={{ fontSize: 15, color: "#888", lineHeight: 1.6 }}>{p.summary}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 40, fontWeight: 300, color: "#c8a96e", letterSpacing: "-0.02em" }}>{p.reports}</div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#444", textTransform: "uppercase", letterSpacing: "0.1em" }}>Reports</div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#c8a96e88", marginTop: 8 }}>{p.trend}</div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#333", marginTop: 4 }}>{p.locations.join(" · ")}</div>
                    </div>
                  </div>
                  {activePattern?.id === p.id && (
                    <div style={{ borderTop: "1px solid #1e1e1e", padding: "24px 28px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                      {[
                        { l: "Status", v: "Under Investigation" },
                        { l: "Legal Partner", v: "Assigned" },
                        { l: "Regulator Notified", v: p.severity === "critical" ? "Yes" : "Pending" },
                      ].map((i, idx) => (
                        <div key={idx}>
                          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#444", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{i.l}</div>
                          <div style={{ fontSize: 15, color: "#c8a96e" }}>{i.v}</div>
                        </div>
                      ))}
                      <div style={{ gridColumn: "1/-1", marginTop: 8 }}>
                        <button className="btn-primary" style={{ fontSize: 12, marginRight: 12 }} onClick={() => navigate("report")}>Add Your Report to This Pattern</button>
                        <button className="btn-ghost" style={{ fontSize: 12 }}>Share Pattern</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TRACK */}
        {screen === "track" && (
          <div style={{ maxWidth: 600, margin: "0 auto", padding: "100px 32px" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#555", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24 }}>Case Tracker</div>
            <h2 style={{ fontSize: 36, fontWeight: 300, marginBottom: 8 }}>Track your report</h2>
            <p style={{ color: "#666", marginBottom: 48, fontSize: 16 }}>Enter the case ID you received when you submitted your report.</p>
            <div style={{ display: "flex", gap: 0 }}>
              <input className="input-field" placeholder="VCE-2024-XXXX" value={trackId} onChange={e => setTrackId(e.target.value)} style={{ flex: 1 }} />
              <button className="btn-primary" style={{ flexShrink: 0 }}>Track →</button>
            </div>
            <div style={{ marginTop: 48, background: "#0f0f0f", border: "1px solid #1a1a1a", padding: "28px" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#c8a96e", marginBottom: 16, letterSpacing: "0.1em" }}>SAMPLE CASE — VCE-2024-3847</div>
              {[
                { d: "Apr 12", e: "Report received and sealed", done: true },
                { d: "Apr 13", e: "Pattern match found — 312 similar reports", done: true },
                { d: "Apr 14", e: "Legal partner assigned", done: true },
                { d: "Pending", e: "Regulatory submission in progress", done: false },
                { d: "—", e: "Outcome recorded", done: false },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 16, marginBottom: 16, alignItems: "flex-start" }}>
                  <div style={{ flexShrink: 0, width: 8, height: 8, borderRadius: "50%", background: item.done ? "#c8a96e" : "#2a2a2a", marginTop: 5, border: item.done ? "none" : "1px solid #333" }} />
                  <div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#444", marginBottom: 2 }}>{item.d}</div>
                    <div style={{ fontSize: 14, color: item.done ? "#ccc" : "#444" }}>{item.e}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #1a1a1a", padding: "40px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#333", letterSpacing: "0.1em" }}>VOICE / AI HARM REGISTRY — AFRICA</div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy Policy", "Security", "Partner With Us", "For Researchers"].map(l => (
            <span key={l} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#333", letterSpacing: "0.08em", cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#c8a96e"} onMouseLeave={e => e.target.style.color = "#333"}>{l}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}
export default App;
