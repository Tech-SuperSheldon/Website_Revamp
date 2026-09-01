"use client";

// Student/parent testimonials, shown right below TrustedByBar.
//
// Desktop/tablet (sm and up): three cards side by side, unchanged — do not
// touch that layout without being asked.
//
// Mobile (below sm): a tilted, overlapping card stack instead of the stacked
// column it used to be. One card sits centered and on top; the other two peek
// out tilted behind it on either side, partly covered by the front card.
// Swiping the front card left/right (or tapping a peeking side card) cycles
// which of the three is on top.
import { useState } from "react";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import Image from "next/image";
import { rise, stagger, SPRING, VIEWPORT } from "@/lib/motion";

// Data copied from StudentTestimonial.jsx
const testimonials = [
  {
    text: "My name's Alex. I'm from Melbourne. I joined Super Sheldon around two months, and really happy with the teacher, kind and pensive, and explain me maths and English. I understand, and I am really happy now. Thank you.",
    name: "Alex, Year 4, Australian Student",
    image: "/k4b.webp",
  },
  {
    text: "I am Divya, mother of Kiaan. He has had the best Math classes at SuperSheldon — the progress and confidence he has gained are amazing!",
    name: "Mrs. Divya",
    image: "/k1b.webp",
  },
  {
    text: "I am Riya, mother of Ananya in Year 5. SuperSheldon's Math Classes have been outstanding - Ananya truly enjoys learning and has shown great improvement.",
    name: "Mrs. Riya",
    image: "/k2g.webp",
  },
];

type Testimonial = (typeof testimonials)[number];

/** Shared visual content — the background, photo, quote and name. No sizing
 * or motion of its own, so the desktop grid and the mobile stack can wrap it
 * in whatever container each needs. */
function TestimonialCardContent({ t }: { t: Testimonial }) {
  return (
    <>
      {/* Background — the "cozy study room" photo + white overlay the single
          card used before, kept so the card doesn't read as a flat white box. */}
      <Image
        src="/cozy_study_bg.webp"
        alt=""
        fill
        className="object-cover absolute inset-0 z-0 blur-[2px]"
      />
      <div className="absolute inset-0 bg-white/80 z-0" />

      <div className="relative z-10 h-full flex flex-col p-4 md:p-5">
        <div className="relative w-full flex-1 min-h-0 rounded-xl overflow-hidden mb-3">
          <Image
            src={t.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 768px) 330px, (min-width: 640px) 300px, 68vw"
            className="object-contain object-top group-hover:scale-105 transition-transform duration-500"
            draggable={false}
          />
        </div>

        <blockquote className="text-[13px] md:text-sm font-medium text-gray-900 leading-relaxed font-serif line-clamp-4">
          &ldquo;{t.text}&rdquo;
        </blockquote>

        <div className="mt-3 pt-3 border-t border-gray-200/80">
          <h4 className="font-bold text-gray-900 text-sm md:text-base">{t.name}</h4>
          <p className="text-[11px] md:text-xs text-gray-500">Student</p>
        </div>
      </div>
    </>
  );
}

/** Desktop/tablet card — fixed responsive width, scroll-reveal entrance. */
function TestimonialCard({ t, reduce }: { t: Testimonial; reduce: boolean }) {
  return (
    <motion.div
      variants={rise(reduce, 24)}
      className="group relative w-[300px] md:w-[330px] lg:w-[360px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300"
    >
      <TestimonialCardContent t={t} />
    </motion.div>
  );
}

// Position of a card relative to whichever one is currently on top: -1 (peeks
// out to the left, behind), 0 (front and centered), 1 (peeks out to the
// right, behind). Only correct for exactly 3 cards — with more, everything
// beyond the immediate neighbours would need to be hidden outright rather
// than mapped into one of these three slots.
function relativeSlot(index: number, active: number, length: number) {
  return ((index - active + length + 1) % length) - 1;
}

const SLOT_STYLE: Record<-1 | 0 | 1, { x: string; rotate: number; scale: number; zIndex: number; opacity: number }> = {
  [-1]: { x: "-46%", rotate: -8, scale: 0.93, zIndex: 10, opacity: 0.92 },
  [0]: { x: "0%", rotate: 0, scale: 1, zIndex: 20, opacity: 1 },
  [1]: { x: "46%", rotate: 8, scale: 0.93, zIndex: 10, opacity: 0.92 },
};

const SWIPE_DISTANCE = 90;
const SWIPE_VELOCITY = 500;

function MobileTestimonialStack({ reduce }: { reduce: boolean }) {
  const [active, setActive] = useState(0);
  const length = testimonials.length;
  const advance = (dir: 1 | -1) => setActive((a) => (a + dir + length) % length);

  // Reduced motion: skip the tilt/overlap entirely and stack the cards in a
  // plain, fully-visible column instead — the effect is decorative, not load
  // bearing, so there's nothing to preserve for those users.
  if (reduce) {
    return (
      <div className="flex flex-col items-center gap-6 px-6">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="relative w-[72vw] max-w-[280px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-sm border border-gray-100"
          >
            <TestimonialCardContent t={t} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-[68vw] max-w-[260px] aspect-[4/5]">
      {testimonials.map((t, i) => {
        const slot = relativeSlot(i, active, length) as -1 | 0 | 1;
        const style = SLOT_STYLE[slot];
        const isFront = slot === 0;

        const onDragEnd = (_e: PointerEvent, info: PanInfo) => {
          if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) advance(1);
          else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) advance(-1);
        };

        return (
          <motion.div
            key={t.name}
            className="group absolute inset-0 rounded-[2rem] overflow-hidden shadow-md border border-gray-100"
            style={{ zIndex: style.zIndex }}
            animate={{ x: style.x, rotate: style.rotate, scale: style.scale, opacity: style.opacity }}
            transition={SPRING}
            drag={isFront ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={isFront ? onDragEnd : undefined}
            onClick={!isFront ? () => advance(slot === -1 ? -1 : 1) : undefined}
          >
            <TestimonialCardContent t={t} />
          </motion.div>
        );
      })}
    </div>
  );
}

export function TestimonialSection() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="py-4 md:py-6 overflow-hidden relative">
      {/* Desktop / tablet — unchanged side-by-side layout */}
      <div className="hidden sm:block container mx-auto px-4 md:px-6">
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="flex flex-row flex-wrap items-center justify-center gap-6 md:gap-7 lg:gap-8 max-w-6xl mx-auto"
        >
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} t={t} reduce={reduce} />
          ))}
        </motion.div>
      </div>

      {/* Mobile — tilted overlapping card stack, swipeable */}
      <div className="sm:hidden py-4">
        <MobileTestimonialStack reduce={reduce} />
      </div>
    </section>
  );
}
