"use client";

import Link from "next/link";


import { useState } from "react";
import Image from "next/image";

const quicksand = {
  fontFamily: "'Quicksand', sans-serif",
  fontWeight: 700,
  fontStyle: "bold",
};

const Button = ({
  children,
  className = "",
  variant = "primary",
  ...props
}) => {
  const base =
    "px-4 py-2 rounded-full font-bold transition-colors text-xs focus:outline-none shadow-sm";
  const variants = {
    primary:
      "bg-gradient-to-r from-[#FFD700] to-[#FF9500] hover:from-[#FFC93C] hover:to-[#FF8C00] text-white",
    outline:
      "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-400 shadow-none",
    login: "bg-[#FF8C00] hover:bg-[#FF9933] text-white",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const StatCard = ({ iconSrc, value, label }) => (
  <div className="flex items-center space-x-3">
    <div className="bg-[#F9D4AB] p-2 rounded-full">
      <Image src={iconSrc} alt={label} width={28} height={28} />
    </div>
    <div>
      <p className="text-xl font-bold text-[#1D2026]">{value}</p>
      <p className="text-xs text-[#4E5566]">{label}</p>
    </div>
  </div>
);

export default function HeroHeader() {
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("+370");

  return (
    <section className=" mt-10 hero-header min-h-screen flex items-center justify-center bg-[#FFFFFF] relative overflow-hidden">
      {/* Spherical sun-like gradient*/}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 z-0 pointer-events-none"
        style={{
          width: "600px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 40% 50%, #f1d9cd32 0%, rgba(239, 214, 199, 0.12) 60%, rgba(238, 221, 212, 0.01) 100%)",
          backdropFilter: "blur(650px)",
          WebkitBackdropFilter: "blur(650px)",
        }}
      ></div>
      

      <div className="w-full mx-10 px-[20px] py-[20px] relative z-20">
        {/* Navigation Bar */}
        <header style={quicksand}>
          <nav className="flex items-center justify-between py-2">
            <Image
              src="/newlogo.png"
              alt="SuperSheldon Logo"
              width={170}
              height={20}
            />
            <div className="hidden lg:flex flex-1 justify-center items-center space-x-2">
              <Button variant="outline">Home</Button>
              <Link href="/courses"><Button variant="outline">Course</Button></Link>
              <Button variant="outline">Testimonial</Button>
              <Button variant="outline">Blog</Button>
            </div>
            <div className="hidden md:flex items-center space-x-5">
              <span className="text-xs font-bold text-gray-600 cursor-pointer hover:text-black transition-colors">
                Join Class
              </span>
              <Button variant="primary">Login</Button>
              <Button variant="primary">Try a free Class</Button>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <div className="grid mt-10 mx-10 grid-cols-1 lg:grid-cols-2 gap-x-8 items-center">
          {/* Left Column: Text Content */}
          <div className="space-y-10 flex flex-col justify-center">
            <h1
              className="font-bold text-5xl leading-tight"
              style={{
                fontFamily: "'Quicksand', Arial, sans-serif",
                fontSize: "2.5rem",
              }}
            >
              <span>Ace Every Exam Worldwide</span> with Expert-Led Prep from{" "}
              <span className="text-[#1D2026]">NAPLAN</span> to{" "}
              <span className="text-[#FFD700]">S</span>
              <span className="text-[#1D2026]">AT.</span>
            </h1>
            <form
              className="bg-[#FFF7E6] p-4 rounded-xl shadow-md max-w-lg flex flex-col gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <label className="text-xs text-[#4E5566] font-medium mb-1">
                Phone number
              </label>
              <div className="flex items-center gap-2">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="border border-[#E0E0E0] rounded-lg px-2 py-2 text-sm bg-white"
                >
                  <option value="+370">🇱🇹 +370</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+91">🇮🇳 +91</option>
                </select>
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-grow px-4 py-2 border border-[#E0E0E0] rounded-lg focus:ring-[#FF8C00] focus:border-[#FF8C00] text-sm"
                />
                <Button
                  type="submit"
                  className="whitespace-nowrap"
                  variant="login"
                >
                  Try a Free Class
                </Button>
              </div>
            </form>
            <div className="flex flex-wrap gap-8 pt-4">
              <StatCard
                iconSrc="/CircleWavyCheck.png"
                value="100k"
                label="Learners"
              />
              <StatCard
                iconSrc="/GlobeHemisphereWest.png"
                value="10+"
                label="Country Language"
              />
              <StatCard
                iconSrc="/Users.png"
                value="100%"
                label="Success Rate"
              />
            </div>
          </div>

          {/* Right Column: Image with Floating Icons */}
          <div className="relative flex justify-center items-center mt-8 lg:mt-0">
            <Image
              src="/Header.png"
              alt="Happy students showing A+ grade"
              width={1050}
              height={780}
              className="max-w-full h-auto"
              priority
            />
            {/* "Members" card */}
            <div className="absolute bottom-8 right-8 bg-white p-3 rounded-full shadow-lg flex items-center space-x-2 border-2 border-white">
              <span className="font-bold text-[#1D2026] text-sm">500k+</span>
              <span className="text-[#4E5566] text-xs">Members</span>
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-[#FFD700] flex items-center justify-center">
                  <Image
                    src="/Users.png"
                    alt="User Icon"
                    width={20}
                    height={20}
                  />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-[#FF8D28] flex items-center justify-center">
                  <Image
                    src="/CircleWavyCheck.png"
                    alt="Check Icon"
                    width={20}
                    height={20}
                  />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-[#FF6636] flex items-center justify-center">
                  <Image
                    src="/GlobeHemisphereWest.png"
                    alt="Globe Icon"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>

            {/* Icons positioned around the image */}
            <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 z-10">
              <div className="float-icon float-1">
                <Image
                  src="/floating-icons/star.png"
                  alt="Star"
                  width={50}
                  height={50}
                />
              </div>
            </div>
            <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 z-10">
              <div className="float-icon float-3">
                <Image
                  src="/floating-icons/book.png"
                  alt="Book"
                  width={48}
                  height={48}
                />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 z-10">
              <div className="float-icon float-2">
                <Image
                  src="/floating-icons/graph.png"
                  alt="Graph"
                  width={40}
                  height={40}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Accreditation & Reviews Row */}
        <div className="bg-[#FFF7E6] py-8 border-t border-[#FFD700]/20 mt-12">
          <div className="max-w-7xl   mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center text-center">
            <div>
              <p className="text-xs text-[#4E5566] mb-2 font-medium">
                Trusted Feedback
              </p>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2">
                  <Image
                    src="/reviews.png"
                    alt="Trustpilot"
                    width={80}
                    height={24}
                  />
                  <span className="text-[#FFA135] font-bold text-sm">
                    TrustScore 4.9
                  </span>
                  <span className="text-[#4E5566] text-xs">395 reviews</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-bold text-[#FFD700] text-lg">★</span>
                  <span className="text-[#1D2026] font-bold text-sm">4.8</span>
                  <span className="text-[#4E5566] text-xs">278 reviews</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs text-[#4E5566] mb-2 font-medium">
                Accredited by
              </p>
              <Image
                src="/stemi.png"
                alt="STEM Accredited"
                width={80}
                height={32}
              />
              <p className="text-xs text-[#4E5566] mt-2">
                Educational Experience
              </p>
            </div>
            <div>
              <p className="text-xs text-[#4E5566] mb-2 font-medium">
                Built by alumni of
              </p>
              <Image src="/mesa.png" alt="Mesa Logo" width={80} height={32} />
              <p className="text-xs text-[#4E5566] mt-2">
                Mesa School of Business
              </p>
            </div>
            <div>
              <p className="text-[#1D2026] font-semibold text-sm">
                80% learners show Exam increased confidence in 2 weeks
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button variant="primary">Try a Free Class</Button>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap");
        .float-icon {
          will-change: transform;
        }
        .float-1 {
          animation: float-1 4s ease-in-out infinite;
        }
        .float-2 {
          animation: float-2 5s ease-in-out infinite;
        }
        .float-3 {
          animation: float-3 6s ease-in-out infinite;
        }
        @keyframes float-1 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-10px, 12px) scale(1.08);
          }
        }
        @keyframes float-2 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(14px, -10px) scale(1.05);
          }
        }
        @keyframes float-3 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-8px, 10px) scale(1.07);
          }
        }
      `}</style>
    </section>
  );
}
