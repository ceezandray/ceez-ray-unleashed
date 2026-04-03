import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Mail } from "lucide-react";

const NeverMissEpisode = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setShowPopup(false);
        setSubmitted(false);
        setEmail("");
      }, 2500);
    }
  };

  return (
    <>
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/scene-merch.jpg"
            alt="BPF Episodes"
            className="w-full h-full object-cover opacity-20"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-background/80" />
        </div>

        <div className="container mx-auto px-6 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-sm tracking-[0.3em] text-foreground mb-4">
              MISS AN EPISODE?
            </h2>
            <h3 className="font-heading text-5xl md:text-7xl text-foreground mb-4">
              NEVER MISS IT{" "}
              <span className="text-primary text-glow-red">AGAIN</span>
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Get notified when new episodes drop. No spam, just heat.
            </p>
            <button
              onClick={() => setShowPopup(true)}
              className="inline-flex items-center gap-3 font-heading tracking-wider px-10 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 animate-pulse-glow text-lg"
            >
              <Bell className="w-5 h-5" />
              NOTIFY ME
            </button>
          </motion.div>
        </div>
      </section>

      {/* Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-card border border-border p-8 text-center"
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-heading text-2xl text-foreground mb-2">
                    YOU'RE IN!
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    We'll hit you up when the next episode drops.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-heading text-2xl text-foreground mb-2">
                    NEVER MISS AN EPISODE
                  </h4>
                  <p className="text-muted-foreground text-sm mb-6">
                    Drop your email. We'll let you know when new episodes go live.
                  </p>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors font-body text-sm"
                    />
                    <button
                      type="submit"
                      className="w-full font-heading tracking-wider py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 text-sm"
                    >
                      NOTIFY ME
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NeverMissEpisode;
