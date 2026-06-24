"use client"

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

// Feature Data Array - Extensible
const FEATURES = [
  {
    id: 1,
    titleLeft: "Climb the\nLeaderboard",
    descLeft: "Compete with friends and earn points for every problem you solve.",
    titleRight: "Track Your\nProgress",
    descRight: "See where you stand among your peers and stay motivated.",
    image: "/levelup/1.png", // Placeholder for Leaderboard image
    accent: "#FFD700" // Gold
  },
  {
    id: 2,
    titleLeft: "Schedule\na Demo",
    descLeft: "Need 1-on-1 help? Book a session with an expert tutor instantly.",
    titleRight: "Expert\nGuidance",
    descRight: "Get personalized attention to master difficult concepts.",
    image: "/levelup/2.png", // Placeholder for Demo image
    accent: "#4CAF50" // Green
  },
  {
    id: 3,
    titleLeft: "Your Personal\nMenu",
    descLeft: "Access all your courses, assignments, and resources in one place.",
    titleRight: "Customized\nLearning",
    descRight: "A dashboard tailored to your grade, syllabus, and learning pace.",
    image: "/levelup/3.png", // Placeholder for Menu image
    accent: "#2196F3" // Blue
  },
];

const NSLevelUp = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map scroll progress to active index
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      // Calculate index based on scroll segments
      const newIndex = Math.min(
        Math.max(Math.floor(latest * FEATURES.length), 0),
        FEATURES.length - 1
      );
      setActiveIndex(newIndex);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  return (
    <section ref={containerRef} className="relative h-[300vh] ">
      {/* No overflow-y-auto here — it traps scroll and blocks the outer h-[300vh] scroll-driven section */}
      <div
        className="sticky top-0 flex h-dvh min-h-0 flex-col items-center justify-start overflow-clip pt-[calc(env(safe-area-inset-top,0px)+5rem)] sm:pt-[calc(env(safe-area-inset-top,0px)+5.5rem)] md:pt-[calc(env(safe-area-inset-top,0px)+4rem)] lg:pt-16"
      >

        {/* Section Header — pulled well up on phones; mb keeps clearance above mockup */}
        <div className="relative z-30 mb-2 flex w-full shrink-0 justify-center px-4 pt-0 pointer-events-none max-md:mb-1 md:mb-2 md:mt-0 md:pt-0">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="rounded-2xl bg-white/90 px-5 py-3 text-center text-2xl font-bold leading-tight text-[#e87f1e] shadow-sm backdrop-blur-sm sm:px-7 sm:py-3.5 sm:text-3xl md:px-8 md:py-4 md:text-5xl"
          >
            Try our app, LevelUp
          </motion.h2>
        </div>

        <div className="container mx-auto flex min-h-0 w-full shrink-0 flex-col items-center justify-start gap-6 px-4 py-2 max-md:pt-1 md:flex-row md:justify-center md:gap-2 md:py-4 lg:gap-3 mt-0 md:mt-1">
          
          {/* Left Text Box */}
          <div className="w-[200px] shrink-0 text-center md:text-right space-y-4 hidden md:block">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={`left-${activeIndex}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                >
                    <h3 className="text-3xl font-bold text-gray-900 whitespace-pre-line leading-tight">
                    {FEATURES[activeIndex].titleLeft}
                    </h3>
                    <p className="text-gray-600 text-lg mt-4">
                    {FEATURES[activeIndex].descLeft}
                    </p>
                </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Text (Vertical layout fallback) - Moved above phone */}
          <div className="mt-0 max-w-xs px-4 pb-4 text-center md:hidden">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={`mobile-${activeIndex}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-orange-100 shadow-sm"
                >
                     <p className="text-[#e87f1e] text-xs font-bold uppercase tracking-wider mb-1">
                        {FEATURES[activeIndex].titleLeft.split('\n')[0]}
                     </p>
                     <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">
                        {FEATURES[activeIndex].titleRight.replace('\n', ' ')}
                     </h3>
                     <p className="text-gray-600 text-xs">
                        {FEATURES[activeIndex].descLeft}
                     </p>
                </motion.div>
            </AnimatePresence>
          </div>

          {/* Central Phone Mockup & Buttons */}
          <div className="z-20 flex shrink-0 flex-col items-center gap-0">
            <div className="relative origin-top scale-[0.65] sm:scale-75 md:scale-[0.76] -mb-[170px] sm:-mb-[140px] md:-mb-[150px]">
               {/* Phone Body */}
              <div className="h-[480px] w-[240px] border-[10px] border-gray-900 bg-gray-900 relative overflow-hidden rounded-[2.5rem] shadow-2xl sm:h-[520px] sm:w-[260px] sm:border-[12px] sm:rounded-[3rem] md:h-[640px] md:w-[320px] md:border-[16px]">
                 {/* Dynamic Island / Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-2xl z-20 pointer-events-none"></div>

                 {/* Notification Bar */}
                 <div className="absolute top-0 w-full h-6 px-6 flex items-center justify-between z-20 text-black text-[8px] font-medium pt-1">
                   <span>9:41</span>
                   <div className="flex items-center gap-1">
                     <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z"/></svg>
                     <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
                   </div>
                 </div>
                
                {/* Screen Content - Driven by State */}
                <div className="w-full h-full bg-white relative">
                    <AnimatePresence mode='popLayout'>
                      <motion.div 
                          key={activeIndex}
                          className="absolute inset-0 w-full h-full"
                          initial={{ y: "100%" }}
                          animate={{ y: "0%" }}
                          exit={{ y: "-100%", opacity: 0.5 }} // Slide up effect
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                          {/* Image Placeholder / Content */}
                          <div className="w-full h-full flex items-center justify-center bg-gray-50 relative pt-6">
                               {/* Fallback Text */}
                              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-6 text-center pt-6">
                                  <span className="text-2xl font-bold mb-2">{activeIndex + 1}</span>
                                  <span className="text-sm font-medium uppercase tracking-wider text-gray-500">
                                      {FEATURES[activeIndex].titleLeft.split('\n')[0]}
                                  </span>
                              </div>
                              
                              {/* Actual Image */}
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                  src={FEATURES[activeIndex].image}
                                  alt={`LevelUp Screen ${activeIndex + 1}`}
                                  loading="lazy"
                                  className="w-full h-full object-cover relative z-10 rounded-t-2xl shadow-sm"
                                  onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                  }}
                              />
                          </div>
                      </motion.div>
                    </AnimatePresence>
                </div>
              </div>
               {/* Glow */}
               <div className="absolute -inset-4 max-md:-inset-2 bg-orange-500/10 blur-3xl -z-10 rounded-full"></div>
            </div>

            {/* App Store / Play Store Buttons */}
            <div className="grid w-full max-w-[380px] grid-cols-2 gap-3 sm:gap-4 md:max-w-[420px] md:gap-3">
              <Link href="/demo" className="flex min-h-[3.5rem] md:min-h-[4rem] items-center justify-center gap-2 rounded-2xl bg-black px-3 py-2 sm:py-4 md:py-3 text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-gray-800 active:scale-95 sm:gap-3 sm:px-4 md:gap-2">
                <svg className="w-9 h-9 md:w-10 md:h-10 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.79 3.59-.76 1.54.04 2.87.82 3.59 2.05-3.09 1.83-2.6 5.86.35 7.14-.65 1.76-1.52 3.6-2.61 3.74zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <div className="flex flex-col items-start justify-center">
                  <span className="text-[12px] md:text-[13px] uppercase tracking-wider leading-none mb-1 opacity-80">Download on the</span>
                  <span className="text-[18px] md:text-[20px] font-semibold leading-none">App Store</span>
                </div>
              </Link>
              
              <Link href="/demo" className="flex min-h-[3.5rem] md:min-h-[4rem] items-center justify-center gap-2 rounded-2xl bg-black px-3 py-2 sm:py-4 md:py-3 text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-gray-800 active:scale-95 sm:gap-3 sm:px-4 md:gap-2">
                <svg className="w-9 h-9 md:w-10 md:h-10 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.522 3.013a1.996 1.996 0 0 0-.25 1.054v15.86c0 .416.096.793.25 1.06l10.421-10.463L3.522 3.013zm11.025 9.47L4.722 2.65a2.016 2.016 0 0 1 1.258-.291c.219.01.44.053.647.16l11.66 6.643-3.74 3.32zm.542.484l3.96 3.522c1.23.699 1.23 1.833 0 2.529l-2.049 1.168-3.66-3.266 1.749-3.953zM5.385 21.053c-.347.114-.725.132-1.096-.06l10.33-10.372 3.66 3.264-11.66 6.645a2.022 2.022 0 0 1-1.234.523z"/>
                </svg>
                <div className="flex flex-col items-start justify-center">
                  <span className="text-[12px] md:text-[13px] uppercase tracking-wider leading-none mb-1 opacity-80">GET IT ON</span>
                  <span className="text-[18px] md:text-[20px] font-semibold leading-none">Google Play</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Right Text Box */}
          <div className="w-[200px] shrink-0 text-center md:text-left space-y-4 hidden md:block">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={`right-${activeIndex}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                >
                    <h3 className="text-3xl font-bold text-gray-900 whitespace-pre-line leading-tight">
                    {FEATURES[activeIndex].titleRight}
                    </h3>
                    <p className="text-gray-600 text-lg mt-4">
                    {FEATURES[activeIndex].descRight}
                    </p>
                </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>

  );
};

export default NSLevelUp;
