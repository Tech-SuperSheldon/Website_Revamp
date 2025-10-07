import UKHeader from "@/components/UKComp/UKHeader";

import UKFooter from "@/components/UKComp/UKFooter";

import UKWhatsapp from "@/components/UKComp/UKWhatsapp";

import UKBloglist from "@/components/UKComp/UKBloglist";
import UKBlogrecent from "@/components/UKComp/UKBlogrecent";


export default function Home() {
    return (
        <div className="bg-[#D3F5FF]">
            <UKHeader/>

            <UKBlogrecent/>
            <UKBloglist/>




            <UKWhatsapp/>
            <UKFooter/>
        </div>
    );
}