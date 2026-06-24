// Preview route: us-website courses page DESIGN, copied up to the course listing only.
// Mirrors website1/us-website src/app/courses/page.tsx but stops before the
// "Experience the Classroom" (NSClassVideoSection) section and everything below it.
import { Header } from '@/components/NSheader';
import NSCourseMainUS from '@/components/newcourse/NSCourseMainUS';

export const metadata = {
  title: 'Explore Our US Courses | SuperSheldon',
};

export default function NewCourses() {
  return (
    <main>
      <Header />
      <NSCourseMainUS />
    </main>
  );
}
