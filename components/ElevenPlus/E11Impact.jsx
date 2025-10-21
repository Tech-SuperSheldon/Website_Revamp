

// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";

// export default function E11Impact() {
//   const topLeftImage = "/eleven/impact/1.png";
//   const bottomRightImage = "/eleven/impact/2.png";

//   return (
//     <section className="py-20 relative overflow-hidden">
//       <div className="max-w-5xl mx-auto px-6 flex flex-col items-center relative">
//         {/* Top Image (Left) — overlaps slightly downward */}
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           transition={{ duration: 0.3 }}
//           className="absolute -top-10 left-0 hidden md:block"
//         >
//           <Image
//             src={topLeftImage}
//             alt="Student"
//             width={220}
//             height={220}
//             className="rounded-2xl w-40 md:w-52 lg:w-56"
//           />
//         </motion.div>

//         {/* Text Section */}
//         <div className="text-center relative z-10">
//           <p className="text-xs uppercase text-[#2F5CF4] font-semibold mb-2">
//             About Super Sheldon
//           </p>
//           <h2 className="text-3xl md:text-4xl font-bold text-[#0A0F2C] leading-tight">
//             Educate parents about <br />
//             <span className="text-[#2F5CF4]">the exam’s impact</span>
//           </h2>

//           <p className="mt-4 text-gray-600 leading-relaxed text-sm md:text-base max-w-2xl mx-auto">
//             Briefly explain what the 11+ is — the key to securing admission into top grammar
//             and selective schools. Highlight how performance determines future academic
//             pathways and opportunities. Introduce Super Sheldon as a trusted, personalized
//             prep partner that removes stress and boosts results.
//           </p>
//         </div>

//         {/* Bottom Image (Right) — overlaps slightly upward */}
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           transition={{ duration: 0.3 }}
//           className="absolute bottom-0 right-0 translate-y-1/4 hidden md:block"
//         >
//           <Image
//             src={bottomRightImage}
//             alt="Tutor"
//             width={220}
//             height={220}
//             className="rounded-2xl w-40 md:w-52 lg:w-56"
//           />
//         </motion.div>
//       </div>
//     </section>
//   );
// }







"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function E11Impact() {
  const topLeftImage = "/eleven/impact/1.png";
  const bottomRightImage = "/eleven/impact/2.png";

  return (
    <section className="py-20  px-6">
      {/* Rounded Box Background */}
      <div className="max-w-5xl mx-auto bg-[#8AB9FF] rounded-[2rem] p-10 relative overflow-hidden flex flex-col items-center">
        {/* Top Image (Left) — overlaps slightly downward */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="absolute -top-10 left-0 hidden md:block"
        >
          <Image
            src={topLeftImage}
            alt="Student"
            width={220}
            height={220}
            className="rounded-2xl w-40 md:w-52 lg:w-56"
          />
        </motion.div>

        {/* Text Section */}
        <div className="text-center relative z-10">
          <p className="text-xs  uppercase text-[#2F5CF4] font-semibold mb-2">
            About Super Sheldon
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0F2C] leading-tight">
            Educate parents about <br />
            <span className="text-[#2F5CF4]">the exam’s impact</span>
          </h2>

          <p className="mt-4 text-white leading-relaxed text-sm md:text-base max-w-2xl mx-auto">
            Briefly explain what the 11+ is — the key to securing admission into top grammar
            and selective schools. Highlight how performance determines future academic
            pathways and opportunities. Introduce Super Sheldon as a trusted, personalized
            prep partner that removes stress and boosts results.
          </p>
        </div>

        {/* Bottom Image (Right) — overlaps slightly upward */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-2 right-0 translate-y-1/4 hidden md:block"
        >
          <Image
            src={bottomRightImage}
            alt="Tutor"
            width={220}
            height={220}
            className="rounded-2xl scale-[1.2] w-40 md:w-52 lg:w-56"
          />
        </motion.div>
      </div>
    </section>
  );
}
