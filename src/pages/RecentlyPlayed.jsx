import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { usePlayer } from "../context/PlayerContext";
import { fetchRecent } from "../services/recentService";
import MediaCard from "../components/MediaCard";

export default function RecentlyPlayed() {
  const { user } = useAuth();
  const { playTrack } = usePlayer();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetchRecent(user.id).then(setSongs);
  }, [user]);

  if (!user) {
    return (
      <div className="page">
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2>🔒 Login Required</h2>
          <p>Please log in to view your recently played songs.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>🕘 Recently Played</h1>
      <p className="page-subtitle">
        Your recently played tracks
      </p>

      {songs.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2>🎵 No Recent Songs</h2>
          <p>Start playing some music to see your recently played tracks here!</p>
        </div>
      ) : (
        <div className="card-grid">
          {songs.map((song) => (
            <MediaCard
              key={song.id}
              item={song}
              type="music"
              tracks={songs}
            />
          ))}
        </div>
      )}
    </div>
  );
}