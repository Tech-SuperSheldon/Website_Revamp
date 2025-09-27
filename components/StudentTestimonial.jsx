





// "use client";
// import { useState, useEffect, useRef, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";

// const testimonials = [
//   {
//     text:
//       "I am Divya, mother of Kiaan. He has had the best Math classes at SuperSheldon — the progress and confidence he has gained are amazing!",
//     name: "— Mrs. Divya",
//     image: "/k1b.png",
//   },
//   {
//     text:
//       "I am Riya, mother of Ananya in Grade 5. SuperSheldon's Math Classes have been outstanding - Ananya truly Enjoys learning and has shown great improvement.",
//     name: "— Mrs. Riya",
//     image: "/k2g.png",
//   },
//   {
//     text: " SuperSheldon has really boosted my confidence in class. The teachers explain everything clearly. My grades have improved a lot this term.",
//     name: "— Liam Anderson, Year 10 Student, Australia ",
//     image: "/k3b.png",
//   },
// ];

// // Motion variants
// const variants = {
//   enter: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
//   center: { x: 0, opacity: 1 },
//   exit: (dir) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
// };

// export default function StudentTestimonial() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState(1);
//   const [isPaused, setIsPaused] = useState(false);
//   const timeoutRef = useRef(null);

//   // Image dimensions + spacer
//   const IMG_W = 280;
//   const IMG_SPACER = IMG_W + 16;

//   // Auto-slide
//   useEffect(() => {
//     if (isPaused) return;
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);

//     timeoutRef.current = setTimeout(() => {
//       setDirection(1);
//       setCurrentIndex((prev) => (prev + 1) % testimonials.length);
//     }, 5000);

//     return () => {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     };
//   }, [currentIndex, isPaused]);

//   const handleDotClick = useCallback(
//     (index) => {
//       if (index === currentIndex) return;
//       setDirection(index > currentIndex ? 1 : -1);
//       setCurrentIndex(index);
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     },
//     [currentIndex]
//   );

//   const handleDragEnd = (_, info) => {
//     const threshold = Math.min(80, window.innerWidth * 0.1);
//     if (info.offset.x > threshold) {
//       setDirection(-1);
//       setCurrentIndex((prev) =>
//         prev === 0 ? testimonials.length - 1 : prev - 1
//       );
//     } else if (info.offset.x < -threshold) {
//       setDirection(1);
//       setCurrentIndex((prev) => (prev + 1) % testimonials.length);
//     }
//   };

//   return (
//     <div className=" w-full h-full">
      
//       <div
//       className="mt-8 relative flex flex-col items-center justify-center py-20 overflow-visible"
//       role="region"
//       aria-roledescription="carousel"
//       aria-label="Student testimonials carousel"
//     >

//       <div
//         className="relative w-11/12 max-w-6xl rounded-2xl z-10 overflow-visible"
//         onMouseEnter={() => setIsPaused(true)}
//         onMouseLeave={() => setIsPaused(false)}
//         onTouchStart={() => setIsPaused(true)}
//         onTouchEnd={() => setIsPaused(false)}
//       >
//         <AnimatePresence mode="wait" custom={direction}>
//           <motion.div
//             key={currentIndex}
//             custom={direction}
//             drag="x"
//             dragConstraints={{ left: 0, right: 0 }}
//             dragMomentum={false}
//             dragElastic={0.2}
//             onDragEnd={handleDragEnd}
//             variants={variants}
//             initial="enter"
//             animate="center"
//             exit="exit"
//             transition={{ duration: 0.6, ease: "easeInOut" }}
//           >
//             {/* Orange Card + Image hover */}
//             <motion.div
//               whileHover={{ scale: 1.02 }}
//               transition={{ type: "spring", stiffness: 200 }}
//               className="relative flex-shrink-0 w-[94%] mx-auto bg-[#FB8740] px-6 md:px-12 py-10 shadow-xl rounded-2xl overflow-visible"
//             >
//               {/* Content row */}
//               <div className="relative flex items-start">
//                 {/* Text column */}
//                 <div className="flex-1 text-center md:text-left relative z-10">
//                   <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow">
//                     What Our Students Say
//                   </h2>

//                   <blockquote
//                     className="text-base md:text-lg text-white leading-relaxed italic"
//                     aria-live="polite"
//                   >
//                     "{testimonials[currentIndex].text}"
//                   </blockquote>

//                   <cite className="mt-3 block font-semibold text-white/90 not-italic">
//                     {testimonials[currentIndex].name}
//                   </cite>
//                 </div>

//                 {/* Spacer prevents text overlap */}
//                 <div
//                   aria-hidden="true"
//                   className="shrink-0"
//                   style={{ width: IMG_SPACER, height: 1 }}
//                 />
//               </div>

