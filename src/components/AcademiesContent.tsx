"use client";

// /academies — full detail page for the three academy tracks teased on the
// homepage (see NSAcademies). Same data/colors/interaction pattern (pick a
// subject → BookTrialModal opens the LearnForm wizard), just with a full
// description and the complete subject list per academy instead of a
// homepage-card summary.
import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { DUR, EASE, rise, stagger } from "@/lib/motion";
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
  placeholder: string;
  prompt: string;
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
    placeholder: "Select a subject",
    prompt: "Pick a subject to start",
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
    placeholder: "Select an exam",
    prompt: "Pick an exam to start",
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
    placeholder: "Select a skill",
    prompt: "Pick a skill to start",
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
      className="scroll-mt-28 rounded-2xl md:rounded-[2rem] bg-white border border-gray-100 shadow-sm p-5 sm:p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-4">
        <span
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-sm shrink-0"
          style={{ background: academy.accent }}
        >
          {academy.letter}
        </span>
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
            {academy.subtitle}
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{academy.title}</h3>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5 md:gap-6 items-start">
        <div>
          <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed">{academy.description}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {academy.subjects.map((s) => (
              <li
                key={s}
                className="text-xs sm:text-sm font-medium text-gray-700 bg-gray-50 border border-gray-100 rounded-full px-3 py-1"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl sm:rounded-2xl bg-gray-50/80 border border-gray-100 p-4 sm:p-5">
          <h4 className="text-sm font-bold text-gray-900 mb-2.5">{academy.prompt}</h4>
          <div className="relative" data-floating-cta-avoid>
            <select
              value=""
              onChange={(e) => {
                if (e.target.value) onSelectSubject(e.target.value);
              }}
              className="w-full appearance-none rounded-xl bg-white border border-gray-200 text-gray-700 text-sm font-semibold py-2.5 pl-3.5 pr-9 cursor-pointer hover:border-[#e6b800] focus:outline-none focus:ring-2 focus:ring-[#FFCC00] transition-colors duration-200"
            >
              <option value="" disabled>
                {academy.placeholder}
              </option>
              {academy.subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
          <p className="mt-2 text-xs text-gray-400">
            We&apos;ll ask for your child&apos;s grade next to tailor the free trial.
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
      {/* Hero Section with Compact Spacing */}
      <section className="relative pt-20 pb-6 md:pt-24 md:pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.slow, ease: EASE }}
          >
            
            {/* Banner Container */}
            <div className="relative w-full h-[220px] sm:h-[280px] md:h-[320px] overflow-hidden rounded-2xl md:rounded-[2rem] shadow-lg border border-gray-100 mb-6 sm:mb-8">
              <Image
                src="/Academics Hero Banner.png"
                alt="Academics Hero Banner"
                fill
                className="object-cover object-right md:object-center"
                priority
              />

              {/* Text Overlaid on Left Side */}
              <div className="absolute inset-0 flex flex-col justify-center items-start text-left pl-4 sm:pl-6 md:pl-8 lg:pl-10 pr-6 max-w-[280px] sm:max-w-md md:max-w-lg lg:max-w-xl z-10">
                <p className="text-xs sm:text-sm font-bold text-[#FC8741] uppercase tracking-wider mb-1">
                  Every child learns differently.
                </p>
                <h1 className="text-base sm:text-5xl md:text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-sm">
                  PERSONALISED LEARNING
                </h1>
                 <h1 className="text-base sm:text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-sm">
                  STARTS HERE
                </h1>

              </div>
            </div>

            {/* Sub-heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#03215F] tracking-tight leading-tight">
              Three academies, all start with <Highlight reduce={reduce}>1:1 Tutor</Highlight>
            </h2>
            <p className="mt-2 sm:mt-3 text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              Select the course below and see how we&apos;d tailor a free trial for your child.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Academy Details List */}
      <section className="relative pb-10 md:pb-16">
        {/* Animates on mount, not on scroll: with a scroll trigger the cards
            stayed invisible on short laptop/phone viewports until the user
            scrolled, leaving a blank page under the heading. */}
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          animate="show"
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 sm:gap-5 md:gap-6"
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