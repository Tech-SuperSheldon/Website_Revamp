// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";

// const posts = [
//   // Example blog objects (replace with real blogs later)
//   // {
//   //   id: 1,
//   //   title: "Our SaaS Product Just Launched!",
//   //   date: "22 July 2024",
//   //   readTime: "4 min",
//   //   excerpt:
//   //     "Remote work has drastically improved my design skills by giving me the freedom to experiment, focus, and learn at my own pace.",
//   //   tags: ["Design", "Product"],
//   //   image: "/sample.jpg",
//   //   link: "/blog/saas-product-launch",
//   //   author: "John Doe",
//   // },
// ];

// export default function BlogList() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const blogsPerPage = 6;

//   // Pagination logic
//   const indexOfLastBlog = currentPage * blogsPerPage;
//   const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
//   const currentBlogs = posts.slice(indexOfFirstBlog, indexOfLastBlog);
//   const totalPages = Math.ceil(posts.length / blogsPerPage);

//   if (posts.length === 0) {
//     return (
//       <section className="py-20 text-center">
//         <h2 className="text-2xl font-semibold mb-10">Weekly Most Read 🔥</h2>
//         <div className="flex justify-center">
//           <Image
//             src="/coming-soon.png" // <- replace with your image
//             alt="Blogs Coming Soon"
//             width={800}
//             height={500}
//             className="rounded-2xl shadow-lg"
//           />
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-20" id="blogs">
//       <div className="max-w-6xl mx-auto px-4">
//         <h2 className="text-xl font-semibold mb-8">Weekly Most Read 🔥</h2>

//         {/* Blog Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {currentBlogs.map((post) => (
//             <Link href={post.link} key={post.id}>
//               <div className="cursor-pointer group">
//                 <div className="relative w-full h-64 rounded-2xl overflow-hidden">
//                   <Image
//                     src={post.image}
//                     alt={post.title}
//                     fill
//                     className="object-cover group-hover:scale-105 transition-transform duration-300"
//                   />
//                 </div>
//                 <div className="mt-4">
//                   <p className="text-sm text-gray-500">
//                     {post.date} • {post.readTime}
//                   </p>
//                   <h3 className="text-lg font-semibold mt-2 group-hover:text-orange-600">
//                     {post.title}
//                   </h3>
//                   <p className="text-gray-600 mt-2 line-clamp-2">{post.excerpt}</p>
//                   <div className="flex gap-2 mt-3 flex-wrap">
//                     {post.tags.map((tag, i) => (
//                       <span
//                         key={i}
//                         className="px-3 py-1 bg-gray-100 text-sm rounded-full"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-center items-center gap-3 mt-12">
//           <button
//             onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-2 border rounded-lg disabled:opacity-50"
//           >
//             ← Previous
//           </button>

//           {[...Array(totalPages)].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`px-4 py-2 border rounded-lg ${
//                 currentPage === i + 1 ? "bg-black text-white" : "bg-white"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}

//           <button
//             onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 border rounded-lg disabled:opacity-50"
//           >
//             Next →
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }















"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const posts = [
//  Example blog objects (replace with real blogs later)
  // {
  //   id: 1,
  //   title: "",
  //   date: "",
  //   readTime: "",
  //   excerpt:
  //     "",
  //   tags: ["", ""],
  //   image: "",
  //   link: "",
  //   author: "",
  // },
];

export default function BlogList() {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = posts.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(posts.length / blogsPerPage);

  // If no blogs → show Coming Soon banner
  if (posts.length === 0) {
    return (
      <section className="py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl font-semibold mb-6 sm:mb-10 text-left">
            Weekly Most Read 🔥
          </h2>
          <div className="w-full overflow-hidden rounded-2xl shadow-md">
            <Image
              src="/blog/comingsoon.jpg" // Replace with your uploaded banner path
              alt="Blogs Coming Soon"
              width={1600}
              height={500}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-20" id="blogs">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl font-semibold mb-8 text-left">
          Weekly Most Read 🔥
        </h2>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentBlogs.map((post) => (
            <Link href={post.link} key={post.id}>
              <div className="cursor-pointer group">
                <div className="relative w-full h-64 rounded-2xl overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    {post.date} • {post.readTime}
                  </p>
                  <h3 className="text-lg font-semibold mt-2 group-hover:text-orange-600">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mt-2 line-clamp-2">{post.excerpt}</p>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {post.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3 mt-12 flex-wrap">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            ← Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 border rounded-lg ${
                currentPage === i + 1 ? "bg-black text-white" : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}
