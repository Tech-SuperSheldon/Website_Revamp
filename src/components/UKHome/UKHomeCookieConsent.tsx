"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

export default function UKHomeCookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const choice = localStorage.getItem("cookie-consent");
    if (!choice) setShow(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
          className="fixed bottom-0 left-0 right-0 z-[99999] px-4 py-4 md:px-6 md:py-5"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-blue-100 px-5 py-4 md:px-6 md:py-5 flex flex-col sm:flex-row items-center gap-4">
            {/* Icon */}
            <div className="shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <Cookie className="w-6 h-6 text-blue-500" />
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
                onClick={handleReject}
                className="border border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-800 text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200"
              >
                Reject
              </button>
              <button
                onClick={handleAccept}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200 shadow-md"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
