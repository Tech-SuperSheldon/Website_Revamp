"use client";

// Premium infinite Teacher carousel (Apple TV / Netflix feel).
//  • Embla + AutoScroll: seamless infinite loop, auto-scroll, pause on hover,
//    resume on leave, swipeable on mobile — no arrows, no pagination.
//  • Clean photo cards (image + name + subject + experience badge). The whole
//    card is clickable and opens an animated, blurred modal — no navigation,
//    no "View Profile" button.
//  • Hover: lift + zoom + subtle pointer-based 3D tilt. Lazy images with
//    skeleton loaders. Transform-only animations for smooth 60fps.

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  X,
  Star,
  Sparkles,
  GraduationCap,
  BookOpen,
  Languages as LanguagesIcon,
  Award,
  Quote,
  Trophy,
  ArrowRight,
  Clock,
} from "lucide-react";
import { teachers as TEACHERS } from "@/data/teachers";

/* ───────────────────────── Rating stars ───────────────────────── */
function Stars({ value = 0 }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const active = i < full || (i === full && half);
        return (
          <Star
            key={i}
            className={`h-4 w-4 ${active ? "fill-blue-400 text-blue-400" : "fill-gray-200 text-gray-200"}`}
          />
        );
      })}
      <span className="ml-1 text-sm font-semibold text-gray-700">{value.toFixed(1)}</span>
    </span>
  );
}

/* ───────────────────── Lazy image + skeleton ──────────────────── */
function LazyImg({ src, alt, className = "" }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 72vw, (max-width: 768px) 46vw, (max-width: 1024px) 32vw, (max-width: 1280px) 24vw, 20vw"
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </>
  );
}

/* ─────────────────────────── Teacher card ─────────────────────── */
function TeacherCard({ teacher, onOpen }) {
  // Pointer-based 3D tilt via motion values (no re-render → smooth).
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springX = useSpring(rotX, { stiffness: 150, damping: 15 });
  const springY = useSpring(rotY, { stiffness: 150, damping: 15 });

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rotY.set(px * 12);
    rotX.set(-py * 12);
  };
  const reset = () => {
    rotX.set(0);
    rotY.set(0);
  };

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(teacher)}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group block w-full text-left [perspective:1000px] focus:outline-none"
      aria-label={`View profile of ${teacher.name}`}
    >
      <motion.div
        style={{ rotateX: springX, rotateY: springY }}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] bg-gray-100 shadow-[0_18px_45px_-22px_rgba(30,58,138,0.5)] ring-1 ring-black/5 transition-shadow duration-300 will-change-transform group-hover:shadow-[0_32px_70px_-24px_rgba(30,58,138,0.6)]"
      >
        <LazyImg
          src={teacher.portrait}
          alt={teacher.name}
          className="absolute inset-0 h-full w-full object-cover object-top duration-500 group-hover:scale-[1.06]"
        />

        {/* Bottom gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

        {/* Experience badge */}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm backdrop-blur-md ring-1 ring-white/25">
          <Clock className="h-3 w-3" />
          {teacher.experience}
        </span>

        {/* Name + subject */}
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <h3 className="text-lg font-bold leading-tight drop-shadow-sm">{teacher.name}</h3>
          <p className="mt-0.5 text-[13px] font-medium text-white/80">{teacher.subject}</p>
        </div>

        {/* Hover ring accent */}
        <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-0 ring-blue-400/0 transition-all duration-300 group-hover:ring-2 group-hover:ring-blue-400/70" />
      </motion.div>
    </motion.button>
  );
}

