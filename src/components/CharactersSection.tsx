import { motion } from "framer-motion";

const characters = [
  {
    name: "CEEZ",
    subtitle: "THE GORILLA · THE MUSCLE · THE SANE ONE",
    description:
      "Tough exterior, huge heart. Doesn't take nonsense from anyone — except Ray. Somehow always ends up in orange. Sharp, street-smart, and deeply tired.",
    image: "/images/ceez-mugshot.webp",
    accent: "primary" as const,
  },
  {
    name: "RAY",
    subtitle: "THE PIGEON · THE BRAINS · THE PROBLEM",
    description:
      "Ray has a plan for everything. Every plan involves at least three things that can go catastrophically wrong. Smooth, fast, and operating at what he calls genius level.",
    image: "/images/ray-mugshot.png",
    accent: "accent" as const,
  },
];

const CharactersSection = () => {
  return (
    <section id="characters" className="py-24 relative">
      <div className="absolute inset-0 gradient-red-fade opacity-30" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-sm tracking-[0.3em] text-foreground mb-2">
            MEET THE CAST
          </h2>
          <h3 className="font-heading text-5xl md:text-7xl text-foreground">
            TWO LEGENDS.<br />
            <span className="text-primary text-glow-red">ZERO IMPULSE CONTROL.</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {characters.map((char, i) => (
            <motion.div
              key={char.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.7 }}
              className="group relative overflow-hidden border-glow bg-card"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-full h-full object-cover object-top grayscale group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h4 className="font-heading text-6xl text-foreground mb-1">{char.name}</h4>
                <p className={`font-heading text-xs tracking-[0.2em] ${char.accent === 'primary' ? 'text-primary' : 'text-accent'} mb-3`}>
                  {char.subtitle}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {char.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CharactersSection;
