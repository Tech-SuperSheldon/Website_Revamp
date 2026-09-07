import { Header } from "@/components/AU/NSheader";
import { Footer } from "@/components/NSfooter";
import AcademyIndexHero from "@/components/academy/AcademyIndexHero";
import NSProcess from "@/components/NSProcess";
import FloatingTryClassButton, {
  ACADEMY_CTA_SELECTOR,
} from "@/components/FloatingTryClassButton";
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
      <FloatingTryClassButton href="/au/demo" avoidSelector={ACADEMY_CTA_SELECTOR} />
    </main>
  );
}
