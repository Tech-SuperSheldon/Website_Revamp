"use client";

// Cursor spotlight for cards: a soft orange radial gradient that follows the
// pointer inside the card.
//
// Touch devices never fire mousemove and never latch :hover, so the overlay
// stays at opacity 0 there — no media query needed to keep this desktop-only.
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

/**
 * Returns handlers to spread on the card and a `background` motion value for
 * the overlay. Pair with <SpotlightOverlay/> inside a `group`/`relative` card.
 */
export function useSpotlight(radius = 260) {
  // Start far outside the card so the first paint has nothing lit.
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const onMouseLeave = () => {
    x.set(-9999);
    y.set(-9999);
  };

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${x}px ${y}px, rgba(252, 135, 65, 0.10), transparent 72%)`;

  return { onMouseMove, onMouseLeave, background };
}

export function SpotlightOverlay({
  background,
}: {
  background: ReturnType<typeof useSpotlight>["background"];
}) {
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{ background }}
    />
  );
}
