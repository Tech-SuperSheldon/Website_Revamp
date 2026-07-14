"use client";

// Premium "Meet Our Teachers" section.
// Grid of teacher cards -> click a card -> the listing is replaced, on the same
// page, by a full animated profile (no modal, no navigation). Fully data-driven
// from src/data/teachers.js. Blue + Orange Super Sheldon theme, Framer Motion.

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Star,
  Users,
  GraduationCap,
  BookOpen,
  Check,
  Sparkles,
  Languages as LanguagesIcon,
  Award,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";
import { teachers as TEACHERS } from "@/data/teachers";

const PAGE_SIZE = 8;

/* Shared decorative blue banner + orange swoosh used on cards and the profile. */
function Swoosh({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-orange-400/90 blur-[2px]" />
      <div className="absolute -right-24 top-4 h-52 w-52 rounded-full bg-amber-300/70" />
      <div className="absolute -left-16 -bottom-20 h-40 w-40 rounded-full bg-white/10" />
    </div>
  );
}

/* ─────────────────────────── Grid card ─────────────────────────── */
function TeacherCard({ teacher, onSelect, index }) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(teacher)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: (index % PAGE_SIZE) * 0.06, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white text-left shadow-[0_14px_40px_-20px_rgba(30,58,138,0.35)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_24px_60px_-20px_rgba(30,58,138,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      {/* Blue banner */}
      <div className="relative h-24 bg-gradient-to-br from-blue-600 to-indigo-600">
        <Swoosh />
      </div>

      {/* Avatar overlapping the banner */}
      <div className="relative -mt-12 flex justify-center">
        <span className="rounded-full bg-gradient-to-br from-orange-400 to-amber-400 p-[3px] shadow-lg">
          <img
            src={teacher.image}
            alt={teacher.name}
            loading="lazy"
            className="h-24 w-24 rounded-full border-4 border-white bg-white object-cover"
          />
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col items-center px-5 pb-6 pt-3 text-center">
        <h3 className="text-lg font-bold leading-tight text-gray-900">{teacher.name}</h3>
        <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-blue-600">
          {teacher.designation}
        </p>

        {/* Subject + experience chips */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
            {teacher.subject}
          </span>
          <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-semibold text-orange-700">
            {teacher.experience}
          </span>
        </div>

        {/* One-line tagline */}
        <p className="mt-3 line-clamp-2 text-sm leading-snug text-gray-500">{teacher.tagline}</p>

        {/* CTA */}
        <span className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/25 transition-transform group-hover:scale-[1.02]">
          View Profile
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.button>
  );
}

/* ─────────────────────────── Stat pill ─────────────────────────── */
function Stat({ icon: Icon, value, label }) {
  return (
    <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
      <Icon className="mb-1 h-5 w-5 text-orange-500" strokeWidth={2} />
      <span className="text-lg font-extrabold leading-none text-gray-900">{value}</span>
      <span className="mt-1 text-[11px] font-medium text-gray-500">{label}</span>
    </div>
  );
}

/* ─────────────────────── Small section header ─────────────────── */
function Head({ icon: Icon, children }) {
  return (
    <h4 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-900">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-50 text-blue-600">
        <Icon className="h-4 w-4" />
      </span>
      {children}
    </h4>
  );
}

/* ─────────────────────────── Full profile ─────────────────────── */
const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.15 + i * 0.08, ease: "easeOut" },
  }),
};

