// "use client";

// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";

// export default function E11Choose() {
//   const features = [
//     {
//       title: "Personalized 1:1 Learning",
//       desc: "300+ Total Tutor",
//     },
//     {
//       title: "AI-Powered Adaptive Practice Papers",
//       desc: "2000+ Total Worksheet",
//     },
//     {
//       title: "Real-Time Progress Analytics",
//       desc: "70 Total Courses",
//     },
//     {
//       title: "Expert Tutors Who Specialize in 11+ Prep",
//       desc: "AI Tutor",
//     },
//   ];

//   return (
//     <section className="py-16 ">
//       <div className="max-w-6xl mx-auto px-6">
//         <p className="text-xs uppercase font-semibold text-gray-700 mb-2">
//           The Super Sheldon Advantage
//         </p>
//         <h2 className="text-3xl md:text-4xl font-bold text-[#0A0F2C]">
//           Why Parents Choose <span className="text-[#2F5CF4]">Super Sheldon</span>
//         </h2>

//         <div className="grid md:grid-cols-4 gap-6 mt-10">
//           {features.map((f, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.05 }}
//               className="bg-white rounded-2xl shadow-sm p-6 flex flex-col justify-between"
//             >
//               <div>
//                 <h3 className="text-lg font-semibold text-[#0A0F2C] mb-1">{f.title}</h3>
//                 <p className="text-gray-600 text-sm">{f.desc}</p>
//               </div>
//               <div className="mt-4">
//                 <ArrowRight className="text-[#2F5CF4]" />
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }










"use client";

import { motion } from "framer-motion";
import { ArrowRight, Brain, BarChart3, UserCheck, FileText } from "lucide-react";

export default function E11Choose() {
  const features = [
    {
      icon: <UserCheck className="w-5 h-5 text-[#2F5CF4]" />,
      title: "Personalized 1:1 Learning",
      desc: "300+ Total Tutors",
    },
    {
      icon: <Brain className="w-5 h-5 text-[#2F5CF4]" />,
      title: "AI-Powered Adaptive Practice Papers",
      desc: "2000+ Total Worksheets",
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-[#2F5CF4]" />,
      title: "Real-Time Progress Analytics",
      desc: "70 Total Courses",
    },
    {
      icon: <FileText className="w-5 h-5 text-[#2F5CF4]" />,
      title: "Expert Tutors Who Specialize in 11+ Prep",
      desc: "AI Tutor",
    },
  ];

  return (
    <section className="py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto bg-[#8AB9FF] rounded-[2rem] p-8 md:p-12 border border-gray-100"
      >
        {/* Left-Aligned Heading */}
        <div className="mb-8">
          <span className="px-5 py-2 bg-white text-[#2F5CF4] text-xs font-semibold uppercase rounded-full tracking-wide">
            The Super Sheldon Advantage
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0F2C] mt-3">
            Why Parents Choose <span className="text-[#2F5CF4]">Super Sheldon</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-6 flex flex-col justify-between border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              {/* Text Content */}
              <div>
                <h3 className="text-lg font-semibold text-[#0A0F2C] mb-1">
                  {f.title}
                </h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>

              {/* Bottom Icon */}
              <div className="mt-5 flex items-center">
                <div className="bg-[#EAF0FF] w-10 h-10 flex items-center justify-center rounded-full">
                  {f.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
