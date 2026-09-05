"use client";

// The shared "Book a Demo" wizard for both /demo (global + UK) and /au/demo.
// Mirrors LearnForm's step flow (Grade -> Phone -> Date & Time -> Timezone)
// and its partial-lead-capture pattern: the moment grade + phone are known we
// fire a background save to the sheet, so the lead isn't lost even if the
// visitor never finishes picking a date/time/timezone.
import { useEffect, useMemo, useRef, useState } from "react";
import axiosClient from "@/components/utils/axios";
// @ts-ignore - JS component, no type declarations
import PhoneField from "@/components/demo/PhoneField";
// @ts-ignore - JS module, no type declarations
import { findByIso } from "@/components/demo/countries";

type Market = "uk" | "au";

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

const ALL_GRADES = Array.from({ length: 12 }, (_, i) => i + 1).map((n) => `Grade ${n}`);

const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM",
];

const DEFAULT_DIAL: Record<Market, string> = { uk: "GB", au: "AU" };

function UserIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM5 21v-1a7 7 0 0114 0v1" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.3a1 1 0 01.95.68l1 3a1 1 0 01-.24 1L7.6 9.6a13 13 0 006.8 6.8l1.92-1.4a1 1 0 011-.25l3 1a1 1 0 01.68.95V19a2 2 0 01-2 2A16 16 0 013 5z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3a15 15 0 010 18a15 15 0 010-18z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

const STEPS = [
  { n: 1, label: "Child's Grade", Icon: UserIcon },
  { n: 2, label: "Mobile Number", Icon: PhoneIcon },
  { n: 3, label: "Preferred Time", Icon: ClockIcon },
  { n: 4, label: "Timezone", Icon: GlobeIcon },
];

const STEP_COPY: Record<number, { title: string; subtitle: string }> = {
  1: { title: "What grade is your child in?", subtitle: "This helps us match them with the right tutor." },
  2: { title: "What's your mobile number?", subtitle: "We'll use this to confirm your demo slot." },
  3: { title: "Pick a date and time", subtitle: "Choose the slot that suits you best." },
  4: { title: "Confirm your timezone", subtitle: "So we schedule the class in your local time." },
};

type SubmitError = { title: string; detail: string };

// The shared axios client's interceptor rejects with `error.response?.data ||
// error.message`, so what reaches a catch block here is normally a bare string
// rather than an Error or an axios error carrying `.response`.
function describeSubmitError(error: unknown): SubmitError {
  const text = String(typeof error === "string" ? error : (error as any)?.message || "");

  if (/network|failed to fetch|econnrefused|err_internet/i.test(text)) {
    return {
      title: "We couldn't reach our servers",
      detail: "Check your internet connection and tap Confirm Booking again.",
    };
  }
  if (/timeout|timed out|aborted/i.test(text)) {
    return {
      title: "That request timed out",
      detail: "Our server didn't respond in time. Please tap Confirm Booking again in a moment.",
    };
  }
  if (/field is missing/i.test(text)) {
    return {
      title: "Some details are missing",
      detail: "Go back and check that your grade, mobile number, and date & time are all filled in.",
    };
  }
  if (/invalid market/i.test(text)) {
    return {
      title: "We couldn't validate your booking",
      detail: "Please refresh the page and start the booking again.",
    };
  }
  return {
    title: "We couldn't confirm your booking",
    detail: "Please tap Confirm Booking again. If it keeps failing, refresh the page and retry.",
  };
}

const STEP_HINTS: Record<number, string> = {
  1: "Not sure? Our experts can help place your child in the right level.",
  2: "We'll only call about your demo — no spam, ever.",
  3: "Slots fill up fast — pick the earliest time that works for you.",
};

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

