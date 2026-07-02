"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const WAPP_URL =
  "https://api.whatsapp.com/send/?phone=917974695618&text&type=phone_number&app_absent=0";

export default function FloatingArrowWhatsApp({ side = "right", mobileBar = false }) {
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
            className="w-7 h-10 bg-orange-500 text-white flex items-center justify-center rounded-l-full shadow-md hover:bg-orange-600 transition-colors"
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
              className="relative w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-400 shadow-lg overflow-hidden border-2 border-white/40 hover:scale-105 transition-transform"
              title="Chat with Nova"
            >
              <Image src="/nova-icon.png" alt="Nova" fill className="object-cover" />
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
