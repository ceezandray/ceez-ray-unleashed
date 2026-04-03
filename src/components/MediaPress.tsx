import { motion } from "framer-motion";
import hypeMagazine from "@/assets/hype-magazine.png";
import aiMagazineLogo from "@/assets/ai-magazine-logo.webp";

const MediaPress = () => {
  const items = [
    {
      quote: "A groundbreaking series that proves AI can be genuinely funny.",
      source: "Quantice Nash — AI Magazine",
      image: aiMagazine,
    },
    {
      quote: "Ceez & Ray are the duo we didn't know we needed.",
      source: "Charles Myambo — Hype Magazine",
      image: hypeMagazine,
    },
    {
      quote: "Black Picket Fence is rewriting the rules of content creation.",
      source: "Creator Economy Report",
      image: null,
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
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
              {item.image && (
                <img
                  src={item.image}
                  alt={item.source}
                  className="w-full h-48 object-cover object-top mb-4 rounded"
                />
              )}
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
