


// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";

// const slides = [
//   {
//     id: 0,
//     texts: [
//       {
//         number: "01",
//         title: " Sessions Anytime, Anywhere",
//         desc: " Learn directly from expert tutors with flexible sessions accessible from any location.",
//       },
//       {
//         number: "02",
//         title: " Customized Curriculum for Every Topic",
//         desc: " Personalized learning plans tailored to each student’s unique needs and goals.",
//       },
//       {
//         number: "03",
//         title: " Interactive LMS for Homework & Quizzes",
//         desc: "A smart platform to practice, submit homework, and take quizzes anytime.",
//       },
//     ],
//     images: ["/course/Grp1.png"],
//   },
//   {
//     id: 1,
//     texts: [
//       {
//         number: "01",
//         title: " Sessions Anytime, Anywhere",
//         desc: " Learn directly from expert tutors with flexible sessions accessible from any location.",
//       },
//       {
//         number: "02",
//         title: " Customized Curriculum for Every Topic",
//         desc: " Personalized learning plans tailored to each student’s unique needs and goals.",
//       },
//       {
//         number: "03",
//         title: " Interactive LMS for Homework & Quizzes",
//         desc: "A smart platform to practice, submit homework, and take quizzes anytime.",
//       },
//     ],
//     images: ["/course/Grp2.png"],
//   },
//   {
//     id: 2,
//     texts: [
//       {
//         number: "01",
//         title: " Sessions Anytime, Anywhere",
//         desc: " Learn directly from expert tutors with flexible sessions accessible from any location.",
//       },
//       {
//         number: "02",
//         title: " Customized Curriculum for Every Topic",
//         desc: " Personalized learning plans tailored to each student’s unique needs and goals.",
//       },
//       {
//         number: "03",
//         title: " Interactive LMS for Homework & Quizzes",
//         desc: "A smart platform to practice, submit homework, and take quizzes anytime.",
//       },
//     ],
//     images: ["/course/Grp3.png"],
//   },
// ];

// export default function FullPageSlider() {
//   const [active, setActive] = useState(0);

//   // ✅ Auto-switch every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActive((prev) => (prev + 1) % slides.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center w-full px-6 sm:px-10 py-16">
//       {/* Top Heading */}
//       <motion.h2
//         initial={{ opacity: 0, y: -40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="text-3xl sm:text-5xl leading-tight font-quicksand font-semibold mb-10 sm:mb-14 text-center"
//       >
//         The <span className="text-purple-400">Smart</span> Choice for <br />
//         <span className="text-red-400">Bright</span>
//         <span className="text-orange-400"> Futures</span>
//       </motion.h2>

//       {/* Content Flexbox */}
//       <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-8 lg:gap-5 items-center">
//         {/* Left Section (Text Side) */}
//         <div className="flex-1 flex flex-col justify-start">
//           <motion.h3
//             initial={{ opacity: 0, x: -40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.7 }}
//             className="text-2xl sm:text-4xl font-quicksand font-semibold mb-6 sm:mb-10"
//           >
//             The Global Exam Expertise
//           </motion.h3>

//           {/* AnimatePresence for whole text group */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={slides[active].id + "-texts"}
//               initial={{ opacity: 0, x: -60 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 60 }}
//               transition={{ duration: 0.7, ease: "easeInOut" }}
//               className="flex flex-col gap-5 w-full sm:w-[600px] z-10"
//             >
//               {slides[active].texts.map((t, idx) => (
//                 <motion.div
//                   key={t.title}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{
//                     duration: 0.5,
//                     delay: idx * 0.1, // staggered animation
//                   }}
//                   className={`flex items-center gap-6 ${
//                     idx % 2 === 0 ? "flex-row" : "flex-row-reverse"
//                   }`}
//                 >
//                   {/* Number */}
//                   <span className="text-4xl sm:text-6xl font-bold font-poppins text-gray-200 leading-none flex-shrink-0">
//                     {t.number}
//                   </span>

