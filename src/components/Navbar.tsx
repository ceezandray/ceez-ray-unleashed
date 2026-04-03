import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About BPF", href: "/about-bpf" },
  { label: "Meet Ceez & Ray", href: "/#cast" },
  { label: "Episodes", href: "/storyboard" },
  { label: "Apparel", href: "/#apparel" },
  { label: "Shop", href: "/#shop" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      // Auto-close mobile menu on scroll
      if (isOpen) setIsOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOpen]);

  return (
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
        <a href="#home" className="flex items-center gap-3">
          <img
            src="/images/ceezandray-logo.png"
            alt="Ceez & Ray"
            className={`w-auto transition-all duration-500 ${scrolled ? "h-8" : "h-12"}`}
          />
        </a>

        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-heading text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => navigate("/login")}
            className="font-heading text-[10px] tracking-[0.2em] uppercase px-5 py-1.5 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            LOGIN
          </button>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-foreground z-[60]">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile slide-out menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 24, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-72 z-[55] bg-background border-l border-border flex flex-col items-start justify-center px-8 lg:hidden"
          >
            <div className="flex flex-col items-start gap-6">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="font-heading text-lg tracking-[0.2em] uppercase text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.button
                onClick={() => { setIsOpen(false); navigate("/login"); }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05, duration: 0.3 }}
                className="font-heading text-lg tracking-[0.2em] uppercase text-primary hover:text-primary/80 transition-colors"
              >
                LOGIN
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay to close menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[54] bg-black/60 lg:hidden"
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
