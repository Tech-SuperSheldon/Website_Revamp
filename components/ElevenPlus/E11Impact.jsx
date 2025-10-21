// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";

// export default function E11Impact() {
//   // Replace with your own images
//   const leftImage = "/e11/impact-left.png";
//   const rightImage = "/e11/impact-right.png";

//   return (
//     <section className="py-20 relative overflow-hidden">
//       <div className="max-w-5xl mx-auto text-center px-6">
//         <p className="text-xs uppercase text-[#2F5CF4] font-semibold mb-2">
//           About Super Sheldon
//         </p>
//         <h2 className="text-3xl md:text-4xl font-bold text-[#0A0F2C]">
//           Educate parents about <br />
//           <span className="text-[#2F5CF4]">the exam’s impact</span>
//         </h2>

//         <p className="mt-4 text-gray-600 leading-relaxed text-sm md:text-base">
//           Briefly explain what the 11+ is — the key to securing admission into top grammar
//           and selective schools. Highlight how performance determines future academic
//           pathways and opportunities. Introduce Super Sheldon as a trusted, personalized
//           prep partner that removes stress and boosts results.
//         </p>

//         <div className="flex justify-between mt-10 items-center">
//           <motion.div whileHover={{ scale: 1.05 }}>
//             <Image
//               src={leftImage}
//               alt="Student"
//               width={180}
//               height={180}
//               className="rounded-xl hidden md:block"
//             />
//           </motion.div>

//           <motion.div whileHover={{ scale: 1.05 }}>
//             <Image
//               src={rightImage}
//               alt="Tutor"
//               width={180}
//               height={180}
//               className="rounded-xl hidden md:block"
//             />
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }







// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";

// export default function E11Impact() {
//   const topLeftImage = "/eleven/impact/1.png";
//   const bottomRightImage = "/eleven/impact/2.png";

//   return (
//     <section className="py-20 relative overflow-hidden">
//       <div className="max-w-5xl mx-auto px-6 flex flex-col items-center">
//         {/* Top Image on Left */}
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           transition={{ duration: 0.3 }}
//           className="self-start mb-6 md:mb-10"
//         >
//           <Image
//             src={topLeftImage}
//             alt="Student"
//             width={220}
//             height={220}
//             className="rounded-2xl w-40 md:w-56"
//           />
//         </motion.div>

//         {/* Text Section */}
//         <div className="text-center">
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

//         {/* Bottom Image on Right */}
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           transition={{ duration: 0.3 }}
//           className="self-end mt-8 md:mt-12"
//         >
//           <Image
//             src={bottomRightImage}
//             alt="Tutor"
//             width={220}
//             height={220}
//             className="rounded-2xl w-40 md:w-56"
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
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center relative">
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
          <p className="text-xs uppercase text-[#2F5CF4] font-semibold mb-2">
            About Super Sheldon
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0F2C] leading-tight">
            Educate parents about <br />
            <span className="text-[#2F5CF4]">the exam’s impact</span>
          </h2>

          <p className="mt-4 text-gray-600 leading-relaxed text-sm md:text-base max-w-2xl mx-auto">
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
          className="absolute bottom-0 right-0 translate-y-1/4 hidden md:block"
        >
          <Image
            src={bottomRightImage}
            alt="Tutor"
            width={220}
            height={220}
            className="rounded-2xl w-40 md:w-52 lg:w-56"
          />
        </motion.div>
      </div>
    </section>
  );
}
