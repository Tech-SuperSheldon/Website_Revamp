// Course detail page for /new-courses/[slug] (Australian programs).
// The detail component ends after Pricing (no "Experience the Classroom" /
// Features / Teacher / FAQ sections), consistent with the listing page.
import { Header } from '@/components/NSheader';
import { Footer } from '@/components/NSfooter';
import NSCourseDetailAU from '@/components/newcourse/NSCourseDetailAU';

async function getUploadedBrochureUrl(courseId) {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.supersheldon.com';
    const res = await fetch(`${base}/api/courses`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    const course = (data.data ?? []).find(
      (c) => c.legacy_course_id === courseId || c.id === courseId
    );
    if (!course || course.status !== 'active') return null;
    return course.brochure_url || null;
  } catch {
    return null;
  }
}

export default async function CourseDetailPage({ params }) {
  const { slug } = await params;
  const uploadedBrochureUrl = await getUploadedBrochureUrl(slug);

  return (
    <main>
      <Header />
      <NSCourseDetailAU courseId={slug} uploadedBrochureUrl={uploadedBrochureUrl} />
      <Footer />
    </main>
  );
}
