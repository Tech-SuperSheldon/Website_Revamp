

// "use client";
// import { useState } from "react";
// import Image from "next/image";

// // ✅ All blogs here
// const posts = [
//   {
//     id: 1,
//     count: "01",
//     image: "/blog/blog1.jpg",
//     date: "5 September 2025",
//     readTime: "5 min",
//     title: "How to Crack NAPLAN Easily Every Year 🚀",
//     description: `NAPLAN can feel like a big challenge for students, but with the right approach, it becomes much easier to master every year. The key is not just hard work, but smart strategies.

// At Supersheldon, we guide students to build strong reading, writing, and numeracy skills through fun practice and step-by-step methods. Instead of cramming, we encourage daily habits—small efforts that lead to big improvements.

// Samira Hadid, one of our dedicated educators, shares that confidence is just as important as knowledge. With regular practice tests, feedback, and support, students can walk into NAPLAN feeling ready and calm.

// Remember, NAPLAN is not about perfection—it’s about showing your growth. With the right tools and mindset, every student can succeed faster and easier.

// 👉 Stay connected with Supersheldon for more expert tips, learning hacks, and success stories.`,
//     tags: ["NAPLAN", "Education", "Supersheldon"],
//     author: {
//       name: "Samira Hadid",
//       role: "Educator",
//       org: "Supersheldon",
//     },
//   },
// ];

// export default function RecentPosts() {
//   return (
//     <section className="max-w-6xl mx-auto px-6 py-16 mt-20">
//       <h2 className="text-lg font-bold text-gray-800 mb-8">
//         Recent Posts ({posts.length})
//       </h2>

//       <div className="space-y-16">
//         {posts.map((post) => (
//           <BlogCard key={post.id} post={post} />
//         ))}
//       </div>
//     </section>
//   );
// }

// // ✅ Reusable Blog Card
// function BlogCard({ post }) {
//   const [expanded, setExpanded] = useState(false);

//   return (
//     <div className="flex flex-col md:flex-row items-stretch gap-8">
//       {/* Image (fixed height) */}
//       <div className="w-full md:w-1/2 h-[300px] md:h-[400px] rounded-2xl overflow-hidden flex-shrink-0">
//         <Image
//           src={post.image}
//           alt={post.title}
//           width={800}
//           height={600}
//           className="w-full h-full object-cover rounded-2xl"
//         />
//       </div>

//       {/* Content Box */}
//       <div
//         onClick={() => setExpanded(!expanded)}
//         className="relative w-full md:w-1/2 bg-[#F5FFD9] p-8 rounded-2xl border border-black/10 shadow-[6px_6px_0px_rgba(0,0,0,0.9)] transition duration-500 ease-in-out cursor-pointer"
//         title="Click to view"
//       >
//         {/* Meta */}
//         <p className="text-sm text-gray-600 mb-3">
//           {post.date} • {post.readTime} • By {post.author.name} |{" "}
//           {post.author.org}
//         </p>

//         {/* Title */}
//         <h3 className="text-2xl font-semibold text-gray-900 mb-4">
//           {post.title}
//         </h3>

//         {/* Description with smooth expand */}
//         <div
//           className={`relative overflow-hidden transition-[max-height] duration-700 ease-in-out ${
//             expanded ? "max-h-[1500px]" : "max-h-48"
//           }`}
//         >
//           <p className="text-gray-700 leading-relaxed whitespace-pre-line">
//             {post.description}
//           </p>

//           {!expanded && (
//             <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#F5FFD9] to-transparent flex items-end justify-center pb-2">
//               <span className="text-sm text-gray-600 font-medium">
//                 Click to view more ▼
//               </span>
//             </div>
//           )}
//         </div>

//         {/* Tags */}
//         {expanded && (
//           <div className="flex flex-wrap gap-3 mt-4">
//             {post.tags.map((tag, i) => (
//               <span
//                 key={i}
//                 className="px-4 py-1.5 bg-white border border-gray-300 text-sm rounded-lg shadow-sm transition-colors duration-300 hover:bg-gray-100"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         )}

