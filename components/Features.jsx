// "use client";

// import { useRef, useEffect, useState } from "react";
// import { motion, useViewportScroll, useTransform } from "framer-motion";

// const infoBoxes = [
//   { id: 1, title: "Easily Accessible", description: "Learning will feel very comfortable with Courslab.", color: "bg-blue-100" },
//   { id: 2, title: "Easily Accessible", description: "Learning will feel very comfortable with Courslab.", color: "bg-yellow-100" },
//   { id: 3, title: "Easily Accessible", description: "Learning will feel very comfortable with Courslab.", color: "bg-purple-100" },
// ];

// const images = [
//   { id: 1, src: "/student1.png", alt: "Student 1" },
//   { id: 2, src: "/student2.png", alt: "Student 2" },
// ];

// export default function Features() {
//   const { scrollY } = useViewportScroll();
//   const ref = useRef(null);
//   const [offsetTop, setOffsetTop] = useState(0);
//   const [height, setHeight] = useState(0);

//   useEffect(() => {
//     if (ref.current) {
//       setOffsetTop(ref.current.offsetTop);
//       setHeight(ref.current.offsetHeight);
//     }
//   }, [ref]);

//   const scrollProgress = useTransform(scrollY, [offsetTop, offsetTop + height], [0, 1]);

//   // Individual image parallax
//   const yImages = images.map((_, i) =>
//     useTransform(scrollY, [offsetTop + i * 300, offsetTop + (i + 1) * 300], [0, -50 + i * 20])
//   );

//   return (
//     <section ref={ref} className="relative py-20 bg-white overflow-hidden">
//       <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
//         {/* Left Content */}
//         <div className="flex-1 space-y-6">
//           <h2 className="text-3xl font-bold">The Smart Choice for Bright Futures</h2>
//           <p className="text-lg text-gray-700">Global Exam Expertise</p>

//           <motion.div style={{ y: useTransform(scrollY, [offsetTop, offsetTop + 500], [0, 100]) }} className="space-y-4">
//             {infoBoxes.map((box, index) => (
//               <motion.div
//                 key={box.id}
//                 className={`p-6 rounded-lg shadow-md ${box.color}`}
//                 initial={{ opacity: 0, x: -50 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.2 }}
//               >
//                 <h3 className="font-semibold">{box.title}</h3>
//                 <p className="text-gray-600">{box.description}</p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>

//         {/* Right Images */}
//         <div className="flex-1 relative space-y-10">
//           {images.map((img, index) => (
//             <motion.img
//               key={img.id}
//               src={img.src}
//               alt={img.alt}
//               className="rounded-xl shadow-lg"
//               style={{ y: yImages[index] }}
//             />
//           ))}

//           {/* Scroll Indicator */}
//           <div className="absolute bottom-0 right-0 flex flex-col items-center gap-2">
//             {images.map((_, i) => {
//               const scale = useTransform(scrollProgress, [
//                 i / images.length,
//                 (i + 1) / images.length,
//               ], [1, 1.5]);
//               return <motion.div key={i} style={{ scale }} className="w-3 h-3 bg-gray-500 rounded-full" />;
//             })}
//           </div>

//           {/* Teacher avatars */}
//           <div className="absolute bottom-0 left-0 flex items-center space-x-2 bg-white p-2 rounded-lg shadow">
//             <img className="w-8 h-8 rounded-full" src="/teacher1.jpg" alt="Teacher" />
//             <img className="w-8 h-8 rounded-full" src="/teacher2.jpg" alt="Teacher" />
//             <img className="w-8 h-8 rounded-full" src="/teacher3.jpg" alt="Teacher" />
//             <span className="text-sm font-semibold">10K+ Teachers</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


