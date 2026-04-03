import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
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
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  useEffect(() => {
    const popupTimer = setTimeout(() => setShowNewsletter(true), 3000);
    return () => clearTimeout(popupTimer);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubmitted(true);
    setNewsletterEmail("");
    setTimeout(() => {
      setNewsletterSubmitted(false);
      setShowNewsletter(false);
    }, 2500);
  };

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

      {/* Newsletter Popup */}
      <AnimatePresence>
        {showNewsletter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowNewsletter(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-black border border-white/10 rounded-xl overflow-hidden max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowNewsletter(false)}
                className="absolute top-3 right-3 z-10 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full h-56 md:h-64 overflow-hidden">
                <img
                  src="/images/ceez-ray-gorilla.png"
                  alt="Ceez & Ray"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="p-6 md:p-8 flex flex-col items-center gap-4">
                <h2 className="text-lg md:text-xl font-heading tracking-wider text-white text-center">
                  JOIN THE MOVEMENT
                </h2>
                <p className="text-white/50 font-body text-xs md:text-sm text-center">
                  Get exclusive updates, behind-the-scenes content, and early access drops straight to your inbox.
                </p>

                {newsletterSubmitted ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-primary font-body text-sm py-3"
                  >
                    Welcome to the family! 🔥
                  </motion.p>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="w-full flex gap-2 mt-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 text-white text-sm px-4 py-3 rounded focus:outline-none focus:border-primary font-body placeholder:text-white/30"
                      required
                    />
                    <button
                      type="submit"
                      className="text-white text-xs font-heading tracking-wider px-5 py-3 rounded transition-colors uppercase whitespace-nowrap"
                      style={{ background: '#990000' }}
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
