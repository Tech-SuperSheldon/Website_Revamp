import Header from "@/components/AU/HeroHeaderNav";
import Footer from "@/components/AU/Footer";
import FloatingArrowWhatsApp from "@/components/AU/ArrowAndWhatsapp";
import RecentPost from "@/components/AU/blog comps/RecentPosts";
import BlogList from "@/components/AU/blog comps/BlogList";



export default function Blogs() {
    return (
        <div>
            <Header />

            <RecentPost/>

            <BlogList/>

            <Footer />
            <FloatingArrowWhatsApp/>
        </div>
    );
}