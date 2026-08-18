"use client";

export default function BrochurePrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="fixed top-4 right-4 z-50 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-lg transition-all print:hidden"
    >
      Download PDF
    </button>
  );
}
