"use client";

// The campaign landing page behind /learn-maths, /learn-english and /learn-science.
//
// These are bought traffic, so the page is deliberately a dead end: no header, no
// footer, no outbound links other than the logo, which goes back to the market
// homepage. Everything else on it either builds trust (ratings, stats) or fills
// the booking wizard, which is the only interactive element.
//
// Layout is one grid that reads as a single column on phones and splits at `lg`:
// proof and headline on the left, the form card on the right. The mobile order is
// not the DOM order — `order-*` utilities put the ratings and stats above the
// headline on a phone (you scroll past them before the fold, so they have to land
// first) and back below it on a desktop, where the left column is read top-down.
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import LearnForm from "@/components/LearnForm/LearnForm";
import LearnFooter from "@/components/LearnForm/LearnFooter";
import Highlight from "@/components/motion/Highlight";
import { DUR, EASE } from "@/lib/motion";

// Same two homepage sections, loaded below the fold — no reason to ship them
// in the initial bundle on a page whose whole job above the fold is the form.
const NSWhySheldon = dynamic(() => import("@/components/NSWhySheldon"));
const NSParentsSaying = dynamic(() => import("@/components/NSParentsSaying"));

export type LearnSubject = "Maths" | "English" | "Science";

// Per-subject dressing. The form's own accent stays SuperSheldon orange on all
// three pages — only the eyebrow and the bullet copy shift, which gives each
// page its own feel without three different-looking wizards.
const THEME: Record<LearnSubject, { eyebrow: string; bullets: string[] }> = {
  Maths: {
    eyebrow: "Numbers that finally click",
    bullets: [
      "Mental maths, fractions, algebra — built up from the gaps, not the syllabus",
      "Every class is 1:1 and live, never a recording",
      "A written progress note after each session",
    ],
  },
  English: {
    eyebrow: "Reading, writing and real confidence",
    bullets: [
      "Comprehension, creative writing and grammar taught through real texts",
      "Every class is 1:1 and live, never a recording",
      "A written progress note after each session",
    ],
  },
  Science: {
    eyebrow: "Curiosity that survives the exam",
    bullets: [
      "Biology, chemistry and physics explained with things you can picture",
      "Every class is 1:1 and live, never a recording",
      "A written progress note after each session",
    ],
  },
};

