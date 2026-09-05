"use client";

// The orange marker-pen highlight behind a word in a section heading.
//
// The bar wipes in from the left just after the heading has settled, which
// gives the headings a reveal without masking the text itself — a clip mask
// would have to guess line count, and these headings wrap to two lines at
// several breakpoints.
import { motion } from "framer-motion";
import { DUR, EASE } from "@/lib/motion";

export default function Highlight({
  children,
  reduce,
  /** Tailwind colour for the bar; a couple of sections sit on a warmer ground. */
  bar = "bg-[#ffede2]",
  /** Tailwind colour for the word itself — the /uk and /au academy pages run
   *  blue and orange rather than the global yellow. */
  text = "text-[#FFCC00]",
}: {
  children: React.ReactNode;
  reduce: boolean;
  bar?: string;
  text?: string;
}) {
  return (
    <span className="relative inline-block">
      <span className={`relative z-10 ${text}`}>{children}</span>
      <motion.span
        aria-hidden
        className={`absolute bottom-1 left-0 w-full h-3 ${bar} -z-10 rounded-sm origin-left`}
        initial={{ scaleX: reduce ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: reduce ? 0 : DUR.base, ease: EASE, delay: reduce ? 0 : 0.3 }}
      />
    </span>
  );
}
