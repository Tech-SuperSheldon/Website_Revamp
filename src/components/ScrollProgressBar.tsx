"use client";

// Hairline reading-progress bar pinned to the very top edge of the viewport.
// Sits at z-[60], just above the sticky header (z-50), so it reads as part of
// the browser chrome rather than as page content.
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export default function ScrollProgressBar() {
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();
  // Smoothed so the bar glides instead of tracking every wheel tick.
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  // The bar is a progress readout, not decoration — but it is redundant with
  // the scrollbar, so reduced-motion users simply don't get it.
  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400"
      style={{ scaleX }}
    />
  );
}
