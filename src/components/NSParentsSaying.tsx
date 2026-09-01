"use client";

// "What parents are saying" — a swipeable testimonial rail. Shows one card on
// mobile and three on desktop; the visible count is read from a media query so
// the same index maths drives the arrows, the dots and the drag.
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { CSS_TRANSITION, DUR, EASE, hoverLift, riseOnce, SPRING } from "@/lib/motion";
import Highlight from "@/components/motion/Highlight";
import { SpotlightOverlay, useSpotlight } from "@/components/motion/Spotlight";

type Quote = {
  name: string;
  role: string;
  avatar: string;
  quote: string;
};

const QUOTES: Quote[] = [
  {
    name: "Mrs. Divya",
    role: "Parent of Kiaan",
    avatar: "/k1b.webp",
    quote:
      "He has had the best Math classes at SuperSheldon — the progress and confidence he has gained are amazing!",
  },
  {
    name: "Mrs. Riya",
    role: "Parent of Ananya, Year 5",
    avatar: "/k2g.webp",
    quote:
      "SuperSheldon's Math classes have been outstanding — Ananya truly enjoys learning and has shown great improvement.",
  },
  {
    name: "David Mitchell",
    role: "Parent of a Year 5 student",
    avatar: "/new-site/testimonials/avatar_1_david.webp",
    quote:
      "SuperSheldon transformed how my son sees Math. He used to hate it, but now he runs to his laptop for the lessons.",
  },
  {
    name: "Kathy Vance",
    role: "Homeschooling parent",
    avatar: "/new-site/testimonials/avatar_3_kethy.webp",
    quote:
      "I wanted a curriculum that adapts to my child's pace. The adaptive learning path is exactly what we needed, and the progress reports are genuinely useful.",
  },
  {
    name: "Alex",
    role: "Year 4 student, Australia",
    avatar: "/k4b.webp",
    quote:
      "My teacher is kind and patient, and explains Maths and English so I actually understand. I'm really happy now.",
  },
  {
    name: "Thomas Adebayo",
    role: "Parent of a Year 11 student",
    avatar: "/new-site/testimonials/avatar_4_thomas.webp",
    quote:
      "The coding modules are fantastic. He built his first app after two weeks — it feels less like studying and more like building something real.",
  },
];

