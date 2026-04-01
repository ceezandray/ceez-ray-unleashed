import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

const products = [
  {
    name: "BPF Classic Tee",
    price: "$35",
    image: "/images/scene-merch.jpg",
  },
  {
    name: "Ceez & Ray Hoodie",
    price: "$65",
    image: "/images/scene-park.jpg",
  },
  {
    name: "Culture Cap",
    price: "$30",
    image: "/images/scene-funspot.jpg",
  },
];

const FeaturedApparel = () => {
  return (
    <section id="apparel" className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-heading text-sm tracking-[0.3em] text-primary mb-2">
            OFFICIAL MERCH
          </h2>
          <h3 className="font-heading text-5xl md:text-6xl text-foreground">
            FEATURED APPAREL
          </h3>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden mb-4 border-glow bg-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-heading text-sm text-foreground">{product.name}</h4>
                  <p className="text-primary text-sm font-heading">{product.price}</p>
                </div>
                <ShoppingBag className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedApparel;
