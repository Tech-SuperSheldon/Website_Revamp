"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const students = [
  "/student1.png",
  "/student2.png",
  "/student3.png",
];

const countries = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
];

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [country, setCountry] = useState(countries[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % students.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Attempt to auto-detect country
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const detected = countries.find((c) => c.code === data.country_calling_code);
        if (detected) setCountry(detected);
      })
      .catch((err) => console.error("Failed to detect location", err));
  }, []);

  return (
    <section className="relative w-full pt-32 pb-6 md:pt-40 md:pb-10 lg:pt-48 lg:pb-12 overflow-hidden">
      {/* Background Decor Elements - Light Theme */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-purple-50/80 blur-3xl filter opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-orange-50/80 blur-3xl filter opacity-60 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center gap-8 lg:gap-10">
        
        {/* Level 1: Title & Subtitle (Centered) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center space-y-4 max-w-5xl"
        >
          <div className="space-y-3">
             <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-7xl text-gray-900 leading-tight text-center">
              Your kid&#39;s coding journey <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-600">starts here.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-medium max-w-xl mx-auto">
               Unlock their potential with personalized 1:1 expert mentorship in Logic, Math & AI.
            </p>
          </div>
        </motion.div>

        {/* Level 2: Phone Number Form (Centered) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full max-w-md relative z-10"
        >
          <form className="relative flex items-center shadow-2xl rounded-full bg-white ring-1 ring-gray-100 p-1.5 transition-all hover:shadow-orange-100/50">
            {/* Country Code Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 pl-4 pr-3 h-12 border-r border-gray-100 hover:bg-gray-50 rounded-l-full transition-colors"
              >
                <span className="text-2xl">{country.flag}</span>
                <span className="text-sm font-semibold text-gray-700">{country.code}</span>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-16 left-0 w-56 bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden z-50 py-1">
                  {countries.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => {
                        setCountry(c);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition-colors text-left"
                    >
                      <span className="text-xl">{c.flag}</span>
                      <span className="text-sm font-medium text-gray-700">{c.name} ({c.code})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Input
              className="pl-4 h-12 text-base border-transparent focus:border-transparent focus:ring-0 shadow-none font-medium text-gray-800 bg-transparent flex-1"
              placeholder="Phone number"
              type="tel"
            />
            <div className="">
              <Link href="/try-class">
                 <Button variant="gradient" size="sm" className="h-12 rounded-full px-8 text-sm font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40">
                  Book Free Class
                </Button>
              </Link>
            </div>
          </form>
           <p className="text-xs text-gray-400 mt-3 text-center font-medium">Join 10,000+ happy learners today!</p>
           
           {/* Accreditation / Trusted By Section */}
           <div className="mt-8 flex flex-col items-center gap-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Trusted by Parents & Schools</p>
              <div className="flex items-center gap-8 opacity-90 grayscale hover:grayscale-0 transition-all duration-300">
                <div className="relative h-10 w-28">
                  <Image src="/trustpilot.png" alt="Trustpilot" fill className="object-contain" />
                </div>
                <div className="relative h-10 w-28">
                  <Image src="/googlev2.png" alt="Google Reviews" fill className="object-contain" />
                </div>
                <div className="relative h-12 w-28">
                  <Image src="/Stem.png" alt="STEM Accredited" fill className="object-contain" />
                </div>
              </div>
           </div>
        </motion.div>

        {/* Level 3: Split Visuals (Slider Left, Video Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center w-full max-w-6xl mt-0 lg:-mt-12">
            
            {/* Left: Student Slider (Larger, Moved Left) */}
            <div className="relative w-full aspect-[4/5] max-w-[320px] lg:max-w-[420px] mx-auto lg:mx-0 lg:mr-auto flex justify-center lg:block lg:-translate-x-48 lg:-translate-y-16">
               <div className="relative w-full h-full">
                 <AnimatePresence mode="popLayout">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-[2.5rem] overflow-hidden"
                  >
                    <Image
                      src={students[currentImageIndex]}
                      alt="Happy student coding"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Teacher Badge */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 lg:-right-12 bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-xl z-40 flex items-center gap-4 border border-white/50"
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-purple-100">
                    <Image src="/teacher.png" alt="Teacher" fill className="object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-900 leading-tight">Expert Teachers</span>
                    <span className="text-[10px] text-purple-600 font-bold uppercase tracking-wide leading-tight">Stanford Alumni</span>
                  </div>
                </motion.div>
               </div>
            </div>

            {/* Right: Video Player (Smaller, Moved Right) */}
            <div className="relative flex items-center justify-center lg:justify-start lg:ml-auto lg:translate-x-12 lg:-translate-y-24">
               <motion.div
                 animate={{ y: [0, 10, 0] }}
                 transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                 className="relative z-10 w-[220px] lg:w-[240px] aspect-[9/18] bg-gray-900 rounded-[2.5rem] border-[8px] border-gray-900 shadow-2xl overflow-hidden"
               >
               <div className="relative w-full h-full bg-slate-800">
                  <video 
                    src="/newsite/pythonvid.mp4" 
                    className="w-full h-full object-cover"
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    controls={false}
                  />
                   {/* Home Indicator */}
                   <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-1/3 h-1.5 bg-white/30 rounded-full" />
               </div>
               </motion.div>
                
                {/* Decorative Elements around phone */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-purple-500/20 blur-[80px] rounded-full" />
            </div>

        </div>
      </div>
    </section>
  );
}

