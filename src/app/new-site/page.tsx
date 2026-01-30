import { Header } from "@/components/new-site/NSheader";
import { Hero } from "@/components/new-site/NShero";
import { Footer } from "@/components/new-site/NSfooter";
import { ParentsTestimonialSection } from "@/components/new-site/NSparents-testimonial";
import  ProcessFlow from "@/components/new-site/NSprocess-flow";
import { TestimonialSection } from "@/components/new-site/NSstudent-testimonial";
import NSClassVideoSection from "@/components/new-site/NSClassVideosection";
import NewExamCourses from "@/components/new-site/NSnew-exam-courses";
import NSTeacherCarousel from "@/components/new-site/NSTeacherCarousel";

import NSTeacherTest from "@/components/new-site/NSTeacherTest";
export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />
      <Hero />
      <TestimonialSection/>
      <NSClassVideoSection />
      {/* <ProcessFlow /> */}
      <NewExamCourses />
      <ParentsTestimonialSection />
      <NSTeacherTest/>
      <NSTeacherCarousel />
      <Footer />
    </main>
  );
}
