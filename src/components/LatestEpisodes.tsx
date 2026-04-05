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

        {/* Featured Free Episode - Large Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group cursor-pointer mb-8"
        >
          <div className="relative overflow-hidden aspect-[21/9] border border-border/30">
            <img
              src={episodes[0].thumbnail}
              alt={episodes[0].title}
              className="w-full h-full object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

            {/* Free badge */}
            <div className="absolute top-4 left-4 bg-primary px-3 py-1 flex items-center gap-1.5">
              <Play className="w-3 h-3 text-white fill-white" />
              <span className="font-heading text-[11px] tracking-wider text-white">FREE EPISODE</span>
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 p-6 md:p-10 max-w-lg">
              <p className="font-heading text-xs tracking-[0.2em] text-accent mb-2">{episodes[0].number}</p>
              <h4 className="font-heading text-3xl md:text-4xl text-foreground mb-2">
                {episodes[0].title}
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {episodes[0].description}
              </p>
              <div className="inline-flex items-center gap-2 font-heading text-xs tracking-wider px-5 py-2.5 bg-primary text-white hover:bg-primary/80 transition-all">
                <Play className="w-3.5 h-3.5 fill-white" />
                WATCH NOW
              </div>
            </div>

            {/* Duration */}
            <span className="absolute bottom-4 right-4 bg-background/80 text-foreground text-xs px-2 py-0.5 font-heading">
              {episodes[0].duration}
            </span>

            {episodes[0].progress && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                <div className="h-full bg-primary" style={{ width: `${episodes[0].progress}%` }} />
              </div>
            )}
          </div>
        </motion.div>

        {/* Locked Episodes Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {episodes.slice(1).map((ep, i) => (
            <motion.div
              key={ep.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group cursor-pointer"
              onClick={() => handleLockedClick(ep.title)}
            >
              <div className="relative overflow-hidden mb-3 aspect-[4/3] border border-border/20">
                <img
                  src={ep.thumbnail}
                  alt={ep.title}
                  className="w-full h-full object-cover object-[center_35%] grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark locked overlay */}
                <div className="absolute inset-0 bg-background/75 group-hover:bg-background/60 transition-all duration-300 flex flex-col items-center justify-center gap-2">
                  <div className="w-10 h-10 rounded-full border border-primary/40 flex items-center justify-center group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                    <Lock className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-heading text-[9px] tracking-[0.2em] text-primary/80 group-hover:text-primary transition-colors">
                    ACCESS PASS
                  </span>
                </div>

                {/* Duration badge */}
                <span className="absolute bottom-2 right-2 bg-background/80 text-foreground text-[10px] px-1.5 py-0.5 font-heading">
                  {ep.duration}
                </span>
              </div>
              <p className="font-heading text-[10px] tracking-wider text-muted-foreground mb-0.5">{ep.number}</p>
              <h4 className="font-heading text-sm text-foreground mb-0.5 group-hover:text-primary transition-colors">
                {ep.title}
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">{ep.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Access Pass Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 border border-primary/20 bg-primary/5 p-6 flex flex-col md:flex-row items-center justify-between gap-4 cursor-pointer hover:border-primary/40 transition-colors"
          onClick={() => {
            setSelectedEpisode(null);
            setShowPaywall(true);
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-heading text-lg text-foreground">
                SEASON 1 ACCESS PASS
              </h4>
              <p className="text-muted-foreground text-xs">
                Unlock all 6 episodes · Save over 50% vs buying individually
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="font-heading text-2xl text-primary">$14.99</span>
              <p className="text-muted-foreground text-[10px] line-through">$17.94 if bought separately</p>
            </div>
            <button className="font-heading text-xs tracking-wider px-6 py-3 bg-primary text-white hover:bg-primary/80 transition-all whitespace-nowrap">
              GET ACCESS
            </button>
          </div>
        </motion.div>
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
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-2xl text-foreground mb-1">
                  {selectedEpisode
                    ? `UNLOCK "${selectedEpisode.toUpperCase()}"`
                    : "UNLOCK SEASON 1"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  Choose how you want to watch
                </p>
              </div>

              {/* Single Episode Option */}
              {selectedEpisode && (
                <div className="border border-border p-5 mb-3 hover:border-primary/50 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-heading text-sm text-foreground">THIS EPISODE</h4>
                    <span className="font-heading text-xl text-foreground">$2.99</span>
                  </div>
                  <p className="text-muted-foreground text-xs mb-3">
                    Unlock this episode only
                  </p>
                  <button className="w-full font-heading text-xs tracking-wider py-3 border border-primary/30 text-primary hover:bg-primary hover:text-white transition-all duration-300">
                    BUY EPISODE — $2.99
                  </button>
                </div>
              )}

              {/* Access Pass Option */}
              <div className="border border-primary/50 p-5 relative hover:border-primary transition-colors cursor-pointer bg-primary/5">
                <div className="absolute -top-3 left-4 bg-primary px-3 py-0.5">
                  <span className="font-heading text-[10px] tracking-wider text-white">BEST VALUE</span>
                </div>
                <div className="flex items-center justify-between mb-2 mt-1">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <h4 className="font-heading text-sm text-foreground">ACCESS PASS</h4>
                  </div>
                  <span className="font-heading text-xl text-primary">$14.99</span>
                </div>
                <p className="text-muted-foreground text-xs mb-3">
                  Unlock all Season 1 episodes · Save over 50%
                </p>
                <button className="w-full font-heading text-xs tracking-wider py-3 bg-primary text-white hover:bg-primary/80 transition-all duration-300">
                  GET ACCESS PASS — $14.99
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 mt-5">
                <img src="https://img.icons8.com/color/48/stripe.png" alt="Stripe" className="h-6 opacity-50" />
                <img src="https://img.icons8.com/color/48/paypal.png" alt="PayPal" className="h-6 opacity-50" />
              </div>
              <p className="text-center text-muted-foreground text-[10px] mt-2 tracking-wider">
                SECURE CHECKOUT · INSTANT ACCESS
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LatestEpisodes;
