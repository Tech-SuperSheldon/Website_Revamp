"use client";

// Wraps LearnForm (the same wizard used on /uk/learn-maths etc.) as a modal
// overlay, used by NSAcademies' "Book a free trial" cards. submitData is
// false — no network calls, this is purely a client-side preview of the flow.
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
}: {
  open: boolean;
  onClose: () => void;
  subject: string;
  heading?: string;
  country?: "uk" | "au";
  grades?: number[];
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
          submitData={false}
          onClose={onClose}
          grades={grades}
        />
      </div>
    </div>
  );
}
