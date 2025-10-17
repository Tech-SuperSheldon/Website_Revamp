"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useOpenDemoBooking } from "../utils/navigation";
import { coursesData } from "./UKExamData";

export default function UKSelectiveCourse({ id }) {
  const openBookingDemo = useOpenDemoBooking();

  const [selectedYear, setSelectedYear] = useState(Object.keys(coursesData)[0]);
  const [selectedCourse, setSelectedCourse] = useState(
    coursesData[Object.keys(coursesData)[0]][0].id
  );
  const [reviews, setReviews] = useState([]);

  const allReviews = [
    { name: "Maria ", text: "Loved the course. I’ve learned some very subtle techniques, especially on leaves.", img: "/reviews/r1g.jpg" },
    { name: "Chloe", text: "I love the course, it had been a long time since I had experimented with watercolors and now I will do it more often thanks to Khan Studio.", img: "/reviews/r2g.jpg" },
    { name: "Sarah ", text: "Very interactive and engaging, loved the exercises and challenges.", img: "/reviews/r3g.jpg" },
    { name: "Christina ", text: "The pacing was perfect and the course kept me motivated all the way.", img: "/reviews/r4g.jpg" },
    { name: "Emily ", text: "Clear explanations and fun to follow, my kids enjoyed it too.", img: "/reviews/r5g.jpg" },
    { name: "Omar ", text: "Excellent structure, made difficult topics much easier to understand.", img: "/reviews/r5g.jpg" },
    { name: "James ", text: "This was one of the most enjoyable online learning experiences my kid has had.", img: "/reviews/r7m.jpg" },
    { name: "Dexter ", text: "The videos are so well made, I feel like I’m in a real classroom.", img: "/reviews/r7m.jpg" },
    { name: "Michael ", text: "Great content, straight to the point without wasting time.", img: "/reviews/r8m.jpg" },
    { name: "Doakes ", text: "I could follow everything easily, very beginner friendly.", img: "/reviews/r9m.jpg" },
    { name: "Rick ", text: "Detailed, thorough, and motivating. Highly recommended.", img: "/reviews/r10m.jpg" },
    { name: "Amelia ", text: "Fantastic course, exceeded my expectations.", img: "/reviews/r11g.jpg" },
    { name: "Daniel ", text: "I finally understood grammar thanks to this!", img: "/reviews/r16m.jpg" },
    { name: "Felicia ", text: "Challenging but fun, exactly what I needed.", img: "/reviews/r12g.jpg" },
    { name: "Olivia ", text: "The assignments helped me a lot to practice.", img: "/reviews/r13g.jpg" },
    { name: "Sanders ", text: "Super clear teaching style, very beginner friendly.", img: "/reviews/r20m.jpg" },
    { name: "William ", text: "I enjoyed every lesson, very engaging.", img: "/reviews/r19m.jpg" },
    { name: "AvaL", text: "Easy to follow and very practical examples.", img: "/reviews/r17m.jpg" },
    { name: "Alicia ", text: "The examples made everything so easy to understand and apply.", img: "/reviews/r13g.jpg" },
    { name: "Mary", text: "Loved the visuals and teaching style and the presentation skills.", img: "/reviews/r14g.jpg" },
  ];

  // Set reviews on mount
  useEffect(() => {
    const shuffled = [...allReviews].sort(() => 0.5 - Math.random()).slice(0, 5);
    setReviews(shuffled);
  }, []);

  // 🔹 When id prop is provided, find which year/course it belongs to
  useEffect(() => {
    if (id) {
      let foundYear = null;
      let foundCourse = null;

      for (const yearKey in coursesData) {
        const courseMatch = coursesData[yearKey].find((course) => course.id === id);
        if (courseMatch) {
          foundYear = yearKey;
          foundCourse = courseMatch.id;
          break;
        }
      }

      if (foundYear && foundCourse) {
        setSelectedYear(foundYear);
        setSelectedCourse(foundCourse);
      }
    }
  }, [id]);

  const currentCourse = coursesData[selectedYear].find(
    (c) => c.id === selectedCourse
  );

  return (
    <section className="bg-[#D3F5FF]">
      {/* Banner */}
      <div className="w-[92%] bg-[#D3F5FF] mx-auto pt-24 pb-14">
        <div className="relative aspect-[3/1] rounded-4xl overflow-hidden">
          <Image
            src="/UK/coursebannerv1.jpg"
            alt="Hero"
            fill
            className="object-contain rounded-3xl"
          />
        </div>
      </div>

      {/* Dropdown Section */}
      <section className="relative w-full flex justify-center">
        <div className="absolute -top-12 bg-white shadow-lg rounded-xl px-6 sm:px-12 py-6 flex flex-col md:flex-row gap-6 md:gap-8 text-lg w-[90%] max-w-6xl">
          {/* Year Dropdown */}
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setSelectedCourse(coursesData[e.target.value][0].id);
            }}
            className="flex-1 px-4 sm:px-6 py-4 rounded-lg border text-base md:text-lg"
          >
            {Object.keys(coursesData).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* Course Dropdown */}
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="flex-1 px-4 sm:px-6 py-4 rounded-lg border text-base md:text-lg"
          >
            {coursesData[selectedYear].map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Course Content */}
      <section className="flex flex-col md:flex-row max-w-[96%] mx-auto px-6 pt-36 pb-16 gap-12">
        {/* Left Side */}
        <div className="flex-[1.5]">
          {/* Course Image */}
          <div className="rounded-lg overflow-hidden shadow w-full mb-6">
            <Image
              src={currentCourse.img}
              alt={currentCourse.title}
              width={1000}
              height={600}
              className="object-cover w-full h-auto"
            />
          </div>

          {/* Title + Desc */}
          <h2 className="mt-4 text-2xl md:text-3xl font-bold leading-snug">
            {currentCourse.title}
          </h2>
          <h3 className="mt-4 font-semibold text-xl">About Course</h3>
          <p className="text-gray-700 mt-3 text-lg leading-relaxed">
            {currentCourse.desc}
          </p>

          {/* Reviews */}
          <div className="mt-12">
            <h3 className="font-semibold text-2xl mb-4">Reviews</h3>
            <div className="flex flex-col gap-4 max-w-2xl">
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 transition-transform duration-300 hover:scale-[1.02]"
                >
                  {r.img ? (
                    <Image
                      src={r.img}
                      alt={r.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-orange-500 text-base">
                      {r.name}
                    </p>
                    <p className="text-gray-700 text-base">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-[450px] space-y-10">
          {/* Chapters */}
          <div className="bg-white shadow rounded-lg p-8">
            {currentCourse.chapters?.map((c, idx) => (
              <div key={idx} className="mb-6">
                <div className="w-full flex justify-between items-center font-semibold text-base md:text-lg transition-colors duration-300 hover:text-orange-600">
                  <span>{c.title}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Teacher Box */}
          <div className="relative bg-orange-100 rounded-lg shadow overflow-hidden">
            <Image
              src="/coursepage/kidwithearphones.png"
              alt="kid"
              width={650}
              height={400}
              className="w-full h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <p className="text-green-300 text-sm font-semibold">Teacher</p>
              <h3 className="font-bold text-2xl">Ana Kurosova</h3>
              <p className="text-lg">Score High with Our NAPLAN Masterclass</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