//               {/* Image anchored bottom-right */}
//               <div className="absolute bottom-0 right-0">
//                 <div className="drop-shadow-2xl">
//                   <Image
//                     src={testimonials[currentIndex].image}
//                     alt={`Photo of ${testimonials[currentIndex].name.replace(
//                       "— ",
//                       ""
//                     )}`}
//                     width={IMG_W}
//                     height={240}
//                     className="object-contain rounded-2xl relative z-20"
//                     priority
//                   />
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Dots */}
//       <div
//         className="flex mt-6 p-2 bg-gray-200 rounded-full shadow-md opacity-90 space-x-3 cursor-pointer z-10"
//         role="tablist"
//         aria-label="Testimonial navigation"
//       >
//         {testimonials.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => handleDotClick(index)}
//             aria-selected={currentIndex === index}
//             aria-label={`Go to testimonial ${index + 1}`}
//             role="tab"
//             className={`h-2 rounded-full transition-all duration-500 shadow-md border-2 ${
//               currentIndex === index
//                 ? "w-6 bg-white shadow-lg border-white"
//                 : "w-4 bg-white/50 shadow-sm border-white/50"
//             }`}
//           />
//         ))}
//       </div>

//           {/* Floating Icons */}

// <div className="absolute bottom-6 left-8 -translate-x-1/3 animate-float1 z-10 rotate-[45]">
//   <img src="/icons/book.png" alt="globe" width={60} height={60}  />
// </div>
// <div className="absolute bottom-8 right-6 animate-float2 z-10">
//   <img src="/icons/chalkboard.png" alt="" width={60} height={60} />
// </div>
// <div className="absolute top-4  left-12 animate-float2 z-10">
//   <img src="/icons/palette.png" alt="" width={60} height={60} />
// </div>
// <div className="absolute top-4  right-12 animate-float1 z-10">
//   <img src="/icons/Scholarcap.png" alt="" width={60} height={60} />
// </div>

// <style jsx>{`
//   @keyframes float1 {
//     0%, 100% { transform: translateY(0) rotate(-45deg); }
//     50% { transform: translateY(-12px) rotate(-45deg); }
//   }
//   @keyframes float2 {
//     0%, 100% { transform: translateX(0) rotate(45deg); }
//     50% { transform: translateX(12px) rotate(45deg); }
//   }
//   @keyframes float3 {
//     0%, 100% { transform: translateY(0) translateX(0); }
//     50% { transform: translateY(-10px) translateX(10px); }
//   }
//   .animate-float1 { animation: float1 4s ease-in-out infinite; }
//   .animate-float2 { animation: float2 5s ease-in-out infinite; }
//   .animate-float3 { animation: float3 6s ease-in-out infinite; }
// `}</style>


//     </div>
//     </div>
    
//   );
// }





"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
    image: "/k2g.png",
  },
  {
    text: " SuperSheldon has really boosted my confidence in class. The teachers explain everything clearly. My grades have improved a lot this term.",
    name: "— Liam Anderson, Year 10 Student, Australia ",
    image: "/k3b.png",
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

  // Image dimensions + spacer
  const IMG_W = 280;
  const IMG_SPACER = IMG_W + 16;

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
        className="mt-8 relative flex flex-col items-center justify-center py-20 overflow-visible"
        role="region"
        aria-roledescription="carousel"
        aria-label="Student testimonials carousel"
      >
        <div
          className="relative w-11/12 max-w-6xl rounded-2xl z-10 overflow-visible"
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
              {/* Orange Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative flex-shrink-0 w-[94%] mx-auto bg-[#FB8740] px-6 md:px-12 py-10 md:py-12 shadow-xl rounded-2xl overflow-visible"
              >
                {/* Content row */}
                <div className="relative flex flex-col md:flex-row items-center md:items-start">
                  {/* Text column */}
                  <div className="flex-1 text-center md:text-left relative z-10">
                    <h2 className="text-2xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow">
                      What Our Students Say
                    </h2>

                    <blockquote
                      className="text-base md:text-lg text-white leading-relaxed italic"
                      aria-live="polite"
                    >
                      "{testimonials[currentIndex].text}"
                    </blockquote>

                    <cite className="mt-3 block font-semibold text-white/90 not-italic">
                      {testimonials[currentIndex].name}
                    </cite>
                  </div>

                  {/* Spacer for desktop only */}
                  <div
                    aria-hidden="true"
                    className="hidden md:block shrink-0"
                    style={{ width: IMG_SPACER, height: 1 }}
                  />
                </div>

                {/* Image */}
                <div className="mt-6 md:mt-0 md:absolute md:bottom-0 md:right-0 flex justify-center md:block">
                  <div className="drop-shadow-2xl">
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
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div
          className="flex mt-6 p-2 bg-gray-200 rounded-full shadow-md opacity-90 space-x-3 cursor-pointer z-10"
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
              className={`h-2 rounded-full transition-all duration-500 shadow-md border-2 ${
                currentIndex === index
                  ? "w-6 bg-white shadow-lg border-white"
                  : "w-4 bg-white/50 shadow-sm border-white/50"
              }`}
            />
          ))}
        </div>

        {/* Floating Icons */}
        <div className="absolute bottom-6 left-8 -translate-x-1/3 animate-float1 z-10 rotate-[45]">
          <img src="/icons/book.png" alt="globe" width={60} height={60} />
        </div>
        <div className="absolute bottom-8 right-6 animate-float2 z-10">
          <img src="/icons/chalkboard.png" alt="" width={60} height={60} />
        </div>
        <div className="absolute top-4 left-12 animate-float2 z-10">
          <img src="/icons/palette.png" alt="" width={60} height={60} />
        </div>
        <div className="absolute top-4 right-12 animate-float1 z-10">
          <img src="/icons/Scholarcap.png" alt="" width={60} height={60} />
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
