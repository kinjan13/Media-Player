export const searchMusic = async (query) => {
  try {
    const res = await fetch(`http://localhost:5000/api/music/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Search failed');
    return await res.json();
  } catch (error) {
    console.error("Music search error:", error);
    // Fallback: filter mock data
    const mockTracks = [
      { id: 1, title: "Sample Song 1", artist: "Artist 1", audio_url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", cover_url: "/placeholder.jpg" },
      { id: 2, title: "Sample Song 2", artist: "Artist 2", audio_url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", cover_url: "/placeholder.jpg" },
      { id: 3, title: "Sample Song 3", artist: "Artist 3", audio_url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", cover_url: "/placeholder.jpg" },
      { id: 4, title: "Rock Anthem", artist: "Rock Band", audio_url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", cover_url: "/placeholder.jpg" },
      { id: 5, title: "Jazz Improv", artist: "Jazz Master", audio_url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", cover_url: "/placeholder.jpg" }
    ];
    return mockTracks.filter(track =>
      track.title.toLowerCase().includes(query.toLowerCase()) ||
      track.artist.toLowerCase().includes(query.toLowerCase())
    );
  }
};

export const searchPodcasts = async (query) => {
  try {
    const res = await fetch(`http://localhost:5000/api/podcasts/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Search failed');
    return await res.json();
  } catch (error) {
    console.error("Podcast search error:", error);
    // Fallback: filter mock data
    const mockPodcasts = [
      { id: 1, title: "Tech Talk", description: "Latest in technology", cover_url: "/placeholder.jpg", audio_url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
      { id: 2, title: "Music Review", description: "Weekly music reviews", cover_url: "/placeholder.jpg", audio_url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
      { id: 3, title: "News Update", description: "Daily news podcast", cover_url: "/placeholder.jpg", audio_url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" }
    ];
    return mockPodcasts.filter(podcast =>
      podcast.title.toLowerCase().includes(query.toLowerCase()) ||
      podcast.description.toLowerCase().includes(query.toLowerCase())
    );
  }
};

export const searchAll = async (query) => {
  try {
    const [musicResults, podcastResults] = await Promise.all([
      searchMusic(query),
      searchPodcasts(query)
    ]);

    return {
      music: musicResults,
      podcasts: podcastResults
    };
  } catch (error) {
    console.error("Search all error:", error);
    return { music: [], podcasts: [] };
  }
};