import { usePlayer } from "../context/PlayerContext";

export default function PodcastCard({ podcast }) {
  const { playTrack } = usePlayer();

  return (
    <div className="media-card">
      <img src={podcast.cover_url} alt="" />
      <h4>{podcast.title}</h4>
      <p>{podcast.description}</p>
      <button onClick={() => playTrack(podcast)}>▶ Play</button>
    </div>
  );
}