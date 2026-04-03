import { motion } from "framer-motion";
import { Play } from "lucide-react";

const episodes = [
  {
    number: "01",
    title: "Joe's Bodega",
    description: "What happens when a gorilla walks into a bodega? Nothing good.",
    thumbnail: "/images/scene-bodega.jpg",
    duration: "Coming Soon",
    progress: 30,
  },
  {
    number: "02",
    title: "Fun Spot",
    description: "An amusement park visit goes exactly as wrong as you'd expect.",
    thumbnail: "/images/scene-waterslide.jpg",
    duration: "Coming Soon",
  },
  {
    number: "03",
    title: "The Subway",
    description: "NYC transit was never designed for a gorilla and his pigeon.",
    thumbnail: "/images/scene-subway.jpg",
    duration: "Coming Soon",
  },
  {
    number: "04",
    title: "Photo Booth Heist",
    description: "Bonnie and Clyde energy, but make it unhinged.",
    thumbnail: "/images/scene-photobooth.jpg",
    duration: "Coming Soon",
  },
];

const EpisodesSection = () => {
  return (
    <section id="episodes" className="py-24 bg-card/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2 className="font-heading text-sm tracking-[0.3em] text-foreground mb-2">
              SEASON ONE
            </h2>
            <h3 className="font-heading text-5xl md:text-6xl text-foreground">
              EPISODES
            </h3>
          </div>
          <a href="#" className="hidden md:block font-heading text-sm tracking-wider text-muted-foreground hover:text-primary transition-colors border-b border-muted-foreground hover:border-primary pb-1">
            VIEW ALL
          </a>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {episodes.map((ep, i) => (
            <motion.div
              key={ep.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden mb-4 border-glow">
                <img
                  src={ep.thumbnail}
                  alt={ep.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="font-heading text-2xl text-primary">
                  {ep.number}
                </span>
                <div>
                  <h4 className="font-heading text-base text-foreground mb-1">
                    {ep.title}
                  </h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {ep.description}
                  </p>
                  <span className="text-xs text-primary/70 font-heading tracking-wider mt-2 inline-block">
                    {ep.duration}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EpisodesSection;
