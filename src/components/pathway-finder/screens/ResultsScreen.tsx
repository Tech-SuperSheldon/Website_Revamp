"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { TRACKS } from "../quiz-data";
import type { ScoreResult } from "../scoring";
import { getTrackCount } from "../counters";

// Same Super Sheldon WhatsApp number used by the floating button site-wide.
const WAPP_PHONE = "917974695618";

interface Props {
  result: ScoreResult;
  onCompare: () => void;
  onRetake: () => void;
}

export default function ResultsScreen({ result, onCompare, onRetake }: Props) {
  const t = TRACKS[result.winner];
  const secondKey = result.sortedKeys.find((k) => k !== result.winner)!;
  const isClose = result.confidence !== "clear";

  // Pre-filled WhatsApp message carrying the matched pathway + scores so the
  // team has full context the moment the family reaches out.
  const waMessage =
    `Hi Super Sheldon! I just took the Pathway Finder and my child matched with ` +
    `*${t.name}* (${result.percentages[result.winner]}% match). ` +
    `I'd love to know more about the courses for this pathway.`;
  const waUrl =
    `https://api.whatsapp.com/send/?phone=${WAPP_PHONE}` +
    `&text=${encodeURIComponent(waMessage)}&type=phone_number&app_absent=0`;

  // Daily-seeded stat resolved on the client to avoid hydration mismatch.
  const [matched, setMatched] = useState<number | null>(null);
  useEffect(() => {
    setMatched(getTrackCount(result.winner));
  }, [result.winner]);

  return (
    <div>
      <div className="text-center">
        <span className="inline-block rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-600">
          Your Match
        </span>
        <h2 className="mt-4 text-3xl font-bold text-[#0D1B2A] sm:text-4xl">
          {t.name}
        </h2>
        <p className="mt-3 text-lg text-slate-600">{t.tagline}</p>
      </div>

      {isClose && (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <strong>⚡ Close match</strong> — your child fits both{" "}
          <strong>{t.shortName}</strong> and{" "}
          <strong>{TRACKS[secondKey].shortName}</strong>. Worth reading both.
        </div>
      )}

      <div
        className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg"
        style={{ "--tc": t.color } as CSSProperties}
      >
        <div className="border-b-4 p-6" style={{ borderColor: "var(--tc)" }}>
          <div className="flex flex-wrap items-center gap-4">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
              style={{ backgroundColor: `${t.color}1a` }}
            >
              {t.icon}
            </div>
            <div className="text-lg font-bold text-[#0D1B2A]">{t.name}</div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Match scores
            </div>
            {result.sortedKeys.map((k) => (
              <div key={k} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-sm font-semibold text-slate-500">
                  {TRACKS[k].shortName}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: TRACKS[k].color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${result.percentages[k]}%` }}
                    transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                  />
                </div>
                <span
                  className="w-10 text-right text-sm font-bold tabular-nums"
                  style={{ color: TRACKS[k].color }}
                >
                  {result.percentages[k]}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6 p-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Why this fits
            </div>
            <div className="mt-2 space-y-2">
              {t.reasons.map((r, i) => (
                <p key={i} className="text-slate-700">
                  {r}
                </p>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-slate-400">
              What your child will work on
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {t.projects.map((p) => (
                <span
                  key={p}
                  className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Prepares them for
            </div>
            <p className="mt-1 text-slate-700">{t.outcomes}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="text-3xl font-bold tabular-nums text-orange-500">
          {matched === null ? "—" : matched.toLocaleString()}
        </div>
        <div className="text-sm text-slate-600">
          <strong className="block text-[#0D1B2A]">
            families matched to {t.shortName}
          </strong>
          Updated daily
        </div>
      </div>

      {/* Talk to an advisor / share the result over WhatsApp */}
      <div className="mt-6 rounded-3xl border border-green-200 bg-green-50 p-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-500">
              <FaWhatsapp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0D1B2A]">
                Want help choosing a course?
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Send your {t.shortName} match to our team on WhatsApp and we'll
                suggest the right course for your child.
              </p>
            </div>
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-600 sm:w-auto"
          >
            <FaWhatsapp className="h-5 w-5" />
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="mt-6 rounded-3xl bg-[#0D1B2A] p-8 text-center text-white">
        <h3 className="text-2xl font-bold">Your next step.</h3>
        <p className="mt-2 text-slate-300">
          See the courses built around this pathway.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="gradient" size="xl">
            <Link href={t.programLink}>Explore {t.shortName} →</Link>
          </Button>
          <button
            onClick={onCompare}
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold transition hover:bg-white/10"
          >
            Compare all pathways
          </button>
          <button
            onClick={onRetake}
            className="text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            ↺ Retake
          </button>
        </div>
      </div>
    </div>
  );
}
