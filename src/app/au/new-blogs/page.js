import Header from "@/components/AU/HeroHeaderNav";
import { Footer } from "@/components/AU/NSfooter";
import FloatingArrowWhatsApp from "@/components/AU/ArrowAndWhatsapp";
import NSBlogMainUS from "@/components/AU/newblog/NSBlogMainUS";
import PathwayFinderBanner from "@/components/AU/PathwayFinderBanner";

export default function NewBlogs() {
    return (
        <div>
            <Header />

            <main>
                <NSBlogMainUS />
            </main>

            <PathwayFinderBanner />
            <Footer />
            <FloatingArrowWhatsApp />
        </div>
    );
}
