"use client";

import type { CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { TRACKS, TRACK_KEYS } from "../quiz-data";
import { useLiveCount } from "../counters";

const META = [
  { icon: "⏱️", label: "~3 minutes" },
  { icon: "📝", label: "9 questions" },
  { icon: "✅", label: "No wrong answers" },
];

const PROOF = [
  "Aligned to AU & UK curricula",
  "Expert 1-on-1 tutors",
  "Real exam practice",
  "Trusted by parents",
];

interface Props {
  onStart: () => void;
  onCompare: () => void;
}

export default function WelcomeScreen({ onStart, onCompare }: Props) {
  const live = useLiveCount();

  return (
    <div className="text-center">
      <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-600">
        ✦ Pathway Finder
      </span>

      <h1 className="mt-5 text-4xl font-bold leading-tight text-[#0D1B2A] sm:text-5xl">
        Find the pathway <span className="text-orange-500">built for your child.</span>
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        9 quick questions · 3 pathways · one plan that fits.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {META.map((m) => (
          <span
            key={m.label}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
          >
            <span>{m.icon}</span>
            {m.label}
          </span>
        ))}
      </div>

      <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
        {TRACK_KEYS.map((key, i) => {
          const t = TRACKS[key];
          return (
            <div
              key={t.key}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ "--tc": t.color } as CSSProperties}
            >
              <div
                className="text-xs font-bold uppercase tracking-wide"
                style={{ color: "var(--tc)" }}
              >
                Pathway 0{i + 1}
              </div>
              <div className="mt-1 flex items-center gap-2 text-lg font-bold text-[#0D1B2A]">
                <span>{t.icon}</span>
                {t.shortName}
              </div>
              <p className="mt-2 text-sm text-slate-600">{t.tagline}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-600 shadow-sm">
        {PROOF.map((p) => (
          <span key={p} className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            {p}
          </span>
        ))}
      </div>

      <div className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm text-green-700">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
        </span>
        <strong className="tabular-nums">
          {live === null ? "—" : live.toLocaleString()}
        </strong>
        parents exploring right now
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button onClick={onStart} variant="gradient" size="xl">
          Find My Child&apos;s Pathway →
        </Button>
        <button
          onClick={onCompare}
          className="text-sm font-semibold text-slate-500 transition hover:text-orange-500"
        >
          Compare all three →
        </button>
      </div>
    </div>
  );
}
