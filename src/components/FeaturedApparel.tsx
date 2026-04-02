import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

const products = [
  {
    name: "Ceez & Ray Tee",
    price: "$34.99",
    image: "/images/product-tee-ceezray.jpg",
    hoverImage: "/images/ceazray-faceoff.png",
  },
  {
    name: "Joe's Bodega Tee",
    price: "$34.99",
    image: "/images/product-bodega-tee.jpg",
    hoverImage: "/images/scene-bodega.jpg",
  },
  {
    name: "BPF Sports Watch",
    price: "$149.99",
    image: "/images/bpf-watch.png",
    hoverImage: "/images/ceezwatch.png",
  },
];

const FeaturedApparel = () => {
  return (
    <section id="apparel" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-sm tracking-[0.3em] text-foreground mb-4">
            OFFICIAL MERCH
          </h2>
          <h3 className="font-heading text-4xl md:text-5xl text-primary">
            FEATURED <span className="text-glow-red">APPAREL</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden mb-4 aspect-square bg-card border border-border">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                  loading="lazy"
                />
                <img
                  src={product.hoverImage}
                  alt={`${product.name} scene`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-base text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-foreground text-sm">{product.price}</p>
                </div>
                <ShoppingBag className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <button className="mt-3 w-full font-heading text-xs tracking-wider py-2.5 border border-accent/40 text-accent hover:bg-accent/10 transition-all duration-300">
                SEE ITEM
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedApparel;
