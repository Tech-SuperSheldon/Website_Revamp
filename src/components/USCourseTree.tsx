"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Users, ArrowRight } from "lucide-react";
import { coursesData, years, Course } from "@/lib/course-data";

function CourseCard({ course, index }: { course: Course; index: number }) {
  const [glow, setGlow] = useState<{ x: number; y: number } | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setGlow({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseLeave={() => setGlow(null)}
      style={{
        background: glow
          ? `radial-gradient(circle at ${glow.x}px ${glow.y}px, rgba(249,115,22,0.1) 0%, #ffffff 55%)`
          : "#ffffff",
      }}
      className="group relative rounded-2xl overflow-hidden border border-orange-200 hover:border-orange-400 transition-colors duration-300 shadow-sm hover:shadow-[0_8px_32px_rgba(249,115,22,0.15)] flex flex-col cursor-pointer"
    >
      {/* Image — flush to card edges, no padding, aspect matches banner images */}
      <div className="relative w-full aspect-video bg-orange-50/30 overflow-hidden rounded-t-2xl">
        <Image
          src={course.img}
          alt={course.title}
          fill
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="px-4 pt-2.5 pb-4 flex flex-col flex-grow">
        <span className="inline-block bg-orange-50 text-orange-600 text-xs font-bold px-2.5 py-0.5 rounded-full mb-2 self-start border border-orange-100">
          {course.type}
        </span>
        <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-orange-600 transition-colors duration-200">
          {course.title}
        </h3>
        <p className="text-gray-500 text-xs line-clamp-2 mt-1.5 mb-3 flex-grow">
          {course.desc}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-3">
          <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
            <BookOpen size={11} className="text-orange-400" />
            <span>{course.topics} Topics</span>
          </div>
          <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
            <Users size={11} className="text-orange-400" />
            <span>{course.sales} Enrolled</span>
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-orange-100 pt-3 mt-auto flex flex-col gap-2">
          <Link href={course.path}>
            <button className="w-full bg-orange-500 text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-1.5 group/btn">
              Explore Course
              <ArrowRight
                size={14}
                className="group-hover/btn:translate-x-1 transition-transform"
              />
            </button>
          </Link>
          <button className="w-full bg-gray-50 text-gray-700 rounded-lg py-2 text-sm font-semibold hover:bg-gray-100 transition-colors border border-gray-200">
            Download Brochure
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function USCourseTree() {
  const [activeYear, setActiveYear] = useState("Year 5");

  const items = coursesData[activeYear] || [];

  return (
    <section className="pt-10 md:pt-14 pb-2 md:pb-4 overflow-hidden relative bg-white">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-400 rounded-full blur-[140px] opacity-[0.06] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-300 rounded-full blur-[120px] opacity-[0.05] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8 md:mb-10"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Focused Exam <span className="text-orange-500">Mastery</span> Courses
          </h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">
            Prepare for NAPLAN, ICAS, Selective &amp; Scholarship and senior exams with structured, expert-led courses.
          </p>
        </motion.div>

        {/* Year Selector — mobile dropdown */}
        <div className="sm:hidden mb-3">
          <select
            value={activeYear}
            onChange={(e) => setActiveYear(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 font-semibold"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Year Selector — desktop pill tabs */}
        <div className="hidden sm:flex flex-wrap justify-center gap-2 mb-3">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                activeYear === year
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <span className="relative z-10">{year}</span>
              {activeYear === year && (
                <motion.div
                  layoutId="yearPill"
                  className="absolute inset-0 bg-orange-500 rounded-full z-0"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeYear}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {items.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
