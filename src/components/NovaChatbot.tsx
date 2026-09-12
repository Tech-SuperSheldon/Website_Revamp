"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Loader2, MessageCircle } from "lucide-react";
import Image from "next/image";
import axiosClient from "@/components/utils/axios";
import { captureUtmParams } from "@/lib/demoLead";
import { DEMO_PATH, getAcademies, type Academy } from "@/lib/academies";

// This chatbot only ever runs on the global site — see AU/NovaChatbot.tsx and
// UKHome/UKHomeNovaChatbot.tsx for the region-specific copies. The booking
// flow asks the same questions, in the same order, as the site-wide "Book a
// Demo" wizard (BookDemoForm) and submits to the same backend, so a lead
// booked through Nova lands exactly where every other lead does.
const LOCALE = "global" as const;
const MARKET = "global" as const;
const ACADEMIES: Academy[] = getAcademies(LOCALE);

interface Message {
  role: "user" | "assistant";
  content: string;
}

type BookingStep =
  | "idle"
  | "academy"
  | "subject"
  | "grade"
  | "phone"
  | "date"
  | "time"
  | "confirming"
  | "done";

interface BookingData {
  academySlug?: string;
  academyHeading?: string;
  subject?: string;
  grade?: string;
  mobile?: string;
  date?: string;
  time?: string;
}

const BOOKING_KEYWORDS = [
  "book",
  "demo",
  "session",
  "schedule",
  "appointment",
  "trial",
  "free class",
  "enrol",
  "enroll",
  "register",
  "sign up",
  "book a class",
  "book a session",
];

function detectBookingIntent(text: string): boolean {
  const lower = text.toLowerCase();
  return BOOKING_KEYWORDS.some((kw) => lower.includes(kw));
}

/** Matches a numbered reply ("2") or a name/keyword contained in one of the
 *  academy's own labels (so "exam", "exam readiness" etc. all work). */
function matchAcademy(text: string): Academy | null {
  const t = text.trim().toLowerCase();
  const asNum = Number(t);
  if (Number.isInteger(asNum) && asNum >= 1 && asNum <= ACADEMIES.length) {
    return ACADEMIES[asNum - 1];
  }
  return (
    ACADEMIES.find(
      (a) => a.heading.toLowerCase().includes(t) || a.name.toLowerCase().includes(t) || t.includes(a.heading.toLowerCase())
    ) ?? null
  );
}

function matchFromList(text: string, list: string[]): string | null {
  const t = text.trim().toLowerCase();
  const asNum = Number(t);
  if (Number.isInteger(asNum) && asNum >= 1 && asNum <= list.length) {
    return list[asNum - 1];
  }
  return (
    list.find((s) => s.toLowerCase() === t) ??
    list.find((s) => s.toLowerCase().includes(t) || t.includes(s.toLowerCase())) ??
    null
  );
}

function academyMenuText(): string {
  return ACADEMIES.map((a, i) => `${i + 1}. **${a.heading}** — ${a.description}`).join("\n");
}

function subjectMenuText(academy: Academy): string {
  return academy.subjects.map((s, i) => `${i + 1}. ${s}`).join("\n");
}

/** Accepts anything Date can parse ("20 September", "2026-09-20", "tomorrow"
 *  won't parse but a real date will) and rejects dates in the past, mirroring
 *  the wizard's calendar which disables past days. */
