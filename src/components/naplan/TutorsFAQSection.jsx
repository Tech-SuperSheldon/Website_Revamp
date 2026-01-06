"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function TutorsFAQSection() {
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

  const tutors = [
    {
      name: "Ms. Alice Brown",
      subject: "Reading & Writing",
      image: "/naplan/tutor1.jpg",
    },
    {
      name: "Mr. Daniel Lee",
      subject: "Numeracy",
      image: "/naplan/tutor2.jpg",
    },
    {
      name: "Ms. Priya Patel",
      subject: "Language Conventions",
      image: "/naplan/tutor3.jpg",
    },
  ];

  return (
    <section className="py-20 px-6 sm:px-12 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto space-y-20">

        {/* Tutors */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-center mb-8">
            Meet Our Super Tutors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {tutors.map((tutor, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-purple-50 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition"
              >
                <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden mb-4">
                  <Image
                    src={tutor.image}
                    alt={tutor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg">{tutor.name}</h3>
                <p className="text-sm text-gray-600">{tutor.subject}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-center mb-8">
            Parent FAQs
          </h2>
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
      </div>
    </section>
  );
}
