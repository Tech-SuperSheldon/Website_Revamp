"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";

const C = {
  orange: "#F15D22",
  orangeDark: "#C04A1B",
  dark: "#0D1B2A",
  text2: "#4B5563",
  textMid: "#6B7280",
  white: "#FFFFFF",
  border: "#E5E7EB",
};

const FONT = "'Quicksand', 'DM Sans', sans-serif";
const YEARS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

const fieldBase: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  border: "1.5px solid #E5E7EB",
  borderRadius: "8px",
  fontSize: "14px",
  fontFamily: FONT,
  color: C.dark,
  backgroundColor: C.white,
  outline: "none",
  boxSizing: "border-box",
  appearance: "none",
  WebkitAppearance: "none",
};

export default function BhanzuWebinarBooking() {
  const [school, setSchool] = useState("");
  const [year, setYear] = useState("");
  const [studentName, setStudentName] = useState("");
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [schoolSuggestions, setSchoolSuggestions] = useState<string[]>([]);
  const [schoolOpen, setSchoolOpen] = useState(false);
  const schoolRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();

  const fetchSchools = useCallback(async () => {
    try {
      const res = await fetch("/api/webinar/schools");
      if (res.ok) {
        const data = await res.json();
        setSchoolSuggestions(data.schools ?? []);
      }
    } catch { /* silent */ }
  }, []);

  useEffect(() => { fetchSchools(); }, [fetchSchools]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (schoolRef.current && !schoolRef.current.contains(e.target as Node)) {
        setSchoolOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredSchools = school.trim()
    ? schoolSuggestions.filter(s => s.toLowerCase().includes(school.toLowerCase()))
    : schoolSuggestions;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    if (school.trim()) {
      fetch("/api/webinar/schools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school: school.trim() }),
      }).catch(() => {});
    }

    try {
      const res = await fetch("/api/utm-sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_name: studentName.trim(),
          parent_name: parentName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          school: school.trim(),
          grade: year,
          utm_source: searchParams.get("utm_source") ?? "",
          utm_medium: searchParams.get("utm_medium") ?? "",
          utm_campaign: searchParams.get("utm_campaign") ?? "",
          utm_content: searchParams.get("utm_content") ?? "",
          utm_term: searchParams.get("utm_term") ?? "",
          source_url: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        select option { color: #0D1B2A; }
        input::placeholder, textarea::placeholder { color: #9CA3AF; }
        .wbr-page {
          min-height: 100vh;
          background-color: #ffffff;
          background-image: radial-gradient(circle, #d1d5db 1px, transparent 1px);
          background-size: 28px 28px;
          font-family: ${FONT};
          display: flex;
          flex-direction: column;
        }
        .wbr-header {
          padding: 6px 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255,255,255,0.95);
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .wbr-main {
          flex: 1;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          padding: 16px 40px 80px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: start;
        }
        .wbr-form-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 4px 32px rgba(0,0,0,0.10);
          border: 1px solid #F0F0F0;
        }
        .wbr-field-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          color: #6B7280;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 6px;
        }
        .wbr-input-focus:focus {
          border-color: #F15D22 !important;
          box-shadow: 0 0 0 3px rgba(241,93,34,0.12);
        }
        .wbr-btn {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          background: #F15D22;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          font-family: ${FONT};
          border: none;
          cursor: pointer;
          letter-spacing: 0.5px;
          transition: background 0.2s, transform 0.1s;
        }
        .wbr-btn:hover:not(:disabled) {
          background: #C04A1B;
          transform: translateY(-1px);
        }
        .wbr-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .wbr-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border: 1.5px solid #E5E7EB;
          border-radius: 12px;
          overflow: hidden;
          background: #FAFAFA;
        }
        .wbr-stat-item {
          padding: 18px 14px;
          text-align: center;
          border-left: 1.5px solid #E5E7EB;
        }
        .wbr-stat-item:first-child { border-left: none; }
        .wbr-dropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: 0; right: 0;
          background: #fff;
          border: 1.5px solid #E5E7EB;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          z-index: 100;
          max-height: 200px;
          overflow-y: auto;
        }
        .wbr-dropdown-item {
          padding: 10px 14px;
          font-size: 14px;
          cursor: pointer;
          color: #0D1B2A;
          border-bottom: 1px solid #F3F4F6;
        }
        .wbr-dropdown-item:last-child { border-bottom: none; }
        .wbr-dropdown-item:hover { background: #FFF4F0; }
        .wbr-footer {
          background: #0D1B2A;
          color: #fff;
          padding: 48px 24px;
          text-align: center;
        }
        @media (max-width: 820px) {
          .wbr-main {
            grid-template-columns: 1fr;
            gap: 36px;
            padding: 16px 20px 60px;
          }
          .wbr-header { padding: 10px 20px; }
          .wbr-stats { grid-template-columns: 1fr; }
          .wbr-stat-item { border-left: none; border-top: 1.5px solid #E5E7EB; }
          .wbr-stat-item:first-child { border-top: none; }
        }
      `}</style>

      <div className="wbr-page">

        {/* ── HEADER ── */}
        <header className="wbr-header">
          <a href="/">
            <img src="/Final-Logo-bg-removed.png" alt="SuperSheldon" style={{ height: "100px", width: "auto" }} />
          </a>
        </header>

        {/* ── MAIN TWO-COLUMN ── */}
        <div className="wbr-main">

          {/* LEFT — headline + form */}
          <div>
            <p style={{ fontSize: "12px", fontWeight: 700, color: C.orange, textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: "14px" }}>
              Free Online Webinar
            </p>
            <h1 style={{ fontSize: "clamp(30px, 3.2vw, 46px)", fontWeight: 800, color: C.dark, lineHeight: 1.15, marginBottom: "10px" }}>
              How to unlock the<br />magic of{" "}
              <span style={{ color: C.orange, fontStyle: "italic" }}>geometry</span>
            </h1>
            <p style={{ fontSize: "14px", color: C.text2, marginBottom: "32px", lineHeight: 1.6 }}>
              Designed by <strong>Neelakantha Bhanu</strong> — World&apos;s Fastest Human Calculator
            </p>

            {/* FORM CARD */}
            <div className="wbr-form-card">
              {submitted ? (
                <div style={{ textAlign: "center", padding: "24px 0" }}>
                  <div style={{ fontSize: "52px", marginBottom: "16px" }}>🎉</div>
                  <p style={{ fontSize: "20px", fontWeight: 700, color: C.dark, marginBottom: "10px" }}>You&apos;re registered!</p>
                  <p style={{ fontSize: "14px", color: C.text2, lineHeight: 1.7 }}>
                    Thank you, <strong>{parentName}</strong>. Your spot is confirmed.<br />
                    Check <strong>{email}</strong> for details.
                  </p>
                </div>
              ) : (
                <>
                  <h2 style={{ fontSize: "18px", fontWeight: 700, color: C.dark, marginBottom: "4px" }}>
                    Register for the Free Webinar
                  </h2>
                  <p style={{ fontSize: "13px", color: C.textMid, marginBottom: "24px" }}>
                    Secure your spot today — limited seats available.
                  </p>

                  <form onSubmit={handleRegister}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>

                      {/* Student Name */}
                      <div>
                        <label className="wbr-field-label">Student&apos;s Name</label>
                        <input
                          className="wbr-input-focus"
                          value={studentName}
                          onChange={e => setStudentName(e.target.value)}
                          placeholder="Enter student's name"
                          required
                          style={fieldBase}
                        />
                      </div>

                      {/* Parent Name */}
                      <div>
                        <label className="wbr-field-label">Parent&apos;s Name</label>
                        <input
                          className="wbr-input-focus"
                          value={parentName}
                          onChange={e => setParentName(e.target.value)}
                          placeholder="Enter parent's name"
                          required
                          style={fieldBase}
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="wbr-field-label">Mobile Number</label>
                        <div style={{ display: "flex", border: "1.5px solid #E5E7EB", borderRadius: "8px", overflow: "hidden", backgroundColor: C.white }}>
                          <div style={{ display: "flex", alignItems: "center", padding: "0 10px", borderRight: "1.5px solid #E5E7EB", gap: "4px", flexShrink: 0, backgroundColor: "#F9FAFB" }}>
                            <span style={{ fontSize: "16px", lineHeight: 1 }}>🇮🇳</span>
                            <span style={{ fontSize: "13px", color: C.text2, fontWeight: 600 }}>+91</span>
                          </div>
                          <input
                            className="wbr-input-focus"
                            value={phone}
                            onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
                            placeholder="Parent's number"
                            required
                            type="tel"
                            style={{ ...fieldBase, border: "none", borderRadius: 0, flex: 1, paddingLeft: "10px" }}
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="wbr-field-label">Parent&apos;s Email</label>
                        <input
                          className="wbr-input-focus"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="Enter email address"
                          required
                          type="email"
                          style={fieldBase}
                        />
                      </div>

                      {/* School – smart combobox */}
                      <div ref={schoolRef} style={{ position: "relative" }}>
                        <label className="wbr-field-label">School / Association</label>
                        <input
                          className="wbr-input-focus"
                          value={school}
                          onChange={e => { setSchool(e.target.value); setSchoolOpen(true); }}
                          onFocus={() => setSchoolOpen(true)}
                          placeholder="Enter school name"
                          required
                          autoComplete="off"
                          style={{ ...fieldBase, paddingRight: "36px" }}
                        />
                        <Chevron />
                        {schoolOpen && filteredSchools.length > 0 && (
                          <div className="wbr-dropdown">
                            {filteredSchools.map(s => (
                              <div
                                key={s}
                                className="wbr-dropdown-item"
                                onMouseDown={e => { e.preventDefault(); setSchool(s); setSchoolOpen(false); }}
                              >
                                {s}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Year */}
                      <div style={{ position: "relative" }}>
                        <label className="wbr-field-label">Year</label>
                        <select
                          className="wbr-input-focus"
                          value={year}
                          onChange={e => setYear(e.target.value)}
                          required
                          style={{ ...fieldBase, color: year ? C.dark : "#9CA3AF", paddingRight: "36px", cursor: "pointer" }}
                        >
                          <option value="">Select Year</option>
                          {YEARS.map(y => <option key={y} value={y}>Year {y}</option>)}
                        </select>
                        <Chevron />
                      </div>
                    </div>

                    <p style={{ fontSize: "11px", color: C.textMid, lineHeight: 1.6, marginBottom: "20px" }}>
                      Information you provide when registering will be shared with the account owner and host in accordance with their Terms and Privacy Policy.
                    </p>

                    {error && (
                      <p style={{ fontSize: "13px", color: "#DC2626", marginBottom: "12px", textAlign: "center" }}>{error}</p>
                    )}

                    <button type="submit" disabled={submitting} className="wbr-btn">
                      {submitting ? "Registering…" : "Register Now — It's Free"}
                    </button>

                    <div style={{ marginTop: "16px", display: "flex", justifyContent: "center" }}>
                      <img src="/bhanzu-webinar/powered_by_zoom.svg" alt="Powered By Zoom" style={{ height: "22px", width: "auto", opacity: 0.7 }} />
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* RIGHT — image + stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Hero image */}
            <div style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.14)" }}>
              <img
                src="/webinar-hero.png"
                alt="Webinar — students learning"
                style={{ width: "100%", display: "block", objectFit: "cover" }}
              />
            </div>

            {/* Webinar stats */}
            <div className="wbr-stats">
              {[
                { label: "Topic", value: "How to crack the secret language of Math — for Years 1–3" },
                { label: "Year", value: "1 · 2 · 3" },
                { label: "Date & Time", value: "18 April 2026, 10:00 AM +04" },
              ].map((item, i) => (
                <div key={item.label} className="wbr-stat-item" style={i > 0 ? {} : {}}>
                  <p style={{ fontSize: "10px", fontWeight: 700, color: C.textMid, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "6px" }}>
                    {item.label}
                  </p>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: C.dark, lineHeight: 1.4 }}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* Designed by badge */}
            <div style={{
              display: "flex", alignItems: "center", gap: "14px",
              background: "#FFF4F0", border: "1.5px solid #FDDDD3",
              borderRadius: "12px", padding: "16px 20px",
            }}>
              <div style={{
                width: "44px", height: "44px", borderRadius: "50%",
                background: C.orange, display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, fontSize: "20px",
              }}>
                🧮
              </div>
              <div>
                <p style={{ fontSize: "12px", fontWeight: 600, color: C.textMid, marginBottom: "2px" }}>Webinar designed by</p>
                <p style={{ fontSize: "15px", fontWeight: 700, color: C.dark }}>Neelakantha Bhanu</p>
                <p style={{ fontSize: "12px", color: C.orange, fontWeight: 600 }}>World&apos;s Fastest Human Calculator</p>
              </div>
            </div>
          </div>

        </div>

        {/* ── FOOTER ── */}
        <footer className="wbr-footer">
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <img src="/Final-Logo-bg-removed.png" alt="SuperSheldon" style={{ height: "72px", width: "auto", marginBottom: "16px" }} />
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#fff", marginBottom: "20px", letterSpacing: "0.3px" }}>Supersheldon</p>

            <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "24px" }}>
              {[
                { src: "/bhanzu-webinar/facebook.svg",  alt: "Facebook",  href: "https://www.facebook.com/SuperSheldonmath/" },
                { src: "/bhanzu-webinar/instagram.svg", alt: "Instagram", href: "https://www.instagram.com/supersheldon_math/" },
                { src: "/bhanzu-webinar/linkedin.svg",  alt: "LinkedIn",  href: "https://www.linkedin.com/company/supersheldon/" },
              ].map(s => (
                <a key={s.alt} href={s.href} target="_blank" rel="noopener noreferrer">
                  <img src={s.src} alt={s.alt} width={24} height={24} style={{ width: "24px", height: "24px", opacity: 0.85 }} />
                </a>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "36px" }}>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>
                📞 <a href="tel:+917974695618" style={{ color: "inherit", textDecoration: "none" }}>+91 7974695618</a>
                &nbsp;&nbsp;·&nbsp;&nbsp;
                <a href="tel:+61485860132" style={{ color: "inherit", textDecoration: "none" }}>+61 485860132</a>
              </p>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>
                ✉️ <a href="mailto:support@supersheldon.com" style={{ color: "inherit", textDecoration: "none" }}>support@supersheldon.com</a>
              </p>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                📍 Om Chambers 648/A 4th Flr, Binnamangala 1st Stage, Bangalore 560038, India
              </p>
            </div>

            <h2 style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 700, color: "rgba(255,255,255,0.75)", marginBottom: "4px" }}>
              Learn Math the
            </h2>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>
              #SuperSheldonWay
            </h1>
          </div>
        </footer>

      </div>
    </>
  );
}

function Chevron() {
  return (
    <svg
      style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
      width="16" height="16" viewBox="0 0 16 16" fill="none"
    >
      <path d="M4 6L8 10L12 6" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
