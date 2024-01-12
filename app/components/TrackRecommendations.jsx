
const TrackRecommendations = ({ trackRecommendations }) => {
  return (
    <section className="flex flex-col gap-y-4">
      <h2 className="text-3xl">Track Recommendations</h2>
      <ul className="flex flex-row gap-x-6 overflow-x-scroll">
        {(trackRecommendations) && trackRecommendations.map((track, index) => (
          <li key={index} className="flex flex-col gap-y-2 flex-shrink-0 w-36 truncate">
            <img className="w-36 h-36 rounded-lg" src={track.album.images[0].url} alt="album image" />
            <div className="gap-x-2">
              <h3 className="truncate">{track.name}</h3>
              <span className="text-sm text-primary-light-gray truncate">{track.artists[0].name}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TrackRecommendations;
