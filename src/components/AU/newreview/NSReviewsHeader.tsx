import React from "react";
import Image from "next/image";
import { Users } from "lucide-react";

export default function NSReviewsHeader() {
  return (
    <div className="text-center mb-16">
        <div className="inline-block bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
            <span className="flex items-center gap-2">
                <Users size={16} />
                Reviews
            </span>
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
            Trusted Voices, Proven Results
        </h1>
        
        <p className="text-gray-500 text-xl md:text-2xl max-w-3xl mx-auto mb-10">
            Discover real feedback from learners who leveled up their skills with SuperSheldon.
        </p>

        {/* Stats / Avatars similar to screenshot */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex -space-x-3">
                <Image className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=1" alt="User" width={40} height={40} />
                <Image className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=5" alt="User" width={40} height={40} />
                <Image className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=8" alt="User" width={40} height={40} />
            </div>
            <div className="flex flex-col text-left">
                <div className="text-sm font-bold text-gray-900">Join 2K+ learners</div>
                <div className="text-xs text-gray-500">who shared their journey</div>
            </div>
        </div>
    </div>
  );
}
