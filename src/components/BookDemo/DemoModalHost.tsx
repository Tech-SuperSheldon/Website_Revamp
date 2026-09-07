"use client";

// Mounted once, in the root layout. Renders the "Book a Demo" wizard in a
// dialog whenever any CTA on the site calls openDemoModal().
//
// The wizard itself is exactly the one /demo and /au/demo render — same
// component, same steps, same partial-lead capture and same submit calls —
// only laid out as a panel instead of a full page.

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import BookDemoForm from "./BookDemoForm";
import {
  closeDemoModal,
  getDemoModalState,
  subscribeDemoModal,
  type DemoMarket,
  type DemoModalState,
} from "./demoModalStore";

export default function DemoModalHost() {
  const [state, setState] = useState<DemoModalState>({ open: false });
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    // Catch anything opened between module init and this effect running.
    setState(getDemoModalState());
    return subscribeDemoModal(setState);
  }, []);

  // Close on route change, so a link inside the wizard (or a back-navigation)
  // never leaves the dialog stranded over a different page.
  useEffect(() => {
    closeDemoModal();
  }, [pathname]);

  // Escape to dismiss + scroll lock while open.
  useEffect(() => {
    if (!state.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDemoModal();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [state.open]);

  if (!mounted || !state.open) return null;

  // AU visitors get the AU wizard (AU dial code, AU "Back to Home" target);
  // everything else — global and UK — shares the "uk" one, matching what
  // /demo vs /au/demo did before.
  const market: DemoMarket =
    state.market ?? (pathname?.startsWith("/au") ? "au" : "uk");

  return createPortal(
    <div
      // Above everything else that floats: the chatbot bubble (z-9999), the
      // floating "Try a Free Class" pill (z-9995) and the cookie-consent bar
      // (z-99999), which otherwise covers the wizard's Next/Confirm button on
      // mobile.
      className="fixed inset-0 z-[100000] flex items-start justify-center overflow-y-auto overscroll-contain bg-black/60 p-3 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Book a free demo class"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeDemoModal();
      }}
    >
      <div className="relative my-auto w-full max-w-4xl">
        <button
          type="button"
          onClick={closeDemoModal}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-md ring-1 ring-black/5 transition-colors hover:bg-white hover:text-gray-900"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="overflow-hidden rounded-2xl shadow-2xl">
          <BookDemoForm market={market} variant="modal" onClose={closeDemoModal} />
        </div>
      </div>
    </div>,
    document.body
  );
}
