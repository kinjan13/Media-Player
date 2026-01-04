import { useEffect, useState } from "react";
import { fetchPlaylists, addTrackToPlaylist } from "../services/playlistService";

export default function MusicCard({ track }) {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  useEffect(() => {
    fetchPlaylists().then(setPlaylists);
  }, []);

  const handleAddToPlaylist = async () => {
    if (!selectedPlaylist) {
      alert("Please select a playlist");
      return;
    }

    try {
      await addTrackToPlaylist(selectedPlaylist, track.id);
      alert("Added to playlist 🎶");
      setSelectedPlaylist("");
    } catch (err) {
      alert("Failed to add track");
      console.error(err);
    }
  };

  return (
    <div className="music-card">
      <img src={track.image_url} alt={track.title} />
      <h3>{track.title}</h3>
      <p>{track.artist}</p>

      <button className="play-btn">▶ Play</button>

      <select
        value={selectedPlaylist}
        onChange={(e) => setSelectedPlaylist(e.target.value)}
      >
        <option value="">Select playlist</option>
        {playlists.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <button className="add-btn" onClick={handleAddToPlaylist}>
        ➕ Add
      </button>
    </div>
  );
}
