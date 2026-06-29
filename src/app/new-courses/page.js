// Australian courses listing page. Renders the course listing only
// (stops before the "Experience the Classroom" / NSClassVideoSection section).
import { Header } from '@/components/NSheader';
import { Footer } from '@/components/NSfooter';
import NSCourseMainAU from '@/components/newcourse/NSCourseMainAU';

export const metadata = {
  title: 'Explore Our Australian Courses | SuperSheldon',
};

export default function NewCourses() {
  return (
    <main>
      <Header />
      <NSCourseMainAU />
      <Footer />
    </main>
  );
}
