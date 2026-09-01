"use client";

// Combined "Trusted by Families in ..." + stats bar, shown right below the
// hero. The two used to be separate sections (a mobile-only flags strip here,
// and the 10,000+/500+/15+ counters living inside the student-testimonial
// card) — merged into one bar per request, with a divider between the two
// halves. Desktop keeps everything on one row; mobile stacks the flags above
// the stats since 5 flags + 3 stats won't fit one line at readable size.
import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

const COUNTRIES = [
  { flag: "🇬🇧", label: "UK" },
  { flag: "🇦🇺", label: "Australia" },
  { flag: "🇺🇸", label: "USA" },
  { flag: "🇪🇺", label: "European Countries" },
  { flag: "🇳🇿", label: "New Zealand" },
];

const STATS = [
  { to: 10000, label: "Learners taught" },
  { to: 500, label: "Verified tutors" },
  { to: 15, label: "Countries reached" },
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

export default function TrustedByBar() {
  return (
    <section className="py-6 md:py-10 px-4">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-8 max-w-4xl mx-auto">
        {/* Flags — the "Trusted by..." label belongs to this column, not the
            merged bar as a whole. It used to sit above the full-width row, so
            on desktop it centered over both groups combined and landed between
            them instead of over the flags. */}
        <div className="flex flex-col items-center gap-3 lg:gap-4">
          <p className="text-center text-[13px] md:text-sm font-bold tracking-[0.12em] text-slate-500 uppercase">
            Trusted by Families In
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:gap-x-7 max-w-xs lg:max-w-none">
            {COUNTRIES.map((c) => (
              <span
                key={c.label}
                className="flex items-center gap-1.5 lg:gap-2 text-[15px] lg:text-base font-bold text-[#0b2545] whitespace-nowrap"
              >
                <span className="text-lg lg:text-xl leading-none">{c.flag}</span> {c.label}
              </span>
            ))}
          </div>
        </div>

        {/* Divider: a rule on mobile (stacked), a vertical bar on desktop (inline) */}
        <div className="w-16 h-px lg:w-px lg:h-16 bg-slate-200 shrink-0" />

        {/* Stats */}
        <div className="flex items-center justify-center gap-6 lg:gap-9">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <h3 className="text-2xl lg:text-3xl font-rowdies font-black tracking-tighter text-[#FC8741]">
                <Counter to={s.to} suffix="+" />
              </h3>
              <p className="text-[9px] lg:text-[11px] text-gray-900 font-bold uppercase tracking-widest mt-1 whitespace-nowrap">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
