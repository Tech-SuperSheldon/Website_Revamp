





// "use client";
// import { motion } from "framer-motion";
// import Image from "next/image";

// export default function AboutSection() {
//   const features = [
//     {
//       icon: "/icons/adaptive.svg",
//       title: "Adaptive Practice",
//       desc: "Smart question sets that adjust to your child’s level.",
//     },
//     {
//       icon: "/icons/expert.svg",
//       title: "Expert Tutors",
//       desc: "Qualified NAPLAN & Selective School specialists with targeted feedback.",
//     },
//     {
//       icon: "/icons/progress.svg",
//       title: "Clear Progress",
//       desc: "Live dashboards and weekly parent reports.",
//     },
//     {
//       icon: "/icons/safe.svg",
//       title: "Safe & Supportive",
//       desc: "Secure platform, flexible scheduling, and live chat.",
//     },
//   ];

//   return (
//     <section className="py-16 sm:py-20 px-5 sm:px-10 lg:px-16 text-gray-800">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         viewport={{ once: true }}
//         className="max-w-6xl mx-auto text-center"
//       >
//         {/* Heading */}
//         <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-snug tracking-tight">
//           About{" "}
//           <span className="text-[#6D5BFF]">SuperSheldon</span> and{" "}
//           <span className="block sm:inline">Why NAPLAN Matters</span>
//         </h2>

//         {/* Subtext */}
//         <p className="text-gray-600 max-w-2xl mx-auto mb-14 text-base sm:text-lg leading-relaxed">
//           We combine proven pedagogy with adaptive practice so every learner gets exactly what they need,
//           while NAPLAN highlights essential skills for success.
//         </p>

//         {/* Features Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
//           {features.map((f, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1 }}
//               viewport={{ once: true }}
//               className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all p-6 sm:p-8 text-left flex flex-col items-start"
//             >
//               {/* Icon */}
//               <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-5">
//                 <Image
//                   src={f.icon}
//                   alt={f.title}
//                   width={36}
//                   height={36}
//                   className="object-contain"
//                 />
//               </div>

//               {/* Title */}
//               <h3 className="font-semibold text-lg sm:text-xl text-gray-900 mb-2">
//                 {f.title}
//               </h3>

//               {/* Description */}
//               <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
//                 {f.desc}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </section>
//   );
// }










"use client";
import { motion } from "framer-motion";
import { Activity, Users, BarChart2, Shield } from "lucide-react"; // import required Lucide icons

export default function AboutSection() {
  const features = [
    {
      icon: "Activity",
      title: "Adaptive Practice",
      desc: "Smart question sets that adjust to your child’s level.",
    },
    {
      icon: "Users",
      title: "Expert Tutors",
      desc: "Qualified NAPLAN & Selective School specialists with targeted feedback.",
    },
    {
      icon: "BarChart2",
      title: "Clear Progress",
      desc: "Live dashboards and weekly parent reports.",
    },
    {
      icon: "Shield",
      title: "Safe & Supportive",
      desc: "Secure platform, flexible scheduling, and live chat.",
    },
  ];

  // Map icon name strings to Lucide icon components
  const lucideIcons = {
    Activity: Activity,
    Users: Users,
    BarChart2: BarChart2,
    Shield: Shield,
  };

  return (
    <section className="py-16 sm:py-20 px-5 sm:px-10 lg:px-16 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center"
      >
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-snug tracking-tight">
          About{" "}
          <span className="text-[#6D5BFF]">SuperSheldon</span> and{" "}
          <span className="block sm:inline">Why NAPLAN Matters</span>
        </h2>

        {/* Subtext */}
        <p className="text-gray-600 max-w-2xl mx-auto mb-14 text-base sm:text-lg leading-relaxed">
          We combine proven pedagogy with adaptive practice so every learner gets exactly what they need,
          while NAPLAN highlights essential skills for success.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {features.map((f, i) => {
            const IconComponent = lucideIcons[f.icon]; // get the corresponding Lucide icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all p-6 sm:p-8 text-left flex flex-col items-start"
              >
                {/* Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-5">
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500" />
                </div>

                {/* Title */}
                <h3 className="font-semibold text-lg sm:text-xl text-gray-900 mb-2">
                  {f.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
