"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import { getCurrentPlayingTrack, getTopArtists, getTopTracks, getTopGenres, getTrackRecommendations, getRecentlyPlayedTracks } from "../lib/spotify";
import CurrentlyPlaying from "../components/CurrentlyPlaying";
import TopArtists from "../components/TopArtists";
import TopTracks from "../components/TopTracks";
import TopGenres from "../components/TopGenres";
import TrackRecommendations from "../components/TrackRecommendations";
import RecentlyPlayed from "../components/RecentlyPlayed";

export default function Page() {
  const { data: session } = useSession();

  const [apiResponses, setApiResponses] = useState({});
  const [timeRange, setTimeRange] = useState("long_term");
  const { topArtists, topTracks, topGenres, trackRecommendations } = apiResponses[timeRange] || {};
  const [currentPlayingTrack, setCurrentPlayingTrack] = useState(null);
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState(null);

  const handleRangeButton = async (range) => {
    if (session) {
      setTimeRange(range);
      if (!apiResponses[range]) {
        await fetchData(session, range);
      }
    };
  };

  async function fetchData(session, range) {
    const topArtistsData = await getTopArtists(session, range);
    const topTracksData = await getTopTracks(session, range);
    const topGenresData = await getTopGenres(topArtistsData);

    const seedTracks = topTracksData.items.slice(0, 5).map(track => track.id).join(',');
    const trackRecommendationsData = await getTrackRecommendations(session, seedTracks);

    setApiResponses(prevResponses => ({
      ...prevResponses,
      [range]: {
        topArtists: topArtistsData.items,
        topTracks: topTracksData.items,
        topGenres: topGenresData,
        trackRecommendations: trackRecommendationsData.tracks
      }
    }));
  };

  useEffect(() => {
    if (session) {
      fetchData(session, timeRange);
      getCurrentPlayingTrack(session).then(data => {
        // checks if song is playing, if so, set currentPlayingTrack 
        if (data) {
          setCurrentPlayingTrack(data.item);
        }
      });
      getRecentlyPlayedTracks(session).then(data => setRecentlyPlayedTracks(data.items));
    }
  }, [session]);

  return (
    <div className="overflow-hidden">
      {/* Top Section */}
      <div className="flex flex-col justify-between items-center gap-y-10 pt-32 pb-10 px-8 md:flex-row lg:px-[8%] xl:px-[14%]">
        {/* User's profile info */}
        <section className="flex flex-col items-center gap-x-5 gap-y-8 w-[150%] md:flex-row">
          <img className="w-40 h-40 rounded-full" src={session?.user.image} alt="profile picture" />
          <h1 className="text-3xl font-bold truncate">{session?.user.name}</h1>
        </section>
        {/* User's currently playing track */}
        <CurrentlyPlaying currentPlayingTrack={currentPlayingTrack} />
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-y-4 pt-12 px-8 bg-primary-dark-gray lg:justify-between lg:px-[8%] xl:px-[14%]">
        {/* Time range buttons (controls: artists, tracks, genres, and recommendations) */}
        <section className="flex justify-end gap-x-2 text-lg font-extrabold text-primary-pink">
          <button className={`px-3 py-1 bg-primary-med-gray rounded hover:text-primary-white ${timeRange === "short_term" ? "text-primary-white bg-primary-pink" : ""}`} onClick={() => handleRangeButton("short_term")}>1m</button>
          <button className={`px-3 py-1 bg-primary-med-gray rounded hover:text-primary-white ${timeRange === "medium_term" ? "text-primary-white bg-primary-pink" : ""}`} onClick={() => handleRangeButton("medium_term")}>6m</button>
          <button className={`px-3 py-1 bg-primary-med-gray rounded hover:text-primary-white ${timeRange === "long_term" ? "text-primary-white bg-primary-pink" : ""}`} onClick={() => handleRangeButton("long_term")}>all time</button>
        </section>

        {/* User stats */}
          <div className="flex flex-col gap-y-16">
            <TopArtists topArtists={topArtists} />
            <TopTracks session={session} topTracks={topTracks} />
            <TopGenres session={session} topGenres={topGenres} />
            <TrackRecommendations session={session} trackRecommendations={trackRecommendations} />
            <RecentlyPlayed recentlyPlayedTracks={recentlyPlayedTracks} />
          </div>
        </div>
    </div>
  );
}