import UKHeader from "@/components/UKComp/UKHeader";

import UKFooter from "@/components/UKComp/UKFooter";

import UKWhatsapp from "@/components/UKComp/UKWhatsapp";

import UKCourse from "@/components/UKComp/UKCourse";

import UKStudentVideo from "@/components/UKComp/UKStudentVideo";

import UKteachtest from "@/components/UKComp/UKteachtest";

import UKFPS from "@/components/UKComp/UKFPS";

import UKFAQ from "@/components/UKComp/UKFAQ";


export default function Courses() {
    return (
        <div className="bg-[#D3F5FF]">

            <UKHeader />
            <UKCourse/>

            <UKStudentVideo/>

            <UKteachtest/>

            <UKFPS/>

            <UKFAQ/>



            <UKFooter />
            <UKWhatsapp />
        </div>
    );
}