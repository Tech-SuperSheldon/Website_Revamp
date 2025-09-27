import Header from "@/components/HeroHeaderNav";
import Footer from "@/components/Footer";
import FloatingArrowWhatsApp from "@/components/ArrowAndWhatsapp";
import RecentPost from "@/components/blog comps/RecentPosts";
import BlogList from "@/components/blog comps/BlogList";



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