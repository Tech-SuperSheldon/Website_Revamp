"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  BookOpen,
  Calendar,
  CheckCircle,
  GraduationCap,
  Target,
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    color: "bg-blue-100 text-blue-600",
    title: "DBS-Checked Expert Tutors",
    description:
      "All our tutors are qualified teachers or subject specialists with enhanced DBS checks. We match the right tutor to your child's learning style.",
  },
  {
    icon: Target,
    color: "bg-purple-100 text-purple-600",
    title: "Curriculum-Aligned Learning",
    description:
      "Aligned with the Australian Curriculum across English, Mathematics, and Science. We support NAPLAN, ICAS, Selective School and Scholarship entry, and HSC pathways, ensuring students stay on track wherever they study.",
  },
  {
    icon: Calendar,
    color: "bg-green-100 text-green-600",
    title: "Flexible Scheduling",
    description:
      "Online and in-person options available. Book sessions that fit your family's schedule, with no long-term contracts required.",
  },
  {
    icon: BarChart,
    color: "bg-orange-100 text-orange-600",
    title: "Progress Tracking",
    description:
      "Regular progress reports and parent updates. See exactly how your child is improving with detailed assessments and feedback.",
  },
  {
    icon: BookOpen,
    color: "bg-pink-100 text-pink-600",
    title: "Personalised Learning Plans",
    description:
      "Every child learns differently. We create tailored lesson plans that address your child's specific strengths and areas for improvement.",
  },
  {
    icon: CheckCircle,
    color: "bg-teal-100 text-teal-600",
    title: "Proven Results",
    description:
      "98% of our students improve by at least one grade level within 3 months. We focus on building both skills and confidence.",
  },
];

export function FeaturesSection() {
  return (
    <section className="w-full py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-block bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          Why Parents Trust Apollo
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">
          The UK&apos;s Most Trusted Tutoring Experts
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-16">
          With over 15 years of experience helping UK students excel, we understand what
          it takes to achieve academic success.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: false, margin: "-100px" }}
              className="p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow bg-white"
            >
              <div
                className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-6`}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
