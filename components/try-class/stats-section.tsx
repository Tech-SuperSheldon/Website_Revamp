"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { TrendingUp, Medal, Users, Star } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: "2.5 Grades",
    label: "Average Improvement",
    color: "text-blue-500",
    bg: "bg-blue-50",
    shadow: "shadow-blue-200",
  },
  {
    icon: Medal,
    value: "94%",
    label: "Pass Rate for 11+ & SATs",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    shadow: "shadow-emerald-200",
  },
  {
    icon: Users,
    value: "10,000+",
    label: "Students Tutored",
    color: "text-purple-500",
    bg: "bg-purple-50",
    shadow: "shadow-purple-200",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Parent Satisfaction",
    color: "text-orange-500",
    bg: "bg-orange-50",
    shadow: "shadow-orange-200",
  },
];

export function StatsSection() {
  return (
    <section className="py-20 bg-transparent relative overflow-visible perspective-1000">
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
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
            We don&apos;t just tutor—we transform academic journeys. Here&apos;s what makes SuperSheldon different.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-[2000px]">
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
                className="bg-white rounded-3xl p-8 flex flex-col items-center text-center shadow-lg border border-slate-100 transition-all duration-300 transform-style-3d group"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl transition-transform duration-300 group-hover:scale-110",
                    stat.bg,
                    stat.color,
                    stat.shadow
                  )}
                >
                <stat.icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-slate-500 font-medium">{stat.label}</p>
                
                {/* Shine effect on hover */}
                <div className="absolute inset-0 rounded-3xl bg-linear-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
