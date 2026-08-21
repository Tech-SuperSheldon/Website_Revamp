// components/ThankYou.jsx
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MotionConfig, motion } from 'framer-motion';

const WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=917974695618&text&type=phone_number&app_absent=0';

const EASE_OUT = [0.22, 1, 0.36, 1];

// Entrance choreography: the hero reveals itself top-down, ~90ms between beats.
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

// Deterministic confetti: hardcoded (not Math.random) so the server-rendered
// markup matches the client's and React doesn't warn about a hydration mismatch.

// Ambient drizzle — falls the length of the page behind the card.
const CONFETTI = [
  { left: '6%',  color: '#e66e37', w: 8,  h: 14, drift: '40px',  spin: '620deg', dur: '4.2s', delay: '0.9s' },
  { left: '14%', color: '#facc15', w: 10, h: 10, drift: '-30px', spin: '-480deg', dur: '5.1s', delay: '1.3s' },
  { left: '22%', color: '#34d399', w: 7,  h: 16, drift: '55px',  spin: '720deg', dur: '4.6s', delay: '1.8s' },
  { left: '31%', color: '#60a5fa', w: 9,  h: 9,  drift: '-45px', spin: '-560deg', dur: '5.4s', delay: '1.1s' },
  { left: '40%', color: '#e66e37', w: 8,  h: 15, drift: '25px',  spin: '500deg', dur: '4.0s', delay: '2.2s' },
  { left: '48%', color: '#f472b6', w: 10, h: 10, drift: '-55px', spin: '640deg', dur: '5.8s', delay: '1.5s' },
  { left: '57%', color: '#facc15', w: 7,  h: 14, drift: '35px',  spin: '-600deg', dur: '4.4s', delay: '1.9s' },
  { left: '65%', color: '#34d399', w: 9,  h: 9,  drift: '-25px', spin: '520deg', dur: '5.2s', delay: '1.0s' },
  { left: '74%', color: '#60a5fa', w: 8,  h: 16, drift: '50px',  spin: '700deg', dur: '4.8s', delay: '2.4s' },
  { left: '82%', color: '#e66e37', w: 10, h: 10, drift: '-40px', spin: '-540deg', dur: '5.6s', delay: '1.7s' },
  { left: '90%', color: '#f472b6', w: 7,  h: 15, drift: '30px',  spin: '580deg', dur: '4.3s', delay: '1.2s' },
  { left: '96%', color: '#facc15', w: 9,  h: 9,  drift: '-35px', spin: '-660deg', dur: '5.0s', delay: '2.0s' },
];

// Burst — fires outward from the checkmark itself, so the celebration
// originates at the success moment instead of merely raining on it.
// x/y are the end offsets in px; the keyframe adds gravity on the way out.
// Upward reach is deliberately capped around -120: the badge sits ~160px down
// the viewport, and anything further just shoots off the top edge unseen.
const BURST = [
  { color: '#e66e37', w: 8,  h: 12, x: -118, y: -52,  rot: '420deg',  dur: '1.15s' },
  { color: '#facc15', w: 7,  h: 7,  x: -92,  y: -88,  rot: '-300deg', dur: '1.30s' },
  { color: '#34d399', w: 9,  h: 13, x: -48,  y: -104, rot: '520deg',  dur: '1.05s' },
  { color: '#60a5fa', w: 7,  h: 7,  x: 4,    y: -112, rot: '-460deg', dur: '1.35s' },
  { color: '#f472b6', w: 8,  h: 12, x: 56,   y: -100, rot: '380deg',  dur: '1.10s' },
  { color: '#facc15', w: 9,  h: 9,  x: 98,   y: -76,  rot: '-540deg', dur: '1.28s' },
  { color: '#e66e37', w: 7,  h: 13, x: 124,  y: -40,  rot: '460deg',  dur: '1.18s' },
  { color: '#34d399', w: 8,  h: 8,  x: 132,  y: 8,    rot: '-360deg', dur: '1.32s' },
  { color: '#60a5fa', w: 9,  h: 12, x: 110,  y: 52,   rot: '500deg',  dur: '1.08s' },
  { color: '#f472b6', w: 7,  h: 7,  x: 62,   y: 86,   rot: '-420deg', dur: '1.22s' },
  { color: '#e66e37', w: 8,  h: 11, x: -54,  y: 84,   rot: '340deg',  dur: '1.26s' },
  { color: '#facc15', w: 9,  h: 9,  x: -104, y: 48,   rot: '-580deg', dur: '1.12s' },
  { color: '#34d399', w: 7,  h: 12, x: -130, y: -8,   rot: '440deg',  dur: '1.34s' },
  { color: '#60a5fa', w: 8,  h: 8,  x: -20,  y: -118, rot: '-500deg', dur: '1.20s' },
];

