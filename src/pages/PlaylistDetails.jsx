import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";

export default function PlaylistDetails() {
  const { playlistId } = useParams();
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { playTrack, playQueue } = usePlayer();

  useEffect(() => {
    fetch(`http://localhost:5000/api/playlists/tracks/${playlistId}`)
      .then(res => res.json())
      .then(data => {
        setTracks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Failed to load playlist tracks", err);
        setLoading(false);
      });
  }, [playlistId]);

  if (loading) return <p style={{ padding: 40 }}>Loading playlist...</p>;

  return (
    <div className="page">
      <h1 className="page-title">🎧 Playlist Songs</h1>

      {tracks.length > 0 && (
        <button
          className="play-all-btn"
          onClick={() => playQueue(tracks)}
        >
          ▶ Play All
        </button>
      )}

      <div className="playlist-vertical-list">
        {tracks.map((track) => (
          <div className="playlist-media-card" key={track.id}>
            <img src={track.cover_url} alt={track.title} />

            <h4>{track.title}</h4>
            <p>{track.artist}</p>

            <button
              className="play-btn"
              onClick={() => playTrack(track, tracks)}
            >
              ▶ Play
            </button>
          </div>
        ))}
      </div>

      {tracks.length === 0 && (
        <p className="empty-text">🎵 No songs in this playlist yet</p>
      )}
    </div>
  );
}