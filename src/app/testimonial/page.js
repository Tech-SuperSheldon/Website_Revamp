import ReviewsSection from "@/components/testimonial comps/ReviewsSections";
import { Header } from "@/components/NSheader";
import Footer from "@/components/Footer";
import FloatingArrowWhatsApp from "@/components/ArrowAndWhatsapp";
export default function Home() {
  return (
    <>
    <Header/>
      <ReviewsSection />
    <Footer/> 
    <FloatingArrowWhatsApp/>

      
    </>
  );
}