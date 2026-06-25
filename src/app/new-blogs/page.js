import Header from "@/components/HeroHeaderNav";
import Footer from "@/components/Footer";
import FloatingArrowWhatsApp from "@/components/ArrowAndWhatsapp";
import NSBlogMainUS from "@/components/newblog/NSBlogMainUS";

export default function NewBlogs() {
    return (
        <div>
            <Header />

            <main>
                <NSBlogMainUS />
            </main>

            <Footer />
            <FloatingArrowWhatsApp />
        </div>
    );
}
