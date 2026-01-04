import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { usePlayer } from "../context/PlayerContext";
import MediaCard from "../components/MediaCard";

export default function LikedSongs() {
  const { user } = useAuth();
  const { playTrack } = usePlayer();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (!user) return;

    const loadLikedSongs = async () => {
      console.log("Loading liked songs for user:", user.id);

      // Get liked track IDs from localStorage
      const likedKey = `liked_songs_${user.id}`;
      const likedTrackIds = JSON.parse(localStorage.getItem(likedKey) || '[]');

      console.log("Liked track IDs from localStorage:", likedTrackIds);

      if (!likedTrackIds || likedTrackIds.length === 0) {
        setSongs([]);
        return;
      }

      // Fetch all tracks from the music service
      const { fetchTracks } = await import("../services/musicService");
      const allTracks = await fetchTracks();

      // Filter tracks to only include liked ones
      const likedTracks = allTracks.filter(track => likedTrackIds.includes(String(track.id)));

      console.log("Filtered liked tracks:", likedTracks);
      setSongs(likedTracks);
    };

    loadLikedSongs();
  }, [user]);

  if (!user) {
    return (
      <div className="page">
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2>🔒 Login Required</h2>
          <p>Please log in to view your liked songs.</p>
        </div>
      </div>
    );
  }

  if (!songs.length) {
    return (
      <div className="page">
        <h1>❤️ Liked Songs</h1>
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2>🎵 No Liked Songs Yet</h2>
          <p>Go to the Music Library and like some songs to see them here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>❤️ Liked Songs</h1>
      <p className="page-subtitle">
        Your favorite tracks
      </p>

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
    </div>
  );
}