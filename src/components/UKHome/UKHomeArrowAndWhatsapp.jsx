"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// Inline SVG instead of `react-icons/fa`. This component is eagerly imported by
// the /new-home page, and importing from the react-icons barrel pulls a large
// module into the initial bundle just for one glyph. The inline path is ~0KB.
function FaWhatsapp({ className }) {
  return (
    <svg viewBox="0 0 448 512" className={className} fill="currentColor" aria-hidden="true">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 438.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.5-186.6 184.5zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
}

const WAPP_URL =
  "https://api.whatsapp.com/send/?phone=917974695618&text&type=phone_number&app_absent=0";

export default function UKHomeArrowAndWhatsapp({ side = "right", mobileBar = false }) {
  const [show, setShow] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleNovaClick = () => {
    window.dispatchEvent(new CustomEvent("openNova"));
  };

  const positionClass =
    side === "left"
      ? "left-3 bottom-3 md:left-6 md:bottom-6"
      : "right-4 bottom-[4.5rem] md:right-5 md:bottom-[5.2rem]";

  /* ── Mobile collapsible bar (only when mobileBar=true) ── */
  if (mobileBar) {
    return (
      <>
        {/* ─── MOBILE: arrow + collapsible icons ─── */}
        <div
          className={`md:hidden fixed right-0 bottom-4 z-[9998] flex flex-col items-end gap-2 transition-opacity duration-500 ${
            show ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Arrow toggle — always attached to right edge */}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="w-7 h-10 bg-blue-500 text-white flex items-center justify-center rounded-l-full shadow-md hover:bg-blue-600 transition-colors"
            aria-label={collapsed ? "Show floating buttons" : "Hide floating buttons"}
          >
            {collapsed ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </button>

          {/* Icons — slide off to the right when collapsed */}
          <div
            className={`flex flex-col gap-2 pr-3 transition-all duration-300 ${
              collapsed
                ? "translate-x-[calc(100%+24px)] opacity-0 pointer-events-none"
                : "translate-x-0 opacity-100"
            }`}
          >
            {/* WhatsApp */}
            <button
              onClick={() => window.open(WAPP_URL, "_blank")}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 shadow-lg hover:scale-105 transition-transform"
              title="WhatsApp"
            >
              <FaWhatsapp className="h-6 w-6 text-white" />
            </button>

            {/* Nova */}
            <button
              onClick={handleNovaClick}
              className="relative w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 shadow-lg overflow-hidden border-2 border-white/40 hover:scale-105 transition-transform"
              title="Chat with Nova"
            >
              <Image src="/nova-icon.webp" alt="Nova" fill className="object-cover" />
            </button>
          </div>
        </div>

        {/* ─── DESKTOP: standard WhatsApp button only ─── */}
        <div
          className={`hidden md:flex fixed right-5 bottom-[5.2rem] z-50 flex-col items-center gap-3 transition-all duration-500 ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <button
            onClick={() => window.open(WAPP_URL, "_blank")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 shadow-lg transition-transform hover:-translate-y-1 hover:scale-105"
            title="WhatsApp"
          >
            <FaWhatsapp className="h-5 w-5 text-white" />
          </button>
        </div>
      </>
    );
  }

  /* ── Default behaviour (all other pages) ── */
  return (
    <div
      className={`fixed ${positionClass} z-50 flex flex-col items-center gap-2 md:gap-3 transition-all duration-500 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <button
        onClick={() => window.open(WAPP_URL, "_blank")}
        className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-green-500 shadow-lg transition-transform hover:-translate-y-1 hover:scale-105"
        title="WhatsApp"
      >
        <FaWhatsapp className="h-4 w-4 md:h-5 md:w-5 text-white" />
      </button>
    </div>
  );
}
