// Landing page (/) — the new SuperSheldon experience.
// This is the same design that previously lived at /home2: the 3D WebGL hero
// (Vue + Three.js, served from /public/home2-hero via iframe) followed by the
// new-design sections. /home2 now redirects here so there is a single canonical
// homepage.
import dynamic from 'next/dynamic';
import { Header } from '@/components/AU/NSheader';
import NSDeadlineBanner from '@/components/AU/NSDeadlineBanner';
import Home2Hero from '@/components/AU/Home2Hero';
import DeferredWidgets, { DeferredSection } from '@/components/AU/DeferredWidgets';

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
const FAQ                  = dynamic(() => import('@/components/AU/NSFAQ'));
const PathwayFinderBanner  = dynamic(() => import('@/components/AU/PathwayFinderBanner'));
const Footer               = dynamic(() => import('@/components/AU/NSfooter').then(m => ({ default: m.Footer })));

export const metadata = {
  title: 'SuperSheldon | Interactive Online Learning for Kids & Students',
};

export default function Home() {
  return (
    <main className="new-home-bg">
      <NSDeadlineBanner />
      <Header stacked />

      {/* 3D WebGL hero. The iframe has its own scroll that drives the blue-scan
          animation; when it finishes, native scroll chains to this page and the
          sections below come into view. Mounts immediately on page load — see
          Home2Hero. */}
      <Home2Hero />

      <TestimonialSection />
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
        <TeacherCarousel />
      </DeferredSection>
      <DeferredSection>
        <FeatureSlider />
      </DeferredSection>
      <DeferredSection>
        <NSLevelUp />
      </DeferredSection>
      <DeferredSection>
        <FAQ />
      </DeferredSection>
      <DeferredSection>
        <PathwayFinderBanner />
      </DeferredSection>
      <DeferredSection>
        <Footer />
      </DeferredSection>

      <DeferredWidgets mobileHidden={true} side="right" mobileBar={true} />
    </main>
  );
}
