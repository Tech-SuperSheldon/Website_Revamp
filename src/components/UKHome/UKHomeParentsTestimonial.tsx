"use client"


import React, { useRef } from 'react';
import Image from 'next/image';
import { Play, Star } from 'lucide-react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { NSGlobe } from '../NSGlobe';

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
  theme?: 'white' | 'blue';
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    type: 'text',
    name: 'Mrs. Divya',
    title: 'Parent of Kiaan',
    avatar: '/k1b.webp',
    date: '12/04/2025',
    stars: 5,
    quote: '"He has had the best Math classes at SuperSheldon — the progress and confidence he has gained are amazing!"',
    theme: 'white',
  },
  {
    id: '3',
    type: 'text',
    name: 'Mrs. Riya',
    title: 'Parent of Ananya, Year 5',
    avatar: '/k2g.webp',
    date: '23/11/2024',
    stars: 5,
    quote: '"SuperSheldon\'s Math classes have been outstanding — Ananya truly enjoys learning and has shown great improvement."',
    theme: 'white',
  },
  {
    id: '4',
    type: 'text',
    name: 'Alex',
    title: 'Year 4 Student, UK',
    avatar: '/k4b.webp',
    date: '15/01/2025',
    stars: 5,
    quote: '"I joined SuperSheldon a couple of months ago and I\'m really happy with my teacher — kind and patient, and explains Maths and English so I understand."',
    theme: 'white',
  },
  {
    id: '5',
    type: 'text',
    name: 'David Mitchell',
    title: 'Parent of Class 5 Student',
    avatar: '/new-site/testimonials/avatar_1_david.webp',
    date: '12/04/2025',
    stars: 5,
    quote: '"SuperSheldon transformed how my son sees Math. He used to hate it, but now he runs to his laptop for the lessons. The gamified approach really works wonders!"',
    theme: 'white',
  },
  {
    id: '6',
    type: 'text',
    name: 'Ayesha R.',
    title: 'Year 10 Student',
    avatar: '/new-site/testimonials/avatar_2_ayesha.webp',
    date: '02/07/2025',
    stars: 5,
    quote: '"The combination of videos, practice tasks, and certificates really boosted my confidence. I actually look forward to every class now!"',
    theme: 'white',
  },
  {
    id: '7',
    type: 'text',
    name: 'Kathy Vance',
    title: 'Homeschooling Mom',
    avatar: '/new-site/testimonials/avatar_3_kethy.webp',
    date: '23/11/2024',
    stars: 5,
    quote: '"I was looking for a curriculum that adapts to my child\'s pace. SuperSheldon\'s adaptive learning path is exactly what we needed. The progress reports are detailed and helpful."',
    theme: 'white',
  },
  {
    id: '8',
    type: 'text',
    name: 'Thomas Adebayo',
    title: 'High School Senior',
    avatar: '/new-site/testimonials/avatar_4_thomas.webp',
    date: '15/01/2025',
    stars: 5,
    quote: '"The coding modules are fantastic. I actually built my first app after just two weeks! It feels less like studying and more like building cool stuff."',
    theme: 'white',
  },
  {
    id: '9',
    type: 'text',
    name: 'Mr. Jenkins',
    title: 'Science Teacher',
    avatar: '/new-site/testimonials/avatar_1_david.webp',
    date: '10/03/2025',
    stars: 5,
    quote: '"I recommend SuperSheldon to all my students for extra practice. The visual explanations for complex science concepts are better than any textbook I\'ve seen."',
    theme: 'white',
  },
];

export function ParentsTestimonialSection() {
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
          <span className="text-[#1d4ed8]">our Community!</span>
        </h2>

        <div className="bg-[#eef4ff] px-4 py-3 sm:px-10 sm:py-5 rounded-2xl sm:rounded-[2rem] flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-md w-full max-w-2xl border border-blue-200">
            <div className="bg-[#1d4ed8] text-white px-4 py-2 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center min-w-[100px] sm:min-w-[140px] shrink-0 shadow-lg">
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
        className="hidden md:flex md:flex-col gap-8 pb-10"
      >
        <Marquee velocity={-0.05}>
          {row1.map((item) => (
            <div
              key={item.id}
              className="group relative w-[320px] h-[450px] pr-6 shrink-0"
            >
              <TestimonialCard item={item} />
            </div>
          ))}
        </Marquee>
        <Marquee velocity={0.05}>
          {row2.map((item) => (
            <div
              key={item.id}
              className="group relative w-[320px] h-[450px] pr-6 shrink-0"
            >
              <TestimonialCard item={item} />
            </div>
          ))}
        </Marquee>
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
                                sizes="48px"
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                                {item.name}
                            </h3>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                <span>{item.date}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                <span className="text-blue-600">{item.stars} Stars</span>
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
                        <span className="text-blue-600 font-bold uppercase tracking-widest text-[10px]">
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
            <div className="w-full h-full rounded-[32px] bg-gradient-to-br from-[#eef4ff] to-[#dbe8ff] shadow-md border border-blue-300 p-6 flex flex-col justify-between overflow-hidden">

                {/* Header: Avatar & Date */}
                <div className="flex items-start justify-between mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-400 shadow-md">
                        <Image
                            src={item.avatar}
                            alt={item.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <span className="text-xs font-semibold tracking-wider text-[#1d4ed8] bg-blue-100/80 px-3 py-1 rounded-full border border-blue-200">
                        {item.date}
                    </span>
                </div>

                {/* Content (Text only) */}
                <div className="relative z-10 grow flex flex-col justify-center mb-4 overflow-hidden">
                    <p className="text-base leading-relaxed font-medium text-gray-800 whitespace-normal">
                        {item.quote || "The combination of videos, practice tasks, and certificates really boosted my confidence."}
                    </p>
                </div>

                {/* Footer: Stars & Name */}
                <div className="relative z-10 pt-3 border-t border-blue-300/50">
                    <div className="flex gap-1 mb-2 text-[#1d4ed8]">
                        {[...Array(item.stars)].map((_, i) => (
                            <Star key={i} fill="currentColor" className="w-4 h-4 drop-shadow-sm" />
                        ))}
                    </div>
                    <h3 className="font-bold text-base text-gray-900">{item.name}</h3>
                    <p className="text-xs text-[#1e40af] font-semibold tracking-wide">
                        {item.title}
                    </p>
                </div>
            </div>
        </div>
    );
}
