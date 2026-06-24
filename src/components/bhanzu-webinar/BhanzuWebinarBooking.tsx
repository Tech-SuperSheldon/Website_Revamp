"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer";

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
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const COUNTRY_CODES = [
  { flag: "🇦🇺", code: "+61",  label: "Australia" },
  { flag: "🇮🇳", code: "+91",  label: "India" },
  { flag: "🇬🇧", code: "+44",  label: "UK" },
];

const HERO_IMAGES = [
  "/bhanzu-webinar/webinar-hero-1.png",
  "/bhanzu-webinar/webinar-hero-2.png",
];

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
  const [visible, setVisible] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0]);

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
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex(i => (i + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
          phone: `${countryCode.code}${phone.trim()}`,
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

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-22px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(241,93,34,0.35); }
          70%  { box-shadow: 0 0 0 10px rgba(241,93,34,0); }
          100% { box-shadow: 0 0 0 0 rgba(241,93,34,0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }

        .wbr-page {
          min-height: 100vh;
          background-color: #ffffff;
          background-image: radial-gradient(circle, #d1d5db 1px, transparent 1px);
          background-size: 28px 28px;
          font-family: ${FONT};
          display: flex;
          flex-direction: column;
        }

        /* ── HEADER ── */
        .wbr-header {
          padding: 6px 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(0,0,0,0.06);
          position: static;
          animation: fadeIn 0.5s ease both;
        }

        /* ── MAIN ── */
        .wbr-main {
          flex: 1;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          padding: 16px 40px 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: start;
        }

        /* ── LEFT COLUMN ── */
        .wbr-left {
          opacity: 0;
          animation: fadeUp 0.65s ease 0.15s both;
        }
        .wbr-left.visible { animation-play-state: running; }

        /* ── RIGHT COLUMN ── */
        .wbr-right {
          display: flex;
          flex-direction: column;
          gap: 24px;
          opacity: 0;
          animation: fadeUp 0.65s ease 0.35s both;
        }
        .wbr-right.visible { animation-play-state: running; }

        /* ── PILL BADGE ── */
        .wbr-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #FFF4F0;
          border: 1.5px solid #FDDDD3;
          border-radius: 999px;
          padding: 5px 14px;
          font-size: 11px;
          font-weight: 700;
          color: #F15D22;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          margin-bottom: 16px;
        }
        .wbr-pill-dot {
          width: 6px; height: 6px;
          background: #F15D22;
          border-radius: 50%;
          animation: pulse-ring 1.8s ease infinite;
        }

        /* ── FORM CARD ── */
        .wbr-form-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 4px 32px rgba(0,0,0,0.10);
          border: 1px solid #F0F0F0;
          transition: box-shadow 0.3s;
        }
        .wbr-form-card:hover {
          box-shadow: 0 8px 48px rgba(0,0,0,0.14);
        }

        /* ── FIELD ── */
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

        /* ── BUTTON ── */
        .wbr-btn {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          background: linear-gradient(135deg, #F15D22 0%, #e04e15 100%);
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          font-family: ${FONT};
          border: none;
          cursor: pointer;
          letter-spacing: 0.5px;
          transition: background 0.25s, transform 0.15s, box-shadow 0.25s;
          position: relative;
          overflow: hidden;
        }
        .wbr-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          background-size: 400px 100%;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .wbr-btn:hover:not(:disabled)::after { opacity: 1; animation: shimmer 0.7s linear; }
        .wbr-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #C04A1B 0%, #a33e14 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(241,93,34,0.35);
        }
        .wbr-btn:active:not(:disabled) { transform: translateY(0); }
        .wbr-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        /* ── STATS ── */
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
          transition: background 0.2s;
        }
        .wbr-stat-item:first-child { border-left: none; }
        .wbr-stat-item:hover { background: #FFF4F0; }

        @keyframes floatA {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33%       { transform: translateY(-10px) rotate(6deg); }
          66%       { transform: translateY(-5px) rotate(-4deg); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          40%       { transform: translateY(-14px) rotate(-8deg); }
          70%       { transform: translateY(-6px) rotate(5deg); }
        }
        @keyframes floatC {
          0%, 100% { transform: translateY(0) scale(1); }
          50%       { transform: translateY(-8px) scale(1.08); }
        }
        @keyframes floatD {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          45%       { transform: translateY(-12px) rotate(12deg); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes heroFadeOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        .wbr-hero-slides-container {
          display: grid;
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
        }
        .wbr-hero-slide {
          grid-area: 1 / 1;
          border-radius: 20px;
          overflow: hidden;
          transition: opacity 0.8s ease-in-out;
        }
        .wbr-hero-slide img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 20px;
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbitDot {
          0%   { transform: translate(0, 0); }
          25%  { transform: translate(6px, -8px); }
          50%  { transform: translate(0px, -14px); }
          75%  { transform: translate(-6px, -8px); }
          100% { transform: translate(0, 0); }
        }

        /* ── HERO IMAGE ── */
        .wbr-hero-img {
          border-radius: 20px;
          overflow: visible;
          box-shadow: 0 8px 40px rgba(0,0,0,0.14);
          animation: float 5s ease-in-out infinite;
          transition: box-shadow 0.3s;
          position: relative;
        }
        .wbr-hero-img > img {
          border-radius: 20px;
          overflow: hidden;
          display: block;
        }
        .wbr-hero-img:hover {
          box-shadow: 0 16px 56px rgba(0,0,0,0.20);
          animation-play-state: paused;
        }
        /* shapes */
        .wbr-shape {
          position: absolute;
          pointer-events: none;
          z-index: 2;
        }
        .wbr-shape-circle-orange {
          width: 52px; height: 52px;
          border-radius: 50%;
          background: #F15D22;
          opacity: 0.88;
          top: -18px; right: -18px;
          animation: floatA 4.2s ease-in-out infinite;
          box-shadow: 0 4px 18px rgba(241,93,34,0.45);
        }
        .wbr-shape-ring {
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 4px solid #F15D22;
          background: transparent;
          opacity: 0.75;
          top: 44px; right: -28px;
          animation: floatB 5.5s ease-in-out infinite;
        }
        .wbr-shape-square {
          width: 32px; height: 32px;
          background: #0D1B2A;
          border-radius: 6px;
          opacity: 0.80;
          bottom: 30px; right: -20px;
          animation: floatD 4.8s ease-in-out infinite;
          box-shadow: 0 4px 14px rgba(13,27,42,0.35);
        }
        .wbr-shape-triangle {
          width: 0; height: 0;
          border-left: 20px solid transparent;
          border-right: 20px solid transparent;
          border-bottom: 36px solid #F15D22;
          opacity: 0.70;
          bottom: -16px; left: 28px;
          animation: floatA 6s ease-in-out infinite 0.8s;
        }
        .wbr-shape-dot-group {
          bottom: -10px; right: 40px;
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 6px;
          animation: floatC 5s ease-in-out infinite 1s;
        }
        .wbr-shape-dot-group span {
          display: block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #0D1B2A;
          opacity: 0.55;
        }
        .wbr-shape-plus {
          top: -14px; left: 32px;
          font-size: 28px;
          font-weight: 900;
          color: #0D1B2A;
          opacity: 0.18;
          line-height: 1;
          animation: floatB 7s ease-in-out infinite 0.5s;
          user-select: none;
        }
        .wbr-shape-star {
          top: 28px; left: -22px;
          font-size: 26px;
          animation: floatA 5.2s ease-in-out infinite 1.2s;
          filter: drop-shadow(0 2px 6px rgba(241,93,34,0.4));
          user-select: none;
        }
        .wbr-shape-hex {
          width: 36px; height: 36px;
          background: #FFF4F0;
          border: 2.5px solid #F15D22;
          border-radius: 8px;
          transform: rotate(20deg);
          opacity: 0.85;
          bottom: 60px; left: -20px;
          animation: floatD 6.5s ease-in-out infinite 0.3s;
          box-shadow: 0 3px 10px rgba(241,93,34,0.2);
        }

        /* ── BADGE ── */
        .wbr-badge {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #FFF4F0;
          border: 1.5px solid #FDDDD3;
          border-radius: 12px;
          padding: 16px 20px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .wbr-badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(241,93,34,0.15);
        }
        .wbr-badge-icon {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: #F15D22;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 20px;
          animation: pulse-ring 2.5s ease infinite;
        }

        /* ── DROPDOWN ── */
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
          animation: fadeUp 0.18s ease both;
        }
        .wbr-dropdown-item {
          padding: 10px 14px;
          font-size: 14px;
          cursor: pointer;
          color: #0D1B2A;
          border-bottom: 1px solid #F3F4F6;
          transition: background 0.15s;
        }
        .wbr-dropdown-item:last-child { border-bottom: none; }
        .wbr-dropdown-item:hover { background: #FFF4F0; }

        /* ── SUCCESS STATE ── */
        .wbr-success {
          text-align: center;
          padding: 24px 0;
          animation: scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        .wbr-success-icon {
          font-size: 52px;
          margin-bottom: 16px;
          display: block;
          animation: float 3s ease-in-out infinite;
        }

        /* ── INFO BOXES ── */
        .wbr-info-section {
          max-width: 1200px;
          margin: 48px auto 0;
          width: 100%;
          padding: 0 40px 48px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .wbr-info-box {
          border-radius: 20px;
          padding: 28px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .wbr-info-box-title {
          font-size: 17px;
          font-weight: 700;
          color: #0D1B2A;
          font-family: ${FONT};
        }
        .wbr-info-box-value {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          font-family: ${FONT};
          line-height: 1.6;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 820px) {
          .wbr-main {
            grid-template-columns: 1fr;
            gap: 36px;
            padding: 16px 20px 0;
          }
          .wbr-header { padding: 10px 20px; }
          .wbr-stats { grid-template-columns: 1fr; }
          .wbr-stat-item { border-left: none; border-top: 1.5px solid #E5E7EB; }
          .wbr-stat-item:first-child { border-top: none; }
          .wbr-info-section {
            grid-template-columns: 1fr;
            padding: 0 20px 40px;
          }
        }
      `}</style>

      <div className="wbr-page">

        {/* ── HEADER ── */}
        <header className="wbr-header">
          <Link href="/">
            <img src="/Final-Logo-bg-removed.png" alt="SuperSheldon" style={{ height: "100px", width: "auto" }} />
          </Link>
        </header>

        {/* ── MAIN TWO-COLUMN ── */}
        <div className="wbr-main">

          {/* LEFT — headline + form */}
          <div className={`wbr-left${visible ? " visible" : ""}`}>

            <div className="wbr-pill">
              <span className="wbr-pill-dot" />
              Free Online Webinar
            </div>

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
                <div className="wbr-success">
                  <span className="wbr-success-icon">🎉</span>
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
                          <div style={{ position: "relative", flexShrink: 0, borderRight: "1.5px solid #E5E7EB", backgroundColor: "#F9FAFB" }}>
                            <select
                              value={countryCode.code}
                              onChange={e => setCountryCode(COUNTRY_CODES.find(c => c.code === e.target.value)!)}
                              style={{
                                appearance: "none",
                                WebkitAppearance: "none",
                                border: "none",
                                background: "transparent",
                                padding: "0 28px 0 10px",
                                height: "100%",
                                fontSize: "13px",
                                fontWeight: 600,
                                color: C.text2,
                                fontFamily: FONT,
                                cursor: "pointer",
                                outline: "none",
                              }}
                            >
                              {COUNTRY_CODES.map(c => (
                                <option key={c.code} value={c.code}>
                                  {c.flag} {c.code}
                                </option>
                              ))}
                            </select>
                            <svg style={{ position: "absolute", right: "6px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="12" height="12" viewBox="0 0 16 16" fill="none">
                              <path d="M4 6L8 10L12 6" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
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

                      {/* School — smart combobox */}
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
                      <img src="/Final-Logo-bg-removed.png" alt="SuperSheldon" style={{ height: "36px", width: "auto", opacity: 0.85 }} />
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* RIGHT — image + stats */}
          <div className={`wbr-right${visible ? " visible" : ""}`}>

            {/* Hero image slideshow */}
            <div className="wbr-hero-img">
              <div className="wbr-hero-slides-container">
                {HERO_IMAGES.map((src, i) => (
                  <div
                    key={src}
                    className="wbr-hero-slide"
                    style={{ opacity: i === heroIndex ? 1 : 0 }}
                  >
                    <img src={src} alt={`Webinar hero ${i + 1}`} />
                  </div>
                ))}
              </div>

              {/* floating shapes */}
              <span className="wbr-shape wbr-shape-circle-orange" />
              <span className="wbr-shape wbr-shape-ring" />
              <span className="wbr-shape wbr-shape-square" />
              <span className="wbr-shape wbr-shape-triangle" />
              <span className="wbr-shape wbr-shape-hex" />
              <span className="wbr-shape wbr-shape-star">✦</span>
              <span className="wbr-shape wbr-shape-plus">+</span>
              <span className="wbr-shape wbr-shape-dot-group">
                {Array.from({ length: 9 }).map((_, i) => <span key={i} />)}
              </span>
            </div>

          </div>

        </div>

        {/* ── INFO BOXES ── */}
        <div className="wbr-info-section">
          <div className="wbr-info-box" style={{ backgroundColor: "#C8DFF0" }}>
            <p className="wbr-info-box-title">Topic</p>
            <p className="wbr-info-box-value">&ldquo;Top Selective School Strategies Every Parent Should Know&rdquo; for Year 3-6</p>
          </div>
          <div className="wbr-info-box" style={{ backgroundColor: "#F5EDA8" }}>
            <p className="wbr-info-box-title">Year</p>
            <p className="wbr-info-box-value">3-4-5-6</p>
          </div>
          <div className="wbr-info-box" style={{ backgroundColor: "#E0C8F0" }}>
            <p className="wbr-info-box-title">Date &amp; Time</p>
            <p className="wbr-info-box-value">Date: 26/06/2026
Time: 10 AM BST
Platform: Zoom</p>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <Footer />

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