//                   {/* Text Box */}
//                   <div className="flex items-center gap-4 w-full max-w-lg bg-white rounded-2xl shadow-2xl shadow-gray-400 p-6 sm:p-8 min-h-[120px] sm:min-h-[150px]">
//                     {/* Logo placeholder */}
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center" />

//                     {/* Text Content */}
//                     <div>
//                       <h3 className="text-lg sm:text-xl font-roboto font-bold">
//                         {t.title}
//                       </h3>
//                       <p className="text-sm sm:text-base font-roboto text-gray-600">
//                         {t.desc}
//                       </p>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {/* Right Section (Images + Pills) */}
//         <div className="flex-1 flex items-center justify-between gap-5">
//           {/* Images */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={slides[active].id + "-images"}
//               initial={{ opacity: 0, x: 60 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -60 }}
//               transition={{ duration: 0.7, ease: "easeInOut" }}
//               className="flex items-start gap-6"
//             >
//               {/* Image (made bigger) */}
//               <div className="rounded-2xl overflow-hidden w-[280px] sm:w-[400px] lg:w-[460px] flex items-center justify-center">
//                 <Image
//                   src={slides[active].images[0]}
//                   alt="large"
//                   width={460}
//                   height={380}
//                   className="object-cover h-full w-full"
//                 />
//               </div>
//             </motion.div>
//           </AnimatePresence>

//           {/* Navigation Pills */}
//           <div className="flex flex-col justify-center gap-2">
//             {slides.map((_, index) => (
//               <motion.button
//                 key={index}
//                 onClick={() => setActive(index)}
//                 animate={{
//                   height: active === index ? 100 : 40,
//                   width: 8,
//                 }}
//                 transition={{ duration: 0.4, ease: "easeInOut" }}
//                 className={`rounded-full transition-colors ${
//                   active === index
//                     ? "bg-gray-700"
//                     : "bg-gray-300 hover:bg-gray-400"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";

// const slides = [
//   {
//     id: 0,
//     texts: [
//       {
//         number: "01",
//         icon: "🎯",
//         title: "Stress-Free Exam Prep Starts Here",
//         desc: "1:1 live sessions ensure your child gets the individual attention they need.",
//       },
//       {
//         number: "02",
//         icon: "📌",
//         title: "Give Your Child the Exam Edge",
//         desc: "Customized 1:1 tutoring for NAPLAN, UK Exams, SATs & international assessments.",
//       },
//       {
//         number: "03",
//         icon: "✅",
//         title: "Build Confidence, Not Just Grades",
//         desc: "Strengthening concepts, boosting problem-solving skills, and growing confidence.",
//       },
//     ],
//     images: ["/course/Grp1.png"],
//   },
//   {
//     id: 1,
//     texts: [
//       {
//         number: "04",
//         icon: "📚",
//         title: "The Future of Learning is Here",
//         desc: "Covers school syllabus + extra skills, worldwide access, flexible sessions.",
//       },
//       {
//         number: "05",
//         icon: "⭐",
//         title: "Turn Screen Time Into Learning Time",
//         desc: "Learning feels like play with interactive, tutor-guided sessions.",
//       },
//       {
//         number: "06",
//         icon: "🌍",
//         title: "Learning Tailored Just for Your Child",
//         desc: "Personalized plans that adapt to your child’s pace and style across all subjects.",
//       },
//     ],
//     images: ["/course/Grp2.png"],
//   },
//   {
//     id: 2,
//     texts: [
//       {
//         number: "07",
//         icon: "⏰",
//         title: "Sessions Anytime, Anywhere",
//         desc: "Learn directly from expert tutors with flexible sessions accessible from any location.",
//       },
//       {
//         number: "08",
//         icon: "📖",
//         title: "Customized Curriculum for Every Topic",
//         desc: "Personalized learning plans tailored to each student’s unique needs and goals.",
//       },
//       {
//         number: "09",
//         icon: "📝",
//         title: "Interactive LMS for Homework & Quizzes",
//         desc: "A smart platform to practice, submit homework, and take quizzes anytime.",
//       },
//     ],
//     images: ["/course/Grp3.png"],
//   },
// ];

