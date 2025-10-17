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



export default function Home() {
    return (
        <main className="overflow-hidden">

            <Header />

            <HeroSection />
            <AboutSection />
            <CourseSection />
            {/* <TestimonialsPricing /> */}

            <NaplanTestimonial/>

            <NaplanPricing/>


            {/* <TutorsFAQSection /> */}


            <NaplanTutors />

            {/* <ParentAssurance/> */}

            <NaplanFAQ />


            <Footer />
        </main>
    );
}