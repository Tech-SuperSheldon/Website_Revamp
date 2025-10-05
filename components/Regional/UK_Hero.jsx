import UKHero from "../UKComp/UKHero";
import HeroCarousel from "../UKComp/UKSlider";
import UKGrid from "../UKComp/UKGrid";
import UKPromote from "../UKComp/UKPromote";
import UKFPS from "../UKComp/UKFPS";
import UKFAQ from "../UKComp/UKFAQ";
import UKteachslider from "../UKComp/UKteachslider";
import UKteachtest from "../UKComp/UKteachtest";


export default function UK_Hero() {
  return (
    <div>
      <UKHero />
      <HeroCarousel/>
      <UKFPS/>
      <UKGrid/>
      <UKPromote/>


      <UKteachtest/>
      <UKteachslider/>

      <UKFAQ/>

    </div>
  );
}