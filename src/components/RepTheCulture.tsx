import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RepTheCulture = () => {
  const navigate = useNavigate();

  return (
    <section id="shop" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/scene-merch.jpg"
          alt="BPF Merch"
          className="w-full h-full object-cover opacity-20"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="container mx-auto px-6 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-sm tracking-[0.3em] text-foreground mb-4">
            JOIN THE MOVEMENT
          </h2>
          <h3 className="font-heading text-5xl md:text-7xl text-foreground mb-4">
            REP THE <span className="text-primary text-glow-red">CULTURE</span>
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Exclusive Black Picket Fence apparel. Built for the culture.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="inline-flex items-center gap-3 font-heading tracking-wider px-10 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 animate-pulse-glow text-lg"
          >
            <ShoppingBag className="w-5 h-5" />
            SHOP NOW
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default RepTheCulture;
