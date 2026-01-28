"use client";

import Header from "@/components/HeroHeaderNav";
import { FooterSignature } from "@/components/try-class/footer-signature";
import Lottie from "lottie-react";
import successAnimation from "@/components/try-class/success.json";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 container mx-auto px-4 md:px-6 pt-28 pb-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-2xl bg-white rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-slate-200 p-6 md:p-10 text-center space-y-4 md:space-y-6"
        >
          <div className="mx-auto w-32 h-32 md:w-40 md:h-40">
            <Lottie animationData={successAnimation} loop={false} autoplay />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Thanks for submitting the form!
            </h1>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto">
              Our support team will get back to you within 5 minutes to book the demo at your preferred time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/utm-market" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-11 md:h-12 font-semibold">
                Back to homepage
              </Button>
            </Link>
            {/* <Link href="/utm-market#booking-form" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto h-11 md:h-12 font-semibold"
              >
                Book another session
              </Button>
            </Link> */}
          </div>
        </motion.div>
      </main>

      <FooterSignature />
    </div>
  );
}


