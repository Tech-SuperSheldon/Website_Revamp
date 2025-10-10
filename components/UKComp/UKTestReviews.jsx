



"use client";
import { useState } from "react";
import Link from "next/link";
import { Star, Search, ChevronDown, CheckCircle, Play, Globe, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { ShieldCheck, PlayCircle, Medal } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Olivia Thompson (Year 5, Sydney)",
    role: "Learner",
    type: "learners",
    date: "Aug 12, 2025",
    rating: 5,
    source: "Website",
    text: "Supersheldon classes are so much fun! My coding teacher explains everything clearly and I even built my first small game.",
    link: "/reviews/olivia-thompson",
    profilePic: "/images/reviews/olivia.jpg", // 👈 placeholder
  },
  {
    id: 2,
    name: "Ethan Williams (Year 7, Melbourne)",
    role: "Learner",
    type: "learners",
    date: "Aug 10, 2025",
    rating: 4.5,
    source: "Google",
    text: "Math used to be hard for me, but now I enjoy solving problems. The interactive lessons really helped me.",
    link: "/reviews/ethan-williams",
    profilePic: "/images/reviews/ethan.jpg",
  },
  {
    id: 3,
    name: "Charlotte Brown (Year 4, Brisbane)",
    role: "Learner",
    type: "learners",
    date: "Aug 09, 2025",
    rating: 4.5,
    source: "Trustpilot",
    text: "I love the Science experiments! The teacher shows us step by step and I can even try some at home.",
    link: "/reviews/charlotte-brown",
    profilePic: "/images/reviews/charlotte.jpg",
  },
  {
    id: 4,
    name: "Sarah Thompson (Parent of Olivia, Sydney)",
    role: "Parent",
    type: "parents",
    date: "Aug 08, 2025",
    rating: 5,
    source: "Website",
    text: "As a parent, I am very happy with the progress Olivia is making. The teachers are patient and supportive.",
    link: "/reviews/sarah-thompson",
    profilePic: "/images/reviews/sarah.jpg",
  },
  {
    id: 5,
    name: "Daniel Williams (Parent of Ethan, Melbourne)",
    role: "Parent",
    type: "parents",
    date: "Aug 07, 2025",
    rating: 4.5,
    source: "Google",
    text: "Ethan has improved a lot in Math. The structured lessons and feedback from teachers are excellent.",
    link: "/reviews/daniel-williams",
    profilePic: "/images/reviews/daniel.jpg",
  },
  {
    id: 6,
    name: "Emily Brown (Parent of Charlotte, Brisbane)",
    role: "Parent",
    type: "parents",
    date: "Aug 06, 2025",
    rating: 5,
    source: "Trustpilot",
    text: "Supersheldon gives my daughter confidence in her learning. The platform is easy to use and very engaging.",
    link: "/reviews/emily-brown",
    profilePic: "/images/reviews/emily.jpg",
  },
  {
    id: 7,
    name: "Ms. Jessica Miller (Math Teacher, Supersheldon)",
    role: "Teacher",
    type: "teachers",
    date: "Aug 05, 2025",
    rating: 5,
    source: "Website",
    text: "It’s rewarding to see students grow each week. The interactive tools on Supersheldon make teaching smooth and effective.",
    link: "/reviews/jessica-miller",
    profilePic: "/images/reviews/jessica.jpg",
  },
  {
    id: 8,
    name: "Mr. Liam Johnson (Science Teacher, Supersheldon)",
    role: "Teacher",
    type: "teachers",
    date: "Aug 04, 2025",
    rating: 4.5,
    source: "Google",
    text: "Students are more engaged during online lessons. The platform helps me track their progress and assign homework easily.",
    link: "/reviews/liam-johnson",
    profilePic: "/images/reviews/liam.jpg",
  },
  {
    id: 9,
    name: "Ms. Hannah Davis (English Teacher, Supersheldon)",
    role: "Teacher",
    type: "teachers",
    date: "Aug 03, 2025",
    rating: 5,
    source: "Trustpilot",
    text: "I love the one-to-one interaction. It allows me to focus on each student’s strengths and areas of improvement.",
    link: "/reviews/hannah-davis",
    profilePic: "/images/reviews/hannah.jpg",
  },
  {
    id: 10,
    name: "M.Tech Graduate | Bachelor of Education | 10+ Years of Teaching Experience",
    role: "Teacher",
    type: "teachers",
    date: "Aug 01, 2025",
    rating: 5,
    source: "Website",
    text: "SuperSheldon has provided me with an outstanding platform to apply my expertise and grow as a mentor. The structured approach, innovative resources, and supportive environment have greatly enriched my professional journey.",
    link: "/reviews/mtech-graduate",
    profilePic: "/images/reviews/mtech.jpg",
  },
];


