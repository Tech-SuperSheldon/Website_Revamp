import React from "react";
import { Course } from "@/lib/course-data-uk";
import { Check } from "lucide-react";
import Link from "next/link";

interface UKPricingProps {
  course: Course;
}

export default function UKPricing({ course }: UKPricingProps) {
  // Fallback pricing if none exists
  const pricingPlans = course.pricing || [
    {
      title: "Basic Pack",
      price: "£280",
      duration: "/ 24 classes",
      features: [
        "Perfect for getting started",
        "Access to 24 interactive lessons",
        "Weekly quizzes & assessments",
        "Email support from teachers"
      ],
      description: "A solid foundation to start your learning journey.",
      tag: "Starter"
    },
    {
      title: "Standard Pack",
      price: "£520",
      duration: "/ 48 classes",
      features: [
        "Most popular choice for steady progress",
        "Access to 48 interactive lessons",
        "Priority email support",
        "Detailed progress tracking"
      ],
      isRecommended: true,
      description: "Ideal for students committed to consistent improvement.",
      tag: "Best Value"
    },
    {
      title: "Premium Pack",
      price: "£960",
      duration: "/ 96 classes",
      features: [
        "Comprehensive year-round learning",
        "Access to 96 interactive lessons",
        "1-on-1 performance review session",
        "VIP community access"
      ],
      description: "The ultimate package for complete exam mastery.",
      tag: "Elite"
    }
  ];

  return (
    <div className="w-full py-16">
      <div className="text-center mb-16">
        <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            Pricing
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Simple Plans, Endless Possibilities</h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            With SuperSheldon, you get transparent pricing and full access to premium content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => {
             const isPromo = plan.isRecommended;

             return (
              <div
                key={index}
                className={`relative rounded-[2.5rem] p-8 flex flex-col transition-all duration-300 ${
                    isPromo
                    ? "bg-blue-500 text-white shadow-2xl scale-105 z-10 ring-4 ring-blue-50/50"
                    : "bg-white border border-gray-100 text-gray-900 hover:shadow-xl hover:border-gray-200"
                }`}
              >
                {/* Top Chip */}
                <div className="mb-8">
                    <span className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        isPromo
                        ? "bg-white/20 text-white"
                        : "bg-blue-50 text-blue-600"
                    }`}>
                        {plan.tag || plan.title}
                    </span>
                </div>

                {/* Price */}
                <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                        <span className="text-6xl font-bold tracking-tight">{plan.price}</span>
                        <span className={`text-lg font-medium ${isPromo ? "text-blue-100" : "text-gray-400"}`}>
                            {plan.duration}
                        </span>
                    </div>
                </div>

                {/* Description */}
                <p className={`mb-8 text-sm leading-relaxed ${isPromo ? "text-blue-100" : "text-gray-500"}`}>
                    {plan.description || "Unlock your full potential with this comprehensive plan."}
                </p>

                {/* Features */}
                <div className="space-y-5 mb-8 grow">
                    {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex gap-4 items-start">
                             <div className={`mt-0.5 rounded-full p-1 shrink-0 ${
                                 isPromo ? "bg-white text-blue-600" : "bg-blue-500 text-white"
                             }`}>
                                <Check size={12} strokeWidth={4} />
                            </div>
                            <span className={`text-sm font-medium ${isPromo ? "text-white" : "text-gray-600"}`}>
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Divider with Text */}
                <div className="relative py-6">
                        <div className={`absolute inset-0 flex items-center`}>
                        <div className={`w-full border-t ${isPromo ? "border-blue-400" : "border-gray-100"}`}></div>
                        </div>
                        <div className="relative flex justify-center">
                        <span className={`px-4 text-xs font-semibold uppercase tracking-wider ${
                            isPromo ? "bg-blue-500 text-blue-200" : "bg-white text-gray-400"
                        }`}>
                            Billed Yearly
                        </span>
                        </div>
                </div>

                {/* Button */}
                <div className="mt-auto">
                    <Link href="/demo">
                        <button className={`w-full py-5 rounded-2xl font-bold text-lg transition-all transform hover:-translate-y-1 active:translate-y-0 ${
                            isPromo
                            ? "bg-white text-blue-600 hover:bg-gray-50 shadow-lg"
                            : "bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-200"
                        }`}>
                            Enroll Now
                        </button>
                    </Link>
                </div>

              </div>
            )
        })}
      </div>
    </div>
  );
}
