"use client";

// The shared "Book a Demo" wizard.
//
// Two layouts, one implementation: `variant="page"` is the standalone /demo and
// /au/demo routes, `variant="modal"` is the popup every "Try a free Class" /
// "Book a Demo" CTA on the site now opens (see DemoModalHost). The steps,
// validation, lead capture and submit calls are identical in both — only the
// outer chrome and the final "you're all set" action differ.
//
// Step flow: Academy -> Subject -> Grade -> Phone -> Date & Time -> Timezone.
// The first two steps ask which of the three academies the child is joining and
// then that academy's own sub-category (subject / exam / skill), so this popup
// captures the same "what do they want to learn" signal the academy pages'
// LearnForm already did. Everything from Grade onwards is unchanged.
//
// Also mirrors LearnForm's partial-lead-capture pattern: the moment academy +
// subject + grade + phone are known we fire a background save to the sheet, so
// the lead isn't lost even if the visitor never finishes picking a
// date/time/timezone.
import { useEffect, useMemo, useRef, useState } from "react";
import axiosClient from "@/components/utils/axios";
// @ts-ignore - JS component, no type declarations
import PhoneField from "@/components/demo/PhoneField";
// @ts-ignore - JS module, no type declarations
import { findByIso, findByDial } from "@/components/demo/countries";
import { getAcademies, type Academy, type Locale } from "@/lib/academies";

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

const TOTAL_STEPS = 6;
/** The "you're all set" screen, shown after the last question is submitted. */
const DONE_STEP = TOTAL_STEPS + 1;

const STEP_COPY: Record<number, { title: string; subtitle: string }> = {
  1: { title: "Which academy is your child joining?", subtitle: "Pick the track that matches what you're after." },
  // Step 2's copy comes from the chosen academy (see stepCopy) — "Pick a
  // subject/exam/skill to start", depending on the track.
  3: { title: "What grade is your child in?", subtitle: "This helps us match them with the right tutor." },
  4: { title: "What's your mobile number?", subtitle: "We'll use this to confirm your demo slot." },
  5: { title: "Pick a date and time", subtitle: "Choose the slot that suits you best." },
  6: { title: "Confirm your timezone", subtitle: "So we schedule the class in your local time." },
};

function stepCopy(step: number, academy: Academy | null) {
  if (step === 2) {
    return {
      title: academy ? academy.prompt : "Pick a subject to start",
      subtitle: academy
        ? `Choose what your child wants to work on in ${academy.name}.`
        : "Choose what your child wants to work on.",
    };
  }
  return STEP_COPY[step];
}

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
  1: "Every academy starts the same way — a free 1:1 trial with a matched tutor.",
  2: "You can add more subjects later — most families start with one.",
  3: "Not sure? Our experts can help place your child in the right level.",
  4: "We'll only call about your demo — no spam, ever.",
  5: "Slots fill up fast — pick the earliest time that works for you.",
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

