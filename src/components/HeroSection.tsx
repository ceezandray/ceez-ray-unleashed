import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-ferris.jpg"
          alt="Ceez and Ray on ferris wheel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 pb-20 pt-40">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-2xl"
        >
          <motion.img
            src="/images/logo-title.png"
            alt="CEEZ & RAY"
            className="w-full max-w-lg mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="font-heading text-sm tracking-[0.3em] text-primary mb-4"
          >
            A BLACK PICKET FENCE ENTERTAINMENT ORIGINAL
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-muted-foreground text-base leading-relaxed mb-8 max-w-lg"
          >
            A first-of-its-kind AI-generated comedy series following two wildly mismatched
            cellmates across the most absurd corners of the world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex gap-4 flex-wrap"
          >
            <a
              href="#episodes"
              className="font-heading tracking-wider px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 animate-pulse-glow"
            >
              WATCH NOW
            </a>
            <a
              href="#about"
              className="font-heading tracking-wider px-8 py-3 border border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            >
              LEARN MORE
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
  );
};

export default HeroSection;
