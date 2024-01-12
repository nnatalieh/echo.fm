
const formatTime = (timestamp) => {
  const currentDate = new Date();
  const playedDate = new Date(timestamp);
  const timeDifference = currentDate - playedDate;

  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));

  if (minutes < 60) {
    if (minutes == 0) {
      return `just now`;
    } else if (minutes == 1) {
      return `a minute ago`;
    }
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    if (hours == 1) {
      return `an hour ago`;
    }
    return `${hours} hours ago`;
  } else {
    const options = { day: "numeric", month: "long", hour: "numeric", minute: "numeric" };
    return playedDate.toLocaleDateString("en-US", options);
  }
};

const RecentlyPlayed = ({ recentlyPlayedTracks }) => {
  return (
    <section className="flex flex-col gap-y-4">
      <h2 className="text-3xl">Recently Played</h2> 
      <ul>
        {(recentlyPlayedTracks) && recentlyPlayedTracks.map((track, index) => (
          <li key={index} className="flex justify-between items-center gap-x-4 py-3 border-b border-primary-med-gray">
            <div className="flex items-center gap-x-3 w-[75%]">
              <img className="w-12 h-12 rounded-lg" src={track.track.album.images[0].url} alt="album image" />
              <div className="flex flex-col justify-between gap-x-4 w-[75%] lg:flex-row">
                <h1 className="font-bold truncate">{track.track.name}</h1>
                <p className="flex text-primary-light-gray truncate">{track.track.artists[0].name}</p>
              </div>
            </div>
            <p className="text-right text-sm font-medium text-primary-pink md:text-base">{formatTime(track.played_at)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecentlyPlayed;
