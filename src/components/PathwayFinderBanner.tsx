'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function PathwayFinderBanner() {
  return (
    <section className="relative overflow-hidden rounded-[48px] mx-4 md:mx-8 lg:mx-16 my-12 shadow-2xl ring-1 ring-black/5">
      {/* Background image */}
      <div className="relative w-full" style={{ minHeight: '260px' }}>
        <Image
          src="/pathway-banner.webp"
          alt="Super Sheldon kids learning"
          fill
          className="object-cover object-right md:object-center"
          priority={false}
        />

        {/* Mobile-only gradient overlay so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1e40]/80 via-[#0b1e40]/50 to-transparent md:hidden" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-14 py-12 md:py-16 max-w-xl">
          <p className="text-[#60c8f5] text-sm font-semibold uppercase tracking-widest mb-3">
            Personalised Learning Starts Here
          </p>
          <h2 className="text-white text-3xl md:text-4xl font-extrabold leading-tight mb-4">
            Every child learns differently.{' '}
            <span className="text-[#60c8f5]">Discover their perfect path.</span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg mb-8 leading-relaxed">
            Take our 2-minute quiz and we&apos;ll match your child with the ideal
            learning journey — built around their goals, strengths, and style.
          </p>
          <Link
            href="/pathway-finder"
            className="group relative inline-flex items-center gap-2 overflow-hidden bg-[#f97316] hover:bg-[#ea6c10] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_rgba(249,115,22,0.7)] active:scale-95 transition-all duration-300 ease-out text-white font-bold text-base px-8 py-4 rounded-full shadow-lg w-fit"
          >
            {/* Shine sweep on hover */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            <span className="relative">Take the Quiz</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 256 256"
              className="relative transition-transform duration-300 ease-out group-hover:translate-x-1.5"
            >
              <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
