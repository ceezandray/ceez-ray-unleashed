import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CharactersSection from "@/components/CharactersSection";
import EpisodesSection from "@/components/EpisodesSection";
import SceneGallery from "@/components/SceneGallery";
import ShopCTA from "@/components/ShopCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <CharactersSection />
      <SceneGallery />
      <EpisodesSection />
      <ShopCTA />
      <Footer />
    </div>
  );
};

export default Index;
