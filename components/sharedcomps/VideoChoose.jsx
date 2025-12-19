// "use client";

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const slides = [
//   {
//     video: "/videos/vid1.mp4",
//     heading: "Why Choose Super Sheldon",
//     points: [
//       "World‑class mentors",
//       "Real‑world skill focus",
//       "Learning beyond textbooks",
//     ],
//   },
//   {
//     video: "/videos/vid2.mp4",
//     heading: "Certifications That Matter",
//     points: [
//       "STEM‑aligned learning paths",
//       "Industry‑recognized credentials",
//       "Portfolio‑ready outcomes",
//     ],
//   },
//   {
//     video: "/videos/vid3.mp4",
//     heading: "Project‑Based Learning",
//     points: [
//       "Hands‑on guided projects",
//       "Problem‑solving mindset",
//       "Collaboration skills",
//     ],
//   },
//   {
//     video: "/videos/vid4.mp4",
//     heading: "Future‑Ready Skills",
//     points: [
//       "Critical thinking",
//       "Technology fluency",
//       "Leadership exposure",
//     ],
//   },
//   {
//     video: "/videos/vid5.mp4",
//     heading: "Global Exposure",
//     points: [
//       "International curriculum",
//       "Mentors from top institutes",
//       "Confidence on a global stage",
//     ],
//   },
// ];

// export default function VideoChoose({ themeColor = "orange" }) {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div
//       className="w-full px-6 py-12"
//       style={{
//         '--theme-main': themeColor,
//         '--theme-light': `${themeColor}20`,
//         '--theme-soft': `${themeColor}30`,
//         '--theme-muted': `${themeColor}60`,
//       }}
//     >
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--theme-main)] mb-4">
//           Why Choose Super Sheldon
//         </h2>
//         <p className="text-center text-gray-700 max-w-3xl mx-auto mb-10">
//           We shape tomorrow’s leaders with expert mentors and practical learning experiences.
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//           {/* Video Section */}
//           <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-[var(--theme-soft)]">
//             <AnimatePresence mode="wait">
//               <motion.video
//                 key={slides[index].video}
//                 src={slides[index].video}
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//                 className="w-full h-[260px] md:h-[360px] object-cover"
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 1.05 }}
//                 transition={{ duration: 0.6, ease: "easeInOut" }}
//               />
//             </AnimatePresence>
//           </div>

//           {/* Text Section */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={slides[index].heading}
//               initial={{ opacity: 0, x: 40 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -40 }}
//               transition={{ duration: 0.6 }}
//               className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
//             >
//               <h3 className="text-2xl md:text-3xl font-semibold text-[var(--theme-main)] mb-4">
//                 {slides[index].heading}
//               </h3>
//               <ul className="space-y-3 text-gray-700">
//                 {slides[index].points.map((point, i) => (
//                   <li key={i} className="flex items-start gap-3">
//                     <span className="w-2.5 h-2.5 mt-2 rounded-full bg-[var(--theme-main)]" />
//                     <span>{point}</span>
//                   </li>
//                 ))}
//               </ul>

//               {/* Indicators */}
//               <div className="flex gap-2 mt-6">
//                 {slides.map((_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setIndex(i)}
//                     className={`h-2 rounded-full transition-all duration-300 ${
//                       i === index
//                         ? "w-6 bg-[var(--theme-main)]"
//                         : "w-2 bg-[var(--theme-muted)]"
//                     }`}
//                   />
//                 ))}
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// }






// "use client";

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const slides = [
//   {
//     video: "/videos/vid1.mp4",
//     heading: "Why Choose Super Sheldon",
//     points: [
//       "World‑class mentors",
//       "Real‑world skill focus",
//       "Learning beyond textbooks",
//     ],
//   },
//   {
//     video: "/videos/vid2.mp4",
//     heading: "Certifications That Matter",
//     points: [
//       "STEM‑aligned learning paths",
//       "Industry‑recognized credentials",
//       "Portfolio‑ready outcomes",
//     ],
//   },
//   {
//     video: "/videos/vid3.mp4",
//     heading: "Project‑Based Learning",
//     points: [
//       "Hands‑on guided projects",
//       "Problem‑solving mindset",
//       "Collaboration skills",
//     ],
//   },
//   {
//     video: "/videos/vid4.mp4",
//     heading: "Future‑Ready Skills",
//     points: [
//       "Critical thinking",
//       "Technology fluency",
//       "Leadership exposure",
//     ],
//   },
  
// ];

// export default function VideoChoose({ themeColor = "orange" }) {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div
//       className="w-full px-6 py-12"
//       style={{
//         '--theme-main': themeColor,
//         '--theme-light': `${themeColor}20`,
//         '--theme-soft': `${themeColor}30`,
//         '--theme-muted': `${themeColor}60`,
//       }}
//     >
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--theme-main)] mb-4">
//           Why Choose Super Sheldon
//         </h2>
//         <p className="text-center text-gray-700 max-w-3xl mx-auto mb-10">
//           We shape tomorrow’s leaders with expert mentors and practical learning experiences.
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//           {/* Video Section */}
//           <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-[var(--theme-soft)]">
//             <AnimatePresence mode="wait">
//               <motion.video
//                 key={slides[index].video}
//                 src={slides[index].video}
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//                 className="w-full h-[260px] md:h-[360px] object-cover"
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 1.05 }}
//                 transition={{ duration: 0.6, ease: "easeInOut" }}
//               />
//             </AnimatePresence>
//           </div>

