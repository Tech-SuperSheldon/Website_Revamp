"use client";
import React from "react";
import { Anton } from "next/font/google";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useOpenDemoBooking } from "../utils/navigation";

const anton = Anton({ subsets: ["latin"], weight: ["400"] });

export function FooterSignature() {
  const openDemoBooking = useOpenDemoBooking();
  return (
    <div className="w-full flex flex-col items-center pt-2 md:pt-4 pb-4 overflow-hidden">
      


      {/* Thick Separating Line */}
      <div className="w-full h-1 bg-gray-900 mb-2 md:mb-4" />

      {/* Signature */}
      <div 
        className={`flex items-center justify-center gap-2 font-black text-black whitespace-nowrap opacity-80 ${anton.className}`}
        style={{
          fontSize: "13vw",
          lineHeight: "1",
          maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
        }}
      >
        <span className="tracking-tighter">SuperSheld</span>
        <div 
            className="rounded-full relative overflow-hidden shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.1)]"
             style={{
                width: "0.8em",
                height: "0.8em",
            }}
        >
                {/* Rolling Map Texture */}
                <div 
                    className="absolute inset-0 bg-[url('/world-map.png')] bg-cover opacity-80"
                    style={{ 
                        backgroundSize: '200% 100%',
                        animation: 'spin-globe 20s linear infinite'
                    }}
                 />
                 {/* Shadow Overlay */}
                 <div className="absolute inset-0 rounded-full shadow-[inset_10px_10px_30px_rgba(0,0,0,0.1)] mix-blend-multiply" />
        </div>
        <span className="tracking-tighter">n</span>
      </div>
      <style jsx global>{`
        @keyframes spin-globe {
          0% { background-position: 0 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        .animate-bounce-slow {
            animation: bounce-slow 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
