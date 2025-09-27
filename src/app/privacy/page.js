import PrivacyPolicy from "@/components/legal/privacy";
import Header from "@/components/HeroHeaderNav";
import Footer from "@/components/Footer";


export default function PrivacyPage() {
  return (
    <div className="w-full h-screen">
      {/* <h1 className="text-2xl font-bold p-4">Privacy Policy</h1>
      <iframe
        src="/Files/Privacy.pdf"
        width="100%"
        height="90%"
        className="border-none"
      /> */}
      <Header/>
      
      <PrivacyPolicy/>

      <Footer/>
    </div>
  );
}
