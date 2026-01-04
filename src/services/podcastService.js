import API_BASE_URL from "./api";

export const fetchPodcasts = async () => {
  const res = await fetch(`${API_BASE_URL}/api/podcasts`);
  return res.json();
};