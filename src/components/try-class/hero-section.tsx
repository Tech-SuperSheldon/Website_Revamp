"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  const benefits = [
    "Free 30-minute consultation",
    "Expert advice on English & Maths",
    "No obligation or pressure",
    "Personalised learning plan",
  ];

  return (
    <section className="w-full py-16 md:py-24 flex flex-col items-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center max-w-4xl mx-auto space-y-8"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-sm font-medium">
          <Clock className="w-4 h-4" />
          <span>Limited Availability This Month</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-slate-900 tracking-tight">
          Ready to See Your Child Thrive?
        </h1>

        {/* Subtext */}
        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
          Book a free assessment call with one of our education consultants. We&apos;ll
          discuss your child&apos;s needs and create a personalised plan for success.
        </p>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-left">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className="text-slate-700">{benefit}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="pt-4 flex flex-col items-center gap-4 w-full">
          <Link
            href="#"
            className="group w-full md:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-orange-500/20"
          >
            Book Your Free Assessment Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-sm text-slate-500">
            Trusted by 10,000+ UK families • Response within 24 hours
          </p>
        </div>
      </motion.div>
    </section>
  );
}
