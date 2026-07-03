// /home2 — same layout as /new-home, but the hero is the 3D WebGL scene
// (Vue + Three.js, built from idea_website/portfolio-2025) served from
// /public/home2-hero and embedded in an iframe. Everything below the hero is
// copied from /new-home (minus its <Hero/>). See public/home2-hero/index.html.
import dynamic from 'next/dynamic';
import { Header } from '@/components/NSheader';
import FloatingArrowWhatsApp from '@/components/ArrowAndWhatsapp';
import NSCookieConsent from '@/components/NSCookieConsent';
import NSDeadlineBanner from '@/components/NSDeadlineBanner';
import ScrollToTop from '@/components/ScrollToTop';

// Below-fold components loaded lazily to reduce initial JS bundle (mirrors /new-home)
const TestimonialSection   = dynamic(() => import('@/components/NSstudent-testimonial').then(m => ({ default: m.TestimonialSection })));
const USCourseTree         = dynamic(() => import('@/components/USCourseTree'));
const NSClassVideoSection  = dynamic(() => import('@/components/NSClassVideosection'));
const NSChoose             = dynamic(() => import('@/components/NSChoose'));
const TestimonialVideoBoost = dynamic(() => import('@/components/NSAlexVideo'));
const ParentsTestimonialSection = dynamic(() => import('@/components/NSparents-testimonial').then(m => ({ default: m.ParentsTestimonialSection })));
const Review               = dynamic(() => import('@/components/Review'));
const NSAnim               = dynamic(() => import('@/components/NSAnim'));
const NSTeacherTest        = dynamic(() => import('@/components/NSTeacherTest'));
const TeacherCarousel      = dynamic(() => import('@/components/NSTeachers'));
const FeatureSlider        = dynamic(() => import('@/components/NSFeatures'));
const NSLevelUp            = dynamic(() => import('@/components/NSApp'));
const FAQ                  = dynamic(() => import('@/components/NSFAQ'));
const PathwayFinderBanner  = dynamic(() => import('@/components/PathwayFinderBanner'));
const Footer               = dynamic(() => import('@/components/NSfooter').then(m => ({ default: m.Footer })));
const NovaChatbot          = dynamic(() => import('@/components/NovaChatbot'));

export const metadata = {
  title: 'SuperSheldon | 3D Home',
  // Experimental route — keep out of search results for now.
  robots: { index: false, follow: false },
};

export default function Home2() {
  return (
    <main className="new-home-bg">
      <ScrollToTop />
      <NSDeadlineBanner />
      <Header stacked />

      {/* 3D WebGL hero. The iframe has its own scroll that drives the blue-scan
          animation; when it finishes, native scroll chains to this page and the
          sections below come into view. The rounded bottom + margin give the
          blue scan area a smooth curved edge and a gap before the testimonials. */}
      <section className="relative w-full h-[100svh] bg-[#dfd1bc] overflow-hidden rounded-b-[2rem] md:rounded-b-[3.5rem] mb-10 md:mb-16">
        <iframe
          src="/home2-hero/index.html"
          title="3D Hero Animation"
          className="block h-full w-full border-0"
          allow="autoplay; fullscreen"
        />
      </section>

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
