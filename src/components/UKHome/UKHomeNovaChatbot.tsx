"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Loader2, MessageCircle } from "lucide-react";
import Image from "next/image";

interface Message {
  role: "user" | "assistant";
  content: string;
}

type BookingStep =
  | "idle"
  | "name"
  | "email"
  | "phone"
  | "grade"
  | "subject"
  | "confirming"
  | "done";

interface BookingData {
  fullName?: string;
  email?: string;
  mobile?: string;
  grade?: string;
  subject?: string;
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

export default function UKHomeNovaChatbot({ mobileHidden = false }: { mobileHidden?: boolean }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm **Nova**, your SuperSheldon assistant 👋\n\nI can help you with:\n• Information about our UK courses (11+, GCSE, iGCSE, A-Level, Maths, English)\n• Booking a free demo session\n\nWhat would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingStep, setBookingStep] = useState<BookingStep>("idle");
  const [bookingData, setBookingData] = useState<BookingData>({});
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

  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
    if (!open) setUnread((u) => u + 1);
  };

  const handleBookingFlow = async (userText: string) => {
    const trimmed = userText.trim();

    if (bookingStep === "name") {
      if (trimmed.length < 2) {
        addMessage({
          role: "assistant",
          content: "Please enter your full name (at least 2 characters).",
        });
        return;
      }
      setBookingData((d) => ({ ...d, fullName: trimmed }));
      setBookingStep("email");
      addMessage({
        role: "assistant",
        content: `Thanks ${trimmed}! What's your **email address**?`,
      });
      return;
    }

    if (bookingStep === "email") {
      if (!/^\S+@\S+\.\S+$/.test(trimmed)) {
        addMessage({
          role: "assistant",
          content: "That doesn't look like a valid email. Please try again.",
        });
        return;
      }
      setBookingData((d) => ({ ...d, email: trimmed }));
      setBookingStep("phone");
      addMessage({
        role: "assistant",
        content:
          "Got it! What's your **phone number**? (include country code, e.g. +447123456789)",
      });
      return;
    }

    if (bookingStep === "phone") {
      const digits = trimmed.replace(/\D/g, "");
      if (digits.length < 8) {
        addMessage({
          role: "assistant",
          content:
            "Please enter a valid phone number (at least 8 digits, include country code).",
        });
        return;
      }
      setBookingData((d) => ({ ...d, mobile: trimmed }));
      setBookingStep("grade");
      addMessage({
        role: "assistant",
        content:
          "What **year/grade** is your child in? (e.g. Year 5, Year 9, etc.)",
      });
      return;
    }

    if (bookingStep === "grade") {
      if (trimmed.length < 1) {
        addMessage({
          role: "assistant",
          content: "Please enter the year/grade.",
        });
        return;
      }
      setBookingData((d) => ({ ...d, grade: trimmed }));
      setBookingStep("subject");
      addMessage({
        role: "assistant",
        content:
          "And which **subject** are you interested in? (e.g. Maths, English, 11+, GCSE)",
      });
      return;
    }

    if (bookingStep === "subject") {
      if (trimmed.length < 2) {
        addMessage({
          role: "assistant",
          content: "Please enter a subject.",
        });
        return;
      }
      const finalData = { ...bookingData, subject: trimmed };
      setBookingData(finalData);
      setBookingStep("confirming");
      addMessage({
        role: "assistant",
        content: `Here's a summary of your booking request:\n\n👤 **Name:** ${finalData.fullName}\n📧 **Email:** ${finalData.email}\n📞 **Phone:** ${finalData.mobile}\n📚 **Year/Grade:** ${finalData.grade}\n🎯 **Subject:** ${trimmed}\n\nShall I go ahead and send this? Reply **yes** to confirm or **no** to cancel.`,
      });
      return;
    }

    if (bookingStep === "confirming") {
      if (trimmed.toLowerCase().startsWith("y")) {
        setLoading(true);
        try {
          const res = await fetch("/api/nova-book", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingData),
          });
          const data = await res.json();
          if (data.ok) {
            setBookingStep("done");
            addMessage({
              role: "assistant",
              content:
                "✅ **Booking request sent!** Our team will contact you shortly to confirm your free demo session.\n\nIs there anything else I can help you with?",
            });
          } else {
            addMessage({
              role: "assistant",
              content:
                "❌ Sorry, something went wrong sending your request. Please try again or visit our [demo page](/demo) to book directly.",
            });
            setBookingStep("idle");
          }
        } catch {
          addMessage({
            role: "assistant",
            content:
              "❌ Network error. Please try again or visit our [demo page](/demo) to book directly.",
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
          content:
            "No problem! Booking cancelled. Is there anything else I can help you with?",
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
      setBookingStep("name");
      addMessage({
        role: "assistant",
        content:
          "I'd love to help you book a **free demo session**! 🎉\n\nLet me collect a few details. First, what's your **full name**?",
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
        body: JSON.stringify({ message: text, history }),
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
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-500 underline">$1</a>')
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
            className="fixed bottom-24 right-4 z-[9999] w-[370px] max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-blue-100"
            style={{ height: "520px" }}
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-400 px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">Nova</p>
                  <p className="text-blue-100 text-xs leading-tight">SuperSheldon Assistant</p>
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
                    <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot size={14} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-blue-500 text-white rounded-tr-sm"
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
                  <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="bg-white shadow-sm border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:300ms]" />
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
                className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors placeholder:text-gray-400"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="w-9 h-9 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center flex-shrink-0"
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
        className={`fixed bottom-5 right-4 z-[9999] pl-2 sm:pr-4 pr-2 py-2 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 shadow-lg shadow-blue-300/50 items-center gap-2.5 text-white group ${mobileHidden ? "hidden md:flex" : "flex"}`}
        aria-label="Open Nova chatbot"
      >
        {/* Animated glow ring behind icon */}
        {!open && (
          <span className="absolute left-[7px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-blue-300/40 animate-ping" />
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
