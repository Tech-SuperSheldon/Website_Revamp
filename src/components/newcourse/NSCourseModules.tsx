"use client";

import React, { useState } from "react";
import { Chapter } from "@/lib/course-data-au";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NSCourseModulesProps {
    chapters: Chapter[];
}

export default function NSCourseModules({ chapters }: NSCourseModulesProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!chapters || chapters.length === 0) {
        return (
            <div className="text-center py-12 border border-dashed border-gray-200 rounded-xl">
                 <p className="text-gray-400 font-medium">Curriculum details coming soon.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {chapters.map((chapter, index) => (
                <div 
                    key={index} 
                    className="border border-gray-200 bg-gray-50 rounded-2xl overflow-hidden mb-3 transition-colors hover:border-gray-300"
                >
                    <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-100/50 transition-colors"
                    >
                         <h3 className="font-bold text-gray-900">
                            Module {index + 1}: {chapter.title}
                        </h3>
                        <motion.div
                            animate={{ rotate: openIndex === index ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown size={20} className="text-gray-400" />
                        </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                        {openIndex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <div className="p-6 pt-0 border-t border-gray-100">
                                   <div className="py-4 text-gray-700 leading-relaxed text-sm">
                                         {chapter.description || "Detailed curriculum content for this module will be covered in class."}
                                   </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
