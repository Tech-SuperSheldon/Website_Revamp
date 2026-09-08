import { Header } from "@/components/UKHome/UKHomeHeader";
import { Footer } from "@/components/UKHome/UKHomeFooter";
import AcademyHero from "@/components/academy/AcademyHero";
import AcademyExamTable from "@/components/academy/AcademyExamTable";
import AcademyFAQ from "@/components/academy/AcademyFAQ";
import AcademyCTA from "@/components/academy/AcademyCTA";
import NSProcess from "@/components/NSProcess";
import AcademyCourses from "@/components/newcourseUK/UKAcademyCourses";
import FloatingTryClassButton, {
  ACADEMY_CTA_SELECTOR,
} from "@/components/FloatingTryClassButton";
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
      {/* Regional course catalogue — every grade on screen by default,
          filterable by grade, sitting directly above the four-step journey. */}
      <AcademyCourses academySlug="exam-readiness" />
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
      <FloatingTryClassButton href="/demo" avoidSelector={ACADEMY_CTA_SELECTOR} />
    </main>
  );
}
