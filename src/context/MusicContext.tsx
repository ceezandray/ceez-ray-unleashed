import { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";

interface MusicContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  hasChosen: boolean;
  chooseMusic: (play: boolean) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasChosen, setHasChosen] = useState(() => {
    return sessionStorage.getItem("bpf-music-chosen") === "true";
  });

  useEffect(() => {
    const audio = new Audio("/audio/Ceez_Ray.mp3");
    audio.loop = true;
    audioRef.current = audio;

    // If they previously chose yes, auto-play
    if (sessionStorage.getItem("bpf-music-play") === "true") {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const chooseMusic = (play: boolean) => {
    setHasChosen(true);
    sessionStorage.setItem("bpf-music-chosen", "true");
    if (play) {
      sessionStorage.setItem("bpf-music-play", "true");
      audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      sessionStorage.setItem("bpf-music-play", "false");
    }
  };

  return (
    <MusicContext.Provider value={{ isPlaying, togglePlay, hasChosen, chooseMusic }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
};
