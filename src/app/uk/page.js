// UK homepage (/uk) — blue-themed replica of the main "/" experience,
// with UK location/contact copy instead of Australia. Renders its own
// component tree from src/components/UKHome/ so it never touches "/" or
// the AU course/testimonial/blog routes.
//
// Previously mounted at /uk/home; swapped with the simple UK_Hero page that
// used to live at /uk so the full experience is now the primary UK landing
// page. See src/app/uk/home/page.js for the page that moved the other way.
import dynamic from 'next/dynamic';
import { Header } from '@/components/UKHome/UKHomeHeader';
import UKHomeDeadlineBanner from '@/components/UKHome/UKHomeDeadlineBanner';
import UKHome2Hero from '@/components/UKHome/UKHome2Hero';
import FloatingTryClassButton from '@/components/FloatingTryClassButton';
import UKHomeThemeEffect from '@/components/UKHome/UKHomeThemeEffect';
import DeferredWidgets, { DeferredSection } from '@/components/UKHome/UKHomeDeferredWidgets';

// Below-fold components loaded lazily to reduce initial JS bundle
const TestimonialSection   = dynamic(() => import('@/components/UKHome/UKHomeStudentTestimonial').then(m => ({ default: m.TestimonialSection })));
const UKHomeCourseTree     = dynamic(() => import('@/components/UKHome/UKHomeCourseTree'));
const UKHomeClassVideoSection = dynamic(() => import('@/components/UKHome/UKHomeClassVideoSection'));
const UKHomeChoose         = dynamic(() => import('@/components/UKHome/UKHomeChoose'));
const TestimonialVideoBoost = dynamic(() => import('@/components/UKHome/UKHomeAlexVideo'));
const ParentsTestimonialSection = dynamic(() => import('@/components/UKHome/UKHomeParentsTestimonial').then(m => ({ default: m.ParentsTestimonialSection })));
const UKHomeReview         = dynamic(() => import('@/components/UKHome/UKHomeReview'));
const UKHomeAnim           = dynamic(() => import('@/components/UKHome/UKHomeAnim'));
const UKHomeTeacherTest    = dynamic(() => import('@/components/UKHome/UKHomeTeacherTest'));
const TeacherCarousel      = dynamic(() => import('@/components/UKHome/UKHomeTeacherCarousel'));
const FeatureSlider        = dynamic(() => import('@/components/UKHome/UKHomeFeatures'));
const UKHomeLevelUp        = dynamic(() => import('@/components/UKHome/UKHomeApp'));
const FAQ                  = dynamic(() => import('@/components/UKHome/UKHomeFAQ'));
const UKHomePathwayFinderBanner = dynamic(() => import('@/components/UKHome/UKHomePathwayFinderBanner'));
const Footer               = dynamic(() => import('@/components/UKHome/UKHomeFooter').then(m => ({ default: m.Footer })));

export const metadata = {
  title: 'SuperSheldon UK | Interactive Online Learning for Kids & Students',
};

export default function UKHomePage() {
  return (
    <main className="new-home-bg">
      <UKHomeThemeEffect />
      <UKHomeDeadlineBanner />
      <Header stacked />

      {/* 3D WebGL hero. The iframe has its own scroll that drives the blue-scan
          animation; when it finishes, native scroll chains to this page and the
          sections below come into view. Mounts immediately on page load — see
          UKHome2Hero. */}
      <UKHome2Hero />

      <TestimonialSection />
      <UKHomeCourseTree />
      <UKHomeClassVideoSection />
      <UKHomeChoose />
      <TestimonialVideoBoost />
      <ParentsTestimonialSection />
      <UKHomeReview />
      <DeferredSection>
        <UKHomeAnim />
      </DeferredSection>
      <DeferredSection>
        <UKHomeTeacherTest />
      </DeferredSection>
      <DeferredSection>
        <TeacherCarousel />
      </DeferredSection>
      <DeferredSection>
        <FeatureSlider />
      </DeferredSection>
      <DeferredSection>
        <UKHomeLevelUp />
      </DeferredSection>
      <DeferredSection>
        <FAQ />
      </DeferredSection>
      <DeferredSection>
        <UKHomePathwayFinderBanner />
      </DeferredSection>
      <DeferredSection>
        <Footer />
      </DeferredSection>

      <DeferredWidgets mobileHidden={true} side="right" mobileBar={true} />
      <FloatingTryClassButton
        href="/demo"
        className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-blue-500/30"
      />
    </main>
  );
}
