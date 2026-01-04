import { useState, useEffect } from "react";
import { usePlayer } from "../context/PlayerContext";
import { useAuth } from "../context/AuthContext";
import { fetchPlaylists, addTrackToPlaylist } from "../services/playlistService";

export default function MediaCard({ item, type = "music", tracks = null, toggleLike, liked }) {
  const { playTrack } = usePlayer();
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (type === "music" && user) {
      fetchPlaylists(user.id).then(setPlaylists).catch(console.error);
    }
  }, [type, user]);

  const handlePlay = () => {
    playTrack(item, tracks);
  };

  const handleAddToPlaylist = async () => {
    if (!selectedPlaylist) {
      alert("Please select a playlist");
      return;
    }

    setIsLoading(true);
    try {
      await addTrackToPlaylist(selectedPlaylist, item.id);
      alert("Added to playlist 🎶");
      setSelectedPlaylist("");
    } catch (err) {
      alert("Failed to add track");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoaded(true);
    setImageError(true);
  };

  const imageUrl = item.cover_url;
  const title = item.title;
  const subtitle = type === "music" ? item.artist : item.description;

  return (
    <div className="media-card">
      <div className="image-container">
        {!imageLoaded && (
          <div className="image-placeholder">
            <div className="animate-pulse bg-gray-300 w-full h-full rounded-lg"></div>
          </div>
        )}
        <img
          src={imageError ? "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTUwQzE1MCAxMzYuNSA xMzYuNSAxMjUgMTI1IDEyNUMxMTMuNSAxMjUgMTAwIDEzNi41IDEwMCAxNTBDMTAwIDE2My41IDExMy41IDE3NSAxMjUgMTc1QzEzNi41IDE3NSAxNTAgMTYzLjUgMTUwIDE1MFoiIGZpbGw9IiM5Q0E0QUYiLz4KPHBhdGggZD0iTTE1MCAxNzVWMTg1QzE1MCAxODcuNSAxNDcuNSAxOTAgMTQ1IDE5MEgxMDVDMTAyLjUgMTkwIDEwMCAxODcuNSAxMDAgMTg1VjE3NVoiIGZpbGw9IiM5Q0E0QUYiLz4KPC9zdmc+" : imageUrl || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTUwQzE1MCAxMzYuNSA xMzYuNSAxMjUgMTI1IDEyNUMxMTMuNSAxMjUgMTAwIDEzNi41IDEwMCAxNTBDMTAwIDE2My41IDExMy41IDE3NSAxMjUgMTc1QzEzNi41IDE3NSAxNTAgMTYzLjUgMTUwIDE1MFoiIGZpbGw9IiM5Q0E0QUYiLz4KPHBhdGggZD0iTTE1MCAxNzVWMTg1QzE1MCAxODcuNSAxNDcuNSAxOTAgMTQ1IDE5MEgxMDVDMTAyLjUgMTkwIDEwMCAxODcuNSAxMDAgMTg1VjE3NVoiIGZpbGw9IiM5Q0E0QUYiLz4KPC9zdmc+"}
          alt={title}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ display: imageLoaded ? 'block' : 'none' }}
          className="media-image"
        />
      </div>
      <h4>{title}</h4>
      <p>{subtitle}</p>

      <button
        onClick={handlePlay}
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "600",
          marginBottom: "10px",
          width: "100%"
        }}
      >
        ▶ Play
      </button>

      {type === "music" && user && (
        <>
          <select
            value={selectedPlaylist}
            onChange={(e) => setSelectedPlaylist(e.target.value)}
            style={{
              marginBottom: "8px",
              padding: "8px",
              width: "100%",
              borderRadius: "6px",
              border: "1px solid #ddd"
            }}
            disabled={isLoading}
          >
            <option value="">Select playlist</option>
            {playlists.map((playlist) => (
              <option key={playlist.id} value={playlist.id}>
                {playlist.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleAddToPlaylist}
            disabled={isLoading || !selectedPlaylist}
            style={{
              background: isLoading
                ? "#ccc"
                : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: isLoading ? "not-allowed" : "pointer",
              fontSize: "12px",
              fontWeight: "600",
              width: "100%",
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? "Adding..." : "➕ Add to Playlist"}
          </button>

          {toggleLike && (
            <button
              onClick={() => toggleLike(item.id)}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                marginTop: "8px",
                width: "100%"
              }}
            >
              {liked && liked.includes(String(item.id)) ? "❤️" : "🤍"}
            </button>
          )}
        </>
      )}
    </div>
  );
}