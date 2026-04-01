import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const HeroSection = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setShowSignup(false);
        setSubmitted(false);
        setEmail("");
      }, 2000);
    }
  };

  return (
    <>
      <section id="home" className="relative min-h-screen flex items-end overflow-hidden">
        {/* Full-bleed background */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-ferris.jpg"
            alt="Ceez and Ray"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-6 pb-24 pt-40">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-2xl"
          >
            <motion.img
              src="/images/ceezandray-logo.png"
              alt="CEEZ & RAY"
              className="w-full max-w-md mb-6 drop-shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="font-heading text-xs tracking-[0.3em] text-primary mb-4"
            >
              A BLACK PICKET FENCE ENTERTAINMENT ORIGINAL
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg"
            >
              A first-of-its-kind AI-generated comedy series following two wildly
              mismatched cellmates across the most absurd corners of the world.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="flex gap-4 flex-wrap"
            >
              <button
                onClick={() => setShowSignup(true)}
                className="font-heading tracking-wider px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 text-sm animate-pulse-glow"
              >
                NEVER MISS AN EPISODE
              </button>
              <a
                href="#episodes"
                className="font-heading tracking-wider px-8 py-4 border border-accent/40 text-accent hover:bg-accent/10 transition-all duration-300 text-sm"
              >
                WATCH NOW
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-8 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-1"
          >
            <div className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Email Signup Modal */}
      <AnimatePresence>
        {showSignup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm px-4"
            onClick={() => setShowSignup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-card border border-border p-8"
            >
              <button
                onClick={() => setShowSignup(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X size={20} />
              </button>

              {!submitted ? (
                <>
                  <h3 className="font-heading text-2xl text-foreground mb-2">
                    NEVER MISS AN EPISODE
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Join the crew. Get episode drops, exclusive content, and merch alerts straight to your inbox.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none text-sm"
                    />
                    <button
                      type="submit"
                      className="w-full font-heading tracking-wider py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-sm"
                    >
                      SIGN ME UP
                    </button>
                  </form>
                  <p className="text-muted-foreground/60 text-xs mt-4 text-center">
                    No spam. Unsubscribe anytime.
                  </p>
                </>
              ) : (
                <div className="text-center py-4">
                  <h3 className="font-heading text-2xl text-primary mb-2">YOU'RE IN 🔥</h3>
                  <p className="text-muted-foreground text-sm">Welcome to the crew.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeroSection;
