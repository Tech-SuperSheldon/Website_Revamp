"use client";

import CardsNaplan from "@/components/PricingCardNaplan";
import CardsICAS from "@/components/PricingCardIcas";
import CardsHSC from "@/components/PricingCardsHSC";
import CardsExam from "@/components/PricingCardExamPrep";
import CardsScholarship from "@/components/PricingcardScholar";
import TeacherTestimonial from "@/components/TeacherTestimonial";
import FullPageSlider from "@/components/FullPageScroll";
import FAQ from "@/components/FAQ";
import SubscribeSection from "@/components/SubscribeBanner";
import Footer from "@/components/Footer";
import FloatingArrowWhatsApp from "@/components/ArrowAndWhatsapp";
import ClassVideoSection from '@/components/Studentvideo';

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
        <FullPageSlider/>
        <FAQ/>
        <SubscribeSection/>
        <Footer/>
        <FloatingArrowWhatsApp/>
        </>
    );
}