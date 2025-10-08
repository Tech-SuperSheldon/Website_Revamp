


"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqSections = [
  {
    title: "For Students & Parents",
    faqs: [
      {
        question: "What exams does SuperSheldon prepare students for?",
        answer:
          "We cover all major UK exams: 7+, 8+, 9+, 11+, 13+, SATs, GCSE, iGCSE, A-Levels, IB, and specialist university entrance tests like UCAT, BMAT, LNAT, MAT, TSA, STEP.",
      },
      {
        question: "How are the classes conducted?",
        answer:
          "All classes are live, interactive, and conducted online through our secure learning platform. Students get real-time feedback, practice worksheets, and regular assessments.",
      },
      {
        question: "Do you offer a demo class?",
        answer:
          "Yes! We provide a free demo session so students and parents can experience our teaching style before enrolling.",
      },
      {
        question: "What is the class size?",
        answer:
          "We offer both 1:1 personalised tutoring and small group batches (max 4 students per batch).",
      },
      {
        question: "How do you cover exam patterns?",
        answer:
          "Our modules are built around the official UK exam formats. We provide past papers, timed practice, and mock tests that mirror real exam conditions.",
      },
      {
        question: "How experienced are the teachers?",
        answer:
          "Our teachers are highly qualified, with proven track records in UK exam prep. Many are ex-grammar, independent school, or A-Level/GCSE examiners.",
      },
      {
        question: "Can parents track progress?",
        answer:
          "Yes. Parents get monthly progress reports, class summaries, and feedback after each session.",
      },
    ],
  },
  {
    title: "For Teachers",
    faqs: [
      {
        question: "How can teachers join SuperSheldon?",
        answer:
          "Teachers can apply via our careers page. We look for UK curriculum expertise and strong online teaching skills.",
      },
      {
        question: "What training do teachers receive?",
        answer:
          "We provide onboarding, SuperSheldon teaching methodology training, and access to resources (past papers, mock tests, lesson plans).",
      },
      {
        question: "How do teachers get paid?",
        answer:
          "Payments are processed monthly based on the number of classes conducted. Teacher payouts are transparent and trackable through the teacher dashboard.",
      },
      {
        question: "Do teachers set the curriculum?",
        answer:
          "No, we provide a structured SuperSheldon exam-prep curriculum, but teachers can adapt delivery based on student needs.",
      },
      {
        question: "How do teachers communicate with parents?",
        answer:
          "Teachers share reports through the platform. Direct parent-teacher meetings (PTMs) are scheduled quarterly.",
      },
    ],
  },
  {
    title: "Customer Support",
    faqs: [
      {
        question: "How do I contact support?",
        answer:
          "You can reach us via email, live chat on the website, or WhatsApp support.",
      },
      {
        question: "What if I miss a class?",
        answer:
          "All classes are recorded. Students can access recordings anytime in their dashboard.",
      },
      {
        question: "Can I reschedule classes?",
        answer:
          "Yes, students/parents can request rescheduling with 24-hour prior notice.",
      },
      {
        question: "How does SuperSheldon ensure security and privacy?",
        answer:
          "All sessions are conducted on a secure platform, with encrypted data and child-safety guidelines strictly followed.",
      },
      {
        question: "What is your refund/cancellation policy?",
        answer:
          "We offer flexible plans. Refunds or cancellations are processed as per our terms (clearly outlined during enrollment).",
      },
    ],
  },
];


export default function UKFAQ() {
  const [activeSection, setActiveSection] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative py-12 md:py-24" id="faq">
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* FAQ Content above watermark */}
        <div className="relative">
          {/* Title */}
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

      {/* Floating Icons (responsive sizing & positions) */}
      <div className="absolute bottom-20 sm:bottom-32 left-4 sm:left-16 animate-float1 z-10 rotate-[45]">
        <img src="/icons/book.png" alt="globe" className="w-10 sm:w-[60px]" />
      </div>
      <div className="absolute bottom-20 sm:bottom-32 right-6 sm:right-24 animate-float2 z-10">
        <img src="/icons/science.png" alt="" className="w-8 sm:w-[50px]" />
      </div>
      <div className="absolute top-40 sm:top-64 left-4 sm:left-12 animate-float1 z-10">
        <img src="/icons/chalkboard.png" alt="" className="w-10 sm:w-[60px]" />
      </div>
      <div className="absolute top-40 sm:top-64 right-4 sm:right-12 animate-float1 z-10">
        <img src="/icons/backpack.png" alt="" className="w-10 sm:w-[60px]" />
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
    </section>
  );
}
