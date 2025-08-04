import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-4 sm:px-8 md:px-16 py-4 sm:py-6">
      <h2 className="text-lg md:text-2xl text-white mb-3 sm:mb-4 font-semibold">{title}</h2>
      <div className="overflow-x-scroll scrollbar-hide">
        <div className="flex gap-3 sm:gap-4 pb-2">
          {movies && movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.id} posterPath={movie.poster_path} id={movie?.id} />
            ))
          ) : (
            <div className="text-gray-400 text-sm sm:text-base py-4">
              {movies === undefined ? "Loading..." : "No movies available"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
