// UK course detail page for /uk/new-courses/[slug]. No CRM brochure lookup
// (unlike the AU detail route) since UK courses have no CRM-uploaded
// brochures yet — the download button always falls back to generating a PDF
// client-side from the hardcoded course data.
import { Header } from '@/components/UKHome/UKHomeHeader';
import { Footer } from '@/components/UKHome/UKHomeFooter';
import UKCourseDetail from '@/components/newcourseUK/UKCourseDetail';

export default async function UKCourseDetailPage({ params }) {
  const { slug } = await params;

  return (
    <main>
      <Header />
      <UKCourseDetail courseId={slug} />
      <Footer />
    </main>
  );
}
