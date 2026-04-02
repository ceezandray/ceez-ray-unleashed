import { motion } from "framer-motion";

const team = [
  {
    name: "Quantice Nash",
    role: "Creator / Executive Producer",
    image: "/images/quantice.jpg",
  },
  {
    name: "Jasmine Wilson",
    role: "Executive Producer / Brand Strategist / Audio & Music Director",
    image: "/images/jasmine.png",
  },
];

const TheTeam = () => {
  return (
    <section id="team" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-sm tracking-[0.3em] text-primary mb-4">
            BEHIND THE SCENES
          </h2>
          <h3 className="font-heading text-4xl md:text-5xl text-primary">
            THE <span className="text-glow-red">TEAM</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group text-center"
            >
              <div className="relative overflow-hidden mb-4 w-64 h-64 mx-auto rounded-full">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent rounded-full" />
              </div>
              <h4 className="font-heading text-xl text-primary mb-1">{member.name}</h4>
              <p className="font-heading text-xs tracking-widest text-foreground uppercase max-w-[200px] mx-auto">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TheTeam;