const STEPS = [
  {
    title: 'Check your inbox',
    body: 'A confirmation email is on its way with everything you need. Peek in spam if it hides.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M3 8l7.9 5.3a2 2 0 002.2 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
  },
  {
    title: 'We call you within 24 hours',
    body: 'Our academic counsellor confirms your slot and matches you with the right tutor.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M3 5a2 2 0 012-2h2.2a1 1 0 01.97.76l.9 3.6a1 1 0 01-.28.97L7.4 9.72a12.5 12.5 0 006.88 6.88l1.39-1.39a1 1 0 01.97-.28l3.6.9a1 1 0 01.76.97V19a2 2 0 01-2 2h-1C10.8 21 3 13.2 3 6V5z"
      />
    ),
  },
  {
    title: 'Join your free demo',
    body: 'A live 1-on-1 session with your tutor. No payment, no commitment — just a great class.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M15 10l4.55-2.28A1 1 0 0121 8.6v6.8a1 1 0 01-1.45.89L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    ),
  },
];

/**
 * Post-submission screen for the demo form.
 *
 * The booking details are handed over in sessionStorage (see BookDemo.jsx)
 * rather than in the URL, so no name or email ends up in analytics, browser
 * history or a shared link. Everything here degrades gracefully to generic
 * copy when that payload is missing — e.g. someone opening /thank-you directly.
 */
