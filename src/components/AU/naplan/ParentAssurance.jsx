"use client";

import Image from "next/image";

export default function ParentAssurance() {
  // ✅ Variables inside the component
  const heading = "Parent Assurance";
  const pills = [
    "Vetted, Child Safe Tutors",
    "Flexible Scheduling",
    "Weekly Progress Reports",
    "Safe & Supportive",
  ];
  const imageSrc = "/naplan/pa.png"; // replace with your image

  return (
    <section className="flex flex-col md:flex-row items-center md:justify-between gap-6 p-6 md:p-12 bg-white">
      
      {/* Left Content */}
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-6">{heading}</h2>

        <div className="grid grid-cols-2 gap-4">
          {pills.map((pill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-center font-medium"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>

      {/* Right Image */}
      <div className="flex-1 flex justify-center md:justify-end">
        <Image
          src={imageSrc}
          alt="Parent Assurance"
          width={400}
          height={300}
          className="object-contain"
        />
      </div>
    </section>
  );
}
