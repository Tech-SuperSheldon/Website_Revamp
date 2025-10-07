

"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Users, Download } from "lucide-react";
import GlossyButton from "../GlossyButton";
import { useRouter } from "next/navigation";

import { years, coursesData } from "./UKExamData";

export default function UKExamCourses() {
  const [activeYear, setActiveYear] = useState("Year 5");
  const router = useRouter();
  const containerRef = useRef(null);

  const items = coursesData[activeYear] || [];
  const isScrollable = items.length > 1;

  const activeYearIndex = years.indexOf(activeYear);
  
  const MOBILE_BREAKPOINT = 640;

  useEffect(() => {
    if (containerRef.current) {
        containerRef.current.scrollLeft = 0;
    }
  }, [activeYear]);

  useEffect(() => {
    const container = containerRef.current;
    
    const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT;

    if (!container || !isSmallScreen || !isScrollable) return;

    let isScrolling;

    const handleScroll = () => {
      window.clearTimeout(isScrolling);
      
      isScrolling = window.setTimeout(() => {
        const scrollLeft = container.scrollLeft;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        
        const SCROLL_END_THRESHOLD = 80; 
        const SCROLL_START_THRESHOLD = 5;  

        if (activeYearIndex < years.length - 1) {
            if (scrollLeft + clientWidth >= scrollWidth - SCROLL_END_THRESHOLD) {
                setActiveYear(years[activeYearIndex + 1]);
                return; 
            }
        }
        
        if (activeYearIndex > 0) {
            if (scrollLeft <= SCROLL_START_THRESHOLD) {
                setActiveYear(years[activeYearIndex - 1]);
                return;
            }
        }

      }, 100);
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [activeYearIndex, isScrollable, years.length]);


  return (
    <div
      id="course"
      className="px-4 sm:px-6 py-10 bg-[#4976F4] rounded-2xl mx-auto w-[95%] max-w-[1600px] min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] border border-gray-300"
    >
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 text-quicksand">
        Focused Exam Mastery Courses
      </h2>

      <div className="w-full">
        <div className="sm:hidden mb-6">
          <select
            value={activeYear}
            onChange={(e) => setActiveYear(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="hidden sm:flex justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 p-3 sm:p-4 bg-orange-100 rounded-xl overflow-x-auto">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className="relative px-3 sm:px-4 py-2 text-gray-700 font-medium whitespace-nowrap"
            >
              {year}
              {activeYear === year && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 -bottom-1 h-[3px] bg-orange-500 rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeYear}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          ref={containerRef}
          className={`flex gap-4 sm:gap-6 ${
            isScrollable
              ? "overflow-x-auto justify-start scroll-snap-x scroll-snap-mandatory px-2"
              : "justify-center flex-wrap"
          }`}
        >
          {items.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className={`snap-start bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden flex flex-col 
                w-[85vw] sm:w-[360px] md:w-[400px] lg:w-[420px] xl:w-[460px] ${
                  isScrollable ? "flex-shrink-0" : ""
                }`}
            >
              <div className="m-3 sm:m-4 rounded-xl border border-gray-200 overflow-hidden">
                <div className="relative w-full aspect-[6000/3375] bg-gray-200">
                  <Link href={course.path || "#"}>
                    <Image
                      src={course.img}
                      alt={course.title}
                      fill
                      className="object-contain cursor-pointer"
                      sizes="(max-width: 640px) 100vw,
                            (max-width: 1024px) 50vw,
                            33vw"
                    />
                  </Link>
                </div>
              </div>

              <div className="px-3 sm:px-4 pb-4 flex flex-col flex-1">
                <p className="text-xs sm:text-sm text-gray-500">{course.type}</p>
                <h3 className="text-base sm:text-lg font-semibold">{course.title}</h3>
                <div className="flex items-center text-yellow-500 mb-2 sm:mb-3">
                  {"★".repeat(course.rating)}
                  {"☆".repeat(5 - course.rating)}
                </div>

                <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                  <span className="flex items-center gap-1">
                    <BookOpen size={14} /> {course.topics} Topics
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={14} /> {course.sales} Enrolled
                  </span>
                </div>

                <div className="flex space-x-2 mt-auto">
                  <Link href={course.path}>
                    <GlossyButton className="bg-orange-500 text-white py-2 px-3 rounded-full hover:bg-orange-600 transition">
                      Try a free Class
                    </GlossyButton>
                  </Link>

                  <GlossyButton
                    as="a"
                    href={`https://wa.me/917974695618?text=${encodeURIComponent(
                      `Hi, I am interested in the ${course.title} course. Can you share more details?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 rounded-full transition"
                  >
                    Download Brochure
                  </GlossyButton>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}