import { useMusic } from "@/context/MusicContext";
import { motion } from "framer-motion";

const FloatingMusicPlayer = () => {
  const { isPlaying, togglePlay, hasChosen } = useMusic();

  if (!hasChosen) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={togglePlay}
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-black/80 border border-primary/30 backdrop-blur-sm flex items-center justify-center group hover:border-primary/60 transition-colors"
      title={isPlaying ? "Pause music" : "Play music"}
    >
      {/* Music wave bars */}
      <div className="flex items-end gap-[3px] h-5">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-[3px] rounded-full bg-primary"
            animate={
              isPlaying
                ? {
                    height: ["6px", "18px", "10px", "16px", "6px"],
                  }
                : { height: "6px" }
            }
            transition={
              isPlaying
                ? {
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.12,
                    ease: "easeInOut",
                  }
                : { duration: 0.3 }
            }
          />
        ))}
      </div>
    </motion.button>
  );
};

export default FloatingMusicPlayer;
