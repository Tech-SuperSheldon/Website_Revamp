import React from "react";
import { Course } from "@/lib/course-data-uk";
import { namedTeachers } from "@/lib/teachers-data";
import {
    BarChart,
    BookOpen,
    Clock,
    FileText,
    Award,
    Calendar
} from "lucide-react";

interface UKCourseSidebarProps {
    course: Course;
}

export default function UKCourseSidebar({ course }: UKCourseSidebarProps) {
    // Pick a teacher deterministically from the shared pool based on course id
    const teacherIndex =
        course.id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0) %
        namedTeachers.length;
    const teacher = namedTeachers[teacherIndex];

    return (
        <div className="space-y-8">
            {/* Overview Section */}
            <div>
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Overview:</h3>
                    <div className="bg-blue-500 rounded-full p-1.5 shadow-sm shadow-blue-200">
                        <Award size={16} className="text-white" />
                    </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">
                    {course.desc}
                </p>
            </div>

            <div className="h-px bg-gray-100 w-full" />

            {/* Course Details List */}
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Course Details:</h3>
                <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-sm font-medium text-gray-700">
                        <BarChart size={18} className="text-gray-900 shrink-0" />
                        <span>{course.level || "Expert"}</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-gray-700">
                        <BookOpen size={18} className="text-gray-900 shrink-0" />
                        <span>{course.chapters?.length || 10} Lessons</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-gray-700">
                        <Clock size={18} className="text-gray-900 shrink-0" />
                        <span>{course.duration || "3+ Hours"} of video content</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-gray-700">
                        <FileText size={18} className="text-gray-900 shrink-0" />
                        <span>{course.resourcesCount || 3} File resources</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-gray-700">
                        <Award size={18} className="text-gray-900 shrink-0" />
                        <span>Certificate of Completion</span>
                    </li>
                     <li className="flex items-center gap-3 text-sm font-medium text-gray-700">
                        <Calendar size={18} className="text-gray-900 shrink-0" />
                        <span>Added: {course.lastUpdated || "20/09/2025"}</span>
                    </li>
                </ul>
            </div>

            <div className="h-px bg-gray-100 w-full" />

            {/* Topics Section */}
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Topics:</h3>
                <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold">
                        {course.type}
                    </span>
                     <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold">
                        {course.categ}
                    </span>
                </div>
            </div>
        </div>
    );
}
