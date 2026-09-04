import dynamic from "next/dynamic";
import { Header } from "@/components/NSheader";
import { Footer } from "@/components/NSfooter";
import AcademiesContent from "@/components/AcademiesContent";


// Dynamically imported component
const NSProcess = dynamic(() => import("@/components/NSProcess"));

export const metadata = {
  title: "Academies | SuperSheldon",
  description:
    "Explore SuperSheldon's three academies — Tuition, Exam and Skill — each built around a 1:1 tutor match.",
};

export default function AcademiesPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />
      <AcademiesContent />
      <NSProcess />
      
      <Footer />
    </main>
  );
}