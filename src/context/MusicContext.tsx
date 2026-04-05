import { createContext, useContext, useState, useRef, useEffect, useCallback, ReactNode } from "react";

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
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videosRef = useRef<Set<HTMLVideoElement>>(new Set());
  const wasMusicPlayingRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasChosen, setHasChosen] = useState(() => {
    return sessionStorage.getItem("bpf-music-chosen") === "true";
  });

  useEffect(() => {
    const audio = new Audio("/audio/Ceez_Ray.mp3");
    audio.loop = true;
    audioRef.current = audio;

    if (sessionStorage.getItem("bpf-music-play") === "true") {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

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
      // Resume music when video ends if no other video is playing
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
    // Pause music
    pauseMusic();
    // Pause all other videos
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
    <MusicContext.Provider value={{ isPlaying, togglePlay, hasChosen, chooseMusic, pauseMusic, resumeMusic, registerVideo, unregisterVideo, onVideoPlay }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
};

/**
 * Hook to register a video element with the music system.
 * Usage: const videoRef = useVideoMediaSync();
 * Then: <video ref={videoRef} ... />
 */
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
