import { Header } from "@/components/new-site/header";
import { Hero } from "@/components/new-site/hero";
import { Footer } from "@/components/new-site/footer";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />
      <Hero />
      <Footer />
    </main>
  );
}
