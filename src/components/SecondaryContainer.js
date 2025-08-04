import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  
  // Check if any movies are available
  const hasMovies = movies.NowPlayingMovies && movies.NowPlayingMovies.length > 0;
  
  if (!hasMovies) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">Loading Movies...</h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg">
            Please check your internet connection and try again.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-black">
      <div className="mt-0 sm:-mt-20 md:-mt-32 lg:-mt-52 relative z-20">
        <MovieList title={"Now Playing"} movies={movies.NowPlayingMovies} />
      </div>
      <MovieList title={"Trending"} movies={movies.trendingMovies} />
      <MovieList title={"Popular"} movies={movies.PopularMovies} />
      <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies} />
      <MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies} />
    </div>
  );
};

export default SecondaryContainer;



