"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { coursesData, Course } from "@/lib/course-data-au";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Check } from "lucide-react";

export default function NSCourseMainAU() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const INITIAL_COUNT = 6;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const categories = ["All", "Foundational", "Advanced", "Mastery", "Elite"];

  // Flatten courses data to include the year/grade level
  const allCourses = useMemo(() => {
    return Object.entries(coursesData).flatMap(([year, courses]) =>
      courses.map((course) => ({
        ...course,
        year, // Attach year/level to the course object for filtering
      }))
    );
  }, []);

  // Get all unique levels for the filter sidebar
  const years = useMemo(() => Object.keys(coursesData), []);

  const filteredCourses = useMemo(() => {
    return allCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.desc.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesYear =
        selectedYears.length === 0 || selectedYears.includes(course.year);

      const matchesCategory =
        selectedCategory === "All" || course.categ === selectedCategory;

      return matchesSearch && matchesYear && matchesCategory;
    });
  }, [allCourses, searchQuery, selectedYears, selectedCategory]);

  return (
    <div className="min-h-screen text-gray-900 font-sans pt-32 md:pt-40 pb-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <header className="mb-8 text-center">
          <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="flex flex-col items-center"
          >
             {/* Courses Pill */}
             <span className="text-orange-600 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-4 border border-orange-200">
                Australian Programs
             </span>

             <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-gray-900 tracking-tight">
                Explore Our <span className="text-orange-600">Australian Courses</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-8">
                Personalised 1:1 mentorship for Selective School, NAPLAN, and K–12 Maths &amp; English excellence.
            </p>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-4">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => { setSelectedCategory(cat); setVisibleCount(INITIAL_COUNT); }}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                            selectedCategory === cat
                                ? "bg-orange-600 text-white shadow-lg shadow-orange-500/30"
                                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-orange-200"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
          </motion.div>
        </header>

        {/* Controls Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 w-full">
            
            {/* Search Bar - Left Side */}
            <div className="relative group w-full md:max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(INITIAL_COUNT); }}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-base shadow-sm"
                />
            </div>

            {/* Filter Dropdown - Right Side */}
            <div className="relative w-full md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                     <Filter className="h-4 w-4 text-orange-500" />
                </div>
                <select
                    value={selectedYears[0] || ""}
                    onChange={(e) => {
                        const val = e.target.value;
                        setSelectedYears(val ? [val] : []);
                    }}
                    className="w-full appearance-none border border-gray-200 text-gray-900 py-3 pl-10 pr-8 rounded-xl leading-tight focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all cursor-pointer font-medium shadow-sm"
                >
                    <option value="">All Categories</option>
                    {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                </div>
            </div>
        </div>

        {/* Results Count */}
        <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8 text-sm text-gray-500 font-medium"
        >
            Showing {Math.min(visibleCount, filteredCourses.length)} of {filteredCourses.length} {filteredCourses.length === 1 ? 'program' : 'programs'}
        </motion.div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
                {filteredCourses.slice(0, visibleCount).map((course) => (
                        <motion.div
                        key={`${course.year}-${course.id}`}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        >
                        <Link href={`/new-courses/${course.id}`} className="group cursor-pointer block h-full">
                            <div className="rounded-[2rem] overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 bg-white">
                                
                                {/* Image Container */}
                                <div className="relative aspect-video w-full overflow-hidden bg-gray-100 rounded-t-[2rem]">
                                    {course.img ? (
                                      <Image
                                          src={course.img}
                                          alt={course.title}
                                          fill
                                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center bg-orange-50 text-orange-200 uppercase font-bold tracking-widest">
                                        {course.type}
                                      </div>
                                    )}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                                    
                                    {/* Type Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-orange-600 shadow-sm uppercase tracking-wide">
                                            {course.type}
                                        </span>
                                    </div>

                                    {/* Year Badge */}
                                    <div className="absolute top-4 right-4">
                                            <span className="bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm uppercase tracking-wide">
                                            {course.year}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 md:p-8 flex flex-col grow">
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2 mb-3">
                                        {course.title}
                                    </h3>
                                    
                                    <p className="text-gray-500 text-sm line-clamp-3 mb-6 grow leading-relaxed">
                                        {course.desc}
                                    </p>

                                    <div className="mt-auto">
                                        <button className="w-full py-3 rounded-xl bg-gray-50 text-gray-900 font-bold hover:bg-orange-500 hover:text-white transition-all duration-300 mb-5 flex items-center justify-center gap-2 group/btn">
                                            Explore Course
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover/btn:translate-x-1 transition-transform">
                                                <path d="M5 12h14" />
                                                <path d="m12 5 7 7-7 7" />
                                            </svg>
                                        </button>

                                        <div className="flex items-center justify-between text-xs text-gray-400 font-bold border-t border-gray-100 pt-5 uppercase tracking-wider">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                                <span>{course.topics} Units</span>
                                            </div>
                                            <span className="text-gray-300">•</span>
                                            <span>{course.duration}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        </motion.div>
                ))}
            </AnimatePresence>
        </div>
        
        {filteredCourses.length === 0 && (
            <div className="text-center py-20">
                <p className="text-gray-400 text-lg">No courses found matching your criteria.</p>
                <button 
                    onClick={() => { setSearchQuery(""); setSelectedYears([]); setVisibleCount(INITIAL_COUNT); }} 
                    className="mt-4 text-orange-600 font-semibold hover:underline"
                >
                    Clear filters
                </button>
            </div>
        )}

        {/* View More Button */}
        {visibleCount < filteredCourses.length && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mt-12"
            >
              <button
                onClick={() => setVisibleCount((v) => v + INITIAL_COUNT)}
                className="px-10 py-4 rounded-2xl bg-orange-500 text-white font-bold text-base hover:bg-orange-600 active:scale-95 transition-all duration-200 shadow-lg shadow-orange-200 flex items-center gap-2"
              >
                View More Courses
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </motion.div>
        )}
      </div>
    </div>
  );
}