// export default function FullPageSlider() {
//   const [active, setActive] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActive((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center w-full px-6 sm:px-10 py-16">
//       {/* Top Heading */}
//       <motion.h2
//         initial={{ opacity: 0, y: -40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="text-3xl sm:text-5xl leading-tight font-quicksand font-semibold mb-10 sm:mb-14 text-center"
//       >
//         The <span className="text-purple-400">Smart</span> Choice for <br />
//         <span className="text-red-400">Bright</span>
//         <span className="text-orange-400"> Futures</span>
//       </motion.h2>

//       <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-8 lg:gap-5 items-center">
//         {/* Left Section */}
//         <div className="flex-1 flex flex-col justify-start">
//           <motion.h3
//             initial={{ opacity: 0, x: -40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.7 }}
//             className="text-2xl sm:text-4xl font-quicksand font-semibold mb-6 sm:mb-10"
//           >
          
//           </motion.h3>

//           <AnimatePresence mode="wait">
//             <motion.div
//               key={slides[active].id + "-texts"}
//               initial={{ opacity: 0, x: -60 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 60 }}
//               transition={{ duration: 0.7, ease: "easeInOut" }}
//               className="flex flex-col gap-5 w-full sm:w-[600px] z-10"
//             >
//               {slides[active].texts.map((t, idx) => (
//                 <motion.div
//                   key={t.title}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.5, delay: idx * 0.1 }}
//                   className={`flex items-center gap-6 ${
//                     idx % 2 === 0 ? "flex-row" : "flex-row-reverse"
//                   }`}
//                 >
//                   <span className="text-4xl sm:text-6xl font-bold font-poppins text-gray-200 leading-none flex-shrink-0">
//                     {t.number}
//                   </span>

//                   <div className="flex items-center gap-4 w-full max-w-lg bg-white rounded-2xl shadow-2xl shadow-gray-400 p-6 sm:p-8 min-h-[120px] sm:min-h-[150px]">
//                     {/* Icon */}
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex-shrink-0 flex items-center justify-center text-xl">
//                       {t.icon}
//                     </div>
//                     <div>
//                       <h3 className="text-lg sm:text-xl font-roboto font-bold">
//                         {t.title}
//                       </h3>
//                       <p className="text-sm sm:text-base font-roboto text-gray-600">
//                         {t.desc}
//                       </p>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {/* Right Section */}
//         <div className="flex-1 flex items-center justify-between gap-5">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={slides[active].id + "-images"}
//               initial={{ opacity: 0, x: 60 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -60 }}
//               transition={{ duration: 0.7, ease: "easeInOut" }}
//               className="flex items-start gap-6"
//             >
//               <div className="rounded-2xl overflow-hidden w-[280px] sm:w-[400px] lg:w-[460px] flex items-center justify-center">
//                 <Image
//                   src={slides[active].images[0]}
//                   alt="large"
//                   width={460}
//                   height={380}
//                   className="object-cover h-full w-full"
//                 />
//               </div>
//             </motion.div>
//           </AnimatePresence>

//           <div className="flex flex-col justify-center gap-2">
//             {slides.map((_, index) => (
//               <motion.button
//                 key={index}
//                 onClick={() => setActive(index)}
//                 animate={{
//                   height: active === index ? 100 : 40,
//                   width: 8,
//                 }}
//                 transition={{ duration: 0.4, ease: "easeInOut" }}
//                 className={`rounded-full transition-colors ${
//                   active === index
//                     ? "bg-gray-700"
//                     : "bg-gray-300 hover:bg-gray-400"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }









