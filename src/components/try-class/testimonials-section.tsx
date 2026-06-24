"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Manchester",
      year: "Year 6",
      quote:
        "My daughter went from struggling with fractions to top of her class in Maths. The confidence boost has been incredible!",
    },
    {
      name: "Michael Patel",
      location: "Sydney",
      year: "Year 9",
      quote:
        "The English tutor understood exactly what my son needed for his HSC. He achieved a Band 6 – we couldn't be happier!",
    },
    {
      name: "Emma Thompson",
      location: "Birmingham",
      year: "Year 4",
      quote:
        "Worth every penny. The personalised approach to teaching reading comprehension made all the difference. Highly recommend!",
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
          Hear From Happy Parents
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-12">
          Real families, real results. See how SuperSheldon has helped students across Australia
          excel in English and Maths.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Video Placeholder */}
              <div className="aspect-video bg-black rounded-xl mb-6 relative group cursor-pointer overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-orange-500 fill-orange-500 ml-1" />
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="flex-1 text-left px-2">
                <span className="text-purple-300 text-4xl font-serif">“</span>
                <p className="text-slate-700 italic mb-6 -mt-4 relative z-10">
                  {testimonial.quote}
                </p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="text-left">
                    <p className="font-semibold text-slate-900 text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-slate-500 text-xs">{testimonial.location}</p>
                  </div>
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">
                    {testimonial.year}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Proof Pill */}
        <div className="inline-flex items-center gap-3 bg-white px-6 py-2 rounded-full shadow-sm border border-slate-100">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white"
              />
            ))}
          </div>
          <span className="text-sm font-medium text-slate-600">
            Join 10,000+ satisfied parents
          </span>
        </div>
      </div>
    </section>
  );
}
