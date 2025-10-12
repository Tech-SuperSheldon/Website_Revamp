

"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Users } from "lucide-react";
import UKGlossyButton from "./UKGlossybutton";
import { years, coursesData } from "./UKExamData";

export default function UKNewExamCourses() {
  const [activeYear, setActiveYear] = useState("Year 5");
  const containerRef = useRef(null);
  const yearBarRef = useRef(null);

  const items = coursesData[activeYear] || [];

  // Reset scroll when year changes
  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollLeft = 0;
  }, [activeYear]);

  // Keep active year visible (scroll year bar to it)
  // useEffect(() => {
  //   if (!yearBarRef.current) return;
  //   const activeButton = yearBarRef.current.querySelector(
  //     `[data-year="${activeYear}"]`
  //   );
  //   if (activeButton) {
  //     activeButton.scrollIntoView({
  //       behavior: "smooth",
  //       inline: "center",
  //       block: "nearest",
  //     });
  //   }
  // }, [activeYear]);

  return (
    <div
      id="course"
      className="px-4 sm:px-6 py-10 bg-[#4976F4] rounded-2xl mx-auto w-[95%] max-w-[1600px] min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] border border-gray-300"
    >
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 text-quicksand">
        Focused Exam Mastery Courses
      </h2>

      {/* Year Navigation Bar */}
      <div
        ref={yearBarRef}
        className="flex justify-start sm:justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 p-3 sm:p-4 bg-[#E1E9FE] rounded-xl overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {years.map((year) => (
          <button
            key={year}
            data-year={year}
            onClick={() => setActiveYear(year)}
            className={`relative px-3 sm:px-4 py-2 text-gray-700 font-medium whitespace-nowrap transition 
              ${activeYear === year ? "text-blue-700" : ""}`}
          >
            {year}
            {activeYear === year && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 right-0 -bottom-1 h-[3px] bg-blue-700 rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Course Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeYear}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          ref={containerRef}
          className={`flex gap-4 sm:gap-6 flex-wrap justify-center ${
            items.length > 1 ? "overflow-x-auto scroll-snap-x scroll-snap-mandatory px-2 sm:px-0" : ""
          }`}
        >
          {items.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className={`snap-start bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden flex flex-col 
                w-[85vw] sm:w-[360px] md:w-[400px] lg:w-[420px] xl:w-[460px] ${
                  items.length > 1 ? "flex-shrink-0" : ""
                }`}
            >
              {/* Image */}
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

              {/* Details */}
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
                    <UKGlossyButton className="bg-orange-500 text-white px-3 py-2 rounded-full hover:bg-orange-600 transition">
                      Try a free Class
                    </UKGlossyButton>
                  </Link>

                  <UKGlossyButton
                    as="a"
                    href={`https://wa.me/917974695618?text=${encodeURIComponent(
                      `Hi, I am interested in the ${course.title} course. Can you share more details?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 rounded-full transition"
                  >
                    Download Brochure
                  </UKGlossyButton>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
