import type { Metadata } from "next";
import BrochurePrintButton from "@/components/AU/newcourse/BrochurePrintButton";

export const metadata: Metadata = {
  title: "NAPLAN Preparation Program — SuperSheldon",
  description:
    "Premium NAPLAN preparation across Reading, Writing, Numeracy and Language Conventions for Years 3, 5, 7 and 9.",
};

/* ── Premium editorial photography (Unsplash) ────────── */
const IMG_COVER =
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=80";
const IMG_STUDY =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80";

const QR_SRC =
  "https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=0&color=0B1F3A&bgcolor=FFFFFF&data=https%3A%2F%2Fsupersheldon.com%2Fdemo";

/* ── Exam domains ────────────────────────────────────── */
const DOMAINS = [
  { icon: "book",    name: "Reading",              detail: "Comprehension across fiction, non-fiction and visual texts.", meta: "≈ 40–50 questions" },
  { icon: "pen",     name: "Writing",              detail: "One narrative or persuasive task, planned and drafted.",       meta: "40-minute task" },
  { icon: "grammar", name: "Language Conventions", detail: "Spelling, grammar and punctuation accuracy.",                  meta: "≈ 50 questions" },
  { icon: "number",  name: "Numeracy",             detail: "Number, algebra, measurement, geometry and statistics.",       meta: "Calc & non-calc" },
] as const;

/* ── Teaching method ─────────────────────────────────── */
const METHOD = [
  { n: "01", t: "Learn the Concept",  d: "Clear teacher-led explanation of each idea." },
  { n: "02", t: "Guided Examples",    d: "Worked examples modelled step by step." },
  { n: "03", t: "Practice Questions", d: "Targeted practice to build accuracy." },
  { n: "04", t: "Timed Exercises",    d: "Working at NAPLAN pace under the clock." },
  { n: "05", t: "Mock Exams",         d: "Full simulations in real test conditions." },
  { n: "06", t: "Performance Feedback", d: "Individual reports on every result." },
];

/* ── 10-week roadmap ─────────────────────────────────── */
const ROADMAP = [
  { wk: "Week 1–2",  t: "Foundations",        d: "Core concepts and test familiarity." },
  { wk: "Week 3–5",  t: "Core Skills",        d: "Reading, writing and numeracy depth." },
  { wk: "Week 6–8",  t: "Advanced Strategies", d: "Top-band techniques and speed." },
  { wk: "Week 9",    t: "Practice Exams",     d: "Full timed mock assessments." },
  { wk: "Week 10",   t: "Final Revision",     d: "Targeted polish before test day." },
];

/* ── Curriculum modules ──────────────────────────────── */
const MODULES: {
  n: string; icon: keyof typeof ICONS; title: string; topics: string; skills: string;
}[] = [
  { n: "01", icon: "target",  title: "Exam Strategy",            topics: "Test format · Online adaptive testing · Question types · Timing · Stress control · Answer techniques", skills: "Confidence · Exam temperament" },
  { n: "02", icon: "grammar", title: "Grammar & Punctuation",    topics: "Sentence structure · Parts of speech · Punctuation rules · Clauses · Common errors · Editing",        skills: "Accuracy · Self-correction" },
  { n: "03", icon: "spell",   title: "Spelling",                 topics: "Spelling patterns · Prefixes & suffixes · Homophones · Tricky words · Syllables · Proofreading",      skills: "Recall · Pattern recognition" },
  { n: "04", icon: "number",  title: "Number & Algebra",         topics: "Number patterns · Fractions · Decimals · Percentages · Algebra basics · Problem solving",            skills: "Mental calculation · Multi-step reasoning" },
  { n: "05", icon: "shapes",  title: "Measurement & Geometry",   topics: "Length, area & volume · 2D & 3D shapes · Angles · Coordinates · Transformations · Units",            skills: "Spatial reasoning · Visualisation" },
  { n: "06", icon: "chart",   title: "Statistics & Probability", topics: "Reading graphs · Data tables · Averages · Chance · Interpreting results · Surveys",                  skills: "Data interpretation · Logical analysis" },
  { n: "07", icon: "book",    title: "Reading Comprehension",    topics: "Skimming & scanning · Inference · Main idea · Vocabulary in context · Text types · Evidence",        skills: "Critical reading · Speed" },
  { n: "08", icon: "pen",     title: "Narrative Writing",        topics: "Story structure · Character development · Descriptive language · Dialogue · Editing · Timed writing", skills: "Creativity · Structure" },
  { n: "09", icon: "speak",   title: "Persuasive Writing",       topics: "Argument structure · Persuasive devices · Topic sentences · Evidence · Tone · Conclusions",          skills: "Logic · Clarity" },
  { n: "10", icon: "check",   title: "Full Practice Test",       topics: "Timed full papers · All four domains · Exam simulation · Review & analysis · Weakness targeting",    skills: "Stamina · Application" },
];

