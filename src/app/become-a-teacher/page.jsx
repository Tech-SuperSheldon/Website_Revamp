"use client";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Fuse from "fuse.js";
import {
  motion,
  AnimatePresence,
  useInView,
  animate,
} from "framer-motion";
import {
  Play,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Users,
  Star,
  Clock,
  Monitor,
  Calendar,
  BarChart2,
  Headphones,
  TrendingUp,
  ClipboardList,
  Search,
  GraduationCap,
  Zap,
  HelpCircle,
  MapPin,
  ArrowRight,
  X,
  Filter,
  Check,
  AlertTriangle,
  CalendarCheck,
  Globe,
  Shield,
} from "lucide-react";
import Image from "next/image";
import Script from "next/script";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import HeaderNav from "@/components/HeroHeaderNav";
import Footer from "@/components/Footer";

const NSTeacherCarousel = dynamic(
  () => import("@/components/new-site/NSTeacherCarousel"),
  { loading: () => <div className="py-16 bg-[#FFF9F3]" aria-hidden="true" /> }
);
const ActivityTicker = dynamic(
  () => import("@/components/new-site/ActivityTicker"),
  { ssr: false }
);

// ─── Constants ────────────────────────────────────────────────────────────────
const GOOGLE_FORM_URL = "https://forms.gle/csc94GLG3tEDit6N6";
const CALENDLY_URL = "https://calendly.com/supersheldon/educator-intro";

const STATS = [
  { value: 100, suffix: "+", label: "Active Educators", icon: Users },
  { value: 5000, suffix: "+", label: "Students Helped", icon: GraduationCap },
  { value: 4.9, suffix: "★", label: "Teacher Satisfaction", icon: Star, decimal: true },
  { value: 95, suffix: "%", label: "Lesson Completion", icon: Clock },
];

const WHY_SLIDES = [
  {
    title: "Inspire the Next Generation",
    body: "Share your expertise and nurture essential skills in children, helping them grow into confident and capable individuals. Make a real difference from home.",
    video: "/become-teacher/video/Firefly Create a 6-second seamless looping animation from this educational hero image. Replace the t.mp4",
  },
  {
    title: "Earn on Your Schedule",
    body: "Flexible hours designed entirely around your life. Whether you teach 1 hour or 50, Super Sheldon's platform works seamlessly with your availability.",
    video: "/become-teacher/video/earn-your-schedule.mp4",
  },
  {
    title: "Access World-Class Tools",
    body: "Interactive whiteboards, automated scheduling, progress analytics and a dedicated support team — everything you need to deliver outstanding lessons.",
    video: "/become-teacher/video/access-world-class-tools.mp4",
  },
];

const STEPS = [
  {
    num: "01",
    icon: ClipboardList,
    title: "Apply Online",
    body: "Under 5 minutes — tell us about your expertise and availability.",
  },
  {
    num: "02",
    icon: Search,
    title: "Profile Review",
    body: "Our team assesses your skills and matches you to the right subjects.",
  },
  {
    num: "03",
    icon: GraduationCap,
    title: "Training & Onboarding",
    body: "Learn our tools, curriculum delivery, and student engagement techniques.",
  },
  {
    num: "04",
    icon: Zap,
    title: "Teach & Earn",
    body: "Go live with students and start making an impact — and an income.",
  },
];

const TESTIMONIALS = [
  {
    rating: 5,
    quote: "Super Sheldon gives me complete flexibility. I teach around my family schedule and still earn more than at my previous tutoring agency. The support team is outstanding.",
    name: "Avishika Dutta",
    role: "Chemistry Teacher",
    tenure: "2 years with Super Sheldon",
  },
  {
    rating: 5,
    quote: "The platform tools are incredible — the whiteboard, automated reminders, progress reports. Everything just works. I can focus entirely on teaching.",
    name: "Aisha Ansari",
    role: "English Teacher",
    tenure: "< 1 year with Super Sheldon",
  },
  {
    rating: 5,
    quote: "A well-structured classroom and a supportive culture. The onboarding was thorough and the team always responds quickly when I need help.",
    name: "Gayatri Sahu",
    role: "Science Tutor",
    tenure: "Current educator",
  },
  {
    rating: 5,
    quote: "I was nervous about online teaching but Super Sheldon made the transition seamless. My student retention rate is 95% and growing every month.",
    name: "Sudarshana Thakur",
    role: "Selective School Coach",
    tenure: "18 months with Super Sheldon",
  },
  {
    rating: 5,
    quote: "The curriculum resources are already prepared — I just focus on delivery and student engagement. Performance bonuses are a great motivator too.",
    name: "Alekhya Pandey",
    role: "English Coach",
    tenure: "< 1 year with Super Sheldon",
  },
  {
    rating: 5,
    quote: "Best decision I made in my teaching career. Flexible, well-paid, and the students are genuinely motivated. Couldn't ask for more.",
    name: "Preksha Sharma",
    role: "NAPLAN Specialist",
    tenure: "3 years with Super Sheldon",
  },
  {
    rating: 5,
    quote: "Super Sheldon's tech is miles ahead. The progress dashboard helps me spot gaps early and personalise each student's learning path effectively.",
    name: "Priyanshi Agrawal",
    role: "AI/ML Python Teacher",
    tenure: "Current educator",
  },
  {
    rating: 5,
    quote: "The community of educators is fantastic. Monthly CPD sessions, bonus structures, and real career growth. This is teaching done right.",
    name: "Ashita Gunjikar",
    role: "Mathematics Teacher",
    tenure: "1.5 years with Super Sheldon",
  },
];

const HIRING_API = "https://api.hiring.supersheldon.com/api/hiring-roles";

const FAQ_ITEMS = [
  {
    q: "What qualifications do I need to teach at Super Sheldon?",
    a: "We welcome qualified teachers, tutors with proven subject expertise, and university graduates with strong academic records. You don't need a formal teaching degree — relevant knowledge, a passion for education, and a professional demeanour are what matter most.",
  },
  {
    q: "How many hours per week do I need to commit?",
    a: "We are completely flexible. Some educators teach 5 hours per week alongside other commitments; others teach full-time. You set your own availability and students book around you. There is no minimum hour requirement.",
  },
  {
    q: "Which subjects and exams do you cover?",
    a: "We cover NAPLAN, ICAS, Selective School Entry, Scholarship, HSC, and general K-12 curriculum support across Maths, English, Science, Writing, and more. If you have expertise in a subject we don't yet offer, let us know.",
  },
  {
    q: "How and when do I get paid?",
    a: "Educators are paid fortnightly via direct bank transfer. Your rate is agreed upfront, with performance bonuses on top for highly rated sessions and strong student outcomes.",
  },
  {
    q: "Is training and onboarding provided?",
    a: "Absolutely. Every educator completes our structured onboarding covering platform tools, curriculum delivery, and effective student engagement. Ongoing CPD sessions and a dedicated support team are available throughout your time with us.",
  },
  {
    q: "Can I teach from outside Australia?",
    a: "Yes — we have educators across multiple time zones. As long as you can cover sessions during Australian student hours and have a stable internet connection, you are welcome to apply from anywhere.",
  },
];

// ─── Animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── Geometric shape primitives (solid, multi-color) ─────────────────────────
function GeoCircle({ size = 36, color = "#e66e37", opacity = 0.15, className = "", style = {} }) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={`pointer-events-none select-none ${className}`} style={{ opacity, ...style }}>
      <circle cx={size / 2} cy={size / 2} r={size / 2 - 0.5} fill={color} />
    </svg>
  );
}

function GeoTriangle({ size = 44, color = "#e66e37", opacity = 0.15, className = "", style = {} }) {
  const h = Math.round(size * Math.sqrt(3) / 2);
  return (
    <svg width={size} height={h} viewBox={`0 0 ${size} ${h}`} className={`pointer-events-none select-none ${className}`} style={{ opacity, ...style }}>
      <polygon points={`${size / 2},1 ${size - 1},${h - 1} 1,${h - 1}`} fill={color} />
    </svg>
  );
}

function GeoHexagon({ size = 44, color = "#e66e37", opacity = 0.14, className = "", style = {} }) {
  const cx = size / 2, cy = size / 2, r = size / 2 - 0.5;
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={`pointer-events-none select-none ${className}`} style={{ opacity, ...style }}>
      <polygon points={pts} fill={color} />
    </svg>
  );
}

function GeoDiamond({ size = 40, color = "#e66e37", opacity = 0.15, className = "", style = {} }) {
  const h = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={`pointer-events-none select-none ${className}`} style={{ opacity, ...style }}>
      <polygon points={`${h},1 ${size - 1},${h} ${h},${size - 1} 1,${h}`} fill={color} />
    </svg>
  );
}

function GeoStar({ size = 36, color = "#e66e37", opacity = 0.15, points = 5, className = "", style = {} }) {
  const cx = size / 2, cy = size / 2, outerR = size / 2 - 1, innerR = outerR * 0.42;
  const angle = Math.PI / points;
  const pts = Array.from({ length: points * 2 }, (_, i) => {
    const r = i % 2 === 0 ? outerR : innerR;
    const a = i * angle - Math.PI / 2;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={`pointer-events-none select-none ${className}`} style={{ opacity, ...style }}>
      <polygon points={pts} fill={color} />
    </svg>
  );
}

function GeoSquare({ size = 36, color = "#e66e37", opacity = 0.14, rotate = 0, className = "", style = {} }) {
  const p = size * 0.1;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={`pointer-events-none select-none ${className}`} style={{ opacity, transform: `rotate(${rotate}deg)`, ...style }}>
      <rect x={p} y={p} width={size - p * 2} height={size - p * 2} fill={color} />
    </svg>
  );
}

