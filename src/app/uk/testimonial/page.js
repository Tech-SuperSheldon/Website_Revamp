
import UKTestReviews from "@/components/UKComp/UKTestReviews";

import UKHeader from "@/components/UKComp/UKHeader";

import UKFooter from "@/components/UKComp/UKFooter";

import UKWhatsapp from "@/components/UKComp/UKWhatsapp";


export default function Home() {
    return (
        <div>
            <UKHeader/>

            <UKTestReviews/>


            <UKWhatsapp/>
            <UKFooter/>
        </div>
    );
}