//         {/* Collapse hint */}
//         {expanded && (
//           <div className="text-center pt-4 text-sm text-gray-600 font-medium">
//             Click to collapse ▲
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }











"use client";
import { useState } from "react";
import Image from "next/image";

// ✅ All blogs here
const posts = [
  {
    id: 1,
    count: "01",
    image: "/blog/blog1.jpg",
    date: "5 September 2025",
    readTime: "5 min",
    title: "How to Crack NAPLAN Easily Every Year 🚀",
    description: `NAPLAN can feel like a big challenge for students, but with the right approach, it becomes much easier to master every year. The key is not just hard work, but smart strategies.

At Supersheldon, we guide students to build strong reading, writing, and numeracy skills through fun practice and step-by-step methods. Instead of cramming, we encourage daily habits—small efforts that lead to big improvements.

Samira Hadid, one of our dedicated educators, shares that confidence is just as important as knowledge. With regular practice tests, feedback, and support, students can walk into NAPLAN feeling ready and calm.

Remember, NAPLAN is not about perfection—it’s about showing your growth. With the right tools and mindset, every student can succeed faster and easier.

👉 Stay connected with Supersheldon for more expert tips, learning hacks, and success stories.`,
    tags: ["NAPLAN", "Education", "Supersheldon"],
    author: {
      name: "Samira Hadid",
      role: "Educator",
      org: "Supersheldon",
    },
  },
];

export default function RecentPosts() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 mt-20">
      {/* ✅ Banner Image */}
      <div className="w-full h-[220px] md:h-[320px] lg:h-[420px] mb-12 rounded-2xl overflow-hidden shadow-lg">
        <Image
          src="/blog/blogbannerv1.jpg" // ⬅️ Your uploaded banner
          alt="Blog Banner"
          width={1600}
          height={600}
          className="w-full h-full object-cover rounded-2xl"
          priority
        />
      </div>

      {/* Header */}
      <h2 className="text-lg font-bold text-gray-800 mb-8">
        Recent Posts ({posts.length})
      </h2>

      <div className="space-y-16">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

// ✅ Reusable Blog Card
function BlogCard({ post }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-stretch gap-8">
      {/* Image (fixed height) */}
      <div className="w-full md:w-1/2 h-[300px] md:h-[400px] rounded-2xl overflow-hidden flex-shrink-0">
        <Image
          src={post.image}
          alt={post.title}
          width={800}
          height={600}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      {/* Content Box */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="relative w-full md:w-1/2 bg-[#F5FFD9] p-8 rounded-2xl border border-black/10 shadow-[6px_6px_0px_rgba(0,0,0,0.9)] transition duration-500 ease-in-out cursor-pointer"
        title="Click to view"
      >
        {/* Meta */}
        <p className="text-sm text-gray-600 mb-3">
          {post.date} • {post.readTime} • By {post.author.name} |{" "}
          {post.author.org}
        </p>

        {/* Title */}
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          {post.title}
        </h3>

        {/* Description with smooth expand */}
        <div
          className={`relative overflow-hidden transition-[max-height] duration-700 ease-in-out ${
            expanded ? "max-h-[1500px]" : "max-h-48"
          }`}
        >
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {post.description}
          </p>

          {!expanded && (
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#F5FFD9] to-transparent flex items-end justify-center pb-2">
              <span className="text-sm text-gray-600 font-medium">
                Click to view more ▼
              </span>
            </div>
          )}
        </div>

        {/* Tags */}
        {expanded && (
          <div className="flex flex-wrap gap-3 mt-4">
            {post.tags.map((tag, i) => (
              <span
                key={i}
                className="px-4 py-1.5 bg-white border border-gray-300 text-sm rounded-lg shadow-sm transition-colors duration-300 hover:bg-gray-100"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Collapse hint */}
        {expanded && (
          <div className="text-center pt-4 text-sm text-gray-600 font-medium">
            Click to collapse ▲
          </div>
        )}
      </div>
    </div>
  );
}
