'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Play, Star } from 'lucide-react';

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
    name: 'David Mitchell',
    title: 'Parent of Class 5 Student',
    avatar: '/new-site/testimonials/avatar_1_david.png',
    date: '12/04/2025',
    stars: 5,
    quote: '"SuperSheldon transformed how my son sees Math. He used to hate it, but now he runs to his laptop for the lessons. The gamified approach really works wonders!"',
    theme: 'white',
  },
  {
    id: '2',
    type: 'video',
    name: 'Ayesha R.',
    title: 'Grade 10 Student',
    avatar: '/new-site/testimonials/avatar_2_ayesha.png',
    date: '02/07/2025',
    stars: 5,
    videoThumbnail: '/new-site/testimonials/video_thumb_ayesha.png',
    theme: 'orange',
  },
  {
    id: '3',
    type: 'text',
    name: 'Kathy Vance',
    title: 'Homeschooling Mom',
    avatar: '/new-site/testimonials/avatar_3_kethy.png',
    date: '23/11/2024',
    stars: 5,
    quote: '"I was looking for a curriculum that adapts to my child\'s pace. SuperSheldon\'s adaptive learning path is exactly what we needed. The progress reports are detailed and helpful."',
    theme: 'white',
  },
  {
    id: '4',
    type: 'text',
    name: 'Thomas Adebayo',
    title: 'High School Senior',
    avatar: '/new-site/testimonials/avatar_4_thomas.png',
    date: '15/01/2025',
    stars: 5,
    quote: '"The coding modules are fantastic. I actually built my first app after just two weeks! It feels less like studying and more like building cool stuff."',
    theme: 'white',
  },
  {
    id: '5',
    type: 'text',
    name: 'Mr. Jenkins',
    title: 'Science Teacher',
    avatar: '/new-site/testimonials/avatar_1_david.png', // Reusing for demo
    date: '10/03/2025',
    stars: 5,
    quote: '"I recommend SuperSheldon to all my students for extra practice. The visual explanations for complex science concepts are better than any textbook I\'ve seen."',
    theme: 'white',
  },
];

export function ParentsTestimonialSection() {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scrolling effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPos = 0;
    const speed = 0.5; // Pixels per frame - adjust for "slowly scrolling"

    const scroll = () => {
        // Stop scrolling if a video is playing or maybe on hover (optional, but good for UX)
        // For now, simple continuous scroll
        if (scrollContainer) {
            scrollPos += speed;
            if (scrollPos >= scrollContainer.scrollWidth / 2) {
                scrollPos = 0; // Reset to start for infinite loop effect
            }
            scrollContainer.scrollLeft = scrollPos;
        }
        animationFrameId = requestAnimationFrame(scroll);
    };

    // Clone children to create infinite effect
    // We handle this by rendering the list twice in the JSX

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section className="w-full py-8 overflow-hidden bg-transparent">
      <div className="container mx-auto px-4 mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Hear it from <br />
          <span className="text-[#E8A631]">our Community!</span>
        </h2>
        
        <div className="bg-[#FFF4E5] p-6 rounded-3xl flex items-center gap-6 shadow-sm max-w-md">
            <div className="bg-[#E8A631] text-white p-4 rounded-2xl flex flex-col items-center justify-center min-w-[100px]">
                <span className="text-3xl font-bold">750+</span>
                <span className="text-xs opacity-90">Five Star Reviews</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
                SuperSheldon has empowered 10,000+ students worldwide to master their subjects with confidence and joy.
            </p>
        </div>
      </div>

      {/* Scrolling Container */}
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden w-full pb-10 select-none cursor-grab active:cursor-grabbing [perspective:1000px]"
        style={{ width: '100%', perspective: '1000px' }}
      >
        {/* Render list twice for infinite loop */}
        {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((item, index) => (
          <div 
            key={`${item.id}-${index}`}
            className="group relative min-w-[300px] md:min-w-[400px] h-[450px]"
          >
            <div className={`
                relative w-full h-full transition-all duration-700 transform-style-3d 
                ${item.type === 'video' ? 'group-hover:rotate-y-180' : ''}
            `}
            style={{ transformStyle: 'preserve-3d' }}
            >
                {/* --- FRONT FACE (Text/Quote - Uniform Look) --- */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-[32px] bg-white shadow-sm border border-gray-100 p-8 flex flex-col justify-between"
                     style={{ backfaceVisibility: 'hidden' }}>
                    
                    {/* Header: Avatar & Date */}
                    <div className="flex items-start justify-between mb-6">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gray-100">
                            <Image 
                                src={item.avatar} 
                                alt={item.name} 
                                fill 
                                className="object-cover" 
                            />
                        </div>
                        <span className="text-sm tracking-wider text-gray-400">
                            {item.date}
                        </span>
                    </div>

                    {/* Content */}
                    <div className="flex-grow flex flex-col justify-center mb-6">
                        <p className="text-lg leading-relaxed font-medium text-gray-800">
                            {item.quote || "The combination of videos, practice tasks, and certificates really boosted my confidence."}
                        </p>
                    </div>

                    {/* Footer: Stars & Name */}
                    <div className="pt-4 border-t border-gray-100">
                        <div className="flex gap-1 mb-2 text-[#E8A631]">
                            {[...Array(item.stars)].map((_, i) => (
                                <Star key={i} fill="currentColor" className="w-5 h-5" />
                            ))}
                        </div>
                        <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                            {item.title}
                        </p>
                    </div>
                </div>

                {/* --- BACK FACE (Video/Orange - Revealed on Hover) --- */}
                {item.type === 'video' && (
                    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-[32px] bg-gradient-to-br from-[#E8A631] to-[#6D4C13] text-white overflow-hidden p-8 flex flex-col justify-between"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                         
                         {/* Background Image for Video Card */}
                         <div className="absolute inset-0 z-0">
                             {item.videoThumbnail && (
                                 <Image 
                                    src={item.videoThumbnail} 
                                    alt="Video Thumbnail" 
                                    fill 
                                    className="object-cover opacity-60"
                                 />
                             )}
                             <div className="absolute inset-0 bg-black/20" />
                         </div>

                         {/* Header on Back */}
                         <div className="relative z-10 flex items-start justify-between mb-6">
                            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white/30">
                                <Image 
                                    src={item.avatar} 
                                    alt={item.name} 
                                    fill 
                                    className="object-cover" 
                                />
                            </div>
                            <span className="text-sm tracking-wider text-white/90">
                                {item.date}
                            </span>
                         </div>

                         {/* Play Button */}
                         <div className="relative z-10 flex-grow flex items-center justify-center">
                            <button className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 hover:scale-110 transition-transform hover:bg-white/30 cursor-pointer group/btn"
                                onClick={() => setIsPlaying(item.id)}
                            >
                                <Play fill="white" className="w-8 h-8 text-white ml-2" />
                            </button>
                         </div>

                         {/* Footer on Back */}
                         <div className="relative z-10 pt-4 border-t border-white/20">
                            <div className="flex gap-1 mb-2 text-[#FFD700]">
                                {[...Array(item.stars)].map((_, i) => (
                                    <Star key={i} fill="currentColor" className="w-5 h-5" />
                                ))}
                            </div>
                            <h3 className="font-bold text-lg">{item.name}</h3>
                            <p className="text-sm text-white/80">
                                {item.title}
                            </p>
                        </div>
                    </div>
                )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
