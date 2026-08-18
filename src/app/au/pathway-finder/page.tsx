import { Header } from "@/components/AU/NSheader";
import { Footer } from "@/components/AU/NSfooter";
import PathwayFinder from "@/components/AU/pathway-finder/PathwayFinder";

export const metadata = {
  title: "Pathway Finder | SuperSheldon",
  description:
    "Answer 9 quick questions and discover the exam-prep pathway built for your child — NAPLAN & School Mastery, ICAS Enrichment, or HSC Senior Mastery.",
};

export default function PathwayFinderPage() {
  return (
    <main className="min-h-screen bg-[#FFF9F3]">
      <Header />
      <PathwayFinder />
      <Footer />
    </main>
  );
}
