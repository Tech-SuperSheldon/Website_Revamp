import PrivacyPolicy from "@/components/legal/privacy";



import UKHeader from "@/components/UKComp/UKHeader";

import UKFooter from "@/components/UKComp/UKFooter";

import UKWhatsapp from "@/components/UKComp/UKWhatsapp";

export default function Terms() {
    return (
        <div className="bg-[#D3F5FF]">
            <UKHeader />

            <PrivacyPolicy/>

            <UKFooter />
            <UKWhatsapp />
        </div>
    );
}