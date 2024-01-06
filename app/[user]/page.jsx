"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import { getTopArtists, getTopTracks, getRecentlyPlayedTracks } from "app/lib/spotify";


export default function Page({ params }) {
  const { data: session } = useSession();
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState(null);

  useEffect(() => {
    if (session) {
      getTopArtists(session).then(data => setTopArtists(data.items));
      getTopTracks(session).then(data => setTopTracks(data.items));
      getRecentlyPlayedTracks(session).then(data => setRecentlyPlayedTracks(data.items));
    }
  }, [session]);

  return (
    <div>
      <h1>User: {params.user}</h1>
      <div className="flex justify-between">
        {/* User's top artists */}
        <div>
          <h1 className="text-xl">Top Artists</h1>
          {(topArtists) && topArtists.map((artist, index) => (
            <p key={index}>{artist.name}</p>
          ))}
        </div>
          
        {/* User's top tracks */}
        <div>
          <h1 className="text-xl">Top Tracks</h1>
          {(topTracks) && topTracks.map((track, index) => (
            <p key={index}>{track.name}</p>
          ))}
        </div>

        {/* User's recently played tracks */}
        <div>
          <h1 className="text-xl">Recently Played Tracks</h1>
          {(recentlyPlayedTracks) && recentlyPlayedTracks.map((track, index) => (
            <p key={index}>{track.track.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
}