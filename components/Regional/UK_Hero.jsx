import UKHero from "../UKComp/UKHero";
import HeroCarousel from "../UKComp/UKSlider";
import UKGrid from "../UKComp/UKGrid";
import UKPromote from "../UKComp/UKPromote";
import UKFPS from "../UKComp/UKFPS";
import UKFAQ from "../UKComp/UKFAQ";
import UKteachslider from "../UKComp/UKteachslider";
import UKteachtest from "../UKComp/UKteachtest";

import UKExamCourses from "../UKComp/UKExamCourses";

import UKHeader from "../UKComp/UKHeader";

import UKCredits from "../UKComp/UKCredits";

import UKFooter from "../UKComp/UKFooter";

import UKWhatsapp from "../UKComp/UKWhatsapp";

import UKStudentVideo from "../UKComp/UKStudentVideo";

import UKStudentTest from "../UKComp/UKStudentTest";

import UKBoost from "../UKComp/UKBoost";


import UKReview from "../UKComp/UKReview";

import UK3 from "../UKComp/UK3";

import UKExamBanner from "../UKComp/UKExamBanner";


import UKExamSuccess from "../UKComp/UKSuccess";


import UKNewExamCourses from "../UKComp/UKNewExamCourses";


import UKTestimonialVideoBoost from "../UKComp/UKTestimonialVideoBoost";


import ChristmasPopup from "../ChristmasPopup";


export default function UK_Hero() {
  return (
    <div>
      <UKHeader/>

    

      <UKHero />

<ChristmasPopup color="blue"/>


      <UKCredits/>

      <UKExamBanner/>

      <UKStudentTest/>

      <UKStudentVideo/>


            <UKTestimonialVideoBoost/>
            

      <UKNewExamCourses/>


      <UKExamSuccess/>

      <UKReview/>

    <UK3/>
      
      <UKteachtest/>

      <UKteachslider/>


      <UKFPS/>

      <UKGrid/> 

      <UKFAQ/>

      <UKWhatsapp/>

      <UKFooter/>

    </div>
  );
}