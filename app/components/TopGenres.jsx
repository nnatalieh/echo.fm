import React from "react";

const TopGenres = ({ timeRange, topGenres }) => {
  const term = {
    "short_term": "1 month",
    "medium_term": "6 months"
  };

  return (
    <section className="flex flex-col gap-y-3">
      <div className="flex flex-col gap-y-2 truncate">
        <h2 className="truncate text-2xl md:text-3xl">Top Genres</h2>
        <p className="truncate text-sm font-medium text-primary-light-gray">{timeRange === "long_term" ? "Your top genres of all time" : `Your top genres within the last ${term[timeRange]}`}</p>
      </div>
      <ul className="flex flex-row gap-x-4 py-4 overflow-x-scroll">
        {(topGenres) && topGenres.map((genre, index) => (
          <li key={index} className="w-max flex-shrink-0">{genre[0]}</li>
        ))}
      </ul>
    </section> 
  );
};

export default TopGenres;
