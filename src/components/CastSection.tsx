import { motion } from "framer-motion";

const CastSection = () => {
  return (
    <section id="cast" className="pt-[180px] pb-24 relative overflow-hidden">
      {/* Top fade gradient to hide section division */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10" />
      <div className="absolute inset-0">
        <img
          src="/images/ceazray-faceoff.png"
          alt="Ceez vs Ray faceoff"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <h2 className="font-heading text-sm tracking-[0.3em] text-foreground mb-4">
            MEET THE CAST
          </h2>
          <h3 className="font-heading text-4xl md:text-6xl text-foreground mb-2">
            ONE <span className="text-primary text-glow-red">FRIENDSHIP.</span>
          </h3>
          <h3 className="font-heading text-4xl md:text-6xl text-foreground mb-6">
            ZERO IMPULSE <span className="text-primary text-glow-red">CONTROL.</span>
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mb-16"
        >
          <button className="font-heading text-xs tracking-wider px-6 py-3 border border-accent/40 text-accent hover:bg-accent/10 transition-all duration-300">
            SEE THE REST OF THE CAST
          </button>
        </motion.div>

        {/* Characters - pushed down 60px */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-[120px]">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative bg-card/80 backdrop-blur-sm border border-border p-6"
          >
            <h4 className="font-heading text-2xl text-primary mb-1">CEEZ</h4>
            <p className="font-heading text-xs tracking-widest text-accent mb-3">
              THE GORILLA · THE MUSCLE · THE SANE ONE
            </p>
            <p className="text-foreground text-sm leading-relaxed">
              Tough exterior, huge heart. Doesn't take nonsense from anyone — except Ray. Somehow always ends up in orange. Sharp, street-smart, and deeply tired.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative bg-card/80 backdrop-blur-sm border border-border p-6"
          >
            <h4 className="font-heading text-2xl text-accent mb-1">RAY</h4>
            <p className="font-heading text-xs tracking-widest text-primary mb-3">
              THE PIGEON · THE BRAINS · THE PROBLEM
            </p>
            <p className="text-foreground text-sm leading-relaxed">
              Ray has a plan for everything. Every plan involves at least three things that can go catastrophically wrong. Smooth, fast, and operating at what he calls genius level.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CastSection;
