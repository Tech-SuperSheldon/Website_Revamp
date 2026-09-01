"use client";

// /academies — full detail page for the four academy tracks teased on the
// homepage (see NSAcademies). Same data/colors/interaction pattern (pick a
// subject → BookTrialModal opens the LearnForm wizard), just with a full
// description and the complete subject list per academy instead of a
// homepage-card summary.
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { rise, riseOnce, stagger, VIEWPORT } from "@/lib/motion";
import Highlight from "@/components/motion/Highlight";
import BookTrialModal from "@/components/BookTrialModal";

const NAVY = "#0b2545";
const ORANGE = "#FC8741";

type Academy = {
  key: string;
  letter: string;
  title: string;
  subtitle: string;
  accent: string;
  description: string;
  subjects: string[];
};

const ACADEMIES: Academy[] = [
  {
    key: "tuition",
    letter: "T",
    title: "Tuition Academy",
    subtitle: "School Readiness",
    accent: NAVY,
    description:
      "Everyday subject support that keeps pace with — or gets ahead of — your child's school curriculum. Built for steady, confident progress across the core subjects.",
    subjects: ["Maths", "Science", "English", "Reasoning"],
  },
  {
    key: "exam",
    letter: "E",
    title: "Exam Academy",
    subtitle: "Exam Readiness",
    accent: ORANGE,
    description:
      "Focused, timeline-driven preparation for major entrance and standardised exams — built around past papers, timed practice and diagnostic tracking.",
    subjects: ["11+ Exam", "NAPLAN"],
  },
  {
    key: "skill",
    letter: "S",
    title: "Skill Academy",
    subtitle: "Skill Development",
    accent: NAVY,
    description:
      "The things school doesn't always have room for — sharp thinking, real coding ability, and the confidence to speak and write clearly.",
    subjects: ["Vedic Maths", "Chess", "Coding", "AI (Coding, Gen AI, Agent Building)", "Public Speaking + Creative Writing"],
  },
  {
    key: "language",
    letter: "L",
    title: "Language Academy",
    subtitle: "Language Mastery",
    accent: ORANGE,
    description:
      "A second (or third) language taught live, by a tutor your child gets to know — not an app that forgets who they are.",
    subjects: ["Hindi", "Japanese", "German", "French", "Spanish", "Urdu", "Arabic"],
  },
];

function AcademyDetail({
  academy,
  reduce,
  onSelectSubject,
}: {
  academy: Academy;
  reduce: boolean;
  onSelectSubject: (subject: string) => void;
}) {
  return (
    <motion.div
      id={academy.key}
      variants={rise(reduce, 28)}
      className="scroll-mt-28 rounded-[2rem] bg-white border border-gray-100 shadow-sm p-6 sm:p-8 md:p-10"
    >
      <div className="flex items-center gap-3 mb-5">
        <span
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-sm shrink-0"
          style={{ background: academy.accent }}
        >
          {academy.letter}
        </span>
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
            {academy.subtitle}
          </p>
          <h3 className="text-2xl font-bold text-gray-900">{academy.title}</h3>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
        <div>
          <p className="text-gray-600 text-[15px] leading-relaxed">{academy.description}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {academy.subjects.map((s) => (
              <li
                key={s}
                className="text-sm font-medium text-gray-700 bg-gray-50 border border-gray-100 rounded-full px-3.5 py-1.5"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-gray-50/80 border border-gray-100 p-5 sm:p-6">
          <h4 className="text-sm font-bold text-gray-900 mb-3">Pick a subject to start</h4>
          <div className="relative" data-floating-cta-avoid>
            <select
              value=""
              onChange={(e) => {
                if (e.target.value) onSelectSubject(e.target.value);
              }}
              className="w-full appearance-none rounded-xl bg-white border border-gray-200 text-gray-700 text-sm font-semibold py-3 pl-4 pr-9 cursor-pointer hover:border-[#e6b800] focus:outline-none focus:ring-2 focus:ring-[#FFCC00] transition-colors duration-200"
            >
              <option value="" disabled>
                Choose a subject
              </option>
              {academy.subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
          <p className="mt-3 text-xs text-gray-400">
            We'll ask for your child's grade next to tailor the free trial.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function AcademiesContent() {
  const reduce = useReducedMotion() ?? false;
  const [activeSubject, setActiveSubject] = useState<string | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-14 md:pt-40 md:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...riseOnce(reduce)}>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FC8741] mb-4">
              <span className="w-5 h-0.5 bg-[#FC8741] rounded-full" />
              Academies
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#03215F] tracking-tight leading-tight">
              Four academies, one <Highlight reduce={reduce}>tutor</Highlight> your child trusts
            </h1>
            <p className="mt-5 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Every academy starts with the same 1:1 match — pick a subject below to see how
              we'd tailor a free trial for your child.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Academy details */}
      <section className="relative pb-16 md:pb-24">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 md:gap-8"
        >
          {ACADEMIES.map((a) => (
            <AcademyDetail key={a.key} academy={a} reduce={reduce} onSelectSubject={setActiveSubject} />
          ))}
        </motion.div>
      </section>

      <BookTrialModal
        open={activeSubject !== null}
        onClose={() => setActiveSubject(null)}
        subject={activeSubject ?? ""}
      />
    </>
  );
}
