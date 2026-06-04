import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X } from "lucide-react";

const HeroSection = () => {
  const [showNotify, setShowNotify] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setShowNotify(false);
        setSubmitted(false);
        setEmail("");
      }, 2500);
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <video
          src="/images/hero-video.mov"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative z-[2] container mx-auto px-6 pb-24 pt-40">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-2xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-heading text-xs tracking-[0.3em] text-foreground mb-4"
          >
            A BLACK PICKET FENCE ENT. ORIGINAL
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-3 leading-tight">
              CEEZ & RAY — <span className="text-primary text-glow-red">Season 1 Coming Soon</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg"
          >
            One gorilla. One pigeon. One bodega incident that changes everything.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="flex gap-4 flex-wrap"
          >
            <button
              onClick={() => setShowNotify(true)}
              className="font-heading tracking-wider px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 text-sm animate-pulse-glow inline-flex items-center gap-2"
            >
              <Bell className="w-4 h-4" />
              Get Exclusive Access
            </button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[2]"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-1"
        >
          <div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showNotify && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowNotify(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-card border border-border rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl"
            >
              <button
                onClick={() => setShowNotify(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-2xl text-foreground mb-2">NEVER MISS AN EPISODE</h3>
                <p className="text-muted-foreground text-sm">Get notified when new episodes drop. No spam, just heat.</p>
              </div>

              {submitted ? (
                <div className="text-center py-4">
                  <div className="text-primary font-heading text-lg mb-1">YOU'RE IN! 🔥</div>
                  <p className="text-muted-foreground text-sm">We'll hit your inbox when the next episode drops.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm outline-none focus:border-primary placeholder:text-muted-foreground"
                  />
                  <button
                    type="submit"
                    className="w-full font-heading tracking-wider py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-sm rounded-lg"
                  >
                    NOTIFY ME
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
