import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function NSJoinUs() {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 mt-12 mb-12">
      <div className="max-w-xl">
        <div className="flex justify-between items-start w-full md:hidden mb-4">
            <h2 className="text-3xl font-bold text-gray-900">Join Us Today</h2>
             <CheckCircle2 className="text-gray-400" size={24} />
        </div>
        <h2 className="hidden md:block text-3xl font-bold text-gray-900 mb-4">Join Us Today</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Unlock access to expert-led courses, hands-on projects, and a community built to help you grow in learning and development.
        </p>
      </div>

       <div className="hidden md:block">
            <CheckCircle2 className="text-gray-400" size={32} />
       </div>

      <div className="shrink-0">
        <Link href="/demo">
          <button className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/30 whitespace-nowrap text-lg">
            Enroll Today
          </button>
        </Link>
      </div>
    </div>
  );
}
