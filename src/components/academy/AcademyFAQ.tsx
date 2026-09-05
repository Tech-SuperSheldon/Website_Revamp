"use client";

// Per-academy FAQ accordion.
//
// Same visual language as NSHomeFAQ, but the questions are passed in and the
// palette follows the site — each academy page answers its own handful of
// questions. NSHomeFAQ is left untouched so the landing page keeps its copy.
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CSS_TRANSITION, DUR, EASE, rise, riseOnce, SPRING, stagger, VIEWPORT } from "@/lib/motion";
import Highlight from "@/components/motion/Highlight";
import type { AcademyFaq, Locale } from "@/lib/academies";
import { academyTheme } from "@/lib/academyTheme";

export default function AcademyFAQ({
  items,
  locale,
}: {
  items: AcademyFaq[];
  locale: Locale;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion() ?? false;
  const theme = academyTheme(locale);

  return (
    <section id="faq" className="relative py-10 md:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...riseOnce(reduce)} className="text-center mb-8 md:mb-10">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${theme.heading}`}
          >
            Common{" "}
            <Highlight reduce={reduce} text={theme.highlightText} bar={theme.highlightBar}>
              questions
            </Highlight>
          </h2>
        </motion.div>

        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="space-y-4"
        >
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                variants={rise(reduce, 16)}
                className={`group rounded-[2rem] border ${CSS_TRANSITION} ${
                  isOpen ? `${theme.faqOpen} shadow-md` : theme.faqIdle
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-5 sm:px-7 py-5 flex items-center gap-4 focus:outline-none"
                >
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isOpen ? theme.faqDotOpen : theme.faqDotIdle
                    }`}
                  >
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={reduce ? { duration: 0 } : SPRING}
                      className="text-xl font-bold leading-none mb-0.5"
                    >
                      +
                    </motion.span>
                  </span>
                  <span
                    className={`text-base sm:text-lg font-semibold flex-1 ${
                      isOpen ? theme.faqQuestionOpen : "text-gray-800"
                    }`}
                  >
                    {item.q}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: reduce ? { duration: 0 } : { ...SPRING, stiffness: 300, damping: 34 },
                        opacity: { duration: DUR.fast, ease: EASE },
                      }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 sm:px-7 pb-6 pl-[3.75rem] sm:pl-[4.25rem] text-gray-600 leading-relaxed text-sm sm:text-base">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
