

// "use client";

// import { motion } from "framer-motion";
// import { Activity, UserCheck, BarChart2, Shield } from "lucide-react";

// export default function NaplanAdvantage() {
//   const features = [
//     {
//       icon: "/naplan/adv/1.png",
//       title: "Adaptive Practice",
//       desc: "Smart question sets that adjust in difficulty based on your child’s performance, ensuring steady growth and confidence.",
//     },
//     {
//       icon: "/naplan/adv/2.png",
//       title: "Expert Tutors",
//       desc: "Experienced educators who specialize in NAPLAN preparation and provide personalized, actionable feedback every session.",
//     },
//     {
//       icon: "/naplan/adv/3.png",
//       title: "Clear Progress",
//       desc: "Easy-to-understand progress dashboards, detailed reports, and insights to help parents track improvement in real time.",
//     },
//     {
//       icon: "/naplan/adv/4.png",
//       title: "Safe and Supportive",
//       desc: "A secure, student-first environment with flexible scheduling, live chat assistance, and dedicated learning support.",
//     },
//   ];

//   return (
//     <section className="w-full py-20 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-10">
//       {/* Left Section */}
//       <motion.div
//         initial={{ opacity: 0, x: -40 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6 }}
//         className="flex-1"
//       >
//         <h4 className="text-lg md:text-xl font-semibold text-[#0A0F2C] mb-3">
//           The Supersheldon Advantage
//         </h4>
//         <h2 className="text-4xl md:text-5xl font-bold text-[#10352B] leading-tight mb-6">
//           Because Every Child Learns Differently — and That’s Our Starting Point.
//         </h2>
//         <p className="text-gray-700 leading-relaxed max-w-lg">
//           Our NAPLAN Mastery Program is designed to help students in Years 3, 5,
//           7, and 9 excel in all key test areas — Reading, Writing, Language
//           Conventions, and Numeracy. Through personalised one-on-one tutoring,
//           targeted practice, and proven strategies, students build the skills,
//           confidence, and exam techniques needed to achieve their best possible
//           results.
//         </p>
//       </motion.div>

//       {/* Right Section */}
//       <motion.div
//         initial={{ opacity: 0, x: 40 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6 }}
//         className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6"
//       >
//         {features.map((feature, index) => (
//           <motion.div
//             key={index}
//             whileHover={{ scale: 1.03 }}
//             transition={{ type: "spring", stiffness: 200, damping: 15 }}
//             className="bg-[#FF6B00] text-white rounded-xl p-6 shadow-md flex flex-col items-start justify-start"
//           >
//             <div className="w-12 h-12 mb-4 rounded-md bg-white/30 flex items-center justify-center">
//               {feature.icon} {/* render the icon directly */}
//             </div>
//             <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
//             <p className="text-sm opacity-90">{feature.desc}</p>
//           </motion.div>
//         ))}
//       </motion.div>
//     </section>
//   );
// }









"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Activity, UserCheck, BarChart2, Shield } from "lucide-react";


export default function NaplanAdvantage() {


const features = [
    {
      icon: "/naplan/adv/1.png",
      title: "Adaptive Practice",
      desc: "Smart question sets that adjust in difficulty based on your child’s performance, ensuring steady growth and confidence.",
    },
    {
      icon: "/naplan/adv/2.png",
      title: "Expert Tutors",
      desc: "Experienced educators who specialize in NAPLAN preparation and provide personalized, actionable feedback every session.",
    },
    {
      icon: "/naplan/adv/3.png",
      title: "Clear Progress",
      desc: "Easy-to-understand progress dashboards, detailed reports, and insights to help parents track improvement in real time.",
    },
    {
      icon: "/naplan/adv/4.png",
      title: "Safe and Supportive",
      desc: "A secure, student-first environment with flexible scheduling, live chat assistance, and dedicated learning support.",
    },
  ];

  return (
    <section className="w-full py-20 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-10">
      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1"
      >
        <h4 className="text-xl md:text-2xl font-bold text-[#0A0F2C] mb-3">
          The Supersheldon Advantage
        </h4>
        <h2 className="text-4xl md:text-5xl font-bold text-[#10352B] leading-tight mb-6">
          Because Every Child Learns Differently — and That’s Our Starting Point.
        </h2>
        <p className="text-gray-700 leading-relaxed max-w-lg">
          Our NAPLAN Mastery Program is designed to help students in Years 3, 5,
          7, and 9 excel in all key test areas — Reading, Writing, Language
          Conventions, and Numeracy. Through personalised one-on-one tutoring,
          targeted practice, and proven strategies, students build the skills,
          confidence, and exam techniques needed to achieve their best possible
          results.
        </p>
      </motion.div>

      {/* Right Section */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="bg-[#FF6B00] text-white rounded-xl p-6 shadow-md flex flex-col items-start justify-start"
          >
            <div className="w-12 h-12 mb-4 rounded-md flex items-center justify-center">
              <Image
                src={feature.icon}
                alt={feature.title}
                width={36}
                height={36}
              />
            </div>
            <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
            <p className="text-sm opacity-90">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}








