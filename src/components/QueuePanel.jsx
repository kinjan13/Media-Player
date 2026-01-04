import { usePlayer } from "../context/PlayerContext";

export default function QueuePanel() {
  const { queue, currentIndex, playTrack } = usePlayer();

  if (!queue.length) return null;

  return (
    <div className="queue-panel">
      <h3>Up Next</h3>

      <div className="queue-list">
        {queue.map((song, index) => (
          <div
            key={song.id}
            className={`queue-item ${
              index === currentIndex ? "active" : ""
            }`}
            onClick={() => playTrack(song, queue)}
          >
            <span className="queue-title">{song.title}</span>
            <span className="queue-artist">{song.artist}</span>
          </div>
        ))}
      </div>
    </div>
  );
}