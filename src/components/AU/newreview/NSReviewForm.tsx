import React, { useState } from "react";
import Image from "next/image";
import { X, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NSReviewForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-32">
      <div className="flex items-center gap-3 mb-6">
        <Image
          src="/Final-Logo-bg-removed.png"
          alt="SuperSheldon"
          width={160}
          height={60}
          className="object-contain"
        />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">Submit Your Review</h3>
      <p className="text-gray-500 mb-8 font-manrope">We&apos;d love to hear about your experience with us.</p>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
            <input 
                type="text" 
                placeholder="Ex. Sarah J." 
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-sm"
            />
        </div>

        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input 
                type="email" 
                placeholder="your@email.com" 
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-sm"
            />
        </div>

        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Review</label>
            <textarea 
                rows={4}
                placeholder="Write your review..." 
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-sm resize-none"
            />
        </div>

        <button 
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-3.5 rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200 mt-2"
        >
            Submit Review
        </button>  
      </form>

      {/* Thank You Popup */}
      <AnimatePresence>
        {isSubmitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full relative text-center border border-gray-100"
            >
              <button 
                onClick={() => setIsSubmitted(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} />
              </div>

              <h4 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h4>
              <p className="text-gray-500 mb-8">
                Your review has been successfully submitted. We appreciate your feedback!
              </p>

              <button 
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
