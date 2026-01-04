import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createPlaylist, fetchPlaylists } from "../services/playlistService";
import { useNavigate } from "react-router-dom";

export default function Playlists() {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPlaylists = async () => {
      if (!user?.id) return;

      try {
        const data = await fetchPlaylists(user.id);
        console.log("Fetched playlists:", data);
        setPlaylists(data || []);
      } catch (error) {
        console.error("Failed to load playlists:", error);
        setPlaylists([]);
      }
    };

    loadPlaylists();
  }, [user?.id]);

  const handleCreate = async () => {
    if (!name.trim()) return alert("Enter playlist name");
    if (!user?.id) return alert("User not logged in");

    try {
      setLoading(true);
      const newPlaylist = await createPlaylist(name, user.id);

      if (!newPlaylist || newPlaylist.error) {
        throw new Error("Playlist creation failed");
      }

      setPlaylists((prev) => [...prev, newPlaylist]);
      setName("");
    } catch (err) {
      console.error(err);
      alert("Failed to create playlist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>🎼 Your Playlists</h1>

      {/* CREATE PLAYLIST */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Playlist name"
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.9)",
            color: "#333",
            width: "240px",
            fontSize: "16px"
          }}
        />

        <button
          onClick={handleCreate}
          disabled={loading}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            background: loading ? "#ccc" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "600",
            transition: "transform 0.3s ease"
          }}
          onMouseOver={(e) => !loading && (e.target.style.transform = "translateY(-2px)")}
          onMouseOut={(e) => !loading && (e.target.style.transform = "translateY(0)")}
        >
          {loading ? "Creating..." : "Create Playlist"}
        </button>
      </div>

      {/* PLAYLIST LIST */}
      {playlists.length === 0 && (
        <p>No playlists yet. Create your first one 🎧</p>
      )}

      <div className="card-grid">
        {playlists.map((pl) => (
          <div
            key={pl.id}
            className="media-card"
            onClick={() => navigate(`/playlists/${pl.id}`)}
            style={{ cursor: "pointer" }}
          >
            <h4>{pl.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}