// Australian courses listing page. Renders the course listing only
// (stops before the "Experience the Classroom" / NSClassVideoSection section).
import { Header } from '@/components/NSheader';
import { Footer } from '@/components/NSfooter';
import NSCourseMainAU from '@/components/newcourse/NSCourseMainAU';
import PathwayFinderBanner from '@/components/PathwayFinderBanner';

export const metadata = {
  title: 'Explore Our Australian Courses | SuperSheldon',
};

// Fetched server-side so the course grid (and its thumbnails) can render on
// first paint instead of waiting on a client-side useEffect fetch after
// hydration. Falls back to null on failure so NSCourseMainAU's own
// client-side fetch kicks in as a safety net.
async function getCourses() {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.supersheldon.com';
    const res = await fetch(`${base}/api/courses`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data ?? null;
  } catch {
    return null;
  }
}

export default async function NewCourses() {
  const initialCourses = await getCourses();

  return (
    <main>
      <Header />
      <NSCourseMainAU initialCourses={initialCourses} />
      <PathwayFinderBanner />
      <Footer />
    </main>
  );
}
