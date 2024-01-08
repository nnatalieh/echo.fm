
export const getTopArtists = async (session, timeRange) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=50`, {
      method: "GET",
      headers: { Authorization: `Bearer ${session?.accessToken}` }
    });

    if (!response.ok) {
      throw new Error(`getTopArtists error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getTopTracks = async (session, timeRange) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=5`, {
      method: "GET",
      headers: { Authorization: `Bearer ${session?.accessToken}` }
    });

    if (!response.ok) {
      throw new Error(`getTopTracks error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getRecentlyPlayedTracks = async (session) => {
  try {
    const response = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=5", {
      method: "GET",
      headers: { Authorization: `Bearer ${session?.accessToken}` }
    });

    if (!response.ok) {
      throw new Error(`getRecentlyPlayedTracks error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getCurrentPlayingTrack = async (session) => {
  try {
    const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      method: "GET",
      headers: { Authorization: `Bearer ${session?.accessToken}` }
    });

    if (!response.ok) {
      throw new Error(`getCurrentPlayingTrack error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getTrackRecommendations = async (session, seedTracks) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/recommendations?limit=5&seed_tracks=${seedTracks}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${session?.accessToken}` }
    });

    if (!response.ok) {
      throw new Error(`getTrackRecommendations error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getTopGenres = async (session, time_range) => {
  const response = await getTopArtists(session, time_range);
  const topArtists = response.items;

  const genreCounts = {};

  topArtists.forEach(artist => {
    artist.genres.forEach(genre => {
      if (genre in genreCounts) {
        genreCounts[genre]++;
      } else {
        genreCounts[genre] = 1;
      }
    });
  });

  const sortedGenres = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]);

  return sortedGenres.slice(0, 5);
};