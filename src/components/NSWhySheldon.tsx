"use client";

// "Why Super Sheldon?" — three non-negotiables, shown right under the stats +
// student testimonial strip on the landing page.
//
// All three cards share one design: white with an [#fff7f2] wash, an orange
// hairline across the top, a paired icon badge, and a pair of "role: thing"
// tags above the heading. Earlier versions singled out the first card (first
// with a navy background, then with a wash the others didn't have) and it read
// as the odd one out either way.
import { motion, useReducedMotion } from "framer-motion";
import { CSS_TRANSITION, hoverLift, rise, riseOnce, stagger, VIEWPORT } from "@/lib/motion";
import Highlight from "@/components/motion/Highlight";
import { SpotlightOverlay, useSpotlight } from "@/components/motion/Spotlight";

const ORANGE = "#FC8741";

type Card = {
  /* Left tag (outline) and right tag (solid) above the heading. */
  tags: [string, string];
  title: string;
  desc: string;
  /* Large chip icon, plus the small one that overlaps its bottom-right. */
  icon: React.ReactNode;
  sidekick: React.ReactNode;
};

const CARDS: Card[] = [
  {
    tags: ["Hero: 1:1 Tutor", "Sidekick: AI Teacher"],
    title: "1:1 tutors, backed by an AI sidekick",
    desc: "Your tutor leads every lesson. Between sessions, an AI teacher is on call to resolve doubts on the spot — no waiting for the next class.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 2l2.4 6.6L21 10l-5 4.3L17.4 21 12 17.5 6.6 21 8 14.3 3 10l6.6-1.4L12 2z" fill={ORANGE} />
      </svg>
    ),
    sidekick: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 2a6 6 0 00-3.5 10.9c.4.3.5.7.5 1.1v.5h6v-.5c0-.4.1-.8.5-1.1A6 6 0 0012 2z" stroke={ORANGE} strokeWidth="1.8" />
        <path d="M10 21h4M11 18h2" stroke={ORANGE} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    tags: ["Track: Diagnostic Tests", "Debrief: Parent-Teacher Meets"],
    title: "Regular diagnostics, with PTMs",
    desc: "Scheduled diagnostic tests track real progress, followed by parent-teacher meetings to walk through the results together.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M9 11l3 3L22 4" stroke={ORANGE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke={ORANGE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    sidekick: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="4.5" width="18" height="16.5" rx="2.5" stroke={ORANGE} strokeWidth="1.8" />
        <path d="M3 9.5h18M8 2.5v4M16 2.5v4" stroke={ORANGE} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    tags: ["Starts: Their Level", "Adapts: Pace & Goals"],
    title: "Courses customised per student",
    desc: "No fixed curriculum — every course adapts to your child's level, pace and goals as they grow, so the work is never too easy or too far ahead.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 21v-6M4 11V3M12 21v-9M12 8V3M20 21v-4M20 13V3" stroke={ORANGE} strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="4" cy="13" r="2.2" fill={ORANGE} />
        <circle cx="12" cy="10" r="2.2" fill={ORANGE} />
        <circle cx="20" cy="15" r="2.2" fill={ORANGE} />
      </svg>
    ),
    sidekick: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="8.5" stroke={ORANGE} strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.5" stroke={ORANGE} strokeWidth="1.8" />
        <circle cx="12" cy="12" r="1" fill={ORANGE} />
      </svg>
    ),
  },
];

export default function NSWhySheldon() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="relative py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div {...riseOnce(reduce)} className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#03215F] tracking-tight">
            Why <Highlight reduce={reduce}>Super Sheldon?</Highlight>
          </h2>
          <p className="mt-3 text-gray-600 text-base sm:text-lg max-w-xl mx-auto">
            Three things we never compromise on.
          </p>
        </motion.div>

        {/* items-stretch + h-full on each card keeps all three the same height
            regardless of copy length. */}
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 items-stretch"
        >
          {CARDS.map((card) => (
            <WhyCard key={card.title} card={card} reduce={reduce} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function WhyCard({ card, reduce }: { card: Card; reduce: boolean }) {
  const { onMouseMove, onMouseLeave, background } = useSpotlight();

  return (
    <motion.article
      variants={rise(reduce, 28)}
      whileHover={hoverLift(reduce)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`group relative h-full flex flex-col overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#ebedf2] to-white border border-[#fedbc6] p-6 md:p-7 shadow-sm hover:shadow-lg ${CSS_TRANSITION}`}
    >
      <SpotlightOverlay background={background} />
      {/* Orange hairline across the top of every card */}
      <span className="absolute top-0 left-8 right-8 h-1 rounded-b-full bg-[#fda570]" />

      {/* Paired icon badge */}
      <div className="relative w-fit mb-5">
        <div className="w-12 h-12 rounded-2xl bg-[#d2d7e2] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          {card.icon}
        </div>
        <div className="absolute -bottom-1.5 -right-2.5 w-7 h-7 rounded-xl bg-white border border-[#fedbc6] flex items-center justify-center shadow-sm">
          {card.sidekick}
        </div>
      </div>

      <div className="relative flex flex-wrap items-center gap-1.5 mb-3 text-[10px] font-bold uppercase tracking-wider">
        <span className="px-2.5 py-1 rounded-full bg-white border border-[#fedbc6] text-[#b5612f]">
          {card.tags[0]}
        </span>
        <span className="text-[#fec5a4]">+</span>
        <span className="px-2.5 py-1 rounded-full bg-[#fc8741] text-white">
          {card.tags[1]}
        </span>
      </div>

      <h3 className="relative text-xl md:text-[1.35rem] font-bold text-gray-900 leading-snug mb-2.5 text-balance">
        {card.title}
      </h3>
      <p className="relative text-gray-600 leading-relaxed text-[15px]">{card.desc}</p>
    </motion.article>
  );
}
