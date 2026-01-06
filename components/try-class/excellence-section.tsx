"use client";

import { motion } from "framer-motion";

export function ExcellenceSection() {
  return (
    <section className="w-full py-16 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto bg-gradient-to-r from-orange-500 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl"
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Recognised Excellence
        </h2>
        <p className="mb-10 text-orange-50 max-w-2xl mx-auto">
          Apollo is registered with the Tutors&apos; Association and our tutors hold QTS
          (Qualified Teacher Status) or equivalent professional qualifications.
        </p>

        {/* Placeholders for logos/badges */}
        <div className="flex flex-wrap justify-center gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-32 h-16 bg-white rounded-lg opacity-90 shadow-sm"
              aria-hidden="true"
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
