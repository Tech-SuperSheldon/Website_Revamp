// Preview route: us-website home DESIGN with revamp CONTENT.
// Section order mirrors website1/us-website page.tsx, with revamp extras folded in.
import { Header } from '@/components/NSheader';
import { HeroCoding } from '@/components/HeroCoding';
import { TestimonialSection } from '@/components/NSstudent-testimonial';
import USCourseTree from '@/components/USCourseTree';
import NSClassVideoSection from '@/components/NSClassVideosection';
import NSChoose from '@/components/NSChoose';
import TestimonialVideoBoost from '@/components/NSAlexVideo';
import { ParentsTestimonialSection } from '@/components/NSparents-testimonial';
import NSAnim from '@/components/NSAnim';
import NSTeacherTest from '@/components/NSTeacherTest';
import TeacherCarousel from '@/components/NSTeachers';
import FeatureSlider from '@/components/NSFeatures';
import NSLevelUp from '@/components/NSApp';
import FAQ from '@/components/NSFAQ';
import { Footer } from '@/components/NSfooter';
import FloatingArrowWhatsApp from '@/components/ArrowAndWhatsapp';

// revamp extras (kept per request, restyled to match us-website design)
import CreditsSection from '@/components/Credits';
import TryFreeClass from '@/components/freeclass/tryfreeclass';
import Review from '@/components/Review';

export const metadata = {
  title: 'SuperSheldon | Interactive Online Learning for Kids & Students',
};

export default function NewHome() {
  return (
    <main>
      <Header />
      <HeroCoding />
      <CreditsSection />
      <TryFreeClass />
      <TestimonialSection />
      <USCourseTree />
      <NSClassVideoSection />
      <NSChoose />
      <TestimonialVideoBoost />
      <ParentsTestimonialSection />
      <Review />
      <NSAnim />
      <NSTeacherTest />
      <TeacherCarousel />
      <FeatureSlider />
      <NSLevelUp />
      <FAQ />
      <Footer />
      <FloatingArrowWhatsApp />
    </main>
  );
}
