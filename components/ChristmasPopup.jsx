// 'use client';

// import React from 'react';
// import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X, Star, Sparkles } from 'lucide-react';

// const ChristmasPopup = ({ isOpen, onClose }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          
//           {/* Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
//           />

//           {/* Modal Content */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 20 }}
//             transition={{ type: 'spring', damping: 25, stiffness: 300 }}
//             className="relative w-full max-w-lg bg-white shadow-2xl rounded-3xl overflow-hidden z-10"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Close Icon */}
//             <button
//               onClick={onClose}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-full transition-all z-20"
//             >
//               <X size={24} />
//             </button>

//             <div className="p-6 md:p-8 flex flex-col items-center text-center">
              
//               {/* Top Logo */}
//               <div className="mb-4 relative h-12 w-48">
//                 <Image 
//                   src="/Final-Logo-bg-removed.png" 
//                   alt="Logo" 
//                   fill 
//                   className="object-contain" 
//                   priority
//                 />
//               </div>

//               {/* Main Image */}
//               <div className="w-full relative h-48 md:h-56 rounded-2xl overflow-hidden mb-6 shadow-md border border-orange-100">
//                 <Image
//                   src="/christmas_impg.png"
//                   alt="Christmas Celebration"
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               {/* Headline */}
//               <h2 className="text-3xl md:text-4xl font-extrabold text-orange-600 mb-3 drop-shadow-sm font-serif">
//                 Don&apos;t Miss the Treat!
//               </h2>

//               {/* Body Text */}
//               <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
//                 Try a free live AI & Coding class and claim <span className="font-bold text-orange-600">50% scholarship</span> on all courses today!
//               </p>

//               {/* CTA Button */}
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-3.5 px-6 rounded-xl shadow-lg shadow-orange-200 transition-colors uppercase tracking-wide mb-6"
//               >
//                 Book a Free Lesson
//               </motion.button>

//               {/* Social Proof Footer */}
//               <div className="w-full bg-orange-50 rounded-xl p-4 border border-orange-100">
//                 <div className="flex items-center justify-center gap-2 mb-1 text-orange-800 font-semibold text-sm">
//                   <Sparkles size={16} className="text-orange-500" />
//                   <span>1000+ students booked a trial in the last 24 hours!</span>
//                 </div>
                
//                 <p className="text-xs text-gray-500 mb-2">
//                   Limited slots remaining! Book now to secure your preferred time.
//                 </p>

//                 <div className="flex items-center justify-center gap-1 text-xs text-gray-500 font-medium flex-wrap">
//                   <span>Top-rated</span>
//                   <div className="flex text-yellow-400">
//                     {[...Array(5)].map((_, i) => (
//                       <Star key={i} size={12} fill="currentColor" />
//                     ))}
//                   </div>
//                   <span>4.8/5 • 700+ teachers • 135+ countries</span>
//                 </div>
//               </div>

//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default ChristmasPopup;







'use client';

import { useOpenDemoBooking } from './utils/navigation';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Sparkles } from 'lucide-react';



const ChristmasPopup = ({ color = 'orange' }) => {
  // 1. State is now handled INSIDE the component
  const [isOpen, setIsOpen] = useState(false);

  // Resolve booking opener from hook once
  const openDemoBooking = useOpenDemoBooking();

  // 2. Automatically open after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // 3. Simple close handler
  const handleClose = () => setIsOpen(false);


  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white shadow-2xl rounded-3xl overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Icon */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-full transition-all z-20"
            >
              <X size={24} />
            </button>

            <div className="p-6 md:p-8 flex flex-col items-center text-center">
              
              {/* Top Logo */}
              <div className="mb-4 relative h-12 w-48">
                <Image 
                  src="/Final-Logo-bg-removed.png" 
                  alt="Logo" 
                  fill 
                  className="object-contain" 
                  priority
                />
              </div>

              {/* Main Image */}
              <div className="w-full relative h-48 md:h-56 rounded-2xl overflow-hidden mb-6 shadow-md border border-orange-100">
                <Image
                  src="/christmas.jpg"
                  alt="Christmas Celebration"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Headline */}
              <h2 className={`text-3xl md:text-4xl font-extrabold text-${color}-600 mb-3 drop-shadow-sm font-serif`}>
                Don&apos;t Miss the Treat!
              </h2>

              {/* Body Text */}
              <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
                Try a free live AI & Coding class and claim <span className={`font-bold text-${color}-600`}>50% scholarship</span> on all courses today!
              </p>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={openDemoBooking}
                className={`w-full bg-${color}-500 hover:bg-${color}-600 text-white font-bold text-lg py-3.5 px-6 rounded-xl shadow-lg shadow-${color}-200 transition-colors uppercase tracking-wide mb-6`}
              >
                Book a Free Lesson
              </motion.button>

              {/* Social Proof Footer */}
              <div className={`w-full bg-${color}-50 rounded-xl p-4 border border-${color}-100`}>
                <div className={`flex items-center justify-center gap-2 mb-1 text-${color}-800 font-semibold text-sm`}>
                  <Sparkles size={16} className={`text-${color}-500`} />
                  <span>1000+ students booked a trial in the last 24 hours!</span>
                </div>
                
                <p className="text-xs text-gray-500 mb-2">
                  Limited slots remaining! Book now to secure your preferred time.
                </p>

                <div className="flex items-center justify-center gap-1 text-xs text-gray-500 font-medium flex-wrap">
                  <span>Top-rated</span>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                  </div>
                  <span>4.8/5 • 700+ teachers • 135+ countries</span>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ChristmasPopup;