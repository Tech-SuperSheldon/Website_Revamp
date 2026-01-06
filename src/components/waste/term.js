"use client";
import React from "react";

export default function TermsPage() {
  return (
    <div className="w-full h-screen flex flex-col items-center bg-gray-50">
      <h1 className="text-2xl font-bold my-4 text-gray-700">Terms & Conditions</h1>
      <iframe
        src="/Files/Term.pdf"
        className="w-11/12 h-[90vh] border rounded-lg shadow-md"
      />
    </div>
  );
}
