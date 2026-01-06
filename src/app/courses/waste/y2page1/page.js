import SelectiveCoursePage from "@/components/SelectiveCoursePage";


import Header from "@/components/HeroHeaderNav";
import TeacherTestimonial from "@/components/TeacherTestimonial";
import FullPageSlider from "@/components/FullPageScroll";
import FAQ from "@/components/FAQ";
import SubscribeSection from "@/components/SubscribeBanner";
import Footer from "@/components/Footer";

import CardsNaplan from "@/components/PricingCardNaplan";

import CardsICAS from "@/components/PricingCardIcas";

import CardsHSC from "@/components/PricingCardsHSC";


export default function y2page1() {
            
            return (
        <div>
            <Header />
            <SelectiveCoursePage year="Year 2" courseIndex={0} />


            <CardsNaplan/>


            <TeacherTestimonial/>
            <FullPageSlider/>
            <FAQ/>
            <SubscribeSection/>
            <Footer/>

        </div>
    );
 
}