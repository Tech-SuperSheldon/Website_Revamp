// /uk landing page — the global landing page's design and section order
// (src/app/page.js), wired to the UK site.
//
// Sections that carry no links (TrustedByBar, NSParentsSaying, NSAcademies,
// NSWhySheldon, NSHomeFAQ, ScrollProgressBar) are shared with "/" directly.
// Everything that navigates or carries UK copy — header, footer, deadline
// banner, the UK 3D hero (+44 dial code, "United Kingdom" caption), the UK
// student testimonial, teacher carousel, floating CTA — uses the UK copy so a
// visitor on /uk stays on /uk.
//
// Keep the section list in sync with src/app/page.js.
import dynamic from 'next/dynamic';
import { Header } from '@/components/UKHome/UKHomeHeader';
import UKHomeDeadlineBanner from '@/components/UKHome/UKHomeDeadlineBanner';
import UKHome2Hero from '@/components/UKHome/UKHome2Hero';
import TrustedByBar from '@/components/TrustedByBar';
import DeferredWidgets, { DeferredSection } from '@/components/UKHome/UKHomeDeferredWidgets';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import FloatingTryClassButton from '@/components/FloatingTryClassButton';

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
// Redesign sections, sitting between the stats strip and the footer. None of
// these link anywhere, so /uk shares them with the global page.
const NSWhySheldon         = dynamic(() => import('@/components/NSWhySheldon'));
const NSParentsSaying      = dynamic(() => import('@/components/NSParentsSaying'));
const NSAcademies          = dynamic(() => import('@/components/NSAcademies'));

// Short landing-page FAQ. The long categorised one (UKHomeFAQ) is unused here.
const FAQ                  = dynamic(() => import('@/components/NSHomeFAQ'));
const Footer               = dynamic(() => import('@/components/UKHome/UKHomeFooter').then(m => ({ default: m.Footer })));

export const metadata = {
  title: 'SuperSheldon UK | Interactive Online Learning for Kids & Students',
  alternates: { canonical: '/uk' },
};

export default function UKHome() {
  return (
    <main className="new-home-bg">
      <ScrollProgressBar />
      <UKHomeDeadlineBanner />
      <Header stacked />

      {/* 3D WebGL hero. The iframe has its own scroll that drives the blue-scan
          animation; when it finishes, native scroll chains to this page and the
          sections below come into view. Mounts immediately on page load — see
          UKHome2Hero. */}
      <UKHome2Hero />
      <TrustedByBar />

      <TestimonialSection />
      {/* Temporarily removed for landing page redesign preview — from
          Focused Exam Mastery Courses (UKHomeCourseTree) through Try our app,
          LevelUp (UKHomeLevelUp / UKHomeApp). Restore by uncommenting. */}
      {/*
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
        <FeatureSlider />
      </DeferredSection>
      <DeferredSection>
        <UKHomeLevelUp />
      </DeferredSection>
      */}

      <NSParentsSaying />
      <NSAcademies />
      <NSWhySheldon />

      <DeferredSection>
        <TeacherCarousel />
      </DeferredSection>

      <DeferredSection>
        <FAQ />
      </DeferredSection>
      <DeferredSection>
        <Footer />
      </DeferredSection>

      <DeferredWidgets mobileHidden={true} side="right" mobileBar={true} />
      <FloatingTryClassButton href="/demo" />
    </main>
  );
}
