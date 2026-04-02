import { motion } from "framer-motion";

const scenes = [
  "/images/scene-merch.jpg",
  "/images/scene-park.jpg",
  "/images/scene-waterslide.jpg",
  "/images/scene-funspot.jpg",
];

const SceneGallery = () => {
  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-6 mb-8">
        <h2 className="font-heading text-sm tracking-[0.3em] text-foreground">
          BEHIND THE SCENES
        </h2>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex gap-4 px-6"
      >
        {scenes.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex-shrink-0 w-72 md:w-96 aspect-video overflow-hidden border-glow group"
          >
            <img
              src={src}
              alt={`Scene ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SceneGallery;
