"use client";

// "Trusted by Families In" marquee + stats bar, shown right below the hero.
//
// Replaces the old static 5-flag row: the countries now scroll as two grouped
// marquee rows — row 1 the main markets (UK, USA, Australia, Canada, Singapore,
// New Zealand), row 2 the remaining ones (Europe + the six Gulf countries) —
// running in opposite directions so the strip reads as movement rather than a
// single sliding line. Every chip shares one style; on mobile the names shorten
// to codes and the rows run faster so several stay visible on the narrow
// screen. The stats half below the divider is unchanged apart from the count.
import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

// Row 1 — the main, more influential markets. Short enough that on desktop the
// whole set is visible at once almost continuously.
const MAIN_MARKETS = [
  { flag: "🇬🇧", name: "UK", short: "UK" },
  { flag: "🇺🇸", name: "USA", short: "USA" },
  { flag: "🇦🇺", name: "Australia", short: "AU" },
  { flag: "🇨🇦", name: "Canada", short: "CA" },
  { flag: "🇸🇬", name: "Singapore", short: "SG" },
  { flag: "🇳🇿", name: "New Zealand", short: "NZ" },
];

// Row 2 — everything else: Europe, then the Gulf.
const OTHER_MARKETS = [
  { flag: "🇫🇷", name: "France", short: "FR" },
  { flag: "🇩🇪", name: "Germany", short: "DE" },
  { flag: "🇮🇹", name: "Italy", short: "IT" },
  { flag: "🇪🇸", name: "Spain", short: "ES" },
  { flag: "🇸🇦", name: "Saudi Arabia", short: "Saudi" },
  { flag: "🇦🇪", name: "UAE", short: "UAE" },
  { flag: "🇶🇦", name: "Qatar", short: "Qatar" },
  { flag: "🇰🇼", name: "Kuwait", short: "Kuwait" },
  { flag: "🇧🇭", name: "Bahrain", short: "Bahrain" },
  { flag: "🇴🇲", name: "Oman", short: "Oman" },
];

const STATS = [
  { to: 10000, label: "Learners taught", shortLabel: "Learners" },
  { to: 500, label: "Verified tutors", shortLabel: "Tutors" },
  // 6 main markets + 10 others = 16.
  { to: 16, label: "Countries reached", shortLabel: "Countries" },
];

function Counter({ to, suffix }) {
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    const node = nodeRef.current;
    if (node && inView) {
      const controls = animate(0, to, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = Math.floor(value).toLocaleString("en-US") + suffix;
        },
      });
      return () => controls.stop();
    }
  }, [to, suffix, inView]);

  return <span ref={nodeRef}>0{suffix}</span>;
}

function Chip({ country }) {
  return (
    <span className="tb-chip">
      <span className="tb-flag">{country.flag}</span>
      {/* Full name on desktop, code on mobile — both rendered, one hidden, so
          the markup is identical server- and client-side. */}
      <span className="hidden md:inline">{country.name}</span>
      <span className="md:hidden">{country.short}</span>
    </span>
  );
}

// The list is rendered twice inside the track: the animation travels exactly
// -50%, so the second copy lands where the first started and the loop is seamless.
function MarqueeRow({ countries, reverse = false }) {
  return (
    <div className="tb-row" aria-hidden="true">
      <div className={`tb-track${reverse ? " tb-track--reverse" : ""}`}>
        {[...countries, ...countries].map((c, i) => (
          <Chip key={`${c.name}-${i}`} country={c} />
        ))}
      </div>
    </div>
  );
}

export default function TrustedByBar() {
  return (
    <section className="py-6 md:py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-[11px] md:text-sm font-bold tracking-[0.14em] md:tracking-[0.16em] text-slate-500 uppercase mb-4 md:mb-6">
          Trusted by Families In
        </p>

        <MarqueeRow countries={MAIN_MARKETS} />
        <MarqueeRow countries={OTHER_MARKETS} reverse />

        {/* Screen readers get the plain list once, without the duplicated
            marquee copies. */}
        <p className="sr-only">
          Trusted by families in{" "}
          {[...MAIN_MARKETS, ...OTHER_MARKETS].map((c) => c.name).join(", ")}.
        </p>

        {/* Stats — same split as before, the flags half above and the counters below. */}
        <div className="mt-6 md:mt-8 pt-5 md:pt-6 flex items-center justify-between sm:justify-center gap-4 sm:gap-10 lg:gap-16">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <h3 className="text-2xl lg:text-3xl font-rowdies font-black tracking-tighter text-[#FC8741]">
                <Counter to={s.to} suffix="+" />
              </h3>
              <p className="text-[9px] lg:text-[11px] text-[#03215F] font-bold uppercase tracking-widest mt-1 whitespace-nowrap">
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{s.shortLabel}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
