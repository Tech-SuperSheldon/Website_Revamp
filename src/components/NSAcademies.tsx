"use client";

// "Three academies, one tutor your child trusts" — the three programme tracks.
// Each card is a tinted panel in its academy's colour (teal / red-orange /
// purple) listing what that track covers, and links through to the academy's
// own page under <base>/academies/<slug>. Subject lists come from
// src/lib/academies.ts so this card and the academy page always agree.
import Link from "next/link";
import { ArrowRight, BookOpen, Lightbulb, Target } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { CSS_TRANSITION, hoverLift, rise, riseOnce, stagger, VIEWPORT } from "@/lib/motion";
import Highlight from "@/components/motion/Highlight";
import { SpotlightOverlay, useSpotlight } from "@/components/motion/Spotlight";
import { BASE_PATH, getAcademies, type Locale } from "@/lib/academies";

type Palette = {
  /** Card background tint. */
  bg: string;
  /** Border of the untinted card edge. */
  border: string;
  /** Icon badge + CTA fill. */
  accent: string;
  /** Darker text-safe shade of the accent, for the label and hook line. */
  accentDark: string;
};

const PALETTE: Record<string, Palette> = {
  "school-readiness": {
    bg: "#E8F4F6",
    border: "#D2E9ED",
    accent: "#1E88A8",
    accentDark: "#146378",
  },
  "exam-readiness": {
    bg: "#FCEAE3",
    border: "#F7D6C9",
    accent: "#E4572E",
    accentDark: "#B8431F",
  },
  skill: {
    bg: "#F6ECF7",
    border: "#EBDCEC",
    accent: "#AD71AF",
    accentDark: "#7A4E7C",
  },
};

/** Card copy the academy pages don't carry: the outcome headline and its hook. */
const COPY: Record<string, { label: string; title: string; hook: string; icon: typeof BookOpen }> = {
  "school-readiness": {
    label: "School Readiness",
    title: "Stay ahead of class",
    hook: "Built around your school's syllabus to help you stay ahead of your class.",
    icon: BookOpen,
  },
  "exam-readiness": {
    label: "Exam Readiness",
    title: "Crack the exam",
    hook: "Exam-specific prep to help you crack the examination.",
    icon: Target,
  },
  skill: {
    label: "Skill Academy",
    title: "Get future-ready",
    hook: "Skills school doesn't teach making you future-ready.",
    icon: Lightbulb,
  },
};

/** Tags shown on a card from sm up: the first few subjects, then a "+N more" chip so a
 *  long exam list doesn't unbalance the row. Mobile scrolls the full list
 *  instead — see AcademyCard. */
const MAX_TAGS = 4;

function tagsFor(subjects: string[]) {
  const shown = subjects.slice(0, MAX_TAGS);
  const rest = subjects.length - shown.length;
  return rest > 0 ? [...shown, `+${rest} more`] : shown;
}

function AcademyCard({
  slug,
  subjects,
  href,
  reduce,
}: {
  slug: string;
  subjects: string[];
  href: string;
  reduce: boolean;
}) {
  const { onMouseMove, onMouseLeave, background } = useSpotlight();
  const palette = PALETTE[slug];
  const { label, title, hook, icon: Icon } = COPY[slug];

  return (
    <motion.article
      variants={rise(reduce, 28)}
      whileHover={hoverLift(reduce, -8)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`group relative h-full flex flex-col overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border p-4 sm:p-7 md:p-8 shadow-sm hover:shadow-xl ${CSS_TRANSITION}`}
      style={{ background: palette.bg, borderColor: palette.border }}
    >
      <SpotlightOverlay background={background} />

      <div className="relative flex items-center gap-3 sm:gap-3.5 mb-2 sm:mb-4">
        <span
          className="w-11 h-11 sm:w-[52px] sm:h-[52px] rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-md shrink-0"
          style={{ background: palette.accent }}
        >
          <Icon size={26} strokeWidth={2} className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px]" />
        </span>
        <div>
          <h3 className="text-[17px] sm:text-xl font-bold text-gray-900 leading-snug">{label}</h3>
          <p
            className="text-xs sm:text-[13px] font-semibold mt-0.5"
            style={{ color: palette.accentDark }}
          >
            {title}
          </p>
        </div>
      </div>

      {/* Clamped on mobile: the hook restates the title, so a third line is the
          first thing worth losing to keep all three cards on screen. */}
      <p className="relative text-[13px] sm:text-[15px] leading-snug sm:leading-normal text-gray-600 line-clamp-2 sm:line-clamp-none mb-2.5 sm:mb-5">
        {hook}
      </p>

      {/* sm and up: the original wrapping chip row, capped with "+N more". */}
      <div className="relative hidden sm:flex flex-wrap gap-2 mb-6">
        {tagsFor(subjects).map((tag) => (
          <span
            key={tag}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/75 border border-black/[0.06] text-gray-700"
          >
            {tag}
          </span>
        ))}
      </div>
      {/* Mobile keeps the chips on one swipeable row, so a card is the same
          height whether a track has four subjects or twelve — and nothing has
          to hide behind a "+N more". */}
      <div className="no-scrollbar relative flex sm:hidden flex-nowrap gap-1.5 mb-3 overflow-x-auto">
        {subjects.map((tag) => (
          <span
            key={tag}
            className="shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/75 border border-black/[0.06] text-gray-700 whitespace-nowrap"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        href={href}
        className={`relative mt-auto w-fit inline-flex items-center gap-1.5 rounded-full px-4 sm:px-[18px] py-2 sm:py-3 text-[13px] sm:text-sm font-bold text-white group-hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${CSS_TRANSITION}`}
        style={{ background: palette.accent }}
      >
        Explore {label}
        <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </Link>
    </motion.article>
  );
}

export default function NSAcademies({ locale = "global" }: { locale?: Locale } = {}) {
  const reduce = useReducedMotion() ?? false;
  const academies = getAcademies(locale);

  return (
    <section id="academies" className="relative py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...riseOnce(reduce)} className="text-center mb-10 md:mb-14">
          <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#E4572E] mb-2.5">
            Explore SuperSheldon
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#03215F] tracking-tight leading-tight">
            Three academies, one <Highlight reduce={reduce}>tutor</Highlight> your child trusts
          </h2>
          <p className="mt-3 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Every path starts with the same 1:1 match, tailored to what your child needs next.
          </p>
        </motion.div>

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-7 items-stretch"
        >
          {academies.map((a) => (
            <AcademyCard
              key={a.slug}
              slug={a.slug}
              subjects={a.subjects}
              href={`${BASE_PATH[locale]}/academies/${a.slug}`}
              reduce={reduce}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
