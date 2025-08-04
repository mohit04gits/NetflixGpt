import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieNames) return;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 mt-16 sm:mt-20 md:mt-24 bg-black bg-opacity-90 text-white">
      <div className="space-y-6 sm:space-y-8 lg:space-y-10">
        {movieNames.map((movieName,index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
