// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";
// import { Accessibility, MessageSquare, BarChart3 } from "lucide-react";

// export default function NaplanExperience() {
//   const experiences = [
//     {
//       icon: <Accessibility className="w-6 h-6 text-[#0A0F2C]" />,
//       title: "Easily Accessible",
//       desc: "Learning feels comfortable and intuitive with Supersheldon.",
//     },
//     {
//       icon: <MessageSquare className="w-6 h-6 text-[#0A0F2C]" />,
//       title: "Real-Time Feedback",
//       desc: "Students receive instant support during every session.",
//     },
//     {
//       icon: <BarChart3 className="w-6 h-6 text-[#0A0F2C]" />,
//       title: "Progress Tracking",
//       desc: "Parents can monitor growth and milestones effortlessly.",
//     },
//   ];

//   const experienceImage = "/naplan/ne.png"; // replace later

//   return (
//     <section className="w-full py-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
//       {/* Left Image Section */}
//       <motion.div
//         initial={{ opacity: 0, x: -40 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6 }}
//         className="flex-1 relative flex justify-center items-center"
//       >
//         <div className="relative">
//           {/* background shadow layers */}
//           <div className="absolute -bottom-6 -right-6 w-[90%] h-[90%] rounded-2xl bg-[#FFDAD1] -z-10"></div>
//           <div className="absolute -top-4 -left-4 w-[95%] h-[95%] rounded-2xl bg-[#E5E5E5] -z-10"></div>

//           {/* image placeholder */}
//           <div className="w-[420px] h-[280px] md:w-[520px] md:h-[340px] rounded-2xl bg-white overflow-hidden border border-gray-200">
//             <Image
//               src={experienceImage}
//               alt="NAPLAN experience"
//               width={520}
//               height={340}
//               className="object-cover"
//             />
//           </div>
//         </div>
//       </motion.div>

//       {/* Right Cards Section */}
//       <motion.div
//         initial={{ opacity: 0, x: 40 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6 }}
//         className="flex-1 flex flex-col gap-5"
//       >
//         <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left mb-4 text-[#0A0F2C] leading-snug">
//           The Super Sheldon Experience — In Real Time.
//         </h2>

//         {experiences.map((exp, index) => (
//           <motion.div
//             key={index}
//             whileHover={{ scale: 1.02, translateY: -2 }}
//             transition={{ type: "spring", stiffness: 200, damping: 15 }}
//             className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-[6px_6px_15px_rgba(0,0,0,0.2)]"
//           >
//             {/* Icon */}
//             <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
//               <Image
//                 src={exp.icon}
//                 alt={exp.title}
//                 width={28}
//                 height={28}
//                 className="object-contain"
//               />
//             </div>

//             <div>
//               <h3 className="font-semibold text-[#0A0F2C] text-lg">
//                 {exp.title}
//               </h3>
//               <p className="text-gray-600 text-sm">{exp.desc}</p>
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>
//     </section>
//   );
// }








"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Accessibility, MessageSquare, BarChart3 } from "lucide-react";

export default function NaplanExperience() {
  const experiences = [
    {
      icon: <Accessibility className="w-6 h-6 text-[#0A0F2C]" />,
      title: "Easily Accessible",
      desc: "Learning feels comfortable and intuitive with Supersheldon.",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-[#0A0F2C]" />,
      title: "Real-Time Feedback",
      desc: "Students receive instant support during every session.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-[#0A0F2C]" />,
      title: "Progress Tracking",
      desc: "Parents can monitor growth and milestones effortlessly.",
    },
  ];

  const experienceImage = "/naplan/ne.png"; // replace later

  return (
    <section className="w-full py-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
      {/* Left Image Section */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 relative flex justify-center items-center"
      >
        <div className="relative">
          {/* background shadow layers */}
          <div className="absolute -bottom-6 -right-6 w-[90%] h-[90%] rounded-2xl bg-[#FFDAD1] -z-10"></div>
          <div className="absolute -top-4 -left-4 w-[95%] h-[95%] rounded-2xl bg-[#E5E5E5] -z-10"></div>

          {/* image placeholder */}
          <div className="w-[420px] h-[280px] md:w-[520px] md:h-[340px] rounded-2xl bg-white overflow-hidden border border-gray-200">
            <Image
              src={experienceImage}
              alt="NAPLAN experience"
              width={520}
              height={340}
              className="object-cover"
            />
          </div>
        </div>
      </motion.div>

      {/* Right Cards Section */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex flex-col gap-5"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left mb-4 text-[#0A0F2C] leading-snug">
          The Super Sheldon Experience — In Real Time.
        </h2>

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02, translateY: -2 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-[6px_6px_15px_rgba(0,0,0,0.2)]"
          >
            {/* Icon */}
            <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
              {exp.icon} {/* render the icon component directly */}
            </div>

            <div>
              <h3 className="font-semibold text-[#0A0F2C] text-lg">
                {exp.title}
              </h3>
              <p className="text-gray-600 text-sm">{exp.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
