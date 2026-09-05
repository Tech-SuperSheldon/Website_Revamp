import { Header } from "@/components/AU/NSheader";
import { Footer } from "@/components/AU/NSfooter";
import AcademyHero from "@/components/academy/AcademyHero";
import AcademyExamTable from "@/components/academy/AcademyExamTable";
import AcademyFAQ from "@/components/academy/AcademyFAQ";
import AcademyCTA from "@/components/academy/AcademyCTA";
import NSProcess from "@/components/NSProcess";
import { getAcademy } from "@/lib/academies";
import { academyTheme } from "@/lib/academyTheme";

const academy = getAcademy("au", "exam-readiness");
const theme = academyTheme("au");

export const metadata = {
  title: academy.metaTitle,
  description: academy.metaDescription,
  alternates: { canonical: "/au/academies/exam-readiness" },
};

export default function AUExamReadinessPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />
      <AcademyHero academy={academy} locale="au" />
      {academy.examTable && (
        <AcademyExamTable
          title={academy.examTable.title}
          intro={academy.examTable.intro}
          rows={academy.examTable.rows}
          locale="au"
        />
      )}
      <NSProcess
        stepsCopy={academy.steps}
        subtitle={academy.stepsSubtitle}
        palette={theme.process}
        highlightText={theme.highlightText}
        highlightBar={theme.highlightBar}
      />
      <AcademyFAQ items={academy.faqs} locale="au" />
      <AcademyCTA prompt={academy.prompt} subtitle={academy.ctaSubtitle} locale="au" />
      <Footer />
    </main>
  );
}