/* ── Minimal line icons (1.5 stroke) ─────────────────── */
const ICONS = {
  target: (<><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.5" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></>),
  grammar: (<><path d="M4 6h16M4 12h16M4 18h10" /></>),
  spell: (<><path d="M5 16l3-9 3 9M5.8 13.5h4.4M15 8v8M15 8h2.5a2.5 2.5 0 0 1 0 5H15" /><path d="M15 13h3a2.5 2.5 0 0 1 0 5h-3" /></>),
  number: (<><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 7h8M8 11h2M14 11h2M8 15h2M14 15h2M8 19h2" /></>),
  shapes: (<><path d="M12 3l8 14H4z" /><circle cx="17.5" cy="6.5" r="2.5" /></>),
  chart: (<><path d="M4 20V4M4 20h16M8 20v-6M12 20v-9M16 20v-4" /></>),
  book: (<><path d="M12 6c-2-1.5-5-1.5-7 0v12c2-1.5 5-1.5 7 0M12 6c2-1.5 5-1.5 7 0v12c-2-1.5-5-1.5-7 0M12 6v12" /></>),
  pen: (<><path d="M16 4l4 4L8 20l-4 1 1-4z" /><path d="M14 6l4 4" /></>),
  speak: (<><path d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1z" /><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7 7 0 0 1 0 11" /></>),
  check: (<><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 3.5h6V6H9zM8.5 13l2.5 2.5 4.5-5" /></>),
};

function Icon({ name, color = "#D6A94B", size = 22 }: { name: keyof typeof ICONS; color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

function Tick({ color = "#D6A94B", size = 15, w = 2.4 }: { color?: string; size?: number; w?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
         strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M5 12l4 4 10-11" />
    </svg>
  );
}

/* ── Reusable section heading ────────────────────────── */
function Heading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <>
      <span className="eyebrow" style={{ color: "var(--gold)" }}>{eyebrow}</span>
      <h2 className="h-font" style={{ fontSize: 28, fontWeight: 700, color: "var(--navy)", marginTop: 10, letterSpacing: "-0.3px" }}>{title}</h2>
      <div className="gold-rule" style={{ marginTop: 14 }} />
    </>
  );
}

export default function NaplanBrochurePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --navy: #0B1F3A;
          --gold: #D6A94B;
          --gray: #F5F7FA;
          --ink:  #1D1D1D;
        }

        body { font-family: 'Inter', sans-serif; background: #E9ECF1; color: var(--ink); }
        .b-root { width: 210mm; margin: 0 auto; }
        .h-font { font-family: 'Poppins', sans-serif; }

        @media screen { .a4 { box-shadow: 0 10px 60px rgba(11,31,58,0.18); margin: 28px auto; } }

        @media print {
          @page { size: A4; margin: 0; }
          html, body { margin: 0; padding: 0; background: white; }
          .b-root { width: 210mm; margin: 0; }
          .a4 { margin: 0 !important; box-shadow: none !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
        }

        .a4 {
          width: 210mm; height: 297mm; background: #fff;
          position: relative; overflow: hidden;
          page-break-after: always; break-after: page;
          display: flex; flex-direction: column;
        }
        .a4:last-child { page-break-after: avoid; break-after: avoid; }

        .eyebrow { font-size: 10px; letter-spacing: 3.5px; font-weight: 600; text-transform: uppercase; }
        .gold-rule { width: 56px; height: 3px; background: var(--gold); border-radius: 2px; }
        .foot { font-family: 'Poppins', sans-serif; font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); }
        .pbody { font-size: 12px; line-height: 1.75; color: #444; font-weight: 300; }
        .subhead { font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 600; color: var(--navy); }
      `}</style>

      <BrochurePrintButton />

      <div className="b-root">

        {/* ══════════════ PAGE 1 — COVER ══════════════ */}
        <section className="a4" style={{ background: "var(--navy)", color: "#fff" }}>
          <div style={{ height: 4, background: "var(--gold)" }} />
          <div style={{ padding: "20mm 22mm 16mm", display: "flex", flexDirection: "column", flex: 1 }}>
            <div className="flex items-center justify-between">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Final-Logo-bg-removed.png" alt="SuperSheldon" style={{ height: 26, filter: "brightness(0) invert(1)" }} />
              <span className="eyebrow" style={{ color: "var(--gold)" }}>Exam Preparation · 2026</span>
            </div>

            <div style={{ marginTop: "14mm", borderRadius: 18, overflow: "hidden", position: "relative", height: "76mm" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG_COVER} alt="Student preparing for NAPLAN" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,31,58,0) 40%, rgba(11,31,58,0.55) 100%)" }} />
            </div>

            <div style={{ marginTop: "12mm" }}>
              <div className="eyebrow" style={{ color: "var(--gold)", marginBottom: 14 }}>
                Years 3&nbsp;&nbsp;•&nbsp;&nbsp;5&nbsp;&nbsp;•&nbsp;&nbsp;7&nbsp;&nbsp;•&nbsp;&nbsp;9
              </div>
              <h1 className="h-font" style={{ fontSize: 46, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.5px" }}>
                NAPLAN Preparation<br />Program
              </h1>
              <p className="h-font" style={{ fontSize: 17, fontWeight: 400, lineHeight: 1.5, marginTop: 16, color: "rgba(255,255,255,0.82)" }}>
                Build confidence. Improve scores.<br />
                <span style={{ color: "var(--gold)", fontWeight: 500 }}>Achieve top bands.</span>
              </p>
              <div className="eyebrow" style={{ color: "rgba(255,255,255,0.6)", marginTop: 18, letterSpacing: "2.5px" }}>
                Reading&nbsp;&nbsp;•&nbsp;&nbsp;Writing&nbsp;&nbsp;•&nbsp;&nbsp;Numeracy&nbsp;&nbsp;•&nbsp;&nbsp;Language Conventions
              </div>
            </div>

            <div style={{ marginTop: "auto", paddingTop: "10mm", display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
              {[
                { v: "500+",    l: "Students Enrolled" },
                { v: "4.8 ★",   l: "Parent Rating" },
                { v: "10-Week", l: "Structured Program" },
              ].map((s, i) => (
                <div key={s.l} style={{ paddingLeft: i === 0 ? 0 : "8mm", borderLeft: i === 0 ? "none" : "1px solid rgba(214,169,75,0.35)" }}>
                  <div className="h-font" style={{ fontSize: 28, fontWeight: 700, color: "var(--gold)" }}>{s.v}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", marginTop: 4, letterSpacing: "0.3px" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ PAGE 2 — UNDERSTANDING NAPLAN ══════════════ */}
        <section className="a4" style={{ background: "#fff" }}>
          <div style={{ padding: "20mm 22mm 0", flex: 1, display: "flex", flexDirection: "column" }}>
            <Heading eyebrow="Understanding the Assessment" title="What is NAPLAN?" />

            <p className="pbody" style={{ marginTop: 18, maxWidth: "160mm" }}>
              The National Assessment Program — Literacy and Numeracy (NAPLAN) is the standardised national
              assessment sat by every Australian student in <strong>Years 3, 5, 7 and 9</strong>. It measures the
              core skills considered essential for a child to progress through school and everyday life.
            </p>
            <p className="pbody" style={{ marginTop: 12, maxWidth: "160mm" }}>
              Delivered online, NAPLAN tests four domains — <strong>Reading, Writing, Language Conventions and
              Numeracy</strong>. Results place each student into national achievement bands and are used by
              schools to track progress, by parents to understand strengths, and by selective and scholarship
              programs as a key indicator of academic readiness.
            </p>

            {/* Why it matters band */}
            <div style={{ marginTop: "12mm", background: "var(--gray)", borderRadius: 14, padding: "20px 24px", borderLeft: "3px solid var(--gold)" }}>
              <div className="subhead" style={{ marginBottom: 6 }}>Why It Matters</div>
              <p style={{ fontSize: 11.5, lineHeight: 1.7, color: "#444", fontWeight: 300 }}>
                Strong NAPLAN results open doors — informing class placement, building academic confidence, and
                strengthening applications for selective schools and scholarships. Early, structured preparation
                turns an unfamiliar test into a clear, achievable goal.
              </p>
            </div>

            {/* Exam breakdown */}
            <div style={{ marginTop: "14mm" }}>
              <div className="subhead" style={{ marginBottom: 4 }}>The Exam Breakdown</div>
              <p style={{ fontSize: 11, color: "#777", fontWeight: 300, marginBottom: 16 }}>
                Four domains, each preparing students for a distinct part of the assessment.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6mm 7mm" }}>
                {DOMAINS.map((d) => (
                  <div key={d.name} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "16px 18px", border: "1px solid #E5E9F0", borderRadius: 14 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name={d.icon} size={20} />
                    </div>
                    <div>
                      <div className="h-font" style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)" }}>{d.name}</div>
                      <p style={{ fontSize: 10.5, lineHeight: 1.5, color: "#555", fontWeight: 300, marginTop: 3 }}>{d.detail}</p>
                      <div className="eyebrow" style={{ color: "var(--gold)", fontSize: 8.5, letterSpacing: "1.5px", marginTop: 7 }}>{d.meta}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ padding: "0 22mm 14mm", marginTop: "auto" }}>
            <div style={{ height: 1, background: "#E5E9F0" }} />
            <div className="foot" style={{ marginTop: 12, textAlign: "center" }}>supersheldon.com</div>
          </div>
        </section>

        {/* ══════════════ PAGE 3 — THE APPROACH ══════════════ */}
        <section className="a4" style={{ background: "#fff" }}>
          <div style={{ padding: "20mm 22mm 0", flex: 1, display: "flex", flexDirection: "column" }}>
            <Heading eyebrow="The SuperSheldon Approach" title="How We Teach" />

            {/* Method 6 steps */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6mm", marginTop: 20 }}>
              {METHOD.map((m) => (
                <div key={m.n} style={{ padding: "16px 16px", border: "1px solid #E5E9F0", borderRadius: 14 }}>
                  <div className="h-font" style={{ fontSize: 18, fontWeight: 700, color: "var(--gold)" }}>{m.n}</div>
                  <div className="h-font" style={{ fontSize: 12.5, fontWeight: 600, color: "var(--navy)", marginTop: 6 }}>{m.t}</div>
                  <p style={{ fontSize: 10, lineHeight: 1.5, color: "#666", fontWeight: 300, marginTop: 5 }}>{m.d}</p>
                </div>
              ))}
            </div>

            {/* Why parents choose */}
            <div style={{ marginTop: "13mm" }}>
              <div className="subhead" style={{ marginBottom: 14 }}>Why Parents Choose This Program</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "11px 16mm" }}>
                {[
                  "A structured, sequential curriculum",
                  "Weekly assessments and progress tracking",
                  "Real, timed exam practice every week",
                  "Individual written feedback on work",
                  "Small-class, teacher-led instruction",
                  "Proven top-band results and methods",
                ].map((t) => (
                  <div key={t} style={{ display: "flex", gap: 11, alignItems: "center" }}>
                    <Tick />
                    <span style={{ fontSize: 12, color: "#333" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 10-week roadmap */}
            <div style={{ marginTop: "13mm" }}>
              <div className="subhead" style={{ marginBottom: 4 }}>The 10-Week Learning Journey</div>
              <p style={{ fontSize: 11, color: "#777", fontWeight: 300, marginBottom: 18 }}>
                A clear roadmap that builds from foundations to full exam readiness.
              </p>
              <div style={{ display: "flex", gap: 0, position: "relative" }}>
                {/* connecting line */}
                <div style={{ position: "absolute", top: 7, left: "8%", right: "8%", height: 2, background: "#E5E9F0" }} />
                {ROADMAP.map((r) => (
                  <div key={r.wk} style={{ flex: 1, textAlign: "center", position: "relative", padding: "0 4px" }}>
                    <div style={{ width: 16, height: 16, borderRadius: 99, background: "var(--gold)", margin: "0 auto", border: "3px solid #fff", boxShadow: "0 0 0 1px var(--gold)" }} />
                    <div className="h-font" style={{ fontSize: 10.5, fontWeight: 600, color: "var(--navy)", marginTop: 12 }}>{r.wk}</div>
                    <div className="h-font" style={{ fontSize: 11, fontWeight: 600, color: "var(--gold)", marginTop: 3 }}>{r.t}</div>
                    <p style={{ fontSize: 9, lineHeight: 1.45, color: "#777", fontWeight: 300, marginTop: 5 }}>{r.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Highlights strip */}
          <div style={{ background: "var(--navy)", padding: "16px 22mm", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}>
            {[
              "10-week program",
              "48 structured lessons",
              "Weekly mock tests",
              "Writing feedback",
              "Full practice exams",
            ].map((h) => (
              <div key={h} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Tick size={13} w={2.6} />
                <span style={{ fontSize: 9.5, color: "#fff", fontWeight: 400, lineHeight: 1.3 }}>{h}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════ PAGE 4 — CURRICULUM ══════════════ */}
        <section className="a4" style={{ background: "#fff" }}>
          <div style={{ padding: "20mm 22mm 0", flex: 1, display: "flex", flexDirection: "column" }}>
            <Heading eyebrow="The Curriculum" title="What Your Child Will Learn" />
            <p className="pbody" style={{ marginTop: 16, marginBottom: "9mm", maxWidth: "160mm" }}>
              Ten structured modules — every domain broken into the exact topics and skills assessed in NAPLAN.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5mm 6mm", flex: 1 }}>
              {MODULES.map((m) => (
                <div key={m.n} style={{ background: "var(--gray)", borderRadius: 12, padding: "13px 15px", borderLeft: "3px solid var(--gold)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
                    <span className="h-font" style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", opacity: 0.22 }}>{m.n}</span>
                    <Icon name={m.icon} size={17} />
                    <h3 className="h-font" style={{ fontSize: 12.5, fontWeight: 600, color: "var(--navy)" }}>{m.title}</h3>
                  </div>
                  <div style={{ fontSize: 8.5, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, marginBottom: 3 }}>Topics</div>
                  <p style={{ fontSize: 9, lineHeight: 1.5, color: "#555", fontWeight: 300 }}>{m.topics}</p>
                  <div style={{ fontSize: 8.5, letterSpacing: "1.2px", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, margin: "7px 0 3px" }}>Skills Developed</div>
                  <p style={{ fontSize: 9, lineHeight: 1.45, color: "var(--navy)", fontWeight: 500 }}>{m.skills}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: "0 22mm 14mm", marginTop: "10mm" }}>
            <div style={{ height: 1, background: "#E5E9F0" }} />
            <div className="foot" style={{ marginTop: 12, textAlign: "center" }}>supersheldon.com</div>
          </div>
        </section>

        {/* ══════════════ PAGE 5 — PLANS & NEXT STEPS ══════════════ */}
        <section className="a4" style={{ background: "#fff" }}>
          <div style={{ padding: "20mm 22mm 0" }}>
            <Heading eyebrow="Enrolment" title="Choose Your Plan" />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "5mm", alignItems: "stretch", marginTop: "9mm" }}>
              {[
                { name: "ESSENTIAL", classes: "24 classes", price: "A$360",   pop: false },
                { name: "COMPLETE",  classes: "48 classes", price: "A$672",   pop: true  },
                { name: "PREMIUM",   classes: "96 classes", price: "A$1,152", pop: false },
              ].map((p) => (
                <div key={p.name} style={{
                  borderRadius: 16, padding: p.pop ? "28px 18px" : "24px 18px",
                  background: p.pop ? "var(--navy)" : "#fff",
                  border: p.pop ? "2px solid var(--gold)" : "1px solid #E5E9F0",
                  position: "relative", textAlign: "center",
                  boxShadow: p.pop ? "0 14px 40px rgba(11,31,58,0.22)" : "0 4px 18px rgba(11,31,58,0.05)",
                  transform: p.pop ? "translateY(-6px)" : "none",
                }}>
                  {p.pop && (
                    <span className="eyebrow" style={{
                      position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)",
                      background: "var(--gold)", color: "var(--navy)", padding: "4px 14px",
                      borderRadius: 99, fontSize: 8.5, letterSpacing: "2px", whiteSpace: "nowrap",
                    }}>Most Popular</span>
                  )}
                  <div className="eyebrow" style={{ color: p.pop ? "var(--gold)" : "#9aa3b2", letterSpacing: "2.5px" }}>{p.name}</div>
                  <div className="h-font" style={{ fontSize: 30, fontWeight: 700, marginTop: 12, color: p.pop ? "#fff" : "var(--navy)" }}>{p.price}</div>
                  <div style={{ fontSize: 11.5, marginTop: 6, color: p.pop ? "rgba(255,255,255,0.7)" : "#777" }}>{p.classes}</div>
                </div>
              ))}
            </div>

            {/* Two-column: parent reporting + outcomes */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14mm", marginTop: "13mm" }}>
              <div>
                <div className="subhead" style={{ marginBottom: 14 }}>What Parents Receive</div>
                {[
                  "Weekly progress assessments",
                  "Detailed progress tracking",
                  "Full-length practice tests",
                  "Personalised feedback reports",
                  "Expert writing evaluations",
                ].map((t) => (
                  <div key={t} style={{ display: "flex", gap: 11, alignItems: "center", marginBottom: 12 }}>
                    <Tick />
                    <span style={{ fontSize: 12, color: "#333" }}>{t}</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="subhead" style={{ marginBottom: 14 }}>Expected Outcomes</div>
                {[
                  "Measurable improvement across all four domains",
                  "Top-band writing structure and technique",
                  "A calm, confident exam temperament",
                  "Clear insight into strengths and next steps",
                ].map((t) => (
                  <div key={t} style={{ display: "flex", gap: 11, alignItems: "flex-start", marginBottom: 12 }}>
                    <span style={{ width: 7, height: 7, borderRadius: 99, background: "var(--gold)", marginTop: 5, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: "#333", lineHeight: 1.5 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div style={{ marginTop: "11mm", background: "var(--gray)", borderRadius: 14, padding: "18px 22px", borderLeft: "3px solid var(--gold)" }}>
              <p className="h-font" style={{ fontSize: 14, fontWeight: 500, color: "var(--navy)", lineHeight: 1.5 }}>
                &ldquo;This program transformed my daughter&apos;s confidence — and her results.&rdquo;
              </p>
              <div style={{ fontSize: 10.5, color: "#777", marginTop: 8, letterSpacing: "0.3px" }}>Sunita R. · Parent of a Year 7 student</div>
            </div>
          </div>

          {/* CTA band */}
          <div style={{ marginTop: "auto", background: "var(--navy)", padding: "14mm 22mm", display: "grid", gridTemplateColumns: "1fr auto", gap: "14mm", alignItems: "center" }}>
            <div>
              <div className="eyebrow" style={{ color: "var(--gold)" }}>Your Next Step</div>
              <h2 className="h-font" style={{ fontSize: 28, fontWeight: 700, color: "#fff", marginTop: 10, lineHeight: 1.1, letterSpacing: "-0.3px" }}>
                Book a Free<br />Demo Lesson
              </h2>
              <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 9 }}>
                <div>
                  <div style={{ fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Website</div>
                  <div className="h-font" style={{ fontSize: 15, fontWeight: 500, color: "var(--gold)" }}>supersheldon.com</div>
                </div>
                <div>
                  <div style={{ fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>WhatsApp</div>
                  <div className="h-font" style={{ fontSize: 15, fontWeight: 500, color: "var(--gold)" }}>+91 7974 695 618</div>
                </div>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ background: "#fff", padding: 12, borderRadius: 14, display: "inline-block" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={QR_SRC} alt="Scan to book a demo" style={{ width: 92, height: 92, display: "block" }} />
              </div>
              <div className="eyebrow" style={{ color: "rgba(255,255,255,0.6)", marginTop: 12, letterSpacing: "2px" }}>Scan to Book</div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
