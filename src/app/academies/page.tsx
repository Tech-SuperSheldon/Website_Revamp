import { Header } from "@/components/NSheader";
import { Footer } from "@/components/NSfooter";
import AcademyIndexHero from "@/components/academy/AcademyIndexHero";
import NSProcess from "@/components/NSProcess";
import { academyTheme } from "@/lib/academyTheme";

const theme = academyTheme("global");

export const metadata = {
  title: "Academies | SuperSheldon",
  description:
    "Explore SuperSheldon's three academies — Tuition, Exam and Skill — each built around a 1:1 tutor match.",
  alternates: { canonical: "/academies" },
};

export default function AcademiesPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />
      <AcademyIndexHero locale="global" />
      <NSProcess
        palette={theme.process}
        highlightText={theme.highlightText}
        highlightBar={theme.highlightBar}
      />
      <Footer />
    </main>
  );
}
