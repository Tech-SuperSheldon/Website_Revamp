// Shared motion tokens for the landing-page sections.
//
// Every section imports its easing, durations and variants from here rather
// than picking its own. Inconsistent easing between adjacent sections is what
// makes a page read as assembled rather than designed — the values below are
// the only ones the landing page should use.
//
// Every helper that produces movement takes `reduce` (from framer-motion's
// `useReducedMotion()`) and collapses to a plain fade when it's true.
import type { Transition, Variants } from "framer-motion";

/** The one curve. A soft overshoot-free ease-out that settles quickly. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** The one duration scale, in seconds. */
export const DUR = {
  fast: 0.25, // hover/tap feedback
  base: 0.45, // element entrances
  slow: 0.7, // section headings, large reveals
} as const;

/** Spring for anything the pointer drives — reads as physical, not timed. */
export const SPRING: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 0.6,
};

/** Standard scroll trigger: fire once, when a fifth of the block is showing. */
export const VIEWPORT = { once: true, amount: 0.2 } as const;

/**
 * Parent variant: cascades children as the *group* enters view.
 * Preferred over a per-item `delay` prop, which goes wrong as soon as the grid
 * rewraps on mobile or an item is added.
 */
export const stagger = (gap = 0.09): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap } },
});

/** Child variant: rises into place. */
export const rise = (reduce: boolean, distance = 24): Variants => ({
  hidden: { opacity: 0, y: reduce ? 0 : distance },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
});

/** Standalone entrance for one-off blocks (section headings, a whole rail). */
export const riseOnce = (reduce: boolean, distance = 20) => ({
  initial: { opacity: 0, y: reduce ? 0 : distance },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: DUR.slow, ease: EASE },
});

/** Card hover: a spring-driven lift. No-op under reduced motion. */
export const hoverLift = (reduce: boolean, distance = -6) =>
  reduce ? undefined : { y: distance, transition: SPRING };

/**
 * Narrow CSS transition for the properties framer isn't driving.
 * `transition-all` also animates `box-shadow`'s paint on every property change;
 * listing them keeps the compositor doing less work.
 */
export const CSS_TRANSITION =
  "transition-[box-shadow,border-color,background-color] duration-300";
