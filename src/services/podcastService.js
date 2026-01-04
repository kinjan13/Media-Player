export const fetchPodcasts = async () => {
  const res = await fetch("http://localhost:5000/api/podcasts");
  return res.json();
};