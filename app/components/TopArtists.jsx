
const TopArtists = ({ topArtists }) => {
  return (
    <section className="flex flex-col gap-y-4">
      <h2 className="text-3xl">Top Artists</h2>
      <ul className="flex flex-row gap-x-6 overflow-x-scroll">
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
