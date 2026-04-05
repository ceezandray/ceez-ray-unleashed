import { useState } from "react";
import { useMusic } from "@/context/MusicContext";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward } from "lucide-react";

const FloatingMusicPlayer = () => {
  const { isPlaying, togglePlay, hasChosen, nextTrack, currentTrackTitle } = useMusic();
  const [expanded, setExpanded] = useState(false);

  if (!hasChosen) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-card border border-border rounded-lg p-3 mb-1 min-w-[180px] shadow-xl"
          >
            <p className="text-[10px] text-muted-foreground font-heading tracking-wider mb-2 uppercase">
              Now Playing
            </p>
            <p className="text-xs text-foreground font-body mb-3 truncate">
              {currentTrackTitle}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                className="w-9 h-9 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-primary" />
                ) : (
                  <Play className="w-4 h-4 text-primary ml-0.5" />
                )}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextTrack(); }}
                className="w-9 h-9 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <SkipForward className="w-4 h-4 text-primary" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setExpanded(!expanded)}
        className="w-14 h-14 rounded-full bg-black/80 border border-primary/30 backdrop-blur-sm flex items-center justify-center group hover:border-primary/60 transition-colors"
        title={isPlaying ? "Music controls" : "Music controls"}
      >
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
    </div>
  );
};

export default FloatingMusicPlayer;
