"use client";

// Searchable "select" for country of residence. Behaves like a combobox:
// click (or focus) to open the full list, or start typing to filter it live.
import { useEffect, useRef, useState } from "react";
import { COUNTRIES, findByIso } from "./countries";

export default function CountrySelect({ value, onChange, error, placeholder = "Select your country" }) {
  const selected = findByIso(value);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  // Close the dropdown on outside click / Escape; revert an unmatched query.
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const filtered = query.trim()
    ? COUNTRIES.filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase()))
    : COUNTRIES;

  useEffect(() => {
    setHighlighted(0);
  }, [query, open]);

  const selectCountry = (c) => {
    onChange(c.iso);
    setOpen(false);
    setQuery("");
  };

  const handleKeyDown = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[highlighted]) selectCountry(filtered[highlighted]);
    }
  };

  return (
    <div className="relative" ref={wrapRef}>
      <div
        className={`flex items-center overflow-hidden rounded-lg border bg-white focus-within:ring-2 focus-within:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        {selected && !open && <span className="pl-4 text-lg leading-none">{selected.flag}</span>}
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          value={open ? query : selected?.name || ""}
          onFocus={() => {
            setOpen(true);
            setQuery("");
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!open) setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full bg-transparent px-4 py-3 outline-none"
        />
        <svg
          onClick={() => {
            setOpen((o) => !o);
            inputRef.current?.focus();
          }}
          className="mr-3 h-4 w-4 shrink-0 cursor-pointer text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {open && (
        <div className="absolute z-30 mt-1 max-h-64 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-xl">
          {filtered.length === 0 && (
            <div className="px-3 py-3 text-center text-sm text-gray-400">No matches</div>
          )}
          <ul className="py-1">
            {filtered.map((c, i) => (
              <li key={c.iso}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => selectCountry(c)}
                  onMouseEnter={() => setHighlighted(i)}
                  className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors ${
                    i === highlighted ? "bg-blue-50" : ""
                  } ${value === c.iso ? "font-semibold text-blue-700" : "text-gray-800"}`}
                >
                  <span className="text-lg leading-none">{c.flag}</span>
                  <span className="flex-1">{c.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
