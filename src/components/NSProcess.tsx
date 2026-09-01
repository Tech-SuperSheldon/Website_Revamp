"use client";

// "How we tailor every lesson to your child" — the four-step journey shared by
// every academy.
//
// The connector between the steps is scroll-linked: it fills from step 1 to
// step 4 as you scroll through the section, and each step's badge lights up as
// the line reaches it. That turns four boxes into one sequence you can watch
// progress. Horizontal on desktop, vertical down the left edge on mobile.
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { rise, riseOnce, stagger, VIEWPORT } from "@/lib/motion";
import Highlight from "@/components/motion/Highlight";
import { SpotlightOverlay, useSpotlight } from "@/components/motion/Spotlight";

const NAVY = "#0b2545";
const ORANGE = "#e87f1e";
/** orange-50 / orange-200 — the "not reached yet" end of each interpolation. */
const ORANGE_50 = "#fff7ed";
const ORANGE_200 = "#fed7aa";
const GRAY_400 = "#9ca3af";

const steps = [
  {
    title: "Diagnose",
    desc: "A free diagnostic test reveals your child's level, strengths and learning style.",
    accent: NAVY,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M9 11l3 3L22 4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Match",
    desc: "We pair your child with a vetted 1:1 tutor — plus an AI sidekick for support between lessons.",
    accent: ORANGE,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="9" cy="8" r="3.2" stroke="#fff" strokeWidth="1.8" />
        <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="18" cy="8" r="2.4" stroke="#fff" strokeWidth="1.6" />
        <path d="M15.8 13.2c2.4.2 4.2 1.9 4.2 4.3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Personalise",
    desc: "Every lesson plan adapts in real time to your child's pace, not a fixed curriculum.",
    accent: NAVY,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 21v-6M4 11V3M12 21v-9M12 8V3M20 21v-4M20 13V3" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="4" cy="13" r="2.2" fill="#fff" />
        <circle cx="12" cy="10" r="2.2" fill="#fff" />
        <circle cx="20" cy="15" r="2.2" fill="#fff" />
      </svg>
    ),
  },
  {
    title: "Review",
    desc: "Regular diagnostic check-ins and PTMs keep you and the tutor aligned on progress.",
    accent: ORANGE,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="4" width="18" height="17" rx="2" stroke="#fff" strokeWidth="1.8" />
        <path d="M3 9h18M8 2v4M16 2v4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 14l2.5 2.5L16 11" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function Step({
  step,
  index,
  progress,
  reduce,
}: {
  step: (typeof steps)[number];
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  // Where this step sits along the connector: step 0 at the start, step 3 at
  // the end. The badge lights over a short window as the line reaches it.
  // The window is compressed to 0.9 of the track so the *last* step still
  // finishes lighting before progress tops out at 1.
  const at = (index / (steps.length - 1)) * 0.9;
  const lit = useTransform(progress, [at, at + 0.08], [0, 1], { clamp: true });
  const { onMouseMove, onMouseLeave, background } = useSpotlight();

  const badgeScale = useTransform(lit, [0, 1], [0.88, 1]);
  const badgeOpacity = useTransform(lit, [0, 1], [0.35, 1]);
  const numberBg = useTransform(lit, [0, 1], ["#ffffff", ORANGE]);
  const numberColor = useTransform(lit, [0, 1], [GRAY_400, "#ffffff"]);
  const numberBorder = useTransform(lit, [0, 1], [ORANGE_200, ORANGE]);

  return (
    <motion.div
      variants={rise(reduce, 28)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative overflow-hidden rounded-[2rem] bg-white border border-orange-100 p-7 shadow-sm hover:shadow-lg transition-[box-shadow,border-color] duration-300 flex lg:block gap-5"
    >
      <SpotlightOverlay background={background} />
      {/* Badge with the step number tucked into its corner */}
      <div className="relative shrink-0">
        <motion.div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm"
          style={{
            background: step.accent,
            scale: reduce ? 1 : badgeScale,
            opacity: reduce ? 1 : badgeOpacity,
          }}
        >
          {step.icon}
        </motion.div>
        <motion.span
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full border text-[11px] font-extrabold flex items-center justify-center shadow-sm"
          style={
            reduce
              ? { background: ORANGE, color: "#fff", borderColor: ORANGE }
              : { backgroundColor: numberBg, color: numberColor, borderColor: numberBorder }
          }
        >
          {index + 1}
        </motion.span>
      </div>

      <div className="relative lg:mt-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
        <p className="text-gray-600 leading-relaxed text-sm md:text-[15px]">{step.desc}</p>
      </div>
    </motion.div>
  );
}

export default function NSProcess() {
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 70%"],
  });
  // Smoothed so the line eases rather than tracking every scroll tick 1:1.
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });
  // Under reduced motion the connector is simply drawn complete.
  const fill = reduce ? 1 : progress;

  return (
    <section ref={sectionRef} id="process" className="relative py-12 md:py-20 overflow-hidden">
      {/* Cool wash — alternates with the warm band on the testimonials above */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-slate-50/80 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...riseOnce(reduce)} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            How we <Highlight reduce={reduce}>tailor</Highlight> every lesson to your child
          </h2>
          <p className="mt-3 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            The same four-step journey behind every academy, every subject, every child.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector, drawn behind the cards so it only shows in the gaps.
              Badge centre = p-7 (1.75rem) + half of the 3.5rem badge = 3.5rem
              from the card edge, which is `top-14` / `left-14`. The unfilled
              track sits underneath; the orange bar scales over it on scroll. */}
          <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-0.5 rounded-full" style={{ background: ORANGE_50 }}>
            <motion.div
              className="h-full w-full rounded-full origin-left bg-gradient-to-r from-orange-300 to-orange-500"
              style={{ scaleX: fill }}
            />
          </div>
          <div className="lg:hidden absolute top-14 bottom-14 left-14 w-0.5 rounded-full" style={{ background: ORANGE_50 }}>
            <motion.div
              className="w-full h-full rounded-full origin-top bg-gradient-to-b from-orange-300 to-orange-500"
              style={{ scaleY: fill }}
            />
          </div>

          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="grid grid-cols-1 lg:grid-cols-4 gap-5 md:gap-6"
          >
            {steps.map((step, i) => (
              <Step key={step.title} step={step} index={i} progress={progress} reduce={reduce} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
