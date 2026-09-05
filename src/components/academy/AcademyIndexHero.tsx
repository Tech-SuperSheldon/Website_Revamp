"use client";

// <base>/academies — the index for the three academy tracks.
//
// The per-academy detail (description, subject list and the picker that opens
// BookTrialModal) lives on its own page under <base>/academies/<slug>; see
// src/lib/academies.ts and the other components in this folder. This page
// keeps only the banner and the heading, with NSProcess following it.
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { DUR, EASE } from "@/lib/motion";
import Highlight from "@/components/motion/Highlight";
import type { Locale } from "@/lib/academies";
import { academyTheme } from "@/lib/academyTheme";

export default function AcademyIndexHero({ locale }: { locale: Locale }) {
  const reduce = useReducedMotion() ?? false;
  const theme = academyTheme(locale);

  return (
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
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight ${theme.heading}`}
          >
            Three academies, all start with{" "}
            <Highlight reduce={reduce} text={theme.highlightText} bar={theme.highlightBar}>
              1:1 Tutor
            </Highlight>
          </h2>
          <p className="mt-2 sm:mt-3 text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Choose an academy from the Academies menu above and see how we&apos;d tailor a free
            trial for your child.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
