import { NewEbookSection } from "@/components/try-class/new-ebook-section";
import { ExcellenceSection } from "@/components/try-class/excellence-section";
import { FeaturesSection } from "@/components/try-class/features-section";
import { NewFeaturesSection } from "@/components/try-class/new-features-section";
import { NewHeroSection } from "@/components/try-class/new-hero-section";
import { NewTestimonialsSection } from "@/components/try-class/new-testimonials-section";
import { StatsSection } from "@/components/try-class/stats-section";

export default function TryClassPage() {
  return (
    <main className="min-h-screen">
      <NewHeroSection />
      <StatsSection />
      {/* <ExcellenceSection /> */}
      {/* <FeaturesSection /> */}
      <NewFeaturesSection />
      <NewTestimonialsSection />
      {/* <EbookSection /> */}
      <NewEbookSection/>
    </main>
  );
}
