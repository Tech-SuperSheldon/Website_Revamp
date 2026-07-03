"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useOpenDemoBooking } from "@/components/utils/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  Check,
  GraduationCap,
  TrendingUp,
  Radio,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const EXAMS = [
  "Selective Schools",
  "NAPLAN",
  "OC / Selective Entry",
  "Scholarship Exams",
] as const;

const HEADLINE_EXAMS = [
  "NAPLAN.",
  "HSC.",
  "Selective.",
  "OC Test.",
  "ICAS.",
  "VCE.",
  "ATAR.",
  "Scholarship.",
] as const;

const STATS = [
  { icon: GraduationCap, title: "Australia's Top", sub: "Educators", color: "text-orange-500" },
  { icon: TrendingUp, title: "Proven Success", sub: "Record", color: "text-blue-500" },
  { icon: Radio, title: "Live Interactive", sub: "Classes", color: "text-red-500" },
  { icon: ShieldCheck, title: "Trusted by 100+", sub: "Students", color: "text-emerald-500" },
] as const;

// Tiny inline blur placeholder (12px WebP) for the student LCP image,
// so first paint shows a soft preview instead of empty space.
const STUDENTS_BLUR =
  "data:image/webp;base64,UklGRrAAAABXRUJQVlA4WAoAAAAQAAAACwAABAAAQUxQSD0AAAAAAgAfz2gAAQKTXQACAwBg/2sAAQja6BcAAGz//3oAAB/i/6YAcfv//+0jAJb/5f+CqMSIZz0EABw4NF98AFZQOCBMAAAAsAEAnQEqDAAFAAOAWiWgAnQA3Mx/bAD+6QCLLhbj1vN9n9REhZ978YALvv0+JB9XRyKF+TPhQVt7b7p+1+vkN0k6GvHlMhL/htlAAA=";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  const openDemoBooking = useOpenDemoBooking();
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [dialCode, setDialCode] = useState("+61");

  const [examIndex, setExamIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setExamIndex((i) => (i + 1) % HEADLINE_EXAMS.length),
      2200
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const f = prefersReduced ? 0 : isDesktop ? 1 : 0.18;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const ease = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const bgY = useTransform(ease, [0, 1], ["0%", `${-6 * f}%`]);
  const studentsY = useTransform(ease, [0, 1], ["0%", `${-26 * f}%`]);
  const contentY = useTransform(ease, [0, 1], ["0%", `${-8 * f}%`]);
  const contentOpacity = useTransform(ease, [0, 0.7, 1], [1, 1, 0.35]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex flex-col min-h-[100svh] md:min-h-[calc(100svh+100px)] w-full overflow-x-clip overflow-y-clip bg-gradient-to-b from-sky-100 to-white"
    >
      {/* ── Layer 1: Background — Sydney (priority load, no blur) ── */}
      <motion.div style={{ y: bgY }} className="absolute -inset-x-0 -top-[8%] z-0 h-[116%] w-full">
        <Image
          src="/hero/sydney.webp"
          alt="Sydney harbour at sunset"
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover object-[center_80%] md:object-[center_-100px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/5 to-white" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent h-[55%] top-auto" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-transparent" />
      </motion.div>

      {/* ── Layer 2: Foreground group — students + laptop (priority load, no blur) ── */}
      <motion.div
        style={{ y: studentsY }}
        className="pointer-events-none absolute inset-x-0 bottom-[290px] sm:bottom-[210px] z-[3] hidden sm:flex justify-center"
      >
        <div className="relative aspect-[3/2] sm:aspect-[1460/586] w-[345%] max-w-none sm:w-[90%] md:w-auto md:h-[40vh] md:max-h-[420px] md:min-h-[260px]">
          {/* Desktop image — CSS-gated by the `hidden sm:flex` parent + lazy loading,
              so it only downloads on wide screens (no JS mount gate delaying the LCP) */}
          <Image
            src="/hero/students.webp"
            alt="Students learning online"
            fill
            sizes="90vw"
            placeholder="blur"
            blurDataURL={STUDENTS_BLUR}
            className="object-contain object-bottom drop-shadow-2xl"
          />

          {/* Laptop image — hidden on mobile */}
          <div className="hidden sm:block absolute bottom-[13%] left-[52%] w-[26%] -translate-x-1/2 translate-y-[20px] pointer-events-none">
            <Image
              src="/hero/laptop-logo.webp"
              alt="Super Sheldon on laptop"
              width={400}
              height={260}
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </motion.div>

      {/* ── Layer 3: Content ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex flex-1 w-full max-w-7xl flex-col justify-start px-4 pt-3 pb-4 sm:pb-[180px] sm:px-6 md:pt-4 md:pb-[200px]"
      >
        {/* Centered headline block */}
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">

          {/* Pill */}
          <span className="mt-2 md:mt-2 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-700 shadow-sm backdrop-blur-md sm:text-xs">
            <span className="text-base leading-none">🪙</span>
            Australia&apos;s Best Online Learning Platform
            <span className="text-base leading-none">🇦🇺</span>
          </span>

          {/* Headline */}
          <h1 className="mt-2 font-extrabold leading-[1.1] tracking-tight text-gray-900 drop-shadow-sm text-2xl sm:text-3xl md:text-4xl md:whitespace-nowrap lg:text-5xl">
            <span className="block">Dream Big. Learn Smart.</span>
            <span className="mt-1 block">
              Crack{" "}
              <span className="relative inline-flex overflow-hidden align-bottom">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={HEADLINE_EXAMS[examIndex]}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"
                  >
                    {HEADLINE_EXAMS[examIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </h1>

          {/* Subtext */}
          <p className="mt-3 max-w-xl text-base font-medium leading-relaxed text-gray-700 sm:text-lg">
            Live interactive classes, expert mentors, and a proven path to top
            scores in Australian Exams.
          </p>

          {/* Mobile student image — outer holds space in flex flow, inner bleeds to 142vw centered */}
          <div className="block sm:hidden -mt-[60px] relative w-full h-[95vw]">
            <div className="absolute left-[calc(50%-14px)] -translate-x-1/2 w-[142vw] h-full">
              {/* Mobile-only asset — CSS-gated by the `block sm:hidden` parent + lazy loading,
                  so it only downloads on narrow screens */}
              <Image
                src="/hero/students-mobile.webp"
                alt="Students learning online"
                fill
                sizes="142vw"
                placeholder="blur"
                blurDataURL={STUDENTS_BLUR}
                className="object-contain drop-shadow-2xl"
              />
            </div>
            {/* Laptop overlay — mobile only */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[calc(5%+130px)] w-[48vw] z-10 pointer-events-none">
              <Image
                src="/hero/laptop-logo.webp"
                alt="Super Sheldon on laptop"
                width={400}
                height={260}
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Phone form CTA */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (/^\d{6,15}$/.test(phone)) {
                setPhoneError("");
                openDemoBooking();
              } else {
                setPhoneError("Please enter a valid phone number");
              }
            }}
            className="-mt-16 sm:mt-3 relative z-10 flex w-full max-w-sm flex-col gap-2"
          >
            {/* Phone input row — always full width */}
            <div className="flex items-center gap-1 overflow-hidden rounded-full border-2 border-orange-500 bg-white/90 py-1 pl-0 pr-1 shadow-lg backdrop-blur-md sm:pr-1">
              <span className="flex h-9 w-12 shrink-0 items-center justify-center border-r border-gray-200 text-xs font-semibold text-gray-700">
                {dialCode}
              </span>
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-9 min-w-0 flex-1 bg-transparent px-2 text-xs text-gray-900 outline-none placeholder:text-gray-400"
              />
              {/* Button inside pill — desktop only */}
              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="hidden sm:flex h-8 shrink-0 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-4 text-xs font-bold shadow-md shadow-orange-500/30 hover:to-orange-500"
              >
                Try a Free Class
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Standalone button — mobile only */}
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="flex sm:hidden w-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 py-3 text-sm font-bold shadow-md shadow-orange-500/30 hover:to-orange-500"
            >
              Try a Free Class
            </Button>

            {phoneError && (
              <p className="text-sm font-medium text-red-500">{phoneError}</p>
            )}
          </form>
        </div>

        {/* "Crack Australian Exams" card — Instantly visible on lg screens */}
        <div className="hidden lg:block mt-8 self-center rounded-2xl border border-white/70 bg-white/90 p-5 shadow-xl backdrop-blur-md sm:mt-10 lg:absolute lg:right-4 lg:top-[calc(58%_-_160px)] lg:mt-0 lg:max-w-xs xl:right-8">
          <h3 className="mb-3 text-base font-bold text-gray-900">
            Crack Australian Exams
          </h3>
          <ul className="grid grid-cols-2 gap-x-5 gap-y-2.5 lg:grid-cols-1">
            {EXAMS.map((exam) => (
              <li key={exam} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </span>
                {exam}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* ── Floating decor — Added priority to load instantly ── */}
      <div className="animate-float pointer-events-none absolute bottom-[300px] left-3 z-20 h-14 w-14 hidden sm:block sm:left-8 sm:h-20 sm:w-20 sm:bottom-[272px] md:bottom-[288px]">
        <Image src="/floating-icons/book.png" alt="" fill loading="lazy" className="object-contain drop-shadow-xl" />
      </div>
      <div
        className="animate-float pointer-events-none absolute bottom-[300px] right-3 z-20 h-14 w-14 hidden sm:block sm:right-8 sm:h-20 sm:w-20 sm:bottom-[272px] md:bottom-[288px]"
        style={{ animationDelay: "1.2s" }}
      >
        <Image src="/floating-icons/lightbulb.png" alt="" fill loading="lazy" className="object-contain drop-shadow-xl" />
      </div>

      {/* ── Bottom stats bar — Instantly visible ── */}
      <div className="relative w-full z-20 px-4 mt-auto pb-10 sm:absolute sm:inset-x-0 sm:bottom-[160px] sm:mt-0 sm:pb-0">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-4 gap-y-4 rounded-3xl border border-white/70 bg-white/90 px-6 py-4 shadow-xl backdrop-blur-md md:grid-cols-4 md:gap-x-2">
          {STATS.map(({ icon: Icon, title, sub, color }) => (
            <div key={title} className="flex items-center justify-center gap-2.5 md:gap-3">
              <Icon className={`h-6 w-6 shrink-0 ${color}`} />
              <div className="leading-tight">
                <p className="text-sm font-bold text-gray-900">{title}</p>
                <p className="text-sm font-medium text-gray-500">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll-down chevron */}
      <div className="absolute bottom-2 left-1/2 z-20 hidden -translate-x-1/2 sm:block">
        <div className="flex h-9 w-9 animate-bounce items-center justify-center rounded-full border border-gray-300 bg-white/80 shadow-sm backdrop-blur">
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    </section>
  );
}