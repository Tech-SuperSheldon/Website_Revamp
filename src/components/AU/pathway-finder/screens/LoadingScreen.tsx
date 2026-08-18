"use client";

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />
      <p className="mt-6 text-lg font-medium text-slate-600">
        Analysing your answers…
      </p>
    </div>
  );
}
