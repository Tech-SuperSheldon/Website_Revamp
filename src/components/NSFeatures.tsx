

"use client";
import { motion } from "framer-motion";
import { NSGlobe } from "./NSGlobe";
import { assetUrl } from "@/lib/assetUrl";
import { AutoplayMutedVideo } from "@/components/AutoplayMutedVideo";

const features = [
  {
    title: "Worldwide best tutor experience",
    desc: "Connect with expert tutors from around the globe for personalized learning.",
    video: assetUrl("/newsite/5points/5.mp4"),
    layout: "horizontal", // 960x720 (4:3) - Fits OK in wide card side-by-side or vertical
    className: "md:col-span-2 bg-[#4d66e5] text-white", // Blue card
  },
  {
    title: "Ask Nova AI",
    desc: "Get instant answers for NAPLAN prep, homework help, and future study guidance.",
    video: assetUrl("/newsite/5points/1.mp4"),
    layout: "vertical", // 9:16 Portrait in Narrow Card -> Vertical stack OK
    className: "md:col-span-1 bg-[#dcefb6] text-black", // Lime card
  },
  {
    title: "1:1 Experience",
    desc: "Personalized attention and guidance tailored to your child's unique learning style.",
    video: assetUrl("/newsite/5points/2.mp4"),
    layout: "vertical", // Wide Landscape in Wide Card -> Vertical stack OK
    className: "md:col-span-2 bg-white text-black border border-gray-200", // Large White card
  },
  {
    title: "24x7 Support",
    desc: "Support from our help desk 24x7.",
    video: assetUrl("/newsite/5points/4.mp4"),
    image: assetUrl("/247.png"),
    layout: "horizontal", // 9:16 Portrait in Wide Card -> Side-by-side effectively uses space
    className: "md:col-span-2 bg-white text-black border border-gray-200", // Bottom White/Gray card
  },
  {
    title: "Easy & Personalized Curriculum",
    desc: "Learning made simple, structured, and tailored for every child.",
    video: assetUrl("/newsite/5points/3.mp4"),
    layout: "vertical", // 4:3 Landscape in Narrow Card -> Vertical stack OK
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

export default function FeatureSlider() {
  return (
    <div className="w-full px-4 md:px-8 py-8 md:py-12 max-w-[1400px] mx-auto font-quicksand">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-semibold text-center mb-6 md:mb-12 leading-tight"
      >
        The <span className="text-[#e87f1e]">Smart Choice</span>
        <br />
        for Bright <span className="text-[#e87f1e]">Futures</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-fr">
        {orderedFeatures.slice(0, 5).map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className={`relative rounded-[2.5rem] overflow-hidden flex shadow-sm transform transition-transform hover:scale-[1.01] ${f.className} ${f.layout === 'horizontal' ? 'flex-row items-stretch' : 'flex-col justify-between'}`}
            style={{ minHeight: '400px' }}
          >
            {/* Globe decoration for Worldwide card */}
            {f.title === "Worldwide best tutor experience" && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <NSGlobe size={420} opacity="opacity-50" />
              </div>
            )}

            {/* Text Container */}
            <div className={`relative z-10 p-8 text-left ${f.layout === 'horizontal' ? 'w-1/2 flex flex-col justify-start h-full' : 'w-full mb-6'}`}>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight leading-tight">
                {f.title}
              </h3>
              <p className={`text-lg md:text-xl leading-relaxed opacity-90`}>
                {f.desc}
              </p>
              {f.image && (
                <div className="mt-auto flex justify-center -mb-8">
                  <img src={f.image} alt="feature illustration" className="w-[160%] max-w-[400px] object-contain drop-shadow-md" />
                </div>
              )}
            </div>

            {/* Media Container */}
            <div className={`relative overflow-hidden flex flex-col items-center justify-end ${f.layout === 'horizontal' ? 'w-1/2 h-full' : 'w-full mt-auto h-[250px] md:h-[300px]'}`}>
               {f.video && (
                 <AutoplayMutedVideo
                   src={f.video}
                   className="w-full h-full object-cover"
                 />
               )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
