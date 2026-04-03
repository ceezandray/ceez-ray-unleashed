import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const checkoutUrl = "https://your-store.com/checkout";
    window.open(checkoutUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-2">
              YOUR <span className="text-primary">CART</span>
            </h1>
            <p className="text-muted-foreground text-sm">{items.length} item{items.length !== 1 ? "s" : ""}</p>
          </motion.div>

          {items.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground mb-6">Your cart is empty</p>
              <button
                onClick={() => navigate("/shop")}
                className="font-heading text-xs tracking-wider px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
              >
                BROWSE SHOP
              </button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-4 p-4 border border-border bg-card"
                >
                  <div className="w-24 h-24 border border-border overflow-hidden flex-shrink-0 bg-background">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-heading text-sm text-foreground">{item.name}</h4>
                      <p className="text-muted-foreground text-xs">{item.category}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-foreground text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <span className="font-heading text-sm text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* Summary */}
              <div className="border-t border-border pt-6 mt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-heading text-sm tracking-wider text-white">TOTAL</span>
                  <span className="font-heading text-2xl text-white">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={clearCart}
                    className="font-heading text-xs tracking-wider px-6 py-3 border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
                  >
                    CLEAR CART
                  </button>
                  <button
                    onClick={() => navigate("/shop")}
                    className="font-heading text-xs tracking-wider px-6 py-3 border border-border text-foreground hover:border-foreground transition-all"
                  >
                    CONTINUE SHOPPING
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="flex-1 font-heading text-xs tracking-wider py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                  >
                    CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Cart;
