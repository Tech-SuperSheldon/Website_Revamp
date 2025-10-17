"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function NaplanTutors() {
  const tutors = [
    {
      name: "Ms. Alice Brown",
      subject: "Reading & Writing",
      image: "/course/Teacher1.png",
    },
    {
      name: "Mr. Daniel Lee",
      subject: "Numeracy",
      image: "/course/Teacher4.png",
    },
    {
      name: "Ms. Priya Patel",
      subject: "Language Conventions",
      image: "/course/Teacher10.png",
    },
  ];

  return (
    <section className="py-20 px-6 sm:px-12 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
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
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
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
    </section>
  );
}
