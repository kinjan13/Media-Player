import API_BASE_URL from "./api";

export const addRecent = async (trackId, userId) => {
  await fetch(`${API_BASE_URL}/api/recent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ track_id: trackId, user_id: userId })
  });
};

export const fetchRecent = async (userId) => {
  const res = await fetch(`${API_BASE_URL}/api/recent/${userId}`);
  return res.json();
};