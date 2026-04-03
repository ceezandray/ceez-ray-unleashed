import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CastSection from "@/components/CastSection";
import LatestEpisodes from "@/components/LatestEpisodes";
import FeaturedApparel from "@/components/FeaturedApparel";
import TheTeam from "@/components/TheTeam";
import MediaPress from "@/components/MediaPress";
import RepTheCulture from "@/components/RepTheCulture";
import Footer from "@/components/Footer";

const Index = () => {
  const [fenceUp, setFenceUp] = useState(false);

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

      {/* Black Fence - fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
        <AnimatePresence>
          {fenceUp && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 120 }}
              className="w-full"
            >
              <img
                src="/images/black-fence.png"
                alt="Black Picket Fence"
                className="w-full h-auto object-cover"
                style={{ imageRendering: "auto" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fence peek - always visible at very bottom */}
      {!fenceUp && (
        <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
          <img
            src="/images/black-fence.png"
            alt=""
            className="w-full h-auto object-cover"
            style={{ transform: "translateY(75%)" }}
          />
        </div>
      )}

      {/* Fence toggle tab */}
      <button
        onClick={() => setFenceUp(!fenceUp)}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 px-3 py-2 bg-card/90 backdrop-blur-sm border border-border rounded-lg text-xs font-heading tracking-wider text-foreground hover:text-primary hover:border-primary transition-all shadow-lg"
      >
        <motion.div
          animate={{ rotate: fenceUp ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronUp size={14} />
        </motion.div>
        {fenceUp ? "LOWER FENCE" : "RAISE FENCE"}
      </button>
    </div>
  );
};

export default Index;
