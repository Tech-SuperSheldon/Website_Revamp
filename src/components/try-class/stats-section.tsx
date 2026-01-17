"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { FaArrowTrendUp, FaTrophy, FaUserGraduate, FaStar } from "react-icons/fa6";

const stats = [
  {
    icon: FaArrowTrendUp,
    value: "2.5 Grades",
    label: "Average Improvement",
    color: "text-blue-600",
    bg: "bg-gradient-to-br from-blue-100 to-blue-200",
    shadow: "shadow-blue-200/50",
    border: "border-blue-200",
  },
  {
    icon: FaTrophy,
    value: "94%",
    label: "Pass Rate for 11+ ,SATs & SAT/ACT",
    color: "text-emerald-600",
    bg: "bg-gradient-to-br from-emerald-100 to-emerald-200",
    shadow: "shadow-emerald-200/50",
    border: "border-emerald-200",
  },
  {
    icon: FaUserGraduate,
    value: "10,000+",
    label: "Students Tutored",
    color: "text-purple-600",
    bg: "bg-gradient-to-br from-purple-100 to-purple-200",
    shadow: "shadow-purple-200/50",
    border: "border-purple-200",
  },
  {
    icon: FaStar,
    value: "4.9/5",
    label: "Parent Satisfaction",
    color: "text-orange-600",
    bg: "bg-gradient-to-br from-orange-100 to-orange-200",
    shadow: "shadow-orange-200/50",
    border: "border-orange-200",
  },
];

export function StatsSection() {
  return (
    <section className="py-6 md:pt-8 md:pb-20 bg-transparent relative overflow-visible perspective-1000">
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-medium text-slate-600 mb-4"
          >
            <span className="text-xl">🚀</span> We Deliver Results
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900"
          >
            Results That Speak for Themselves
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600"
          >
            We don&apos;t just tutor- we transform academic journeys. Here&apos;s what makes Super Sheldon different.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 pb-6 md:pb-0 px-0 md:px-0 mx-0 md:mx-0 perspective-[2000px]">
          {stats.map((stat, index) => {
             // Calculate 3D Rotation for curved effect
             const rotateY = index === 0 ? 15 : index === 3 ? -15 : index === 1 ? 5 : -5;
             const translateZ = index === 0 || index === 3 ? 0 : 20; // Middle cards pop out slightly

             return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: 0 }}
                whileInView={{ opacity: 1, y: 0, rotateY: rotateY, z: translateZ }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100, damping: 20 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  rotateY: 0, // Flatten on hover for better readability
                  zIndex: 20,
                  boxShadow: "0 20px 40px -10px rgba(0,0,0,0.12)"
                }}
                className="bg-white rounded-3xl p-4 md:p-8 flex flex-col items-center text-center shadow-lg border border-slate-100 transition-all duration-300 transform-style-3d group min-w-0"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className={cn(
                    "w-12 h-12 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-3 md:mb-6 text-2xl md:text-4xl transition-all duration-300 group-hover:scale-110 shadow-lg border",
                    stat.bg,
                    stat.color,
                    stat.border,
                    stat.shadow
                  )}
                >
                <stat.icon className="w-6 h-6 md:w-10 md:h-10 drop-shadow-sm" />
                </div>
                <h3 className="text-xl md:text-4xl font-bold text-slate-900 mb-1 md:mb-2 tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-slate-500 font-medium text-xs md:text-base">{stat.label}</p>
                
                {/* Shine effect on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
