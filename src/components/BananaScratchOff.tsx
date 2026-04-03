import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, PartyPopper } from "lucide-react";

interface Prize {
  label: string;
  description: string;
  emoji: string;
  weight: number;
}

const prizes: Prize[] = [
  { label: "10% OFF", description: "10% off your entire order!", emoji: "🔥", weight: 30 },
  { label: "15% OFF", description: "15% off your entire order!", emoji: "🔥", weight: 25 },
  { label: "20% OFF", description: "20% off your entire order!", emoji: "💥", weight: 18 },
  { label: "25% OFF", description: "25% off your entire order!", emoji: "💥", weight: 10 },
  { label: "SHOUTOUT", description: "You get a shoutout from @ceezandray on socials!", emoji: "📣", weight: 10 },
  { label: "50% OFF", description: "50% off your entire order! Rare W!", emoji: "🏆", weight: 5 },
  { label: "FREE GEAR", description: "You just won FREE merch! DM us to claim.", emoji: "👑", weight: 2 },
];

function pickPrize(): Prize {
  const total = prizes.reduce((sum, p) => sum + p.weight, 0);
  let roll = Math.random() * total;
  for (const prize of prizes) {
    roll -= prize.weight;
    if (roll <= 0) return prize;
  }
  return prizes[0];
}

const SCRATCH_THRESHOLD = 0.45;

const BananaScratchOff = () => {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState<"signup" | "scratch" | "revealed">("signup");
  const [formData, setFormData] = useState({ name: "", email: "", birthday: "" });
  const [prize, setPrize] = useState<Prize | null>(null);
  const [scratched, setScratched] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const scratchedPixels = useRef(0);
  const totalPixels = useRef(0);

  useEffect(() => {
    const alreadyPlayed = sessionStorage.getItem("bpf-scratch-played");
    if (!alreadyPlayed) {
      const timer = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Draw banana scratch cover
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx.drawImage(img, 0, 0, rect.width, rect.height);
      // Add scratch-off text overlay
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.font = "bold 22px Oswald, sans-serif";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText("SCRATCH HERE! 🍌", rect.width / 2, rect.height / 2 - 10);
      ctx.font = "14px Poppins, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.fillText("Use your finger or mouse", rect.width / 2, rect.height / 2 + 18);

      totalPixels.current = rect.width * rect.height;
      scratchedPixels.current = 0;
    };
    img.src = "/images/banana-scratchoff.jpg";
  }, []);

  useEffect(() => {
    if (step === "scratch") {
      setTimeout(initCanvas, 100);
    }
  }, [step, initCanvas]);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const cx = x - rect.left;
    const cy = y - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(cx, cy, 28, 0, Math.PI * 2);
    ctx.fill();

    scratchedPixels.current += 28 * 28 * Math.PI;
    const pct = scratchedPixels.current / totalPixels.current;

    if (pct > SCRATCH_THRESHOLD && !scratched) {
      setScratched(true);
      setTimeout(() => setStep("revealed"), 600);
    }
  };

  const handlePointerDown = () => { isDrawing.current = true; };
  const handlePointerUp = () => { isDrawing.current = false; };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  };
  const handleClick = (e: React.MouseEvent) => {
    scratch(e.clientX, e.clientY);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.birthday) return;
    setPrize(pickPrize());
    setStep("scratch");
    sessionStorage.setItem("bpf-scratch-played", "true");
    // Store the entry (would go to a database later)
    const entries = JSON.parse(localStorage.getItem("bpf-scratch-entries") || "[]");
    entries.push({ ...formData, timestamp: new Date().toISOString() });
    localStorage.setItem("bpf-scratch-entries", JSON.stringify(entries));
  };

  const handleClose = () => {
    setShow(false);
    if (step === "signup") {
      sessionStorage.setItem("bpf-scratch-played", "true");
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={(e) => { if (e.target === e.currentTarget && step === "signup") handleClose(); }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="relative w-full max-w-md bg-card border border-border rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={16} />
            </button>

            {/* STEP 1: Signup */}
            {step === "signup" && (
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">🍌</div>
                  <h3 className="font-heading text-2xl text-primary mb-1">
                    BANANA SCRATCH-OFF
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Sign up to scratch & win discounts, free gear, and more!
                  </p>
                </div>

                <form onSubmit={handleSignup} className="space-y-3">
                  <div>
                    <label className="font-heading text-xs tracking-wider text-muted-foreground mb-1 block">NAME</label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="font-heading text-xs tracking-wider text-muted-foreground mb-1 block">EMAIL</label>
                    <input
                      type="email"
                      required
                      maxLength={255}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="font-heading text-xs tracking-wider text-muted-foreground mb-1 block">BIRTHDAY</label>
                    <input
                      type="date"
                      required
                      value={formData.birthday}
                      onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full font-heading tracking-wider py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-sm rounded-lg flex items-center justify-center gap-2 mt-2"
                  >
                    <Gift className="w-4 h-4" />
                    SCRATCH TO WIN
                  </button>
                </form>

                <p className="text-center text-muted-foreground text-[10px] mt-3">
                  One scratch per visit. Prizes subject to availability.
                </p>
              </div>
            )}

            {/* STEP 2: Scratch */}
            {step === "scratch" && prize && (
              <div className="p-6">
                <div className="text-center mb-4">
                  <h3 className="font-heading text-xl text-foreground">
                    SCRATCH THE BANANA! 🍌
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    Scratch to reveal your prize
                  </p>
                </div>

                <div className="relative w-full aspect-[4/5] max-w-[280px] mx-auto rounded-xl overflow-hidden border-2 border-primary/30">
                  {/* Prize underneath */}
                  <div className="absolute inset-0 bg-background flex flex-col items-center justify-center p-6">
                    <div className="text-5xl mb-3">{prize.emoji}</div>
                    <h4 className="font-heading text-3xl text-primary mb-2">{prize.label}</h4>
                    <p className="text-foreground text-sm text-center">{prize.description}</p>
                  </div>

                  {/* Scratch canvas overlay */}
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                    onPointerMove={handlePointerMove}
                    onClick={handleClick}
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Revealed */}
            {step === "revealed" && prize && (
              <div className="p-8">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <PartyPopper className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="font-heading text-sm tracking-[0.3em] text-muted-foreground mb-2">
                    YOU WON
                  </h3>
                  <div className="text-6xl mb-3">{prize.emoji}</div>
                  <h4 className="font-heading text-4xl text-primary mb-3">{prize.label}</h4>
                  <p className="text-foreground text-base mb-6">{prize.description}</p>

                  {(prize.label.includes("OFF") || prize.label === "FREE GEAR") && (
                    <div className="bg-background border border-dashed border-primary/50 rounded-lg p-4 mb-6">
                      <p className="font-heading text-xs tracking-wider text-muted-foreground mb-1">YOUR CODE</p>
                      <p className="font-heading text-2xl text-primary tracking-wider select-all">
                        BANANA{Math.random().toString(36).substring(2, 6).toUpperCase()}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handleClose}
                    className="w-full font-heading tracking-wider py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-sm rounded-lg"
                  >
                    START SHOPPING 🛒
                  </button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BananaScratchOff;
