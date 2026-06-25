import { Header } from "@/components/new-site/NSheader";
import { Footer } from "@/components/new-site/NSfooter";
import ReviewsSection from "@/components/new-site/NSReviewsSection";

export const metadata = {
  title: "Testimonials | SuperSheldon",
};

export default function NewTestimonial() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />
      <ReviewsSection />
      <Footer />
    </main>
  );
}
