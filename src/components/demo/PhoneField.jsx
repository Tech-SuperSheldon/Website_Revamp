"use client";

// Phone input with a country-code selector (flag + dial code). Controlled by
// the parent: it owns `country` and the `nationalNumber` (digits only). The
// dial code is auto-detected once from the device location (see BookDemo).
import { useEffect, useRef, useState } from "react";
import { COUNTRIES } from "./countries";

export default function PhoneField({
  country,
  onCountryChange,
  nationalNumber,
  onNationalChange,
  error,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef(null);

  // Close the dropdown on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const filtered = query.trim()
    ? COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.dial.includes(query.replace(/\D/g, "")) ||
          c.iso.toLowerCase().includes(query.toLowerCase())
      )
    : COUNTRIES;

  return (
    <div className="relative" ref={wrapRef}>
      <div
        className={`flex items-stretch overflow-hidden rounded-lg border bg-white focus-within:ring-2 focus-within:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        {/* Country selector */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex shrink-0 items-center gap-1.5 border-r border-gray-200 bg-gray-50 px-3 text-gray-800 transition-colors hover:bg-gray-100"
          aria-label="Select country code"
        >
          <span className="text-lg leading-none">{country?.flag}</span>
          <span className="text-sm font-semibold">+{country?.dial}</span>
          <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>

        {/* National number */}
        <input
          type="tel"
          inputMode="numeric"
          value={nationalNumber}
          onChange={(e) => onNationalChange(e.target.value.replace(/[^\d]/g, ""))}
          placeholder="4XX XXX XXX"
          className="w-full bg-transparent px-4 py-3 outline-none"
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="relative z-30 mt-1 max-h-72 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">
          <div className="border-b border-gray-100 p-2">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country or code…"
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
            />
          </div>
          <ul className="max-h-56 overflow-y-auto py-1">
            {filtered.map((c) => (
              <li key={c.iso}>
                <button
                  type="button"
                  onClick={() => {
                    onCountryChange(c);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors hover:bg-blue-50 ${
                    country?.iso === c.iso ? "bg-blue-50/60 font-semibold" : ""
                  }`}
                >
                  <span className="text-lg leading-none">{c.flag}</span>
                  <span className="flex-1 text-gray-800">{c.name}</span>
                  <span className="text-gray-500">+{c.dial}</span>
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-3 py-3 text-center text-sm text-gray-400">No matches</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
