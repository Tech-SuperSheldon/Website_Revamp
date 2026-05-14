"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/solid";
import UKGlossyButton from "./UKGlossybutton";

import { useOpenDemoBooking } from "../utils/navigation";

const pricingPlans = [
  {
    id: 1,
    price: "$50",
    classes: "24 Class",
    title: "11+ Starter",
    image: "/cards/1.png", // 👈 your portrait image
    features: [
      "Lifetime Video Access",
      "Own analytics platform",
      "Chat support",
      "Optimize hashtags",
      "Unlimited users",
    ],
  },
  {
    id: 2,
    price: "$100",
    classes: "48 Class",
    title: "11+ Champion",
    image: "/cards/2.png",
    features: [
      "Lifetime Video Access",
      "Own analytics platform",
      "Chat support",
      "Optimize Teacher",
      "Unlimited Homework",
    ],
    popular: true,
  },
  {
    id: 3,
    price: "$200",
    classes: "96 Class",
    title: "11+ Prodigy",
    image: "/cards/3.png",
    features: [
      "Lifetime Video Access",
      "Own analytics platform",
      "Chat support",
      "Optimize Teacher",
      "Unlimited Homework",
    ],
  },
];

export default function Cards11Plus() {
  const [flipped, setFlipped] = useState({});
  const openDemoBooking = useOpenDemoBooking();

  const toggleFlip = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-wrap justify-center items-start gap-10 p-6 md:p-12">
      {pricingPlans.map((plan) => (
        <motion.div
          key={plan.id}
          className="relative w-64 sm:w-72 md:w-80 aspect-[2/3] perspective cursor-pointer"
          onMouseEnter={() => setFlipped((p) => ({ ...p, [plan.id]: true }))}
          onMouseLeave={() => setFlipped((p) => ({ ...p, [plan.id]: false }))}
          onClick={() => toggleFlip(plan.id)} // 👈 mobile toggle
          animate={
            flipped[plan.id]
              ? { y: -30, scale: 1.05 }
              : { y: 0, scale: 1 }
          }
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.div
            className="relative w-full h-full transition-transform"
            animate={{ rotateY: flipped[plan.id] ? 180 : 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front side */}
            <div className="absolute inset-0 shadow-2xl rounded-2xl flex flex-col justify-start items-center backface-hidden overflow-hidden">
              <img
                src={plan.image}
                alt={plan.title}
                className="absolute inset-0 w-full h-full object-cover rounded-2xl"
              />
              {/* 👇 overlay for readability */}
              <div className="absolute inset-0 rounded-2xl"></div>

              <div className="relative z-10 text-3xl mt-24 font-bold mb-2">
                {plan.price}{" "}
                <span className="text-lg font-normal">/{plan.classes}</span>
              </div>
              <h3 className="relative z-10 text-xl font-semibold">
                {plan.title}
              </h3>
            </div>

            {/* Back side */}
            <div className="absolute inset-0 bg-purple-600 text-white shadow-2xl rounded-2xl p-6 flex flex-col justify-between rotate-y-180 backface-hidden">
              {plan.popular && (
                <div className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full bg-white text-purple-600 uppercase">
                  Most Popular
                </div>
              )}

              <div>
                <div className="text-3xl font-bold mb-2">
                  {plan.price}{" "}
                  <span className="text-lg font-normal">/{plan.classes}</span>
                </div>
                <h3 className="font-bold text-xl mb-4">{plan.title}</h3>
                <ul className="mb-6 space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-orange-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <UKGlossyButton onClick={openDemoBooking}  className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-orange-600 transition shadow-lg">
                  Try a free Class
                </UKGlossyButton>
                {/* <UKGlossyButton className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-orange-600 transition shadow-lg">
                  Download Brochure PDF
                </UKGlossyButton> */}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
