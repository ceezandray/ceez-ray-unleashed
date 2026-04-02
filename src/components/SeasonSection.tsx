import { motion } from "framer-motion";

const seasonImages = [
  { src: "/images/scene-bodega.jpg", title: "THE BODEGA INCIDENT" },
  { src: "/images/scene-waterslide.jpg", title: "FUN SPOT" },
  { src: "/images/scene-subway.jpg", title: "UNDERGROUND" },
  { src: "/images/scene-photobooth.jpg", title: "BONNIE & CLYDE" },
  { src: "/images/scene-park.jpg", title: "CENTRAL PARK" },
  { src: "/images/scene-merch.jpg", title: "HUSTLE" },
];

const SeasonSection = () => {
  return (
    <section id="season" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-heading text-sm tracking-[0.3em] text-foreground mb-2">
            SEASON ONE
          </h2>
          <h3 className="font-heading text-5xl md:text-6xl text-foreground">
            THE STORY <span className="text-primary">SO FAR</span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {seasonImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative group overflow-hidden aspect-[4/3] cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="font-heading text-sm tracking-wider text-foreground">
                  {img.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeasonSection;
