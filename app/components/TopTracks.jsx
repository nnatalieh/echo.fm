import { saveToPlaylist } from "../lib/spotify";

const TopTracks = ({ session, timeRange, topTracks }) => {
  const trackUris = topTracks ? topTracks.map(track => "spotify:track:" + track.id).join(",") : "";
  
  const term = {
    "short_term": "1 month",
    "medium_term": "6 months"
  };

  return (
    <section className="flex flex-col gap-y-3">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-y-2 truncate">
          <h2 className="truncate text-2xl md:text-3xl">Top Tracks</h2>
          <p className="truncate text-sm font-medium text-primary-light-gray">{timeRange === "long_term" ? "Your top tracks of all time" : `Your top tracks within the last ${term[timeRange]}`}</p>
        </div>
        <button 
          className="truncate text-base md:text-lg font-bold px-3 py-2 rounded-xl text-primary-light-pink bg-primary-dark-pink hover:bg-opacity-85"
          onClick={() => saveToPlaylist(session, trackUris, "Top Tracks")}>
            Save to playlist
        </button>
      </div>
      <ul className="flex flex-row gap-x-6 py-4 overflow-x-scroll">
        {(topTracks) && topTracks.map((track, index) => (
          <li key={index} className="flex flex-col gap-y-2 flex-shrink-0 w-36">
            <img className="w-36 h-36 rounded-lg" src={track.album.images[0].url} alt="album image" />
            <div className="gap-x-2">
              <h3 className="text-lg font-bold truncate">{index+1}. {track.name}</h3>
              <span className="text-sm text-primary-light-gray truncate">{track.artists[0].name}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TopTracks;
