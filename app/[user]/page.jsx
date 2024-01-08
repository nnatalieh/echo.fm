"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import { getTopArtists, getTopTracks, getRecentlyPlayedTracks, getCurrentPlayingTrack, getTrackRecommendations, getTopGenres } from "app/lib/spotify";


export default function Page({ params }) {
  const { data: session } = useSession();
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState(null);
  const [currentPlayingTrack, setCurrentPlayingTrack] = useState(null);
  const [trackRecommendations, setTrackRecommendations] = useState(null);
  const [topGenres, setTopGenres] = useState(null);

  const [artistsTimeRange, setArtistsTimeRange] = useState("long_term");
  const [tracksTimeRange, setTracksTimeRange] = useState("long_term");
  const [genresTimeRange, setGenresTimeRange] = useState("long_term");

  const handleRangeButton = (type, range) => {
    if (session) {
      if (type === "artists") {
        setArtistsTimeRange(range);
        getTopArtists(session, range).then(data => setTopArtists(data.items));
      } else if (type === "tracks") {
        setTracksTimeRange(range);
        getTopTracks(session, range).then(data => setTopTracks(data.items));
      } else if (type === "genres") {
        setGenresTimeRange(range);
        getTopGenres(session, range).then(data => setTopGenres(data));
      }
    }
  };

  useEffect(() => {
    if (session) {
      getTopArtists(session, artistsTimeRange).then(data => setTopArtists(data.items));
      getTopTracks(session, tracksTimeRange).then(data => {
        setTopTracks(data.items);
        // Uses the IDs of the first 5 top tracks as seed tracks
        const seedTracks = data.items.slice(0, 5).map(track => track.id).join(',');
        getTrackRecommendations(session, seedTracks).then(data => setTrackRecommendations(data.tracks));
      });
      getRecentlyPlayedTracks(session).then(data => setRecentlyPlayedTracks(data.items));
      getCurrentPlayingTrack(session).then(data => {
        // checks if song is playing, if so, set currentPlayingTrack 
        if (data) {
          setCurrentPlayingTrack(data.item);
        }
      });
      getTopGenres(session, genresTimeRange).then(data => setTopGenres(data));
    }
  }, [session]);

  return (
    <div>
      <h1>User: {params.user}</h1>
      <div className="flex justify-between">
        {/* User's top genres */}
        <div>
          <h1 className="text-xl">Top Genres</h1>
          {(topGenres) && topGenres.map((genre, index) => (
            <p key={index}>{genre[0]}</p>
          ))}
          <div className="flex gap-x-2 font-bold text-pink-600 ">
            <button onClick={() => handleRangeButton("genres", "short_term")}>1m</button>
            <button onClick={() => handleRangeButton("genres", "medium_term")}>6m</button>
            <button onClick={() => handleRangeButton("genres", "long_term")}>all time</button>
          </div>
        </div>

        {/* User's top artists */}
        <div>
          <h1 className="text-xl">Top Artists</h1>
          {(topArtists) && topArtists.slice(0, 5).map((artist, index) => (
            <p key={index}>{artist.name}</p>
          ))}
          <div className="flex gap-x-2 font-bold text-pink-600 ">
            <button onClick={() => handleRangeButton("artists", "short_term")}>1m</button>
            <button onClick={() => handleRangeButton("artists", "medium_term")}>6m</button>
            <button onClick={() => handleRangeButton("artists", "long_term")}>all time</button>
          </div>
        </div>
          
        {/* User's top tracks */}
        <div>
          <h1 className="text-xl">Top Tracks</h1>
          {(topTracks) && topTracks.map((track, index) => (
            <p key={index}>{track.name}</p>
          ))}
          <div className="flex gap-x-2 font-bold text-pink-600">
            <button onClick={() => handleRangeButton("tracks", "short_term")}>1m</button>
            <button onClick={() => handleRangeButton("tracks", "medium_term")}>6m</button>
            <button onClick={() => handleRangeButton("tracks", "long_term")}>all time</button>
          </div>
        </div>

        {/* User's track recommendations */}
        <div>
          <h1 className="text-xl">Track Recommendations</h1>
          {(trackRecommendations) && trackRecommendations.map((track, index) => (
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

        {/* User's currently playing track */}
        <div>
          <h1 className="text-xl">Currently Playing Track</h1>
          {(currentPlayingTrack) && (
            <p>{currentPlayingTrack.name}</p>
          )}
        </div>
      </div>
    </div>
  );
}