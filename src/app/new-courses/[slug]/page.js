// Course detail page for /new-courses/[slug] (Australian programs).
// The detail component ends after Pricing (no "Experience the Classroom" /
// Features / Teacher / FAQ sections), consistent with the listing page.
import { Header } from '@/components/NSheader';
import NSCourseDetailAU from '@/components/newcourse/NSCourseDetailAU';

export default async function CourseDetailPage({ params }) {
  const { slug } = await params;
  return (
    <main>
      <Header />
      <NSCourseDetailAU courseId={slug} />
    </main>
  );
}
