

"use client";
import { motion } from "framer-motion";
import { NSGlobe } from "../NSGlobe";
import { assetUrl } from "@/lib/assetUrl";
import { AutoplayMutedVideo } from "@/components/AutoplayMutedVideo";

const features = [
  {
    title: "Worldwide best tutor experience",
    desc: "Connect with expert tutors from around the globe for personalized learning.",
    video: assetUrl("/newsite/5points/5.mp4"),
    layout: "horizontal", // 960x720 (4:3) - Fits OK in wide card side-by-side or vertical
    className: "md:col-span-2 bg-[#2563eb] text-white", // Blue card
  },
  {
    title: "Ask Nova AI",
    desc: "Get instant answers for NAPLAN prep, homework help, and future study guidance.",
    video: assetUrl("/newsite/5points/1.mp4"),
    layout: "vertical",
    fillMedia: true,
    className: "md:col-span-1 bg-[#dcefb6] text-black", // Lime card
  },
  {
    title: "1:1 Experience",
    desc: "Personalized attention and guidance tailored to your child's unique learning style.",
    video: assetUrl("/newsite/5points/2.mp4"),
    layout: "vertical",
    fillMedia: true,
    className: "md:col-span-2 bg-white text-black border border-gray-200", // Large White card
  },
  {
    title: "24x7 Support",
    desc: "Support from our help desk 24x7.",
    bullets: [
      "Live chat & email assistance anytime",
      "Technical and academic help, always on",
      "Fast responses — no waiting, ever",
    ],
    video: assetUrl("/newsite/5points/support.mp4"),
    layout: "horizontal",
    className: "md:col-span-2 bg-white text-black border border-gray-200",
  },
  {
    title: "Easy & Personalized Curriculum",
    desc: "Learning made simple, structured, and tailored for every child.",
    video: assetUrl("/newsite/5points/3.mp4"),
    layout: "vertical",
    fillMedia: true,
    className: "md:col-span-1 bg-white text-black border border-gray-200", // Small White card
  },
];

// Re-ordering for the grid layout visually
// Row 1: [Experienced Tutors (2)] [Interactive (1)] [Track Progress (1)]
// Row 2: [24x7 Support (2)] [Various Features (2)]
const orderedFeatures = [
  features[2], // "1:1 Experience" (Wide, Vertical)
  features[1], // "Ask Nova AI" (Narrow, Vertical)
  features[4], // "Easy & Personalized..." (Narrow, Vertical)
  features[3], // "24x7 Support" (Wide, Horizontal)
  features[0], // "Worldwide best..." (Wide, Horizontal)
];

export default function UKHomeFeatureSlider() {
  return (
    <div className="w-full px-4 md:px-8 py-8 md:py-12 max-w-[1400px] mx-auto font-quicksand">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-semibold text-center mb-6 md:mb-12 leading-tight"
      >
        The <span className="text-[#1d4ed8]">Smart Choice</span>
        <br />
        for Bright <span className="text-[#1d4ed8]">Futures</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:grid-rows-[360px_auto]">
        {orderedFeatures.slice(0, 5).map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className={`relative rounded-[2rem] overflow-hidden flex shadow-sm transform transition-transform hover:scale-[1.01] ${f.className} ${f.layout === 'horizontal' ? 'flex-row items-stretch' : f.fillMedia ? 'flex-col' : 'flex-col justify-between'}`}
            style={{ minHeight: '300px' }}
          >
            {/* Globe decoration for Worldwide card */}
            {f.title === "Worldwide best tutor experience" && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <NSGlobe size={300} opacity="opacity-50" />
              </div>
            )}

            {/* Text Container */}
            <div className={`relative z-10 p-5 text-left ${f.layout === 'horizontal' ? 'w-1/2 flex flex-col justify-start h-full' : 'w-full mb-3'}`}>
              <h3 className="text-xl md:text-2xl font-bold mb-2 tracking-tight leading-tight">
                {f.title}
              </h3>
              <p className={`text-sm md:text-base leading-relaxed opacity-90`}>
                {f.desc}
              </p>
              {f.bullets && (
                <ul className="mt-3 space-y-2">
                  {f.bullets.map((b: string, bi: number) => (
                    <li key={bi} className="flex items-start gap-2 text-sm md:text-base opacity-80">
                      <span className="mt-1 w-2 h-2 rounded-full bg-current shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Media Container */}
            <div className={`relative overflow-hidden flex flex-col items-center justify-end ${f.layout === 'horizontal' ? 'w-1/2 h-full' : f.fillMedia ? 'w-full flex-1 min-h-0' : 'w-full mt-auto h-[160px] md:h-[190px]'}`}>
               {f.video && (
                 <AutoplayMutedVideo
                   src={f.video}
                   /* Mobile: scale up from top so the bottom "jitter.video" watermark
                      gets cropped out of view. Desktop stays untouched (md:scale-100). */
                   className="w-full h-full object-cover object-top origin-top scale-[1.15] md:scale-100 md:origin-center"
                 />
               )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
