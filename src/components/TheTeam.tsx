import { motion } from "framer-motion";

const team = [
  {
    name: "Quantice Nash",
    role: "Creator / Executive Producer",
    image: "/images/scene-parkwalk.jpg",
  },
  {
    name: "Jasmine Wilson",
    role: "Co-Creator / Producer",
    image: "/images/scene-photobooth.jpg",
  },
];

const TheTeam = () => {
  return (
    <section id="team" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-sm tracking-[0.3em] text-primary mb-2">
            BEHIND THE VISION
          </h2>
          <h3 className="font-heading text-5xl md:text-6xl text-foreground">
            THE TEAM
          </h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="text-center group"
            >
              <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden rounded-full border-2 border-border group-hover:border-primary transition-colors duration-500">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h4 className="font-heading text-xl text-foreground mb-1">{member.name}</h4>
              <p className="font-heading text-xs tracking-[0.2em] text-primary">
                {member.role.toUpperCase()}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TheTeam;
