"use client";

import { motion } from "framer-motion";
import { CheckCircle, Download, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function NewEbookSection() {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const benefits = [
    "Age-appropriate learning strategies",
    "How to spot if your child needs extra support",
    "Tips for supporting homework without stress",
    "UK curriculum breakdown by year group",
    "Exam preparation techniques that work",
  ];

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate download
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }
  };

  return (
    <section className="w-full py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-12">
          
          {/* Left Content */}
          <div className="w-full lg:w-auto max-w-xl space-y-8 flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: false, margin: "-100px" }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-slate-900">
                Start Building A <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500">
                  Smarter Future!
                </span>
              </h2>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
                Join thousands of parents using our comprehensive guide to help their children save time, 
                study confidently, and manage their academic journey — all in one place.
              </p>
            </motion.div>

            {/* Feature List */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
               viewport={{ once: false, margin: "-100px" }}
               className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4"
            >
                {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm md:text-base text-slate-700">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                        <span>{benefit}</span>
                    </div>
                ))}
            </motion.div>

            {/* CTA Form */}
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
               viewport={{ once: false, margin: "-100px" }}
               className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mt-8"
            >
                {!isSuccess ? (
                    <form onSubmit={handleDownload} className="flex flex-col sm:flex-row gap-4 w-full">
                         <div className="relative flex-1">
                            <input 
                                type="email" 
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-14 pl-6 pr-4 rounded-full bg-slate-100 border border-slate-200 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                required
                            />
                        </div>
                        <button 
                            type="submit"
                            className="h-14 px-8 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 hover:opacity-90 text-white font-bold text-lg transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                            Get Guide 
                            <ArrowRight className="w-5 h-5 transform -rotate-45" />
                        </button>
                    </form>
                ) : (
                    <div className="w-full p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 flex items-center justify-center gap-2 font-medium">
                        <CheckCircle className="w-5 h-5" />
                        Check your inbox! Guide sent to {email}
                    </div>
                )}
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: false, margin: "-100px" }}
            className="w-full lg:w-auto relative flex justify-center"
          >
             
             <div className="relative w-[300px] md:w-[400px] lg:w-[450px] aspect-[9/16]">
                 <Image
                    src="/removedphoneinhand.png"
                    alt="Phone showing app"
                    fill
                    className="object-contain z-10"
                 />
                 {/* Left Blur Overlay */}
                 <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none backdrop-blur-[2px]" />
                 {/* Bottom Blur Overlay */}
                 <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent z-20 pointer-events-none backdrop-blur-[2px]" />
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
