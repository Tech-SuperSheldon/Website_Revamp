// /au landing page — the global landing page's design and section order
// (src/app/page.js), wired to the Australian site.
//
// Sections with no AU-specific copy (TrustedByBar, NSParentsSaying,
// NSHomeFAQ, ScrollProgressBar) are shared with "/" directly. NSAcademies and
// NSWhySheldon are shared too but take a locale: NSAcademies for this market's
// exam list and its /au/academies links, NSWhySheldon for its CTA's href.
// Everything that navigates — header, footer, deadline banner, hero, teacher
// carousel — uses the AU copy so a visitor on /au stays on /au. The booking
// popup is deliberately the shared global wizard (see DemoModalHost).
//
// Keep the section list in sync with src/app/page.js.
import dynamic from 'next/dynamic';
import { Header } from '@/components/AU/NSheader';
import NSDeadlineBanner from '@/components/AU/NSDeadlineBanner';
import Home2Hero from '@/components/AU/Home2Hero';
import TrustedByBar from '@/components/TrustedByBar';
import DeferredWidgets, { DeferredSection } from '@/components/AU/DeferredWidgets';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import FloatingTryClassButton from '@/components/FloatingTryClassButton';

// Below-fold components loaded lazily to reduce initial JS bundle
const TestimonialSection   = dynamic(() => import('@/components/AU/NSstudent-testimonial').then(m => ({ default: m.TestimonialSection })));
const USCourseTree         = dynamic(() => import('@/components/AU/USCourseTree'));
const NSClassVideoSection  = dynamic(() => import('@/components/AU/NSClassVideosection'));
const NSChoose             = dynamic(() => import('@/components/AU/NSChoose'));
const TestimonialVideoBoost = dynamic(() => import('@/components/AU/NSAlexVideo'));
const ParentsTestimonialSection = dynamic(() => import('@/components/AU/NSparents-testimonial').then(m => ({ default: m.ParentsTestimonialSection })));
const Review               = dynamic(() => import('@/components/AU/Review'));
const NSAnim               = dynamic(() => import('@/components/AU/NSAnim'));
const NSTeacherTest        = dynamic(() => import('@/components/AU/NSTeacherTest'));
const TeacherCarousel      = dynamic(() => import('@/components/AU/NSTeacherCarousel'));
const FeatureSlider        = dynamic(() => import('@/components/AU/NSFeatures'));
const NSLevelUp            = dynamic(() => import('@/components/AU/NSApp'));
// Redesign sections, sitting between the stats strip and the footer. Shared
// with the global page; the two that link take a locale (see the note above).
const NSWhySheldon         = dynamic(() => import('@/components/NSWhySheldon'));
const NSParentsSaying      = dynamic(() => import('@/components/NSParentsSaying'));
const NSAcademies          = dynamic(() => import('@/components/NSAcademies'));

// Short landing-page FAQ. The long categorised one (AU/NSFAQ) is still used by /au/faq.
const FAQ                  = dynamic(() => import('@/components/NSHomeFAQ'));
const Footer               = dynamic(() => import('@/components/AU/NSfooter').then(m => ({ default: m.Footer })));

export const metadata = {
  title: 'SuperSheldon Australia | Interactive Online Learning for Kids & Students',
  alternates: { canonical: '/au' },
};

export default function AUHome() {
  return (
    <main className="new-home-bg">
      <ScrollProgressBar />
      <NSDeadlineBanner />
      <Header stacked />

      {/* 3D WebGL hero. The iframe has its own scroll that drives the blue-scan
          animation; when it finishes, native scroll chains to this page and the
          sections below come into view. Mounts immediately on page load — see
          Home2Hero. */}
      <Home2Hero />
      <TrustedByBar />

      <TestimonialSection />
      {/* Temporarily removed for landing page redesign preview — from
          Focused Exam Mastery Courses (USCourseTree) through Try our app,
          LevelUp (NSLevelUp / NSApp). Restore by uncommenting. */}
      {/*
      <USCourseTree />
      <NSClassVideoSection />
      <NSChoose />
      <TestimonialVideoBoost />
      <ParentsTestimonialSection />
      <Review />
      <DeferredSection>
        <NSAnim />
      </DeferredSection>
      <DeferredSection>
        <NSTeacherTest />
      </DeferredSection>
      <DeferredSection>
        <FeatureSlider />
      </DeferredSection>
      <DeferredSection>
        <NSLevelUp />
      </DeferredSection>
      */}

      <NSParentsSaying />
      <NSAcademies locale="au" />
      <NSWhySheldon locale="au" />

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
