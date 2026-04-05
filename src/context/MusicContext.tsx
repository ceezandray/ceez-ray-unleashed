import { createContext, useContext, useState, useRef, useEffect, useCallback, ReactNode } from "react";

const TRACKS = [
  { title: "Ceez & Ray Theme", src: "/audio/Ceez_Ray.mp3" },
  { title: "Monkey Business", src: "/audio/Monkey_Business.mp3" },
];

interface MusicContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  hasChosen: boolean;
  chooseMusic: (play: boolean) => void;
  pauseMusic: () => void;
  resumeMusic: () => void;
  registerVideo: (video: HTMLVideoElement) => void;
  unregisterVideo: (video: HTMLVideoElement) => void;
  onVideoPlay: (video: HTMLVideoElement) => void;
  nextTrack: () => void;
  currentTrackTitle: string;
  trackIndex: number;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videosRef = useRef<Set<HTMLVideoElement>>(new Set());
  const wasMusicPlayingRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [hasChosen, setHasChosen] = useState(() => {
    return sessionStorage.getItem("bpf-music-chosen") === "true";
  });

  // Check if user had muted (persisted in localStorage)
  const wasMuted = useCallback(() => {
    return localStorage.getItem("bpf-music-muted") === "true";
  }, []);

  useEffect(() => {
    const audio = new Audio(TRACKS[0].src);
    audio.loop = false;
    audioRef.current = audio;

    // Auto-advance to next track when current ends
    audio.addEventListener("ended", () => {
      const nextIdx = (trackIndex + 1) % TRACKS.length;
      setTrackIndex(nextIdx);
      audio.src = TRACKS[nextIdx].src;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    });

    // Restore state on refresh
    if (sessionStorage.getItem("bpf-music-play") === "true" && !wasMuted()) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Update audio src when trackIndex changes (after initial mount)
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;
    const wasPlaying = !audio.paused;
    audio.src = TRACKS[trackIndex].src;
    if (wasPlaying) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [trackIndex]);

  const pauseMusic = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      wasMusicPlayingRef.current = true;
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  const resumeMusic = useCallback(() => {
    if (wasMusicPlayingRef.current) {
      wasMusicPlayingRef.current = false;
      audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, []);

  const registerVideo = useCallback((video: HTMLVideoElement) => {
    videosRef.current.add(video);

    const handlePlay = () => onVideoPlay(video);
    const handleEnded = () => {
      const anyPlaying = Array.from(videosRef.current).some(v => v !== video && !v.paused);
      if (!anyPlaying) resumeMusic();
    };
    const handlePause = () => {
      const anyPlaying = Array.from(videosRef.current).some(v => !v.paused);
      if (!anyPlaying) resumeMusic();
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("pause", handlePause);

    (video as any)._bpfCleanup = () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  const unregisterVideo = useCallback((video: HTMLVideoElement) => {
    (video as any)._bpfCleanup?.();
    videosRef.current.delete(video);
  }, []);

  const onVideoPlay = useCallback((video: HTMLVideoElement) => {
    pauseMusic();
    videosRef.current.forEach(v => {
      if (v !== video && !v.paused) {
        v.pause();
      }
    });
  }, [pauseMusic]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      localStorage.setItem("bpf-music-muted", "true");
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
      localStorage.setItem("bpf-music-muted", "false");
    }
  };

  const nextTrack = () => {
    const nextIdx = (trackIndex + 1) % TRACKS.length;
    setTrackIndex(nextIdx);
  };

  const chooseMusic = (play: boolean) => {
    setHasChosen(true);
    sessionStorage.setItem("bpf-music-chosen", "true");
    if (play) {
      sessionStorage.setItem("bpf-music-play", "true");
      localStorage.setItem("bpf-music-muted", "false");
      audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      sessionStorage.setItem("bpf-music-play", "true");
      localStorage.setItem("bpf-music-muted", "true");
    }
  };

  return (
    <MusicContext.Provider value={{ isPlaying, togglePlay, hasChosen, chooseMusic, pauseMusic, resumeMusic, registerVideo, unregisterVideo, onVideoPlay, nextTrack, currentTrackTitle: TRACKS[trackIndex].title, trackIndex }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
};

export const useVideoMediaSync = () => {
  const { registerVideo, unregisterVideo } = useMusic();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const setRef = useCallback((el: HTMLVideoElement | null) => {
    if (videoRef.current) {
      unregisterVideo(videoRef.current);
    }
    videoRef.current = el;
    if (el) {
      registerVideo(el);
    }
  }, [registerVideo, unregisterVideo]);

  return setRef;
};
