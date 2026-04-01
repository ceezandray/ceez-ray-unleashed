import { motion } from "framer-motion";

const MediaPress = () => {
  return (
    <section id="media" className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-sm tracking-[0.3em] text-primary mb-2">
            IN THE SPOTLIGHT
          </h2>
          <h3 className="font-heading text-5xl md:text-6xl text-foreground">
            MEDIA & PRESS
          </h3>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              quote: "AI-generated storytelling has never been this raw or this funny.",
              source: "Culture Weekly",
            },
            {
              quote: "Ceez & Ray is the most original comedy concept in years.",
              source: "Stream Report",
            },
            {
              quote: "Black Picket Fence is redefining what independent media looks like.",
              source: "The Creator Economy",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-border p-8 hover:border-primary/40 transition-colors"
            >
              <p className="text-muted-foreground text-sm leading-relaxed italic mb-4">
                "{item.quote}"
              </p>
              <p className="font-heading text-xs tracking-[0.2em] text-primary">
                — {item.source.toUpperCase()}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaPress;
