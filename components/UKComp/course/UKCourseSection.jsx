


// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";

// export default function UKCourseSection() {
//   const router = useRouter();

//   // ✅ Manage course data easily in one place
//   const courseCategories = [
//     { id: "y1-earlystart", title: "NAPLAN + PAT Tests", count: "20,126 Courses", color: "bg-[#FFF5EF]", icon: "/icons/naplan.svg" },
//     { id: "hsc", title: "HSC Exam", count: "13,932 Courses", color: "bg-[#EEF5FF]", icon: "/icons/hsc.svg" },
//     { id: "icas", title: "ICAS Exam", count: "12,068 Courses", color: "bg-[#F4F2FF]", icon: "/icons/icas.svg" },
//     { id: "act", title: "ACT Exam", count: "6,196 Courses", color: "bg-[#FFF8F3]", icon: "/icons/act.svg" },
//     { id: "vce", title: "VCE Exam", count: "2,600 Courses", color: "bg-[#FFF5F5]", icon: "/icons/vce.svg" },
//     { id: "qce", title: "QCE Exam", count: "1,678 Courses", color: "bg-[#F5FFF7]", icon: "/icons/qce.svg" },
//     { id: "sace", title: "SACE Exam", count: "959 Courses", color: "bg-[#FFF8EE]", icon: "/icons/sace.svg" },
//   ];

//   const handleClick = (id) => {
//     router.push(`/UKSelectiveCourse?id=${id}`);
//   };

//   return (
//     <section className="relative w-[95%] sm:w-[90%] mx-auto py-12 md:py-20 flex flex-col items-center">
      
//       {/* ✅ Top Section: Text + Image */}
//       <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 w-full max-w-6xl">
        
//         {/* Left Content */}
//         <div className="flex-1 text-center lg:text-left">
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-snug">
//             Build Your Skills <br className="hidden sm:block" /> With Online Courses
//           </h2>
//           <p className="text-gray-600 mt-4 max-w-md mx-auto lg:mx-0 text-sm sm:text-base">
//             We denounce with righteous indignation and dislike men who are so
//             beguiled and demoralized that cannot trouble.
//           </p>
//         </div>

//         {/* Right Image */}
//         <div className="flex-1 flex justify-center">
//           <div className="relative w-[90%] sm:w-[80%] md:w-[70%] lg:w-[90%] xl:w-[80%] aspect-[5/4]">
//             <Image
//               src="/UK/newcourse/1.png"
//               alt="Online Course Illustration"
//               fill
//               className="object-contain"
//               priority
//             />
//           </div>
//         </div>
//       </div>

//       {/* ✅ Course Categories Section */}
//       <div className="w-full mt-16">
//         <h3 className="text-center text-2xl md:text-3xl font-semibold text-gray-900 mb-10">
//           Browse Top Categories
//         </h3>

//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center max-w-6xl mx-auto">
//           {courseCategories.map((course) => (
//             <button
//               key={course.id}
//               onClick={() => handleClick(course.id)}
//               className={`w-full sm:w-[200px] md:w-[220px] text-left rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ${course.color} p-4 sm:p-5`}
//             >
//               <div className="flex items-center gap-3">
//                 {course.icon && (
//                   <Image
//                     src={course.icon}
//                     alt={course.title}
//                     width={40}
//                     height={40}
//                     className="object-contain"
//                   />
//                 )}
//                 <div>
//                   <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{course.title}</h4>
//                   <p className="text-xs sm:text-sm text-gray-500">{course.count}</p>
//                 </div>
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }










"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UKCourseSection() {
  const router = useRouter();

  const courseCategories = [
    { id: "y1-earlystart", title: "NAPLAN + PAT Tests", count: "20,126 Courses", color: "bg-[#FFF5EF]", icon: "/icons/naplan.svg" },
    { id: "hsc", title: "HSC Exam", count: "13,932 Courses", color: "bg-[#EEF5FF]", icon: "/icons/hsc.svg" },
    { id: "icas", title: "ICAS Exam", count: "12,068 Courses", color: "bg-[#F4F2FF]", icon: "/icons/icas.svg" },
    { id: "act", title: "ACT Exam", count: "6,196 Courses", color: "bg-[#FFF8F3]", icon: "/icons/act.svg" },
    { id: "vce", title: "VCE Exam", count: "2,600 Courses", color: "bg-[#FFF5F5]", icon: "/icons/vce.svg" },
    { id: "qce", title: "QCE Exam", count: "1,678 Courses", color: "bg-[#F5FFF7]", icon: "/icons/qce.svg" },
    { id: "sace", title: "SACE Exam", count: "959 Courses", color: "bg-[#FFF8EE]", icon: "/icons/sace.svg" },
  ];

  const handleClick = (id) => {
    router.push(`/uk/courses/UKSelectiveCourse?id=${id}`);
  };

  return (
    <section className="relative w-[95%] sm:w-[90%] mx-auto py-12 md:py-20 flex flex-col items-center">
      
      {/* Top Section: Text + Image */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 w-full max-w-6xl">
        
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-snug">
            Build Your Skills <br className="hidden sm:block" /> With Online Courses
          </h2>
          <p className="text-gray-600 mt-4 max-w-md mx-auto lg:mx-0 text-sm sm:text-base">
            We denounce with righteous indignation and dislike men who are so
            beguiled and demoralized that cannot trouble.
          </p>
        </div>

        {/* Right Image (1.4x bigger) */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-[126%] sm:w-[112%] md:w-[98%] lg:w-[126%] xl:w-[112%] aspect-[5/4]">
            <Image
              src="/UK/newcourse/1.png"
              alt="Online Course Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Course Categories Section */}
      <div className="w-full mt-16">
        <h3 className="text-center text-2xl md:text-3xl font-semibold text-gray-900 mb-10">
          Browse Top Categories
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center max-w-6xl mx-auto">
          {courseCategories.map((course) => (
            <button
              key={course.id}
              onClick={() => handleClick(course.id)}
              className={`w-full sm:w-[200px] md:w-[220px] text-left rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ${course.color} p-4 sm:p-5`}
            >
              <div className="flex items-center gap-3">
                {course.icon && (
                  <Image
                    src={course.icon}
                    alt={course.title}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                )}
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{course.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-500">{course.count}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

