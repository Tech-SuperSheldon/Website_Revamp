"use client";

import React, { useId, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const US_COURSES = [
  {
    id: "naplan",
    title: "NAPLAN Prep",
    type: "Exam Prep",
    duration: "Year 2–9",
    desc: "Structured NAPLAN preparation across reading, writing, language and numeracy to build confidence and exam readiness.",
    img: "/course/y5progidy.jpg",
  },
  {
    id: "icas",
    title: "ICAS Prep",
    type: "Exam Prep",
    duration: "Year 2–11",
    desc: "Sharpen problem-solving and critical thinking with ICAS-focused courses designed to stretch high achievers.",
    img: "/course/y6icas.jpg",
  },
  {
    id: "selective",
    title: "Selective & Scholarship",
    type: "Exam Prep",
    duration: "Year 5–9",
    desc: "Targeted coaching for selective entry and scholarship exams, building analytical skills and competitive readiness.",
    img: "/course/y9selacc.jpg",
  },
  {
    id: "senior",
    title: "HSC & ATAR",
    type: "Exam Prep",
    duration: "Year 9–12",
    desc: "Senior exam mastery for HSC and ATAR with advanced strategies in English and Mathematics.",
    img: "/course/y12hsc.jpg",
  },
];

/** Fallback before layout measure (grid gap shifts real centers vs equal ¼ splits). */
const DEFAULT_BRANCH_X = [125, 375, 625, 875];
const HUB_X = 500;
/** ViewBox height: paths end at Y=VIEW_H so strokes reach the connector dots after layout overlap. */
const VIEW_H = 280;
const STEM_Y0 = 0;
const STEM_Y1 = 60;
const PULSE_DUR_S = 3;
const STAGGER_S = 0.75;

/** Branch only: stem junction → cubic down to dot/card anchor (same d as gray branches + extra reach). */
function branchPathD(x: number) {
  return `M ${HUB_X} ${STEM_Y1} C ${HUB_X} 135, ${x} 135, ${x} ${VIEW_H}`;
}

/** Full path for pulses: hub top → stem → branch to bottom (aligned with DOM dots). */
function fullBranchPath(x: number) {
  return `M ${HUB_X} ${STEM_Y0} L ${HUB_X} ${STEM_Y1} C ${HUB_X} 135, ${x} 135, ${x} ${VIEW_H}`;
}

export default function USCourseTree() {
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);
  const [branchXs, setBranchXs] = useState<number[]>(() => [...DEFAULT_BRANCH_X]);
  // Default false so SSR and first client render match (avoids hydration mismatch);
  // updated from matchMedia inside the effect below.
  const [isMobile, setIsMobile] = useState(false);
  const pulseId = useId().replace(/:/g, "");
  const svgRef = useRef<SVGSVGElement>(null);
  const treeRowRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");

    const measureBranchXs = () => {
      setIsMobile(!mq.matches);
      if (!mq.matches) {
        setBranchXs([500, 500, 500, 500]);
        return;
      }
      const svg = svgRef.current;
      if (!svg) return;
      const s = svg.getBoundingClientRect();
      if (s.width < 8) return;

      const next = US_COURSES.map((_, i) => {
        const el = dotRefs.current[i];
        if (!el) return DEFAULT_BRANCH_X[i];
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const x = ((cx - s.left) / s.width) * 1000;
        return Math.max(40, Math.min(960, x));
      });
      setBranchXs(next);
    };

    const schedule = () => {
      measureBranchXs();
      requestAnimationFrame(measureBranchXs);
    };

    schedule();
    const ro = new ResizeObserver(schedule);
    if (treeRowRef.current) ro.observe(treeRowRef.current);
    mq.addEventListener("change", schedule);
    window.addEventListener("resize", schedule);
    const t1 = window.setTimeout(schedule, 350);
    const t2 = window.setTimeout(schedule, 900);
    document.fonts?.ready?.then(() => schedule());
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", schedule);
      window.removeEventListener("resize", schedule);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return (
    <section className="py-10 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10 md:mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Focused Exam <span className="text-orange-500">Mastery</span> Courses
          </h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">
            Prepare for NAPLAN, ICAS, Selective & Scholarship and senior exams with structured, expert-led courses.
          </p>
        </motion.div>

        <div ref={treeRowRef} className="relative flex w-full flex-col items-center">
          {/* Top Node */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-3xl border border-orange-100 flex items-center justify-center shadow-xl relative z-30"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 relative">
              <Image src="/logo.png" alt="SuperSheldon Logo" fill className="object-contain" />
            </div>
          </motion.div>

          {/* Tree SVG: same max width as card grid so x=125/375/625/875 hit column centers */}
          <div className="relative z-0 w-full max-w-7xl mx-auto h-36 md:h-56 -mt-4 overflow-hidden pointer-events-none">
            <svg
              ref={svgRef}
              className="absolute inset-0 h-full w-full overflow-hidden"
              viewBox={`0 0 1000 ${VIEW_H}`}
              preserveAspectRatio="none"
              fill="none"
              aria-hidden
            >
              <defs>
                {/* Hard clip: stops pulse circles / blur from painting past the viewBox (stray blobs on the right/edges). */}
                <clipPath id={`${pulseId}-pulseClip`} clipPathUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="1000" height={VIEW_H} />
                </clipPath>
                <linearGradient id={`${pulseId}-lineGlow`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="35%" stopColor="#FF6B35" />
                  <stop offset="50%" stopColor="#FF8C42" />
                  <stop offset="65%" stopColor="#FF6B35" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>

              {/* Central vertical stem — animate on mount; avoid per-path whileInView (edge paths can get ~0 intersection area when pathLength is 0). */}
              <motion.path
                d={`M ${HUB_X} ${STEM_Y0} L ${HUB_X} ${STEM_Y1}`}
                stroke="#E5E7EB"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              {/* Branches — no vectorEffect: non-scaling-stroke + preserveAspectRatio="none" breaks full stroke on long outer curves in Chromium/WebKit. */}
              {branchXs.map((xPos, idx) => (
                <motion.path
                  key={`branch-${idx}-${Math.round(xPos)}`}
                  d={branchPathD(xPos)}
                  stroke={hoveredCourse === US_COURSES[idx].id ? "#F97316" : "#E5E7EB"}
                  strokeWidth={hoveredCourse === US_COURSES[idx].id ? "3" : "2"}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    pathLength: { duration: 0.6, delay: 0.15 + idx * 0.1, ease: "easeOut" },
                    stroke: { duration: 0.3 },
                    strokeWidth: { duration: 0.3 },
                  }}
                />
              ))}

              {/* Orange traveling highlight on each full path (hub → card) */}
              <g clipPath={`url(#${pulseId}-pulseClip)`} className="motion-reduce:hidden">
                {branchXs.map((xPos, idx) => {
                  if (isMobile && idx > 0) return null; // Only one pulse on mobile
                  
                  const d = fullBranchPath(xPos);
                  const begin = `${idx * STAGGER_S}s`;
                  return (
                    <path
                      key={`line-pulse-${idx}-${Math.round(xPos)}`}
                      d={d}
                      pathLength={1}
                      stroke={`url(#${pulseId}-lineGlow)`}
                      strokeWidth={5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={0.75}
                      strokeDasharray="0.14 0.86"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="0;-1"
                        dur={`${PULSE_DUR_S}s`}
                        repeatCount="indefinite"
                        begin={begin}
                        calcMode="linear"
                      />
                    </path>
                  );
                })}
              </g>
            </svg>
          </div>

          {/* Leaf Nodes — pulled up so SVG path endpoints meet the connector dots */}
          <div className="relative z-20 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 w-full max-w-7xl pt-0 md:-mt-7">
            {/* Vertical connector line for mobile */}
            <div className="absolute top-0 bottom-10 left-1/2 w-0.5 bg-gray-200 -translate-x-1/2 md:hidden z-0" />
            {US_COURSES.map((course, index) => {
              const isActive = hoveredCourse === course.id;
              return (
                <div key={course.id} className="relative flex flex-col items-center">
                  {/* Connector dot — ref used to align SVG branch endpoints (gap-aware) */}
                  <div
                    ref={(el) => {
                      dotRefs.current[index] = el;
                    }}
                    className="relative z-10 mb-1 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-white bg-orange-500 shadow-sm md:mb-0.5"
                    aria-hidden
                  />

                  {/* Card */}
                  <motion.div
                    onMouseEnter={() => setHoveredCourse(course.id)}
                    onMouseLeave={() => setHoveredCourse(null)}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5, ease: "easeOut" }}
                    animate={{
                      boxShadow: isActive
                        ? "0 20px 50px rgba(249, 115, 22, 0.15)"
                        : "0 1px 4px rgba(0,0,0,0.05)",
                    }}
                    className="relative cursor-pointer overflow-hidden bg-white rounded-[2.5rem] border border-gray-100 w-full flex flex-col items-center"
                  >
                    {/* Image */}
                    <div
                      className="relative w-full overflow-hidden"
                      style={{
                        height: isActive ? "9rem" : "8rem",
                        transition: "height 0.35s ease",
                      }}
                    >
                      <Image src={course.img} alt={course.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          key="content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="overflow-hidden w-full"
                        >
                          <div className="flex flex-col items-center text-center px-6 py-5">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-3 py-1 bg-orange-100 text-orange-600 text-[10px] font-bold uppercase tracking-wider rounded-full">
                                {course.type}
                              </span>
                              <span className="text-[10px] text-gray-400 font-bold uppercase">
                                {course.duration}
                              </span>
                            </div>
                            <h4 className="text-base font-extrabold text-gray-900 mb-2 leading-tight">
                              {course.title}
                            </h4>
                            <p className="text-gray-500 text-xs leading-relaxed mb-4 font-medium line-clamp-3">
                              {course.desc}
                            </p>
                            <Link href="/courses">
                              <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ duration: 0.15 }}
                                className="bg-orange-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-orange-200 hover:bg-orange-600 transition-colors"
                              >
                                Explore Course
                              </motion.button>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Collapsed label */}
                    <AnimatePresence>
                      {!isActive && (
                        <motion.div
                          key="label"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-4 py-3 text-center"
                        >
                          <p className="text-xs font-bold text-gray-700 line-clamp-2">{course.title}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-orange-400/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-400/5 rounded-full blur-[100px] pointer-events-none" />
      </div>
    </section>
  );
}
