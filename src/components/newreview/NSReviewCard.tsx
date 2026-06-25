import React from "react";
import { Review } from "@/lib/review-data-us";

interface NSReviewCardProps {
  review: Review;
}

export default function NSReviewCard({ review }: NSReviewCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
             {/* Gradient border effect for avatar */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-75"></div>
            <img
                src={review.profilePic}
                alt={review.name}
                className="relative w-12 h-12 rounded-full object-cover border-2 border-white"
            />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 leading-tight">{review.name}</h3>
            <p className="text-gray-500 text-sm">{review.handle || `@${review.name.replace(/\s+/g, '').toLowerCase()}`}</p>
          </div>
        </div>
        {/* Removed X button */}
      </div>

      <p className="text-gray-700 leading-relaxed text-[15px]">
        &quot;{review.text}&quot;
      </p>
      
      {/* Optional: Source tag if needed to match strictly, but image shows clean text */}
      {/* <div className="mt-4 flex gap-2">
         <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">{review.source}</span>
      </div> */}
    </div>
  );
}
