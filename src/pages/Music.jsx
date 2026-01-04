import { useEffect, useState } from "react";
import { fetchTracks } from "../services/musicService";
import { likeSong, unlikeSong, fetchLikedSongs } from "../services/likeService";
import { useAuth } from "../context/AuthContext";
import MediaCard from "../components/MediaCard";
import Loading from "../components/Loading";

export default function Music() {
  const { user } = useAuth();
  const [tracks, setTracks] = useState([]);
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    const loadTracks = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTracks();
        setTracks(data);
        setFilteredTracks(data);
      } catch (err) {
        console.error("Failed to load music:", err);
        setError("Failed to load music. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadTracks();
  }, []);

  useEffect(() => {
    if (!user) return;

    fetchLikedSongs().then(setLiked).catch(console.error);
  }, [user]);

  // Filter tracks based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredTracks(tracks);
    } else {
      const filtered = tracks.filter(track =>
        track.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTracks(filtered);
    }
  }, [searchQuery, tracks]);

  const toggleLike = async (trackId) => {
    if (!user) return alert("Login required");

    const trackIdStr = String(trackId);
    console.log("Toggling like for track:", trackIdStr);

    try {
      if (liked.includes(trackIdStr)) {
        await unlikeSong(trackId);
        setLiked(prev => prev.filter(id => id !== trackIdStr));
      } else {
        await likeSong(trackId);
        setLiked(prev => [...prev, trackIdStr]);
      }
    } catch (err) {
      console.error("Like error:", err);
      alert("Failed to update like status");
    }
  };

  if (loading) return (
    <div className="page">
      <Loading message="Loading music..." />
    </div>
  );

  if (error) return (
    <div className="page">
      <div style={{ textAlign: "center", padding: "50px", color: "#e53e3e" }}>
        <h2>⚠️ Error</h2>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            background: "#6b46c1",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "20px"
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );

  if (!tracks.length) return (
    <div className="page">
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>🎵 No Music Available</h2>
        <p>Check back later for new tracks!</p>
      </div>
    </div>
  );

  return (
    <div className="page">
      <h1>🎶 Music Library</h1>
      <p className="page-subtitle">
        Explore and play your favorite tracks
      </p>

      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Search tracks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "400px",
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "16px",
            outline: "none",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}
        />
      </div>

      <div className="card-grid">
        {filteredTracks.map((track) => {
          console.log("TRACK:", track);
          return (
            <MediaCard
              key={track.id}
              item={track}
              type="music"
              tracks={filteredTracks}
              toggleLike={toggleLike}
              liked={liked}
            />
          );
        })}
      </div>
    </div>
  );
}