function GeoPlus({ size = 32, color = "#e66e37", opacity = 0.18, strokeWidth = 3, className = "", style = {} }) {
  const c = size / 2, arm = size * 0.38;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" className={`pointer-events-none select-none ${className}`} style={{ opacity, ...style }}>
      <line x1={c} y1={c - arm} x2={c} y2={c + arm} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1={c - arm} y1={c} x2={c + arm} y2={c} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

function GeoZigzag({ width = 80, height = 16, segments = 5, color = "#e66e37", opacity = 0.22, strokeWidth = 2.5, className = "", style = {} }) {
  const segW = width / segments;
  const pts = Array.from({ length: segments + 1 }, (_, i) => `${i * segW},${i % 2 === 0 ? strokeWidth : height}`).join(" ");
  return (
    <svg width={width} height={height + strokeWidth * 2} viewBox={`0 0 ${width} ${height + strokeWidth * 2}`} fill="none" className={`pointer-events-none select-none ${className}`} style={{ opacity, ...style }}>
      <polyline points={pts} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GeoWave({ width = 120, amplitude = 10, waves = 3, color = "#e66e37", opacity = 0.2, strokeWidth = 2.5, className = "", style = {} }) {
  const h = amplitude * 2 + strokeWidth * 2;
  const cy = h / 2;
  const wW = width / waves;
  let d = `M 0 ${cy}`;
  for (let i = 0; i < waves; i++) {
    const x = i * wW;
    d += ` C ${x + wW * 0.25},${cy - amplitude} ${x + wW * 0.75},${cy + amplitude} ${x + wW},${cy}`;
  }
  return (
    <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} fill="none" className={`pointer-events-none select-none ${className}`} style={{ opacity, ...style }}>
      <path d={d} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

function GeoDotsGrid({ cols = 5, rows = 5, gap = 16, dotR = 2, color = "#e66e37", opacity = 0.18, className = "", style = {} }) {
  const w = (cols - 1) * gap + dotR * 2;
  const h = (rows - 1) * gap + dotR * 2;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" className={`pointer-events-none select-none ${className}`} style={{ opacity, ...style }}>
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => (
          <circle key={`${r}-${c}`} cx={c * gap + dotR} cy={r * gap + dotR} r={dotR} fill={color} />
        ))
      )}
    </svg>
  );
}

function GeoArc({ size = 120, color = "#e66e37", opacity = 0.2, strokeWidth = 3, startAngle = 0, endAngle = 240, className = "", style = {} }) {
  const cx = size / 2, cy = size / 2, r = size / 2 - strokeWidth;
  const toRad = (d) => (d * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startAngle));
  const y1 = cy + r * Math.sin(toRad(startAngle));
  const x2 = cx + r * Math.cos(toRad(endAngle));
  const y2 = cy + r * Math.sin(toRad(endAngle));
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" className={`pointer-events-none select-none ${className}`} style={{ opacity, ...style }}>
      <path d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

// ─── Helper components ────────────────────────────────────────────────────────

function CountUp({ from = 0, to, duration = 1.5, suffix = "", decimal = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate(v) {
        setVal(decimal ? parseFloat(v.toFixed(1)) : Math.round(v));
      },
    });
    return controls.stop;
  }, [inView, from, to, duration, decimal]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

