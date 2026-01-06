"use client";

import { CheckCircle, Download } from "lucide-react";
import { motion } from "framer-motion";

export function EbookSection() {
  const benefits = [
    "Age-appropriate learning strategies for English and Maths",
    "How to spot if your child needs extra support",
    "Tips for supporting homework without the stress",
    "UK curriculum breakdown by year group",
    "Exam preparation techniques that work",
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-br from-orange-500 to-purple-700 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Left Image Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 relative"
        >
          {/* Badge */}
          <div className="absolute -top-6 -right-6 z-20">
            <div className="bg-yellow-400 text-yellow-900 font-bold px-4 py-2 rounded-lg rotate-12 shadow-lg text-sm border-2 border-yellow-200">
              100% FREE
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="bg-white rounded-2xl p-4 shadow-2xl skew-y-3 transform hover:skew-y-0 transition-transform duration-500">
            <div className="aspect-[4/3] bg-slate-100 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200" />
              <div className="text-slate-400 font-medium">Book Cover Preview</div>
            </div>
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-white/20 blur-3xl -z-10 rounded-full scale-110" />
        </motion.div>

        {/* Right Content Side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 text-white"
        >
          <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium mb-6">
            Free Resource
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Free eBook: The Parent&apos;s Guide to Academic Success
          </h2>
          <p className="text-orange-50 mb-8 leading-relaxed">
            Download our comprehensive guide packed with expert advice to help your
            child excel in English and Maths.
          </p>

          <ul className="space-y-4 mb-8">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-orange-200 shrink-0 mt-0.5" />
                <span className="text-orange-50 text-sm md:text-base">{benefit}</span>
              </li>
            ))}
          </ul>

          {/* Form */}
          <div className="bg-white p-2 rounded-xl flex flex-col sm:flex-row gap-2 shadow-lg max-w-md">
            <input
              type="email"
              placeholder="Enter your email to download"
              className="flex-1 px-4 py-3 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-transparent"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
          <p className="text-xs text-orange-100 mt-3 ml-1">
            We respect your privacy. No spam, unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
