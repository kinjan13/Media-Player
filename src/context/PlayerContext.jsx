import { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";
import { addRecent } from "../services/recentService";
import { useAuth } from "./AuthContext";

const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
  const { user } = useAuth();
  const audioRef = useRef(new Audio());
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState("off");

  const playTrack = (track, list = null) => {
    const audio = audioRef.current;
    if (!audio) return;

    // 🔥 ALWAYS UPDATE QUEUE
    if (list && list.length) {
      setQueue(list);
      setCurrentIndex(list.findIndex(t => t.id === track.id));
    } else {
      setQueue(prev =>
        prev.length ? prev : [track]
      );
      setCurrentIndex(0);
    }

    audio.src = track.audio_url;
    audio.load();
    audio.play().catch(err => console.error("Play error", err));

    // Save to recently played if user is logged in
    if (user?.id) {
      addRecent(track.id, user.id);
    }

    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const playQueue = (tracks) => {
    if (!tracks.length) return;
    playTrack(tracks[0], tracks);
  };

  const playNext = () => {
    if (!queue.length) return;

    if (repeat === "one") {
      playTrack(queue[currentIndex], queue);
      return;
    }

    let nextIndex;

    if (shuffle) {
      do {
        nextIndex = Math.floor(Math.random() * queue.length);
      } while (nextIndex === currentIndex && queue.length > 1);
    } else {
      nextIndex = currentIndex + 1;
    }

    if (nextIndex >= queue.length) {
      if (repeat === "all") {
        nextIndex = 0;
      } else {
        return;
      }
    }

    playTrack(queue[nextIndex], queue);
  };

  const playPrevious = () => {
    if (!queue.length) return;

    const prevIndex =
      currentIndex === 0 ? queue.length - 1 : currentIndex - 1;

    playTrack(queue[prevIndex], queue);
  };

  useEffect(() => {
    const audio = audioRef.current;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      playNext();
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [playNext]);

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const changeVolume = (val) => {
    const v = Math.max(0, Math.min(1, val));
    setVolume(v);
    if (v > 0 && isMuted) setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted((m) => !m);
  };

  const closePlayer = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;

    setIsPlaying(false);
    setCurrentTrack(null);
    setQueue([]);
    setCurrentIndex(0);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        playTrack,
        playQueue,
        togglePlay: togglePlayPause,
        isPlaying,
        playNext,
        playPrevious,
        closePlayer,
        currentTime,
        duration,
        setCurrentTime,
        volume,
        isMuted,
        changeVolume,
        toggleMute,
        currentIndex,
        queue,
        shuffle,
        repeat,
        setShuffle,
        setRepeat
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);