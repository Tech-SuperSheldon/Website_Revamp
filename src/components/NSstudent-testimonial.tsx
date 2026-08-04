"use client";

import React, { useState, useEffect, useRef } from "react";

import { motion, AnimatePresence, useInView, animate } from "framer-motion";
// import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// Data copied from StudentTestimonial.jsx
const testimonials = [
  {
    text: " My name's Alex. I'm from Melbourne. I joined Super Sheldon around two months, and really happy with the teacher, kind and pensive, and explain me maths and English. I understand, and I am really happy now. Thank you.",
    name: "— Alex, Year 4, Australian Student", // Trimmed trailing space
    image: "/k4b.webp",
  },
  {
    text:
      "I am Divya, mother of Kiaan. He has had the best Math classes at SuperSheldon — the progress and confidence he has gained are amazing!",
    name: "— Mrs. Divya",
    image: "/k1b.webp",
  },
  {
    text:
      "I am Riya, mother of Ananya in Year 5. SuperSheldon's Math Classes have been outstanding - Ananya truly Enjoys learning and has shown great improvement.",
    name: "— Mrs. Riya",
    image: "/k2g.webp", // Corrected path based on previous file content
  },
  
];

const Counter = ({ from, to, suffix, refreshKey }: { from: number; to: number; suffix: string; refreshKey?: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: false, margin: "-50px" });

  useEffect(() => {
    const node = nodeRef.current;
    if (node && inView) {
      const controls = animate(from, to, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = Math.floor(value) + suffix;
        },
      });
      return () => controls.stop();
    }
  }, [from, to, suffix, inView, refreshKey]);

  return <span ref={nodeRef}>{from}{suffix}</span>;
};

export function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

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
      setRefreshKey((prev) => prev + 1);
    }, 10000);

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
    <section className="py-4 md:py-6 lg:pt-0 overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch justify-center max-w-[95rem] mx-auto min-h-[400px] lg:h-[300px]">
          
          {/* Left Card: Stats (Transparent Theme) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="relative w-full lg:w-[15%] flex flex-col justify-center shrink-0 group h-full"
          >
            {/* Stats Content - Horizontal/Grid for sleekness */}
             <div className="relative inset-0 flex flex-col justify-center z-10 h-full">
                <div className="grid grid-cols-3 lg:grid-cols-1 gap-2 md:gap-6 lg:gap-8 text-center lg:text-left">
                     <div>
                        <h3 className="text-3xl md:text-5xl lg:text-7xl font-rowdies font-black tracking-tighter text-[#e87f1e]">
                            <Counter key={`learners-${refreshKey}`} from={0} to={10} suffix="K+" refreshKey={refreshKey} />
                        </h3>
                        <p className="text-[10px] md:text-sm text-gray-900 font-bold uppercase tracking-widest mt-1 lg:mt-0">Learners</p>
                    </div>
                     <div>
                        <h3 className="text-3xl md:text-5xl lg:text-7xl font-rowdies font-black tracking-tighter text-[#e87f1e]">
                            <Counter key={`countries-${refreshKey}`} from={0} to={10} suffix="+" refreshKey={refreshKey} />
                        </h3>
                        <p className="text-[10px] md:text-sm text-gray-900 font-bold uppercase tracking-widest mt-1 lg:mt-0">Countries</p>
                    </div>
                     <div>
                        <h3 className="text-3xl md:text-5xl lg:text-7xl font-rowdies font-black tracking-tighter text-[#e87f1e]">
                            <Counter key={`success-${refreshKey}`} from={0} to={98} suffix="%" refreshKey={refreshKey} />
                        </h3>
                        <p className="text-[10px] md:text-sm text-gray-900 font-bold uppercase tracking-widest mt-1 lg:mt-0">Success Rate</p>
                    </div>
                </div>
             </div>
          </motion.div>

          {/* Right Card: Testimonial Slider (Modern Theme) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full lg:flex-1 rounded-[2rem] flex flex-col md:flex-row items-center bg-transparent group border border-gray-100 overflow-hidden"
          >
              {/* Background Image - Cozy Study Room */}
              <Image
                src="/cozy_study_bg.webp"
                alt="Cozy Study Background"
                fill
                className="object-cover absolute inset-0 z-0 opacity-100 blur-[2px]"
              />
              {/* White Overlay for readability */}
              <div className="absolute inset-0 bg-white/80 z-0" />
              
              {/* Internal Grid for Content */}
                 <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center h-full pt-6 md:pt-0 relative z-10">
                     
                     {/* Text Content */}
                     <div className="flex flex-col justify-center space-y-4 relative h-full py-4 md:py-0">
                        <AnimatePresence initial={false} mode="wait" custom={direction}>
                             <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="space-y-4 px-6 md:px-8"
                             >
                                <blockquote className="text-lg md:text-xl font-medium text-gray-900 leading-relaxed font-serif">
                                    &ldquo;{testimonials[currentIndex].text}&rdquo;
                                </blockquote>
                                
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900">{testimonials[currentIndex].name.replace('— ', '')}</h4>
                                    <p className="text-base text-gray-500">Student / Parent</p>
                                </div>
                             </motion.div>
                        </AnimatePresence>
                     </div>

                     {/* Image Side */}
                     <div className="relative h-[250px] md:h-full w-full rounded-2xl md:mt-0 overflow-hidden">
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
                                    className="object-contain object-top" // Changed to object-top
                                />
                            </motion.div>
                         </AnimatePresence>
                     </div>
                 </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
