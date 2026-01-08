"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Image from "next/image";

const avatars = [
  "/avatars/s1.png",
  "/avatars/s2.png",
  "/avatars/s3.png",
  "/avatars/s4.png",
];

export function NewHeroSection() {
  return (
    <section className="w-full py-12 md:py-20 lg:py-24 relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column: Title and Form */}
          <div className="flex flex-col space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Give Your Child the <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-600">
                Academic Edge
              </span>
            </h1>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: false, margin: "-50px" }}
               transition={{ delay: 0.2 }}
               className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 p-6 md:p-8"
             >
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-900">Book Your Free Assessment</h3>
                    <p className="text-slate-500 text-sm mt-1">Get a personalised learning plan today.</p>
                </div>

                <form className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs uppercase tracking-wide font-bold text-slate-500">Your Name</label>
                        <Input type="text" placeholder="Enter your full name" className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-purple-500 text-sm" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs uppercase tracking-wide font-bold text-slate-500">Email</label>
                            <Input type="email" placeholder="john@example.com" className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-purple-500 text-sm" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs uppercase tracking-wide font-bold text-slate-500">Phone Number</label>
                            <Input type="tel" placeholder="+44 7700 900000" className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-purple-500 text-sm" />
                        </div>
                    </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs uppercase tracking-wide font-bold text-slate-500">Child's Age/Year</label>
                            <Input type="text" placeholder="e.g. Year 5" className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-purple-500 text-sm" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs uppercase tracking-wide font-bold text-slate-500">Subject of Interest</label>
                             <div className="relative">
                                <select className="w-full h-11 px-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm shadow-sm placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:cursor-not-allowed disabled:opacity-50 appearance-none">
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

                    <Button className="w-full h-12 text-base font-bold bg-gradient-to-r from-orange-500 to-purple-600 hover:opacity-90 transition-all shadow-lg shadow-orange-500/20 mt-2 text-white rounded-xl">
                        Get Your Free Assessment
                    </Button>
                </form>
             </motion.div>
          </div>

          {/* Right Column: Details, Boxes, Scroller */}
          <div className="flex flex-col space-y-8 lg:pt-0">
             {/* Small Chips for Subjects */}
            <div className="flex flex-wrap gap-4">
                 <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-orange-50 border border-orange-100 text-orange-700 text-lg font-bold shadow-sm hover:scale-105 transition-transform">
                    <span className="text-2xl">📚</span> English
                 </div>
                 <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-purple-50 border border-purple-100 text-purple-700 text-lg font-bold shadow-sm hover:scale-105 transition-transform">
                    <span className="text-2xl">🔢</span> Maths
                 </div>
            </div>

            <div className="space-y-4">
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
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

            {/* Image Slider */}
            <div className="w-full">
                 <div className="w-full overflow-hidden rounded-xl border border-slate-100 relative h-40 md:h-48 group">
                     {/* Gradient Overlays */}
                     <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent z-10"></div>
                     <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent z-10"></div>
                     
                     <div className="flex absolute min-w-full h-full">
                        <div className="animate-marquee flex items-center gap-4 px-2 h-full">
                            {[...Array(3)].map((_, setIndex) => (
                                <>
                                    <div className="relative w-60 h-full rounded-lg overflow-hidden shrink-0">
                                        <Image src="/hero1.jpeg" alt="Hero 1" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="relative w-60 h-full rounded-lg overflow-hidden shrink-0">
                                        <Image src="/hero2.jpeg" alt="Hero 2" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="relative w-60 h-full rounded-lg overflow-hidden shrink-0">
                                        <Image src="/hero3.jpeg" alt="Hero 3" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                </>
                            ))}
                        </div>
                     </div>
                 </div>
            </div>



            {/* Scroller */}
            <div className="w-full">
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Accredited By</p>
                 <div className="w-full overflow-hidden bg-white/50 rounded-xl py-4 border border-slate-100">
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
          100% { transform: translateX(-50%); }
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
