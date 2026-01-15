


"use client";

import { useState } from "react";
import GlossyButton from "./GlossyButton";
import Link from "next/link";
import { useOpenDemoBooking } from "./utils/navigation";

export default function Popup() {
  const [visible, setVisible] = useState(true);
   const openDemoBooking = useOpenDemoBooking();

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-1 sm:p-2">
      <div className="relative w-full max-w-md mx-auto shadow-md rounded-lg px-3 py-2 flex items-center bg-orange-100 justify-between border border-orange-200 gap-2">
        
        {/* Message */}
        <p className="text-xs sm:text-sm font-semibold text-gray-800 flex-1 whitespace-nowrap overflow-hidden text-ellipsis pr-1">
          Hurry! Limited seats available
        </p>

        {/* Button */}
       
          <GlossyButton onClick={openDemoBooking} className="px-3 py-1 text-xs sm:text-sm">
            Book Now
          </GlossyButton>
        

        {/* Close Button */}

      </div>
    </div>
  );
}