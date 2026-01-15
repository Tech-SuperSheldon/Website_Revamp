import { Header } from "@/components/new-site/header";
import { Hero } from "@/components/new-site/hero";
import { Footer } from "@/components/new-site/footer";
import { TestimonialSection } from "@/components/new-site/testimonial-section";
import  ProcessFlow from "@/components/new-site/process-flow";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />
      <Hero />
      <TestimonialSection />
      <ProcessFlow />
      <Footer />
    </main>
  );
}
