"use client"

import Header from "@/components/AU/HeroHeaderNav";
import TeacherTestimonial from "@/components/AU/TeacherTestimonial";
import FullPageSlider from "@/components/AU/FullPageScroll";
import FAQ from "@/components/AU/FAQ";
import SubscribeSection from "@/components/AU/SubscribeBanner";
import Footer from "@/components/AU/Footer";

import CoursePage from "@/components/AU/CoursePage";

import CardsNaplan from "@/components/AU/PricingCardNaplan";

import CardsICAS from "@/components/AU/PricingCardIcas";

import CardsHSC from "@/components/AU/PricingCardsHSC";

import CardsExam from "@/components/AU/PricingCardExamPrep";

import CardsScholarship from "@/components/AU/PricingcardScholar";

import FloatingArrowWhatsApp from "@/components/AU/ArrowAndWhatsapp";

import ClassVideoSection from '@/components/AU/Studentvideo';
import { useEffect , useState } from "react";

export default function Courses() {

    return (
        <div>
            <Header />
            <CoursePage/>

            {/* {currentCourse.title === "Naplan Champion Course"  ? <CardsNaplan/> : false} */}
            {/* <CardsICAS/> */}
            {/* <CardsHSC/>
            <CardsExam/>
            <CardsScholarship/> */}
            {/* {renderCards()}            */}

            {/* <ClassVideoSection/>
            <TeacherTestimonial/>
            <FullPageSlider/>
            <FAQ/>
            <SubscribeSection/>
            <Footer/>

            <FloatingArrowWhatsApp/> */}

        </div>
    );
}