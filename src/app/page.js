// Landing page (/) — the new SuperSheldon experience.
// This is the same design that previously lived at /home2: the 3D WebGL hero
// (Vue + Three.js, served from /public/home2-hero via iframe) followed by the
// new-design sections. /home2 now redirects here so there is a single canonical
// homepage.
import dynamic from 'next/dynamic';
import { Header } from '@/components/NSheader';
import FloatingArrowWhatsApp from '@/components/ArrowAndWhatsapp';
import NSCookieConsent from '@/components/NSCookieConsent';
import NSDeadlineBanner from '@/components/NSDeadlineBanner';
import ScrollToTop from '@/components/ScrollToTop';
import Home2Hero from '@/components/Home2Hero';

// Below-fold components loaded lazily to reduce initial JS bundle
const TestimonialSection   = dynamic(() => import('@/components/NSstudent-testimonial').then(m => ({ default: m.TestimonialSection })));
const USCourseTree         = dynamic(() => import('@/components/USCourseTree'));
const NSClassVideoSection  = dynamic(() => import('@/components/NSClassVideosection'));
const NSChoose             = dynamic(() => import('@/components/NSChoose'));
const TestimonialVideoBoost = dynamic(() => import('@/components/NSAlexVideo'));
const ParentsTestimonialSection = dynamic(() => import('@/components/NSparents-testimonial').then(m => ({ default: m.ParentsTestimonialSection })));
const Review               = dynamic(() => import('@/components/Review'));
const NSAnim               = dynamic(() => import('@/components/NSAnim'));
const NSTeacherTest        = dynamic(() => import('@/components/NSTeacherTest'));
const TeacherCarousel      = dynamic(() => import('@/components/NSTeacherCarousel'));
const FeatureSlider        = dynamic(() => import('@/components/NSFeatures'));
const NSLevelUp            = dynamic(() => import('@/components/NSApp'));
const FAQ                  = dynamic(() => import('@/components/NSFAQ'));
const PathwayFinderBanner  = dynamic(() => import('@/components/PathwayFinderBanner'));
const Footer               = dynamic(() => import('@/components/NSfooter').then(m => ({ default: m.Footer })));
const NovaChatbot          = dynamic(() => import('@/components/NovaChatbot'));

export const metadata = {
  title: 'SuperSheldon | Interactive Online Learning for Kids & Students',
};

export default function Home() {
  return (
    <main className="new-home-bg">
      <ScrollToTop />
      <NSDeadlineBanner />
      <Header stacked />

      {/* 3D WebGL hero. The iframe has its own scroll that drives the blue-scan
          animation; when it finishes, native scroll chains to this page and the
          sections below come into view. Deferred behind a poster so its ~3MB
          payload doesn't compete with this page's hydration — see Home2Hero. */}
      <Home2Hero />

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
      <PathwayFinderBanner />
      <Footer />

      <NovaChatbot mobileHidden={true} />
      <FloatingArrowWhatsApp side="right" mobileBar={true} />
      <NSCookieConsent />
    </main>
  );
}
