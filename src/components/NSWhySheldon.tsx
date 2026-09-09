"use client";

// "Why Super Sheldon?" — three non-negotiables, shown right under the
// Academies section on the landing page.
//
// Each card is a tinted panel in one of the three academy colours (teal /
// red-orange / purple — the same palette as NSAcademies, so the two sections
// read as one family): a coloured icon badge beside a solid pill, then the
// claim and a sentence of detail. A single "Try a Free Class" button closes the
// section and opens the site-wide booking popup.
import Link from "next/link";
import { ClipboardCheck, SlidersHorizontal, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { CSS_TRANSITION, hoverLift, rise, riseOnce, stagger, VIEWPORT } from "@/lib/motion";
import { SpotlightOverlay, useSpotlight } from "@/components/motion/Spotlight";
import { openDemoOnClick } from "@/components/BookDemo/demoModalStore";
import { DEMO_PATH, type Locale } from "@/lib/academies";

const NAVY = "#1B2A5B";
const GOLD = "#F4B740";

type Card = {
  /** Card background tint. */
  bg: string;
  /** Border of the tinted card edge. */
  border: string;
  /** Icon badge + pill fill. */
  accent: string;
  /** Small uppercase pill above the claim. */
  pill: string;
  title: string;
  desc: string;
  icon: typeof Users;
};

const CARDS: Card[] = [
  {
    bg: "#E8F4F6",
    border: "#D2E9ED",
    accent: "#1E88A8",
    pill: "1:1 + AI Support",
    title: "Tutors backed by AI",
    desc: "Your tutor leads every class and gets to know how your child learns best. An AI teacher is on call between sessions to clear doubts instantly.",
    icon: Users,
  },
  {
    bg: "#FCEAE3",
    border: "#F7D6C9",
    accent: "#E4572E",
    pill: "Diagnostics + PTMs",
    title: "Real progress, tracked",
    desc: "Scheduled diagnostic tests track real progress over time, followed by parent-teacher meetings to walk through the results together.",
    icon: ClipboardCheck,
  },
  {
    bg: "#F6ECF7",
    border: "#EBDCEC",
    accent: "#AD71AF",
    pill: "Built around your child",
    title: "Fully personalized",
    desc: "There's no fixed curriculum. Every course adapts to your child's level, pace and goals as they grow.",
    icon: SlidersHorizontal,
  },
];

export default function NSWhySheldon({ locale = "global" }: { locale?: Locale } = {}) {
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="relative py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div {...riseOnce(reduce)} className="text-center mb-10 md:mb-14">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            style={{ color: NAVY }}
          >
            Why <span style={{ color: GOLD }}>Super Sheldon</span>?
          </h2>
          <p className="mt-3 text-gray-600 text-base sm:text-lg max-w-xl mx-auto">
            Three things we never compromise on.
          </p>
        </motion.div>

        {/* items-stretch + h-full on each card keeps all three the same height
            regardless of copy length. */}
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 items-stretch"
        >
          {CARDS.map((card) => (
            <WhyCard key={card.title} card={card} reduce={reduce} />
          ))}
        </motion.div>

        {/* Closing CTA — a link to the booking page that the popup intercepts,
            so it still works for crawlers and middle-clicks. */}
        <motion.div {...riseOnce(reduce, 20)} className="mt-9 md:mt-11 text-center">
          <Link
            href={DEMO_PATH[locale]}
            onClick={openDemoOnClick}
            className={`inline-flex items-center justify-center rounded-full bg-[#FFCC00] hover:bg-[#e6b800] text-black font-bold text-[15px] px-8 py-3.5 shadow-md shadow-yellow-500/30 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e6b800] focus-visible:ring-offset-2 ${CSS_TRANSITION}`}
          >
            Try a Free Class
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function WhyCard({ card, reduce }: { card: Card; reduce: boolean }) {
  const { onMouseMove, onMouseLeave, background } = useSpotlight();
  const Icon = card.icon;

  return (
    <motion.article
      variants={rise(reduce, 28)}
      whileHover={hoverLift(reduce)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`group relative h-full flex flex-col overflow-hidden rounded-[1.75rem] border p-6 md:p-7 shadow-sm hover:shadow-lg ${CSS_TRANSITION}`}
      style={{ background: card.bg, borderColor: card.border }}
    >
      <SpotlightOverlay background={background} />

      <div className="relative flex items-center gap-3.5 mb-3.5">
        <span
          className="w-[50px] h-[50px] rounded-[15px] flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-105 transition-transform duration-300"
          style={{ background: card.accent }}
        >
          <Icon size={25} strokeWidth={2} />
        </span>
        <span
          className="text-[11px] font-extrabold uppercase tracking-[0.06em] text-white px-3.5 py-1.5 rounded-full"
          style={{ background: card.accent }}
        >
          {card.pill}
        </span>
      </div>

      <h3 className="relative text-lg md:text-xl font-bold text-gray-900 leading-snug mb-2 text-balance">
        {card.title}
      </h3>
      <p className="relative text-gray-600 leading-relaxed text-[14px]">{card.desc}</p>
    </motion.article>
  );
}
