import HeroSection from "@/components/AU/naplan/HeroSection";

import AboutSection from "@/components/AU/naplan/AboutSection";

import CourseSection from "@/components/AU/naplan/CourseSection";

import TestimonialsPricing from "@/components/AU/naplan/TestimonialPricing";


import TutorsFAQSection from "@/components/AU/naplan/TutorsFAQSection";


import Header from "@/components/AU/HeroHeaderNav";


import Footer from "@/components/AU/Footer";


import NaplanTutors from "@/components/AU/naplan/NaplanTutors";
import NaplanFAQ from "@/components/AU/naplan/NaplanFAQ";


import NaplanTestimonial from "@/components/AU/naplan/NaplanTestimonial";

import ParentAssurance from "@/components/AU/naplan/ParentAssurance";

import NaplanPricing from "@/components/AU/naplan/NaplanPricing";

import NaplanReview from "@/components/AU/naplan/NaplanReview";

import CardsNaplan from "@/components/AU/PricingCardNaplan";

import NaplanAdvantage from "@/components/AU/naplan/NaplanAdvantage";


import TeacherTestimonial from "@/components/AU/TeacherTestimonial";


import Hero from "@/components/AU/Hero";

import NaplanExperience from "@/components/AU/naplan/NaplanExperience";

import SubscribeSection from "@/components/AU/SubscribeBanner";


import TeacherCarousel from "@/components/AU/Teachers";


export default function Home() {
    return (
        <main className="overflow-hidden">

            <Header />

            <HeroSection />

            <NaplanAdvantage/>

            <NaplanReview />


            <CardsNaplan/>

            <NaplanExperience/>


            <TeacherTestimonial/>

            <TeacherCarousel/>


            <NaplanFAQ/>

            <SubscribeSection/>

            <Footer />
        </main>
    );
}