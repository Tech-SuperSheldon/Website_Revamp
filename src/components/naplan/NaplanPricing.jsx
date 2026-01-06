"use client";

import { motion } from "framer-motion";

export default function NaplanPricing() {
  return (
    <section className="py-16 px-6 sm:px-12 bg-orange-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8"
        >
          {/* Monthly Plan */}
          <div className="bg-white p-8 rounded-2xl shadow text-center">
            <h3 className="text-2xl font-bold mb-2">$79/mo</h3>
            <p className="text-gray-600 mb-4">Monthly plan. Cancel anytime.</p>
            <ul className="text-sm text-gray-600 space-y-1 mb-6">
              <li>✓ 1 live session/week</li>
              <li>✓ Unlimited practice</li>
              <li>✓ Progress reports</li>
            </ul>
            <button
              onClick={() => {}}
              className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
            >
              Start Monthly
            </button>
          </div>

          {/* Full Course */}
          <div className="bg-white p-8 rounded-2xl shadow text-center border-2 border-purple-600">
            <h3 className="text-2xl font-bold mb-2">$399</h3>
            <p className="text-gray-600 mb-4">
              Full course (10 weeks) — best value
            </p>
            <ul className="text-sm text-gray-600 space-y-1 mb-6">
              <li>✓ 10 live sessions</li>
              <li>✓ Mock tests + reviews</li>
              <li>✓ Certificate of completion</li>
            </ul>
            <button
              onClick={() => {}}
              className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
            >
              Enroll Full Course
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
