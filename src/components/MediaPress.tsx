import { motion } from "framer-motion";

const MediaPress = () => {
  const items = [
    {
      quote: "A groundbreaking series that proves AI can be genuinely funny.",
      source: "Quantice Nash — AI Magazine",
    },
    {
      quote: "Ceez & Ray are the duo we didn't know we needed.",
      source: "Charles Myambo — Hype Magazine",
    },
    {
      quote: "Black Picket Fence is rewriting the rules of content creation.",
      source: "Creator Economy Report",
    },
  ];

  return (
    <section className="py-24 relative bg-background">
      {/* Background photo with gradient fades */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/images/ceez-ray-gorilla.png"
          alt="Ceez & Ray"
          className="w-full h-full object-cover object-top opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-sm tracking-[0.3em] text-foreground mb-4">
            MEDIA & PRESS
          </h2>
          <h3 className="font-heading text-4xl md:text-5xl text-primary mb-6">
            IN THE <span className="text-glow-red">SPOTLIGHT</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="border border-border p-6 bg-card/50 flex flex-col"
            >
              <p className="text-foreground text-sm italic leading-relaxed mb-4">
                "{item.quote}"
              </p>
              <p className="font-heading text-xs tracking-wider text-primary mt-auto">
                — {item.source}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaPress;
