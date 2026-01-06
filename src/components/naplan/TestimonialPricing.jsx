// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";

// export default function TestimonialsPricing() {
//   return (
//     <section className="py-16 px-6 sm:px-12 bg-orange-50">
//       <div className="max-w-6xl mx-auto space-y-20">
//         {/* Testimonials */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
//         >
//           <div className="bg-white p-6 rounded-2xl shadow">
//             <p className="text-gray-600 text-sm italic mb-4">
//               “SuperSheldon helped Mia feel calm and prepared. Her reading score jumped two bands.”
//             </p>
//             <div className="text-sm text-gray-500">Parent of Year 5 Student</div>
//           </div>
//           <div className="relative w-full h-[200px] sm:h-[250px] rounded-2xl overflow-hidden">
//             <Image src="/naplan/students.jpg" alt="Students" fill className="object-cover" />
//           </div>
//         </motion.div>

//         {/* Pricing */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="grid grid-cols-1 sm:grid-cols-2 gap-8"
//         >
//           <div className="bg-white p-8 rounded-2xl shadow text-center">
//             <h3 className="text-2xl font-bold mb-2">$79/mo</h3>
//             <p className="text-gray-600 mb-4">Monthly plan. Cancel anytime.</p>
//             <ul className="text-sm text-gray-600 space-y-1 mb-6">
//               <li>✓ 1 live session/week</li>
//               <li>✓ Unlimited practice</li>
//               <li>✓ Progress reports</li>
//             </ul>
//             <button
//               onClick={() => {}}
//               className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
//             >
//               Start Monthly
//             </button>
//           </div>

//           <div className="bg-white p-8 rounded-2xl shadow text-center border-2 border-purple-600">
//             <h3 className="text-2xl font-bold mb-2">$399</h3>
//             <p className="text-gray-600 mb-4">Full course (10 weeks) — best value</p>
//             <ul className="text-sm text-gray-600 space-y-1 mb-6">
//               <li>✓ 10 live sessions</li>
//               <li>✓ Mock tests + reviews</li>
//               <li>✓ Certificate of completion</li>
//             </ul>
//             <button
//               onClick={() => {}}
//               className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
//             >
//               Enroll Full Course
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }










"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function TestimonialsPricing() {
  return (
    <section className="py-16 px-6 sm:px-12 bg-orange-50">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
        >
          {/* Testimonial Box */}
          <div className="bg-white p-8 rounded-2xl shadow flex flex-col justify-center h-[200px] sm:h-[250px]">
            <p className="text-gray-600 text-base sm:text-lg italic mb-4 leading-relaxed">
              “SuperSheldon helped Mia feel calm and prepared. Her reading score jumped two bands.”
            </p>
            <div className="text-sm text-gray-500 mt-auto">Parent of Year 5 Student</div>
          </div>

          {/* Student Image */}
          <div className="relative w-full h-[200px] sm:h-[250px] rounded-2xl overflow-hidden">
            <Image src="/k1b.png" alt="Students" fill className="object-cover" />
          </div>
        </motion.div>

        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8"
        >
          <div className="bg-white p-8 rounded-2xl shadow text-center">
            <h3 className="text-2xl font-bold mb-2">$79/mo</h3>
            <p className="text-gray-600 mb-4">Monthly plan. Cancel anytime.</p>
            <ul className="text-sm text-gray-600 space-y-1 mb-6">
              <li>✓ 1 live session/week</li>
              <li>✓ Unlimited practice</li>
              <li>✓ Progress reports</li>
            </ul>
            <button
              onClick={() => {}}
              className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
            >
              Start Monthly
            </button>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow text-center border-2 border-purple-600">
            <h3 className="text-2xl font-bold mb-2">$399</h3>
            <p className="text-gray-600 mb-4">Full course (10 weeks) — best value</p>
            <ul className="text-sm text-gray-600 space-y-1 mb-6">
              <li>✓ 10 live sessions</li>
              <li>✓ Mock tests + reviews</li>
              <li>✓ Certificate of completion</li>
            </ul>
            <button
              onClick={() => {}}
              className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
            >
              Enroll Full Course
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
