"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { faqSections } from "./faqData";

export default function FAQ() {
  const [activeSection, setActiveSection] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative pt-28 pb-10 md:py-24 lg:my-16 xl:pt-8" id="faq">
         {/* Background Decoration commented out for cleaner look as requested
      // <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      //   <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-100 rounded-full blur-[100px] opacity-40" />
      //   <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[100px] opacity-40" />
      // </div>
      */}

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center mb-6 sm:mb-16 mt-8 sm:mt-0"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-quicksand font-bold text-gray-900 mb-4 px-4">
            Frequently Asked <span className="relative inline-block">
              <span className="relative z-10 text-orange-600">Questions</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-orange-100 -z-10 rounded-sm" />
            </span>
          </h2>
          <p className="text-gray-600 font-manrope text-base sm:text-xl max-w-2xl mx-auto px-4">
            If you have any other questions, feel free to reach out directly.
          </p>
           
           {/* CTA Buttons - Adjusted for mobile row */}
            <div className="flex flex-nowrap overflow-x-auto no-scrollbar justify-start sm:justify-center gap-3 mb-12 pb-4 px-4">
                <Link href="https://wa.me/917974695618" target="_blank" rel="noopener noreferrer" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 px-4 sm:px-8 rounded-full transition-colors duration-300 shadow-md transform hover:scale-105 text-sm sm:text-base whitespace-nowrap">
                    Contact us
                </Link>
                <Link href="/demo" className="bg-orange-100 hover:bg-orange-200 text-orange-800 font-semibold py-2.5 px-4 sm:px-8 rounded-full transition-colors duration-300 shadow-sm border border-orange-200 transform hover:scale-105 text-sm sm:text-base whitespace-nowrap">
                    Try a Free Class
                </Link>
            </div>

        </motion.div>

        {/* Section Tabs - Kept but styled cleaner */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center mb-10 gap-2"
        >
            {faqSections.map((section, idx) => (
                <button
                key={idx}
                onClick={() => {
                    setActiveSection(idx);
                    setActiveIndex(null);
                }}
                className={`relative px-6 py-2 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base ${
                    activeSection === idx
                    ? "bg-black text-white shadow-lg scale-105"
                    : "bg-orange-50 text-orange-700 hover:bg-orange-100"
                }`}
                >
                {section.title}
                </button>
            ))}
        </motion.div>


        <div className="space-y-6">
           <AnimatePresence mode="wait">
            <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
            >
              {faqSections[activeSection].faqs.map((item, index) => {
                const isActive = activeIndex === index;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`group rounded-[2.5rem] transition-all duration-300 border ${
                        isActive 
                        ? "bg-orange-50 border-orange-300 shadow-md" 
                        : "bg-white border-orange-100 hover:border-orange-200 hover:bg-orange-50/50"
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full text-left px-6 sm:px-8 py-5 flex items-center gap-4 focus:outline-none"
                    >
                         <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white"}`}>
                             <motion.span
                                animate={{ rotate: isActive ? 45 : 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="text-xl font-bold leading-none mb-0.5"
                             >
                                 +
                             </motion.span>
                         </div>
                      <span className={`font-anybody text-lg sm:text-lg font-semibold flex-1 ${isActive ? "text-orange-900" : "text-gray-800"}`}>
                        {item.question}
                      </span>
                    </button>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 sm:px-8 pb-6 pl-[4.5rem] text-gray-600 font-manrope leading-relaxed">
                            {item.answer}
                          </div>
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
          
      {/* Old floating icons commented out
      // <div className="absolute bottom-12 sm:bottom-32 left-4 sm:left-16 animate-float1 z-10 rotate-[45]">
      //   <img src="/icons/crayons.png" alt="globe" className="w-10 sm:w-[60px]" />
      // </div>
      // ...
      */}

    </section>
  );
}
