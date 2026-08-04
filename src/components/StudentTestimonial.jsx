
"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const testimonials = [
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
    image: "/k2g.webp",
  },
  {
    text: " My name's Alex. I'm from Melbourne. I joined Super Sheldon around two months, and really happy with the teacher, kind and pensive, and explain me maths and English. I understand, and I am really happy now. Thank you.",
    name: "— Alex, Year 4, Australian Student ",
    image: "/k4b.webp",
  },
];

// Motion variants
const variants = {
  enter: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
};

export default function StudentTestimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  // Image dimensions
  const IMG_W = 280;


  // Auto-slide
  useEffect(() => {
    if (isPaused) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, isPaused]);

  const handleDotClick = useCallback(
    (index) => {
      if (index === currentIndex) return;
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [currentIndex]
  );

  const handleDragEnd = (_, info) => {
    const threshold = Math.min(80, window.innerWidth * 0.1);
    if (info.offset.x > threshold) {
      setDirection(-1);
      setCurrentIndex((prev) =>
        prev === 0 ? testimonials.length - 1 : prev - 1
      );
    } else if (info.offset.x < -threshold) {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }
  };

  return (
    <div className="w-full h-full">
      <div
        className="mt-4 relative flex flex-col items-center justify-center py-10 overflow-visible"
        role="region"
        aria-roledescription="carousel"
        aria-label="Student testimonials carousel"
      >
        <div
          className="relative w-11/12 max-w-5xl rounded-2xl z-10 overflow-visible"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragMomentum={false}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {/* Clean minimal card */}
              <motion.div
                className="relative flex-shrink-0 w-full mx-auto px-4 md:px-8 py-6 md:py-8 overflow-visible"
              >
                {/* Content row */}
                <div className="relative flex flex-col md:flex-row items-center md:items-center justify-between gap-8 md:gap-12">
                  {/* Text column - Less bulky */}
                  <div className="flex-1 text-center md:text-left relative z-10 max-w-2xl">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                      What Our Students Say
                    </h2>

                    <blockquote
                      className="text-base md:text-lg text-gray-700 leading-relaxed italic font-medium"
                      aria-live="polite"
                    >
                      "{testimonials[currentIndex].text}"
                    </blockquote>

                    <cite className="mt-4 block font-semibold text-gray-900 not-italic">
                      {testimonials[currentIndex].name}
                    </cite>
                  </div>

                 

                  {/* Image */}
                  <div className="flex-shrink-0">
                    <div className="">
                      <Image
                        src={testimonials[currentIndex].image}
                        alt={`Photo of ${testimonials[
                          currentIndex
                        ].name.replace("— ", "")}`}
                        width={IMG_W}
                        height={240}
                        className="object-contain rounded-2xl relative z-20"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div
          className="flex mt-2 p-2 space-x-3 cursor-pointer z-10"
          role="tablist"
          aria-label="Testimonial navigation"
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              aria-selected={currentIndex === index}
              aria-label={`Go to testimonial ${index + 1}`}
              role="tab"
              className={`h-2 rounded-full transition-all duration-500 ${
                currentIndex === index
                  ? "w-6 bg-orange-500"
                  : "w-4 bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Floating Icons */}
        <div className="absolute bottom-6 left-8 -translate-x-1/3 animate-float1 z-10 rotate-[45]">
          <img src="/icons/alarm.png" alt="globe" width={60} height={60} />
        </div>
        <div className="absolute bottom-8 right-6 animate-float2 z-10">
          <img src="/icons/globe.png" alt="" width={60} height={60} />
        </div>
        <div className="absolute top-4 left-12 animate-float2 z-10">
          <img src="/icons/ruler.png" alt="" width={60} height={60} />
        </div>
        <div className="absolute top-4 right-12 animate-float1 z-10">
          <img src="/icons/crayons.png" alt="" width={60} height={60} />
        </div>

        <style jsx>{`
          @keyframes float1 {
            0%,
            100% {
              transform: translateY(0) rotate(-45deg);
            }
            50% {
              transform: translateY(-12px) rotate(-45deg);
            }
          }
          @keyframes float2 {
            0%,
            100% {
              transform: translateX(0) rotate(45deg);
            }
            50% {
              transform: translateX(12px) rotate(45deg);
            }
          }
          @keyframes float3 {
            0%,
            100% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(-10px) translateX(10px);
            }
          }
          .animate-float1 {
            animation: float1 4s ease-in-out infinite;
          }
          .animate-float2 {
            animation: float2 5s ease-in-out infinite;
          }
          .animate-float3 {
            animation: float3 6s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  );
}
