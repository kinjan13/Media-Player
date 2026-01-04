export const addRecent = async (trackId, userId) => {
  await fetch("http://localhost:5000/api/recent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ track_id: trackId, user_id: userId })
  });
};

export const fetchRecent = async (userId) => {
  const res = await fetch(`http://localhost:5000/api/recent/${userId}`);
  return res.json();
};