"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    // Prevent scrolling during loading
    document.body.style.overflow = "hidden";
    
    // Total animation time 
    // 1s enter + 0.5s wait + 0.5s exit logo + 0.8s grid reveal
    const timer = setTimeout(() => {
        setComplete(true);
        document.body.style.overflow = "unset";
    }, 3500);

    return () => {
        document.body.style.overflow = "unset";
        clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {!complete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
          
          {/* Grid Container */}
          <div className="absolute inset-0 grid w-full h-full"
               style={{
                 gridTemplateColumns: `repeat(20, 1fr)`,
                 gridTemplateRows: `repeat(15, 1fr)`
               }}
          >
            {Array.from({ length: 300 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 1.1 }}
                animate={{ 
                    opacity: 0,
                    scale: 0.5,
                    transition: { 
                        duration: 0.8,
                        delay: 2.2 + (Math.random() * 0.5),
                        ease: [0.76, 0, 0.24, 1]
                    }
                }}
                className="bg-slate-950 w-full h-full"
              />
            ))}
          </div>

          {/* Logo Container */}
          <motion.div 
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1, 1, 1.5],
            }}
            transition={{
                duration: 2.5,
                times: [0, 0.3, 0.8, 1],
                ease: "easeInOut"
            }}
          >
            <div className="w-32 h-32 md:w-48 md:h-48 relative">
                 <Image 
                    src="/logo.webp" 
                    alt="Logo" 
                    fill 
                    className="object-contain"
                    priority
                 />
            </div>
          </motion.div>
        </div>
      )}
      
      {complete && children}
    </>
  );
}
