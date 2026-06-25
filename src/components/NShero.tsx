"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import countries from "world-countries";
import { useOpenDemoBooking } from "@/components/utils/navigation";
import {
  motion,
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

const STATS = [
  { icon: GraduationCap, title: "Australia's Top", sub: "Educators", color: "text-orange-500" },
  { icon: TrendingUp, title: "Proven Success", sub: "Record", color: "text-blue-500" },
  { icon: Radio, title: "Live Interactive", sub: "Classes", color: "text-red-500" },
  { icon: ShieldCheck, title: "Trusted by 500K+", sub: "Students", color: "text-emerald-500" },
] as const;

// Derive an international dial code (e.g. "+61") from an ISO-2 country code.
function dialCodeFromCca2(cca2: string): string {
  const c = countries.find((x) => x.cca2 === cca2);
  if (!c?.idd?.root) return "+1";
  return `${c.idd.root}${c.idd.suffixes?.[0] ?? ""}`;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReduced = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  // Phone form → redirect to /demo
  const openDemoBooking = useOpenDemoBooking();
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [dialCode, setDialCode] = useState("+1");

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Auto-detect the visitor's country dial code for the phone input.
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://iplocate.io/api/lookup?apikey=0e7ca4b669dc85fbc604c1776a93d3e5"
        );
        const data = await res.json();
        if (data?.country_code) setDialCode(dialCodeFromCca2(data.country_code));
      } catch {
        setDialCode("+1");
      }
    })();
  }, []);

  // Ensure the class video autoplays inline/muted across browsers.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    void v.play().catch(() => {});
  }, []);

  // Rich parallax on desktop, near-static on mobile / reduced-motion.
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

  // Background slow, flag medium, students fast.
  const bgY = useTransform(ease, [0, 1], ["0%", `${-6 * f}%`]);
  const flagY = useTransform(ease, [0, 1], ["0%", `${-16 * f}%`]);
  const studentsY = useTransform(ease, [0, 1], ["0%", `${-26 * f}%`]);
  const contentY = useTransform(ease, [0, 1], ["0%", `${-8 * f}%`]);
  // Subtle fade of foreground/content as you scroll past.
  const contentOpacity = useTransform(ease, [0, 0.7, 1], [1, 1, 0.35]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[calc(100svh+100px)] w-full overflow-x-clip overflow-y-clip bg-gradient-to-b from-sky-100 to-white"
    >
      {/* ── Layer 1: Background — Sydney (slow) ── */}
      <motion.div style={{ y: bgY }} className="absolute -inset-x-0 -top-[8%] z-0 h-[116%] w-full">
        <Image
          src="/hero/sydney.jpg"
          alt="Sydney harbour at sunset"
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover"
          style={{ objectPosition: "center -100px" }}
        />
        {/* Readability + bottom blend into page */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/5 to-white/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-transparent" />
      </motion.div>

      {/* ── Layer 2: Midground — Australian flag, top-right (medium) ── */}
      <motion.div
        style={{ y: flagY }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="pointer-events-none absolute right-2 top-16 z-[2] w-[30%] max-w-[200px] sm:right-6 md:top-20 lg:w-[18%]"
      >
        <Image
          src="/hero/flag.png"
          alt="Australian flag"
          width={598}
          height={552}
          className="h-auto w-full drop-shadow-xl"
        />
      </motion.div>

      {/* ── Layer 3: Foreground group — students + laptop, locked together (fast) ──
           Sized by HEIGHT so it occupies a consistent lower band regardless of the
           viewport's aspect ratio (prevents the students from getting too tall on
           short/wide screens). The laptop is positioned as a % of this group so its
           size relative to the students always matches the reference composite. */}
      <motion.div
        style={{ y: studentsY }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
        className="pointer-events-none absolute inset-x-0 bottom-[160px] z-[3] flex justify-center"
      >
        <div className="relative aspect-[1460/586] w-[115%] max-w-none sm:w-[90%] md:w-auto md:h-[40vh] md:max-h-[420px] md:min-h-[260px]">
          <Image
            src="/hero/students.png"
            alt="Students learning online"
            fill
            priority
            sizes="(max-width: 768px) 115vw, 90vw"
            className="object-contain object-bottom drop-shadow-2xl"
          />

          {/* Class video laptop — sits on the desk, centered between the students */}
          <div className="absolute bottom-[5%] left-1/2 w-[23%] -translate-x-1/2">
            <div className="relative overflow-hidden rounded-md drop-shadow-2xl">
              <video
                ref={videoRef}
                src="/hero/class-video.webm"
                className="block h-auto w-full"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
              {/* Live badge */}
              <span className="absolute left-1.5 top-1.5 inline-flex items-center gap-1 rounded bg-white/90 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wide text-gray-900 shadow-sm backdrop-blur md:text-[9px]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                </span>
                Live
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Layer 4: Content (normal) ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex min-h-[calc(100svh+100px)] w-full max-w-7xl flex-col justify-start px-4 pt-16 pb-[180px] sm:px-6 md:pt-16 md:pb-[200px]"
      >
        {/* Centered headline block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          {/* Pill */}
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-700 shadow-sm backdrop-blur-md sm:text-xs">
            <span className="text-base leading-none">🪙</span>
            Australia&apos;s Best Online Learning Platform
            <span className="text-base leading-none">🇦🇺</span>
          </span>

          {/* Headline */}
          <h1 className="mt-2 font-extrabold leading-[1.1] tracking-tight text-gray-900 drop-shadow-sm text-2xl sm:text-3xl md:text-4xl md:whitespace-nowrap lg:text-5xl">
            <span className="block">Dream Big. Learn Smart.</span>
            <span className="mt-1 block">
              Crack{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Australia&apos;s Best.
              </span>
            </span>
          </h1>

          {/* Subtext */}
          <p className="mt-3 max-w-xl text-base font-medium leading-relaxed text-gray-700 sm:text-lg">
            Live interactive classes, expert mentors, and a proven path to top
            scores in Australian Exams.
          </p>

          {/* Phone form CTA → /demo */}
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
            className="-mt-1 flex w-full max-w-md flex-col gap-2"
          >
            <div className="flex items-center gap-1 overflow-hidden rounded-full border-2 border-orange-500 bg-white/90 p-1 pl-0 shadow-lg backdrop-blur-md">
              <span className="flex h-12 w-16 shrink-0 items-center justify-center border-r border-gray-200 text-sm font-semibold text-gray-700">
                {dialCode}
              </span>
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12 min-w-0 flex-1 bg-transparent px-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
              />
              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="h-10 shrink-0 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-5 text-sm font-bold shadow-md shadow-orange-500/30 hover:to-orange-500 sm:px-6 sm:text-base"
              >
                Try a Free Class
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
            {phoneError && (
              <p className="text-sm font-medium text-red-500">{phoneError}</p>
            )}
          </form>
        </motion.div>

        {/* "Crack Australian Exams" card — right side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="mt-8 self-center rounded-2xl border border-white/70 bg-white/90 p-5 shadow-xl backdrop-blur-md sm:mt-10 lg:absolute lg:right-4 lg:top-[calc(58%_-_160px)] lg:mt-0 lg:max-w-xs xl:right-8"
        >
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
        </motion.div>
      </motion.div>

      {/* ── Floating decor (reuse existing 3D assets) ── */}
      <div className="animate-float pointer-events-none absolute bottom-[272px] left-3 z-20 h-14 w-14 sm:left-8 sm:h-20 sm:w-20 md:bottom-[288px]">
        <Image src="/floating-icons/book.png" alt="" fill className="object-contain drop-shadow-xl" />
      </div>
      <div
        className="animate-float pointer-events-none absolute bottom-[272px] right-3 z-20 h-14 w-14 sm:right-8 sm:h-20 sm:w-20 md:bottom-[288px]"
        style={{ animationDelay: "1.2s" }}
      >
        <Image src="/floating-icons/lightbulb.png" alt="" fill className="object-contain drop-shadow-xl" />
      </div>

      {/* ── Bottom stats bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="absolute inset-x-0 bottom-[110px] z-20 px-4"
      >
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
      </motion.div>

      {/* Scroll-down chevron */}
      <div className="absolute bottom-2 left-1/2 z-20 hidden -translate-x-1/2 sm:block">
        <div className="flex h-9 w-9 animate-bounce items-center justify-center rounded-full border border-gray-300 bg-white/80 shadow-sm backdrop-blur">
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    </section>
  );
}
