"use client";

// Wraps LearnForm (the same wizard used on /uk/learn-maths etc.) as a modal
// overlay. Defaults to submitData=false — a client-side preview that makes no
// network calls — because NSAcademies' cards use it that way. The academy
// pages' subject picker passes submitData so its bookings actually reach
// /learn-lead and the sheet.
import { useEffect } from "react";
import LearnForm from "@/components/LearnForm/LearnForm";

export default function BookTrialModal({
  open,
  onClose,
  subject,
  heading,
  /** Which market's wizard to show. The /au academy pages need "au". */
  country = "uk",
  /** Restricts the grade step to these grade numbers, e.g. NAPLAN's [3, 5, 7, 9]. */
  grades,
  /** Set true to actually save the lead (POSTs /learn-lead/start + /complete). */
  submitData = false,
  /** Academy this modal was opened from, e.g. "Exam Academy" — written to the sheet
   *  alongside the "Academy Trial" source so a booking can be traced back to its page. */
  academy,
}: {
  open: boolean;
  onClose: () => void;
  subject: string;
  heading?: string;
  country?: "uk" | "au";
  grades?: number[];
  submitData?: boolean;
  academy?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-h-[95vh] w-full max-w-lg overflow-y-auto rounded-3xl">
        <LearnForm
          country={country}
          subject={subject}
          variant="modal"
          heading={heading}
          submitData={submitData}
          onClose={onClose}
          grades={grades}
          source="Academy Trial"
          academy={academy}
        />
      </div>
    </div>
  );
}
