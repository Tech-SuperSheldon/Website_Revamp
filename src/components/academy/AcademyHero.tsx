"use client";

// Hero for a single academy page (<base>/academies/<slug>).
//
// Keeps the same banner the /academies index leads with, then carries the copy
// that used to sit in this academy's card on the /academies index: description,
// subject chips and the subject picker. The banner text is deliberately not an
// <h1> here — the academy name is.
//
// The picker is two steps: choose a subject, then press the button, which opens
// that subject's trial wizard. Picking one used to open the wizard on the spot,
// which left the button with nothing to do.
//
// `locale` drives the palette and which market's wizard shows, so /, /uk and
// /au all share this one component.
import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { DUR, EASE } from "@/lib/motion";
import BookTrialModal from "@/components/BookTrialModal";
import { subjectIcon } from "@/components/academy/subjectIcons";
import type { Academy, Locale } from "@/lib/academies";
import { gradesForSubject, MARKET, REGIONS } from "@/lib/academies";
import { academyTheme } from "@/lib/academyTheme";

export default function AcademyHero({
  academy,
  locale,
}: {
  academy: Academy;
  locale: Locale;
}) {
  const reduce = useReducedMotion() ?? false;
  // The picker is a two-step action now: choose a subject, then press the
  // button. Picking one used to open the booking wizard on the spot, which
  // left no room for the button to mean anything.
  const [subject, setSubject] = useState("");
  const [subjectMissing, setSubjectMissing] = useState(false);
  const [trialOpen, setTrialOpen] = useState(false);
  const theme = academyTheme(locale);

  return (
    <>
      <section className="relative pt-20 pb-6 md:pt-24 md:pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.slow, ease: EASE }}
          >
            {/* Shared banner — same asset and framing as the /academies index */}
            <div className="relative w-full h-[220px] sm:h-[280px] md:h-[320px] overflow-hidden rounded-2xl md:rounded-[2rem] shadow-lg border border-gray-100 mb-6 sm:mb-8">
              <Image
                src="/Academics Hero Banner.png"
                alt="Academics Hero Banner"
                fill
                className="object-cover object-right md:object-center"
                priority
              />

              <div className="absolute inset-0 flex flex-col justify-center items-start text-left pl-4 sm:pl-6 md:pl-8 lg:pl-10 pr-6 max-w-[280px] sm:max-w-md md:max-w-lg lg:max-w-xl z-10">
                <p className="text-xs sm:text-sm font-bold text-[#FC8741] uppercase tracking-wider mb-1">
                  Every child learns differently.
                </p>
                <p className="text-base sm:text-5xl md:text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-sm">
                  PERSONALISED LEARNING
                </p>
                <p className="text-base sm:text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-sm">
                  STARTS HERE
                </p>
              </div>
            </div>

            {/* Academy intro */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-start">
              <div>
                <h1
                  className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight ${theme.heading}`}
                >
                  {academy.heading}
                </h1>
                <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl">
                  {academy.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {academy.subjects.map((s) => {
                    const Icon = subjectIcon(s);
                    return (
                      <li
                        key={s}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-50 border border-gray-100 rounded-full px-3.5 py-2"
                      >
                        <Icon size={16} className={`shrink-0 ${theme.icon}`} aria-hidden />
                        {s}
                      </li>
                    );
                  })}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-2 text-xs text-gray-500">
                  {REGIONS.map((region) => (
                    <li
                      key={region.label}
                      className="inline-flex items-center gap-1.5 bg-white border border-gray-100 rounded-full px-3 py-1.5"
                    >
                      <Image
                        src={region.flag}
                        alt=""
                        aria-hidden
                        width={18}
                        height={12}
                        className="h-3 w-[18px] shrink-0 rounded-[2px] object-cover"
                      />
                      {region.label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subject picker. AcademyCTA's closing band scrolls here, so the
                  id and scroll-mt need to stay. */}
              <div
                id="subject-picker"
                className="rounded-2xl bg-gray-50/80 border border-gray-100 p-5 sm:p-6 scroll-mt-24"
              >
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                  {academy.prompt}
                </h2>
                <div className="relative">
                  <select
                    aria-label={academy.placeholder}
                    aria-invalid={subjectMissing}
                    aria-describedby="subject-picker-hint"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                      setSubjectMissing(false);
                    }}
                    className={`w-full appearance-none rounded-xl bg-white border text-gray-700 text-sm font-semibold py-3 pl-3.5 pr-9 cursor-pointer focus:outline-none focus:ring-2 transition-colors duration-200 ${
                      subjectMissing ? "border-red-400 ring-2 ring-red-100" : "border-gray-200"
                    } ${theme.selectFocus}`}
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
                {/* Swaps in place of the hint so nothing shifts on error. */}
                {subjectMissing ? (
                  <p
                    id="subject-picker-hint"
                    role="alert"
                    className="mt-2.5 text-xs font-semibold text-red-600"
                  >
                    Please select a subject first, then tap Book a Free Trial Class.
                  </p>
                ) : (
                  <p id="subject-picker-hint" className="mt-2.5 text-xs text-gray-400">
                    We&apos;ll ask for your child&apos;s grade next to tailor the free trial.
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => {
                    if (!subject) {
                      setSubjectMissing(true);
                      return;
                    }
                    setTrialOpen(true);
                  }}
                  // While this is on screen the floating pill stands down.
                  data-academy-cta
                  className={`mt-4 flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-bold shadow-md transition-colors ${theme.cta}`}
                >
                  Book a Free Trial Class
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The subject the visitor picked drives the wizard's copy and grade
          list. submitData is on: unlike NSAcademies' preview cards, a booking
          made here is a real lead and must reach /learn-lead and the sheet. */}
      <BookTrialModal
        open={trialOpen}
        onClose={() => setTrialOpen(false)}
        subject={subject}
        country={MARKET[locale]}
        grades={gradesForSubject(subject) ?? undefined}
        submitData
      />
    </>
  );
}
