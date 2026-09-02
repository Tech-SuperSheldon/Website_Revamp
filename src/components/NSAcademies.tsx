"use client";

// "Four academies, one tutor your child trusts" — the four programme tracks.
// Picking a subject from a card's dropdown opens the same booking wizard used
// on /uk/learn-maths (grade → phone → date & time → timezone) as a modal,
// scoped to that subject — there's no separate "Book a free trial" button.
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { CSS_TRANSITION, hoverLift, rise, riseOnce, stagger, VIEWPORT } from "@/lib/motion";
import Highlight from "@/components/motion/Highlight";
import { SpotlightOverlay, useSpotlight } from "@/components/motion/Spotlight";
import BookTrialModal from "@/components/BookTrialModal";

const NAVY = "#0b2545";
const ORANGE = "#FC8741";

type Academy = {
  key: string;
  letter: string;
  title: string;
  accent: string;
  subjects: string[];
  placeholder: string;
  prompt: string;
};

const ACADEMIES: Academy[] = [
  {
    key: "tuition",
    letter: "T",
    title: "School Readiness",
    accent: NAVY,
    subjects: ["Maths", "Science", "English", "Reasoning"],
    placeholder: "Select a subject",
    prompt: "Pick a subject to start",
  },
  {
    key: "exam",
    letter: "E",
    title: "Exam Readiness",
    accent: ORANGE,
    subjects: ["11+ Exam", "NAPLAN"],
    placeholder: "Select an exam",
    prompt: "Pick an exam to start",
  },
  {
    key: "skill",
    letter: "S",
    title: "Skill Academy",
    accent: NAVY,
    subjects: ["Vedic Maths", "Chess", "Coding", "AI & Gen AI", "Public Speaking"],
    placeholder: "Select a skill",
    prompt: "Pick a skill to start",
  },
  {
    key: "language",
    letter: "L",
    title: "Language Academy",
    accent: ORANGE,
    subjects: ["Hindi", "Japanese", "German", "French", "Spanish", "Urdu", "Arabic"],
    placeholder: "Select a language",
    prompt: "Pick a language to start",
  },
];

function AcademyCard({
  academy,
  reduce,
  onSelectSubject,
}: {
  academy: Academy;
  reduce: boolean;
  onSelectSubject: (subject: string) => void;
}) {
  const { onMouseMove, onMouseLeave, background } = useSpotlight();

  return (
    <motion.article
      variants={rise(reduce, 28)}
      whileHover={hoverLift(reduce, -8)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`group relative h-full flex flex-col overflow-hidden rounded-[2rem] bg-white border border-[#ffede2] p-6 md:p-7 shadow-sm hover:shadow-xl hover:border-[#fedbc6] ${CSS_TRANSITION}`}
    >
      <SpotlightOverlay background={background} />
      {/* Accent hairline that fills in on hover */}
      <span
        className="absolute top-0 left-8 right-8 h-1 rounded-b-full scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300"
        style={{ background: academy.accent }}
      />

      <div className="relative flex items-center gap-3 mb-4">
        <span
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-sm shrink-0"
          style={{ background: academy.accent }}
        >
          {academy.letter}
        </span>
        <h3 className="text-xl font-bold text-gray-900">{academy.title}</h3>
      </div>

      <p className="relative text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
        {academy.prompt}
      </p>
      <div className="relative mt-auto" data-floating-cta-avoid>
        <select
          value=""
          onChange={(e) => {
            if (e.target.value) onSelectSubject(e.target.value);
          }}
          className="w-full appearance-none rounded-xl bg-gray-50 border border-gray-100 text-gray-700 text-sm font-semibold py-2.5 pl-3.5 pr-9 cursor-pointer hover:bg-[#FFCC00]/20 hover:border-[#e6b800] focus:outline-none focus:ring-2 focus:ring-[#FFCC00] transition-colors duration-200"
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
    </motion.article>
  );
}

export default function NSAcademies() {
  const reduce = useReducedMotion() ?? false;
  const [activeSubject, setActiveSubject] = useState<string | null>(null);

  return (
    <section id="academies" className="relative py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...riseOnce(reduce)} className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#03215F] tracking-tight leading-tight">
            Four academies, one <Highlight reduce={reduce}>tutor</Highlight> your child trusts
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 items-stretch"
        >
          {ACADEMIES.map((a) => (
            <AcademyCard key={a.key} academy={a} reduce={reduce} onSelectSubject={setActiveSubject} />
          ))}
        </motion.div>
      </div>

      <BookTrialModal
        open={activeSubject !== null}
        onClose={() => setActiveSubject(null)}
        subject={activeSubject ?? ""}
      />
    </section>
  );
}