function parseToIsoDate(text: string): string | null {
  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  parsed.setHours(0, 0, 0, 0);
  if (parsed.getTime() < today.getTime()) return null;
  const y = parsed.getFullYear();
  const m = String(parsed.getMonth() + 1).padStart(2, "0");
  const d = String(parsed.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatIsoDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** Full number incl. country code, digits only after a leading "+". */
function normalizeMobile(text: string): string {
  const trimmed = text.trim();
  const digits = trimmed.replace(/\D/g, "");
  return trimmed.startsWith("+") ? `+${digits}` : `+${digits}`;
}

export default function NovaChatbot({ mobileHidden = false }: { mobileHidden?: boolean }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm **Nova**, your SuperSheldon assistant 👋\n\nI can help you with:\n• Our three academies — School Readiness, Exam Readiness (NAPLAN, ICAS, GCSE, 11+ and more) and Skill Academy\n• Booking a free demo session\n\nWhat would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingStep, setBookingStep] = useState<BookingStep>("idle");
  const [bookingData, setBookingData] = useState<BookingData>({});
  const [timezone, setTimezone] = useState("");
  const [unread, setUnread] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("openNova", handler);
    return () => window.removeEventListener("openNova", handler);
  }, []);

  // Detected silently, same as the booking wizard — Nova only shows it in the
  // final summary rather than spending a whole question on it.
  useEffect(() => {
    try {
      const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (detected) setTimezone(detected);
    } catch {
      setTimezone("Europe/London");
    }
  }, []);

  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
    if (!open) setUnread((u) => u + 1);
  };

  const handleBookingFlow = async (userText: string) => {
    const trimmed = userText.trim();

    if (bookingStep === "academy") {
      const match = matchAcademy(trimmed);
      if (!match) {
        addMessage({
          role: "assistant",
          content: `Sorry, I didn't catch that. Please reply with a number:\n\n${academyMenuText()}`,
        });
        return;
      }
      setBookingData({ academySlug: match.slug, academyHeading: match.heading });
      setBookingStep("subject");
      addMessage({
        role: "assistant",
        content: `Great choice! ${match.prompt}:\n\n${subjectMenuText(match)}`,
      });
      return;
    }

    if (bookingStep === "subject") {
      const academy = ACADEMIES.find((a) => a.slug === bookingData.academySlug);
      if (!academy) {
        setBookingStep("idle");
        return;
      }
      const match = matchFromList(trimmed, academy.subjects);
      if (!match) {
        addMessage({
          role: "assistant",
          content: `Please pick one from the list:\n\n${subjectMenuText(academy)}`,
        });
        return;
      }
      setBookingData((d) => ({ ...d, subject: match }));
      setBookingStep("grade");
      addMessage({
        role: "assistant",
        content: "What **year/grade** is your child in? (e.g. Year 5, Year 9)",
      });
      return;
    }

    if (bookingStep === "grade") {
      if (trimmed.length < 1) {
        addMessage({ role: "assistant", content: "Please enter the year/grade." });
        return;
      }
      setBookingData((d) => ({ ...d, grade: trimmed }));
      setBookingStep("phone");
      addMessage({
        role: "assistant",
        content: "What's your **mobile number**? (include country code, e.g. +61412345678)",
      });
      return;
    }

    if (bookingStep === "phone") {
      const digits = trimmed.replace(/\D/g, "");
      if (digits.length < 8) {
        addMessage({
          role: "assistant",
          content: "Please enter a valid mobile number (at least 8 digits, include country code).",
        });
        return;
      }
      const mobile = normalizeMobile(trimmed);
      const soFar = { ...bookingData, mobile };
      setBookingData(soFar);

      // Fire-and-forget partial lead, same as the wizard's phone step, so the
      // lead isn't lost if the visitor drops off before confirming.
      axiosClient
        .post("/user/bookDemo/start", {
          market: MARKET,
          academy: soFar.academyHeading || "",
          subject: soFar.subject || "",
          grade: soFar.grade || "",
          mobile,
          ...captureUtmParams(),
        })
        .catch((err: unknown) => console.error("[Nova] Failed to save partial demo lead:", err));

      setBookingStep("date");
      addMessage({
        role: "assistant",
        content: "What **date** works best for the demo? (e.g. 20 September or 2026-09-20)",
      });
      return;
    }

    if (bookingStep === "date") {
      const iso = parseToIsoDate(trimmed);
      if (!iso) {
        addMessage({
          role: "assistant",
          content: "I couldn't understand that date, or it's in the past. Please try again (e.g. 20 September or 2026-09-20).",
        });
        return;
      }
      setBookingData((d) => ({ ...d, date: iso }));
      setBookingStep("time");
      addMessage({ role: "assistant", content: "And what **time** works best? (e.g. 3:00 PM)" });
      return;
    }

    if (bookingStep === "time") {
      if (trimmed.length < 1) {
        addMessage({ role: "assistant", content: "Please enter a preferred time." });
        return;
      }
      const finalData = { ...bookingData, time: trimmed };
      setBookingData(finalData);
      setBookingStep("confirming");
      addMessage({
        role: "assistant",
        content: `Here's a summary of your booking request:\n\n🎓 **Academy:** ${finalData.academyHeading}\n📚 **Subject/Exam:** ${finalData.subject}\n🏫 **Year/Grade:** ${finalData.grade}\n📞 **Mobile:** ${finalData.mobile}\n📅 **Date:** ${finalData.date ? formatIsoDate(finalData.date) : ""}\n⏰ **Time:** ${trimmed}${timezone ? ` (${timezone})` : ""}\n\nShall I go ahead and send this? Reply **yes** to confirm or **no** to cancel.`,
      });
      return;
    }

    if (bookingStep === "confirming") {
      if (trimmed.toLowerCase().startsWith("y")) {
        setLoading(true);
        try {
          await axiosClient.post("/user/bookDemo/complete", {
            market: MARKET,
            academy: bookingData.academyHeading || "",
            subject: bookingData.subject || "",
            grade: bookingData.grade || "",
            mobile: bookingData.mobile || "",
            date: bookingData.date || "",
            time: bookingData.time || "",
            timezone,
            ...captureUtmParams(),
          });

          // Best-effort Slack ping alongside the real booking — its failure
          // must never block confirming the booking to the user.
          fetch("/api/nova-book", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              market: MARKET,
              academy: bookingData.academyHeading,
              subject: bookingData.subject,
              grade: bookingData.grade,
              mobile: bookingData.mobile,
              date: bookingData.date,
              time: bookingData.time,
              timezone,
            }),
          }).catch((err: unknown) => console.error("[Nova] Slack notify failed:", err));

          setBookingStep("done");
          addMessage({
            role: "assistant",
            content:
              "✅ **Booking request sent!** Our team will contact you shortly to confirm your free demo session.\n\nIs there anything else I can help you with?",
          });
        } catch (error) {
          console.error("[Nova] Failed to confirm demo booking:", error);
          addMessage({
            role: "assistant",
            content: `❌ Sorry, something went wrong sending your request. Please try again or visit our [demo page](${DEMO_PATH[LOCALE]}) to book directly.`,
          });
          setBookingStep("idle");
        } finally {
          setLoading(false);
        }
      } else {
        setBookingStep("idle");
        setBookingData({});
        addMessage({
          role: "assistant",
          content: "No problem! Booking cancelled. Is there anything else I can help you with?",
        });
      }
      return;
    }
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);

    if (bookingStep !== "idle" && bookingStep !== "done") {
      await handleBookingFlow(text);
      return;
    }

    if (detectBookingIntent(text) && bookingStep === "idle") {
      setBookingStep("academy");
      addMessage({
        role: "assistant",
        content: `I'd love to help you book a **free demo session**! 🎉\n\nWhich academy is your child interested in?\n\n${academyMenuText()}\n\nReply with a number or name.`,
      });
      return;
    }

    setLoading(true);
    try {
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));
      const res = await fetch("/api/nova-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history, locale: LOCALE }),
      });
      const data = await res.json();
      if (data.reply) {
        addMessage({ role: "assistant", content: data.reply });
      } else {
        addMessage({
          role: "assistant",
          content:
            "Sorry, I couldn't get a response right now. Please try again!",
        });
      }
    } catch {
      addMessage({
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-orange-500 underline">$1</a>')
      .replace(/•/g, "•")
      .split("\n")
      .map((line, i) => `<span key="${i}">${line}</span>`)
      .join("<br/>");
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-4 z-[9999] w-[370px] max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-orange-100"
            style={{ height: "520px" }}
          >
            <div className="bg-gradient-to-r from-orange-500 to-orange-400 px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">Nova</p>
                  <p className="text-orange-100 text-xs leading-tight">SuperSheldon Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-50 px-3 py-3 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot size={14} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-orange-500 text-white rounded-tr-sm"
                        : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-sm"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: renderMarkdown(msg.content),
                    }}
                  />
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User size={14} className="text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex gap-2 justify-start">
                  <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="bg-white shadow-sm border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="bg-white border-t border-gray-100 px-3 py-2.5 flex gap-2 items-center flex-shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  bookingStep === "idle" || bookingStep === "done"
                    ? "Ask about courses or book a demo..."
                    : "Type your answer..."
                }
                className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors placeholder:text-gray-400"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="w-9 h-9 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center flex-shrink-0"
              >
                {loading ? (
                  <Loader2 size={16} className="text-white animate-spin" />
                ) : (
                  <Send size={16} className="text-white" />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-5 right-4 z-[9999] pl-2 sm:pr-4 pr-2 py-2 rounded-full bg-gradient-to-br from-orange-500 to-orange-400 shadow-lg shadow-orange-300/50 items-center gap-2.5 text-white group ${mobileHidden ? "hidden md:flex" : "flex"}`}
        aria-label="Open Nova chatbot"
      >
        {/* Animated glow ring behind icon */}
        {!open && (
          <span className="absolute left-[7px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-orange-300/40 animate-ping" />
        )}

        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative w-10 h-10 rounded-full bg-white/20 flex items-center justify-center z-10"
            >
              <X size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative w-10 h-10 rounded-full overflow-hidden border-[3px] border-white/40 group-hover:border-white/80 transition-colors duration-300 shrink-0 z-10"
            >
              <Image
                src="/nova-icon.webp"
                alt="Nova"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </motion.div>
          )}
        </AnimatePresence>
        {!open && (
          <motion.span
            className="hidden sm:inline text-sm font-semibold whitespace-nowrap z-10"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            Chat with Nova
          </motion.span>
        )}
        {!open && unread > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center z-20 animate-bounce">
            {unread}
          </span>
        )}
      </motion.button>
    </>
  );
}
