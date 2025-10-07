
import UKTestReviews from "@/components/UKComp/UKTestReviews";

import UKHeader from "@/components/UKComp/UKHeader";

import UKFooter from "@/components/UKComp/UKFooter";

import UKWhatsapp from "@/components/UKComp/UKWhatsapp";


export default function Home() {
    return (
        <div className="bg-[#D3F5FF]">
            <UKHeader/>

            <UKTestReviews/>


            <UKWhatsapp/>
            <UKFooter/>
        </div>
    );
}