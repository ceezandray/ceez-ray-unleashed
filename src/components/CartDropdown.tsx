import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

const CartDropdown = () => {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  const handleCheckout = () => {
    // Redirect to WooCommerce checkout (placeholder URL — will be replaced with real WooCommerce endpoint)
    const checkoutUrl = "https://your-store.com/checkout";
    window.open(checkoutUrl, "_blank");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-[70] bg-black/50"
          />
          {/* Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 right-4 z-[80] w-80 sm:w-96 bg-card border border-border shadow-2xl max-h-[80vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-primary" />
                <span className="font-heading text-sm tracking-wider text-foreground">
                  CART ({totalItems})
                </span>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <p className="text-center text-muted-foreground text-sm py-8">Your cart is empty</p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 border border-border overflow-hidden flex-shrink-0 bg-background">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading text-xs text-foreground truncate">{item.name}</h4>
                      <p className="text-primary text-xs font-semibold">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-5 h-5 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-foreground text-xs w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-5 h-5 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-muted-foreground hover:text-primary text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t border-border space-y-3">
                <div className="flex justify-between">
                  <span className="font-heading text-xs tracking-wider text-muted-foreground">TOTAL</span>
                  <span className="font-heading text-sm text-primary">${totalPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full font-heading text-xs tracking-wider py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                >
                  CHECKOUT
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDropdown;
