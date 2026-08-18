import { Header } from "@/components/AU/NSheader";
import { Footer } from "@/components/AU/NSfooter";
import NSReviewsUS from "@/components/AU/newreview/NSReviewsUS";
import PathwayFinderBanner from "@/components/AU/PathwayFinderBanner";

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