function Arrow({
  dir,
  onClick,
  disabled,
  reduce,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
  reduce: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={reduce || disabled ? undefined : { scale: 1.08, transition: SPRING }}
      whileTap={reduce || disabled ? undefined : { scale: 0.92 }}
      aria-label={dir === "prev" ? "Previous testimonial" : "Next testimonial"}
      className="w-11 h-11 rounded-full bg-white border border-[#fedbc6] shadow-sm flex items-center justify-center text-[#0b2545] transition-colors duration-300 hover:bg-[#fc8741] hover:border-[#fc8741] hover:text-white disabled:opacity-35 disabled:pointer-events-none"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d={dir === "prev" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
}

export default function NSParentsSaying() {
  const reduce = useReducedMotion() ?? false;
  const [perView, setPerView] = useState(1);
  const [index, setIndex] = useState(0);

  // The rail is dragged in pixels, so its width has to be measured rather than
  // inferred — percentage transforms and drag offsets can't be compared.
  const viewportRef = useRef<HTMLDivElement>(null);
  const [railWidth, setRailWidth] = useState(0);

  // Cards per viewport width — 1 on phones, 2 on tablets, 3 from lg up.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const read = () => {
      const w = window.innerWidth;
      setPerView(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
      setRailWidth(el.clientWidth);
    };
    read();

    const observer = new ResizeObserver(read);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const maxIndex = Math.max(0, QUOTES.length - perView);
  // A narrower viewport can leave the index past the end after a resize.
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const go = useCallback(
    (next: number) => setIndex(Math.min(Math.max(next, 0), maxIndex)),
    [maxIndex]
  );

  const cardWidth = railWidth / perView;
  const x = useMotionValue(0);
  const slide = reduce ? { duration: 0 } : { duration: DUR.slow, ease: EASE };

  // Drag release: commit to the next card if the gesture travelled a quarter of
  // a card OR was flicked hard enough. Velocity is what makes a short, fast
  // flick feel right — distance alone reads as sluggish.
  const onDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const travelled = info.offset.x;
    const flick = info.velocity.x;
    const threshold = cardWidth * 0.25;

    let target = index;
    if (travelled < -threshold || flick < -500) target = index + 1;
    else if (travelled > threshold || flick > 500) target = index - 1;
    target = Math.min(Math.max(target, 0), maxIndex);

    go(target);
    // Always animate explicitly: when the drag doesn't cross the threshold the
    // index is unchanged, so nothing declarative would bring the rail back.
    animate(x, -target * cardWidth, slide);
  };

  return (
    <section className="relative py-6 md:py-10 overflow-hidden">
      {/* Warm wash so this section reads as a distinct band on the white page */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#fff7f2]/70 via-[#fff7f2]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...riseOnce(reduce)} className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            What <Highlight reduce={reduce} bar="bg-[#fedbc6]/70">parents</Highlight> are saying
          </h2>
          <p className="mt-3 text-gray-600 text-base sm:text-lg max-w-xl mx-auto">
            Real families, across the UK, Australia, the US and beyond.
          </p>
        </motion.div>

        <motion.div {...riseOnce(reduce, 24)} className="relative">
          <div ref={viewportRef} className="overflow-hidden">
            <motion.div
              className="flex items-start cursor-grab active:cursor-grabbing"
              style={{ x }}
              animate={{ x: -index * cardWidth }}
              transition={slide}
              drag={reduce ? false : "x"}
              dragConstraints={{ left: -maxIndex * cardWidth, right: 0 }}
              dragElastic={0.12}
              dragMomentum={false}
              // Without this a vertical swipe that starts on the rail is
              // captured as a drag and the page won't scroll on mobile.
              dragDirectionLock
              onDragEnd={onDragEnd}
            >
              {QUOTES.map((q) => (
                <div
                  key={q.name}
                  className="shrink-0 px-2.5 md:px-3"
                  style={{ width: `${100 / perView}%` }}
                >
                  <QuoteCard q={q} reduce={reduce} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-5">
            <Arrow dir="prev" onClick={() => go(index - 1)} disabled={index === 0} reduce={reduce} />
            <div className="flex items-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  whileTap={reduce ? undefined : { scale: 0.8 }}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-[width,background-color] duration-300 ${
                    i === index ? "w-7 bg-[#fc8741]" : "w-2 bg-[#fedbc6] hover:bg-[#fec5a4]"
                  }`}
                />
              ))}
            </div>
            <Arrow dir="next" onClick={() => go(index + 1)} disabled={index === maxIndex} reduce={reduce} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function QuoteCard({ q, reduce }: { q: Quote; reduce: boolean }) {
  const { onMouseMove, onMouseLeave, background } = useSpotlight();

  return (
    <motion.figure
      whileHover={hoverLift(reduce, -6)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`group relative flex flex-col overflow-hidden rounded-[2rem] bg-white border border-[#ffede2] p-5 md:p-6 shadow-sm hover:shadow-lg ${CSS_TRANSITION}`}
    >
      <SpotlightOverlay background={background} />
      {/* Oversized quote mark, purely decorative */}
      <span
        className="relative text-5xl leading-[0.6] text-[#fedbc6] font-serif select-none"
        aria-hidden
      >
        &ldquo;
      </span>
      <blockquote className="relative mt-3 text-gray-700 leading-relaxed text-[15px] md:text-base">
        {q.quote}
      </blockquote>
      <div className="relative mt-4 text-[#FFCC00] text-sm tracking-widest" aria-label="5 out of 5 stars">
        ★★★★★
      </div>
      <figcaption className="relative mt-3 pt-3 border-t border-[#ffede2] flex items-center gap-3">
        <span className="relative w-11 h-11 rounded-full overflow-hidden bg-[#fff7f2] shrink-0 ring-2 ring-[#ffede2]">
          <Image src={q.avatar} alt="" fill className="object-cover" sizes="44px" />
        </span>
        <span>
          <span className="block font-bold text-[#0b2545] text-[15px]">{q.name}</span>
          <span className="block text-gray-500 text-[13px]">{q.role}</span>
        </span>
      </figcaption>
    </motion.figure>
  );
}
