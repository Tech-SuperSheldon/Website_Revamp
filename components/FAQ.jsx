


"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const faqSections = [
  {
    title: "Class Experience",
    faqs: [
      {
        question: "What age groups are SuperSheldon courses designed for?",
        answer:
          "Our programs are tailored for students from Grade 3 to Grade 12, covering early foundation levels to advanced exam preparation for NAPLAN, SAT, and ICAS across the UK, Australia, and the US.",
      },
      {
        question: "Is there any homework or outside practice required?",
        answer:
          "Yes. To maximize results, students are given structured practice tasks and mock papers. These help reinforce learning and simulate real exam conditions.",
      },
      {
        question: "How are SuperSheldon classes conducted?",
        answer:
          "Classes are 100% online, interactive, and one-on-one or small group sessions with real exam-style practice and interactive activities.",
      },
      {
        question: "What devices or software are needed for classes?",
        answer:
          "A laptop or tablet with stable internet, Zoom (or our online classroom platform), and a headset is all that’s required.",
      },
    ],
  },
  {
    title: "Customer Support",
    faqs: [
      {
        question: "How is my child’s data and privacy protected?",
        answer:
          "We strictly follow international privacy standards. All student data is securely stored, and class environments are fully protected.",
      },
      {
        question: "Can I get the recording of the classes for my child?",
        answer:
          "To maintain student privacy, we do not share class recordings. Instead, detailed notes and practice worksheets are provided after every class.",
      },
      {
        question: "Can I reschedule or cancel classes if needed?",
        answer:
          "Yes. Parents can easily reschedule or cancel classes with advance notice to suit your child’s exam preparation timeline.",
      },
    ],
  },
  {
    title: "Teacher Queries",
    faqs: [
      {
        question: "How will expert teachers support my child’s exam preparation?",
        answer:
          "Our teachers are specialists with years of experience. They provide personalized feedback, strategies, and exam-focused practice.",
      },
      {
        question: "Does my child need prior experience or preparation before joining?",
        answer:
          "Not at all. Our courses adapt to each student’s current level—whether beginner or advanced.",
      },
      {
        question: "How do teachers handle difficult topics?",
        answer:
          "Teachers break down complex topics into easy-to-understand concepts and provide additional practice for mastery.",
      },
    ],
  },
];



// export default function FAQ() {
//   const [activeSection, setActiveSection] = useState(0);
//   const [activeIndex, setActiveIndex] = useState(null);

//   const toggleFAQ = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <section className="relative py-12 md:py-24" id="faq">
//       <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* FAQ Content above watermark */}
//         <div className="relative">
//           {/* Title */}
//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-quicksand font-semibold text-center text-black-900 mb-8 md:mb-12">
//             Frequently Asked Questions
//           </h1>

//           {/* Section Tabs */}
//           <div className="relative flex flex-wrap justify-center mb-8 md:mb-10 bg-orange-100 rounded-full p-1 gap-2 sm:gap-0">
//             {faqSections.map((section, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => {
//                   setActiveSection(idx);
//                   setActiveIndex(null);
//                 }}
//                 className="relative flex-1 sm:flex-none text-center px-3 sm:px-6 py-2 font-semibold z-10 transition-colors duration-300"
//               >
//                 <span
//                   className={`relative z-10 ${
//                     activeSection === idx ? "text-white" : "text-orange-600"
//                   }`}
//                 >
//                   {section.title}
//                 </span>

//                 {activeSection === idx && (
//                   <motion.div
//                     layoutId="tabIndicator"
//                     className="absolute inset-0 bg-orange-500 rounded-full shadow-md z-0"
//                     transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                   />
//                 )}
//               </button>
//             ))}
//           </div>

//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeSection}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.4 }}
//               className="space-y-4"
//             >
//               {faqSections[activeSection].faqs.map((item, index) => {
//                 const isActive = activeIndex === index;

//                 return (
//                   <motion.div
//                     key={index}
//                     layout
//                     initial={{ borderRadius: 10 }}
//                     className={`border border-orange-300 rounded-lg overflow-hidden transition-all duration-300 ${
//                       isActive ? "bg-orange-50" : "bg-white"
//                     }`}
//                   >
//                     <button
//                       onClick={() => toggleFAQ(index)}
//                       className="w-full text-left px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center focus:outline-none"
//                     >
//                       <span
//                         className={`font-anybody text-base sm:text-lg ${
//                           isActive ? "text-orange-600" : "text-orange-700"
//                         }`}
//                       >
//                         {item.question}
//                       </span>
//                       <span className="text-orange-500 text-xl sm:text-2xl font-bold">
//                         {isActive ? "−" : "+"}
//                       </span>
//                     </button>
//                     <AnimatePresence>
//                       {isActive && (
//                         <motion.div
//                           initial={{ opacity: 0, height: 0 }}
//                           animate={{ opacity: 1, height: "auto" }}
//                           exit={{ opacity: 0, height: 0 }}
//                           transition={{ duration: 0.3 }}
//                           className="px-4 sm:px-6 pb-3 sm:pb-4 text-orange-800 font-manrope text-sm sm:text-base"
//                         >
//                           {item.answer}
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </motion.div>
//                 );
//               })}
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* Floating Icons (responsive sizing & positions) */}
//       <div className="absolute bottom-12 sm:bottom-32 left-4 sm:left-16 animate-float1 z-10 rotate-[45]">
//         <img src="/icons/science.png" alt="globe" className="w-10 sm:w-[60px]" />
//       </div>
//       <div className="absolute bottom-16 sm:bottom-32 right-6 sm:right-24 animate-float2 z-10">
//         <img src="/icons/science.png" alt="scienc" className="w-8 sm:w-[50px]" />
//       </div>
//       <div className="absolute top-40 sm:top-64 left-4 sm:left-12 animate-float1 z-10">
//         <img src="/icons/chalkboard.png" alt="chalk" className="w-10 sm:w-[60px]" />
//       </div>
//       <div className="absolute top-40 sm:top-64 right-4 sm:right-12 animate-float1 z-10">
//         <img src="/icons/backpack.png" alt="back" className="w-10 sm:w-[60px]" />
//       </div>

