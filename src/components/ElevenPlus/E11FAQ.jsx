"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqSections = [
  {
    title: "For Students & Parents",
    faqs: [
      {
        question: "How is this different from regular 11+ tuition?",
        answer:
          "SuperSheldon combines live expert tutoring with AI-powered adaptive practice that adjusts to each child’s pace and skill level. Instead of one-size-fits-all lessons, students get personalized learning paths and real-time performance insights, making preparation more effective and engaging.",
      },
      {
        question: "Is this suitable for Year 4–6 students?",
        answer:
          "Yes! Our 11+ program is designed for students in Years 4 to 6. The course gradually builds exam-ready skills — starting with core concepts and progressing to advanced reasoning and timed mock exams — ensuring every child is confident before the test.",
      },
      {
        question: "Can parents monitor progress?",
        answer:
          "Absolutely. Parents get access to a live dashboard showing their child’s progress, performance reports, topic-wise strengths and areas for improvement, and teacher feedback — so you’re always informed and involved.",
      },
      {
        question: "How soon can we start?",
        answer:
          "You can begin right away! Simply book a free diagnostic session, and our team will set up your child’s personalized learning plan within 24 hours so they can start learning immediately.",
      },
    ],
  },
];

export default function E11FAQ() {
  const [activeSection, setActiveSection] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative py-12 md:py-24" id="faq">
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-quicksand font-semibold text-center text-black-900 mb-8 md:mb-12">
            Frequently Asked Questions
          </h1>

          {/* Section Tabs */}
          <div className="relative flex justify-center mb-8 md:mb-10 bg-blue-100 border-blue-200 rounded-full p-1 gap-1 sm:gap-0">
            {faqSections.map((section, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveSection(idx);
                  setActiveIndex(null);
                }}
                className="relative flex-1 sm:flex-none text-center px-2 sm:px-6 py-2 font-semibold z-10 transition-colors duration-300"
              >
                <span
                  className={`relative z-10 whitespace-nowrap truncate text-[clamp(10px,2.5vw,14px)] sm:text-sm md:text-base ${
                    activeSection === idx ? "text-white" : "text-blue-600"
                  }`}
                >
                  {section.title}
                </span>

                {activeSection === idx && (
                  <motion.div
                    layoutId="tabIndicator"
                    className="absolute inset-0 bg-[#5243C2] rounded-full shadow-md z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {faqSections[activeSection].faqs.map((item, index) => {
                const isActive = activeIndex === index;

                return (
                  <motion.div
                    key={index}
                    layout
                    initial={{ borderRadius: 10 }}
                    className={`border border-blue-300 rounded-lg overflow-hidden transition-all duration-300 ${
                      isActive ? "bg-blue-50" : "bg-white"
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full text-left px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center focus:outline-none"
                    >
                      <span
                        className={`font-anybody text-base sm:text-lg ${
                          isActive ? "text-blue-600" : "text-blue-700"
                        }`}
                      >
                        {item.question}
                      </span>
                      <span className="text-blue-500 text-xl sm:text-2xl font-bold">
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
                          className="px-4 sm:px-6 pb-3 sm:pb-4 text-blue-800 font-manrope text-sm sm:text-base"
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
      </div>

      {/* Floating Icons */}
      <div className="absolute bottom-4 sm:bottom-32 left-4 sm:left-16 animate-float1 z-10 rotate-[45]">
        <img src="/icons/pencil.png" alt="globe" className="w-10 sm:w-[60px]" />
      </div>
      <div className="absolute bottom-4 sm:bottom-32 right-6 sm:right-24 animate-float2 z-10">
        <img src="/icons/alarm.png" alt="" className="w-8 sm:w-[50px]" />
      </div>
      <div className="absolute top-40 sm:top-64 left-4 sm:left-12 animate-float1 z-10">
        <img src="/icons/calc.png" alt="" className="w-10 sm:w-[60px]" />
      </div>
      <div className="absolute top-40 sm:top-64 right-4 sm:right-12 animate-float1 z-10">
        <img src="/icons/ruler.png" alt="" className="w-10 sm:w-[60px]" />
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
        .animate-float1 {
          animation: float1 4s ease-in-out infinite;
        }
        .animate-float2 {
          animation: float2 5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
