import { useEffect, useState } from "react";
import { fetchPodcasts } from "../services/podcastService";
import MediaCard from "../components/MediaCard";
import Loading from "../components/Loading";

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadPodcasts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPodcasts();
        setPodcasts(data);
        setFilteredPodcasts(data);
      } catch (err) {
        console.error("Failed to load podcasts:", err);
        setError("Failed to load podcasts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadPodcasts();
  }, []);

  // Filter podcasts based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPodcasts(podcasts);
    } else {
      const filtered = podcasts.filter(podcast =>
        podcast.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        podcast.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPodcasts(filtered);
    }
  }, [searchQuery, podcasts]);

  if (loading) {
    return <Loading message="Loading podcasts..." />;
  }

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

  return (
    <div className="page">
      <h1>🎙️ Discover Podcasts</h1>
      <p className="page-subtitle">
        Explore the latest and greatest podcasts
      </p>

      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Search podcasts..."
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
        {filteredPodcasts.map((podcast) => (
          <MediaCard key={podcast.id} item={podcast} type="podcast" tracks={filteredPodcasts} />
        ))}
      </div>
    </div>
  );
}