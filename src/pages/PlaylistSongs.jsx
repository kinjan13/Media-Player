import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";
import { removeTrackFromPlaylist } from "../services/playlistService";

export default function PlaylistSongs() {
  const { playlistId } = useParams();
  const { playTrack, playQueue } = usePlayer();

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/playlists/tracks/${playlistId}`
        );
        const data = await res.json();
        setSongs(data || []);
      } catch (err) {
        console.error("Failed to load playlist songs", err);
      } finally {
        setLoading(false);
      }
    };

    loadSongs();
  }, [playlistId]);

  if (loading) {
    return <p className="page">Loading playlist...</p>;
  }

  return (
    <div className="page">
      <h1>🎧 Playlist Songs</h1>

      {/* PLAY ALL BUTTON */}
      <button
        onClick={() => playQueue(songs)}
        disabled={songs.length === 0}
        style={{
          marginBottom: "24px",
          padding: "12px 24px",
          borderRadius: "10px",
          border: "none",
          background: songs.length === 0 ? "#ccc" : "linear-gradient(135deg,#667eea,#764ba2)",
          color: "white",
          fontWeight: "600",
          cursor: songs.length === 0 ? "not-allowed" : "pointer"
        }}
      >
        ▶ Play All
      </button>

      {songs.length === 0 && <p>No songs in this playlist yet 🎵</p>}

      {/* SONG LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {songs.map((song) => (
          <div
            key={song.id}
            style={{
              background: "rgba(255,255,255,0.95)",
              borderRadius: "16px",
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
            }}
          >
            <div>
              <h3>{song.title}</h3>
              <p style={{ opacity: 0.7 }}>{song.artist}</p>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => playTrack(song, songs)}
                style={{
                  padding: "10px 18px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#6c63ff",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                ▶ Play
              </button>

              <button
                onClick={async () => {
                  await removeTrackFromPlaylist(playlistId, song.id);
                  setSongs(prev => prev.filter(s => s.id !== song.id));
                }}
                style={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#ff4d4d",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                ❌ Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}