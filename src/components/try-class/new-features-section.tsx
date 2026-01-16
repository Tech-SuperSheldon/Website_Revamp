"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  BarChart,
  BookOpen,
  Calendar,
  CheckCircle,
  GraduationCap,
  Target,
  ArrowRight
} from "lucide-react";
import { useRef } from "react";

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
      "Fully aligned with the UK National Curriculum. We cover KS1, KS2, KS3, GCSEs, and 11+ preparation for English and Maths.",
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

export function NewFeaturesSection() {
  return (
    <section className="w-full pt-8 md:pt-12 pb-8 md:pb-12 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Left Column - Sticky Content */}
          <div className="lg:w-1/2 lg:sticky lg:top-32 lg:self-start h-fit mb-6 md:mb-8 lg:mb-0">
             <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false }}
                className="text-center lg:text-left"
             >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-slate-600 text-sm font-medium mb-6">
                   <span className="text-yellow-500">★</span> Top Features
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  Unleashing Potential Through <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300">
                    Trusted Expertise
                  </span>
                </h2>
                
                <p className="text-slate-500 text-lg leading-relaxed mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0 text-center lg:text-left text-justify">
                  Unlock the full potential of your child&apos;s academic journey with our top-rated features, 
                  designed for seamless learning and proven success.
                </p>

                <div className="space-y-3 md:space-y-4">
                  {features.slice(0, 4).map((f, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      viewport={{ once: false }}
                      className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-default group"
                    >
                      <f.icon className="w-5 h-5 text-slate-400 group-hover:text-purple-600 transition-colors" />
                      <span className="text-slate-600 font-medium group-hover:text-slate-900 transition-colors">
                        {f.title}
                      </span>
                    </motion.div>
                  ))}
                </div>
             </motion.div>
          </div>

          {/* Right Column - Scrolling Cards */}
          <div className="lg:w-1/2 space-y-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: typeof features[0], index: number }) {
  const ref = useRef(null);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: false, margin: "-100px" }}
      className="p-8 rounded-[2rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all hover:-translate-y-1 group"
    >
      <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 text-xl group-hover:scale-110 transition-transform duration-300`}>
        <feature.icon className="w-7 h-7" />
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 mb-3">
        {feature.title}
      </h3>
      
      <p className="text-slate-500 leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}
