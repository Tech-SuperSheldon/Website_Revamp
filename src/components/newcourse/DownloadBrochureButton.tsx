"use client";

import React, { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Course } from "@/lib/course-data-au";

interface DownloadBrochureButtonProps {
  course: Course;
  /** "solid" (default) for the detail page, "compact" for course cards */
  variant?: "solid" | "compact";
  className?: string;
  /** If set, download this URL directly instead of generating a PDF */
  uploadedBrochureUrl?: string | null;
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function DownloadBrochureButton({
  course,
  variant = "solid",
  className = "",
  uploadedBrochureUrl,
}: DownloadBrochureButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    // Cards wrap this button in a <Link>; stop the click from navigating.
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;

    // If an uploaded brochure URL exists, download it directly.
    if (uploadedBrochureUrl) {
      const link = document.createElement("a");
      link.href = uploadedBrochureUrl;
      link.download = `SuperSheldon-${slugify(course.title)}-Brochure.pdf`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    setLoading(true);

    try {
      // Load the PDF engine + template only when needed (keeps it client-side
      // and out of the initial bundle).
      const [{ pdf }, { default: CourseBrochurePDF }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./CourseBrochurePDF"),
      ]);

      const blob = await pdf(<CourseBrochurePDF course={course} />).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `SuperSheldon-${slugify(course.title)}-Brochure.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Brochure generation failed:", err);
      alert("Sorry, the brochure could not be generated. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const base =
    "inline-flex items-center justify-center gap-2 font-bold transition-all disabled:opacity-70 disabled:cursor-wait";

  const variants = {
    solid:
      "bg-white text-orange-600 border-2 border-orange-600 px-8 py-3 rounded-full hover:bg-orange-50 shadow-lg shadow-orange-500/10 whitespace-nowrap",
    compact:
      "w-full py-3 rounded-xl border border-orange-200 text-orange-600 hover:bg-orange-50 text-sm",
  } as const;

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      className={`${base} ${variants[variant]} ${className}`}
      aria-label={`Download brochure for ${course.title}`}
    >
      {loading ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          Preparing…
        </>
      ) : (
        <>
          <Download size={18} />
          Download Brochure
        </>
      )}
    </button>
  );
}
