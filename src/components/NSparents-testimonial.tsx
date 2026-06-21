"use client"


import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Play, Star } from 'lucide-react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { NSGlobe } from './NSGlobe';

// Types for our testimonials
type Testimonial = {
  id: string;
  type: 'text' | 'video';
  name: string;
  title: string;
  avatar: string; // path to image
  date: string;
  stars: number;
  quote?: string;
  videoThumbnail?: string;
  videoUrl?: string; // placeholder for future video
  theme?: 'white' | 'orange';
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    type: 'text',
    name: 'Mrs. Divya',
    title: 'Parent of Kiaan',
    avatar: '/k1b.png',
    date: '12/04/2025',
    stars: 5,
    quote: '"He has had the best Math classes at SuperSheldon — the progress and confidence he has gained are amazing!"',
    theme: 'white',
  },
  {
    id: '3',
    type: 'text',
    name: 'Mrs. Riya',
    title: 'Parent of Ananya, Grade 5',
    avatar: '/k2g.png',
    date: '23/11/2024',
    stars: 5,
    quote: '"SuperSheldon\'s Math classes have been outstanding — Ananya truly enjoys learning and has shown great improvement."',
    theme: 'white',
  },
  {
    id: '4',
    type: 'text',
    name: 'Alex',
    title: 'Year 4 Student, Australia',
    avatar: '/k4b.png',
    date: '15/01/2025',
    stars: 5,
    quote: '"I joined SuperSheldon a couple of months ago and I\'m really happy with my teacher — kind and patient, and explains Maths and English so I understand."',
    theme: 'white',
  },
];

