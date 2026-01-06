

// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import { CheckCircle2, BookOpen, Brain, LineChart, Users } from "lucide-react";

// export default function E11Structure() {
//   const leftImage = "/eleven/c1.png";

//   const items = [
//     {
//       icon: <BookOpen className="w-8 h-8 text-[#2F5CF4]" />,
//       text: "Diagnostic Test to Identify Strengths & Gaps",
//     },
//     {
//       icon: <Brain className="w-8 h-8 text-[#2F5CF4]" />,
//       text: "Personalized Learning Plan for English, Maths, Verbal & Non-Verbal Reasoning",
//     },
//     {
//       icon: <Users className="w-8 h-8 text-[#2F5CF4]" />,
//       text: "1:1 Live Sessions + AI Adaptive Practice Papers",
//     },
//     {
//       icon: <LineChart className="w-8 h-8 text-[#2F5CF4]" />,
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
//             className="rounded-2xl w-full max-w-[450px] object-cover"
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
//                 className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-start hover:-translate-y-1 transition-all duration-300"
//               >
//                 {/* Left-aligned Icon */}
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

export default function E11Structure() {
  const leftImage = "/eleven/c1.png";

  const items = [
    {
      image: "/eleven/str/1.png",
      text: "Diagnostic Test to Identify Strengths & Gaps",
    },
    {
      image: "/eleven/str/2.png",
      text: "Personalized Learning Plan for English, Maths, Verbal & Non-Verbal Reasoning",
    },
    {
      image: "/eleven/str/3.png",
      text: "1:1 Live Sessions + AI Adaptive Practice Papers",
    },
    {
      image: "/eleven/str/4.png",
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
                {/* Left-aligned Image */}
                <div className="mb-4 flex items-center justify-center bg-[#EAF0FF] rounded-full w-14 h-14 p-2">
                  <Image
                    src={item.image}
                    alt={`Icon ${i + 1}`}
                    width={32}
                    height={32}
                    className="object-contain w-full h-full"
                  />
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
