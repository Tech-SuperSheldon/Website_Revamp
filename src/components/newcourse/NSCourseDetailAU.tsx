"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { coursesData, Course } from "@/lib/course-data-au";
import { ArrowLeft, CheckCircle, Trophy, FileText, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

import NSCourseSidebar from "./NSCourseSidebar";
import NSCourseModules from "./NSCourseModules";
import NSCertificate from "./NSCertificate";
import NSJoinUs from "./NSJoinUs";
import NSPricing from "./NSPricing";

interface NSCourseDetailAUProps {
    courseId: string;
}

export default function NSCourseDetailAU({ courseId }: NSCourseDetailAUProps) {
  // Find the course from the data
  const allCourses: Course[] = Object.values(coursesData).flat();
  const course = allCourses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h1>
          <p className="text-gray-500">The course you&apos;re looking for doesn&apos;t exist.</p>
          <button 
            onClick={() => window.history.back()}
            className="mt-4 text-orange-600 font-semibold hover:text-orange-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen pb-20 pt-32 md:pt-40 font-sans bg-white">
      
      {/* Breadcrumbs & Title Area */}
      <div className="container mx-auto px-4 max-w-7xl mb-12">
           <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
                <span>/</span>
                <Link href="/new-courses" className="hover:text-orange-600 transition-colors">Courses</Link>
                <span>/</span>
                <span className="text-gray-900 font-medium truncate">{course.categ}</span>
                <span>/</span>
                <span className="text-orange-600 font-medium truncate">{course.title}</span>
           </div>

           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                    {course.title}
                </h1>
                <Link href="/demo">
                    <button className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/30 whitespace-nowrap">
                        Enroll as a Champ
                    </button>
                </Link>
           </div>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
             <div className="lg:col-span-4 order-1">
                <div className="sticky top-32 bg-gray-50 rounded-3xl p-8 border border-gray-100">
                    <NSCourseSidebar course={course} />
                </div>
            </div>

            <div className="lg:col-span-8 order-2 space-y-12">
                
                {/* Course Image */}
                <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-gray-100 shadow-xl border border-gray-100">
                    {course.img ? (
                      <Image
                          src={course.img}
                          alt={course.title}
                          fill
                          className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-orange-50 text-orange-200 text-2xl font-bold">
                        {course.title}
                      </div>
                    )}
                </div>

                {/* Course Benefits */}
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                    <div className="flex justify-between items-start mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Course Benefits:</h2>
                        <Trophy size={24} className="text-gray-400" />
                    </div>
                    <ul className="space-y-3">
                        {( course.benefits || [
                            "Learn key concepts from the ground up — no prior experience required.",
                            "Master problem-solving techniques for higher scores.",
                            "Understand how to approach complex questions with confidence.",
                            "Save time with smart strategies and shortcuts.",
                            "Gain practical experience with real-world Australian curriculum questions.",
                            "Track progress with regular assessments and feedback."
                        ]).map((benefit: string, idx: number) => (
                            <li key={idx} className="flex gap-3 text-gray-700 leading-relaxed">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-900 shrink-0" />
                                {benefit}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Modules, etc. */}
                <div>
                     <div className="flex justify-between items-start mb-6 px-2">
                        <h2 className="text-2xl font-bold text-gray-900">Course Modules:</h2>
                    </div>
                    <NSCourseModules chapters={course.chapters} />
                </div>
                
                <div className="pt-4">
                     <NSCertificate />
                </div>

                <NSJoinUs />

            </div>
        </div>
      </div>

    </div>
    
    <div className="container mx-auto px-4 max-w-7xl">
        <NSPricing course={course} />
    </div>
    </>
  );
}