function TeacherProfile({ teacher, onBack }) {
  return (
    <motion.div
      key={teacher.id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to all teachers
      </button>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_70px_-30px_rgba(30,58,138,0.5)] ring-1 ring-black/5">
        <div className="relative h-40 bg-gradient-to-br from-blue-600 to-indigo-600 md:h-44">
          <Swoosh />
        </div>

        <div className="grid gap-6 px-6 pb-8 md:grid-cols-[auto_1fr] md:gap-10 md:px-10">
          {/* Avatar + badge */}
          <motion.div
            className="relative -mt-24 mx-auto md:mx-0"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.05 }}
          >
            <span className="block rounded-full bg-gradient-to-br from-orange-400 to-amber-400 p-[5px] shadow-xl">
              <img
                src={teacher.image}
                alt={teacher.name}
                className="h-40 w-40 rounded-full border-[6px] border-white bg-white object-cover md:h-48 md:w-48"
              />
            </span>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-orange-500 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg">
              Passionate Teacher
            </span>
          </motion.div>

          {/* Header text + stats */}
          <div className="pt-2 text-center md:pt-6 md:text-left">
            <motion.h3
              custom={0}
              variants={fade}
              initial="hidden"
              animate="show"
              className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl"
            >
              {teacher.name}
            </motion.h3>
            <motion.p
              custom={1}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mt-1 text-sm font-semibold uppercase tracking-wider text-blue-600"
            >
              {teacher.designation}
            </motion.p>
            <motion.p
              custom={2}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mx-auto mt-4 max-w-xl text-[15px] font-medium leading-relaxed text-gray-600 md:mx-0"
            >
              {teacher.tagline}
            </motion.p>

            <motion.div
              custom={3}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mt-6 grid max-w-md grid-cols-3 gap-4"
            >
              <Stat icon={GraduationCap} value={teacher.experience} label="Experience" />
              <Stat icon={Users} value={teacher.students} label="Students Taught" />
              <Stat icon={Star} value={`${teacher.rating}/5`} label="Student Rating" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Left column */}
        <motion.div
          custom={4}
          variants={fade}
          initial="hidden"
          animate="show"
          className="space-y-8 rounded-[2rem] bg-white p-6 shadow-[0_14px_40px_-24px_rgba(30,58,138,0.35)] ring-1 ring-black/5 md:p-8"
        >
          <div>
            <Head icon={Sparkles}>About Me</Head>
            <p className="text-[15px] leading-relaxed text-gray-600">{teacher.about}</p>
          </div>

          <div>
            <Head icon={BookOpen}>Subjects &amp; Expertise</Head>
            <ul className="grid gap-2 sm:grid-cols-2">
              {teacher.subjects.map((s) => (
                <li key={s} className="flex items-center gap-2 text-[15px] text-gray-700">
                  <Check className="h-4 w-4 shrink-0 text-orange-500" strokeWidth={3} />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Head icon={LanguagesIcon}>Languages</Head>
            <div className="flex flex-wrap gap-2">
              {teacher.languages.map((l) => (
                <span
                  key={l}
                  className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right column */}
        <motion.div
          custom={5}
          variants={fade}
          initial="hidden"
          animate="show"
          className="space-y-8 rounded-[2rem] bg-white p-6 shadow-[0_14px_40px_-24px_rgba(30,58,138,0.35)] ring-1 ring-black/5 md:p-8"
        >
          <div>
            <Head icon={Sparkles}>Teaching Approach</Head>
            <ul className="space-y-2.5">
              {teacher.expertise.map((e) => (
                <li key={e} className="flex items-start gap-3 text-[15px] text-gray-700">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-orange-500 to-amber-500" />
                  {e}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Head icon={Award}>Qualifications</Head>
            <ul className="space-y-2">
              {teacher.qualifications.map((q) => (
                <li key={q} className="flex items-start gap-2 text-[15px] text-gray-700">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-blue-600" strokeWidth={3} />
                  {q}
                </li>
              ))}
            </ul>
          </div>

          {/* Teaching philosophy quote */}
          <div className="relative rounded-2xl bg-orange-50/70 p-5 ring-1 ring-orange-100">
            <Quote className="mb-2 h-6 w-6 text-orange-400" />
            <p className="text-[15px] italic leading-relaxed text-gray-700">
              {teacher.philosophy}
            </p>
            <p className="mt-3 text-sm font-semibold text-gray-900">— {teacher.name}</p>
          </div>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        custom={6}
        variants={fade}
        initial="hidden"
        animate="show"
        className="relative mt-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-600 px-6 py-7 shadow-[0_24px_60px_-28px_rgba(30,58,138,0.6)] md:px-10"
      >
        <Swoosh />
        <div className="relative flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="text-white">
            <h4 className="text-xl font-bold md:text-2xl">Book a Free Demo with {teacher.name}</h4>
            <p className="mt-1 text-sm text-blue-100">
              Take the next step towards your child&apos;s academic success.
            </p>
          </div>
          <Link
            href="/demo"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
          >
            Book Free Demo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────── Pagination ───────────────────────── */
function Pagination({ page, pageCount, onChange }) {
  if (pageCount <= 1) return null;
  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 0}
        aria-label="Previous page"
        className="grid h-10 w-10 place-items-center rounded-full bg-white text-gray-600 shadow ring-1 ring-black/5 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      {Array.from({ length: pageCount }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          className={`grid h-10 w-10 place-items-center rounded-full text-sm font-semibold shadow ring-1 ring-black/5 transition ${
            i === page
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === pageCount - 1}
        aria-label="Next page"
        className="grid h-10 w-10 place-items-center rounded-full bg-white text-gray-600 shadow ring-1 ring-black/5 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

/* ─────────────────────────── Root section ─────────────────────── */
export default function NSTeacherProfiles({ data = TEACHERS }) {
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(0);
  const sectionRef = useRef(null);

  const pageCount = Math.ceil(data.length / PAGE_SIZE);
  const pageItems = data.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const scrollToTop = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const open = (teacher) => {
    setSelected(teacher);
    scrollToTop();
  };
  const back = () => {
    setSelected(null);
    scrollToTop();
  };
  const changePage = (p) => {
    setPage(p);
    scrollToTop();
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full scroll-mt-24 bg-gradient-to-b from-blue-50/40 to-white px-4 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600">
            <Sparkles className="h-3.5 w-3.5" />
            Teacher Profiles
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Meet Our <span className="text-orange-500">Teachers</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-gray-500">
            Expert educators from around the world, dedicated to your child&apos;s success.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {selected ? (
            <TeacherProfile key="profile" teacher={selected} onBack={back} />
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {pageItems.map((teacher, i) => (
                  <TeacherCard key={teacher.id} teacher={teacher} onSelect={open} index={i} />
                ))}
              </div>
              <Pagination page={page} pageCount={pageCount} onChange={changePage} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
