import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Lock, X, Shield } from "lucide-react";

const episodes = [
  {
    number: "EP 01",
    title: "Joe's Bodega",
    description: "It all started with smoothie, banana bread, and a very bad decision.",
    thumbnail: "/images/ep-bodega-incident.png",
    duration: "12:34",
    free: true,
    progress: 30,
  },
  {
    number: "EP 02",
    title: "The Big Arrest",
    description: "When the law catches up, Ceez and Ray handle it... differently.",
    thumbnail: "/images/ep-thearrest.jpg",
    duration: "14:22",
    free: false,
  },
  {
    number: "EP 03",
    title: "The Mugshot",
    description: "One mugshot goes viral. The other goes missing.",
    thumbnail: "/images/ep-mugshot.png",
    duration: "11:48",
    free: false,
  },
  {
    number: "EP 04",
    title: "The Courtroom",
    description: "Ray represents himself. Ceez considers witness protection.",
    thumbnail: "/images/ep-courtroom.png",
    duration: "15:10",
    free: false,
  },
  {
    number: "EP 05",
    title: "The Plan",
    description: "Every great escape starts with a terrible plan.",
    thumbnail: "/images/ep-the-plan.webp",
    duration: "Coming Soon",
    free: false,
  },
  {
    number: "EP 06",
    title: "The Food Fight",
    description: "Kitchen duty was supposed to be the easy gig.",
    thumbnail: "/images/ep-food-fight.webp",
    duration: "Coming Soon",
    free: false,
  },
];

const LatestEpisodes = () => {
  const [showPaywall, setShowPaywall] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);

  const handleLockedClick = (epTitle: string) => {
    setSelectedEpisode(epTitle);
    setShowPaywall(true);
  };

  return (
    <section id="episodes" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2 className="font-heading text-sm tracking-[0.3em] text-foreground mb-4">
              SEASON ONE
            </h2>
            <h3 className="font-heading text-4xl md:text-5xl text-primary">
              LATEST <span className="text-glow-red">EPISODES</span>
            </h3>
          </div>
          <a
            href="#"
            className="hidden md:block font-heading text-xs tracking-wider text-accent hover:text-primary transition-colors"
          >
            VIEW ALL →
          </a>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {episodes.map((ep, i) => (
            <motion.div
              key={ep.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group cursor-pointer"
              onClick={() => !ep.free && handleLockedClick(ep.title)}
            >
              <div className="relative overflow-hidden mb-3 aspect-video">
                <img
                  src={ep.thumbnail}
                  alt={ep.title}
                  className="w-full h-full object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {ep.free ? (
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-background/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ background: 'rgba(153,0,0,0.7)' }}>
                      <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-background/70 flex flex-col items-center justify-center gap-2">
                    <Lock className="w-8 h-8 text-primary" />
                    <span className="font-heading text-[11px] tracking-wider text-primary">UNLOCK WITH ACCESS PASS</span>
                  </div>
                )}

                {ep.free && (
                  <div className="absolute top-2 left-2 bg-primary/90 px-2 py-0.5">
                    <span className="font-heading text-[10px] tracking-wider text-white">FREE</span>
                  </div>
                )}

                {ep.progress && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <div className="h-full bg-primary" style={{ width: `${ep.progress}%` }} />
                  </div>
                )}

                <span className="absolute bottom-2 right-2 bg-background/80 text-foreground text-xs px-2 py-0.5 font-heading">
                  {ep.duration}
                </span>
              </div>
              <p className="font-heading text-xs tracking-wider text-foreground mb-1">{ep.number}</p>
              <h4 className="font-heading text-lg text-primary mb-1 group-hover:text-primary/80 transition-colors">
                {ep.title}
              </h4>
              <p className="text-foreground text-sm">{ep.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Paywall Modal */}
      <AnimatePresence>
        {showPaywall && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4"
            onClick={() => setShowPaywall(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-card border border-border p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPaywall(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <Lock className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-heading text-2xl text-foreground mb-1">
                  UNLOCK "{selectedEpisode?.toUpperCase()}"
                </h3>
                <p className="text-muted-foreground text-sm">
                  Choose how you want to watch
                </p>
              </div>

              {/* Single Episode */}
              <div className="border border-border p-4 mb-3 hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-heading text-sm text-foreground">THIS EPISODE</h4>
                  <span className="font-heading text-xl text-primary">$2.99</span>
                </div>
                <p className="text-muted-foreground text-xs">
                  Unlock this episode only
                </p>
                <button className="w-full mt-3 font-heading text-xs tracking-wider py-2.5 bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-white transition-all duration-300">
                  BUY EPISODE — $2.99
                </button>
              </div>

              {/* Access Pass */}
              <div className="border border-primary/50 p-4 relative hover:border-primary transition-colors cursor-pointer bg-primary/5">
                <div className="absolute -top-3 left-4 bg-primary px-3 py-0.5">
                  <span className="font-heading text-[10px] tracking-wider text-white">BEST VALUE</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <h4 className="font-heading text-sm text-foreground">ACCESS PASS</h4>
                  </div>
                  <span className="font-heading text-xl text-primary">$14.99</span>
                </div>
                <p className="text-muted-foreground text-xs">
                  Unlock all Season 1 episodes — save over 50%
                </p>
                <button className="w-full mt-3 font-heading text-xs tracking-wider py-2.5 bg-primary text-white hover:bg-primary/80 transition-all duration-300">
                  GET ACCESS PASS — $14.99
                </button>
              </div>

              <p className="text-center text-muted-foreground text-[10px] mt-4 tracking-wider">
                SECURE CHECKOUT · STRIPE & PAYPAL ACCEPTED
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LatestEpisodes;
