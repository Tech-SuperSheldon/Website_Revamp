import Footer from '@/components/Footer';
import HeroHeader from '@/components/waste/HeroHeader';
// import Hero from '@/components/Hero';
import CreditsSection from '@/components/Credits';
import StudentTestimonial from '@/components/StudentTestimonial';
import HeaderNav from '@/components/HeroHeaderNav';
import ExamCourses from '@/components/ExamCourses';
import HeroWithCredits from '@/components/HeroCallWithCredits';

import TeacherTestimonial from '@/components/TeacherTestimonial';

import TeacherCarousel from '@/components/Teachers';

import SubscribeBanner from '@/components/SubscribeBanner';

import FAQ from '@/components/FAQ';

import Features from '@/components/Features';

import Review from '@/components/Review';

import FullPageSlider from '@/components/FullPageScroll';

import FloatingArrowWhatsApp from '@/components/ArrowAndWhatsapp';


import ClassVideoSection from '@/components/Studentvideo';
import Hero from '@/components/Hero';

import FeatureSlider from '@/components/NewScroller';

import NewExamCourses from '@/components/NewExamCourses';


import TryFreeClass from '@/components/freeclass/tryfreeclass';

import UKTestimonialVideoBoost from '@/components/UKComp/UKTestimonialVideoBoost';

export const metadata = {

  title: "SuperSheldon | Interactive Online Learning for Kids & Students",


  }

export default function Home() {
  return (
    <>
    {/* <HeroHeader /> */}
      <HeaderNav />

      {/* <HeroContent /> */}
      {/* <CreditsSection /> */}

      {/* <HeroWithCredits/> */}
      <Hero/>
      <CreditsSection/>
      <TryFreeClass/>
      <StudentTestimonial />


      {/* <ExamCourses /> */}

    <NewExamCourses/>

      {/* <NewExamCourses /> */}

      <ClassVideoSection />

      <UKTestimonialVideoBoost/>


      <Review />

      
      <TeacherTestimonial />

      <TeacherCarousel />

      {/* <Features /> */}
      {/* <FullPageSlider/> */}

      <FeatureSlider/>
      <FAQ />

      {/* <SubscribeBanner /> */}
      

      <Footer />

      <FloatingArrowWhatsApp/>

      
    </>
  );
}