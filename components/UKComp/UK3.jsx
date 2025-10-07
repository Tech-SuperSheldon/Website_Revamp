"use client";
import Image from "next/image";

export default function UK3() {
  return (
    <div className="w-full flex flex-col items-center text-center px-6 md:px-12 py-12">
      {/* Heading */}
      <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-12">
        A new type of education, <br />
        <span className="text-[#00B4D8]">that actually works.</span>
      </h1>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Card 1 */}
        <div className="flex flex-col items-center">
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="/UK/uk3/1.png"
              alt="Expert teachers"
              fill
              className="object-cover rounded-3xl"
              priority
            />
          </div>
          <p className="mt-4 text-lg font-medium">Expert teachers</p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center">
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="/UK/uk3/2.png"
              alt="Live group lessons"
              fill
              className="object-cover rounded-3xl"
              priority
            />
          </div>
          <p className="mt-4 text-lg font-medium">Live group lessons</p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center">
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="/UK/uk3/3.png"
              alt="Award-winning learning platform"
              fill
              className="object-cover rounded-3xl"
              priority
            />
          </div>
          <p className="mt-4 text-lg font-medium text-center">
            Award-winning learning platform <br /> Learning beyond the lesson
          </p>
        </div>
      </div>
    </div>
  );
}
