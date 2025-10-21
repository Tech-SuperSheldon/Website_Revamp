// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import { CheckCircle2 } from "lucide-react";

// export default function E11Structure() {
//   const leftImage = "/eleven/c1.png";

//   const items = [
//     "Diagnostic Test to Identify Strengths & Gaps",
//     "Personalized Learning Plan for English, Maths, Verbal & Non-Verbal Reasoning",
//     "1:1 Live Sessions + AI Adaptive Practice Papers",
//     "Continuous Progress Tracking & Parent Reports",
//   ];

//   return (
//     <section className="py-20 ">
//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6">
//         <motion.div whileHover={{ scale: 1.02 }}>
//           <Image
//             src={leftImage}
//             alt="Students learning"
//             width={500}
//             height={400}
//             className="rounded-2xl w-full"
//           />
//         </motion.div>

//         <div>
//           <p className="text-xs uppercase font-semibold text-[#2F5CF4] mb-2">
//             Our Values
//           </p>
//           <h2 className="text-3xl md:text-4xl font-bold text-[#0A0F2C] mb-6">
//             Course <span className="text-[#2F5CF4]">Structure</span>
//           </h2>

//           <ul className="space-y-4">
//             {items.map((item, i) => (
//               <li key={i} className="flex items-start gap-3">
//                 <CheckCircle2 className="text-[#2F5CF4] mt-1" />
//                 <span className="text-gray-700 text-base">{item}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// }










// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import { CheckCircle2 } from "lucide-react";

// export default function E11Structure() {
//   const leftImage = "/eleven/c1.png";

//   const items = [
//     {
//       icon: <CheckCircle2 className="w-8 h-8 text-[#2F5CF4]" />,
//       text: "Diagnostic Test to Identify Strengths & Gaps",
//     },
//     {
//       icon: <CheckCircle2 className="w-8 h-8 text-[#2F5CF4]" />,
//       text: "Personalized Learning Plan for English, Maths, Verbal & Non-Verbal Reasoning",
//     },
//     {
//       icon: <CheckCircle2 className="w-8 h-8 text-[#2F5CF4]" />,
//       text: "1:1 Live Sessions + AI Adaptive Practice Papers",
//     },
//     {
//       icon: <CheckCircle2 className="w-8 h-8 text-[#2F5CF4]" />,
//       text: "Continuous Progress Tracking & Parent Reports",
//     },
//   ];

//   return (
//     <section className="py-20">
//       <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center px-6">
//         {/* LEFT IMAGE */}
//         <motion.div
//           whileHover={{ scale: 1.03 }}
//           transition={{ duration: 0.3 }}
//           className="flex justify-center"
//         >
//           <Image
//             src={leftImage}
//             alt="Students learning"
//             width={500}
//             height={400}
//             className="rounded-2xl w-full max-w-[450px] object-cover "
//           />
//         </motion.div>

//         {/* RIGHT CONTENT */}
//         <div>
//           <p className="text-xs uppercase font-semibold text-[#2F5CF4] mb-2">
//             Our Values
//           </p>
//           <h2 className="text-3xl md:text-4xl font-bold text-[#0A0F2C] mb-10">
//             Course <span className="text-[#2F5CF4]">Structure</span>
//           </h2>

//           {/* GRID OF CARDS */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {items.map((item, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.15, duration: 0.4 }}
//                 viewport={{ once: true }}
//                 className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
//               >
//                 {/* Placeholder for Logo / Icon */}
//                 <div className="mb-4 flex items-center justify-center bg-[#EAF0FF] rounded-full w-14 h-14">
//                   {item.icon}
//                 </div>
//                 <p className="text-gray-700 text-base font-medium">{item.text}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }










"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, BookOpen, Brain, LineChart, Users } from "lucide-react";

export default function E11Structure() {
  const leftImage = "/eleven/c1.png";

  const items = [
    {
      icon: <BookOpen className="w-8 h-8 text-[#2F5CF4]" />,
      text: "Diagnostic Test to Identify Strengths & Gaps",
    },
    {
      icon: <Brain className="w-8 h-8 text-[#2F5CF4]" />,
      text: "Personalized Learning Plan for English, Maths, Verbal & Non-Verbal Reasoning",
    },
    {
      icon: <Users className="w-8 h-8 text-[#2F5CF4]" />,
      text: "1:1 Live Sessions + AI Adaptive Practice Papers",
    },
    {
      icon: <LineChart className="w-8 h-8 text-[#2F5CF4]" />,
      text: "Continuous Progress Tracking & Parent Reports",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center px-6">
        {/* LEFT IMAGE */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center"
        >
          <Image
            src={leftImage}
            alt="Students learning"
            width={500}
            height={400}
            className="rounded-2xl w-full max-w-[450px] object-cover"
          />
        </motion.div>

        {/* RIGHT CONTENT */}
        <div>
          <p className="text-xs uppercase font-semibold text-[#2F5CF4] mb-2">
            Our Values
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0F2C] mb-10">
            Course <span className="text-[#2F5CF4]">Structure</span>
          </h2>

          {/* GRID OF CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.4 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-start hover:-translate-y-1 transition-all duration-300"
              >
                {/* Left-aligned Icon */}
                <div className="mb-4 flex items-center justify-center bg-[#EAF0FF] rounded-full w-14 h-14">
                  {item.icon}
                </div>
                <p className="text-gray-700 text-base font-medium">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
