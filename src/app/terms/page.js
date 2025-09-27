import TermsOfService from "@/components/legal/termsofservices";
import Header from "@/components/HeroHeaderNav";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="w-full h-screen">
      {/* <h1 className="text-2xl font-bold p-4">Terms of Service</h1>
      <iframe
        src="/Files/Term.pdf"
        width="100%"
        height="90%"
        className="border-none"
      /> */}
      <Header/>
      <TermsOfService/>
      <Footer/>

    </div>
  );
}
