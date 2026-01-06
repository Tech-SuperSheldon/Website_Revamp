"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Johnson",
    grade: "Year 5 Maths",
    country: "UK",
    avatar: "/avatars/testimonial-1.png",
    content: "My daughter went from struggling with fractions to top of her class. The confidence boost has been incredible to watch!",
  },
  {
    name: "Michael Patel",
    grade: "GCSE English",
    country: "UK",
    avatar: "/avatars/testimonial-2.png",
    content: "The English tutor understood exactly what my son needed for his GCSEs. He achieved a Grade 8 – we couldn't be happier!",
  },
  {
    name: "Emma Thompson",
    grade: "Year 3 Reading",
    country: "AUS",
    avatar: "/avatars/testimonial-3.png",
    content: "Worth every penny. The personalised approach to teaching reading comprehension made all the difference.",
  },
  {
    name: "James Wilson",
    grade: "Year 8 Maths",
    country: "UK",
    avatar: "/avatars/testimonial-4.png",
    content: "I actually enjoy Maths now! My tutor makes everything so clear and easy to understand.",
  },
   {
    name: "Dr. Lisa Ray",
    grade: "11 Plus Prep",
    country: "UK",
    avatar: "/avatars/testimonial-5.png",
    content: "As an academic myself, I appreciate the structured yet flexible curriculum. Highly effective.",
  },
  {
    name: "David Chen",
    grade: "11 Plus Prep",
    country: "UK",
    avatar: "/avatars/testimonial-6.png",
    content: "SuperSheldon is a game changer. My son finally feels ready for his 11+ exams.",
  },
  {
    name: "Sophie Miller",
    grade: "Year 4 English",
    country: "AUS",
    avatar: "/avatars/testimonial-7.png",
    content: "I love the lessons! My tutor is so nice and helps me when I get stuck on tricky questions.",
  },
  {
    name: "Oliver Smith",
    grade: "Year 9 Science",
    country: "UK",
    avatar: "/avatars/testimonial-8.png",
    content: "The best tutoring I've ever had. I feel so much more confident in class now.",
  },
];

export function NewTestimonialsSection() {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-transparent">
        {/* 3D Spinning Globe Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-20">
             <div className="w-full h-full rounded-full relative overflow-hidden shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.1)]">
                {/* Rolling Map Texture */}
                <div 
                    className="absolute inset-0 bg-[url('/world-map.png')] bg-cover opacity-80 animate-spin-globe"
                    style={{ backgroundSize: '200% 100%' }}
                 />
                 {/* Shadow Overlay for 3D effect */}
                 <div className="absolute inset-0 rounded-full shadow-[inset_10px_10px_50px_rgba(0,0,0,0.1)] mix-blend-multiply" />
             </div>
        </div>

      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="container px-4 mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-4">
            What our students say
            </h2>
            <p className="text-center text-slate-500 max-w-xl mx-auto">
                Join thousands of happy families who have transformed their grades and confidence with SuperSheldon.
            </p>
        </div>

        <div className="relative w-full space-y-8">
            {/* Row 1: Left Scroll */}
            <div className="flex overflow-hidden">
            <motion.div
                className="flex gap-6 pl-6"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 80, ease: "linear", repeat: Infinity }}
            >
                {[...testimonials, ...testimonials].map((t, i) => (
                <div
                    key={i}
                    className="w-[300px] md:w-[350px] shrink-0 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                            <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                            <p className="text-xs text-slate-500 font-medium">
                                <span className="text-purple-600">{t.grade}</span> 
                                <span className="mx-1 text-slate-300">•</span>
                                {t.country}
                            </p>
                        </div>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">
                        &quot;{t.content}&quot;
                    </p>
                </div>
                ))}
            </motion.div>
            </div>

            {/* Row 2: Right Scroll */}
            <div className="flex overflow-hidden">
            <motion.div
                className="flex gap-6 pl-6"
                animate={{ x: ["-50%", "0%"] }}
                transition={{ duration: 90, ease: "linear", repeat: Infinity }}
            >
                {[...testimonials, ...testimonials].reverse().map((t, i) => (
                <div
                    key={i}
                    className="w-[300px] md:w-[350px] shrink-0 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                            <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                            <p className="text-xs text-slate-500 font-medium">
                                <span className="text-purple-600">{t.grade}</span> 
                                <span className="mx-1 text-slate-300">•</span>
                                {t.country}
                            </p>
                        </div>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">
                        &quot;{t.content}&quot;
                    </p>
                </div>
                ))}
            </motion.div>
            </div>
            
            {/* Blur Edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none z-20" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none z-20" />
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes spin-globe {
          0% { background-position: 0 0; }
          100% { background-position: 200% 0; }
        }
        .animate-spin-globe {
          animation: spin-globe 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
