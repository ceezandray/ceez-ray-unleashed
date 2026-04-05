import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useMusic } from "@/context/MusicContext";
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
  const { hasChosen, chooseMusic } = useMusic();

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <HeroSection />
      <CastSection />
      <LatestEpisodes />
      <FeaturedApparel />
      <TheTeam />
      <MediaPress />
      <NeverMissEpisode />
      <Footer />

      {/* Music Choice Popup */}
      <AnimatePresence>
        {!hasChosen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-black border border-white/10 rounded-xl overflow-hidden max-w-md w-full"
            >
              <div className="w-full h-48 md:h-56 overflow-hidden">
                <img
                  src="/images/music-popup.gif"
                  alt="Ceez & Ray"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="p-6 md:p-8 flex flex-col items-center gap-4">
                <h2 className="text-lg md:text-xl font-heading tracking-wider text-white text-center">
                  MUSIC ON OR OFF?
                </h2>
                <p className="text-white/50 font-body text-xs md:text-sm text-center">
                  Experience the site with our original soundtrack
                </p>

                <div className="flex gap-3 mt-2 w-full">
                  <button
                    onClick={() => chooseMusic(true)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded font-heading tracking-wider text-sm text-white transition-colors uppercase"
                    style={{ background: '#990000' }}
                  >
                    <Volume2 className="w-4 h-4" />
                    TURN IT UP
                  </button>
                  <button
                    onClick={() => chooseMusic(false)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded font-heading tracking-wider text-sm text-white/60 border border-white/10 hover:border-white/30 transition-colors uppercase"
                  >
                    <VolumeX className="w-4 h-4" />
                    NAH, I'M GOOD
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
