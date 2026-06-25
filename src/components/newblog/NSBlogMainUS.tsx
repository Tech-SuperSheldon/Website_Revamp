"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { blogs, BlogPost } from "@/lib/blog-data-us";
import { motion } from "framer-motion";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";

export default function NSBlogMainUS() {
  return (
    <div className="bg-white min-h-screen pt-32 md:pt-40 pb-24 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <header className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-orange-600 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-4 border border-orange-200">
              Insights & Resources
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Our <span className="text-orange-600">Blog</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
              Stay updated with the latest in US education, test prep strategies, and learning tips.
            </p>
          </motion.div>
        </header>

        {/* Featured Blog */}
        {blogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <Link href={`/blogs/${blogs[0].id}`} className="group relative block w-full aspect-21/9 rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-100">
              <Image
                src={blogs[0].image}
                alt={blogs[0].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full max-w-3xl text-white">
                <span className="bg-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                  Featured Article
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 group-hover:text-orange-400 transition-colors">
                  {blogs[0].title}
                </h2>
                <div className="flex flex-wrap items-center gap-6 text-sm md:text-base font-medium text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    {blogs[0].date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    {blogs[0].readTime}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.slice(1).map((blog, idx) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link href={`/blogs/${blog.id}`} className="group h-full flex flex-col">
                <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 shadow-lg bg-gray-100">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-orange-600 shadow-sm uppercase tracking-wide">
                      {blog.category}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {blog.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {blog.readTime}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors leading-tight grow">
                  {blog.title}
                </h3>
                
                <p className="text-gray-500 line-clamp-2 mb-6 text-sm leading-relaxed">
                  {blog.excerpt}
                </p>

                <div className="mt-auto flex items-center gap-2 text-orange-600 font-bold hover:gap-4 transition-all uppercase tracking-widest text-xs">
                  Read Article
                  <ArrowRight size={16} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
