import { motion } from "framer-motion";

const team = [
  {
    name: "Quantice Nash",
    firstName: "Quantice",
    role: "Creator / Director / Executive Producer",
    image: "/images/quantice.jpg",
    bio: "Quantice Nash is the creator of Ceez & Ray and founder of Black Picket Fence Entertainment, leading the vision, storytelling, and production of the series. His award-winning creative work has been recognized through campaigns featuring brands such as Tesla, Coca-Cola, Prime, Nike, Saratoga, and more.",
    socials: {
      tiktok: "https://www.tiktok.com/@czadaboi",
      instagram: "https://www.instagram.com/czadaboi",
    },
  },
  {
    name: "Jasmine Wilson",
    firstName: "Jasmine",
    role: "Creative Collaborator & Web / Game Developer",
    image: "/images/jasmine.png",
    bio: "Jasmine Wilson is a creative collaborator on Ceez & Ray, specializing in web development, game development, and interactive experiences. Her award-winning creative work has been recognized through campaigns and contests featuring brands such as NASA, Louis Vuitton, Burger King, Nike, Puma, LEGO, and more.",
    socials: {
      tiktok: "https://www.tiktok.com/@iflipbrandscom",
      instagram: "https://www.instagram.com/iflipbrandscom",
    },
  },
];

const SocialIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "tiktok":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      );
    case "instagram":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case "youtube":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" />
        </svg>
      );
    case "email":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    default:
      return null;
  }
};

const TheTeam = () => {
  return (
    <section id="team" className="py-24 relative overflow-hidden">
      {/* Fence image behind everything */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src="/images/black-fence.png"
          alt=""
          className="w-full h-40 object-cover opacity-[0.4]"
          style={{ objectPosition: "center" }}
        />
      </div>
      {/* Subtle black overlay */}
      <div className="absolute inset-0 bg-background/60 pointer-events-none" />
      {/* Top and bottom fade */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-sm tracking-[0.3em] text-foreground mb-4">
            BEHIND THE SCENES
          </h2>
          <h3 className="font-heading text-4xl md:text-5xl text-primary">
            THE <span className="text-glow-red">TEAM</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
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
              <p className="font-heading text-xs tracking-widest text-foreground uppercase max-w-[300px] mx-auto mb-4">
                {member.role}
              </p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto mb-4">
                {member.bio}
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className="font-body text-sm text-muted-foreground">Follow {member.firstName} on:</span>
                {Object.entries(member.socials).map(([type, url]) => (
                  <a
                    key={type}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-muted-foreground/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors duration-300"
                    aria-label={type}
                  >
                    <SocialIcon type={type} />
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TheTeam;
