"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import axiosClient from "@/components/utils/axios";
// @ts-ignore - JS component, no type declarations
import GlossyButtonBase from "@/components/GlossyButton";
// @ts-ignore - JS component, no type declarations
import PhoneField from "@/components/demo/PhoneField";
// @ts-ignore - JS module, no type declarations
import { findByIso } from "@/components/demo/countries";

type MarketCountry = "uk" | "au";
type Subject = string;

// GlossyButton is a plain .jsx component whose href/target/rel/onClick are
// only conditionally required at runtime; cast so TS doesn't demand all of
// them at every call site.
const GlossyButton = GlossyButtonBase as any;

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

function captureUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const fromUrl: Record<string, string> = {};
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) fromUrl[key] = value;
  });
  if (Object.keys(fromUrl).length > 0) {
    sessionStorage.setItem("utm_params", JSON.stringify(fromUrl));
    return fromUrl;
  }
  try {
    return JSON.parse(sessionStorage.getItem("utm_params") || "{}");
  } catch {
    return {};
  }
}

const GRADES = Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`);

const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM",
];

const DEFAULT_DIAL: Record<MarketCountry, string> = { uk: "GB", au: "AU" };

const STEP_LABELS = ["Grade", "Phone", "Date & Time", "Timezone"];

// ── Date helpers (local-time based, no UTC shifting) ──
function toIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatIsoDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return {
    full: date.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" }),
  };
}

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function MonthCalendar({ selected, onSelect }: { selected: string; onSelect: (iso: string) => void }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayIso = toIsoDate(today);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();
  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const leadingBlanks = firstOfMonth.getDay();
  const cells: (number | null)[] = [
    ...Array(leadingBlanks).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const goPrevMonth = () => {
    if (isCurrentMonth) return;
    const prev = new Date(viewYear, viewMonth - 1, 1);
    setViewYear(prev.getFullYear());
    setViewMonth(prev.getMonth());
  };
  const goNextMonth = () => {
    const next = new Date(viewYear, viewMonth + 1, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-xl">
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={goPrevMonth}
          disabled={isCurrentMonth}
          className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          ‹
        </button>
        <span className="text-sm font-semibold text-gray-800">
          {firstOfMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
        </span>
        <button type="button" onClick={goNextMonth} className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100">
          ›
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-400">
        {WEEKDAY_LABELS.map((w) => (
          <div key={w}>{w}</div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={`blank-${i}`} />;
          const iso = toIsoDate(new Date(viewYear, viewMonth, day));
          const isPast = iso < todayIso;
          const isSelected = iso === selected;
          return (
            <button
              key={iso}
              type="button"
              disabled={isPast}
              onClick={() => onSelect(iso)}
              className={`aspect-square rounded-lg text-sm font-medium transition-colors ${
                isSelected
                  ? "bg-[#FC8741] text-white"
                  : isPast
                  ? "cursor-not-allowed text-gray-300"
                  : "text-gray-700 hover:bg-[#fff7f2] hover:text-[#FC8741]"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Timezones: full IANA list with live UTC offsets, e.g. "(GMT+5:30) Asia/Kolkata" ──
type TzOption = { id: string; label: string; offsetMinutes: number };

const FALLBACK_TIMEZONE_IDS = [
  "Europe/London", "Europe/Dublin", "Australia/Sydney", "Australia/Melbourne",
  "Australia/Brisbane", "Australia/Perth", "Australia/Adelaide", "Australia/Hobart",
  "Australia/Darwin", "America/New_York", "America/Los_Angeles", "America/Chicago",
  "Asia/Kolkata", "Asia/Dubai", "Asia/Singapore", "Pacific/Auckland",
];

function getTimezoneOptions(): TzOption[] {
  let ids: string[];
  try {
    ids = typeof Intl.supportedValuesOf === "function" ? Intl.supportedValuesOf("timeZone") : FALLBACK_TIMEZONE_IDS;
  } catch {
    ids = FALLBACK_TIMEZONE_IDS;
  }
  const now = new Date();
  return ids
    .map((id) => {
      let offsetLabel = "GMT";
      let offsetMinutes = 0;
      try {
        const parts = new Intl.DateTimeFormat("en-US", { timeZone: id, timeZoneName: "shortOffset" }).formatToParts(now);
        offsetLabel = parts.find((p) => p.type === "timeZoneName")?.value || "GMT";
        const match = offsetLabel.match(/GMT([+-])(\d+)(?::(\d+))?/);
        if (match) {
          const sign = match[1] === "-" ? -1 : 1;
          offsetMinutes = sign * (Number(match[2]) * 60 + Number(match[3] || 0));
        }
      } catch {
        // keep default GMT/0 offset if this zone can't be resolved
      }
      return { id, offsetMinutes, label: `(${offsetLabel}) ${id.replace(/_/g, " ")}` };
    })
    .sort((a, b) => a.offsetMinutes - b.offsetMinutes || a.id.localeCompare(b.id));
}

const TIMEZONE_OPTIONS = getTimezoneOptions();

function useClickOutside(ref: React.RefObject<HTMLElement | null>, active: boolean, onClose: () => void) {
  useEffect(() => {
    if (!active) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
}

export default function LearnForm({
  country,
  subject,
  variant = "page",
  heading,
  submitData = true,
  onClose,
}: {
  country: MarketCountry;
  subject: Subject;
  /** "page" renders its own full-height gradient backdrop; "modal" renders just the card, for use inside a modal overlay. */
  variant?: "page" | "modal";
  /** Overrides the default "Learn {subject} · {market}" title. */
  heading?: string;
  /** When false, skips both network calls entirely — nothing is sent anywhere, the wizard just walks through its steps. */
  submitData?: boolean;
  /** Shown as a close (×) button next to the title when variant is "modal". */
  onClose?: () => void;
}) {
  const [step, setStep] = useState(1);
  const [grade, setGrade] = useState("");

  const [dialCountry, setDialCountry] = useState(() => findByIso(DEFAULT_DIAL[country]));
  const dialCountryTouched = useRef(false);
  const [nationalNumber, setNationalNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const [timezone, setTimezone] = useState("");
  const [tzQuery, setTzQuery] = useState("");
  const [tzOpen, setTzOpen] = useState(false);
  const tzRef = useRef<HTMLDivElement>(null);

  useClickOutside(calendarRef, calendarOpen, () => setCalendarOpen(false));
  useClickOutside(tzRef, tzOpen, () => setTzOpen(false));

  const [utmParams, setUtmParams] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    setUtmParams(captureUtmParams());
  }, []);

  useEffect(() => {
    try {
      const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (detected) setTimezone(detected);
    } catch {
      setTimezone(country === "uk" ? "Europe/London" : "Australia/Sydney");
    }
  }, [country]);

  // Auto-detect the visitor's country once, to preset the phone dial code —
  // same approach as BookDemo. Skipped if the user has already picked one.
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);
    (async () => {
      try {
        const res = await fetch("https://ipapi.co/json/", { signal: controller.signal });
        const data = await res.json();
        const detected = findByIso(data?.country_code);
        if (detected && !dialCountryTouched.current) setDialCountry(detected);
      } catch {
        /* keep the market-based default */
      } finally {
        clearTimeout(timer);
      }
    })();
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, []);

  const marketLabel = country === "uk" ? "UK" : "AU";

  const selectedDateInfo = useMemo(() => (selectedDate ? formatIsoDate(selectedDate) : null), [selectedDate]);
  const selectedTzOption = useMemo(() => TIMEZONE_OPTIONS.find((o) => o.id === timezone), [timezone]);

  const filteredTimezones = tzQuery.trim()
    ? TIMEZONE_OPTIONS.filter((o) => o.label.toLowerCase().includes(tzQuery.toLowerCase()) || o.id.toLowerCase().includes(tzQuery.toLowerCase()))
    : TIMEZONE_OPTIONS;

  const goBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const handleGradeSelect = (g: string) => {
    setGrade(g);
    setTimeout(() => setStep(2), 250);
  };

  const handlePhoneContinue = () => {
    const nat = nationalNumber.replace(/\D/g, "");
    if (!nat || nat.length < 6 || nat.length > 14) {
      setPhoneError("Please enter a valid mobile number");
      return;
    }
    setPhoneError("");

    const mobile = `+${dialCountry?.dial}${nat}`;

    // Fire-and-forget: capture the partial lead the instant we have grade +
    // phone, without blocking navigation to the next question.
    if (submitData) {
      axiosClient
        .post("/learn-lead/start", {
          country,
          subject,
          grade,
          mobile,
          ...utmParams,
        })
        .catch((err: unknown) => console.error("Failed to save partial lead:", err));
    }

    setStep(3);
  };

  const handleDateTimeContinue = () => {
    if (selectedDate && selectedTime) setStep(4);
  };

  const handleConfirm = async () => {
    setSubmitError("");
    setIsSubmitting(true);
    const nat = nationalNumber.replace(/\D/g, "");
    const mobile = `+${dialCountry?.dial}${nat}`;

    if (!submitData) {
      // Nothing is sent anywhere in this mode — just walk to the success step.
      setTimeout(() => {
        setIsSubmitting(false);
        setStep(5);
      }, 400);
      return;
    }

    try {
      await axiosClient.post("/learn-lead/complete", {
        country,
        subject,
        grade,
        mobile,
        date: selectedDate,
        time: selectedTime,
        timezone,
        ...utmParams,
      });
      setStep(5);
    } catch (error: any) {
      setSubmitError(
        error?.response?.data?.message || error?.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const card = (
    <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl ring-1 ring-black/5">
        <div className="p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h1 className="text-xl font-bold text-gray-900">
              {heading ?? (
                <>
                  Learn {subject} <span className="text-[#FC8741]">· {marketLabel}</span>
                </>
              )}
            </h1>
            <div className="flex items-center gap-3 shrink-0">
              {step > 1 && step < 5 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  ← Back
                </button>
              )}
              {variant === "modal" && onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Progress indicator */}
          {step < 5 && (
            <div className="mb-8 flex gap-2">
              {STEP_LABELS.map((label, i) => (
                <div key={label} className="flex-1">
                  <div
                    className={`h-1.5 rounded-full transition-colors ${
                      i + 1 <= step ? "bg-[#FC8741]" : "bg-gray-200"
                    }`}
                  />
                </div>
              ))}
            </div>
          )}

          {submitError && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          )}

          {/* Step 1: Grade */}
          {step === 1 && (
            <div>
              <h2 className="mb-4 text-lg font-semibold text-gray-800">What grade are you in?</h2>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {GRADES.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => handleGradeSelect(g)}
                    className={`rounded-xl border-2 px-3 py-4 text-center font-semibold transition-all hover:border-[#FC8741] hover:bg-[#fff7f2] ${
                      grade === g ? "border-[#FC8741] bg-[#fff7f2] text-[#FC8741]" : "border-gray-200 text-gray-700"
                    }`}
                  >
                    {g.replace("Grade ", "")}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Phone */}
          {step === 2 && (
            <div>
              <h2 className="mb-4 text-lg font-semibold text-gray-800">What&apos;s your mobile number?</h2>
              <PhoneField
                country={dialCountry}
                onCountryChange={(c: any) => {
                  dialCountryTouched.current = true;
                  setDialCountry(c);
                  if (phoneError) setPhoneError("");
                }}
                nationalNumber={nationalNumber}
                onNationalChange={(v: string) => {
                  setNationalNumber(v);
                  if (phoneError) setPhoneError("");
                }}
                error={phoneError}
              />
              {phoneError && <p className="mt-1 text-sm text-red-600">{phoneError}</p>}
              <GlossyButton
                type="button"
                onClick={handlePhoneContinue}
                className="mt-6 w-full rounded-lg px-4 py-3"
              >
                Continue
              </GlossyButton>
            </div>
          )}

          {/* Step 3: Date & Time */}
          {step === 3 && (
            <div>
              <h2 className="mb-4 text-lg font-semibold text-gray-800">Pick a date</h2>
              <div className="relative" ref={calendarRef}>
                <button
                  type="button"
                  onClick={() => setCalendarOpen((o) => !o)}
                  className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-left"
                >
                  <span className={selectedDateInfo ? "text-gray-900" : "text-gray-400"}>
                    {selectedDateInfo ? selectedDateInfo.full : "Select a date"}
                  </span>
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
                {calendarOpen && (
                  <div className="relative z-30 mt-1 w-full">
                    <MonthCalendar
                      selected={selectedDate}
                      onSelect={(iso) => {
                        setSelectedDate(iso);
                        setCalendarOpen(false);
                      }}
                    />
                  </div>
                )}
              </div>

              {selectedDate && (
                <>
                  <h2 className="mb-4 mt-6 text-lg font-semibold text-gray-800">Pick a time</h2>
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTime(t)}
                        className={`rounded-xl border-2 px-2 py-3 text-center text-sm font-semibold transition-all hover:border-[#FC8741] hover:bg-[#fff7f2] ${
                          selectedTime === t ? "border-[#FC8741] bg-[#fff7f2] text-[#FC8741]" : "border-gray-200 text-gray-700"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </>
              )}

              <GlossyButton
                type="button"
                onClick={handleDateTimeContinue}
                disabled={!selectedDate || !selectedTime}
                className="mt-6 w-full rounded-lg px-4 py-3 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue
              </GlossyButton>
            </div>
          )}

          {/* Step 4: Timezone */}
          {step === 4 && (
            <div>
              <h2 className="mb-4 text-lg font-semibold text-gray-800">Confirm your timezone</h2>
              <div className="relative" ref={tzRef}>
                <button
                  type="button"
                  onClick={() => setTzOpen((o) => !o)}
                  className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-left"
                >
                  <span>{selectedTzOption ? selectedTzOption.label : timezone || "Select timezone"}</span>
                  <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                {tzOpen && (
                  <div className="relative z-30 mt-1 max-h-72 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">
                    <div className="border-b border-gray-100 p-2">
                      <input
                        autoFocus
                        value={tzQuery}
                        onChange={(e) => setTzQuery(e.target.value)}
                        placeholder="Search city, region, or GMT offset…"
                        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
                      />
                    </div>
                    <ul className="max-h-56 overflow-y-auto py-1">
                      {filteredTimezones.map((tz) => (
                        <li key={tz.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setTimezone(tz.id);
                              setTzOpen(false);
                              setTzQuery("");
                            }}
                            className={`block w-full px-3 py-2 text-left text-sm hover:bg-[#fff7f2] ${
                              timezone === tz.id ? "bg-[#fff7f2] font-semibold text-[#FC8741]" : "text-gray-700"
                            }`}
                          >
                            {tz.label}
                          </button>
                        </li>
                      ))}
                      {filteredTimezones.length === 0 && (
                        <li className="px-3 py-3 text-center text-sm text-gray-400">No matches</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {selectedDateInfo && selectedTime && (
                <p className="mt-4 text-sm text-gray-600">
                  Booking for <strong>{selectedDateInfo.full}</strong> at <strong>{selectedTime}</strong>
                  {selectedTzOption && <> ({selectedTzOption.label})</>}
                </p>
              )}

              <GlossyButton
                type="button"
                onClick={handleConfirm}
                disabled={isSubmitting || !timezone}
                className="mt-6 w-full rounded-lg px-4 py-3 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Confirming…" : "Confirm Booking"}
              </GlossyButton>
            </div>
          )}

          {/* Step 5: Success */}
          {step === 5 && (
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <svg className="h-11 w-11 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="mb-2 text-2xl font-extrabold text-gray-900">You&apos;re all set! 🎉</h2>
              <p className="text-gray-600">
                Your {subject} class is booked for {selectedDateInfo?.full} at {selectedTime}
                {selectedTzOption ? ` (${selectedTzOption.label})` : ""}.
              </p>
              <p className="mt-1 text-gray-600">Our team will reach out to confirm the details.</p>
              {variant === "modal" && onClose ? (
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 inline-block w-full rounded-xl bg-gradient-to-r from-[#fc8741] to-amber-500 px-4 py-3 font-semibold text-white shadow-md transition-transform hover:scale-[1.02]"
                >
                  Done
                </button>
              ) : (
                <a
                  href={`/${country}`}
                  className="mt-6 inline-block w-full rounded-xl bg-gradient-to-r from-[#fc8741] to-amber-500 px-4 py-3 font-semibold text-white shadow-md transition-transform hover:scale-[1.02]"
                >
                  Back to Home
                </a>
              )}
            </div>
          )}
        </div>
    </div>
  );

  if (variant === "modal") return card;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff7f2] via-white to-blue-50 px-4 py-10">
      {card}
    </div>
  );
}