export function ParentsTestimonialSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scrolling effect for desktop
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPos = 0;
    const speed = 0.5;

    const scroll = () => {
        if (scrollContainer) {
            scrollPos += speed;
            if (scrollPos >= scrollContainer.scrollWidth / 2) {
                scrollPos = 0;
            }
            scrollContainer.scrollLeft = scrollPos;
        }
        animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const textTestimonials = TESTIMONIALS.filter(t => t.type === 'text');
  const row1 = textTestimonials.slice(0, Math.ceil(textTestimonials.length / 2));
  const row2 = textTestimonials.slice(Math.ceil(textTestimonials.length / 2));

  return (
    <section className="relative w-full py-4 md:py-8 overflow-hidden bg-transparent">
      {/* Decorative Globe Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-30 md:hidden pointer-events-none">
        <NSGlobe size={600} opacity="opacity-100" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 mb-6 md:mb-12 flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Hear it from <br />
          <span className="text-[#e87f1e]">our Community!</span>
        </h2>
        
        <div className="bg-[#fff6ef] px-4 py-3 sm:px-10 sm:py-5 rounded-2xl sm:rounded-[2rem] flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-md w-full max-w-2xl border border-orange-200">
            <div className="bg-[#e87f1e] text-white px-4 py-2 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center min-w-[100px] sm:min-w-[140px] shrink-0 shadow-lg">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold">750+</span>
                <span className="text-[10px] sm:text-xs md:text-sm opacity-90 mt-0.5 text-center font-medium tracking-wide">Five Star Reviews</span>
            </div>
            <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed font-medium text-center sm:text-left">
                SuperSheldon has empowered 10,000+ students worldwide to master their subjects with confidence and joy.
            </p>
        </div>
      </motion.div>

      {/* Desktop Scrolling Container */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        ref={scrollRef}
        className="flex md:flex gap-6 overflow-x-hidden w-full pb-10 select-none cursor-grab active:cursor-grabbing [perspective:1000px] md:[perspective:1000px] max-md:hidden"
      >
        {[...textTestimonials, ...textTestimonials, ...textTestimonials].map((item, index) => (
          <div 
            key={`${item.id}-${index}`}
            className="group relative min-w-[280px] md:min-w-[400px] h-[360px] md:h-[450px]"
          >
            <TestimonialCard item={item} />
          </div>
        ))}
      </motion.div>

       {/* Mobile Marquee Rows */}
       <div className="md:hidden flex flex-col gap-12 py-10 overflow-hidden">
            <Marquee velocity={-0.05}>
                {row1.map((item) => (
                    <div key={item.id} className="w-[300px] px-3 shrink-0">
                        <TestimonialCard item={item} isMobile />
                    </div>
                ))}
            </Marquee>
            <Marquee velocity={0.05}>
                {row2.map((item) => (
                    <div key={item.id} className="w-[300px] px-3 shrink-0">
                        <TestimonialCard item={item} isMobile />
                    </div>
                ))}
            </Marquee>
       </div>
    </section>
  );
}

function Marquee({ children, velocity = -0.05 }: { children: React.ReactNode, velocity?: number }) {
    const x = useMotionValue(0);
    const contentRef = useRef<HTMLDivElement>(null);

    useAnimationFrame((t, delta) => {
        if (!contentRef.current) return;
        const contentWidth = contentRef.current.offsetWidth / 2;
        if (contentWidth <= 0) return;
        
        const moveBy = velocity * (delta / 16) * 10;
        let newX = x.get() + moveBy;

        if (velocity < 0) {
            if (newX <= -contentWidth) newX = 0;
        } else {
            if (newX >= 0) newX = -contentWidth;
        }
        x.set(newX);
    });

    return (
        <div className="flex whitespace-nowrap overflow-hidden w-full">
            <motion.div ref={contentRef} style={{ x }} className="flex">
                <div className="flex shrink-0">{children}</div>
                <div className="flex shrink-0" aria-hidden="true">{children}</div>
            </motion.div>
        </div>
    );
}

function TestimonialCard({ item, isMobile }: { item: Testimonial, isMobile?: boolean }) {
    if (isMobile) {
        return (
            <div className="relative w-full h-auto">
                <div className="w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-6 flex flex-col h-full group">
                    {/* Header: Avatar & Date */}
                    <div className="flex items-center gap-4 mb-5">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-sm ring-2 ring-gray-50">
                            <Image 
                                src={item.avatar} 
                                alt={item.name} 
                                fill 
                                className="object-cover" 
                            />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">
                                {item.name}
                            </h3>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                <span>{item.date}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                <span className="text-orange-600">{item.stars} Stars</span>
                            </div>
                        </div>
                    </div>

                    {/* Content (Quote) */}
                    <div className="grow mb-4">
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-4 whitespace-normal">
                            {item.quote || "The combination of videos, practice tasks, and certificates really boosted my confidence."}
                        </p>
                    </div>

                    {/* Footer: Title as a Category Tag */}
                    <div className="mt-auto pt-4 border-t border-gray-50">
                        <span className="text-orange-600 font-bold uppercase tracking-widest text-[10px]">
                            {item.title}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full">
            {/* --- TESTIMONIAL CARD (Desktop) --- */}
            <div className="w-full h-full rounded-[32px] bg-gradient-to-br from-[#fff6ef] to-[#ffe6d4] shadow-md border border-orange-300 p-6 md:p-8 flex flex-col justify-between overflow-hidden">
                
                {/* Header: Avatar & Date */}
                <div className="flex items-start justify-between mb-6">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-orange-400 shadow-md">
                        <Image 
                            src={item.avatar} 
                            alt={item.name} 
                            fill 
                            className="object-cover" 
                        />
                    </div>
                    <span className="text-xs font-semibold tracking-wider text-[#e87f1e] bg-orange-100/80 px-3 py-1 rounded-full border border-orange-200">
                        {item.date}
                    </span>
                </div>

                {/* Content (Text only) */}
                <div className="relative z-10 grow flex flex-col justify-center mb-6">
                    <p className="text-base md:text-lg leading-relaxed font-medium text-gray-800">
                        {item.quote || "The combination of videos, practice tasks, and certificates really boosted my confidence."}
                    </p>
                </div>

                {/* Footer: Stars & Name */}
                <div className="relative z-10 pt-4 border-t border-orange-300/50">
                    <div className="flex gap-1 mb-2 text-[#e87f1e]">
                        {[...Array(item.stars)].map((_, i) => (
                            <Star key={i} fill="currentColor" className="w-5 h-5 drop-shadow-sm" />
                        ))}
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                    <p className="text-sm text-[#d67015] font-semibold tracking-wide">
                        {item.title}
                    </p>
                </div>
            </div>
        </div>
    );
}
