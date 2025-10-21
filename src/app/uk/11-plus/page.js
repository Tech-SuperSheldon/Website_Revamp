import UKHeader from "@/components/UKComp/UKHeader";

import UKFooter from "@/components/UKComp/UKFooter";

import UKWhatsapp from "@/components/UKComp/UKWhatsapp";


import E11Structure from "@/components/ElevenPlus/E11Structure";
import E11Choose from "@/components/ElevenPlus/E11Choose";
import E11Impact from "@/components/ElevenPlus/E11Impact";

import E11Hero from "@/components/ElevenPlus/E11Hero";


import UKteachtest from "@/components/UKComp/UKteachtest";
import UKteachslider from "@/components/UKComp/UKteachslider";

import E11FAQ from "@/components/ElevenPlus/E11FAQ";

import SubscribeSection from "@/components/SubscribeBanner";


import Cards11Plus from "@/components/UKComp/Pricing11PlusCards";


import UKSubscribeSection from "@/components/UKComp/UKSubscribeSection";


import E11Experience from "@/components/ElevenPlus/E11Experience";


export default function Home() {
    return (
        <div className="bg-[#D3F5FF]">
            <UKHeader />

            <E11Hero/>



<E11Choose/>
<E11Impact/>
<E11Structure/>


<Cards11Plus/>

<E11Experience/>

<UKteachtest/>
<UKteachslider/>

<E11FAQ/>

<UKSubscribeSection/>

            <UKFooter />
            <UKWhatsapp />
        </div>
    );
}