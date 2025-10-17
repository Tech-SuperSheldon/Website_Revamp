// // "use client";

// // import { motion } from "framer-motion";
// // import Image from "next/image";

// // export default function HeroSection() {
// //   return (
// //     <section className="relative bg-gradient-to-r from-[#5D3FD3] to-[#8E2DE2] text-white pt-32 py-16 px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between overflow-hidden">
// //       <motion.div
// //         initial={{ opacity: 0, y: 40 }}
// //         whileInView={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.6 }}
// //         className="md:w-1/2 space-y-4 text-center md:text-left"
// //       >
// //         <h3 className="text-sm uppercase font-semibold">
// //           Fun NAPLAN Learning with Expert Tutors
// //         </h3>
// //         <h1 className="text-3xl sm:text-4xl font-bold leading-snug">
// //           Personalised lessons for Years 3, 5, 7 and 9
// //         </h1>
// //         <p className="text-sm opacity-90">
// //           Build skills and confidence across Reading, Writing, Language and Numeracy.
// //         </p>
// //         <div className="flex justify-center md:justify-start gap-4 mt-6">
// //           <button
// //             onClick={() => {}}
// //             className="bg-white text-purple-700 font-medium px-5 py-2 rounded-full shadow hover:bg-gray-100 transition"
// //           >
// //             Book Free Diagnostic
// //           </button>
// //           <button
// //             onClick={() => {}}
// //             className="border border-white px-5 py-2 rounded-full font-medium hover:bg-white/10 transition"
// //           >
// //             View Course Plans
// //           </button>
// //         </div>
// //       </motion.div>

// //       <motion.div
// //         initial={{ opacity: 0, x: 60 }}
// //         whileInView={{ opacity: 1, x: 0 }}
// //         transition={{ duration: 0.7 }}
// //         className="md:w-1/2 mt-8 md:mt-0 flex justify-center"
// //       >
// //         <div className="relative w-[300px] sm:w-[400px] h-[220px] sm:h-[300px] rounded-2xl overflow-hidden">
// //           <Image
// //             src="/naplan/home.png"
// //             alt="NAPLAN Hero"
// //             fill
// //             className="object-cover rounded-2xl"
// //           />
// //         </div>
// //       </motion.div>
// //     </section>
// //   );
// // }











// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";

// export default function HeroSection() {
//   return (
//     <section className="relative bg-gradient-to-r from-[#5D3FD3] to-[#8E2DE2] text-white pt-32 py-16 px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between overflow-hidden">
//       {/* Left text section */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="md:w-1/2 space-y-4 text-center md:text-left"
//       >
//         <h3 className="text-sm uppercase font-semibold">
//           Fun NAPLAN Learning with Expert Tutors
//         </h3>
//         <h1 className="text-3xl sm:text-4xl font-bold leading-snug">
//           Personalised lessons for Years 3, 5, 7 and 9
//         </h1>
//         <p className="text-sm opacity-90">
//           Build skills and confidence across Reading, Writing, Language and Numeracy.
//         </p>
//         <div className="flex justify-center md:justify-start gap-4 mt-6">
//           <button
//             onClick={() => {}}
//             className="bg-white text-purple-700 font-medium px-5 py-2 rounded-full shadow hover:bg-gray-100 transition"
//           >
//             Book Free Diagnostic
//           </button>
//           <button
//             onClick={() => {}}
//             className="border border-white px-5 py-2 rounded-full font-medium hover:bg-white/10 transition"
//           >
//             View Course Plans
//           </button>
//         </div>
//       </motion.div>

//       {/* Right image section */}
//       <motion.div
//         initial={{ opacity: 0, x: 60 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.7 }}
//         className="md:w-1/2 mt-10 md:mt-0 flex justify-center"
//       >
//         <div className="relative w-[360px] sm:w-[500px] md:w-[560px] h-[260px] sm:h-[350px] md:h-[400px] rounded-3xl overflow-hidden">
//           <Image
//             src="/naplan/home.png"
//             alt="NAPLAN Hero"
//             fill
//             className="object-cover object-center rounded-3xl"
//             priority
//           />
//         </div>
//       </motion.div>
//     </section>
//   );
// }









"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-[#5D3FD3] to-[#8E2DE2] text-white pt-32 py-16 px-6 sm:px-12 flex flex-col md:flex-row items-center overflow-hidden">
      {/* Left text section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 space-y-4 text-center md:text-left z-10"
      >
        <h3 className="text-sm uppercase font-semibold">
          Fun NAPLAN Learning with Expert Tutors
        </h3>
        <h1 className="text-3xl sm:text-4xl font-bold leading-snug">
          Personalised lessons for Years 3, 5, 7 and 9
        </h1>
        <p className="text-sm opacity-90">
          Build skills and confidence across Reading, Writing, Language and Numeracy.
        </p>
        <div className="flex justify-center md:justify-start gap-4 mt-6">
          <button
            onClick={() => {}}
            className="bg-white text-purple-700 font-medium px-5 py-2 rounded-full hover:bg-gray-100 transition"
          >
            Book Free Diagnostic
          </button>
          <button
            onClick={() => {}}
            className="border border-white px-5 py-2 rounded-full font-medium hover:bg-white/10 transition"
          >
            View Course Plans
          </button>
        </div>
      </motion.div>

      {/* Right image section */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="md:w-1/2 w-full mt-8 md:mt-0 flex justify-center md:justify-end"
      >
        <div className="relative sm:-mb-24 -mb-24 w-full h-64 sm:h-96 md:h-[500px]">
          <Image
            src="/naplan/home.png"
            alt="NAPLAN Hero"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}
