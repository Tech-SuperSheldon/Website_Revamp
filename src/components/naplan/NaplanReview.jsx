// "use client";

// import { motion } from "framer-motion";
// import { BookOpen, GraduationCap, Calculator } from "lucide-react";

// export default function NAPLANIncluded() {
//   const sections = [
//     {
//       icon: <BookOpen size={48} />,
//       title: "01. Reading",
//       points: [
//         "Understanding Informative & Narrative Texts",
//         "Summarising Main Ideas & Key Details",
//         "Comparing & Contrasting Information",
//       ],
//     },
//     {
//       icon: <GraduationCap size={48} />,
//       title: "02. Vocabulary, Grammar & Writing",
//       points: [
//         "Using Context to Work Out Meanings, Clauses, Conjunctions & Complex Sentences",
//         "Narrative with Strong Characters & Plot",
//         "Persuasive Writing – Structured Arguments",
//       ],
//     },
//     {
//       icon: <Calculator size={48} />,
//       title: "03. Numeracy",
//       points: [
//         "Multiplication, Division & Large Numbers",
//         "Fractions, Decimals & Percentages",
//         "Data, Chance & Measurement Problems",
//       ],
//     },
//   ];

//   return (
//     <section className="w-full bg-white py-20 px-4 md:px-12 flex flex-col items-center">
//       {/* Heading */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-center mb-10"
//       >
//         <h2 className="text-3xl md:text-4xl font-semibold text-[#10352B] mb-2">
//           What’s Included in the
//         </h2>
//         <h3 className="text-4xl md:text-5xl font-bold text-[#10352B]">
//           NAPLAN Course
//         </h3>
//       </motion.div>

//       {/* Cards */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         whileInView={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6 }}
//         className="bg-[#C64E27] text-white rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-stretch w-full max-w-6xl overflow-hidden"
//       >
//         {sections.map((sec, index) => (
//           <div
//             key={index}
//             className={`flex-1 flex flex-col items-center text-center p-8 border-[#ffffff33] ${
//               index !== sections.length - 1
//                 ? "md:border-r md:border-dotted"
//                 : ""
//             }`}
//           >
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.2 }}
//               className="mb-4"
//             >
//               {sec.icon}
//             </motion.div>
//             <h4 className="text-lg md:text-xl font-bold mb-3">{sec.title}</h4>
//             <ul className="space-y-1 text-sm md:text-base opacity-90 leading-relaxed">
//               {sec.points.map((point, i) => (
//                 <li key={i}>{point}</li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </motion.div>
//     </section>
//   );
// }




"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function NaplanReview() {
  const sections = [
    {
      icon: "/naplan/review/1.gif",
      title: "01. Reading",
      points: [
        "Understanding Informative & Narrative Texts",
        "Summarising Main Ideas & Key Details",
        "Comparing & Contrasting Information",
      ],
    },
    {
      icon: "/naplan/review/2.gif",
      title: "02. Vocabulary, Grammar & Writing",
      points: [
        "Using Context to Work Out Meanings, Clauses, Conjunctions & Complex Sentences",
        "Narrative with Strong Characters & Plot",
        "Persuasive Writing – Structured Arguments",
      ],
    },
    {
      icon: "/naplan/review/3.gif",
      title: "03. Numeracy",
      points: [
        "Multiplication, Division & Large Numbers",
        "Fractions, Decimals & Percentages",
        "Data, Chance & Measurement Problems",
      ],
    },
  ];

  return (
    <section className="w-full py-20 px-4 md:px-12 flex flex-col items-center">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-[#10352B] mb-2">
          What’s Included in the
        </h2>
        <h3 className="text-4xl text-orange-600 md:text-5xl font-bold text-[#10352B]">
          NAPLAN Course
        </h3>

      </motion.div>

      {/* Content Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-[#C64E27] text-white rounded-3xl flex flex-col md:flex-row w-full max-w-6xl overflow-hidden"
        style={{
          boxShadow: "12px 12px 0px #000000", // bold black shadow bottom-right
        }}
      >
        {sections.map((sec, index) => (
          <div
            key={index}
            className={`flex-1 flex flex-col items-center text-center p-8 
              border-white/50 border-dotted
              ${index !== sections.length - 1 ? "md:border-r" : ""}
              ${index !== 0 ? "border-t" : ""}
            `}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="mb-4"
            >
              <Image
                src={sec.icon}
                alt={sec.title}
                width={60}
                height={60}
                className="mx-auto"
              />
            </motion.div>

            <h4 className="text-lg md:text-xl font-bold mb-3">{sec.title}</h4>
            <ul className="space-y-1 text-sm md:text-base opacity-90 leading-relaxed">
              {sec.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