export default function BookDemoForm({
  market,
  locale,
  variant = "page",
  onClose,
  prefillPhone,
  prefillDialCode,
  prefillAcademySlug,
}: {
  market: Market;
  /** Which academies list to show. The three academies share their headings
   *  across regions but not their sub-categories — Exam Readiness lists
   *  different exams on /uk, /au and the global site (see src/lib/academies).
   *  Defaults to the market so the standalone /demo pages keep working. */
  locale?: Locale;
  /** "page" = the standalone /demo route, "modal" = the site-wide popup. */
  variant?: "page" | "modal";
  /** Dismisses the popup; only used by the modal variant. */
  onClose?: () => void;
  /** Phone number (digits only, no dial code) a hero form already collected,
   *  so the phone step opens filled in instead of asking for it twice. */
  prefillPhone?: string;
  /** Dial code that went with prefillPhone ("+61" or "61"). */
  prefillDialCode?: string;
  /** Academy the CTA already implies ("exam-readiness", …). The wizard then
   *  opens on step 2 — that academy's subject/exam list — instead of asking
   *  which academy first. Back still returns to step 1 to change it. */
  prefillAcademySlug?: string;
}) {
  const isModal = variant === "modal";
  const academies = useMemo(() => getAcademies(locale ?? market), [locale, market]);

  // Ignore a slug this locale doesn't offer, so a stale link can't open the
  // wizard on an empty subject step.
  const presetAcademy = academies.some((a) => a.slug === prefillAcademySlug)
    ? prefillAcademySlug!
    : "";

  const [step, setStep] = useState(presetAcademy ? 2 : 1);
  const [academySlug, setAcademySlug] = useState(presetAcademy);
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");

  const academy = useMemo(
    () => academies.find((a) => a.slug === academySlug) ?? null,
    [academies, academySlug]
  );

  const [dialCountry, setDialCountry] = useState(
    () => findByDial(prefillDialCode) ?? findByIso(DEFAULT_DIAL[market])
  );
  // A dial code that came in with the prefill counts as already chosen, so the
  // geo lookup below doesn't overwrite what the visitor picked in the hero.
  const dialCountryTouched = useRef(Boolean(findByDial(prefillDialCode)));
  const [nationalNumber, setNationalNumber] = useState(() =>
    String(prefillPhone ?? "").replace(/\D/g, "")
  );
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

  // ── Auto-advance (popup only) ──
  // Picking an option is enough to move on; Back/Next stay for the steps that
  // can't auto-advance (typing a number, confirming the booking) and for anyone
  // who'd rather drive it by hand. The short pause lets the chip's "selected"
  // highlight register before the step flips, so the click doesn't feel lost.
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelAutoAdvance = () => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
  };

  useEffect(() => cancelAutoAdvance, []);

  const autoAdvance = (run: () => void) => {
    if (!isModal) return;
    cancelAutoAdvance();
    advanceTimer.current = setTimeout(() => {
      advanceTimer.current = null;
      run();
    }, 220);
  };

  const goBack = () => {
    // A pending auto-advance would otherwise fire straight after and undo this.
    cancelAutoAdvance();
    if (step > 1) setStep((s) => s - 1);
  };

  const handleAcademySelect = (slug: string) => {
    // Switching academy invalidates whatever sub-category was picked under the
    // previous one — the lists don't overlap.
    if (slug !== academySlug) setSubject("");
    setAcademySlug(slug);
    autoAdvance(() => setStep(2));
  };

  const handleSubjectSelect = (s: string) => {
    setSubject(s);
    autoAdvance(() => setStep(3));
  };

  const handleGradeSelect = (g: string) => {
    setGrade(g);
    autoAdvance(() => setStep(4));
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
        academy: academy?.name || "",
        subject,
        grade,
        mobile,
        ...utmParams,
      })
      .catch((err: unknown) => console.error("Failed to save partial demo lead:", err));

    setStep(5);
  };

  const handleDateTimeContinue = () => {
    if (selectedDate && selectedTime) setStep(6);
  };

  const handleConfirm = async () => {
    setSubmitError(null);
    setIsSubmitting(true);
    const nat = nationalNumber.replace(/\D/g, "");
    const mobile = `+${dialCountry?.dial}${nat}`;

    try {
      await axiosClient.post("/user/bookDemo/complete", {
        market,
        academy: academy?.name || "",
        subject,
        grade,
        mobile,
        date: selectedDate,
        time: selectedTime,
        timezone,
        ...utmParams,
      });
      setStep(DONE_STEP);
    } catch (error) {
      console.error("Failed to confirm demo booking:", error);
      setSubmitError(describeSubmitError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const NEXT_HANDLERS: Record<number, () => void> = {
    1: () => setStep(2),
    2: () => setStep(3),
    3: () => setStep(4),
    4: handlePhoneContinue,
    5: handleDateTimeContinue,
    6: handleConfirm,
  };

  const NEXT_DISABLED: Record<number, boolean> = {
    1: !academySlug,
    2: !subject,
    3: !grade,
    4: false,
    5: !selectedDate || !selectedTime,
    6: isSubmitting || !timezone,
  };

  const nextAction = {
    label: step === TOTAL_STEPS ? (isSubmitting ? "Confirming…" : "Confirm Booking") : "Next Step",
    onClick: NEXT_HANDLERS[step],
    disabled: NEXT_DISABLED[step],
  };

  return (
    <div
      className={`bg-gradient-to-br from-[#fff7f2] via-white to-blue-50 ${
        isModal ? "px-4 py-6 sm:px-6" : "min-h-screen px-4 py-8"
      }`}
    >
      <div className="mx-auto flex max-w-xl flex-col items-center">
        {/* Banner is page-only: in the popup it just pushes the actual
            question below the fold. */}
        {!isModal && (
          <img
            src="/demoheaderv2.jpeg"
            alt="1:1 Tutoring Session — Boost Bright Futures! Personalized learning for your child's success"
            className="max-h-[240px] w-full rounded-2xl object-cover object-top shadow-lg"
          />
        )}

        {step === DONE_STEP ? (
          <div
            className={`w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-xl ring-1 ring-black/5 ${
              isModal ? "" : "mt-6"
            }`}
          >
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
            {isModal ? (
              // The popup opened over the page the visitor was already reading,
              // so "Back to Home" would be a step backwards — just dismiss it.
              <button
                type="button"
                onClick={onClose}
                className="mt-6 inline-block w-full rounded-xl bg-gradient-to-r from-[#fc8741] to-amber-500 px-4 py-3 font-semibold text-white shadow-md transition-transform hover:scale-[1.02]"
              >
                Done
              </button>
            ) : (
              <a
                href={market === "au" ? "/au" : "/"}
                className="mt-6 inline-block w-full rounded-xl bg-gradient-to-r from-[#fc8741] to-amber-500 px-4 py-3 font-semibold text-white shadow-md transition-transform hover:scale-[1.02]"
              >
                Back to Home
              </a>
            )}
          </div>
        ) : (
          <>
            {/* In the popup this is the top row, so keep it clear of the
                floating close button in the corner. */}
            <div
              className={`flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 ${
                isModal ? "max-w-[calc(100%-3rem)]" : "mt-5"
              }`}
            >
              <span>📌</span>
              Limited slots today — book your free 1:1 demo class
            </div>

            <div className="mt-5 w-full overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
              <div>
                {/* Active step */}
                <div className="p-6 md:p-8">
                  <h1 className="text-xl font-bold text-gray-900 md:text-2xl">{stepCopy(step, academy).title}</h1>
                  <p className="mt-1 text-sm text-gray-500">{stepCopy(step, academy).subtitle}</p>

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

                  {/* Step 1: Academy */}
                  {step === 1 && (
                    <div className="mt-6 flex flex-col gap-3">
                      {academies.map((a) => {
                        const isSelected = academySlug === a.slug;
                        return (
                          <button
                            key={a.slug}
                            type="button"
                            onClick={() => handleAcademySelect(a.slug)}
                            className={`flex items-center gap-4 rounded-xl border-2 px-4 py-4 text-left transition-all hover:border-[#FC8741] hover:bg-[#fff7f2] ${
                              isSelected ? "border-[#FC8741] bg-[#fff7f2]" : "border-gray-200"
                            }`}
                          >
                            <span
                              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-extrabold text-white"
                              style={{ backgroundColor: a.accent }}
                            >
                              {a.letter}
                            </span>
                            <span className="min-w-0">
                              <span
                                className={`block font-bold ${isSelected ? "text-[#FC8741]" : "text-gray-900"}`}
                              >
                                {a.heading}
                              </span>
                              <span className="block text-sm text-gray-500">{a.prompt}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Step 2: Subject / exam / skill, from the chosen academy */}
                  {step === 2 && academy && (
                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {academy.subjects.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleSubjectSelect(s)}
                          className={`rounded-xl border-2 px-4 py-4 text-center text-sm font-semibold transition-all hover:border-[#FC8741] hover:bg-[#fff7f2] ${
                            subject === s
                              ? "border-[#FC8741] bg-[#fff7f2] text-[#FC8741]"
                              : "border-gray-200 text-gray-700"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Step 3: Grade */}
                  {step === 3 && (
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

                  {/* Step 4: Mobile */}
                  {step === 4 && (
                    // This step can't auto-advance (we don't know when a number
                    // is finished), so Enter stands in for the Next click.
                    // Scoped to the number input: the country dropdown's own
                    // search box bubbles Enter through here too.
                    <div
                      className="mt-6 max-w-md"
                      onKeyDown={(e) => {
                        if (e.key !== "Enter") return;
                        if ((e.target as HTMLElement).getAttribute?.("type") !== "tel") return;
                        e.preventDefault();
                        handlePhoneContinue();
                      }}
                    >
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

                  {/* Step 5: Date & Time */}
                  {step === 5 && (
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
                                onClick={() => {
                                  setSelectedTime(t);
                                  // Date is already set — the slots only render
                                  // once it is — so this completes the step.
                                  autoAdvance(() => setStep(6));
                                }}
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

                  {/* Step 6: Timezone */}
                  {step === 6 && (
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
                          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">Step {step} of {TOTAL_STEPS}</span>
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
