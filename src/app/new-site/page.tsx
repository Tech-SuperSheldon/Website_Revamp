import { Header } from "@/components/new-site/header";
import { Hero } from "@/components/new-site/hero";
import { Footer } from "@/components/new-site/footer";
import { ParentsTestimonialSection } from "@/components/new-site/parents-testimonial";
import  ProcessFlow from "@/components/new-site/process-flow";
import { TestimonialSection } from "@/components/new-site/student-testimonial";
import NewExamCourses from "@/components/new-site/new-exam-courses";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />
      <Hero />
      <TestimonialSection/>
      {/* <ProcessFlow /> */}
      <NewExamCourses />
      <ParentsTestimonialSection />
      <Footer />
    </main>
  );
}