export default function BookDemoForm({ market }: { market: Market }) {
  const [step, setStep] = useState(1);
  const [grade, setGrade] = useState("");

  const [dialCountry, setDialCountry] = useState(() => findByIso(DEFAULT_DIAL[market]));
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
  const [submitError, setSubmitError] = useState<SubmitError | null>(null);

  useEffect(() => {
    setUtmParams(captureUtmParams());
  }, []);

  useEffect(() => {
    try {
      const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (detected) setTimezone(detected);
    } catch {
      setTimezone(market === "uk" ? "Europe/London" : "Australia/Sydney");
    }
  }, [market]);

  // Auto-detect the visitor's country once, to preset the phone dial code.
  // Skipped if the user has already picked one.
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
    // phone, without blocking navigation to the next question. This lands in
    // the sheet even if the visitor never finishes picking a date/time.
    axiosClient
      .post("/user/bookDemo/start", {
        market,
        grade,
        mobile,
        ...utmParams,
      })
      .catch((err: unknown) => console.error("Failed to save partial demo lead:", err));

    setStep(3);
  };

  const handleDateTimeContinue = () => {
    if (selectedDate && selectedTime) setStep(4);
  };

  const handleConfirm = async () => {
    setSubmitError(null);
    setIsSubmitting(true);
    const nat = nationalNumber.replace(/\D/g, "");
    const mobile = `+${dialCountry?.dial}${nat}`;

    try {
      await axiosClient.post("/user/bookDemo/complete", {
        market,
        grade,
        mobile,
        date: selectedDate,
        time: selectedTime,
        timezone,
        ...utmParams,
      });
      setStep(5);
    } catch (error) {
      console.error("Failed to confirm demo booking:", error);
      setSubmitError(describeSubmitError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextAction = {
    label: step === 4 ? (isSubmitting ? "Confirming…" : "Confirm Booking") : "Next Step",
    onClick:
      step === 1 ? () => setStep(2) : step === 2 ? handlePhoneContinue : step === 3 ? handleDateTimeContinue : handleConfirm,
    disabled:
      step === 1
        ? !grade
        : step === 3
        ? !selectedDate || !selectedTime
        : step === 4
        ? isSubmitting || !timezone
        : false,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f2] via-white to-blue-50 px-4 py-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center">
        <img
          src="/demoheaderv2.jpeg"
          alt="1:1 Tutoring Session — Boost Bright Futures! Personalized learning for your child's success"
          className="max-h-[240px] w-full rounded-2xl object-cover object-top shadow-lg"
        />

        {step === 5 ? (
          <div className="mt-6 w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-xl ring-1 ring-black/5">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <svg className="h-11 w-11 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mb-2 text-2xl font-extrabold text-gray-900">You&apos;re all set! 🎉</h2>
            <p className="text-gray-600">
              Your demo class is booked for {selectedDateInfo?.full} at {selectedTime}
              {selectedTzOption ? ` (${selectedTzOption.label})` : ""}.
            </p>
            <p className="mt-1 text-gray-600">Our team will reach out to confirm the details.</p>
            <a
              href={market === "au" ? "/au" : "/"}
              className="mt-6 inline-block w-full rounded-xl bg-gradient-to-r from-[#fc8741] to-amber-500 px-4 py-3 font-semibold text-white shadow-md transition-transform hover:scale-[1.02]"
            >
              Back to Home
            </a>
          </div>
        ) : (
          <>
            <div className="mt-5 flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700">
              <span>📌</span>
              Limited slots today — book your free 1:1 demo class
            </div>

            <div className="mt-5 w-full overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
              <div className="flex flex-col md:flex-row">
                {/* Step rail */}
                <aside className="hidden shrink-0 flex-col justify-between border-r border-gray-100 bg-[#FFF8F3] p-6 md:flex md:w-64">
                  <ol>
                    {STEPS.map((s, i) => {
                      const isActive = step === s.n;
                      const isDone = step > s.n;
                      const isLast = i === STEPS.length - 1;
                      return (
                        <li key={s.n} className={`relative flex gap-3 ${isLast ? "" : "pb-7"}`}>
                          {!isLast && (
                            <span className="absolute bottom-1 left-4 top-9 w-px -translate-x-1/2 bg-gray-200" />
                          )}
                          {isActive && (
                            <span className="absolute -left-6 top-0 h-8 w-0.5 rounded-r bg-[#FC8741]" />
                          )}
                          <span
                            className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                              isDone
                                ? "bg-green-50 text-green-600"
                                : isActive
                                ? "bg-[#FC8741]/15 text-[#FC8741]"
                                : "bg-white text-gray-400 ring-1 ring-gray-200"
                            }`}
                          >
                            {isDone ? <CheckIcon /> : <s.Icon />}
                          </span>
                          <div className="pt-0.5">
                            <p className={`text-[11px] font-medium ${isActive ? "text-[#FC8741]" : "text-gray-400"}`}>
                              Step {s.n}
                            </p>
                            <p
                              className={`text-sm font-semibold ${
                                isActive || isDone ? "text-gray-900" : "text-gray-400"
                              }`}
                            >
                              {s.label}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ol>

                  <div className="mt-10 flex items-start gap-2.5">
                    <svg className="h-5 w-5 shrink-0 text-green-500" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v5.5c0 4.2-2.9 8.1-7 9.5-4.1-1.4-7-5.3-7-9.5V6l7-3z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 12l1.8 1.8 3.4-3.6" />
                    </svg>
                    <p className="text-xs leading-snug text-gray-500">Your information is safe with us</p>
                  </div>
                </aside>

                {/* Active step */}
                <div className="flex-1 p-6 md:p-8">
                  <h1 className="text-xl font-bold text-gray-900 md:text-2xl">{STEP_COPY[step].title}</h1>
                  <p className="mt-1 text-sm text-gray-500">{STEP_COPY[step].subtitle}</p>

                  {submitError && (
                    <div
                      role="alert"
                      className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
                    >
                      <svg
                        className="mt-0.5 h-5 w-5 shrink-0 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path strokeLinecap="round" d="M12 8v5m0 3.5v.01" />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-red-800">{submitError.title}</p>
                        <p className="mt-0.5 text-sm text-red-700">{submitError.detail}</p>
                      </div>
                    </div>
                  )}

                  {/* Step 1: Grade */}
                  {step === 1 && (
                    <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4">
                      {ALL_GRADES.map((g) => (
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
                  )}

                  {/* Step 2: Mobile */}
                  {step === 2 && (
                    <div className="mt-6 max-w-md">
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
                    </div>
                  )}

                  {/* Step 3: Date & Time */}
                  {step === 3 && (
                    <div className="mt-6">
                      <div className="relative max-w-md" ref={calendarRef}>
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
                          <p className="mb-3 mt-6 text-sm font-semibold text-gray-700">Pick a time</p>
                          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                            {TIME_SLOTS.map((t) => (
                              <button
                                key={t}
                                type="button"
                                onClick={() => setSelectedTime(t)}
                                className={`rounded-xl border-2 px-2 py-3 text-center text-sm font-semibold transition-all hover:border-[#FC8741] hover:bg-[#fff7f2] ${
                                  selectedTime === t
                                    ? "border-[#FC8741] bg-[#fff7f2] text-[#FC8741]"
                                    : "border-gray-200 text-gray-700"
                                }`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Step 4: Timezone */}
                  {step === 4 && (
                    <div className="mt-6">
                      <div className="relative max-w-md" ref={tzRef}>
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
                    </div>
                  )}

                  {STEP_HINTS[step] && (
                    <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-[#FFF6EE] px-4 py-3">
                      <span className="leading-none">💡</span>
                      <p className="text-sm text-gray-600">{STEP_HINTS[step]}</p>
                    </div>
                  )}

                  {/* Footer: progress + actions */}
                  <div className="mt-8 flex items-center justify-between gap-4 border-t border-gray-100 pt-5">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-[#FC8741] transition-all"
                          style={{ width: `${(step / 4) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">Step {step} of 4</span>
                    </div>

                    <div className="flex items-center gap-4">
                      {step > 1 && (
                        <button
                          type="button"
                          onClick={goBack}
                          className="text-sm font-medium text-gray-500 hover:text-gray-700"
                        >
                          ← Back
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={nextAction.onClick}
                        disabled={nextAction.disabled}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#FC8741] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#fc995e] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {nextAction.label}
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h13m0 0l-5-5m5 5l-5 5" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
