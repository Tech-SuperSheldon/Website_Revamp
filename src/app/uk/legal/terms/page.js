import TermsOfService from "@/components/legal/termsofservices";

import UKHeader from "@/components/UKComp/UKHeader";

import UKFooter from "@/components/UKComp/UKFooter";

import UKWhatsapp from "@/components/UKComp/UKWhatsapp";

export default function Terms() {
    return (
        <div className="bg-[#D3F5FF]">
            <UKHeader />
            <TermsOfService />
            <UKFooter />
            <UKWhatsapp />
        </div>
    );
}