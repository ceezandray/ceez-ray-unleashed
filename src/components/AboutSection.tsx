import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-sm tracking-[0.3em] text-primary mb-2">
              THE SERIES
            </h2>
            <h3 className="font-heading text-5xl md:text-6xl text-foreground mb-6 leading-tight">
              CHAOS HAS<br />
              <span className="text-primary text-glow-red">NEVER LOOKED</span><br />
              THIS GOOD
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              CEEZ & RAY is a first-of-its-kind AI-generated comedy series following two
              wildly mismatched cellmates — Ceez, a no-nonsense gorilla with street smarts,
              and Ray, a smooth-talking pigeon who can't stop getting them into trouble.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              What starts behind bars becomes a chaotic friendship that takes them across
              the most absurd corners of the world. Built entirely on an AI-first pipeline.
              Every frame. Every punchline. Engineered for the culture.
            </p>
            <div className="flex gap-6">
              <div className="border-l-2 border-primary pl-4">
                <div className="font-heading text-3xl text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">AI Generated</div>
              </div>
              <div className="border-l-2 border-accent pl-4">
                <div className="font-heading text-3xl text-foreground">S1</div>
                <div className="text-sm text-muted-foreground">Now Streaming</div>
              </div>
            </div>
          </motion.div>

          {/* Image grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="space-y-3">
              <img
                src="/images/scene-bodega.jpg"
                alt="Bodega scene"
                className="w-full aspect-[3/4] object-cover border-glow"
                loading="lazy"
              />
              <img
                src="/images/scene-subway.jpg"
                alt="Subway scene"
                className="w-full aspect-square object-cover border-glow"
                loading="lazy"
              />
            </div>
            <div className="space-y-3 pt-8">
              <img
                src="/images/scene-photobooth.jpg"
                alt="Photo booth scene"
                className="w-full aspect-square object-cover border-glow"
                loading="lazy"
              />
              <img
                src="/images/scene-funspot.jpg"
                alt="Fun Spot scene"
                className="w-full aspect-[3/4] object-cover border-glow"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
