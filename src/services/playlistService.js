const API_BASE = "http://localhost:5000/api/playlists";

export async function fetchPlaylists(userId) {
  const res = await fetch(`${API_BASE}?user_id=${userId}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch playlists");
  }

  return res.json();
}

export const createPlaylist = async (name, userId) => {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ name, user_id: userId }),
  });
  return res.json();
};

export async function addTrackToPlaylist(playlistId, trackId) {
  const res = await fetch(`${API_BASE}/add-track`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      playlist_id: playlistId,
      track_id: trackId,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to add track");
  }

  return res.json();
}

export const fetchPlaylistTracks = async (playlistId) => {
  const res = await fetch(`${API_BASE}/tracks/${playlistId}`);
  return res.json();
};

export async function removeTrackFromPlaylist(playlistId, trackId) {
  const res = await fetch(`${API_BASE}/remove-track`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      playlist_id: playlistId,
      track_id: trackId
    })
  });

  if (!res.ok) {
    throw new Error("Failed to remove track");
  }

  return res.json();
}