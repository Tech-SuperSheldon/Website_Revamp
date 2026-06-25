import { Header } from "@/components/new-site/NSheader";
import { Footer } from "@/components/new-site/NSfooter";
import NSReviewsUS from "@/components/newreview/NSReviewsUS";

export const metadata = {
  title: "Testimonials | SuperSheldon",
};

export default function NewTestimonial() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />
      <NSReviewsUS />
      <Footer />
    </main>
  );
}
