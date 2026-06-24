// Course detail page for /new-courses/[slug] (US programs).
// Mirrors website1/us-website src/app/courses/[slug]/page.tsx, but the detail
// component is trimmed to end after Pricing (no "Experience the Classroom" /
// Features / Teacher / FAQ sections), consistent with the listing page.
import { Header } from '@/components/NSheader';
import NSCourseDetailUS from '@/components/newcourse/NSCourseDetailUS';

export default async function CourseDetailPage({ params }) {
  const { slug } = await params;
  return (
    <main>
      <Header />
      <NSCourseDetailUS courseId={slug} />
    </main>
  );
}
