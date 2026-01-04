import { supabase } from "./supabaseClient";

// Temporary implementation using localStorage since Supabase table schema is incomplete
// TODO: Fix Supabase table to include track_id column

export const likeSong = async (trackId) => {
  console.log("Attempting to like track:", trackId);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("Current user:", user);

  if (!user) throw new Error("Not logged in");

  // For now, use localStorage to store liked songs
  const likedKey = `liked_songs_${user.id}`;
  const currentLiked = JSON.parse(localStorage.getItem(likedKey) || '[]');

  if (!currentLiked.includes(String(trackId))) {
    currentLiked.push(String(trackId));
    localStorage.setItem(likedKey, JSON.stringify(currentLiked));
  }

  console.log("Successfully liked track:", trackId);
};

export const unlikeSong = async (trackId) => {
  console.log("Attempting to unlike track:", trackId);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not logged in");

  // Remove from localStorage
  const likedKey = `liked_songs_${user.id}`;
  const currentLiked = JSON.parse(localStorage.getItem(likedKey) || '[]');
  const updatedLiked = currentLiked.filter(id => id !== String(trackId));

  localStorage.setItem(likedKey, JSON.stringify(updatedLiked));

  console.log("Successfully unliked track:", trackId);
};

export const fetchLikedSongs = async () => {
  console.log("Fetching liked songs...");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("Current user for fetch:", user);

  if (!user) return [];

  // Get from localStorage
  const likedKey = `liked_songs_${user.id}`;
  const likedSongs = JSON.parse(localStorage.getItem(likedKey) || '[]');

  console.log("Fetched liked songs:", likedSongs);
  return likedSongs;
};