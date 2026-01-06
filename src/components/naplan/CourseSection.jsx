// "use client";

// import { motion } from "framer-motion";

// export default function CourseSection() {
//   const steps = [
//     "Identify strengths and focus areas.",
//     "Tailored plan across all domains.",
//     "Weekly sessions and adaptive practice.",
//     "Reports and realistic mock tests.",
//   ];

//   const inclusions = [
//     ["Reading", "Comprehension strategies", "Inference & vocabulary drills", "Timed sets"],
//     ["Writing", "Narrative & persuasive prompts", "Rubrics + feedback", "Editing checklists"],
//     ["Language Conventions", "Grammar & spelling drills", "Error correction", "Adaptive pathways"],
//     ["Numeracy", "Algebra & measurement", "Worked examples", "Mixed-topic revision"],
//   ];

//   return (
//     <section className="bg-orange-500 text-white py-16 px-6 sm:px-12">
//       <div className="max-w-6xl mx-auto">
//         <motion.h2
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-2xl font-bold mb-10 text-center"
//         >
//           Course Structure / How It Works
//         </motion.h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
//           {steps.map((step, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1 }}
//               className="bg-orange-600 rounded-2xl p-5 shadow"
//             >
//               <p className="text-sm">{step}</p>
//             </motion.div>
//           ))}
//         </div>

//         <motion.h3
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="text-xl font-semibold mb-8 text-center"
//         >
//           What’s Included in the NAPLAN Course
//         </motion.h3>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-gray-900">
//           {inclusions.map((col, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1 }}
//               className="bg-white rounded-2xl p-6 text-sm"
//             >
//               {col.map((item, j) => (
//                 <p key={j} className={j === 0 ? "font-semibold text-base mb-2" : "text-gray-600"}>
//                   {item}
//                 </p>
//               ))}
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }










"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  PenTool,
  FileText,
  Calculator,
  CheckCircle,
} from "lucide-react";

export default function CourseSection() {
  const steps = [
    "Identify strengths and focus areas.",
    "Tailored plan across all domains.",
    "Weekly sessions and adaptive practice.",
    "Reports and realistic mock tests.",
  ];

  const inclusions = [
    {
      title: "Reading",
      icon: <BookOpen className="w-6 h-6 text-orange-500" />,
      items: [
        "Comprehension strategies",
        "Inference & vocabulary drills",
        "Timed sets",
      ],
    },
    {
      title: "Writing",
      icon: <PenTool className="w-6 h-6 text-orange-500" />,
      items: [
        "Narrative & persuasive prompts",
        "Rubrics + feedback",
        "Editing checklists",
      ],
    },
    {
      title: "Language Conventions",
      icon: <FileText className="w-6 h-6 text-orange-500" />,
      items: [
        "Grammar & spelling drills",
        "Error correction",
        "Adaptive pathways",
      ],
    },
    {
      title: "Numeracy",
      icon: <Calculator className="w-6 h-6 text-orange-500" />,
      items: [
        "Algebra & measurement",
        "Worked examples",
        "Mixed-topic revision",
      ],
    },
  ];

  return (
    <section className="bg-gradient-to-b from-orange-500 to-orange-600 text-white py-20 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-12 text-center"
        >
          Course Structure / How It Works
        </motion.h2>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-orange-700/40 backdrop-blur-sm border border-orange-400/30 rounded-2xl p-5 shadow hover:shadow-lg hover:bg-orange-700/60 transition"
            >
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-white mt-0.5" />
                <p className="text-sm leading-relaxed">{step}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Inclusions */}
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold mb-10 text-center"
        >
          What’s Included in the NAPLAN Course
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-gray-900">
          {inclusions.map((col, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-100 p-2 rounded-full">
                  {col.icon}
                </div>
                <h4 className="font-semibold text-base text-gray-800">
                  {col.title}
                </h4>
              </div>
              <ul className="space-y-2">
                {col.items.map((item, j) => (
                  <li
                    key={j}
                    className="text-sm text-gray-600 flex items-start gap-2"
                  >
                    <span className="mt-1 w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
