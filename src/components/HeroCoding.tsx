"use client";

// 1:1 replica of hero-web/new-supersheldon-website src/components/hero.tsx
// (Tailwind v4 `bg-linear-to-r` translated to v3 `bg-gradient-to-r`; assets copied to /public;
//  CTA link points to the valid /demo route.)

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const students = [
  "/student-1-trim.png",
  "/student-2-trim.png",
  "/student-3-trim.png",
];

export function HeroCoding() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Mirrors the live hero form: validate the phone client-side, then route to /demo.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^\d{10}$/.test(phone)) {
      setError("");
      router.push("/demo");
    } else {
      setError("Please enter a valid phone number");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % students.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-white text-black pt-32 pb-12 md:pt-36 md:pb-20 lg:pt-40 lg:pb-24">
      {/* Background Decor Elements - Light Theme */}
      <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-purple-50/80 blur-3xl filter" />
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-orange-50/80 blur-3xl filter" />

      <div className="container mx-auto px-4 md:px-6 flex flex-col gap-12 lg:gap-20">

        {/* Top Section: Centered Heading & Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl xl:text-7xl/none text-gray-900">
            Your kid&#39;s coding <br className="hidden sm:block" />
            journey <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-600">starts here.</span>
          </h1>

          <div className="w-full max-w-md relative z-10">
            <form onSubmit={handleSubmit} className="relative flex items-center shadow-lg rounded-full bg-white">
              <div className="absolute left-4 flex items-center gap-2 border-r pr-3 border-gray-200">
                <span className="text-base font-medium text-gray-700">🇮🇳 +91</span>
              </div>
              <Input
                className="pr-36 pl-20 h-14 text-base border-gray-100 hover:border-gray-200 focus:border-purple-300 transition-all font-medium text-gray-800"
                placeholder="Your phone number"
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div className="absolute right-1.5 top-1.5 bottom-1.5">
                <Button type="submit" variant="gradient" className="h-full rounded-full px-8 text-base font-semibold shadow-md">
                  Try a class
                </Button>
              </div>
            </form>
            {error && <p className="mt-2 text-sm text-red-500 text-left pl-4">{error}</p>}
          </div>
        </motion.div>

        {/* Bottom Section: Visuals Split */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full max-w-6xl mx-auto">

            {/* Left: Student Slider - Clean, No Border.
                Images are trimmed to the child (~517:1066), so the frame matches that ratio
                and the child fills the box with no empty margin. */}
            <div className="relative w-full aspect-[517/1066] max-w-[240px] mx-auto">
               {/* initial={false} so the first image renders fully visible immediately
                   (the enter opacity animation can fail to fire on first mount in this
                   framer-motion version, leaving the slide stuck at opacity 0). */}
               <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }} // Slide out to right
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src={students[currentImageIndex]}
                    alt="Happy student coding"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  {/* Subtle Gradient Overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Teacher & Phone (grouped so the badge hugs the phone) */}
            <div className="relative h-full min-h-[400px] w-full flex items-center justify-center">
               <div className="relative">
                 {/* Teacher Badge - floats off the phone's top-left corner */}
                 <motion.div
                   animate={{ y: [0, -15, 0] }}
                   transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                   className="absolute top-8 -left-12 sm:-left-20 bg-white p-3 rounded-2xl shadow-xl z-20 flex items-center gap-3 max-w-[200px] border border-gray-100"
                 >
                   <div className="relative w-12 h-12 rounded-full overflow-hidden border border-purple-100">
                     <Image src="/hero-teacher.png" alt="Teacher" fill className="object-cover" />
                   </div>
                   <div className="flex flex-col">
                     <span className="text-xs font-bold text-gray-800">Expert Teachers</span>
                     <span className="text-[10px] text-purple-600 font-medium">Stanford Alumni</span>
                   </div>
                 </motion.div>

                 {/* Phone Mockup - Playing Video (Smaller) */}
                 <motion.div
                   animate={{ y: [0, 10, 0] }}
                   transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                   className="relative z-10 w-[200px] sm:w-[240px] aspect-[9/18] bg-gray-900 rounded-[2.5rem] border-[6px] border-gray-900 shadow-2xl overflow-hidden"
                 >
                   <div className="relative w-full h-full bg-slate-800">
                      <Image src="/app-mockup.png" alt="App Mockup" fill className="object-cover opacity-90" />
                       {/* Play Button Overlay to simulate video */}
                       <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                             <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                          </div>
                       </div>
                   </div>
                 </motion.div>
               </div>
            </div>

        </div>
      </div>
    </section>
  );
}
