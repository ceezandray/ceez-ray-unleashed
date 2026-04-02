import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Cast", href: "#cast" },
  { label: "Episodes", href: "#episodes" },
  { label: "Apparel", href: "#apparel" },
  { label: "Team", href: "#team" },
  { label: "Shop", href: "#shop" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          <img src="/images/ceezandray-logo.png" alt="Ceez & Ray" className="h-9 w-auto" />
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-heading text-sm tracking-wider text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => navigate("/login")}
            className="font-heading text-sm tracking-wider px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            LOGIN
          </button>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-foreground z-[60]">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
            className="fixed top-0 right-0 bottom-0 w-[350px] z-[55] flex items-center lg:hidden"
          >
            {/* Transparent background with subtle blur only behind text area */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
            
            <div className="relative px-10 py-16 flex flex-col gap-6 w-full">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="font-heading text-2xl tracking-wider text-white hover:text-primary transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.button
                onClick={() => { setIsOpen(false); navigate("/login"); }}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ delay: navItems.length * 0.05, duration: 0.3 }}
                className="font-heading text-xl tracking-wider px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-fit drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
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
            className="fixed inset-0 z-[54] lg:hidden"
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
