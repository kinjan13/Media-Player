export const fetchTracks = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/music/tracks");
    const data = await res.json();
    if (data && data.length > 0) {
      return data;
    }
  } catch (error) {
    console.error("API error, using mock data:", error);
  }

  // Mock tracks for testing
  return [
    {
      id: 1,
      title: "Sample Song 1",
      artist: "Artist 1",
      audio_url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Sample audio URL
      cover_url: "https://picsum.photos/300/300?random=1"
    },
    {
      id: 2,
      title: "Sample Song 2",
      artist: "Artist 2",
      audio_url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      cover_url: "https://picsum.photos/300/300?random=2"
    },
    {
      id: 3,
      title: "Sample Song 3",
      artist: "Artist 3",
      audio_url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      cover_url: "https://picsum.photos/300/300?random=3"
    }
  ];
};