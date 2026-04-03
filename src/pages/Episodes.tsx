import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const episodes = [
  {
    number: "EP 01",
    title: "The Bodega Incident",
    description: "It all started with a sandwich. And a very bad decision.",
    thumbnail: "/images/ep-bodega-incident.png",
    duration: "12:34",
  },
  {
    number: "EP 02",
    title: "The Big Arrest",
    description: "When the law catches up, Ceez and Ray handle it... differently.",
    thumbnail: "/images/ep-thearrest.jpg",
    duration: "14:22",
  },
  {
    number: "EP 03",
    title: "The Mugshot",
    description: "One mugshot goes viral. The other goes missing.",
    thumbnail: "/images/ep-mugshot.png",
    duration: "11:48",
  },
  {
    number: "EP 04",
    title: "The Courtroom",
    description: "Ray represents himself. Ceez considers witness protection.",
    thumbnail: "/images/ep-courtroom.png",
    duration: "15:10",
  },
];

const Episodes = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-14"
          >
            <h1 className="font-heading text-sm tracking-[0.3em] text-foreground mb-4">
              SEASON ONE
            </h1>
            <h2 className="font-heading text-5xl md:text-7xl text-primary mb-2">
              ALL <span className="text-glow-red">EPISODES</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Follow Ceez & Ray from the bodega to the courtroom.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {episodes.map((ep, i) => (
              <motion.div
                key={ep.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden mb-3 aspect-video border border-border">
                  <img
                    src={ep.thumbnail}
                    alt={ep.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-background/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/75 flex items-center justify-center shadow-[0_0_20px_rgba(229,57,53,0.4)] group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-7 h-7 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-background/80 text-foreground text-xs px-2 py-0.5 font-heading">
                    {ep.duration}
                  </span>
                </div>
                <p className="font-heading text-xs tracking-wider text-foreground mb-1">{ep.number}</p>
                <h4 className="font-heading text-xl text-primary mb-1 group-hover:text-primary/80 transition-colors">
                  {ep.title}
                </h4>
                <p className="text-muted-foreground text-sm">{ep.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Episodes;
