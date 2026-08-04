// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";

// export default function NaplanTestimonial() {
//   return (
//     <section className="py-16 px-6 sm:px-12 bg-orange-50">
//       <div className="max-w-6xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
//         >
//           {/* Testimonial Box */}
//           <div className="bg-white p-8 rounded-2xl shadow flex flex-col justify-center h-[200px] sm:h-[250px]">
//             <p className="text-gray-600 text-base sm:text-lg italic mb-4 leading-relaxed">
//               “SuperSheldon helped Mia feel calm and prepared. Her reading score jumped two bands.”
//             </p>
//             <div className="text-sm text-gray-500 mt-auto">
//               Parent of Year 5 Student
//             </div>
//           </div>

//           {/* Student Image */}
//           <div className="relative w-full h-[200px] sm:h-[250px] rounded-2xl overflow-hidden">
//             <Image
//               src="/k1b.webp"
//               alt="Students"
//               fill
//               className="object-cover"
//             />
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }









"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function NaplanTestimonial() {
  return (
    <section className="py-16 px-6 sm:px-12 bg-orange-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
        >
          {/* Testimonial Box */}
          <div className="bg-white p-8 rounded-2xl shadow flex flex-col justify-center h-[200px] sm:h-[250px]">
            <p className="text-gray-600 text-base sm:text-lg italic mb-4 leading-relaxed">
              “I am Riya, mother of Ananya in Year 5. SuperSheldon's Math Classes have been outstanding - Ananya truly Enjoys learning and has shown great improvement.”
            </p>
            <div className="text-sm text-gray-500 mt-auto">
              Parent of Year 5 Student
            </div>
          </div>

          {/* Student Image */}
          <div className="relative w-full h-[200px] sm:h-[250px] bg-white rounded-2xl overflow-hidden border-4 border-purple-200 shadow-md flex items-center justify-center">
            <Image
              src="/k2g.webp"
              alt="Students"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
