"use client";

// Course catalogue embedded on the academy pages, directly above NSProcess.
//
// Deliberately headless — no section heading — because it sits between the
// academy hero and "How we tailor every lesson to your child", which already
// carry the page's voice.
//
// The card is the one from the /new-courses listing pages (NSCourseMainAU /
// UKCourseMain), not the compact homepage course-tree card: image with type +
// year badges, title, description, "Explore Course" and a working brochure
// download.
//
// The grade pills default to "All", so every year's courses are on screen
// before the visitor touches a filter.
import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/** Minimum a course needs to render a card. Both the AU and UK datasets are
 *  supersets of this, so each site passes its own richer type through. */
export type AcademyCourseBase = {
  id: string;
  title: string;
  desc: string;
  img: string;
  type: string;
  topics: number;
  duration?: string;
};

const ALL = "All";
const INITIAL_COUNT = 6;

export default function AcademyCourseGrid<T extends AcademyCourseBase>({
  /** Courses keyed by the group they belong to — "Year 5", "Test Prep", … */
  groups,
  /** Course detail route for this site, e.g. "/au/new-courses". */
  hrefBase,
  /** Site-specific brochure button; typed against that site's Course. */
  renderBrochure,
}: {
  groups: Record<string, T[]>;
  hrefBase: string;
  renderBrochure?: (course: T) => React.ReactNode;
}) {
  const [activeGroup, setActiveGroup] = useState(ALL);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  // Every group in the dataset gets a pill so no course is unreachable. Year
  // groups lead, in numeric order (so Year 2 isn't sorted after Year 10); the
  // AU set's non-year groups ("Test Prep", "General Academics") follow.
  const groupNames = useMemo(() => {
    const yearOf = (name: string) => {
      const match = /^Year (\d+)$/.exec(name);
      return match ? Number(match[1]) : null;
    };
    const names = Object.keys(groups);
    const years = names.filter((n) => yearOf(n) !== null).sort((a, b) => yearOf(a)! - yearOf(b)!);
    const rest = names.filter((n) => yearOf(n) === null);
    return [...years, ...rest];
  }, [groups]);

  const allCourses = useMemo(
    () =>
      groupNames.flatMap((group) =>
        (groups[group] || []).map((course) => ({ ...course, year: group }))
      ),
    [groups, groupNames]
  );

  const filtered = useMemo(
    () =>
      activeGroup === ALL
        ? allCourses
        : allCourses.filter((course) => course.year === activeGroup),
    [allCourses, activeGroup]
  );

  const selectGroup = (group: string) => {
    setActiveGroup(group);
    setVisibleCount(INITIAL_COUNT);
  };

  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-4 md:pt-14 md:pb-6">
      {/* Decorative blobs — same wash the homepage catalogue sits on. */}
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-orange-400 opacity-[0.06] blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-orange-300 opacity-[0.05] blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Grade filter — "All" first and selected by default. */}
        <div className="mb-8 flex flex-wrap justify-center gap-2 md:gap-3">
          {[ALL, ...groupNames].map((group) => (
            <button
              key={group}
              onClick={() => selectGroup(group)}
              aria-pressed={activeGroup === group}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                activeGroup === group
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-orange-200 hover:bg-gray-100"
              }`}
            >
              {group === ALL ? "All Grades" : group}
            </button>
          ))}
        </div>

        <div className="mb-8 text-sm font-medium text-gray-500">
          Showing {Math.min(visibleCount, filtered.length)} of {filtered.length}{" "}
          {filtered.length === 1 ? "program" : "programs"}
        </div>

        {/* Course grid — card markup shared with the /new-courses listings. */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.slice(0, visibleCount).map((course, index) => (
              <motion.div
                key={`${course.year}-${course.id}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`${hrefBase}/${course.id}`} className="group block h-full cursor-pointer">
                  <div className="flex h-full transform flex-col overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10">
                    {/* Image Container */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-t-[2rem] bg-gray-100">
                      {course.img ? (
                        <Image
                          src={course.img}
                          alt={course.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          priority={index < 3}
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-orange-50 font-bold uppercase tracking-widest text-orange-200">
                          {course.type}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

                      {/* Type Badge */}
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-orange-600 shadow-sm backdrop-blur-md">
                          {course.type}
                        </span>
                      </div>

                      {/* Year Badge */}
                      <div className="absolute right-4 top-4">
                        <span className="rounded-full bg-black/50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-sm backdrop-blur-md">
                          {course.year}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex grow flex-col p-6 md:p-8">
                      <h3 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-orange-600">
                        {course.title}
                      </h3>

                      <p className="mb-6 line-clamp-3 grow text-sm leading-relaxed text-gray-500">
                        {course.desc}
                      </p>

                      <div className="mt-auto">
                        <button className="group/btn mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-50 py-3 font-bold text-gray-900 transition-all duration-300 hover:bg-orange-500 hover:text-white">
                          Explore Course
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transform transition-transform group-hover/btn:translate-x-1"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </button>

                        {renderBrochure && <div className="mb-5">{renderBrochure(course)}</div>}

                        <div className="flex items-center justify-between border-t border-gray-100 pt-5 text-xs font-bold uppercase tracking-wider text-gray-400">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                            <span>{course.topics} Units</span>
                          </div>
                          <span className="text-gray-300">•</span>
                          <span>{course.duration || "Flexible"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-gray-400">No courses found for {activeGroup}.</p>
            <button
              onClick={() => selectGroup(ALL)}
              className="mt-4 font-semibold text-orange-600 hover:underline"
            >
              Show all grades
            </button>
          </div>
        )}

        {visibleCount < filtered.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 flex justify-center"
          >
            <button
              onClick={() => setVisibleCount((v) => v + INITIAL_COUNT)}
              className="flex items-center gap-2 rounded-2xl bg-orange-500 px-10 py-4 text-base font-bold text-white shadow-lg shadow-orange-200 transition-all duration-200 hover:bg-orange-600 active:scale-95"
            >
              View More Courses
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
