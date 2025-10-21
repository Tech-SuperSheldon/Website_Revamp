import HeroSection from "@/components/naplan/HeroSection";

import AboutSection from "@/components/naplan/AboutSection";

import CourseSection from "@/components/naplan/CourseSection";

import TestimonialsPricing from "@/components/naplan/TestimonialPricing";


import TutorsFAQSection from "@/components/naplan/TutorsFAQSection";


import Header from "@/components/HeroHeaderNav";


import Footer from "@/components/Footer";


import NaplanTutors from "@/components/naplan/NaplanTutors";
import NaplanFAQ from "@/components/naplan/NaplanFAQ";


import NaplanTestimonial from "@/components/naplan/NaplanTestimonial";

import ParentAssurance from "@/components/naplan/ParentAssurance";

import NaplanPricing from "@/components/naplan/NaplanPricing";

import NaplanReview from "@/components/naplan/NaplanReview";

import CardsNaplan from "@/components/PricingCardNaplan";

import NaplanAdvantage from "@/components/naplan/NaplanAdvantage";


import TeacherTestimonial from "@/components/TeacherTestimonial";


import Hero from "@/components/Hero";

import NaplanExperience from "@/components/naplan/NaplanExperience";

import SubscribeSection from "@/components/SubscribeBanner";


import TeacherCarousel from "@/components/Teachers";


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