function CircleWipeButton({
  as: Tag = "button",
  variant = "solid",
  children,
  className = "",
  ...props
}) {
  const [hovered, setHovered] = useState(false);

  const circleColor = variant === "icon" ? "#e66e37" : "white";
  const normalTextColor =
    variant === "solid" ? "white"
    : variant === "icon" ? "#e66e37"
    : variant === "outline-white" ? "white"
    : "#e66e37";
  const hoverTextColor = variant === "icon" ? "white" : "#e66e37";

  const borderStyle = {
    solid: "bg-[#e66e37] border-2 border-[#3A1F10] shadow-[1px_1px_0_0_rgba(0,0,0,0.8)]",
    "outline-orange": "bg-transparent border-2 border-orange-300",
    "outline-white": "bg-transparent border-2 border-white/25",
    icon: "bg-white border border-orange-100",
  }[variant];

  return (
    <Tag
      className={`relative overflow-hidden inline-flex items-center justify-center font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-[#D16F3B] text-sm sm:text-base cursor-pointer ${borderStyle} ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      <span
        className="absolute rounded-full pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          width: "200%",
          paddingBottom: "200%",
          background: circleColor,
          transform: `translate(-50%, -50%) scale(${hovered ? 1 : 0})`,
          transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 0,
        }}
      />
      <span
        className="relative z-10 inline-flex items-center gap-2 transition-colors duration-300"
        style={{ color: hovered ? hoverTextColor : normalTextColor }}
      >
        {children}
      </span>
    </Tag>
  );
}

function Stars({ count = 5, size = 14 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={size} className="fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

// ─── Sticky Apply CTA ────────────────────────────────────────────────────────

function StickyApplyCTA({ onApply }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const prevVisible = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 700;
      if (next !== prevVisible.current) {
        prevVisible.current = next;
        setVisible(next);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="hidden sm:flex fixed bottom-5 right-5 z-50 items-center gap-2 bg-white border border-orange-200 shadow-2xl rounded-full px-3 py-1.5"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <span className="text-xs font-semibold text-[#1D2026] whitespace-nowrap pl-1">
            Ready to teach?
          </span>
          <CircleWipeButton
            as="button"
            onClick={onApply}
            className="px-4 py-1.5 text-xs"
          >
            Apply to Teach
          </CircleWipeButton>
          <AnimatePresence>
            {hovered && (
              <motion.button
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.15 }}
                onClick={() => setDismissed(true)}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-700 text-white flex items-center justify-center hover:bg-gray-900 transition-colors"
                aria-label="Dismiss"
              >
                <X size={11} />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Section 1: Hero ──────────────────────────────────────────────────────────

function HeroSection({ onApply }) {
  return (
    <section className="relative sm:min-h-screen flex items-center bg-[#FFF9F3] overflow-hidden sm:-mb-[150px]">
      {/* Background Bottom Swooshes (Purple & Orange) - Desktop Only */}
      <div className="hidden sm:block absolute bottom-[150px] left-0 right-0 w-full z-0 overflow-hidden" style={{ height: '300px' }}>
        <svg viewBox="0 0 1440 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full h-auto min-w-[1440px]">
          <path d="M0,0 C280,300 720,0 1440,225 L1440,300 L0,300 Z" fill="#8B79B9" opacity="0.8"/>
          <path d="M0,300 C400,150 1000,300 1440,5 L1440,300 L0,300 Z" fill="#F8B179" opacity="0.8"/>
        </svg>
      </div>

      {/* Background Bottom Swooshes - Mobile Only (same paths, orange border at bottom) */}
      <div className="sm:hidden absolute left-0 right-0 w-full z-0 overflow-hidden" style={{ top: '440px', height: '120px' }}>
        <svg
          viewBox="0 0 1440 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full"
          style={{ height: '100%' }}
        >
          <path d="M0,0 C280,300 720,0 1440,225 L1440,300 L0,300 Z" fill="#8B79B9" opacity="0.8"/>
          <path d="M0,300 C400,150 1000,300 1440,5 L1440,300 L0,300 Z" fill="#F8B179" opacity="0.8"/>
        </svg>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500" />
      </div>

      {/* Educator image — right half, desktop only */}
      <div className="absolute inset-y-0 right-0 w-[52%] z-10 hidden lg:flex flex-col justify-center" style={{ transform: 'translateY(-150px)' }}>
        <div className="relative">
          <Image
            src="/hero-educators-3d.jpg"
            alt="Expert educators"
            width={900}
            height={780}
            className="w-full object-contain"
            priority
          />
          {/* Left-edge fade */}
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#FFF9F3] to-transparent pointer-events-none" />
          {/* Floating icons around educator image */}
          <motion.div animate={{ y: [0, -14, 0], rotate: [-4, 4, -4] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[8%] left-[12%] bg-white rounded-2xl shadow-xl p-3 z-30">
            <Icon icon="fluent-emoji:graduation-cap" width={48} height={48} />
          </motion.div>
          <motion.div animate={{ y: [0, -18, 0], rotate: [3, -3, 3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} className="absolute top-[6%] right-[8%] bg-white rounded-2xl shadow-xl p-3 z-30">
            <Icon icon="fluent-emoji:trophy" width={48} height={48} />
          </motion.div>
          <motion.div animate={{ y: [0, -12, 0], rotate: [2, -2, 2] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[42%] left-[5%] bg-white rounded-2xl shadow-xl p-3 z-30">
            <Icon icon="fluent-emoji:open-book" width={44} height={44} />
          </motion.div>
          <motion.div animate={{ y: [0, -16, 0], rotate: [-5, 5, -5] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} className="absolute top-[38%] right-[4%] bg-white rounded-2xl shadow-xl p-3 z-30">
            <Icon icon="fluent-emoji:glowing-star" width={44} height={44} />
          </motion.div>
          <motion.div animate={{ y: [0, -13, 0], rotate: [4, -4, 4] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.4 }} className="absolute bottom-[22%] right-[10%] bg-white rounded-2xl shadow-xl p-3 z-30">
            <Icon icon="fluent-emoji:pencil" width={40} height={40} />
          </motion.div>
        </div>
        {/* Stats card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 20 }} className="absolute bottom-[200px] left-28 flex items-center gap-6 bg-white/90 backdrop-blur-md rounded-[24px] shadow-2xl p-5 px-8 z-20 border border-white/60 whitespace-nowrap">
          <div className="flex items-center gap-3">
            <div className="text-[#E66E37]"><Users size={28} fill="currentColor" /></div>
            <div>
              <div className="text-lg font-black text-[#E66E37]">100+</div>
              <div className="text-xs font-bold text-gray-800">Expert Educators</div>
            </div>
          </div>
          <div className="w-px h-10 bg-gray-200" />
          <div className="flex items-center gap-3">
            <div className="text-blue-600"><Globe size={28} /></div>
            <div>
              <div className="text-lg font-black text-blue-600">3+</div>
              <div className="text-xs font-bold text-gray-800">AU · UK · US</div>
            </div>
          </div>
          <div className="w-px h-10 bg-gray-200" />
          <div className="flex items-center gap-3">
            <div className="text-emerald-500"><Star size={28} fill="currentColor" /></div>
            <div>
              <div className="text-lg font-black text-emerald-500">5K+</div>
              <div className="text-xs font-bold text-gray-800">Students Helped</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Left content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-16 pb-4 sm:pb-44 lg:pt-32 lg:pb-48">
        
        {/* ── DESKTOP LAYOUT (sm+) — unchanged ── */}
        <div className="hidden sm:block max-w-xl lg:max-w-[48%] text-center sm:text-left">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-[#FFF0E5] px-4 py-2 rounded-full mb-6">
            <Users size={16} className="text-[#E66E37]" fill="currentColor" />
            <span className="text-[#E66E37] text-sm font-bold tracking-wide uppercase">
              Now Hiring Expert Educators
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl sm:text-6xl md:text-[76px] font-extrabold text-[#111827] leading-[1.1] mb-6 tracking-tight">
            Shape the <br />
            <span className="relative inline-block bg-[#E66E37] text-white px-5 py-1 mt-3 rounded-[18px]">
              Future
              <svg className="absolute -right-14 top-1/2 -translate-y-1/2 scale-x-[-1] w-10 h-10 text-[#E66E37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="2" y1="12" x2="16" y2="12" />
                <line x1="6" y1="4" x2="14" y2="8" />
                <line x1="6" y1="20" x2="14" y2="16" />
              </svg>
            </span>
            <br />
            <span className="mt-2 block">of Learning</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-600 text-lg sm:text-xl max-w-lg mb-10 leading-relaxed font-medium mx-auto sm:mx-0">
            <span className="hidden sm:inline">Join 100+ expert educators reaching 5K+ students across Australia.<br />
            Flexible hours, competitive pay, world-class tools.</span>
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-10">
            <CircleWipeButton as="button" onClick={onApply} className="w-full sm:w-auto px-8 py-3.5 text-lg justify-center">
              Apply to Teach
            </CircleWipeButton>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-3 justify-center sm:justify-start">
            <TrustBadge iconColor="text-emerald-500" text="No fees ever" />
            <TrustBadge iconColor="text-blue-500" text="DBS Verified (UK)" />
            <TrustBadge iconColor="text-purple-500" text="WWC Cleared (AU)" />
            <TrustBadge iconColor="text-amber-500" text="Background Checked" />
          </motion.div>
        </div>

        {/* ── MOBILE LAYOUT (< sm) — exactly matching mockup ── */}
        <div className="sm:hidden relative pt-6 overflow-visible w-full" style={{ minHeight: '560px' }}>

          {/* ─ Illustration ─ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="absolute right-[-20px] top-[-0px] w-[80%] max-w-[340px] z-0"
            style={{ height: '700px' }}
          >
            <Image
              src="/hero-educators-mobile.png"
              alt="Educators"
              fill
              className="object-contain object-right-top"
              priority
            />
          </motion.div>

          {/* ─ Content ─ */}
          <div className="relative z-10 flex flex-col">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-[#FFF4ED] border border-orange-100 rounded-full p-1.5 pr-5 mb-0 w-max shadow-sm"
            >
              <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Users size={18} className="text-[#F97316]" fill="currentColor" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[#F97316] text-[10px] font-bold leading-none uppercase tracking-wide mb-1">Now Hiring</span>
                <span className="text-[#0A192F] text-[13px] font-black leading-none uppercase tracking-wide">Expert Educators</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="font-extrabold text-[#0A192F] leading-[1.05] tracking-tight mb-5 text-[42px]"
            >
              Shape the
              <br />
              <span className="relative inline-block bg-[#F97316] text-white px-3 py-1 mt-1 mb-1 rounded-[10px]">
                Future
                {/* Orange Sparks around Future */}
                <svg className="absolute -right-6 top-0 w-5 h-5 text-[#F97316]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                   <line x1="4" y1="12" x2="0" y2="8" />
                   <line x1="8" y1="4" x2="6" y2="0" />
                   <line x1="12" y1="12" x2="16" y2="8" />
                </svg>
              </span>
              <br />
              of Learning
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="text-[#334155] text-[18px] font-medium mb-8 leading-snug max-w-[200px]"
            >
              Flexible hours, great pay,<br />world-class tools.
            </motion.p>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              onClick={onApply}
              className="inline-flex items-center gap-2 bg-[#F97316] text-white font-bold text-[14px] px-4 py-2.5 rounded-full mb-6 shadow-[0_8px_20px_rgba(249,115,22,0.4)] w-max"
            >
              Apply to Teach
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#F97316]">
                <ArrowRight size={13} strokeWidth={3} />
              </span>
            </motion.button>
            
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper component for the tiny badges under the buttons
function TrustBadge({ iconColor, text }) {
  return (
    <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-gray-200 shadow-sm px-3 py-1.5 rounded-xl">
      <Shield size={16} className={iconColor} />
      <span className="text-xs font-semibold text-gray-600">{text}</span>
    </div>
  );
}

// ─── Section 2: Stats Bar ─────────────────────────────────────────────────────

function AnimatedStatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-8 bg-[#FFF9F3] sm:border-t-4 sm:border-orange-500 faint-grid relative overflow-hidden">
      <motion.div
        initial={{ x: "-110%" }}
        animate={inView ? { x: "130%" } : { x: "-110%" }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: "linear-gradient(105deg, transparent 30%, rgba(230,110,55,0.18) 50%, transparent 70%)" }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-0">
          {STATS.map((s, i) => (
            <div key={i} className="relative flex flex-col items-center text-center">
              {i > 0 && (
                <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-orange-200" />
              )}
              <div className="w-11 h-11 rounded-full bg-orange-100 flex items-center justify-center mb-2">
                <s.icon size={20} className="text-orange-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#1D2026]">
                {inView ? (
                  <CountUp from={0} to={s.value} suffix={s.suffix} decimal={!!s.decimal} />
                ) : (
                  <span>0{s.suffix}</span>
                )}
              </div>
              <div className="text-[#4E5566] text-sm mt-0.5 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 3: Why Teach ─────────────────────────────────────────────────────

function WhyTeachSection({ onApply }) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const inViewForAutoplay = useInView(ref, { once: false, margin: "-100px" });

  useEffect(() => {
    if (!inViewForAutoplay) return;
    const t = setInterval(() => {
      setDir(1);
      setActive((a) => (a + 1) % WHY_SLIDES.length);
    }, 4500);
    return () => clearInterval(t);
  }, [inViewForAutoplay]);

  const goTo = (idx) => {
    setDir(idx > active ? 1 : -1);
    setActive(idx);
  };

  const touchStartX = useRef(null);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      goTo(diff > 0
        ? (active + 1) % WHY_SLIDES.length
        : (active - 1 + WHY_SLIDES.length) % WHY_SLIDES.length
      );
    }
    touchStartX.current = null;
  };

  const slide = WHY_SLIDES[active];

  return (
    <section ref={ref} className="pt-20 pb-10 sm:pt-32 sm:pb-20 bg-white faint-grid relative overflow-hidden">
      {/* Geometric shapes — why teach */}
      <div className="absolute top-8 right-10 z-0 pointer-events-none select-none" style={{ animation: "geo-spin 26s linear infinite" }}>
        <GeoHexagon size={52} color="#8B5CF6" opacity={0.16} />
      </div>
      <div className="absolute top-14 left-6 z-0 pointer-events-none select-none" style={{ "--geo-float-y": "-12px", animation: "geo-float 5s ease-in-out infinite" }}>
        <GeoTriangle size={42} color="#e66e37" opacity={0.17} />
      </div>
      <div className="absolute bottom-10 right-7 z-0 pointer-events-none select-none" style={{ animation: "geo-spin-r 22s linear infinite" }}>
        <GeoDiamond size={44} color="#14B8A6" opacity={0.16} />
      </div>
      <div className="absolute top-[35%] right-[40%] z-0 hidden md:block pointer-events-none select-none" style={{ animation: "geo-spin 10s linear infinite" }}>
        <GeoStar size={26} color="#F59E0B" opacity={0.18} />
      </div>
      <div className="absolute bottom-[30%] left-[38%] z-0 hidden lg:block pointer-events-none select-none" style={{ animation: "geo-spin-r 18s linear infinite" }}>
        <GeoCircle size={28} color="#EC4899" opacity={0.17} />
      </div>
      <div className="absolute bottom-8 left-8 z-0">
        <GeoDotsGrid cols={5} rows={5} gap={15} dotR={2} color="#8B5CF6" opacity={0.17} />
      </div>
      <div className="absolute top-10 left-[35%] z-0 hidden md:block">
        <GeoDotsGrid cols={4} rows={3} gap={14} dotR={1.5} color="#14B8A6" opacity={0.17} />
      </div>
      <div className="absolute top-1/2 left-2 z-0">
        <GeoPlus size={26} color="#EC4899" opacity={0.22} />
      </div>
      <div className="absolute top-16 right-[28%] z-0 hidden md:block">
        <GeoPlus size={20} color="#3B82F6" opacity={0.2} />
      </div>
      <div className="absolute bottom-14 right-[35%] z-0 hidden md:block">
        <GeoZigzag width={80} height={14} segments={5} color="#e66e37" opacity={0.22} />
      </div>
      <div className="absolute top-[55%] right-6 z-0 hidden md:block">
        <GeoWave width={100} amplitude={9} waves={3} color="#8B5CF6" opacity={0.2} />
      </div>
      <div className="absolute top-[22%] left-[18%] z-0 hidden lg:block pointer-events-none select-none" style={{ animation: "geo-spin-r 20s linear infinite" }}>
        <GeoSquare size={26} color="#3B82F6" opacity={0.15} rotate={20} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-14"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1D2026] mb-3">
            Why Teach at <br className="sm:hidden" /><span className="bg-[#E66E37] text-white px-3 py-1 rounded-[14px]">Super Sheldon</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#4E5566] text-lg sm:text-xl max-w-xl mx-auto">
            Be part of a worldwide network of mentors shaping young minds. Without leaving your home.
          </motion.p>
        </motion.div>

        <div
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              initial={{ opacity: 0, x: dir * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -80 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              {slide.video ? (
                <motion.div
                  key={slide.video}
                  initial={{ filter: "blur(14px)", opacity: 0, scale: 1.06 }}
                  animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="aspect-video rounded-2xl overflow-hidden shadow-xl relative bg-[#1a1206]"
                >
                  <video
                    src={slide.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ) : (
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-orange-200 via-orange-300 to-orange-500 flex flex-col items-center justify-center text-white gap-4 shadow-xl overflow-hidden relative">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1], rotate: [0, 3, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-3"
                  >
                    <Clock size={56} className="opacity-50" />
                  </motion.div>
                  <div className="flex flex-col items-center gap-1 opacity-80">
                    <span className="text-2xl font-black tracking-tight">Flexible Hours</span>
                    <span className="text-sm font-medium opacity-70">Teach on your terms</span>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1D2026] mb-4">{slide.title}</h3>
                <p className="text-[#4E5566] text-base sm:text-lg leading-relaxed mb-8">{slide.body}</p>
                <CircleWipeButton as="button" onClick={onApply} className="w-full sm:w-auto px-7 py-3 text-base justify-center">
                  Apply to Teach
                </CircleWipeButton>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

        <div className="flex justify-center gap-2 mt-10" role="tablist" aria-label="Slide navigation">
          {WHY_SLIDES.map((slide, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}: ${slide.title}`}
              aria-current={i === active ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-orange-500" : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: Benefits Grid ────────────────────────────────────────────────

function PhoneMockup({ src }) {
  return (
    <div className="relative" style={{ width: 272, height: 572 }}>
      {/* Ambient glow */}
      <div className="absolute -inset-10 rounded-[80px] bg-orange-500 blur-[80px] opacity-[0.18] pointer-events-none" />
      <div className="absolute -inset-6 rounded-[60px] bg-purple-600 blur-[50px] opacity-[0.10] pointer-events-none" />

      {/* Outer frame */}
      <div
        className="absolute inset-0 rounded-[48px] pointer-events-none"
        style={{
          background: "linear-gradient(160deg, #4a4a4e 0%, #1c1c1e 60%, #2a2a2e 100%)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 40px 100px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      />

      {/* Volume up */}
      <div className="absolute left-[-3.5px] top-[108px] w-[3.5px] h-[34px] rounded-l-full" style={{ background: "linear-gradient(to right, #2a2a2e, #3a3a3e)" }} />
      {/* Volume down */}
      <div className="absolute left-[-3.5px] top-[154px] w-[3.5px] h-[34px] rounded-l-full" style={{ background: "linear-gradient(to right, #2a2a2e, #3a3a3e)" }} />
      {/* Silent switch */}
      <div className="absolute left-[-3.5px] top-[68px] w-[3.5px] h-[24px] rounded-l-full" style={{ background: "linear-gradient(to right, #2a2a2e, #3a3a3e)" }} />
      {/* Power button */}
      <div className="absolute right-[-3.5px] top-[128px] w-[3.5px] h-[60px] rounded-r-full" style={{ background: "linear-gradient(to left, #2a2a2e, #3a3a3e)" }} />

      {/* Screen bezel */}
      <div className="absolute inset-[10px] rounded-[40px] overflow-hidden bg-black">
        {/* Video */}
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Bottom vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-10" />
        {/* Home indicator */}
        <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 z-20 rounded-full bg-white/50" style={{ width: 100, height: 4 }} />
      </div>

      {/* Screen glare */}
      <div
        className="absolute inset-[10px] rounded-[40px] pointer-events-none z-0"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%)" }}
      />
    </div>
  );
}

function BenefitsGrid({ onApply }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const chips = [
    { icon: Monitor,   label: "Live Whiteboard",   color: "#e66e37", pos: "top-[90px] -left-[150px]" },
    { icon: Calendar,  label: "Auto Scheduling",   color: "#8B5CF6", pos: "top-[90px] -right-[150px]" },
    { icon: BarChart2, label: "Progress Analytics",color: "#14B8A6", pos: "bottom-[130px] -left-[160px]" },
    { icon: Headphones,label: "24/7 Support",      color: "#F59E0B", pos: "bottom-[130px] -right-[150px]" },
  ];

  const features = [
    { icon: Monitor,    label: "Interactive Digital Whiteboard", desc: "Real-time annotation tools built for exam prep." },
    { icon: BarChart2,  label: "Progress Dashboard",             desc: "Track every student's journey with live analytics." },
    { icon: TrendingUp, label: "Performance Bonuses",            desc: "Earn more as your ratings and results improve." },
  ];

  return (
    <section ref={ref} className="py-10 sm:py-24 bg-[#1D2026] relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600 rounded-full blur-[160px] opacity-[0.07] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-700 rounded-full blur-[140px] opacity-[0.07] pointer-events-none" />

      {/* Geometric shapes */}
      <div className="absolute top-10 left-10 z-0 pointer-events-none select-none" style={{ animation: "geo-spin 28s linear infinite" }}>
        <GeoHexagon size={48} color="#8B5CF6" opacity={0.2} />
      </div>
      <div className="absolute top-16 right-12 z-0 pointer-events-none select-none" style={{ animation: "geo-spin-r 22s linear infinite" }}>
        <GeoStar size={32} color="#F59E0B" opacity={0.22} />
      </div>
      <div className="absolute bottom-12 left-10 z-0 pointer-events-none select-none" style={{ "--geo-float-y": "-14px", animation: "geo-float 6s ease-in-out infinite" }}>
        <GeoTriangle size={40} color="#14B8A6" opacity={0.2} />
      </div>
      <div className="absolute bottom-10 right-10 z-0 pointer-events-none select-none" style={{ animation: "geo-spin 18s linear infinite" }}>
        <GeoDiamond size={36} color="#EC4899" opacity={0.2} />
      </div>
      <div className="absolute top-1/2 left-6 z-0 hidden md:block">
        <GeoDotsGrid cols={3} rows={6} gap={16} dotR={2} color="white" opacity={0.08} />
      </div>
      <div className="absolute top-1/2 right-6 z-0 hidden md:block">
        <GeoDotsGrid cols={3} rows={6} gap={16} dotR={2} color="#e66e37" opacity={0.12} />
      </div>
      <div className="absolute top-[30%] left-[40%] z-0 hidden lg:block">
        <GeoZigzag width={80} height={14} segments={5} color="#8B5CF6" opacity={0.2} />
      </div>
      <div className="absolute bottom-[35%] right-[38%] z-0 hidden lg:block">
        <GeoWave width={90} amplitude={9} waves={3} color="#14B8A6" opacity={0.18} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left — content */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={stagger}
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-orange-400 text-sm font-semibold tracking-wide">See It In Action</span>
            </motion.div>

            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
              Everything You Need to{" "}
              <span className="text-[#FFD700]">Teach & Thrive</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-white/55 text-lg leading-relaxed mb-10">
              Super Sheldon gives you world-class tools, flexible scheduling, and real student analytics — so you can focus entirely on what you love: teaching.
            </motion.p>

            {/* Feature list */}
            <motion.div variants={stagger} className="space-y-5 mb-10">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-orange-500/15 border border-orange-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/25 transition-colors duration-200">
                    <f.icon size={20} className="text-orange-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-[15px] mb-0.5">{f.label}</div>
                    <div className="text-white/45 text-sm leading-relaxed">{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp}>
              <CircleWipeButton
                as="button"
                onClick={onApply}
                className="w-full sm:w-auto px-7 py-3 text-base justify-center"
              >
                Apply to Teach
              </CircleWipeButton>
            </motion.div>
          </motion.div>

          {/* Right — phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-[272px] mx-auto lg:mx-0"
            >
              <PhoneMockup src="/videos/video1.mp4" />

              {/* Floating chips */}
              {chips.map((chip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.12, type: "spring", stiffness: 260, damping: 20 }}
                  className={`absolute ${chip.pos} hidden lg:flex items-center gap-2 bg-[#1e2028] border border-white/10 rounded-2xl px-3 py-2 shadow-xl backdrop-blur-sm`}
                  style={{ boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)` }}
                >
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: chip.color + "22" }}>
                    <chip.icon size={15} style={{ color: chip.color }} />
                  </div>
                  <span className="text-white text-xs font-semibold whitespace-nowrap">{chip.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 5: How It Works ──────────────────────────────────────────────────

function HowItWorksSection({ onApply }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setActiveStep(s => (s + 1) % 4), 2000);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <section id="how-it-works" ref={ref} className="py-10 sm:py-20 bg-[#FFF9F3] faint-grid relative overflow-hidden">
      {/* Geometric shapes — how it works */}
      <div className="absolute top-8 right-8 z-0 pointer-events-none select-none" style={{ animation: "geo-spin-r 28s linear infinite" }}>
        <GeoHexagon size={50} color="#3B82F6" opacity={0.18} />
      </div>
      <div className="absolute bottom-12 left-8 z-0 pointer-events-none select-none" style={{ "--geo-float-y": "-12px", animation: "geo-float 5s ease-in-out infinite" }}>
        <GeoTriangle size={42} color="#EC4899" opacity={0.18} style={{ transform: "scaleY(-1)" }} />
      </div>
      <div className="absolute top-[22%] left-[14%] z-0 pointer-events-none select-none" style={{ animation: "geo-spin 12s linear infinite" }}>
        <GeoStar size={30} color="#e66e37" opacity={0.2} />
      </div>
      <div className="absolute top-[40%] right-5 z-0 pointer-events-none select-none" style={{ animation: "geo-spin 18s linear infinite" }}>
        <GeoDiamond size={38} color="#8B5CF6" opacity={0.18} />
      </div>
      <div className="absolute bottom-[30%] right-[30%] z-0 hidden md:block pointer-events-none select-none" style={{ animation: "geo-spin-r 22s linear infinite" }}>
        <GeoCircle size={26} color="#14B8A6" opacity={0.2} />
      </div>
      <div className="absolute bottom-10 right-10 z-0 hidden md:block pointer-events-none select-none" style={{ animation: "geo-spin 16s linear infinite" }}>
        <GeoStar size={24} color="#F59E0B" opacity={0.2} />
      </div>
      <div className="absolute top-12 left-[42%] z-0 hidden lg:block pointer-events-none select-none" style={{ animation: "geo-spin-r 20s linear infinite" }}>
        <GeoSquare size={28} color="#10B981" opacity={0.17} rotate={18} />
      </div>
      <div className="absolute top-10 left-[24%] z-0">
        <GeoDotsGrid cols={6} rows={3} gap={16} dotR={2} color="#3B82F6" opacity={0.18} />
      </div>
      <div className="absolute bottom-10 left-[35%] z-0 hidden md:block">
        <GeoDotsGrid cols={4} rows={3} gap={14} dotR={1.5} color="#EC4899" opacity={0.18} />
      </div>
      <div className="absolute bottom-8 right-[30%] z-0">
        <GeoPlus size={28} color="#8B5CF6" opacity={0.22} />
      </div>
      <div className="absolute top-20 left-10 z-0">
        <GeoPlus size={22} color="#14B8A6" opacity={0.2} />
      </div>
      <div className="absolute top-[55%] left-[6%] z-0 hidden md:block">
        <GeoZigzag width={76} height={14} segments={5} color="#e66e37" opacity={0.22} />
      </div>
      <div className="absolute top-[15%] right-[22%] z-0 hidden md:block">
        <GeoWave width={100} amplitude={9} waves={3} color="#8B5CF6" opacity={0.2} />
      </div>
      <div className="absolute bottom-[24%] left-[32%] z-0 hidden md:block pointer-events-none select-none" style={{ animation: "geo-spin 30s linear infinite" }}>
        <GeoArc size={78} color="#3B82F6" opacity={0.2} startAngle={-50} endAngle={190} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1D2026] mb-4">
            Get Started in <span className="text-orange-500">4 Easy Steps</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#4E5566] text-lg sm:text-xl max-w-xl mx-auto">
            From application to your first live session in as little as 48 hours.
          </motion.p>
        </motion.div>

        {/* Connecting line + travelling dot (desktop) */}
        <div className="hidden lg:block relative mb-0 h-0">
          <div className="absolute top-[3.5rem] left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-0">
            <svg className="w-full" height="8" viewBox="0 0 1000 8" preserveAspectRatio="none">
              <motion.path
                d="M0,4 L1000,4"
                stroke="#e66e37"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                opacity={0.12}
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 2.4, ease: "easeInOut", delay: 0.2 }}
              />
              <motion.path
                d="M0,4 L1000,4"
                stroke="#e66e37"
                strokeWidth="2.5"
                strokeDasharray="8 5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 2.4, ease: "easeInOut", delay: 0.2 }}
              />
            </svg>
            {/* Travelling dot */}
            <motion.div
              className="absolute top-0 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
              style={{ width: 16, height: 16 }}
              animate={{ left: `${(activeStep / 3) * 100}%` }}
              transition={{ duration: 0.75, ease: [0.34, 1.4, 0.64, 1] }}
            >
              {/* Expanding pulse ring — re-fires on each step */}
              <motion.div
                key={activeStep}
                className="absolute rounded-full bg-orange-400"
                style={{ inset: -10 }}
                initial={{ scale: 0.2, opacity: 0.8 }}
                animate={{ scale: 2.8, opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              />
              {/* Core dot */}
              <div
                className="w-4 h-4 rounded-full bg-orange-500 ring-2 ring-white"
                style={{ boxShadow: "0 0 14px rgba(230,110,55,0.9)" }}
              />
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
        >
          {STEPS.map((s, i) => {
            const isActive = activeStep === i;
            const numColor = ["#e66e37", "#3b82f6", "#a855f7", "#10b981"][i];
            
            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 280, damping: 22, delay: i * 0.14 },
                  },
                }}
                animate={isActive ? { y: -6, boxShadow: "0 20px 52px rgba(230,110,55,0.18)" } : { y: 0, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white rounded-2xl p-6 border-t-4 border-orange-500 shadow-sm relative"
              >
                {/* Active glow ring — shared layoutId slides between cards */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="step-active-ring"
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{ boxShadow: "inset 0 0 0 2px #e66e37, 0 0 28px rgba(230,110,55,0.15)" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>

                <div className="absolute -top-3.5 left-5 bg-orange-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                  Step {i + 1}
                </div>

                {/* Step number — springs up when active */}
                <motion.div
                  key={isActive ? `active-${i}` : `idle-${i}`}
                  initial={isActive ? { scale: 0.75, opacity: 0.6 } : false}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 leading-none"
                  style={{ color: numColor }}
                >
                  {s.num}
                </motion.div>

                <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                  <s.icon size={22} className="text-orange-600" />
                </div>
                
                <h3 className="font-bold text-[#1D2026] text-base sm:text-lg mb-2">{s.title}</h3>
                <p className="text-[#4E5566] text-sm leading-relaxed">{s.body}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-12"
        >
          <CircleWipeButton
            as="button"
            onClick={onApply}
            className="w-full sm:w-auto px-8 py-3 text-base justify-center"
          >
            Start Your Application
          </CircleWipeButton>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 7: Testimonials Marquee ─────────────────────────────────────────

function TestimonialCard({ t }) {
  return (
    <div className="flex-shrink-0 w-72 bg-white rounded-2xl border border-orange-100 shadow-sm p-5">
      <p className="text-[#4E5566] text-sm leading-relaxed mb-4 line-clamp-3 sm:line-clamp-4">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="border-t border-orange-50 pt-3">
        <div className="font-bold text-[#1D2026] text-sm">{t.name}</div>
        <div className="text-[#4E5566] text-xs">{t.role}</div>
        <div className="text-[#4E5566]/60 text-xs mt-0.5">{t.tenure}</div>
        <span className="inline-flex items-center gap-1 mt-2 bg-emerald-50 text-emerald-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          <Check size={11} aria-hidden="true" className="flex-shrink-0" />
          Verified Educator
        </span>
      </div>
    </div>
  );
}

function DraggableMarqueeRow({ items, direction, duration, mb }) {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const s = useRef({
    pos: 0, ready: false, dragging: false, hovering: false,
    startX: 0, startPos: 0, lastTime: null, rafId: null,
  });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const el = trackRef.current;
    if (!wrapper || !el) return;

    const st = s.current;

    const tick = (ts) => {
      const halfWidth = el.scrollWidth / 2;
      if (!st.ready && halfWidth > 0) {
        st.pos = direction === "right" ? -halfWidth : 0;
        st.ready = true;
      }

      if (!st.lastTime) st.lastTime = ts;
      const dt = Math.min((ts - st.lastTime) / 1000, 0.1);
      st.lastTime = ts;

      if (st.ready && !st.dragging && !st.hovering) {
        const speed = halfWidth / duration;
        st.pos += direction === "left" ? -speed * dt : speed * dt;
      }

      if (halfWidth > 0) {
        while (st.pos < -halfWidth) st.pos += halfWidth;
        while (st.pos > 0) st.pos -= halfWidth;
      }

      el.style.transform = `translateX(${st.pos}px)`;
      st.rafId = requestAnimationFrame(tick);
    };

    st.rafId = requestAnimationFrame(tick);

    const onTouchStart = (e) => {
      st.dragging = true;
      st.startX = e.touches[0].clientX;
      st.startPos = st.pos;
    };

    const onTouchMove = (e) => {
      if (!st.dragging) return;
      e.preventDefault();
      st.pos = st.startPos + (e.touches[0].clientX - st.startX);
    };

    const onTouchEnd = () => {
      st.dragging = false;
      st.lastTime = null;
    };

    const onMouseEnter = () => { st.hovering = true; };
    const onMouseLeave = () => { st.hovering = false; st.lastTime = null; };

    wrapper.addEventListener("touchstart", onTouchStart, { passive: true });
    wrapper.addEventListener("touchmove", onTouchMove, { passive: false });
    wrapper.addEventListener("touchend", onTouchEnd, { passive: true });
    wrapper.addEventListener("mouseenter", onMouseEnter);
    wrapper.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(st.rafId);
      wrapper.removeEventListener("touchstart", onTouchStart);
      wrapper.removeEventListener("touchmove", onTouchMove);
      wrapper.removeEventListener("touchend", onTouchEnd);
      wrapper.removeEventListener("mouseenter", onMouseEnter);
      wrapper.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [direction, duration]);

  return (
    <div ref={wrapperRef} className={`overflow-hidden${mb ? " mb-4" : ""}`}>
      <div ref={trackRef} className="flex gap-4" style={{ willChange: "transform" }}>
        {items.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];
  const doubledReversed = [...[...TESTIMONIALS].reverse(), ...[...TESTIMONIALS].reverse()];

  return (
    <section ref={ref} className="py-10 sm:py-20 bg-white overflow-hidden faint-grid relative">
      {/* Geometric shapes — testimonials */}
      <div className="absolute top-6 left-8 z-0 pointer-events-none select-none" style={{ animation: "geo-spin 20s linear infinite" }}>
        <GeoStar size={30} color="#F59E0B" opacity={0.18} />
      </div>
      <div className="absolute top-8 right-10 z-0 pointer-events-none select-none" style={{ animation: "geo-spin-r 26s linear infinite" }}>
        <GeoHexagon size={42} color="#8B5CF6" opacity={0.15} />
      </div>
      <div className="absolute bottom-8 left-10 z-0 pointer-events-none select-none" style={{ "--geo-float-y": "-10px", animation: "geo-float 5s ease-in-out infinite" }}>
        <GeoCircle size={28} color="#EC4899" opacity={0.18} />
      </div>
      <div className="absolute bottom-8 right-10 z-0 pointer-events-none select-none" style={{ animation: "geo-spin 18s linear infinite" }}>
        <GeoDiamond size={32} color="#14B8A6" opacity={0.17} />
      </div>
      <div className="absolute top-10 left-[40%] z-0 hidden md:block">
        <GeoZigzag width={80} height={13} segments={5} color="#e66e37" opacity={0.2} />
      </div>
      <div className="absolute bottom-10 right-[35%] z-0 hidden md:block">
        <GeoWave width={90} amplitude={8} waves={3} color="#3B82F6" opacity={0.18} />
      </div>
      <div className="absolute top-6 right-[28%] z-0 hidden md:block">
        <GeoPlus size={22} color="#10B981" opacity={0.2} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 mb-12 relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1D2026] mb-3">
            Teachers <span className="bg-[#e66e37] text-white px-2 rounded-[4px]">Recommend</span> Us
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#4E5566] text-lg sm:text-xl">
            Our guiding stars love making an impact. Read what makes Super Sheldon a favourite.
          </motion.p>
        </motion.div>
      </div>

      <DraggableMarqueeRow items={doubled} direction="left" duration={40} mb />
      <DraggableMarqueeRow items={doubledReversed} direction="right" duration={45} />
    </section>
  );
}

// ─── Section 8: Open Roles ────────────────────────────────────────────────────

function RoleDetail({ role, onApply }) {
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="text-2xl font-bold text-[#1D2026]">{role.title}</h3>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {role.dept}
            </span>
            <span className="flex items-center gap-1 text-[#4E5566] text-sm">
              <MapPin size={12} />
              {role.location} · {role.type}
            </span>
            <span className="flex items-center gap-1 text-[#4E5566] text-sm">
              <Calendar size={12} />
              Closes {role.closeDate}
            </span>
          </div>
        </div>
        <span className="bg-orange-100 text-orange-700 text-sm font-semibold px-3 py-1.5 rounded-full flex-shrink-0">
          Experience: {role.exp}+ yrs
        </span>
      </div>

      <p className="text-[#4E5566] leading-relaxed mb-8 text-[15px]">{role.desc}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-50 rounded-xl p-4 h-28 flex flex-col">
          <div className="font-bold text-[#1D2026] text-sm mb-1.5 flex-shrink-0">Role Impact</div>
          <div className="text-[#4E5566] text-sm leading-relaxed overflow-y-auto flex-1 pr-1">{role.impact}</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 h-28 flex flex-col">
          <div className="font-bold text-[#1D2026] text-sm mb-1.5 flex-shrink-0">Skills & Mindset</div>
          <div className="text-[#4E5566] text-sm leading-relaxed overflow-y-auto flex-1 pr-1">{role.skills}</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 h-28 flex flex-col">
          <div className="font-bold text-[#1D2026] text-sm mb-1.5 flex-shrink-0">Responsibilities</div>
          <div className="text-[#4E5566] text-sm leading-relaxed overflow-y-auto flex-1 pr-1">{role.responsibilities}</div>
        </div>
      </div>

      <CircleWipeButton
        as="button"
        onClick={onApply}
        className="px-8 py-3 text-base"
      >
        Apply Now
      </CircleWipeButton>
    </div>
  );
}

function OpenRolesSection({ onApply }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [roles, setRoles] = useState([]);
  const [rolesLoading, setRolesLoading] = useState(true);
  const [rolesError, setRolesError] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ exp: "Any", subject: "Any", location: "Any", type: "Any" });
  const [selected, setSelected] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    fetch(HIRING_API)
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.json();
      })
      .then((data) => {
        const raw = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : []);
        const list = raw.map((r) => ({
          id: r.id,
          title: r.title || "Untitled Role",
          dept: r.department || r.dept || "",
          location: r.location || "",
          type: r.employment_type
            ? r.employment_type.toLowerCase().replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
            : (r.type || ""),
          exp: r.experience_years != null ? String(r.experience_years) : (r.exp || "0"),
          closeDate: r.close_date
            ? new Date(r.close_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
            : (r.closeDate || "Open"),
          impact: r.impact || "",
          skills: r.skills || "",
          responsibilities: r.responsibilities || "",
          desc: r.description || r.desc || "",
        }));
        setRoles(list);
        setSelected(list[0] || null);
        setRolesLoading(false);
      })
      .catch(() => {
        setRolesError(true);
        setRolesLoading(false);
      });
  }, []);

  const fuse = useMemo(() => new Fuse(roles, {
    keys: ["title", "dept", "skills", "desc"],
    threshold: 0.35,
  }), [roles]);

  const baseRoles = search.trim()
    ? fuse.search(search.trim()).map((r) => r.item)
    : roles;

  const filtered = baseRoles.filter((r) => {
    if (filters.exp !== "Any" && parseInt(r.exp) < parseInt(filters.exp)) return false;
    if (filters.subject !== "Any") {
      const s = filters.subject.toLowerCase();
      const text = (r.title + " " + r.desc + " " + r.dept).toLowerCase();
      if (!text.includes(s)) return false;
    }
    if (filters.location !== "Any" && r.location !== filters.location) return false;
    if (filters.type !== "Any" && r.type !== filters.type) return false;
    return true;
  });

  const resetFilters = () => {
    setFilters({ exp: "Any", subject: "Any", location: "Any", type: "Any" });
    setSearch("");
  };

  const selectCls =
    "border border-orange-200 rounded-xl px-3 py-2 text-sm bg-white text-orange-600 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer hover:border-orange-400 transition-colors duration-200";

  return (
    <section id="open-roles" ref={ref} className="py-10 sm:py-20 bg-gray-50 faint-grid">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-10"
        >
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1D2026]">Now Hiring</h2>
            <span className="bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full">
              {rolesLoading ? "…" : `(${filtered.length})`}
            </span>
          </motion.div>

          {/* Search */}
          <motion.div variants={fadeUp} className="mb-4">
            <div className="relative max-w-sm">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-orange-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search roles…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-orange-200 rounded-xl text-sm bg-white text-[#1D2026] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div variants={fadeUp} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="flex items-center gap-1 text-[#4E5566] text-sm font-medium">
              <Filter size={14} />
              <span className="hidden sm:inline">Apply Filters:</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 sm:contents">
              <select
                aria-label="Filter by experience"
                className={`${selectCls} w-full sm:w-auto`}
                value={filters.exp}
                onChange={(e) => setFilters((f) => ({ ...f, exp: e.target.value }))}
              >
                {[{ v: "Any", l: "Experience" }, { v: "1", l: "1+ yrs" }, { v: "2", l: "2+ yrs" }, { v: "3", l: "3+ yrs" }].map(({ v, l }) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>

              <select
                aria-label="Filter by subject area"
                className={`${selectCls} w-full sm:w-auto`}
                value={filters.subject}
                onChange={(e) => setFilters((f) => ({ ...f, subject: e.target.value }))}
              >
                {["Any", "Maths", "English", "Science", "NAPLAN", "Selective"].map((v) => (
                  <option key={v} value={v}>{v === "Any" ? "Subject Area" : v}</option>
                ))}
              </select>

              <select
                aria-label="Filter by country"
                className={`${selectCls} w-full sm:w-auto`}
                value={filters.location}
                onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
              >
                {["Any", "Australia", "UK"].map((v) => (
                  <option key={v} value={v}>{v === "Any" ? "Country" : v}</option>
                ))}
              </select>

              <select
                aria-label="Filter by job type"
                className={`${selectCls} w-full sm:w-auto`}
                value={filters.type}
                onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}
              >
                {["Any", "Full Time", "Part Time", "Casual"].map((v) => (
                  <option key={v} value={v}>{v === "Any" ? "Job Type" : v}</option>
                ))}
              </select>
            </div>

            <button
              onClick={resetFilters}
              className="text-orange-500 text-sm font-semibold hover:text-orange-700 transition-colors sm:ml-auto self-start sm:self-auto"
            >
              Reset Filters
            </button>
          </motion.div>
        </motion.div>

        {/* Desktop master-detail */}
        <div className="hidden lg:grid grid-cols-5 gap-6">
          {rolesLoading ? (
            <>
              <div className="col-span-2 space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="w-full p-4 rounded-xl border border-gray-200 bg-white animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-100 rounded-full w-16 mb-3" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                ))}
              </div>
              <div className="col-span-3 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-100 rounded w-1/3" />
                <div className="space-y-2 mt-6">
                  <div className="h-3 bg-gray-100 rounded" />
                  <div className="h-3 bg-gray-100 rounded" />
                  <div className="h-3 bg-gray-100 rounded w-3/4" />
                </div>
              </div>
            </>
          ) : rolesError ? (
            <div className="col-span-5 py-16 flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                <AlertTriangle size={24} className="text-red-400" />
              </div>
              <p className="text-[#4E5566] font-medium">Unable to load roles. Please try again later.</p>
            </div>
          ) : roles.length === 0 ? (
            <div className="col-span-5 py-16 flex flex-col items-center text-center gap-5">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                <CalendarCheck size={28} className="text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1D2026] mb-2">No Open Positions Right Now</h3>
                <p className="text-[#4E5566] text-sm max-w-sm leading-relaxed">
                  We're not actively hiring at the moment, but new educator roles open regularly. Check back soon.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="col-span-2 space-y-2 max-h-[520px] overflow-y-auto pr-1 roles-scrollbar">
                <AnimatePresence mode="popLayout">
                  {filtered.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-14 text-[#4E5566]"
                    >
                      No roles match your filters.
                    </motion.div>
                  ) : (
                    filtered.map((r) => (
                      <motion.button
                        key={r.id}
                        layout
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setSelected(r)}
                        className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                          selected?.id === r.id
                            ? "border-l-4 border-orange-500 bg-white shadow-sm border border-orange-500"
                            : "border border-gray-200 bg-white hover:border-orange-200"
                        }`}
                      >
                        <div className="font-bold text-[#1D2026] mb-1">{r.title}</div>
                        <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                          {r.dept}
                        </span>
                        <div className="flex items-center gap-1 mt-2 text-[#4E5566] text-xs">
                          <MapPin size={11} />
                          <span>{r.location} · {r.type}</span>
                        </div>
                      </motion.button>
                    ))
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                {selected && (
                  <motion.div
                    key={selected.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="col-span-3 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm"
                  >
                    <RoleDetail role={selected} onApply={onApply} />
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>

        {/* Mobile list */}
        <div className="lg:hidden space-y-3">
          {rolesLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-full p-4 rounded-xl border border-gray-200 bg-white animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-100 rounded-full w-16 mb-3" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            ))
          ) : rolesError ? (
            <div className="py-12 flex flex-col items-center text-center gap-3">
              <AlertTriangle size={28} className="text-red-400" />
              <p className="text-[#4E5566] text-sm font-medium">Unable to load roles. Please try again later.</p>
            </div>
          ) : roles.length === 0 ? (
            <div className="py-12 flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
                <CalendarCheck size={24} className="text-orange-500" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1D2026] mb-1">No Open Positions Right Now</h3>
                <p className="text-[#4E5566] text-sm max-w-xs leading-relaxed">
                  New educator roles open regularly — check back soon.
                </p>
              </div>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filtered.map((r) => (
                <motion.button
                  key={r.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onClick={() => { setSelected(r); setMobileOpen(true); }}
                  className="w-full text-left p-4 rounded-xl border border-gray-200 bg-white hover:border-orange-200 transition-colors"
                >
                  <div className="font-bold text-[#1D2026] mb-1">{r.title}</div>
                  <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                    {r.dept}
                  </span>
                  <div className="flex items-center gap-1 mt-2 text-[#4E5566] text-xs">
                    <MapPin size={11} />
                    <span>{r.location} · {r.type}</span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Mobile bottom sheet */}
        <AnimatePresence>
          {mobileOpen && selected && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 lg:hidden max-h-[88vh] overflow-y-auto"
              >
                <div className="sticky top-0 bg-white px-6 pt-4 pb-2 flex items-center justify-end border-b border-gray-100">
                  <div className="absolute left-1/2 -translate-x-1/2 top-2 w-10 h-1 bg-gray-200 rounded-full" />
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="p-6">
                  <RoleDetail role={selected} onApply={onApply} />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Section 9: FAQ ───────────────────────────────────────────────────────────

function FAQSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [open, setOpen] = useState(null);

  return (
    <section ref={ref} className="py-10 sm:py-20 bg-[#FFF9F3] faint-grid relative overflow-hidden">
      {/* Geometric shapes — FAQ */}
      <div className="absolute top-8 left-8 z-0 pointer-events-none select-none" style={{ animation: "geo-spin-r 22s linear infinite" }}>
        <GeoHexagon size={44} color="#8B5CF6" opacity={0.15} />
      </div>
      <div className="absolute top-10 right-8 z-0 pointer-events-none select-none" style={{ animation: "geo-spin 12s linear infinite" }}>
        <GeoStar size={32} color="#e66e37" opacity={0.17} />
      </div>
      <div className="absolute bottom-10 left-6 z-0 pointer-events-none select-none" style={{ "--geo-float-y": "-10px", animation: "geo-float 5s ease-in-out infinite" }}>
        <GeoTriangle size={36} color="#14B8A6" opacity={0.17} />
      </div>
      <div className="absolute bottom-10 right-8 z-0 pointer-events-none select-none" style={{ animation: "geo-spin-r 18s linear infinite" }}>
        <GeoDiamond size={32} color="#EC4899" opacity={0.17} />
      </div>
      <div className="absolute top-[40%] left-4 z-0 hidden md:block">
        <GeoZigzag width={64} height={12} segments={4} color="#3B82F6" opacity={0.2} />
      </div>
      <div className="absolute top-[40%] right-4 z-0 hidden md:block">
        <GeoWave width={80} amplitude={8} waves={3} color="#F59E0B" opacity={0.18} />
      </div>
      <div className="absolute top-1/2 right-[10%] z-0 hidden lg:block">
        <GeoDotsGrid cols={3} rows={5} gap={14} dotR={1.5} color="#8B5CF6" opacity={0.17} />
      </div>
      <div className="absolute bottom-[30%] left-[8%] z-0 hidden lg:block">
        <GeoPlus size={22} color="#EC4899" opacity={0.22} />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-8 relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-12 text-center"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-3">
            <HelpCircle size={30} className="text-orange-500" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1D2026]">Got Questions?</h2>
          </motion.div>
          <motion.p variants={fadeUp} className="text-[#4E5566] text-lg sm:text-xl">
            Everything you need to know before applying.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-3"
        >
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`bg-white rounded-2xl overflow-hidden transition-all duration-200 ${
                open === i
                  ? "shadow-sm border-l-4 border-l-orange-400 border-t border-r border-b border-gray-100"
                  : "border border-gray-100 hover:border-orange-200"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-panel-${i}`}
                id={`faq-btn-${i}`}
                className="w-full flex justify-between items-center px-5 py-4 text-left gap-4"
              >
                <span className="font-semibold text-[#1D2026] leading-snug text-sm sm:text-[15px]">
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex-shrink-0 text-orange-500"
                >
                  <ChevronDown size={20} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="px-5 pb-5 text-[#4E5566] leading-relaxed text-sm">{item.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 10: Final CTA ────────────────────────────────────────────────────

function FinalCTASection({ onApply }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const openCalendly = () => {
    if (typeof window !== "undefined" && window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    }
  };

  return (
    <section ref={ref} className="py-12 sm:py-28 bg-[#1D2026] relative overflow-hidden">
      {/* Glows */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-500 rounded-full blur-[100px] opacity-[0.12] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300 rounded-full blur-[120px] opacity-[0.09] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600 rounded-full blur-[160px] opacity-[0.06] pointer-events-none" />

      {/* Geometric shapes — final CTA (dark bg) */}
      <div className="absolute top-8 left-12 z-0 pointer-events-none select-none" style={{ animation: "geo-spin 26s linear infinite" }}>
        <GeoHexagon size={50} color="#8B5CF6" opacity={0.22} />
      </div>
      <div className="absolute bottom-12 right-12 z-0 pointer-events-none select-none" style={{ animation: "geo-spin-r 22s linear infinite" }}>
        <GeoCircle size={36} color="#14B8A6" opacity={0.24} />
      </div>
      <div className="absolute top-[46%] left-6 z-0 pointer-events-none select-none" style={{ "--geo-float-y": "-14px", animation: "geo-float 6s ease-in-out infinite" }}>
        <GeoTriangle size={40} color="#e66e37" opacity={0.22} />
      </div>
      <div className="absolute top-12 right-10 z-0 pointer-events-none select-none" style={{ animation: "geo-spin 16s linear infinite" }}>
        <GeoDiamond size={34} color="#EC4899" opacity={0.22} />
      </div>
      <div className="absolute top-[30%] left-[20%] z-0 hidden md:block pointer-events-none select-none" style={{ animation: "geo-spin 10s linear infinite" }}>
        <GeoStar size={28} color="#F59E0B" opacity={0.24} />
      </div>
      <div className="absolute bottom-[30%] right-[18%] z-0 hidden md:block pointer-events-none select-none" style={{ animation: "geo-spin-r 14s linear infinite" }}>
        <GeoStar size={24} color="#10B981" opacity={0.22} />
      </div>
      <div className="absolute top-[60%] right-6 z-0 hidden md:block pointer-events-none select-none" style={{ animation: "geo-spin 20s linear infinite" }}>
        <GeoSquare size={28} color="#3B82F6" opacity={0.2} rotate={14} />
      </div>
      <div className="absolute bottom-8 left-[22%] z-0">
        <GeoDotsGrid cols={5} rows={4} gap={16} dotR={2} color="#e66e37" opacity={0.18} />
      </div>
      <div className="absolute top-10 right-[28%] z-0 hidden md:block">
        <GeoDotsGrid cols={4} rows={3} gap={14} dotR={1.5} color="white" opacity={0.1} />
      </div>
      <div className="absolute top-[18%] right-[20%] z-0 hidden md:block">
        <GeoZigzag width={80} height={14} segments={5} color="#8B5CF6" opacity={0.24} />
      </div>
      <div className="absolute bottom-[22%] left-[14%] z-0 hidden md:block">
        <GeoWave width={100} amplitude={9} waves={3} color="#14B8A6" opacity={0.22} />
      </div>

      {[
        { top: "22%", right: "22%", s: 26, c: "#F59E0B" },
        { bottom: "18%", left: "38%", s: 22, c: "white" },
      ].map((p, i) => (
        <div key={i} className="absolute z-0" style={p}>
          <GeoPlus size={p.s} color={p.c} opacity={0.2} />
        </div>
      ))}

      {/* Floating geo accents — nested CSS: outer rotates, inner floats */}
      <div className="absolute z-0 pointer-events-none select-none" style={{ left: "8%", top: "22%", animation: "geo-spin 24s linear infinite" }}>
        <div style={{ "--geo-float-y": "-18px", animation: "geo-float 4s ease-in-out infinite" }}>
          <GeoStar size={32} color="#F59E0B" opacity={0.28} />
        </div>
      </div>
      <div className="absolute z-0 pointer-events-none select-none" style={{ left: "82%", top: "18%", animation: "geo-spin-r 20s linear infinite" }}>
        <div style={{ "--geo-float-y": "-14px", animation: "geo-float 5s ease-in-out infinite 0.8s" }}>
          <GeoCircle size={28} color="#e66e37" opacity={0.26} />
        </div>
      </div>
      <div className="absolute z-0 pointer-events-none select-none" style={{ left: "50%", top: "74%", animation: "geo-spin 28s linear infinite" }}>
        <div style={{ "--geo-float-y": "-16px", animation: "geo-float 6s ease-in-out infinite 1.6s" }}>
          <GeoHexagon size={34} color="#8B5CF6" opacity={0.24} />
        </div>
      </div>
      <div className="absolute z-0 pointer-events-none select-none" style={{ left: "22%", top: "68%", animation: "geo-spin-r 18s linear infinite" }}>
        <div style={{ "--geo-float-y": "-12px", animation: "geo-float 5s ease-in-out infinite 2.4s" }}>
          <GeoDiamond size={30} color="#14B8A6" opacity={0.26} />
        </div>
      </div>
      <div className="absolute z-0 pointer-events-none select-none" style={{ left: "74%", top: "64%", animation: "geo-spin 22s linear infinite" }}>
        <div style={{ "--geo-float-y": "-20px", animation: "geo-float 7s ease-in-out infinite 3.2s" }}>
          <GeoTriangle size={36} color="#EC4899" opacity={0.22} />
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 text-center">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 border border-orange-500/40 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-orange-400 text-sm font-semibold tracking-wide">
              Applications Open Now
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Ready to Make a{" "}
            <span className="text-orange-400">Difference?</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-white/55 text-lg sm:text-xl mb-10 max-w-xl mx-auto leading-relaxed"
          >
            Join 500+ educators transforming exam prep for students across Australia. Your application takes less than 5 minutes.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
            <CircleWipeButton
              as="button"
              onClick={onApply}
              className="w-full sm:w-auto px-9 py-3.5 text-base justify-center"
            >
              Apply to Teach Today
            </CircleWipeButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Recruitment Fraud Alert ──────────────────────────────────────────────────

function RecruitmentFraudSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-8 sm:py-14 bg-[#fff8f3] border-t border-orange-100 faint-grid">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="bg-white border border-orange-200 rounded-2xl p-6 sm:p-8 shadow-sm"
        >
          {/* Header */}
          <div className="flex items-start gap-4 mb-5">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertTriangle size={22} className="text-orange-600" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1D2026]">
                Recruitment Fraud Alert — Disclaimer
              </h3>
              <p className="text-[#4E5566] text-sm mt-0.5">
                At Super Sheldon, transparency and trust come first.
              </p>
            </div>
          </div>

          {/* Main message */}
          <p className="text-[#4E5566] leading-relaxed mb-5 text-sm sm:text-base">
            We want to make this absolutely clear:{" "}
            <span className="font-semibold text-[#1D2026]">
              Super Sheldon does not charge candidates any kind of fee.
            </span>
          </p>

          {/* Fee list */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            {[
              "No registration fee.",
              "No interview fee.",
              "No onboarding fee.",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-xl px-4 py-3"
              >
                <span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                  <X size={11} className="text-white" />
                </span>
                <span className="text-sm font-semibold text-[#1D2026]">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-[#4E5566] text-sm leading-relaxed mb-5">
            <span className="font-bold text-orange-600">Nothing. Ever.</span>
            {" "}If anyone asks you for money in the name of Super Sheldon, they are
            not associated with us and are attempting fraud. We take misuse of our brand, name,
            or hiring communication very seriously and will pursue strict legal action against
            such activities.
          </p>

          {/* Report line */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-2">
            <p className="text-sm text-[#4E5566] flex-1">
              To keep yourself safe, please verify every recruitment message you receive.
              If you come across anything suspicious, report it immediately at{" "}
              <a
                href="mailto:hr@supersheldon.com"
                className="text-orange-600 font-semibold underline underline-offset-2 hover:text-orange-700"
              >
                hr@supersheldon.com
              </a>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-5 pt-4 border-t border-orange-100 flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm font-semibold text-[#1D2026]">
              Stay Safe. Stay Aware.
            </p>
            <p className="text-xs text-[#4E5566]">
              Super Sheldon HR Team
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const APPLY_URL = "https://hiring.supersheldon.com/register";

export default function BecomeATeacherPage() {
  const openApply = useCallback(() => window.open(APPLY_URL, "_blank", "noopener,noreferrer"), []);

  return (
    <main className="bg-[#FFF9F3]">
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />

      <StickyApplyCTA onApply={openApply} />
      <HeaderNav />

      <HeroSection onApply={openApply} />
      <AnimatedStatsBar />
      <WhyTeachSection onApply={openApply} />
      <BenefitsGrid onApply={openApply} />
      <HowItWorksSection onApply={openApply} />
      <NSTeacherCarousel />
      <TestimonialsSection />
      <OpenRolesSection onApply={openApply} />
      <FAQSection />
      <FinalCTASection onApply={openApply} />
      <RecruitmentFraudSection />
      <Footer />

      <style>{`
        @keyframes geo-spin   { to { transform: rotate(360deg);  } }
        @keyframes geo-spin-r { to { transform: rotate(-360deg); } }
        @keyframes geo-float  {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(var(--geo-float-y, -14px)); }
        }
        @keyframes geo-float-d {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(var(--geo-float-y, 14px)); }
        }

        ::selection {
          background-color: #e66e37;
          color: #ffffff;
        }
        ::-moz-selection {
          background-color: #e66e37;
          color: #ffffff;
        }
        html {
          scrollbar-width: thin;
          scrollbar-color: #e66e37 #fff3e8;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #fff3e8;
        }
        ::-webkit-scrollbar-thumb {
          background: #e66e37;
          border-radius: 99px;
          border: 2px solid #fff3e8;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #c85a28;
        }

        .faint-grid {
          background-image:
            linear-gradient(rgba(230,110,55,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(230,110,55,0.055) 1px, transparent 1px);
          background-size: 44px 44px;
        }

        .marquee-track {
          animation: marquee-left 40s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .marquee-track-reverse {
          animation: marquee-right 45s linear infinite;
          will-change: transform;
        }
        .marquee-track-reverse:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track,
          .marquee-track-reverse {
            animation: none;
          }
        }

        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }

        /* Custom orange scrollbar for Now Hiring list */
        .roles-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .roles-scrollbar::-webkit-scrollbar-track {
          background: #fff3e8;
          border-radius: 99px;
        }
        .roles-scrollbar::-webkit-scrollbar-thumb {
          background: #e66e37;
          border-radius: 99px;
        }
        .roles-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #c85a28;
        }
        .roles-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #e66e37 #fff3e8;
        }
      `}</style>
    </main>
  );
}