"use client";

import { TRACKS, TRACK_KEYS, COMPARE } from "../quiz-data";

interface Props {
  onBack: () => void;
}

export default function CompareScreen({ onBack }: Props) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-[#0D1B2A] sm:text-3xl">
          Compare all three pathways
        </h2>
        <button
          onClick={onBack}
          className="text-sm font-semibold text-slate-500 transition hover:text-orange-500"
        >
          ← Back
        </button>
      </div>

      <div className="mt-3 rounded-2xl border border-orange-100 bg-orange-50 p-4 text-sm text-slate-700">
        <strong>Same goal — your child&apos;s success.</strong> Each pathway is a
        different route there, and many families blend them as their child grows.
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr>
              <th className="p-3" />
              {TRACK_KEYS.map((k) => (
                <th key={k} className="p-3 align-bottom">
                  <div
                    className="text-base font-bold"
                    style={{ color: TRACKS[k].color }}
                  >
                    <span className="mr-1">{TRACKS[k].icon}</span>
                    {TRACKS[k].shortName}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE.map((row) => (
              <tr key={row.dimension} className="border-t border-slate-200">
                <td className="p-3 font-semibold text-slate-500">
                  {row.dimension}
                </td>
                {TRACK_KEYS.map((k) => (
                  <td key={k} className="p-3 text-slate-700">
                    {row[k]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
