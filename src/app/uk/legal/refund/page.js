import RefundPolicy from "@/components/legal/refund";

import UKHeader from "@/components/UKComp/UKHeader";

import UKFooter from "@/components/UKComp/UKFooter";

import UKWhatsapp from "@/components/UKComp/UKWhatsapp";

export default function Terms() {
    return (
        <div className="bg-[#D3F5FF]">
            <UKHeader />

            <RefundPolicy/>

            <UKFooter />
            <UKWhatsapp />
        </div>
    );
}