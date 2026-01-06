"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Image from "next/image";

const avatars = [
  "/avatars/avatar-1.png",
  "/avatars/avatar-2.png",
  "/avatars/avatar-3.png",
  "/avatars/avatar-4.png",
];

export function NewHeroSection() {
  return (
    <section className="w-full py-12 md:py-20 lg:py-24 relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column: Title and Form */}
          <div className="flex flex-col space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Give Your Child the <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-purple-600">
                Academic Edge
              </span>
            </h1>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: false, margin: "-50px" }}
               transition={{ delay: 0.2 }}
               className="bg-white rounded-2xl shadow-2xl shadow-orange-500/10 border border-slate-100 p-8 md:p-10"
             >
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-slate-900">Book Your Free Assessment</h3>
                    <p className="text-slate-500 mt-2">Get a personalised learning plan today.</p>
                </div>

                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Your Name</label>
                        <Input type="text" placeholder="Enter your full name" className="h-14 bg-slate-50 border-slate-200 focus-visible:ring-purple-500 text-base" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Email</label>
                            <Input type="email" placeholder="john@example.com" className="h-14 bg-slate-50 border-slate-200 focus-visible:ring-purple-500 text-base" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Phone Number</label>
                            <Input type="tel" placeholder="+44 7700 900000" className="h-14 bg-slate-50 border-slate-200 focus-visible:ring-purple-500 text-base" />
                        </div>
                    </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Child's Age/Year</label>
                            <Input type="text" placeholder="e.g. Year 5" className="h-14 bg-slate-50 border-slate-200 focus-visible:ring-purple-500 text-base" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Subject of Interest</label>
                             <div className="relative">
                                <select className="w-full h-14 px-6 py-2 bg-slate-50 border border-slate-200 rounded-full text-base shadow-sm placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:cursor-not-allowed disabled:opacity-50 appearance-none">
                                    <option value="" disabled selected>Select subject</option>
                                    <option value="english">English</option>
                                    <option value="maths">Maths</option>
                                    <option value="both">Both</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button className="w-full h-14 text-lg font-bold bg-linear-to-r from-orange-500 to-purple-600 hover:opacity-90 transition-all shadow-lg shadow-orange-500/20 mt-2">
                        Get Your Free Assessment
                    </Button>
                </form>
             </motion.div>
          </div>

          {/* Right Column: Details, Boxes, Scroller */}
          <div className="flex flex-col space-y-12 lg:pt-12">
            <div className="space-y-6">
                <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium">
                  SuperSheldon provides expert 1-to-1 tutoring in English and Maths. 
                  Our personalised approach builds confidence and helps students achieve their full potential.
                </p>
                <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                        {avatars.map((src, i) => (
                            <div key={i} className="w-12 h-12 rounded-full border-2 border-white overflow-hidden relative">
                                <Image 
                                    src={src} 
                                    alt={`User ${i+1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className="flex text-yellow-400 text-sm">★★★★★</div>
                        <div className="text-sm font-medium text-slate-600">Trusted by 2000+ Students</div>
                    </div>
                </div>
            </div>

            {/* Two Big Equal Rectangles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="aspect-2/1 bg-orange-50 rounded-3xl p-6 flex flex-col justify-between border border-orange-100 group hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                        📚
                    </div>
                    <div>
                        <h4 className="text-2xl font-bold text-slate-900 mb-2">English</h4>
                        <p className="text-slate-600 font-medium">Ofsted aligned curriculum for all ages.</p>
                    </div>
                </div>
                <div className="aspect-2/1 bg-purple-50 rounded-3xl p-6 flex flex-col justify-between border border-purple-100 group hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                        🔢
                    </div>
                    <div>
                        <h4 className="text-2xl font-bold text-slate-900 mb-2">Maths</h4>
                        <p className="text-slate-600 font-medium">Mastery based learning approach.</p>
                    </div>
                </div>
            </div>

            {/* Scroller */}
            <div className="w-full">
                 <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Accredited By</p>
                 <div className="w-full overflow-hidden bg-white/50 rounded-xl py-6 border border-slate-100">
                     <div className="relative flex overflow-x-hidden group">
                        <div className="animate-marquee whitespace-nowrap flex items-center gap-16 px-6">
                            <span className="text-xl font-bold text-slate-400 flex items-center gap-2">Google <span className="text-slate-300 font-normal">Reviews</span></span>
                            <span className="text-xl font-bold text-slate-400">Trustpilot</span>
                            {/* <span className="text-xl font-bold text-slate-400">Ofsted</span>
                            <span className="text-xl font-bold text-slate-400">Gov.uk</span> */}
                             <span className="text-xl font-bold text-slate-400 flex items-center gap-2">Google <span className="text-slate-300 font-normal">Reviews</span></span>
                            <span className="text-xl font-bold text-slate-400">Trustpilot</span>
                            {/* <span className="text-xl font-bold text-slate-400">Ofsted</span>
                            <span className="text-xl font-bold text-slate-400">Gov.uk</span> */}
                             <span className="text-xl font-bold text-slate-400 flex items-center gap-2">Google <span className="text-slate-300 font-normal">Reviews</span></span>
                            <span className="text-xl font-bold text-slate-400">Trustpilot</span>
                            {/* <span className="text-xl font-bold text-slate-400">Ofsted</span>
                            <span className="text-xl font-bold text-slate-400">Gov.uk</span> */}
                        </div>
                     </div>
                 </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
