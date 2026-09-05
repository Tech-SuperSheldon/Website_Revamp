import { Header } from "@/components/UKHome/UKHomeHeader";
import { Footer } from "@/components/UKHome/UKHomeFooter";
import ThemeEffect from "@/components/UKHome/UKHomeThemeEffect";
import AcademyHero from "@/components/academy/AcademyHero";
import AcademyExamTable from "@/components/academy/AcademyExamTable";
import AcademyFAQ from "@/components/academy/AcademyFAQ";
import AcademyCTA from "@/components/academy/AcademyCTA";
import NSProcess from "@/components/NSProcess";
import { getAcademy } from "@/lib/academies";
import { academyTheme } from "@/lib/academyTheme";

const academy = getAcademy("uk", "exam-readiness");
const theme = academyTheme("uk");

export const metadata = {
  title: academy.metaTitle,
  description: academy.metaDescription,
  alternates: { canonical: "/uk/academies/exam-readiness" },
};

export default function UKExamReadinessPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <ThemeEffect />
      <Header />
      <AcademyHero academy={academy} locale="uk" />
      {academy.examTable && (
        <AcademyExamTable
          title={academy.examTable.title}
          intro={academy.examTable.intro}
          rows={academy.examTable.rows}
          locale="uk"
        />
      )}
      <NSProcess
        stepsCopy={academy.steps}
        subtitle={academy.stepsSubtitle}
        palette={theme.process}
        highlightText={theme.highlightText}
        highlightBar={theme.highlightBar}
      />
      <AcademyFAQ items={academy.faqs} locale="uk" />
      <AcademyCTA prompt={academy.prompt} subtitle={academy.ctaSubtitle} locale="uk" />
      <Footer />
    </main>
  );
}
