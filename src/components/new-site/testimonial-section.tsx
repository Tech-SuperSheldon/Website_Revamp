"use client";

import React, { useState } from "react";

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
    <section className="py-20 md:py-32 bg-gray-50 overflow-hidden relative">
        {/* Big Background Text */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[10rem] md:text-[15rem] font-bold text-gray-200/50 select-none -z-10 pointer-events-none whitespace-nowrap">
        Testimonial
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center max-w-7xl mx-auto h-[600px] lg:h-[500px]">
          
          {/* Left Card: Stats (Dark Theme) */}
          <div className="relative w-full lg:w-1/3 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col justify-between p-8 md:p-10 text-white shrink-0 group">
             {/* Abstract Background Image */}
            <Image
              src="/stats_bg_dark_smoke_1768056692191.png" // AI Generated Background
              alt="Background"
              fill
              className="object-cover -z-10 transition-transform duration-700 group-hover:scale-110"
            />
             {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/40 -z-10" />

            <div className="space-y-12 mt-4">
              <div>
                <h3 className="text-5xl md:text-6xl font-bold tracking-tight">26+</h3>
                <p className="text-gray-300 font-medium mt-2">Finalized Projects</p>
              </div>
              
               <div>
                <h3 className="text-5xl md:text-6xl font-bold tracking-tight">98%</h3>
                <p className="text-gray-300 font-medium mt-2">Client satisfaction rate</p>
              </div>

               <div>
                <h3 className="text-5xl md:text-6xl font-bold tracking-tight">10M</h3>
                <p className="text-gray-300 font-medium mt-2">Gross Revenue</p>
              </div>
            </div>
            
            {/* Note: User asked for specific stats: 10K+ learners, 10+ countries, 98% success rate. Overriding the placeholders above. */}
             <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-10 bg-black/20 backdrop-blur-sm">
                <div className="space-y-8">
                     <div>
                        <h3 className="text-5xl md:text-6xl font-bold tracking-tight">10K+</h3>
                        <p className="text-gray-200 font-medium mt-1">Learners</p>
                    </div>
                     <div>
                        <h3 className="text-5xl md:text-6xl font-bold tracking-tight">10+</h3>
                        <p className="text-gray-200 font-medium mt-1">Countries</p>
                    </div>
                     <div>
                        <h3 className="text-5xl md:text-6xl font-bold tracking-tight">98%</h3>
                        <p className="text-gray-200 font-medium mt-1">Success Rate</p>
                    </div>
                </div>
             </div>
          </div>

          {/* Right Card: Testimonial Slider (Light Theme) */}
          <div className="relative w-full lg:w-2/3 rounded-[2.5rem] overflow-hidden shadow-2xl flex items-center bg-white group">
              {/* Background Image */}
             <Image
                src="/testimonial_bg_soft_gradient_1768056714575.png" // AI Generated Background
                alt="Background"
                fill
                className="object-cover -z-10 opacity-50"
             />

             <div className="relative w-full h-full flex items-center p-8 md:p-12 lg:p-16">
                 {/* Internal Grid for Content */}
                 <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                     
                     {/* Text Content */}
                     <div className="flex flex-col justify-center space-y-6 relative h-full">
                         {/* Counter */}
                         <div className="text-sm font-medium text-gray-500 mb-2">
                             {String(currentIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                         </div>

                        <AnimatePresence initial={false} mode="wait" custom={direction}>
                             <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="space-y-6"
                             >
                                <blockquote className="text-xl md:text-2xl font-semibold text-gray-900 leading-relaxed font-serif">
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
                     <div className="relative h-full w-full min-h-[200px] md:min-h-full rounded-2xl overflow-hidden shadow-inner">
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
                                className="absolute inset-0"
                            >
                                <Image
                                    src={testimonials[currentIndex].image}
                                    alt="Student"
                                    fill
                                    className="object-cover object-center"
                                />
                                {/* Optional overlay/gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                            </motion.div>
                         </AnimatePresence>
                     </div>
                 </div>

                 {/* Navigation Buttons */}
                 <div className="absolute bottom-8 right-8 flex gap-3 z-20">
                     <button 
                        type="button"
                        onClick={prevTestimonial}
                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-gray-200/20 hover:bg-black/5 flex items-center justify-center transition-all shadow-sm hover:scale-110 active:scale-95 text-gray-700"
                    >
                         <ChevronLeft className="w-5 h-5" />
                     </button>
                     <button 
                        type="button"
                        onClick={nextTestimonial}
                        className="w-12 h-12 rounded-full bg-black/90 text-white backdrop-blur-md border border-black/10 hover:bg-black flex items-center justify-center transition-all shadow-lg hover:shadow-xl hover:scale-110 active:scale-95"
                    >
                         <ChevronRight className="w-5 h-5" />
                     </button>
                 </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
