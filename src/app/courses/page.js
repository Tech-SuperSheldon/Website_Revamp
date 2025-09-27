"use client"

import Header from "@/components/HeroHeaderNav";
import TeacherTestimonial from "@/components/TeacherTestimonial";
import FullPageSlider from "@/components/FullPageScroll";
import FAQ from "@/components/FAQ";
import SubscribeSection from "@/components/SubscribeBanner";
import Footer from "@/components/Footer";

import CoursePage from "@/components/CoursePage";

import CardsNaplan from "@/components/PricingCardNaplan";

import CardsICAS from "@/components/PricingCardIcas";

import CardsHSC from "@/components/PricingCardsHSC";

import CardsExam from "@/components/PricingCardExamPrep";

import CardsScholarship from "@/components/PricingcardScholar";

import FloatingArrowWhatsApp from "@/components/ArrowAndWhatsapp";

import ClassVideoSection from '@/components/Studentvideo';
import { useEffect , useState } from "react";

 const metadata = {
  title: "Courses | SuperSheldon Online Learning",
};


export default  function  Courses({currentCourse}) {

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