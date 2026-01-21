"use client";

import React, { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// Data copied from StudentTestimonial.jsx
const testimonials = [
  {
    text:
      "I am Divya, mother of Kiaan. He has had the best Math classes at SuperSheldon — the progress and confidence he has gained are amazing!",
    name: "— Mrs. Divya",
    image: "/k1b.png",
  },
  {
    text:
      "I am Riya, mother of Ananya in Grade 5. SuperSheldon's Math Classes have been outstanding - Ananya truly Enjoys learning and has shown great improvement.",
    name: "— Mrs. Riya",
    image: "/k2g.png", // Corrected path based on previous file content
  },
  {
    text: " My name's Alex. I'm from Melbourne. I joined Super Sheldon around two months, and really happy with the teacher, kind and pensive, and explain me maths and English. I understand, and I am really happy now. Thank you.",
    name: "— Alex, Year 4, Australian Student", // Trimmed trailing space
    image: "/k4b.png",
  },
];

export function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Variants for slide animation
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
    })
  };

  return (
    <section className="py-12 md:py-16 bg-transparent overflow-hidden relative">
        {/* Big Background Text */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[10rem] md:text-[15rem] font-bold text-gray-100/30 select-none -z-10 pointer-events-none whitespace-nowrap">
        Testimonial
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center max-w-[95rem] mx-auto min-h-[500px] lg:h-[350px]">
          
          {/* Left Card: Stats (Black Theme) */}
          <div className="relative w-full lg:w-1/3 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col justify-between p-8 md:p-8 text-white shrink-0 group bg-black h-full">
            {/* Abstract Background Image */}
            <Image
              src="/stats_bg_dark_smoke_1768056692191.png"
              alt="Background"
              fill
              className="object-cover -z-10 opacity-40"
            />
            {/* Stats Content - Horizontal/Grid for sleekness */}
             <div className="absolute inset-0 p-8 flex flex-col justify-center z-10 bg-black/20 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6 lg:gap-8 text-center lg:text-left">
                     <div>
                        <h3 className="text-4xl md:text-5xl font-bold tracking-tight">10K+</h3>
                        <p className="text-gray-200 font-medium mt-1">Learners</p>
                    </div>
                     <div>
                        <h3 className="text-4xl md:text-5xl font-bold tracking-tight">10+</h3>
                        <p className="text-gray-200 font-medium mt-1">Countries</p>
                    </div>
                     <div>
                        <h3 className="text-4xl md:text-5xl font-bold tracking-tight">98%</h3>
                        <p className="text-gray-200 font-medium mt-1">Success Rate</p>
                    </div>
                </div>
             </div>
          </div>

          {/* Right Card: Testimonial Slider (Modern Theme) */}
          <div className="relative w-full lg:w-2/3 rounded-[2.5rem] shadow-2xl flex items-center bg-white group border border-gray-100 overflow-hidden">
              {/* Background Image - Library */}
              <Image
                src="/library_bg_final.png"
                alt="Library Background"
                fill
                className="object-cover -z-10 opacity-20"
              />
              {/* Internal Grid for Content */}
                 <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                     
                     {/* Text Content */}
                     <div className="flex flex-col justify-center space-y-6 relative h-full">
                         {/* Counter Removed */}

                        <AnimatePresence initial={false} mode="wait" custom={direction}>
                             <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="space-y-8 px-4"
                             >
                                <blockquote className="text-lg md:text-xl font-medium text-gray-900 leading-relaxed font-serif">
                                    &ldquo;{testimonials[currentIndex].text}&rdquo;
                                </blockquote>
                                
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900">{testimonials[currentIndex].name.replace('— ', '')}</h4>
                                    <p className="text-sm text-gray-500">Student / Parent</p>
                                </div>
                             </motion.div>
                        </AnimatePresence>
                     </div>

                     {/* Image Side */}
                     <div className="relative h-[300px] md:h-[115%] w-full rounded-2xl md:-mt-12">
                         <AnimatePresence initial={false} mode="wait" custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={{
                                    enter: (direction: number) => ({ opacity: 0, scale: 0.95 }),
                                    center: { opacity: 1, scale: 1 },
                                    exit: (direction: number) => ({ opacity: 0, scale: 0.95 })
                                }}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4 }}
                                className="absolute inset-x-0 bottom-0 top-0" // Using top-0 bottom-0 to fill
                            >
                                <Image
                                    src={testimonials[currentIndex].image}
                                    alt="Student"
                                    fill
                                    className="object-contain object-bottom"
                                />
                                {/* Optional overlay/gradient removed */}
                            </motion.div>
                         </AnimatePresence>
                     </div>
                 </div>

                 {/* Navigation Buttons Removed */}
          </div>

        </div>
      </div>
    </section>
  );
}
