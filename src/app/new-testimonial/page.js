import { Header } from "@/components/NSheader";
import { Footer } from "@/components/NSfooter";
import NSReviewsUS from "@/components/newreview/NSReviewsUS";
import PathwayFinderBanner from "@/components/PathwayFinderBanner";

export const metadata = {
  title: "Testimonials | SuperSheldon",
};

export default function NewTestimonial() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />
      <NSReviewsUS />
      <PathwayFinderBanner />
      <Footer />
    </main>
  );
}
