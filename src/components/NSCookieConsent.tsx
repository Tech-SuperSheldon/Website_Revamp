"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

export default function NSCookieConsent() {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
          className="fixed bottom-0 left-0 right-0 z-[9998] px-4 py-4 md:px-6 md:py-5"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-orange-100 px-5 py-4 md:px-6 md:py-5 flex flex-col sm:flex-row items-center gap-4">
            {/* Icon */}
            <div className="shrink-0 w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
              <Cookie className="w-6 h-6 text-orange-500" />
            </div>

            {/* Text */}
            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm md:text-base text-gray-800 font-medium leading-relaxed">
                We use cookies to enhance your experience and analyze site traffic. By continuing, you agree to our use of cookies.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setShow(false)}
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200 shadow-md"
              >
                Accept
              </button>
              <button
                onClick={() => setShow(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
