import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ComingSoonProps {
  onAccessGranted: () => void;
}

const ComingSoon = ({ onAccessGranted }: ComingSoonProps) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "abc123") {
      onAccessGranted();
    } else {
      setError("Invalid access code");
      setTimeout(() => setError(""), 2000);
    }
  };

  const socials = [
    { name: "TikTok", url: "https://tiktok.com/@ceezandray", icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.84a4.84 4.84 0 01-1-.15z"/>
      </svg>
    )},
    { name: "Instagram", url: "https://instagram.com/ceezandray", icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    )},
    { name: "YouTube", url: "https://youtube.com/@ceezandray", icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )},
    { name: "Facebook", url: "https://facebook.com/ceezandray", icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )},
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Preview Access Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-6 right-6 z-20 px-4 py-2 border border-white/20 text-white/60 text-xs font-heading tracking-widest uppercase hover:border-primary hover:text-primary transition-all duration-300 rounded"
      >
        Preview Access
      </motion.button>

      {/* Password Prompt */}
      <AnimatePresence>
        {showPassword && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 right-6 z-20 bg-black/90 border border-white/10 rounded-lg p-4 backdrop-blur-sm"
          >
            <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-3">
              <input
                type="password"
                placeholder="Enter access code"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border border-white/10 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-primary w-48 font-body"
              />
              {error && <p className="text-primary text-xs">{error}</p>}
              <button
                type="submit"
                className="bg-primary text-white text-xs font-heading tracking-wider py-2 rounded hover:bg-primary/80 transition-colors uppercase"
              >
                Enter
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - Character + Box Layout */}
      <div className="relative flex items-center justify-center w-full max-w-4xl px-6">
        {/* Ceez Character - Left/Behind */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:block relative z-0 -mr-16 flex-shrink-0"
        >
          <div className="relative">
            <img
              src="/images/ceez-animation.gif"
              alt="Ceez - BPF Gorilla"
              className="w-80 lg:w-[28rem] object-contain drop-shadow-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
          </div>
        </motion.div>

        {/* Content Box - Right/In Front */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 bg-black/80 border border-white/10 backdrop-blur-md rounded-xl p-8 md:p-10 flex flex-col items-center gap-8 max-w-md w-full"
        >
          {/* Logo */}
          <img
            src="/images/bpf-logo.png"
            alt="Black Picket Fence Entertainment"
            className="h-16 md:h-24 w-auto drop-shadow-2xl"
          />

          {/* Message */}
          <div className="text-center space-y-3">
            <h1 className="text-primary text-xl md:text-2xl font-heading tracking-wider">
              SOMETHING BIG IS COMING
            </h1>
            <p className="text-white/50 font-body text-xs md:text-sm leading-relaxed">
              The culture's favorite AI TV series is about to level up. Be the first to know when we drop.
            </p>
          </div>

          {/* Email Signup */}
          <form onSubmit={handleEmailSubmit} className="w-full flex gap-2">
            {submitted ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-primary font-body text-sm text-center w-full py-3"
              >
                You're on the list! 🔥
              </motion.p>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 text-white text-sm px-4 py-3 rounded focus:outline-none focus:border-primary font-body placeholder:text-white/30"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary text-white text-xs font-heading tracking-wider px-5 py-3 rounded hover:bg-primary/80 transition-colors uppercase whitespace-nowrap"
                >
                  Notify Me
                </button>
              </>
            )}
          </form>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-primary transition-colors duration-300"
                aria-label={s.name}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <p className="absolute bottom-6 text-white/20 text-xs font-body tracking-wider">
        © 2025 Black Picket Fence Entertainment
      </p>
    </div>
  );
};

export default ComingSoon;
