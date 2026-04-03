import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { products, categories } from "@/data/products";
import { useCart } from "@/context/CartContext";

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useCart();

  const filtered = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BananaScratchOff />
      <section className="pt-28 pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-sm tracking-[0.3em] text-foreground mb-4">
              BLACK PICKET FENCE
            </h1>
            <h2 className="font-heading text-5xl md:text-7xl text-primary mb-2">
              THE <span className="text-glow-red">SHOP</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Official merch. Built for the culture.
            </p>
          </motion.div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-heading text-xs tracking-[0.2em] px-5 py-2 border transition-all duration-300 ${
                  activeCategory === cat
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="group"
              >
                <div className="relative overflow-hidden mb-3 aspect-square border border-border bg-card">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${product.hoverImage ? "group-hover:opacity-0" : ""}`}
                    loading="lazy"
                  />
                  {product.hoverImage && (
                    <img
                      src={product.hoverImage}
                      alt={`${product.name} alt`}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h4 className="font-heading text-sm text-foreground group-hover:text-primary transition-colors mb-0.5">
                  {product.name}
                </h4>
                <p className="text-muted-foreground text-xs mb-1">{product.category}</p>
                <p className="text-foreground text-sm font-semibold mb-2">${product.price.toFixed(2)}</p>
                <button
                  onClick={() => addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    category: product.category,
                  })}
                  className="w-full flex items-center justify-center gap-2 font-heading text-xs tracking-wider py-2 border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  ADD TO CART
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Shop;
