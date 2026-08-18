// FAQ page. Same shell as /new-courses & /new-blogs (Header + body +
// PathwayFinderBanner + Footer). Body reuses the shared faqSections content.
import { Header } from '@/components/AU/NSheader';
import { Footer } from '@/components/AU/NSfooter';
import NSFaqMain from '@/components/AU/newfaq/NSFaqMain';
import PathwayFinderBanner from '@/components/AU/PathwayFinderBanner';

export const metadata = {
  title: 'Frequently Asked Questions | SuperSheldon',
  description:
    'Answers to common questions about SuperSheldon online classes, teachers, scheduling, privacy, and exam preparation for NAPLAN, ICAS, Selective School, and HSC.',
};

export default function FaqPage() {
  return (
    <main>
      <Header />
      <NSFaqMain />
      <PathwayFinderBanner />
      <Footer />
    </main>
  );
}
