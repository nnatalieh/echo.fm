
const TopArtists = ({ timeRange, topArtists }) => {
  const term = {
    "short_term": "1 month",
    "medium_term": "6 months"
  };

  return (
    <section className="flex flex-col gap-y-3">
      <div className="flex flex-col gap-y-2 truncate">
        <h2 className="truncate text-2xl md:text-3xl">Top Artists</h2>
        <p className="truncate text-sm font-medium text-primary-light-gray">{timeRange === "long_term" ? "Your top artists of all time" : `Your top artists within the last ${term[timeRange]}`}</p>
      </div>
      <ul className="flex flex-row gap-x-6 py-4 overflow-x-scroll">
        {(topArtists) && topArtists.map((artist, index) => (
          <li key={index} className="flex flex-col gap-2 flex-shrink-0 w-36 truncate">
            <img className="w-36 h-36 rounded-lg" src={artist.images[0].url} alt="artist image" />
            <span className="text-lg font-bold truncate">{index+1}. {artist.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TopArtists;
