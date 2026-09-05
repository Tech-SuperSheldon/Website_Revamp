import { Header } from "@/components/NSheader";
import { Footer } from "@/components/NSfooter";
import AcademyHero from "@/components/academy/AcademyHero";
import AcademyExamTable from "@/components/academy/AcademyExamTable";
import AcademyFAQ from "@/components/academy/AcademyFAQ";
import AcademyCTA from "@/components/academy/AcademyCTA";
import NSProcess from "@/components/NSProcess";
import { getAcademy } from "@/lib/academies";
import { academyTheme } from "@/lib/academyTheme";

const academy = getAcademy("global", "exam-readiness");
const theme = academyTheme("global");

export const metadata = {
  title: academy.metaTitle,
  description: academy.metaDescription,
  alternates: { canonical: "/academies/exam-readiness" },
};

export default function ExamReadinessPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />
      <AcademyHero academy={academy} locale="global" />
      {academy.examTable && (
        <AcademyExamTable
          title={academy.examTable.title}
          intro={academy.examTable.intro}
          rows={academy.examTable.rows}
          locale="global"
        />
      )}
      <NSProcess
        stepsCopy={academy.steps}
        subtitle={academy.stepsSubtitle}
        palette={theme.process}
        highlightText={theme.highlightText}
        highlightBar={theme.highlightBar}
      />
      <AcademyFAQ items={academy.faqs} locale="global" />
      <AcademyCTA prompt={academy.prompt} subtitle={academy.ctaSubtitle} locale="global" />
      <Footer />
    </main>
  );
}