const STATS = [
  { value: "10,000+", label: "Learners taught" },
  { value: "500+", label: "Verified tutors" },
  { value: "15+", label: "Countries reached" },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/** The dismissible urgency strip that sits on top of the wizard. */
function SlotsNotice({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[#FFD9BC] bg-[#FFF4EA] px-4 py-3">
      <span aria-hidden className="mt-px text-base leading-none">
        📌
      </span>
      <p className="flex-1 text-sm font-medium leading-snug text-[#8A4B1B]">
        Limited slots today — book your free 1:1 demo class
      </p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        className="-mr-1 -mt-1 rounded-full p-1 text-[#C08457] transition-colors hover:bg-[#FFE6D2] hover:text-[#8A4B1B]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

/** One card in the Google / Trustpilot / STEM row. */
function TrustCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-1 rounded-2xl border border-black/5 bg-white/80 px-2.5 py-2.5 text-center shadow-sm backdrop-blur-sm sm:gap-1.5 sm:px-3 sm:py-3">
      {children}
    </div>
  );
}

export default function LearnLanding({
  subject,
  country = "global",
}: {
  subject: LearnSubject;
  /** Which market this page is for — "global", "au" or "uk". Passed straight through
   *  to the wizard, which uses it to preset the phone dial code/timezone, tag the
   *  Google Sheet row, and route the post-booking "Back to Home" link. */
  country?: "global" | "au" | "uk";
}) {
  const reduce = useReducedMotion();
  const [dismissedSlots, setDismissedSlots] = useState(false);
  const [booked, setBooked] = useState(false);
  const theme = THEME[subject];
  const homeHref = country === "global" ? "/" : `/${country}`;

  // One entrance, staggered by depth — the page is above the fold in its entirety,
  // so nothing here is scroll-triggered.
  const enter = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduce ? 0 : DUR.slow,
      ease: EASE,
      delay: reduce ? 0 : delay,
    },
  });

  return (
    <main className="new-home-bg">
      <section className="relative lg:h-[100svh]">
        <div className="relative mx-auto grid w-full max-w-7xl items-start gap-5 px-4 py-5 sm:gap-8 sm:px-6 sm:py-10 lg:h-full lg:grid-cols-[1fr_minmax(24rem,27rem)] lg:items-stretch lg:gap-12 lg:py-[clamp(0.75rem,3.2vh,3rem)] xl:gap-16">
          {/* ── Left: identity, proof, headline ── */}
          <div className="flex flex-col items-center lg:min-h-0 lg:items-start lg:justify-center">
            {/* Mobile-only header: logo left, urgency copy right. The ribbon, ratings,
              stats strip and headline below are all shown on mobile too (right above
              the form); only the supporting bullets stay desktop-only. */}
            <motion.div
              {...enter(0)}
              className="order-1 flex w-full items-center justify-between gap-3 lg:hidden"
            >
              <Link href={homeHref} aria-label="Super Sheldon home" className="shrink-0">
                <Image
                  src="/logo.webp"
                  alt="Super Sheldon"
                  width={1563}
                  height={703}
                  priority
                  className="h-auto w-[120px]"
                />
              </Link>
              <p className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#FFD9BC] bg-[#FFF4EA] py-1.5 pl-2 pr-3 text-left text-[11px] font-bold leading-tight text-[#B4560F] shadow-sm">
                {/* Google's Noto animated 🔥 (animated WebP). `unoptimized` so
                    the image optimizer doesn't flatten it to a single frame. */}
                <Image
                  src="/fire-emoji.webp"
                  alt=""
                  aria-hidden
                  width={512}
                  height={512}
                  unoptimized
                  className="h-6 w-6 shrink-0"
                />
                <span>
                  Limited slots
                  <br />
                  Book now
                </span>
              </p>
            </motion.div>

            <motion.div {...enter(0)} className="order-1 hidden lg:block">
              <Link href={homeHref} aria-label="Super Sheldon home">
                <Image
                  src="/logo.webp"
                  alt="Super Sheldon"
                  width={1563}
                  height={703}
                  priority
                  className="h-auto w-[clamp(220px,26vh,340px)]"
                />
              </Link>
            </motion.div>

            {/* The yellow platform ribbon. */}
            <motion.p
              {...enter(0.06)}
              className="order-2 mt-2.5 block rounded-md bg-[#FFCC00] sm:mt-5 px-4 py-2 text-center font-heading text-[0.95rem] font-extrabold uppercase tracking-[0.06em] text-[#03215F] shadow-sm sm:text-lg lg:mt-[clamp(0.4rem,1.7vh,1.25rem)] lg:block lg:px-[clamp(0.6rem,1.6vh,1rem)] lg:py-[clamp(0.2rem,0.9vh,0.5rem)] lg:text-[clamp(0.85rem,1.9vh,1.125rem)]"
            >
              Interactive Learning Platform
            </motion.p>

            {/* Ratings + accreditation. */}
            <motion.div
              {...enter(0.12)}
              className="order-3 mt-2.5 grid w-full max-w-lg grid-cols-3 gap-2.5 sm:mt-6 sm:gap-3 lg:order-5 lg:mt-[clamp(0.7rem,2.8vh,2.25rem)] lg:grid lg:max-w-xl"
            >
              <TrustCard>
                <Image
                  src="/googlev2.webp"
                  alt="Google reviews — 4.8 out of 5 stars"
                  width={2416}
                  height={1009}
                  className="h-auto w-[86px] sm:w-[104px]"
                />
                <span className="text-[11px] font-semibold text-gray-600 sm:text-xs">
                  4.8 / 5 stars
                </span>
              </TrustCard>

              <TrustCard>
                <Image
                  src="/trustpilot.png"
                  alt="Trustpilot — rated Excellent"
                  width={778}
                  height={331}
                  className="h-auto w-[92px] sm:w-[110px]"
                />
                <span className="text-[11px] font-semibold text-gray-600 sm:text-xs">
                  Excellent
                </span>
              </TrustCard>

              <TrustCard>
                <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-gray-500 sm:text-[10px]">
                  Accredited by
                </span>
                <Image
                  src="/Stem.webp"
                  alt="STEM.org accredited educational experience"
                  width={810}
                  height={366}
                  className="h-auto w-[76px] sm:w-[92px]"
                />
              </TrustCard>
            </motion.div>

            {/* Stats strip. */}
            <motion.div
              {...enter(0.18)}
              className="order-4 mt-2.5 grid w-full max-w-lg grid-cols-3 divide-x divide-[#F0E3D6] rounded-2xl border border-black/5 bg-white/80 py-2.5 shadow-sm backdrop-blur-sm sm:mt-3 sm:py-3 lg:order-6 lg:mt-[clamp(0.4rem,1.2vh,0.75rem)] lg:grid lg:max-w-xl lg:py-[clamp(0.4rem,1.3vh,0.75rem)]"
            >
              {STATS.map((s) => (
                <div key={s.label} className="px-1 text-center">
                  <p className="font-heading text-xl font-extrabold text-[#FC8741] sm:text-2xl">
                    {s.value}
                  </p>
                  <p className="mt-0.5 whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.04em] text-gray-500 sm:text-[10px] sm:tracking-[0.06em]">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Headline. */}
            <motion.div
              {...enter(0.24)}
              className="order-5 mt-3 block sm:mt-8 lg:order-3 lg:block lg:mt-[clamp(0.5rem,2.2vh,2rem)]"
            >
              <p className="text-center text-sm font-bold uppercase tracking-[0.12em] text-[#FC8741] lg:text-left lg:text-[clamp(0.7rem,1.5vh,0.875rem)]">
                {theme.eyebrow}
              </p>
              <h1 className="mt-2 text-balance text-center font-heading text-[clamp(1.35rem,5.6vw,1.8rem)] font-extrabold leading-[1.18] text-[#03215F] sm:text-4xl lg:text-left lg:text-[clamp(1.8rem,4.4vh,3rem)]">
                Don&apos;t just Nod, but Outshine
                <br />
                Book Free{" "}
                {/* The marker bar is a sibling so it can sit behind the word without
                  clipping the descenders in "Maths"/"English". */}
                <span className="relative inline-block">
                  <motion.span
                    aria-hidden
                    className="absolute bottom-[0.15em] left-0 z-0 h-[0.45em] w-full origin-left rounded-[3px] bg-[#FFCC00]/80"
                    initial={{ scaleX: reduce ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: reduce ? 0 : DUR.base,
                      ease: EASE,
                      delay: reduce ? 0 : 0.6,
                    }}
                  />
                  <span className="relative z-10">{subject}</span>
                </span>{" "}
                Class Now!
              </h1>
            </motion.div>

            {/* Supporting bullets — desktop only; on a phone they would only push the
              form below a second fold. */}
            <motion.ul
              {...enter(0.3)}
              className="order-6 hidden lg:order-4 lg:mt-[clamp(0.5rem,1.9vh,1.5rem)] lg:block lg:space-y-[clamp(0.25rem,1vh,0.625rem)]"
            >
              {theme.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2.5 text-[0.95rem] leading-snug text-gray-600 lg:text-[clamp(0.78rem,1.55vh,0.95rem)]"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFEDE2] text-[#FC8741]">
                    <CheckIcon />
                  </span>
                  {b}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* ── Right: the booking wizard ── */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduce ? 0 : DUR.slow,
              ease: EASE,
              delay: reduce ? 0 : 0.1,
            }}
            className="w-full lg:flex lg:min-h-0 lg:flex-col lg:justify-center"
          >
            <div className="rounded-[1.75rem] bg-white/55 p-1.5 shadow-[0_24px_60px_-24px_rgba(3,33,95,0.3)] ring-1 ring-black/5 backdrop-blur-sm lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain">
              <div className="overflow-hidden rounded-[1.4rem] bg-white">
                {!dismissedSlots && !booked && (
                  /* Sits above the wizard rather than inside it, so dismissing it
                   leaves the card's own top padding intact. Hidden on mobile,
                   where the same "limited slots" copy already sits in the
                   header above the form. */
                  <div className="hidden px-5 pt-5 sm:px-8 sm:pt-8 lg:block">
                    <SlotsNotice onDismiss={() => setDismissedSlots(true)} />
                  </div>
                )}
                <LearnForm
                  country={country}
                  subject={subject}
                  variant="embed"
                  audience="parent"
                  heading={null}
                  onBooked={() => setBooked(true)}
                />
              </div>
            </div>

            <p className="mt-3 text-center text-xs text-gray-500 sm:mt-4 lg:shrink-0">
              {booked
                ? "A confirmation and the class link are on their way to your phone."
                : "100% free · No card required · Takes under a minute"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Same two sections as the homepage, kept for trust-building beneath
          the fold — everything else on this page is the form itself. */}
      <motion.h2
        initial={{ opacity: 0, y: reduce ? 0 : 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: reduce ? 0 : DUR.slow, ease: EASE }}
        className="px-4 pt-8 text-center text-3xl font-bold tracking-tight text-[#03215F] sm:px-6 sm:text-4xl md:pt-12 md:text-5xl"
      >
        Loved by{" "}
        <Highlight reduce={reduce} bar="bg-[#fedbc6]/70">
          Kids
        </Highlight>
        , Trusted by{" "}
        <Highlight reduce={reduce} bar="bg-[#fedbc6]/70">
          Parents
        </Highlight>
      </motion.h2>
      <NSWhySheldon showCta={false} />
      <NSParentsSaying />
      <LearnFooter country={country} />
    </main>
  );
}
