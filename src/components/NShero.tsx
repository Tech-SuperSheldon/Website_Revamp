"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HeroTestimonialPhoneVideo } from "@/components/HeroTestimonialPhoneVideo";

const students = [
  "/p2.png",
];

const countries = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1",  flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+1",  flag: "🇨🇦", name: "Canada" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
];

const defaultCountry =
  countries.find((c) => c.name === "USA") ?? countries[0];

/** Hero headline — cycles: ACT → SAT → Math → English (separate lines in rotation) */
const HERO_EXAM_LABELS = ["SATs", "ICAS", "NAPLAN"] as const;
const HERO_EXAM_ROTATE_MS = 3200;

function LiveClassesPill() {
  return (
    <div className="animate-hero-live-float inline-flex">
      <div
        className="flex items-center justify-center gap-2 sm:gap-2.5 rounded-full border border-gray-100/80 bg-white px-3 py-2 shadow-xl sm:px-4 sm:py-2.5"
        style={{ transform: "none" }}
      >
        <div className="relative flex h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500 sm:h-3 sm:w-3" />
        </div>
        <span className="text-xs font-bold leading-none text-gray-800 whitespace-nowrap sm:text-sm">
          Live Classes
        </span>
      </div>
    </div>
  );
}

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [examHeadlineIndex, setExamHeadlineIndex] = useState(0);
  const [country, setCountry] = useState(countries[1]); // Default to +1 (USA)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % students.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setExamHeadlineIndex((i) => (i + 1) % HERO_EXAM_LABELS.length);
    }, HERO_EXAM_ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const detected = countries.find((c) => c.code === data.country_calling_code);
        if (detected) setCountry(detected);
      })
      .catch((err) => console.error("Failed to detect location", err));
  }, []);

  return (
    <section className="relative w-full mt-10 md:mt-20 pt-20 pb-10 md:pt-44 lg:pt-32 xl:pb-0 xl:pt-16 overflow-hidden -mb-12 lg:-mb-0" id="hero">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] md:h-[800px] md:w-[800px] rounded-full bg-purple-50/40 blur-3xl filter opacity-60 pointer-events-none" />
      <div className="absolute top-0 right-0 -z-10 h-full w-full lg:w-[55%] bg-gradient-to-bl from-purple-50 via-white to-transparent transform skew-x-[-10deg] translate-x-32" />

      <div className="container mx-auto px-4 md:px-6">
        {/* On desktop: stretch rows so right column fills to viewport bottom */}
        <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-[45%_55%] lg:gap-4 lg:items-stretch lg:min-h-[calc(100vh-5rem)]">

          {/* --- Left Column: Content --- */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 order-2 mx-auto flex max-w-2xl flex-col items-start space-y-7 pt-2 text-left md:pt-10 lg:order-1 lg:mx-0 lg:justify-start lg:pt-14"
          >
            <div className="space-y-4 w-full">
              <h1 className="max-w-xl font-extrabold tracking-tight text-gray-900 sm:max-w-2xl md:text-3xl lg:text-4xl xl:text-[2.5rem] xl:leading-tight leading-snug">
                <span className="block text-balance text-gray-900 text-center lg:text-left text-2xl sm:text-3xl">
                  Smart Learning, Smarter Results –
                </span>
                <span className="mt-1 block sm:mt-1.5 text-center lg:text-left">
                  <span className="text-gray-900">From School to </span>
                  <span className="relative inline-block min-h-[1.2em] align-baseline">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={HERO_EXAM_LABELS[examHeadlineIndex]}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-600"
                      >
                        {HERO_EXAM_LABELS[examHeadlineIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </span>
              </h1>
              <p className="text-base md:text-lg text-gray-600 font-medium max-w-lg leading-relaxed">
                Experience Smarter Learning – your First Class is Free!
              </p>
            </div>

            {/* Form Section */}
            <div className="w-full max-w-md">
              <form className="relative flex items-center shadow-xl rounded-full bg-white ring-1 ring-gray-100 p-1.5 md:p-2 transition-all hover:shadow-orange-100/50">
                {/* Country Selector */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-1.5 pl-3 pr-2 md:pl-4 md:pr-3 h-10 md:h-12 border-r border-gray-100 hover:bg-gray-50 rounded-l-full transition-colors"
                  >
                    <span className="text-xl md:text-2xl">{country.flag}</span>
                    <span className="text-xs md:text-sm font-semibold text-gray-700">{country.code}</span>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-12 md:top-14 left-0 w-52 md:w-60 bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden z-50 py-1">
                      {countries.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => { setCountry(c); setIsDropdownOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition-colors text-left"
                        >
                          <span className="text-xl">{c.flag}</span>
                          <span className="text-sm font-medium text-gray-700">{c.name} ({c.code})</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <Input
                  className="pl-3 md:pl-4 h-10 md:h-12 text-base md:text-lg border-transparent focus:border-transparent focus:ring-0 shadow-none font-medium text-gray-800 bg-transparent flex-1 min-w-0"
                  placeholder="Phone number"
                  type="tel"
                />
                <Link href="/demo" className="shrink-0">
                  <Button
                    variant="gradient"
                    size="lg"
                    className="h-10 md:h-12 rounded-full px-4 md:px-8 text-sm md:text-base font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 whitespace-nowrap bg-gradient-to-r from-orange-500 to-orange-600 hover:to-orange-500"
                  >
                    <span className="hidden sm:inline">Try a Free Class</span>
                    <span className="sm:hidden">Try</span>
                  </Button>
                </Link>
              </form>
              {/* <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-xs md:text-sm text-gray-500 mt-3 ml-4 font-medium flex items-center gap-2"
              >
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Join 10,000+ happy learners today!
              </motion.p> */}
            </div>


            {/* Trust Logos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center lg:items-start gap-3 w-full"
            >
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Trusted by Parents & Schools</p>
              <div className="flex items-center justify-center lg:justify-start gap-5 md:gap-8">
                {/* <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="relative h-8 w-24 md:h-10 md:w-28 hover:scale-105 transition-transform duration-300"
                >
                  <Image src="/trustpilot.png" alt="Trustpilot" fill className="object-contain object-left" />
                </motion.div> */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="relative h-8 w-24 md:h-10 md:w-28 hover:scale-105 transition-transform duration-300"
                >
                  <Image src="/googlev2.png" alt="Google Reviews" fill className="object-contain" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="relative h-9 w-24 md:h-12 md:w-28 hover:scale-105 transition-transform duration-300"
                >
                  <Image src="/Stem.png" alt="STEM Accredited" fill className="object-contain" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* --- Right Column: Image fills from top to bottom of viewport --- */}
          <div className="relative order-1 mt-4 flex h-[360px] items-center justify-center sm:-mt-10 lg:order-2 lg:mt-0 lg:h-full lg:items-start lg:justify-center text-center">

            {/*
              On desktop: column stretches to min-h; flex row uses items-start so the hero
              image + overlays align with the headline at the top of the row.
            */}
            <div className="relative z-10 aspect-[3/2] w-full max-w-[1536px] rounded-3xl lg:mt-16 -mb-12 lg:-mb-0">

              {/* Slide images — overflow-hidden only on the image layer */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 overflow-hidden rounded-3xl"
                >
                  <Image
                    src={students[currentImageIndex]}
                    alt=" student"
                    fill
                    className="object-cover object-top transition-transform duration-700"
                    priority
                  />
                  {/* White fade at the bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/5 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
                </motion.div>
              </AnimatePresence>

              {/* ── Expert Teachers — lifted + nudged right (clears heads on desktop) ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute top-[-30px] left-2 sm:top-0 sm:left-1/2 z-30 w-[min(calc(100%-1rem),200px)] sm:w-[min(calc(100%-1rem),260px)] sm:-translate-x-1/2 translate-y-0 sm:ml-3 sm:-translate-y-4 md:ml-4 md:w-[min(calc(100%-1rem),288px)] md:-translate-y-5 lg:top-2 lg:ml-5 lg:-translate-y-2.5"
              >
                <div
                  className="animate-float bg-white p-2.5 sm:p-3 rounded-2xl shadow-xl border border-gray-100/80
                             flex items-center gap-2 sm:gap-3 hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-purple-100 shrink-0">
                    <Image src="/teacher.png" alt="Teacher" fill className="object-cover" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1 gap-0.5">
                    <span className="text-[10px] sm:text-sm font-bold text-gray-900 leading-tight">Expert Teachers</span>
                    <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-orange-600">
                      Certified Experts
                    </span>
                  </div>
                  <div className="hidden sm:flex flex-col items-center shrink-0 w-[52px] sm:w-[56px]">
                    <svg
                      className="w-[52px] h-[30px] sm:w-[56px] sm:h-[32px]"
                      viewBox="0 0 56 32"
                      aria-hidden
                    >
                      <path
                        d="M 8 28 A 20 20 0 0 1 48 28"
                        fill="none"
                        stroke="#facc15"
                        strokeWidth="4"
                        strokeLinecap="round"
                        pathLength={100}
                        strokeDasharray="90 10"
                      />
                    </svg>
                    <span className="text-[8px] sm:text-[9px] font-bold text-gray-700 text-center leading-tight -mt-0.5">
                      90% Success Rate
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* ── Live Classes — farther right, lower in blue area, straight pill wrapper ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="pointer-events-none absolute right-2 bottom-[-15px] sm:bottom-auto sm:right-0 sm:top-[26%] z-30 w-max max-w-[calc(100%-1rem)] translate-x-0 sm:translate-x-3 flex flex-col items-center md:top-[28%] md:translate-x-5 md:max-w-[calc(100%-0.5rem)] lg:top-[30%] lg:translate-x-6"
              >
                <div className="pointer-events-auto flex w-full justify-center transform-none">
                  <LiveClassesPill />
                </div>
              </motion.div>

              {/* Phone Video — positioned vs hero image box so it moves up with the visual */}
              <motion.div
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute right-0 bottom-8 z-20 hidden aspect-[9/18] w-[88px] translate-x-2 md:block md:bottom-16 md:w-[98px] md:translate-x-3 lg:bottom-4 lg:w-[108px] lg:translate-x-4"
              >
                <div className="animate-hero-phone-float h-full w-full overflow-hidden rounded-[0.95rem] border-[3px] border-gray-900 bg-gray-900 shadow-2xl lg:rounded-[1.1rem]">
                  <div className="relative h-full w-full rounded-[0.85rem] bg-slate-800 md:rounded-[0.95rem] lg:rounded-[1.05rem]">
                    <HeroTestimonialPhoneVideo
                      videoClassName="h-full w-full object-cover"
                      badgeClassName="absolute right-1 top-1 z-10 rounded bg-white/90 px-1 py-0.5 text-[5px] font-bold text-gray-900 shadow-sm backdrop-blur md:right-1.5 md:top-1.5 md:text-[6px]"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Code badge — sm+ only */}
              {/* <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: 12 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute -right-2 lg:-right-4 bottom-28 lg:bottom-36 bg-white px-3 py-2 rounded-xl shadow-xl z-20 hidden sm:block border border-gray-100"
              >
                <span className="font-mono text-[10px] sm:text-xs font-bold text-orange-500">while(fun) &#123; code() &#125;</span>
              </motion.div> */}
            </div>

            {/* Squiggly arrows — desktop only */}
            {/* <svg className="absolute top-[10%] left-[-5%] w-16 h-16 lg:w-24 lg:h-24 text-purple-400 z-40 lg:block hidden animate-pulse-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M10,50 Q40,10 80,40" /><path d="M70,35 L80,40 L75,50" />
            </svg>
            <svg className="absolute bottom-[10%] right-[-5%] w-14 h-14 lg:w-20 lg:h-20 text-orange-400 z-40 lg:block hidden transform -rotate-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M80,80 Q50,40 20,60" /><path d="M30,55 L20,60 L25,70" />
            </svg> */}
          </div>

        </div>
      </div>
    </section>
  );
}
