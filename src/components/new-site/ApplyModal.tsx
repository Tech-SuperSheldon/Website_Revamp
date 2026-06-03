"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, CheckCircle, Loader2 } from "lucide-react";

interface ApplyModalProps {
  open: boolean;
  onClose: () => void;
}

const SUBJECTS = ["Maths", "English", "Science", "NAPLAN", "11+", "ICAS", "Other"];
const EXPERIENCE_LEVELS = ["Less than 1 year", "1–2 years", "3–5 years", "5+ years"];

type Step = 1 | 2 | 3;
type Status = "idle" | "submitting" | "success" | "error";

export default function ApplyModal({ open, onClose }: ApplyModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "Australia",
    subject: "",
    experience: "",
    cv: null as File | null,
  });

  const set = (k: string, v: string | File | null) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setStatus("submitting");
    try {
      const body = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (v !== null) body.append(k, v as string | Blob);
      });
      const res = await fetch("/api/apply", { method: "POST", body });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setStatus("idle");
      setForm({ name: "", email: "", country: "Australia", subject: "", experience: "", cv: null });
    }, 300);
  };

  const inputCls =
    "w-full border border-orange-200 rounded-xl px-4 py-3 text-base text-[#1D2026] bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-400";
  const selectCls =
    "w-full border border-orange-200 rounded-xl px-4 py-3 text-base text-[#1D2026] bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer";
  const labelCls = "block text-sm font-semibold text-[#1D2026] mb-1.5";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative z-10 w-full sm:max-w-lg bg-[#FFF9F3] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-orange-100">
              <div>
                <h2 className="text-xl font-bold text-[#1D2026]">Apply to Teach</h2>
                <p className="text-sm text-[#4E5566]">Takes less than 5 minutes</p>
              </div>
              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-full bg-orange-50 hover:bg-orange-100 flex items-center justify-center transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <X size={16} className="text-[#1D2026]" />
              </button>
            </div>

            {/* Step indicator */}
            {status !== "success" && (
              <div className="flex flex-wrap items-center gap-2 px-6 pt-5 pb-1">
                {([1, 2, 3] as Step[]).map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        step === s
                          ? "bg-orange-500 text-white"
                          : step > s
                          ? "bg-emerald-500 text-white"
                          : "bg-orange-100 text-orange-400"
                      }`}
                    >
                      {step > s ? <CheckCircle size={14} /> : s}
                    </div>
                    {s < 3 && <div className={`h-px flex-1 w-8 ${step > s ? "bg-emerald-400" : "bg-orange-100"}`} />}
                  </div>
                ))}
                <span className="text-xs text-[#4E5566] ml-2">
                  Step {step} of 3
                </span>
              </div>
            )}

            {/* Body */}
            <div className="px-6 py-5 flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1D2026] mb-2">Application Received!</h3>
                    <p className="text-[#4E5566] text-sm leading-relaxed max-w-xs mx-auto">
                      Thank you, {form.name.split(" ")[0]}! Our team will review your application and get back to you within 2–3 business days.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-6 px-7 py-2.5 bg-orange-500 text-white font-bold rounded-full text-sm hover:bg-orange-600 transition-colors"
                    >
                      Done
                    </button>
                  </motion.div>
                ) : step === 1 ? (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                    <div>
                      <label className={labelCls}>Full Name</label>
                      <input className={inputCls} placeholder="e.g. Sarah Johnson" value={form.name} onChange={(e) => set("name", e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>Email Address</label>
                      <input className={inputCls} type="email" placeholder="sarah@example.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>Country</label>
                      <select className={selectCls} value={form.country} onChange={(e) => set("country", e.target.value)}>
                        <option>Australia</option>
                        <option>UK</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </motion.div>
                ) : step === 2 ? (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                    <div>
                      <label className={labelCls}>Primary Subject</label>
                      <select className={selectCls} value={form.subject} onChange={(e) => set("subject", e.target.value)}>
                        <option value="">Select a subject…</option>
                        {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Teaching Experience</label>
                      <select className={selectCls} value={form.experience} onChange={(e) => set("experience", e.target.value)}>
                        <option value="">Select experience level…</option>
                        {EXPERIENCE_LEVELS.map((e) => <option key={e}>{e}</option>)}
                      </select>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                    <div>
                      <label className={labelCls}>Upload CV <span className="font-normal text-[#4E5566]">(optional)</span></label>
                      <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-orange-200 rounded-2xl px-4 py-6 cursor-pointer hover:border-orange-400 transition-colors bg-orange-50/40">
                        <span className="text-orange-500 font-semibold text-xs sm:text-sm truncate max-w-full text-center">
                          {form.cv ? form.cv.name : "Click to upload PDF or DOC"}
                        </span>
                        <span className="text-xs text-[#4E5566]">Max 5MB</span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) => set("cv", e.target.files?.[0] ?? null)}
                        />
                      </label>
                    </div>
                    {status === "error" && (
                      <p className="text-sm text-red-500 text-center">Something went wrong — please try again.</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer actions */}
            {status !== "success" && (
              <div className="px-6 pb-6 flex flex-col-reverse sm:flex-row sm:justify-between items-stretch sm:items-center gap-3">
                {step > 1 ? (
                  <button
                    onClick={() => setStep((s) => (s - 1) as Step)}
                    className="px-5 py-2.5 text-sm font-semibold text-[#4E5566] hover:text-[#1D2026] transition-colors"
                  >
                    ← Back
                  </button>
                ) : (
                  <div />
                )}
                {step < 3 ? (
                  <button
                    onClick={() => setStep((s) => (s + 1) as Step)}
                    disabled={
                      (step === 1 && (!form.name.trim() || !form.email.trim())) ||
                      (step === 2 && (!form.subject || !form.experience))
                    }
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 bg-orange-500 text-white font-bold rounded-full text-sm hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors min-h-[44px]"
                  >
                    Continue <ChevronRight size={15} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={status === "submitting"}
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 bg-orange-500 text-white font-bold rounded-full text-sm hover:bg-orange-600 disabled:opacity-60 transition-colors min-h-[44px]"
                  >
                    {status === "submitting" ? (
                      <><Loader2 size={15} className="animate-spin" /> Submitting…</>
                    ) : (
                      <>Submit Application <ChevronRight size={15} /></>
                    )}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
