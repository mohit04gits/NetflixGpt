// import MovieCard from "./MovieCard";

// const MovieList = ({ title, movies }) => {
//   return (
//     <div className="px-4 sm:px-8 md:px-16 py-4 sm:py-6">
//       <h2 className="text-lg md:text-2xl text-white mb-3 sm:mb-4 font-semibold">{title}</h2>
//       <div className="overflow-x-scroll scrollbar-hide">
//         <div className="flex gap-3 sm:gap-4 pb-2">
//           {movies && movies.length > 0 ? (
//             movies.map((movie) => (
//               <MovieCard key={movie.id} posterPath={movie.poster_path} id={movie?.id} />
//             ))
//           ) : (
//             <div className="text-gray-400 text-sm sm:text-base py-4">
//               {movies === undefined ? "Loading..." : "No movies available"}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieList;








import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <section className="relative px-4 py-5 sm:px-8 sm:py-6 md:px-12 lg:px-16">
      {/* Section heading */}
      <div className="mb-4 flex items-center gap-3 sm:mb-5">
        <span className="h-6 w-1 rounded-full bg-red-600 shadow-sm shadow-red-600/50" />

        <h2 className="text-lg font-bold tracking-wide text-white sm:text-xl md:text-2xl">
          {title}
        </h2>

        <span className="hidden text-xs font-medium uppercase tracking-[0.2em] text-gray-500 sm:inline">
          Explore
        </span>
      </div>

      {/* Horizontal movie carousel */}
      <div
        className="overflow-x-auto overflow-y-hidden scrollbar-hide"
        aria-label={title}
      >
        <div className="flex items-start gap-3 pb-4 pt-1 sm:gap-4 md:gap-5">
          {movies && movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                posterPath={movie.poster_path}
              />
            ))
          ) : (
            <p className="py-4 text-sm text-gray-400 sm:text-base">
              {movies === undefined
                ? "Loading movies..."
                : "No movies available right now."}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MovieList;