//       <style jsx>{`
//         @keyframes float1 {
//           0%,
//           100% {
//             transform: translateY(0) rotate(-45deg);
//           }
//           50% {
//             transform: translateY(-12px) rotate(-45deg);
//           }
//         }
//         @keyframes float2 {
//           0%,
//           100% {
//             transform: translateX(0) rotate(45deg);
//           }
//           50% {
//             transform: translateX(12px) rotate(45deg);
//           }
//         }
//         @keyframes float3 {
//           0%,
//           100% {
//             transform: translateY(0) translateX(0);
//           }
//           50% {
//             transform: translateY(-10px) translateX(10px);
//           }
//         }
//         .animate-float1 {
//           animation: float1 4s ease-in-out infinite;
//         }
//         .animate-float2 {
//           animation: float2 5s ease-in-out infinite;
//         }
//         .animate-float3 {
//           animation: float3 6s ease-in-out infinite;
//         }
//       `}</style>
//     </section>
//   );
// }




//animated

export default function FAQ() {
  const [activeSection, setActiveSection] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // 👉 Hook into visibility
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { amount: 0.2 });

  // Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative py-12 md:py-24"
      id="faq"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-quicksand font-semibold text-center text-black-900 mb-8 md:mb-12"
          variants={itemVariants}
        >
          Frequently Asked Questions
        </motion.h1>

        {/* Section Tabs */}
        <motion.div
          className="relative flex flex-wrap justify-center mb-8 md:mb-10 bg-orange-100 rounded-full p-1 gap-2 sm:gap-0"
          variants={itemVariants}
        >
          {faqSections.map((section, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveSection(idx);
                setActiveIndex(null);
              }}
              className="relative flex-1 sm:flex-none text-center px-3 sm:px-6 py-2 font-semibold z-10 transition-colors duration-300"
            >
              <span
                className={`relative z-10 ${
                  activeSection === idx ? "text-white" : "text-orange-600"
                }`}
              >
                {section.title}
              </span>

              {activeSection === idx && (
                <motion.div
                  layoutId="tabIndicator"
                  className="absolute inset-0 bg-orange-500 rounded-full shadow-md z-0"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-4"
          >
            {faqSections[activeSection].faqs.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <motion.div
                  key={index}
                  layout
                  variants={itemVariants}
                  className={`border border-orange-300 rounded-lg overflow-hidden transition-all duration-300 ${
                    isActive ? "bg-orange-50" : "bg-white"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center focus:outline-none"

                  >
                    <span
                      className={`font-anybody text-base sm:text-lg ${
                        isActive ? "text-orange-600" : "text-orange-700"
                      }`}
                    >
                      {item.question}
                    </span>
                    <span className="text-orange-500 text-xl sm:text-2xl font-bold">
                      {isActive ? "−" : "+"}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-4 sm:px-6 pb-3 sm:pb-4 text-orange-800 font-manrope text-sm sm:text-base"
                      >

                        {item.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Floating Icons (animated on scroll) */}
      <motion.div
        className="absolute bottom-12 sm:bottom-32 left-4 sm:left-16 z-10 animate-float2"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6 }}
      >
        <img src="/icons/bag2.png" alt="globe" className="w-10 sm:w-[60px]" />
      </motion.div>

      <motion.div
        className="absolute bottom-16 sm:bottom-32 right-6 sm:right-24 z-10 animate-float1"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <img src="/icons/ribbon2.png" alt="science" className="w-8 sm:w-[50px]" />
      </motion.div>

      <motion.div
        className="absolute top-40 sm:top-64 left-4 sm:left-12 z-10 animate-float2"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <img src="/icons/scholarcap2.png" alt="chalk" className="w-10 sm:w-[60px]" />
      </motion.div>

      <motion.div
        className="absolute top-40 sm:top-64 right-4 sm:right-12 z-10 animate-float1"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <img src="/icons/square2.png" alt="back" className="w-10 sm:w-[60px]" />
      </motion.div>

      {/* Float Animations */}
      <style jsx>{`
        @keyframes float1 {
          0%, 100% {
            transform: translateY(0) rotate(-45deg);
          }
          50% {
            transform: translateY(-12px) rotate(-45deg);
          }
        }
        @keyframes float2 {
          0%, 100% {
            transform: translateX(0) rotate(45deg);
          }
          50% {
            transform: translateX(12px) rotate(45deg);
          }
        }
        @keyframes float3 {
          0%, 100% {
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
    </motion.section>
  );
}