"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    id: 0,
    texts: [
      {
        number: "01",
        icon: "🎯",
        title: "Stress-Free Exam Prep Starts Here",
        desc: "1:1 live sessions ensure your child gets the individual attention they need.",
      },
      {
        number: "02",
        icon: "📌",
        title: "Give Your Child the Exam Edge",
        desc: "Customized 1:1 tutoring for NAPLAN, UK Exams, SATs & international assessments.",
      },
      {
        number: "03",
        icon: "✅",
        title: "Build Confidence, Not Just Grades",
        desc: "Strengthening concepts, boosting problem-solving skills, and growing confidence.",
      },
    ],
    images: ["/course/Grp1.png"],
  },
  {
    id: 1,
    texts: [
      {
        number: "04",
        icon: "📚",
        title: "The Future of Learning is Here",
        desc: "Covers school syllabus + extra skills, worldwide access, flexible sessions.",
      },
      {
        number: "05",
        icon: "⭐",
        title: "Turn Screen Time Into Learning Time",
        desc: "Learning feels like play with interactive, tutor-guided sessions.",
      },
      {
        number: "06",
        icon: "🌍",
        title: "Learning Tailored Just for Your Child",
        desc: "Personalized plans that adapt to your child’s pace and style across all subjects.",
      },
    ],
    images: ["/course/Grp2.png"],
  },
  {
    id: 2,
    texts: [
      {
        number: "07",
        icon: "⏰",
        title: "Sessions Anytime, Anywhere",
        desc: "Learn directly from expert tutors with flexible sessions accessible from any location.",
      },
      {
        number: "08",
        icon: "📖",
        title: "Customized Curriculum for Every Topic",
        desc: "Personalized learning plans tailored to each student’s unique needs and goals.",
      },
      {
        number: "09",
        icon: "📝",
        title: "Interactive LMS for Homework & Quizzes",
        desc: "A smart platform to practice, submit homework, and take quizzes anytime.",
      },
    ],
    images: ["/course/Grp3.png"],
  },
];

export default function FullPageSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-10 py-10 sm:py-16">
      {/* Top Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-2xl sm:text-4xl lg:text-5xl leading-tight font-quicksand font-semibold mb-8 sm:mb-12 text-center"
      >
        The <span className="text-purple-400">Smart</span> Choice for <br />
        <span className="text-red-400">Bright</span>
        <span className="text-orange-400"> Futures</span>
      </motion.h2>

      <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-8 lg:gap-5 items-center">
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[active].id + "-texts"}
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="flex flex-col gap-5 w-full max-w-full sm:max-w-[600px] z-10"
            >
              {slides[active].texts.map((t, idx) => (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`flex items-center gap-4 sm:gap-6 ${
                    idx % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <span className="text-3xl sm:text-5xl lg:text-6xl font-bold font-poppins text-gray-200 leading-none flex-shrink-0">
                    {t.number}
                  </span>

                  <div className="flex items-center gap-3 sm:gap-4 w-full bg-white rounded-2xl shadow-2xl shadow-gray-400 p-4 sm:p-6 md:p-8 min-h-[100px] sm:min-h-[140px]">
                    {/* Icon */}
                    <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-gray-100 rounded-full flex-shrink-0 flex items-center justify-center text-lg sm:text-xl">
                      {t.icon}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-roboto font-bold">
                        {t.title}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base font-roboto text-gray-600">
                        {t.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex items-center justify-between gap-3 sm:gap-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[active].id + "-images"}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="flex items-start gap-4 sm:gap-6"
            >
              <div className="rounded-2xl overflow-hidden w-[220px] sm:w-[320px] md:w-[420px] lg:w-[460px] flex items-center justify-center">
                <Image
                  src={slides[active].images[0]}
                  alt="large"
                  width={460}
                  height={380}
                  className="object-cover h-full w-full"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="flex flex-col justify-center gap-1 sm:gap-2">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActive(index)}
                animate={{
                  height: active === index ? 80 : 30,
                  width: 6,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={`rounded-full transition-colors ${
                  active === index
                    ? "bg-gray-700"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
