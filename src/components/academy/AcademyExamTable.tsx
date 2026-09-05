"use client";

// "Also preparing for other exams?" — Exam Readiness only.
//
// A table on desktop, stacked cards on mobile: the three columns don't survive
// a phone width, and horizontal scrolling on the primary content of a section
// reads as a bug rather than an affordance.
import { motion, useReducedMotion } from "framer-motion";
import { rise, riseOnce, stagger, VIEWPORT } from "@/lib/motion";
import Highlight from "@/components/motion/Highlight";
import type { ExamRow, Locale } from "@/lib/academies";
import { academyTheme } from "@/lib/academyTheme";

function StatusPill({ status }: { status: ExamRow["status"] }) {
  const statutory = status === "Statutory";
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
        statutory ? "bg-[#e7f3ea] text-[#1e7a34]" : "bg-[#fff4e0] text-[#e68a00]"
      }`}
    >
      {status}
    </span>
  );
}

export default function AcademyExamTable({
  title,
  intro,
  rows,
  locale,
}: {
  title: string;
  intro: string;
  rows: ExamRow[];
  locale: Locale;
}) {
  const reduce = useReducedMotion() ?? false;
  const theme = academyTheme(locale);

  return (
    <section className="relative py-10 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...riseOnce(reduce)} className="mb-8 md:mb-10 max-w-2xl">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight ${theme.heading}`}
          >
            Also preparing for{" "}
            <Highlight reduce={reduce} text={theme.highlightText} bar={theme.highlightBar}>
              other exams?
            </Highlight>
          </h2>
          <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">{intro}</p>
          <span className="sr-only">{title}</span>
        </motion.div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className={`text-white ${theme.tableHead}`}>
                <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider">Region</th>
                <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider">Exam</th>
                <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider">
                  Who it&apos;s for
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.exam} className="border-t border-gray-100 odd:bg-white even:bg-gray-50/70">
                  <td className="px-5 py-4 align-top text-sm font-semibold text-gray-800">
                    {row.region}
                  </td>
                  <td className="px-5 py-4 align-top text-sm font-medium text-gray-900">
                    {row.exam}
                  </td>
                  <td className="px-5 py-4 align-top text-sm text-gray-600">
                    <StatusPill status={row.status} />
                    <span className="ml-2">{row.who}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <motion.ul
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="md:hidden space-y-3"
        >
          {rows.map((row) => (
            <motion.li
              key={row.exam}
              variants={rise(reduce, 16)}
              className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <StatusPill status={row.status} />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  {row.region}
                </span>
              </div>
              <p className="text-sm font-bold text-gray-900">{row.exam}</p>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed">{row.who}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
