


// "use client";
// import { motion } from "framer-motion";
// import Image from "next/image";

// export default function AnimatedImageGrid() {
//   const images = [
//     "/UK/grid/1.png",
//     "/UK/grid/2.png",
//     "/UK/grid/3.png",
//     "/UK/grid/4.png",
//   ];

//   return (
//     <div className="mx-4 md:mx-16 my-8 scale-90 bg-[#202225] rounded-3xl p-6 md:p-12">
//       {/* Heading */}
//       <div className="text-center mb-8">
//         <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
//           Join Our Vibrant Community
//         </h2>
//         <p className="text-gray-400 text-lg md:text-2xl">
//           Diverse, inclusive and fun! That's how we'd describe the SuperSheldon community.
//         </p>
//       </div>

//       {/* 2x2 Image Grid */}
//       <div className="grid grid-cols-2 gap-6">
//         {images.map((src, index) => (
//           <motion.div
//             key={index}
//             whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.3)" }}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
//             className="bg-gray-800 rounded-2xl overflow-hidden cursor-pointer"
//           >
//             <Image
//               src={src}
//               alt={`Image ${index + 1}`}
//               width={600}
//               height={600}
//               className="w-full h-64 md:h-80 lg:h-96 object-cover"
//             />
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }








"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AnimatedImageGrid() {
  const images = [
    "/UK/grid/1.png",
    "/UK/grid/2.png",
    "/UK/grid/3.png",
    "/UK/grid/4.png",
  ];

  return (
    <div className="mx-4 md:mx-16 my-8 scale-90 bg-[#202225] rounded-3xl p-6 md:p-12">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
          Join Our Vibrant Community
        </h2>
        <p className="text-gray-400 text-lg md:text-2xl">
          Diverse, inclusive and fun! That's how we'd describe the SuperSheldon community.
        </p>
      </div>

      {/* Responsive Layout */}
      <div className="flex flex-col gap-6 md:grid md:grid-cols-2">
        {images.map((src, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 12px 24px rgba(0,0,0,0.35)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
            className="relative w-full aspect-[16/9] bg-gray-800 rounded-2xl overflow-hidden cursor-pointer"
          >
            <Image
              src={src}
              alt={`Community Image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