/* ───────────────────────── Modal popup ────────────────────────── */
function TeacherModal({ teacher, onClose }) {
  // ESC to close + lock body scroll while open.
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 p-3 backdrop-blur-md sm:p-4 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${teacher.name} profile`}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="relative flex max-h-[90vh] w-full max-w-sm flex-col overflow-y-auto rounded-3xl bg-white shadow-2xl md:max-h-[88vh] md:max-w-5xl md:flex-row md:overflow-hidden"
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-gray-700 shadow-md ring-1 ring-black/5 backdrop-blur transition hover:bg-white hover:text-gray-900"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left — circular avatar + rating (blue panel) */}
        <div className="relative flex shrink-0 flex-col items-center justify-center gap-3 overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-center text-white md:w-[38%] md:gap-4 md:p-8">
          {/* decorative blue glow */}
          <div className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-blue-400/40 blur-2xl" />
          <div className="pointer-events-none absolute -left-12 bottom-0 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

          <div className="relative rounded-[1.6rem] bg-gradient-to-br from-blue-400 to-sky-400 p-1.5 shadow-2xl">
            <div className="w-32 overflow-hidden rounded-[1.25rem] bg-white sm:w-36 md:w-48">
              <div className="aspect-[4/5]">
                <img
                  src={teacher.portrait}
                  alt={teacher.name}
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <h3 className="text-xl font-extrabold drop-shadow md:text-2xl">{teacher.name}</h3>
            <p className="text-sm font-medium text-white/85">{teacher.designation}</p>
            <div className="mt-2 flex flex-col items-center gap-1 md:mt-3">
              <span className="rounded-full bg-white/95 px-3 py-1 shadow-sm">
                <Stars value={teacher.rating} />
              </span>
              <span className="text-xs text-white/75">{teacher.students} students taught</span>
            </div>
          </div>
        </div>

        {/* Right — details */}
        <div className="flex min-w-0 flex-1 flex-col gap-6 p-6 md:overflow-y-auto md:p-8">
          {/* Quick facts */}
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              <BookOpen className="h-4 w-4" /> {teacher.subject}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              <Clock className="h-4 w-4" /> {teacher.experience}
            </span>
          </div>

          {/* Qualifications */}
          <Section icon={Award} title="Qualifications">
            <ul className="space-y-1.5">
              {teacher.qualifications.map((q) => (
                <li key={q} className="flex items-start gap-2 text-[15px] text-gray-700">
                  <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  {q}
                </li>
              ))}
            </ul>
          </Section>

          {/* About */}
          <Section icon={Sparkles} title="About">
            <p className="text-[15px] leading-relaxed text-gray-600">{teacher.about}</p>
          </Section>

          {/* Philosophy */}
          <div className="rounded-2xl bg-blue-50/70 p-4 ring-1 ring-blue-100">
            <Quote className="mb-1.5 h-5 w-5 text-blue-400" />
            <p className="text-[15px] italic leading-relaxed text-gray-700">{teacher.philosophy}</p>
          </div>

          {/* Subjects + Languages */}
          <div className="grid gap-6 sm:grid-cols-2">
            <Section icon={BookOpen} title="Subjects Taught">
              <div className="flex flex-wrap gap-2">
                {teacher.subjects.map((s) => (
                  <span key={s} className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                    {s}
                  </span>
                ))}
              </div>
            </Section>
            <Section icon={LanguagesIcon} title="Languages">
              <div className="flex flex-wrap gap-2">
                {teacher.languages.map((l) => (
                  <span key={l} className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                    {l}
                  </span>
                ))}
              </div>
            </Section>
          </div>

          {/* Achievements */}
          {teacher.achievements?.length > 0 && (
            <Section icon={Trophy} title="Achievements">
              <ul className="space-y-1.5">
                {teacher.achievements.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-[15px] text-gray-700">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-amber-500" />
                    {a}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* CTA */}
          <Link
            href="/demo"
            className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-amber-500 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.02]"
          >
            Book a Free Demo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Section({ icon: Icon, title, children }) {
  return (
    <div>
      <h4 className="mb-2 flex items-center gap-2 text-base font-bold text-gray-900">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-50 text-blue-600">
          <Icon className="h-4 w-4" />
        </span>
        {title}
      </h4>
      {children}
    </div>
  );
}

/* ─────────────────────────── Section root ─────────────────────── */
export default function UKHomeTeacherCarousel({ data = TEACHERS }) {
  const [selected, setSelected] = useState(null);
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true, align: "start", containScroll: false },
    [
      AutoScroll({
        speed: 1,
        startDelay: 0,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: false,
      }),
    ]
  );

  const open = useCallback((t) => setSelected(t), []);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white to-blue-50/40 py-16 md:py-24">
      {/* Heading */}
      <div className="mx-auto mb-10 max-w-3xl px-4 text-center md:mb-14">
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600">
          <Sparkles className="h-3.5 w-3.5" />
          Our Mentors
        </span>
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
          Meet Our <span className="text-blue-500">Teachers</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base text-gray-500">
          Expert mentors from around the world — tap any teacher to know them better.
        </p>
      </div>

      {/* Carousel */}
      <div className="embla select-none">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y px-4">
            {data.map((teacher) => (
              <div
                key={teacher.id}
                className="min-w-0 shrink-0 grow-0 basis-[72%] pr-4 sm:basis-[46%] md:basis-[32%] lg:basis-[24%] xl:basis-[20%]"
              >
                <TeacherCard teacher={teacher} onOpen={open} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <TeacherModal teacher={selected} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
