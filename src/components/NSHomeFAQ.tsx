"use client";

// Landing-page FAQ. Deliberately short and un-tabbed — the long, categorised
// list still lives in NSFAQ.tsx and is used by /new-home; this one only answers
// the five questions a parent asks before booking a trial.
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CSS_TRANSITION, DUR, EASE, rise, riseOnce, SPRING, stagger, VIEWPORT } from "@/lib/motion";
import Highlight from "@/components/motion/Highlight";

const FAQS = [
  {
    q: "How are tutors selected and vetted?",
    a: "Every tutor goes through identity verification, background checks and a teaching demo before they ever join a class.",
  },
  {
    q: "What if my child doesn't like the first tutor?",
    a: "We'll match a new tutor at no extra cost, as many times as it takes to find the right fit.",
  },
  {
    q: "Which countries do you support?",
    a: "Families across the UK, Australia, the US, the EU and New Zealand — with flexible scheduling across time zones.",
  },
  {
    q: "How much does it cost?",
    a: "Pricing depends on the academy and the plan you choose. Book a free trial call and we'll put together a personalised quote.",
  },
  {
    q: "Can I cancel any time?",
    a: "Yes. Plans are flexible, with no long-term lock-in.",
  },
];

export default function NSHomeFAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="faq" className="relative py-6 md:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...riseOnce(reduce)} className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#03215F] tracking-tight">
            Frequently asked <Highlight reduce={reduce}>questions</Highlight>
          </h2>
          <p className="mt-3 text-gray-600 text-base sm:text-lg max-w-xl mx-auto">
            Still unsure about something? Talk to us — we answer within the day.
          </p>
        </motion.div>

        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="space-y-4"
        >
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                variants={rise(reduce, 16)}
                className={`group rounded-[2rem] border ${CSS_TRANSITION} ${
                  isOpen
                    ? "bg-[#fff7f2] border-[#fec5a4] shadow-md"
                    : "bg-white border-[#ffede2] hover:border-[#fedbc6] hover:bg-[#fff7f2]/50"
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
                      isOpen
                        ? "bg-[#fc8741] text-white"
                        : "bg-[#ffede2] text-[#e37a3a] group-hover:bg-[#fc8741] group-hover:text-white"
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
                      isOpen ? "text-[#7e4420]" : "text-gray-800"
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
