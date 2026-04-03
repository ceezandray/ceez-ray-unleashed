import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CastSection from "@/components/CastSection";
import LatestEpisodes from "@/components/LatestEpisodes";
import FeaturedApparel from "@/components/FeaturedApparel";
import TheTeam from "@/components/TheTeam";
import MediaPress from "@/components/MediaPress";
import NeverMissEpisode from "@/components/NeverMissEpisode";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <HeroSection />
      <CastSection />
      <LatestEpisodes />
      <FeaturedApparel />
      <TheTeam />
      <MediaPress />
      <RepTheCulture />
      <Footer />
    </div>
  );
};

export default Index;