"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Cal, { getCalApi } from "@calcom/embed-react";

const avatars = [
  "/avatars/s1.png",
  "/avatars/s2.png",
  "/avatars/s3.png",
  "/avatars/s4.png",
];

const QUESTIONS = [
  {
    prompt: "What would you like your child to improve the most right now?",
    options: [
      "🗣️ Confidence in expressing ideas",
      "🎯 Stronger understanding of basics",
      "🚀 Overall learning and clarity",
    ],
  },
  {
    prompt:
      "To better understand your child, how would you describe their personality?",
    options: ["😄 Outgoing", "😟 Shy", "🙂 Somewhere in between"],
  },
  {
    prompt: "What is the biggest challenge your child is facing right now?",
    options: [
      "😟 Lacks confidence or hesitates to speak",
      "😕 Understands slowly or needs repeated support",
      "🏫 School methods are not working for my child",
      "🤷 Not sure yet, I just want better guidance",
    ],
  },
] as const;

export function NewHeroSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    childAgeYear: "",
    subject: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [isQuestionFlowOpen, setIsQuestionFlowOpen] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [questionStep, setQuestionStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(
    Array.from({ length: QUESTIONS.length }, () => "")
  );

  const answersRef = useRef<string[]>(Array.from({ length: QUESTIONS.length }, () => ""));
  const submitDataRef = useRef<any>(null);

  const [pendingSubmitData, setPendingSubmitData] = useState<null | {
    fullName: string;
    email: string;
    mobile: string;
    childAgeYear: string;
    subject: string;
  }>(null);

  const router = useRouter();

  const submitToBackend = useCallback(async (
    baseData: {
      fullName: string;
      email: string;
      mobile: string;
      childAgeYear: string;
      subject: string;
    }, 
    finalAnswers: string[],
    rawBookingData: any
  ) => {
    setIsSubmitting(true);
    try {
      const submitFormData = QUESTIONS.map((q, i) => ({
        question: q.prompt,
        answer: finalAnswers[i],
      }));

      const booking = rawBookingData.booking;

      const toIST = (isoString: string) => {
        return new Date(isoString).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "full",
          timeStyle: "short",
        });
      };

      const meetingRef = booking.references?.find((ref: any) => ref.meetingUrl);
      const meetingUrl = meetingRef ? meetingRef.meetingUrl : booking.videoCallUrl;

      const bookingSummary = {
        meetingDate: booking.startTime.split("T")[0],
        startTimeUTC: booking.startTime,
        endTimeUTC: booking.endTime,
        timeZone: booking.attendees?.[0]?.timeZone || booking.user?.timeZone,
        startTimeIST: toIST(booking.startTime),
        endTimeIST: toIST(booking.endTime),
        meetingUrl: meetingUrl || "No meeting URL generated",
      };

      const submitData = {
        ...baseData,
        submitFormData,
        bookingSummary,
      };

      const API_URL = "https://webapi.supersheldon.com";

      const response = await fetch(`https://n8n.supersheldon.com/webhook/new-leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        childAgeYear: "",
        subject: "",
      });
      setPhoneValue("");
      router.push("/utm-market/thank-you");
    } catch (error: any) {
      const errorMessage = error?.message || "There was an error submitting your form. Please try again.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }, [router]);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": "book-demo" });
      cal("ui", { "theme": "light", "hideEventTypeDetails": false, "layout": "month_view" });

      cal("on", {
        action: "bookingSuccessful",
        callback: async (e: any) => {
          const bookingData = e.detail.data;

          if (submitDataRef.current && answersRef.current) {
             await submitToBackend(submitDataRef.current, answersRef.current, bookingData);
          }
        }
      });
    })();
  }, [submitToBackend]);

  const resetQuestionFlow = () => {
    setIsQuestionFlowOpen(false);
    setShowScheduler(false);
    setQuestionStep(0);
    setAnswers(Array.from({ length: QUESTIONS.length }, () => ""));
    answersRef.current = Array.from({ length: QUESTIONS.length }, () => "");
    setPendingSubmitData(null);
    submitDataRef.current = null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.childAgeYear || !formData.subject) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!phoneValue) {
      alert("Please enter a valid phone number.");
      return;
    }

    const submitData = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      mobile: phoneValue,
      childAgeYear: formData.childAgeYear.trim(),
      subject: formData.subject
    };

    setPendingSubmitData(submitData);
    submitDataRef.current = submitData;
    setIsQuestionFlowOpen(true);
  };

  const currentQuestion = QUESTIONS[questionStep];

  const handleSelectAnswer = (option: string) => {
    if (isSubmitting) return;

    const next = [...answers];
    next[questionStep] = option;
    setAnswers(next);
    answersRef.current = next;

    if (questionStep < QUESTIONS.length - 1) {
      setQuestionStep(questionStep + 1);
      return;
    }

    if (!pendingSubmitData) {
      resetQuestionFlow();
      return;
    }

    setShowScheduler(true);
  };

  const handleBackQuestion = () => {
    if (isSubmitting) return;
    if (questionStep === 0) {
      setIsQuestionFlowOpen(false);
      return;
    }
    setQuestionStep(questionStep - 1);
  };

  return (
    <section className="w-full pt-2 md:pt-3 lg:pt-4 pb-6 md:pb-10 lg:pb-12 relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="relative w-48 h-16 md:w-64 md:h-20">
            <Image
              src="/logo.png"
              alt="Super Sheldon Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">
          <div className="flex flex-col space-y-4 md:space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] text-center">
              <span className="whitespace-nowrap block">Give Your Child the</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300">
                Academic Edge
              </span>
            </h1>

            <motion.div
              id="booking-form"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ delay: 0.2 }}
              className={cn(
                "bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 p-4 md:p-5 transition-all duration-300",
                showScheduler ? "h-[600px]" : "h-auto"
              )}
            >
              {!showScheduler && (
                <div className="mb-3 md:mb-4">
                  <h3 className="text-lg md:text-xl font-bold text-slate-900">Book Your Free Demo Session</h3>
                  <p className="text-slate-500 text-xs md:text-sm mt-0.5">Get a personalised learning plan today.</p>
                </div>
              )}

              {showScheduler ? (
                <div className="w-full h-full overflow-hidden rounded-2xl">
                   <Cal namespace="book-demo"
                    calLink="super-sheldon-ah5ywi/book-demo"
                    style={{width:"100%",height:"100%",overflow:"scroll"}}
                    config={{
                      "layout":"month_view",
                      "useSlotsViewOnSmallScreen":"true",
                      "theme":"light",
                      // Prefill Cal.com attendee details from the form
                      name: (pendingSubmitData?.fullName || formData.fullName || "").trim(),
                      email: (pendingSubmitData?.email || formData.email || "").trim().toLowerCase(),
                    }}
                  />
                </div>
              ) : isQuestionFlowOpen ? (
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        Question {questionStep + 1} of {QUESTIONS.length}
                      </p>
                      <h4 className="text-base md:text-lg font-bold text-slate-900 leading-snug">
                        {currentQuestion.prompt}
                      </h4>
                    </div>
                    <div className="shrink-0 text-xs font-bold text-slate-500 tabular-nums">
                      {questionStep + 1}/{QUESTIONS.length}
                    </div>
                  </div>

                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-300"
                      style={{
                        width: `${Math.round(
                          ((questionStep + 1) / QUESTIONS.length) * 100
                        )}%`,
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {currentQuestion.options.map((opt) => {
                      const selected = answers[questionStep] === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectAnswer(opt)}
                          disabled={isSubmitting}
                          className={cn(
                            "w-full rounded-2xl border px-4 py-3 md:px-5 md:py-4 text-left transition-all",
                            selected
                              ? "border-orange-300 bg-orange-50 shadow-sm"
                              : "border-slate-200 bg-white hover:border-orange-200 hover:bg-orange-50/40",
                            isSubmitting && "opacity-60 cursor-not-allowed"
                          )}
                          aria-pressed={selected}
                        >
                          <div className="text-sm md:text-base font-bold text-slate-900">
                            {opt}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBackQuestion}
                      disabled={isSubmitting}
                      className="h-10 md:h-11 font-semibold"
                    >
                      Back
                    </Button>
                    <div className="text-xs md:text-sm font-semibold text-slate-500">
                      {isSubmitting ? "Submitting..." : "Tap an option to continue"}
                    </div>
                  </div>
                </div>
              ) : (
                <form className="space-y-2.5" onSubmit={handleSubmit}>
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wide font-bold text-slate-500 text-left block">Your Name</label>
                    <Input
                      type="text"
                      placeholder="Please share your name"
                      className="h-10 md:h-11 bg-slate-50 border-slate-200 focus-visible:ring-purple-500 text-sm rounded-md pl-3"
                      style={{ textAlign: 'left', direction: 'ltr' }}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-wide font-bold text-slate-500 text-left block">Email</label>
                      <Input
                        type="email"
                        placeholder="Please share your email id"
                        className="h-10 md:h-11 bg-slate-50 border-slate-200 focus-visible:ring-purple-500 text-sm rounded-md pl-3"
                        style={{ textAlign: 'left', direction: 'ltr' }}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-wide font-bold text-slate-500 text-left block">Phone Number</label>
                      <PhoneInput
                        country={'us'}
                        placeholder="Please share your phone number"
                        value={phoneValue}
                        onChange={(value) => setPhoneValue(value)}
                        inputProps={{ required: true, name: 'phone' }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-wide font-bold text-slate-500 text-left block">Child Age</label>
                      <div className="relative">
                        <select
                          className="w-full h-10 md:h-11 px-3 md:px-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500 appearance-none"
                          style={{ textAlign: 'left', direction: 'ltr' }}
                          value={formData.childAgeYear}
                          onChange={(e) => setFormData({ ...formData, childAgeYear: e.target.value })}
                          required
                        >
                          <option value="" disabled>Please select age</option>
                          {Array.from({ length: 11 }, (_, i) => i + 6).map((age) => (
                            <option key={age} value={age.toString()}>{age}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 md:px-4 pointer-events-none text-slate-500">
                          <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-wide font-bold text-slate-500 text-left block">Subject of Interest</label>
                      <div className="relative">
                        <select
                          className="w-full h-10 md:h-11 px-3 md:px-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500 appearance-none"
                          style={{ textAlign: 'left', direction: 'ltr' }}
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required
                        >
                          <option value="" disabled>Please share your subject</option>
                          <option value="english">English</option>
                          <option value="maths">Maths</option>
                          <option value="both">Both</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 md:px-4 pointer-events-none text-slate-500">
                          <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 md:h-12 text-sm md:text-base font-bold bg-gradient-to-r from-orange-500 to-orange-300 hover:opacity-90 transition-all shadow-lg shadow-orange-500/20 mt-0.5 text-white rounded-xl"
                  >
                    Book A Free 1:1 Session
                  </Button>
                </form>
              )}
            </motion.div>
          </div>

          <div className="flex flex-col space-y-6 md:space-y-8 lg:pt-0">
            <div className="flex flex-wrap gap-3 md:gap-4 justify-center md:justify-start">
              <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 md:py-2.5 rounded-2xl bg-orange-50 border border-orange-100 text-orange-700 text-base md:text-lg font-bold shadow-sm hover:scale-105 transition-transform">
                <span className="text-xl md:text-2xl">📚</span> English
              </div>
              <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 md:py-2.5 rounded-2xl bg-purple-50 border border-purple-100 text-purple-700 text-base md:text-lg font-bold shadow-sm hover:scale-105 transition-transform">
                <span className="text-xl md:text-2xl">🔢</span> Maths
              </div>
              <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 md:py-2.5 rounded-2xl bg-teal-50 border border-teal-100 text-teal-700 text-base md:text-lg font-bold shadow-sm hover:scale-105 transition-transform">
                <span className="text-xl md:text-2xl">🧬</span> Science
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium text-center md:text-left">
                Super Sheldon provides expert 1-to-1 tutoring in English, Maths and Science.
                Our personalised approach builds confidence and helps students achieve their full potential.
              </p>
              <div className="flex items-center gap-4 py-2">
                <div className="flex -space-x-3">
                  {avatars.map((src, i) => (
                    <div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white overflow-hidden relative">
                      <Image src={src} alt={`User ${i + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex text-yellow-400 text-sm">★★★★★</div>
                  <div className="text-sm font-medium text-slate-600">Trusted by 2000+ Students</div>
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="w-full overflow-hidden rounded-xl border border-slate-100 relative h-40 md:h-48 group">
                <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent z-10"></div>
                <div className="flex absolute min-w-full h-full">
                  <div className="animate-marquee flex items-center gap-4 px-2 h-full">
                    {[...Array(3)].map((_, setIndex) => (
                      <div key={setIndex} className="flex gap-4 h-full">
                        <div className="relative w-60 h-full rounded-lg overflow-hidden shrink-0">
                          <Image src="/hero1.jpeg" alt="Hero 1" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="relative w-60 h-full rounded-lg overflow-hidden shrink-0">
                          <Image src="/hero2.jpeg" alt="Hero 2" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="relative w-60 h-full rounded-lg overflow-hidden shrink-0">
                          <Image src="/hero3.jpeg" alt="Hero 3" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="relative w-60 h-full rounded-lg overflow-hidden shrink-0">
                          <Image src="/hero4.jpeg" alt="Hero 4" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Reviewed On</p>
              <div className="w-full overflow-hidden bg-white/50 rounded-xl py-3 md:py-4 border border-slate-100">
                <div className="relative flex overflow-x-hidden group">
                  <div className="animate-marquee whitespace-nowrap flex items-center gap-16 px-6">
                    <span className="text-lg md:text-xl font-bold text-slate-400 flex items-center gap-2">Google <span className="text-slate-300 font-normal">Reviews</span></span>
                    <span className="text-lg md:text-xl font-bold text-slate-400">Trustpilot</span>
                    <span className="text-lg md:text-xl font-bold text-slate-400 flex items-center gap-2">Google <span className="text-slate-300 font-normal">Reviews</span></span>
                    <span className="text-lg md:text-xl font-bold text-slate-400">Trustpilot</span>
                    <span className="text-lg md:text-xl font-bold text-slate-400 flex items-center gap-2">Google <span className="text-slate-300 font-normal">Reviews</span></span>
                    <span className="text-lg md:text-xl font-bold text-slate-400">Trustpilot</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .react-tel-input {
          width: 100% !important;
        }
        .react-tel-input .flag-dropdown {
          background-color: rgb(248 250 252) !important;
          border: 1px solid rgb(226 232 240) !important;
          border-radius: 0.375rem 0 0 0.375rem !important;
          border-right: none !important;
        }
        .react-tel-input .form-control {
          width: 100% !important;
          height: 2.5rem !important;
          background-color: rgb(248 250 252) !important;
          border: 1px solid rgb(226 232 240) !important;
          border-radius: 0 0.375rem 0.375rem 0 !important;
          padding-left: 58px !important;
          text-align: left !important;
        }
        @media (min-width: 768px) {
          .react-tel-input .form-control {
            height: 2.75rem !important;
          }
        }
        .react-tel-input .form-control::placeholder {
          text-align: left !important;
          color: rgb(148 163 184) !important;
        }
        .react-tel-input .form-control:focus {
          border-color: rgb(168 85 247) !important;
          box-shadow: 0 0 0 1px rgb(168 85 247) !important;
        }
        input[type="text"],
        input[type="email"],
        input[type="tel"],
        input,
        input::placeholder {
          text-align: left !important;
          direction: ltr !important;
        }
        form select {
          text-align: left !important;
          direction: ltr !important;
        }
      `}</style>
    </section>
  );
}
