import { Header } from "@/components/AU/NSheader";
import { Footer } from "@/components/AU/NSfooter";
import AcademyIndexHero from "@/components/academy/AcademyIndexHero";
import NSProcess from "@/components/NSProcess";
import { academyTheme } from "@/lib/academyTheme";

const theme = academyTheme("au");

export const metadata = {
  title: "Academies | SuperSheldon Australia",
  description:
    "Explore SuperSheldon's three academies — Tuition, Exam and Skill — each built around a 1:1 tutor match for Australian families.",
  alternates: { canonical: "/au/academies" },
};

export default function AUAcademiesPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />
      <AcademyIndexHero locale="au" />
      <NSProcess
        palette={theme.process}
        highlightText={theme.highlightText}
        highlightBar={theme.highlightBar}
      />
      <Footer />
    </main>
  );
}
