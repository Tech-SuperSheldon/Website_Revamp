"use client";

import CardsNaplan from "@/components/AU/PricingCardNaplan";
import CardsICAS from "@/components/AU/PricingCardIcas";
import CardsHSC from "@/components/AU/PricingCardsHSC";
import CardsExam from "@/components/AU/PricingCardExamPrep";
import CardsScholarship from "@/components/AU/PricingcardScholar";
import TeacherTestimonial from "@/components/AU/TeacherTestimonial";
import FullPageSlider from "@/components/AU/FullPageScroll";
import FAQ from "@/components/AU/FAQ";
import SubscribeSection from "@/components/AU/SubscribeBanner";
import Footer from "@/components/AU/Footer";
import FloatingArrowWhatsApp from "@/components/AU/ArrowAndWhatsapp";
import ClassVideoSection from '@/components/AU/Studentvideo';


import FeatureSlider from "./NewScroller";

export default function CardsRenderer({ currentCourse }) {
    // If no course or no title, return null
    if (!currentCourse || !currentCourse.title) {
        return null;
    }

    // Function to render the correct cards based on course title
    const renderCards = () => {
        const title = currentCourse.title.toLowerCase();

        if (title.includes("naplan")) {
        return <CardsNaplan />;
        } else if (title.includes("icas")) {
        return <CardsICAS />;
        } else if (title.includes("hsc")) {
        return <CardsHSC />;
        } else if (title.includes("exam")) {
        return <CardsExam />;
        } else if (title.includes("scholarship")) {
        return <CardsScholarship />;
        }
        
        return null;
    };

    return (
        <>
        {/* Render the appropriate cards */}
        {renderCards()}

        <ClassVideoSection/>
        <TeacherTestimonial/>
        {/* <FullPageSlider/> */}
        <FeatureSlider/>
        
        <FAQ/>
        {/* <SubscribeSection/> */}
        <Footer/>
        <FloatingArrowWhatsApp/>
        </>
    );
}