//           {/* Text Section */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={slides[index].heading}
//               initial={{ opacity: 0, x: 40 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -40 }}
//               transition={{ duration: 0.6 }}
//               className="p-4 md:p-6"
//             >
//               <h3 className="text-3xl md:text-4xl font-extrabold mb-5 bg-gradient-to-r from-[var(--theme-main)] to-[var(--theme-muted)] bg-clip-text text-transparent">
//                 {slides[index].heading}
//               </h3>
//               <ul className="space-y-4 text-gray-700 text-lg">
//                 {slides[index].points.map((point, i) => (
//                   <li key={i} className="flex items-start gap-3">
//                     <span className="w-2.5 h-2.5 mt-2 rounded-full bg-[var(--theme-main)]" />
//                     <span>{point}</span>
//                   </li>
//                 ))}
//               </ul>

//               {/* Indicators */}
//               <div className="flex gap-3 mt-8">
//                 {slides.map((_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setIndex(i)}
//                     className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
//                       i === index
//                         ? "w-10 bg-[var(--theme-main)]"
//                         : "w-3 bg-[var(--theme-muted)]"
//                     }`}
//                   />
//                 ))}
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// }











"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useHoverGesture } from "framer-motion";

const slides = [
  {
    video: "/videos/vid1.mp4",
    heading: "Why Choose Super Sheldon",
    points: [
      "World‑class mentors",
      "Real‑world skill focus",
      "Learning beyond textbooks",
    ],
  },
  {
    video: "/videos/vid2.mp4",
    heading: "Certifications That Matter",
    points: [
      "STEM‑aligned learning paths",
      "Industry‑recognized credentials",
      "Portfolio‑ready outcomes",
    ],
  },
  {
    video: "/videos/vid3.mp4",
    heading: "Project‑Based Learning",
    points: [
      "Hands‑on guided projects",
      "Problem‑solving mindset",
      "Collaboration skills",
    ],
  },
  {
    video: "/videos/vid4.mp4",
    heading: "Future‑Ready Skills",
    points: [
      "Critical thinking",
      "Technology fluency",
      "Leadership exposure",
    ],
  },
];

export default function VideoChoose({ themeColor = "#f97316" }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [index]);

  const paginate = (newIndex) => {
    setDirection(newIndex > index ? 1 : -1);
    setIndex(newIndex);
  };

  // Variants for the sliding effect
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section 
      className="w-full py-20 bg-gray-50/50"
      style={{
        '--theme-main': themeColor,
        '--theme-soft': `${themeColor}15`,
        '--theme-muted': `${themeColor}40`,
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Why Choose <span className="text-[var(--theme-main)]">Super Sheldon</span>
          </h2>
          <div className="h-1.5 w-24 bg-[var(--theme-main)] mx-auto rounded-full mb-6" />
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We shape tomorrow’s leaders with expert mentors and practical learning experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white p-4 md:p-8 rounded-[2rem] shadow-2xl shadow-gray-200/50">
          
          {/* Video Visualizer (LHS) */}
          <div className="lg:col-span-7 relative aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.video
                key={slides[index].video}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 }
                }}
                src={slides[index].video}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          </div>

          {/* Content Section (RHS) */}
          <div className="lg:col-span-5 flex flex-col justify-center min-h-[400px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-3xl font-bold text-gray-800 mb-6">
                  {slides[index].heading}
                </h3>
                
                <ul className="space-y-5 mb-10">
                  {slides[index].points.map((point, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                      className="flex items-center gap-4 text-gray-700 font-medium text-lg"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--theme-soft)] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[var(--theme-main)]" />
                      </div>
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            {/* Enhanced Slider Pagination */}
            <div className="flex flex-wrap gap-3 mt-auto pt-6 border-t border-gray-100">
              {slides.map((slide, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i)}
                  className="group relative flex-1 min-w-[60px] h-12 flex flex-col items-start gap-1 transition-all"
                >
                  <span className={`text-[10px] uppercase font-bold tracking-wider transition-colors ${i === index ? 'text-[var(--theme-main)]' : 'text-gray-400'}`}>
                    0{i + 1}
                  </span>
                  <div className={`h-1.5 w-full rounded-full overflow-hidden bg-gray-200`}>
                    <motion.div 
                      className="h-full bg-[var(--theme-main)]"
                      initial={false}
                      animate={{ width: i === index ? "100%" : "0%" }}
                      transition={{ duration: i === index ? 6 : 0.3, ease: "linear" }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
