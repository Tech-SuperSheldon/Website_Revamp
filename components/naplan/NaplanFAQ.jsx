"use client";

import { motion } from "framer-motion";

export default function NaplanFAQ() {
  const faqs = [
    {
      q: "Who are the tutors?",
      a: "Our tutors are qualified Australian teachers who specialise in NAPLAN and selective school preparation. Every tutor is background-checked and trained in adaptive learning methods.",
    },
    {
      q: "Are the lessons live or recorded?",
      a: "All lessons are live and interactive. Students can also access recordings later for revision.",
    },
    {
      q: "How do I track my child’s progress?",
      a: "You’ll receive weekly reports showing skill improvements, completed topics, and mock test results.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes! You can pause or cancel your plan anytime through your parent dashboard.",
    },
  ];

  return (
    <section className="py-20 px-6 sm:px-12 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-2xl font-bold text-center mb-8">Parent FAQs</h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              <h4 className="font-semibold text-lg mb-2">{faq.q}</h4>
              <p className="text-sm text-gray-600">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
