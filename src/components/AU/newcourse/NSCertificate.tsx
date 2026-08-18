import React from "react";
import Image from "next/image";
import { Award } from "lucide-react";

export default function NSCertificate() {
  return (
    <div className="w-full mt-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn at Your Own Pace</h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
          Shape your learning journey with confidence, progressing step by step in a rhythm that works best for you.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 max-w-4xl">
        <div className="relative w-full aspect-[4/3] md:aspect-[16/11]">
             <Image 
                src="/certificate_of_comp.jpeg" 
                alt="Certificate of Completion" 
                fill 
                className="object-contain"
             />
        </div>
      </div>
    </div>
  );
}
