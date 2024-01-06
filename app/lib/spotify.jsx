
export const getTopArtists = async (session) => {
  try {
    const response = await fetch("https://api.spotify.com/v1/me/top/artists?limit=5", {
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