export default function ThankYou() {
  const [booking, setBooking] = useState(null);
  // Flips on after hydration; releases the paused badge/burst CSS animations
  // so they play in step with the framer-motion entrance rather than before it.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    try {
      const raw = sessionStorage.getItem('demo_booking');
      if (raw) setBooking(JSON.parse(raw));
    } catch {
      /* no details to personalise with — the generic copy stands on its own */
    }
  }, []);

  const firstName = (booking?.fullName || '').trim().split(' ')[0];

  return (
    // reducedMotion="user" makes every framer-motion transform here obey the
    // OS "reduce motion" setting; the CSS animations opt out separately.
    <MotionConfig reducedMotion="user">
      <div className="ty-aurora relative min-h-screen overflow-hidden px-4 py-12 sm:py-16">
        {/* Floating orbs — slow ambient depth behind the card */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <span className="ty-orb ty-orb-a absolute -left-24 top-16 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl" />
          <span className="ty-orb ty-orb-b absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-amber-300/30 blur-3xl" />
          <span className="ty-orb ty-orb-c absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-sky-300/25 blur-3xl" />
        </div>

        {/* Ambient confetti drizzle */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {CONFETTI.map((c, i) => (
            <span
              key={i}
              className="ty-confetti absolute top-0 block rounded-[2px]"
              style={{
                left: c.left,
                width: c.w,
                height: c.h,
                backgroundColor: c.color,
                '--ty-drift': c.drift,
                '--ty-spin': c.spin,
                '--ty-dur': c.dur,
                '--ty-delay': c.delay,
              }}
            />
          ))}
        </div>

        <div className="relative mx-auto w-full max-w-3xl">
          {/* ─────────────────────────── Hero card ───────────────────────────
              No overflow-hidden: the confetti burst has to escape the card. */}
          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="rounded-[28px] bg-white/90 shadow-[0_20px_60px_-15px_rgba(230,110,55,0.35)] ring-1 ring-black/5 backdrop-blur"
          >
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="relative px-6 pb-10 pt-12 text-center sm:px-12"
            >
              {/* Success badge */}
              <motion.div
                variants={rise}
                className={`relative mx-auto mb-7 h-24 w-24 ${ready ? 'ty-go' : ''}`}
              >
                {/* Burst layer, anchored to the centre of the checkmark */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0" aria-hidden="true">
                  {BURST.map((b, i) => (
                    <span
                      key={i}
                      className="ty-burst absolute block rounded-[2px]"
                      style={{
                        width: b.w,
                        height: b.h,
                        marginLeft: -b.w / 2,
                        marginTop: -b.h / 2,
                        backgroundColor: b.color,
                        '--ty-bx': `${b.x}px`,
                        '--ty-by': `${b.y}px`,
                        '--ty-brot': b.rot,
                        '--ty-bdur': b.dur,
                      }}
                    />
                  ))}
                </div>

                <span className="ty-ring absolute inset-0 rounded-full bg-emerald-400/30" />
                <span className="ty-pop absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30">
                  <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="white" aria-hidden="true">
                    <path className="ty-check" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" d="M5.5 12.5l4 4 9-9" />
                  </svg>
                </span>
              </motion.div>

              <motion.div variants={rise}>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Booking confirmed
                </span>
              </motion.div>

              <motion.h1
                variants={rise}
                className="mt-5 text-3xl font-extrabold leading-tight text-gray-900 sm:text-[2.6rem]"
              >
                Thank you{firstName ? `, ${firstName}` : ''}! <span className="inline-block">🎉</span>
              </motion.h1>

              <motion.p
                variants={rise}
                className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-gray-600 sm:text-lg"
              >
                Your <span className="font-semibold text-[#e66e37]">free demo session</span> is
                reserved. Our team is already lining up the right tutor for you.
              </motion.p>

              {/* Booking summary — only when we actually have the details */}
              {(booking?.subject || booking?.grade || booking?.email) && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.1 }}
                  className="mt-7 flex flex-wrap items-center justify-center gap-2.5"
                >
                  {booking?.subject && <Chip label="Subject" value={booking.subject} />}
                  {booking?.grade && <Chip label="Grade" value={booking.grade} />}
                  {booking?.email && <Chip label="Email" value={booking.email} />}
                </motion.div>
              )}
            </motion.div>

            {/* ───────────────────── What happens next ─────────────────────
                Reveals on scroll — on mobile these sit below the fold. */}
            <div className="border-t border-orange-100 bg-gradient-to-b from-orange-50/60 to-white px-6 py-10 sm:px-12">
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                className="text-center text-sm font-bold uppercase tracking-[0.18em] text-[#e66e37]"
              >
                What happens next
              </motion.h2>

              <motion.ol
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.22, delayChildren: 0.15 } } }}
                className="mt-8 grid gap-6 sm:grid-cols-3"
              >
                {STEPS.map((step, i) => (
                  <motion.li key={step.title} variants={rise} className="relative text-center sm:text-left">
                    {/* Connector wipes left→right, reaching the next step just
                        as that step's number pops in. */}
                    {i < STEPS.length - 1 && (
                      <motion.span
                        variants={{
                          hidden: { scaleX: 0 },
                          show: { scaleX: 1, transition: { duration: 0.45, ease: 'easeInOut', delay: 0.18 } },
                        }}
                        className="absolute left-[calc(50%+28px)] top-6 hidden h-px w-[calc(100%-40px)] origin-left bg-gradient-to-r from-orange-300 to-transparent sm:left-[52px] sm:block"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#e66e37] shadow-sm ring-1 ring-orange-100 sm:mx-0">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                        {step.icon}
                      </svg>
                      <motion.span
                        variants={{
                          hidden: { scale: 0, opacity: 0 },
                          show: {
                            scale: 1,
                            opacity: 1,
                            transition: { type: 'spring', stiffness: 500, damping: 14, delay: 0.12 },
                          },
                        }}
                        className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#e66e37] text-[11px] font-bold text-white"
                      >
                        {i + 1}
                      </motion.span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{step.body}</p>
                  </motion.li>
                ))}
              </motion.ol>
            </div>

            {/* ─────────────────────────── Actions ─────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="rounded-b-[28px] border-t border-gray-100 px-6 py-8 sm:px-12"
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/courses"
                  className="flex-1 rounded-xl bg-gradient-to-r from-[#e66e37] to-amber-500 px-5 py-3.5 text-center font-semibold text-white shadow-lg shadow-orange-500/25 transition-transform duration-200 hover:scale-[1.02]"
                >
                  Explore our courses
                </Link>
                <Link
                  href="/"
                  className="flex-1 rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-center font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Back to home
                </Link>
              </div>

              <p className="mt-6 text-center text-sm text-gray-500">
                Need to change something or have a question?{' '}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#e66e37] underline-offset-2 hover:underline"
                >
                  Chat with us on WhatsApp
                </a>
              </p>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-6 text-center text-xs text-gray-400"
          >
            Trusted by thousands of students across Australia, the UK and India.
          </motion.p>
        </div>
      </div>
    </MotionConfig>
  );
}

function Chip({ label, value }) {
  return (
    <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-orange-100 bg-white px-4 py-2 text-sm shadow-sm">
      <span className="text-gray-400">{label}</span>
      <span className="truncate font-semibold text-gray-800">{value}</span>
    </span>
  );
}
