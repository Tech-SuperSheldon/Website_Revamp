"use client";

import { useEffect, useRef, useState } from "react";
import type { TrackKey } from "./quiz-data";

// ─── "Families matched" — stable for the whole calendar day ────
// Deterministic per-track count seeded by today's date so the number
// doesn't jump on reload. These figures are illustrative social proof.
function dailySeed(): number {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

function seededRandom(seed: number): number {
  let s = seed;
  s = Math.imul(s ^ (s >>> 17), 0x45d9f3b);
  s = Math.imul(s ^ (s >>> 13), 0x45d9f3b);
  s = (s ^ (s >>> 15)) >>> 0;
  return (s & 0xfffff) / 0xfffff; // 0–1
}

const TRACK_RANGES: Record<TrackKey, { min: number; max: number }> = {
  naplan: { min: 6200, max: 8400 },
  icas: { min: 3100, max: 4800 },
  hsc: { min: 4200, max: 6100 },
};

export function getTrackCount(key: TrackKey): number {
  const offset = key === "naplan" ? 3 : key === "icas" ? 11 : 17;
  const r = seededRandom(dailySeed() * 7 + offset);
  const range = TRACK_RANGES[key];
  return Math.round(range.min + r * (range.max - range.min));
}

// ─── Live "parents exploring right now" — time-of-day aware ─────
// Seeds from a local-time baseline, then only ever ticks upward.
function baseLiveUsers(hour: number): number {
  if (hour < 7 || hour >= 22) return Math.floor(30 + Math.random() * 23); // 30–52 at night
  let base: number;
  if (hour < 9) base = 120 + (hour - 7) * 40;
  else if (hour < 12) base = 200 + (hour - 9) * 60;
  else if (hour < 18) base = 380 + Math.sin(((hour - 12) / 6) * Math.PI) * 100;
  else if (hour < 20) base = 320 - (hour - 18) * 55;
  else base = 210 - (hour - 20) * 45;
  return Math.floor(base + (Math.random() - 0.5) * 30);
}

// Returns null until mounted (avoids hydration mismatch), then a live number.
export function useLiveCount(): number | null {
  const [count, setCount] = useState<number | null>(null);
  const value = useRef(0);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const hour = now.getHours() + now.getMinutes() / 60;
      const isNight = hour < 7 || hour >= 22;
      if (value.current === 0) value.current = baseLiveUsers(hour);
      const cap = isNight ? 52 : 500;
      const step = Math.floor(1 + Math.random() * (isNight ? 4 : 10));
      value.current = Math.min(cap, value.current + step);
      setCount(value.current);
    };
    tick();
    const id = setInterval(tick, 45000);
    return () => clearInterval(id);
  }, []);

  return count;
}
