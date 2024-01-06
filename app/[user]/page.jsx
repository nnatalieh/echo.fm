"use client";

import { getTopArtists } from "app/lib/spotify";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";


export default function Page({ params }) {
  const { data: session } = useSession();
  const [topArtists, setTopArtists] = useState(null);

  useEffect(() => {
    if (session) {
      getTopArtists(session).then(data => setTopArtists(data.items));
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
      </div>
    </div>
  );
}