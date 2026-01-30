'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Users, ArrowRight, Download } from 'lucide-react';
import { coursesData, years } from '@/lib/course-data';

export default function NewExamCourses() {
  const [activeYear, setActiveYear] = useState('Year 5');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const items = coursesData[activeYear] || [];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Focused Exam <span className="text-orange-500">Mastery Courses</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Expertly designed courses to help your child excel in competitive exams and school assessments.
          </p>
        </div>

        {/* --- Aesthetic Tabs --- */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              onMouseEnter={() => setHoveredTab(year)}
              onMouseLeave={() => setHoveredTab(null)}
              className={`relative px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-300 ${
                activeYear === year
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <span className="relative z-10">{year}</span>
              
              {/* Active BACKGROUND indicator (Soft solid pill) */}
               {activeYear === year && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 bg-orange-50 rounded-full z-0"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
               )}

              {/* Hover LOADING BAR indicator (Thin line below) */}
              {hoveredTab === year && activeYear !== year && (
                <motion.div
                  layoutId="hoverTabLine"
                  className="absolute bottom-2 left-4 right-4 h-[2px] bg-orange-300 rounded-full opacity-70"
                  initial={{ width: '0%', left: '50%' }}
                  animate={{ width: 'calc(100% - 32px)', left: '16px' }}
                  exit={{ width: '0%', left: '50%' }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* --- Course Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {items.map((course) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={course.img}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  
                  {/* Floating Tag */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-orange-600 shadow-sm">
                    {course.type}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
                        {course.title}
                    </h3>
                  </div>

                  <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-grow">
                    {course.desc}
                  </p>

                  {/* Meta Details */}
                  <div className="flex items-center gap-4 text-xs font-medium text-gray-400 mb-6 pb-6 border-b border-gray-50">
                    <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg">
                        <BookOpen size={14} className="text-orange-400" />
                        <span>{course.topics} Topics</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg">
                        <Users size={14} className="text-orange-400" />
                        <span>{course.sales} Enrolled</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 mt-auto">
                    <Link href={course.path} className="flex-1">
                        <button className="w-full bg-gray-900 text-white rounded-xl py-3 text-sm font-semibold hover:bg-orange-500 transition-colors flex items-center justify-center gap-2 group/btn">
                            Book Free Class
                            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                    
                    <a 
                       href={`https://wa.me/917974695618?text=${encodeURIComponent(
                        `Hi, I am interested in the ${course.title} course. Can you share more details?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors"
                      title="Download Brochure"
                    >
                        <Download size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