export default function UKTestReviews() {
  const [visibleReviews, setVisibleReviews] = useState(6);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");
  const [sortOpen, setSortOpen] = useState(false);
  const [expanded, setExpanded] = useState({});

  const ratings = { 5: 60, 4: 25, 3: 8, 2: 5, 1: 2 };

  const filteredReviews = reviews
    .filter((r) => {
      const matchFilter = filter === "all" || r.type === filter;
      const matchSearch = r.text.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    })
    .sort((a, b) => {
      if (sort === "recent") return new Date(b.date) - new Date(a.date);
      if (sort === "highest") return b.rating - a.rating;
      if (sort === "lowest") return a.rating - b.rating;
      return 0;
    });

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 pt-24 font-quicksand">
      {/* Banner */}
      
{/* <motion.div
  initial={{ opacity: 0, y: -40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="relative w-full mx-auto mt-8 sm:mt-16 lg:mt-20 h-[240px] sm:h-[380px] md:h-[480px] lg:h-[680px] px-2 sm:px-4 md:px-6"
>
  <img
    src="/reviewsbannerv1.png"
    alt="Reviews Banner"
    className="w-full h-full object-contain object-center rounded-2xl"
  />
</motion.div> */}


<motion.div
  initial={{ opacity: 0, y: -40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="relative w-full mx-auto pt-8 sm:pt-16 lg:pt-20 h-[240px] sm:h-[380px] md:h-[480px] lg:h-[680px] px-2 sm:px-4 md:px-6"
>
  <img
    src="/reviewsbannerv1.png"
    alt="Reviews Banner"
    className="w-full h-full object-contain object-center rounded-2xl"
  />
</motion.div>




      {/* Rating Overview + Highlights */}
<div className="mt-10 space-y-10">
  <div className="flex flex-col md:flex-row items-start gap-8 w-full">
    {/* Overall Rating Card */}
    <div className="text-center bg-white p-8 md:p-10 rounded-2xl shadow-lg w-full md:w-[400px]">
      <p className="text-sm uppercase tracking-wide text-gray-500">
        Overall Rating
      </p>
      <p className="text-6xl md:text-7xl text-blue-500 font-bold">
        4.8<span className="text-2xl">/5</span>
      </p>
      <p className="text-gray-600 mt-2">2,431 reviews</p>
    </div>

    {/* Bars */}
    <div className="flex-1 w-full max-w-lg md:max-w-none">
      <div className="space-y-3">
        {[5, 4, 3, 2, 1].map((star, idx) => (
          <div key={star} className="flex items-center gap-2 w-full">
            <span className="w-10 text-sm md:text-base">{star}★</span>
            <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${ratings[star]}%` }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-blue-500 h-2 rounded-full"
              />
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.15 + 0.4 }}
              className="ml-2 text-xs md:text-sm text-gray-600"
            >
              {ratings[star]}%
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  </div>

        {/* Highlights Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Highlights</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 - Overall Rating */}
            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
              <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
                Overall Rating
              </p>
              <p className="text-5xl font-bold text-blue-500">
                4.8<span className="text-xl">/5</span>
              </p>
              <p className="text-gray-600 mt-2">Based on 2,431 reviews</p>
            </div>

            {/* Card 2 - Top Mentions */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="font-semibold mb-3">Top Mentions</h3>
              <div className="flex flex-wrap gap-2">
                {["Engaging Lessons", "Great Tutors", "Fun Projects", "Clear Progress"].map(
                  (mention) => (
                    <a
                      key={mention}
                      href="#"
                      className="px-3 py-1 rounded-full bg-blue-200 text-blue-900 text-sm font-medium hover:bg-blue-300"
                    >
                      {mention}
                    </a>
                  )
                )}
              </div>
            </div>

            {/* Card 3 - Sources */}
            {/* <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="font-semibold mb-3">Sources</h3>
              <div className="flex flex-wrap gap-2">
                {["Google", "Trustpilot", "Website"].map((src) => (
                  <a
                    key={src}
                    href="#"
                    className="px-3 py-1 rounded-full bg-blue-200 text-blue-900 text-sm font-medium hover:bg-blue-300"
                  >
                    {src}
                  </a>
                ))}
              </div>
            </div> */}

            <div className="bg-white p-6 rounded-2xl shadow-md">
  <h3 className="font-semibold mb-3">Sources</h3>
  <div className="flex flex-wrap gap-2">
    {[
      { label: "Google", url: "https://www.google.com/" },
      { label: "Trustpilot", url: "https://www.trustpilot.com/review/supersheldon.com" },
      { label: "Website", url: "https://supersheldon.com" },
    ].map((src) => (
      <a
        key={src.label}
        href={src.url}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1 rounded-full bg-blue-200 text-blue-900 text-sm font-medium hover:bg-blue-300"
      >
        {src.label}
      </a>
    ))}
  </div>
</div>



          </div>
        </div>
      </div>


      {/* Extra Highlight Boxes */}
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.15, duration: 0.5 },
    },
  }}
  className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
>
  {/* Verified Parents & Learners */}
  <motion.div
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-md"
  >
    <ShieldCheck className="w-6 h-6 text-blue-600" />
    <p className="text-sm font-medium text-gray-700">
      Verified Parents & Learners
    </p>
  </motion.div>

  {/* Video Testimonials */}
  <motion.div
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-md"
  >
    <PlayCircle className="w-6 h-6 text-blue-600" />
    <p className="text-sm font-medium text-gray-700">Video Testimonials</p>
  </motion.div>

  {/* Global Community */}
  <motion.div
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-md"
  >
    <Globe className="w-6 h-6 text-blue-600" />
    <p className="text-sm font-medium text-gray-700">Global Community</p>
  </motion.div>

  {/* Top Rated Curriculum */}
  <motion.div
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-md"
  >
    <Medal className="w-6 h-6 text-blue-600" />
    <p className="text-sm font-medium text-gray-700">Top Rated Curriculum</p>
  </motion.div>
</motion.div>


{/* Filter + Search + Sort */}
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2, duration: 0.5 }}
  className="mt-6 w-full bg-white shadow-md rounded-2xl px-4 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
>
  {/* Filter Buttons */}
  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
    {["all", "parents", "learners", "teachers"].map((tab) => (
      <motion.button
        key={tab}
        onClick={() => setFilter(tab)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-4 py-2 rounded-full text-sm capitalize transition ${
          filter === tab
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {tab}
      </motion.button>
    ))}
  </div>

  {/* Search + Sort */}
  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
    {/* Search */}
    <div className="relative w-full sm:w-64">
      <input
        type="text"
        placeholder="Search reviews..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-sm"
      />
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      />
    </div>

    {/* Sort Dropdown */}
    <div className="relative w-full sm:w-auto">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSortOpen(!sortOpen)}
        className="flex items-center justify-between sm:justify-center gap-2 px-4 py-2 w-full sm:w-auto rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-sm"
      >
        {sort === "recent"
          ? "Recent Reviews"
          : sort === "highest"
          ? "Highest Rated"
          : "Lowest Rated"}
        <ChevronDown size={16} />
      </motion.button>
      {sortOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-full sm:w-40 bg-white rounded-lg shadow-lg border z-10"
        >
          {[
            { key: "recent", label: "Recent Reviews" },
            { key: "highest", label: "Highest Rated" },
            { key: "lowest", label: "Lowest Rated" },
          ].map((opt) => (
            <button
              key={opt.key}
              onClick={() => {
                setSort(opt.key);
                setSortOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                sort === opt.key ? "bg-gray-200 font-medium" : ""
              }`}
            >
              {opt.label}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  </div>
</motion.div>




      {/* Reviews */}
      <div className="mt-12 w-full mb-16">
        <h2 className="text-2xl font-semibold mb-6">Recent Reviews</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {filteredReviews.slice(0, visibleReviews).map((review) => {
            const isLong = review.text.length > 160;
            const displayText = expanded[review.id]
              ? review.text
              : isLong
              ? review.text.slice(0, 160) + "..."
              : review.text;

            return (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-2xl shadow-md flex flex-col"
              >
<div className="flex justify-between items-center mb-1">
  <div className="flex items-center gap-3">
    <img
      src={review.profilePic}
      alt={review.name}
      className="w-10 h-10 rounded-full object-cover"
    />
    <a
      href={review.link}
      className="font-semibold text-black hover:underline"
    >
      {review.name}
    </a>
  </div>
  <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-200 text-blue-900">
    {review.source}
  </span>
</div>


                <p className="text-xs text-gray-500 mb-2">{review.date}</p>

                {/* Rating */}
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(review.rating) ? "gold" : "none"}
                      stroke="gold"
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">
                    {review.rating}
                  </span>
                </div>

                {/* Role Tag */}
                <span className="mb-2 px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 w-fit">
                  {review.role}
                </span>

                {/* Review Text */}
                <p className="text-gray-700 flex-1">
                  {displayText}
                  {isLong && (
                    <button
                      onClick={() => toggleExpand(review.id)}
                      className="ml-1 text-blue-500 hover:underline text-sm"
                    >
                      {expanded[review.id] ? "Read less" : "Read more"}
                    </button>
                  )}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Load More */}
        {visibleReviews < filteredReviews.length && (
          <div className="text-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setVisibleReviews((prev) => prev + 3)}
              className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
            >
              Load more reviews
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
