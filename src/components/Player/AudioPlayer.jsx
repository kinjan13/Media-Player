import { usePlayer } from "../../context/PlayerContext";

export default function AudioPlayer() {
  const { currentTrack, isPlaying, togglePlay, playNext, playPrevious, closePlayer, audioRef, currentTime, duration, volume, changeVolume, shuffle, repeat, setShuffle, setRepeat } = usePlayer();

  if (!currentTrack) return null;

  const formatTime = (time) => {
    if (!time) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="player">
      <button className="player-close" onClick={closePlayer} title="Close Player">
        ✕
      </button>

      <div className="player-info">
        <div className="player-title">{currentTrack.title}</div>

        <div className="player-seek">
          <span className="time">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={(e) => {
              audioRef.current.currentTime = e.target.value;
            }}
          />
          <span className="time">{formatTime(duration)}</span>
        </div>

        <div className="player-artist">{currentTrack.artist}</div>
      </div>

      <div className="player-controls">
        <button onClick={playPrevious}>⏮</button>
        <button onClick={togglePlay}>
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button onClick={playNext}>⏭</button>

        <input
          type="range"
          className="volume"
          min="0"
          max="100"
          value={Math.round(volume * 100)}
          onChange={(e) => changeVolume(Number(e.target.value) / 100)}
        />
      </div>

      <div className="player-extra-controls">
        <button
          onClick={() => setShuffle(!shuffle)}
          className={shuffle ? "active-btn" : ""}
        >
          🔀
        </button>

        <button
          onClick={() =>
            setRepeat(
              repeat === "off"
                ? "all"
                : repeat === "all"
                ? "one"
                : "off"
            )
          }
        >
          {repeat === "off" && "🔁"}
          {repeat === "all" && "🔁 ALL"}
          {repeat === "one" && "🔂 ONE"}
        </button>
      </div>
    </div>
  );
}