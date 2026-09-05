"use client";

// Floating "Try a Free Class" pill, docked bottom-center.
//
// Hides itself only while a CTA it would duplicate is *pinned* on screen —
// the header's own "Try a free Class" button and the mobile menu overlay's
// copy of it, both marked with `data-floating-cta-avoid` (see NSheader.tsx).
//
// It deliberately does NOT hide for in-page section CTAs any more: those
// scroll past constantly, so watching them made the pill blink in and out on
// the way down the landing page. It now stays put for the whole scroll.
//
// On desktop the header's CTA is fixed at the top and effectively always in
// view, so this naturally stays hidden there without any viewport-specific
// class — in practice it only ever surfaces on mobile.
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SPRING } from "@/lib/motion";

const AVOID_SELECTOR = "[data-floating-cta-avoid]";

function useAnyAvoidTargetVisible() {
  const [anyVisible, setAnyVisible] = useState(false);
  const visibleSet = useRef<Set<Element>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleSet.current.add(entry.target);
          else visibleSet.current.delete(entry.target);
        });
        setAnyVisible(visibleSet.current.size > 0);
      },
      // Shrink the effective viewport a little on each edge so a CTA barely
      // clipped at the very top/bottom of the screen still counts as "in the
      // way" before it's fully readable.
      { rootMargin: "-8% 0px -8% 0px", threshold: 0 }
    );

    const observed = new Set<Element>();
    const observeNew = () => {
      document.querySelectorAll(AVOID_SELECTOR).forEach((el) => {
        if (!observed.has(el)) {
          observed.add(el);
          observer.observe(el);
        }
      });
    };
    observeNew();

    // Below-the-fold sections mount lazily (dynamic imports / DeferredSection)
    // and the mobile menu overlay's CTA only exists in the DOM while the menu
    // is open — re-scan on any DOM change so newly-added targets get picked up.
    const mutationObserver = new MutationObserver(observeNew);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return anyVisible;
}

export default function FloatingTryClassButton({
  /** Booking wizard for the site this renders on. */
  href = "/demo",
  /** Pill colours — /uk runs blue and /au orange (see academyTheme.ts). */
  className = "bg-[#FFCC00] hover:bg-[#e6b800] text-black shadow-yellow-500/30",
}: {
  href?: string;
  className?: string;
} = {}) {
  const reduce = useReducedMotion() ?? false;
  const hideForOtherCTA = useAnyAvoidTargetVisible();
  const [settled, setSettled] = useState(false);

  // Small delay so it doesn't flash in before the page has laid itself out
  // (and before the observer above has had a chance to find the header CTA).
  useEffect(() => {
    const t = setTimeout(() => setSettled(true), 500);
    return () => clearTimeout(t);
  }, []);

  const show = settled && !hideForOtherCTA;

  return (
    <motion.div
      className="fixed inset-x-0 bottom-4 z-[9995] flex justify-center px-6 pointer-events-none"
      initial={false}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 24 }}
      transition={reduce ? { duration: 0 } : SPRING}
      aria-hidden={!show}
    >
      <Link
        href={href}
        tabIndex={show ? 0 : -1}
        className={`pointer-events-auto inline-flex items-center gap-2 font-bold text-sm px-6 py-3.5 rounded-full shadow-lg transition-colors duration-200 ${className}`}
      >
        <Image
          src="/ss-logo-mascot.png"
          alt=""
          aria-hidden="true"
          width={37}
          height={32}
          className="h-8 w-8 shrink-0 object-contain"
        />
        Try a Free Class
      </Link>
    </motion.div>
  );
}
