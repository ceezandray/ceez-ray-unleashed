import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

const featured = products.filter((p) => p.featured);

const FeaturedApparel = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

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
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden mb-4 aspect-square border border-border bg-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${product.hoverImage ? "group-hover:opacity-0" : ""}`}
                  loading="lazy"
                />
                {product.hoverImage && (
                  <img
                    src={product.hoverImage}
                    alt={`${product.name} scene`}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-base text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-foreground text-sm">${product.price.toFixed(2)}</p>
                </div>
              </div>
              <button
                onClick={() => addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  category: product.category,
                })}
                className="mt-3 w-full flex items-center justify-center gap-2 font-heading text-xs tracking-wider py-2.5 border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                ADD TO CART
              </button>
            </motion.div>
          ))}
        </div>

        {/* Shop button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <button
            onClick={() => navigate("/shop")}
            className="font-heading text-xs tracking-wider px-8 py-3 border border-accent/40 text-accent hover:bg-accent/10 transition-all duration-300"
          >
            VIEW FULL SHOP
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedApparel;
