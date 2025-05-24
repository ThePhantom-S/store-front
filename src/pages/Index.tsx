
import { Hero } from "@/components/Hero";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { AboutSection } from "@/components/AboutSection";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <Hero />
      <FeaturedProducts />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
