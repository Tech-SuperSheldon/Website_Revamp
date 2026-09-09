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
import { type Locale } from "@/lib/academies";

/** "/au", "/au/academies/…" → "au"; "/uk…" → "uk"; anything else → "global". */
function localeFromPath(pathname: string | null): Locale {
  const path = pathname || "/";
  if (path === "/au" || path.startsWith("/au/")) return "au";
  if (path === "/uk" || path.startsWith("/uk/")) return "uk";
  return "global";
}

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

  // One wizard for the whole site: /au and /uk deliberately show the same
  // academies, exam list and dial code as "/". The *market* still has to
  // follow the path, though — it decides which sheet tab the lead lands in
  // (AU leads in "Aus", UK in "UK", everything else in "Demo Bookings"), and
  // hardcoding it meant every lead on the site was filed as UK.
  const locale: Locale = localeFromPath(pathname);
  const market: DemoMarket = locale;

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
      <div className="relative my-auto w-full max-w-xl">
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
          <BookDemoForm
            market={market}
            locale={locale}
            variant="modal"
            onClose={closeDemoModal}
            // A hero form that already took a phone number hands it over, so
            // the wizard's phone step opens filled in instead of asking again.
            prefillPhone={state.prefill?.phone}
            prefillDialCode={state.prefill?.dialCode}
            // A CTA on an academy page knows the track already, so the wizard
            // opens on that academy's subject/exam step.
            prefillAcademySlug={state.prefill?.academySlug}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
