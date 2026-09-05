import { Header } from "@/components/UKHome/UKHomeHeader";
import { Footer } from "@/components/UKHome/UKHomeFooter";
import ThemeEffect from "@/components/UKHome/UKHomeThemeEffect";
import AcademyIndexHero from "@/components/academy/AcademyIndexHero";
import NSProcess from "@/components/NSProcess";
import { academyTheme } from "@/lib/academyTheme";

const theme = academyTheme("uk");

export const metadata = {
  title: "Academies | SuperSheldon UK",
  description:
    "Explore SuperSheldon's three academies — Tuition, Exam and Skill — each built around a 1:1 tutor match for UK families.",
  alternates: { canonical: "/uk/academies" },
};

export default function UKAcademiesPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <ThemeEffect />
      <Header />
      <AcademyIndexHero locale="uk" />
      <NSProcess
        palette={theme.process}
        highlightText={theme.highlightText}
        highlightBar={theme.highlightBar}
      />
      <Footer />
    </main>
  );
}
