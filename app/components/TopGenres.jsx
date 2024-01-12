import React from "react";

const TopGenres = ({ topGenres }) => {
  return (
    <section className="flex flex-col gap-y-4">
      <h2 className="text-3xl">Top Genres</h2>
      <ul className="flex flex-row gap-x-4 overflow-x-scroll">
        {(topGenres) && topGenres.map((genre, index) => (
          <li key={index} className="w-max flex-shrink-0">{genre[0]}</li>
        ))}
      </ul>
    </section> 
  );
};

export default TopGenres;
