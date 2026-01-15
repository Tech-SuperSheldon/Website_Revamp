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
    <div className="w-full flex flex-col items-center pt-20 pb-4 overflow-hidden">
      
      <button 
        onClick={openDemoBooking}
        className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-300 text-white rounded-full text-xl font-bold transition-transform hover:scale-105 hover:shadow-xl hover:opacity-90 active:scale-95 mb-12 animate-bounce-slow shadow-lg shadow-orange-500/20"
      >
        <span>Try a free class now</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        <div className="absolute inset-0 rounded-full ring-2 ring-black/20 animate-ping opacity-20" />
      </button>

      {/* Thick Separating Line */}
      <div className="w-full h-1 bg-gray-900 mb-12" />

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
