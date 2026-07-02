import Header from "@/components/HeroHeaderNav";
import { Footer } from "@/components/NSfooter";
import FloatingArrowWhatsApp from "@/components/ArrowAndWhatsapp";
import NSBlogMainUS from "@/components/newblog/NSBlogMainUS";
import PathwayFinderBanner from "@/components/PathwayFinderBanner";

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
