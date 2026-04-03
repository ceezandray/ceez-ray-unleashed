import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartDropdown from "@/components/CartDropdown";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About BPF", href: "/about-bpf" },
  { label: "Meet Ceez & Ray", href: "/#cast" },
  { label: "Episodes", href: "/storyboard" },
  { label: "Apparel", href: "/#apparel" },
  { label: "Shop", href: "/shop" },
  { label: "Login", href: "/login" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { totalItems, setIsCartOpen, isCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      if (isOpen) setIsOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    if (href.startsWith("/") && !href.includes("#")) {
      navigate(href);
    } else if (href.includes("#")) {
      const [path, hash] = href.split("#");
      if (path && path !== window.location.pathname) {
        navigate(path);
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a onClick={() => { navigate("/"); }} className="flex items-center gap-3 cursor-pointer">
            <img
              src="/images/ceezandray-logo.png"
              alt="Ceez & Ray"
              className={`w-auto transition-all duration-500 ${scrolled ? "h-8" : "h-12"}`}
            />
          </a>

          {/* Right side: Cart + Hamburger */}
          <div className="flex items-center gap-4">
            {/* Cart button */}
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative text-foreground hover:text-primary transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground z-[60]">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Cart Dropdown */}
      <CartDropdown />

      {/* Slide-out menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 24, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-72 z-[55] bg-background border-l border-border flex flex-col items-start justify-center px-8"
          >
            <div className="flex flex-col items-start gap-6">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className={`font-heading text-lg tracking-[0.2em] uppercase transition-colors ${
                    item.label === "Login" ? "text-primary hover:text-primary/80" : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[54] bg-black/60"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
