// Preview route: us-website home DESIGN with revamp CONTENT.
// Section order mirrors website1/us-website page.tsx, with revamp extras folded in.
import dynamic from 'next/dynamic';
import { Header } from '@/components/NSheader';
import { Hero } from '@/components/NShero';
import NovaChatbot from '@/components/NovaChatbot';

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
const TeacherCarousel      = dynamic(() => import('@/components/NSTeachers'));
const FeatureSlider        = dynamic(() => import('@/components/NSFeatures'));
const NSLevelUp            = dynamic(() => import('@/components/NSApp'));
const FAQ                  = dynamic(() => import('@/components/NSFAQ'));
const Footer               = dynamic(() => import('@/components/NSfooter').then(m => ({ default: m.Footer })));

export const metadata = {
  title: 'SuperSheldon | Interactive Online Learning for Kids & Students',
};

export default function NewHome() {
  return (
    <main className="new-home-bg">
      <Header />
      <Hero />
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
      <NovaChatbot />
    </main>
  );
}
