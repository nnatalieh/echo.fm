
const CurrentlyPlaying = ({ currentPlayingTrack }) => {
  return (
    <section className="flex flex-col justify-center gap-y-3 w-full h-32 px-6 rounded-3xl bg-primary-pink truncate">
      <h1 className="text-2xl font-bold truncate">Currently Playing</h1>
      {currentPlayingTrack ? (
        <div className="flex items-center gap-x-3">
          <img className="w-12 h-12 rounded-lg" src={currentPlayingTrack.album.images[0].url} alt="album image" />
          <div className="truncate"> 
            <p className="truncate">{currentPlayingTrack.name}</p>
            <p className="font-medium truncate text-primary-light-pink">{currentPlayingTrack.artists[0].name}</p>
          </div>
        </div>
      ) : (
        <p className="text-xl truncate text-primary-light-pink">Inactive</p>
      )}
    </section>
  );
};

export default CurrentlyPlaying;