import { Navbar } from "@/components/layout/navbar";
import { CategoriesMarquee } from "@/components/layout/sections/CategoriesMarquee";
import { Community } from "@/components/layout/sections/community";
import { FeaturesSection } from "@/components/layout/sections/features";
import { Footer } from "@/components/layout/sections/footer";
import { Hero } from "@/components/layout/sections/hero";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Navbar />
      <Hero />
      <CategoriesMarquee />
      <FeaturesSection />
      <Community />
      <Footer />
    </main>
  );
}
