// import { Link, Outlet, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { IMG_CDN_URL } from "../utils/constants";

// const MovieDetails = () => {
//   const { id } = useParams();
//   const movies = useSelector((store) => store.movies);

//   const allMovies = [
//     ...(movies?.nowPlayingMovies || []),
//     ...(movies?.popularMovies || []),
//     ...(movies?.topRatedMovies || []),
//     ...(movies?.upcomingMovies || []),
//     ...(movies?.trendingMovies || []),
//   ];

//   const movie = allMovies.find((m) => m.id.toString() === id);

//   if (!movie) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-4 sm:px-6 lg:px-8">
//         <div className="text-lg sm:text-xl md:text-2xl font-semibold text-white text-center">
//           Movie not found!
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 pt-16 sm:pt-20 md:pt-24">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
//         <div className="flex flex-col lg:flex-row items-start justify-center gap-6 sm:gap-8 lg:gap-12">
//           {/* Poster */}
//           <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
//             <div className="relative">
//               <img
//                 src={IMG_CDN_URL + movie.poster_path}
//                 alt={movie.original_title}
//                 className="rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg sm:shadow-xl lg:shadow-2xl max-w-full h-auto w-auto max-h-[80vh]"
//               />
//             </div>
//           </div>

//           {/* Details */}
//           <div className="w-full lg:w-1/2 text-white space-y-4 sm:space-y-6 lg:space-y-8">
//             <div className="text-center lg:text-left">
//               <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 leading-tight">
//                 {movie.title}
//               </h1>
              
//               <div className="flex items-center justify-center lg:justify-start gap-2 mb-4 sm:mb-6 lg:mb-8">
//                 <span className="text-yellow-400 text-lg sm:text-xl md:text-2xl">⭐</span>
//                 <span className="text-lg sm:text-xl md:text-2xl font-semibold text-yellow-400">
//                   {movie.vote_average}/10
//                 </span>
//               </div>
//             </div>

//             <div className="text-center lg:text-left">
//               <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300 leading-relaxed max-w-4xl">
//                 {movie.overview}
//               </p>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-4 sm:pt-6">
//               <Link to={`/browse/movietrailer/${movie.id}`}>
//                 <button className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-red-600 hover:bg-red-700 transition-all duration-200 rounded-full text-sm sm:text-base md:text-lg font-semibold transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-lg">
//                   🎬 Watch Trailer
//                 </button>
//               </Link>
              
//               <Link to="/browse">
//                 <button className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-gray-600 hover:bg-gray-700 transition-all duration-200 rounded-full text-sm sm:text-base md:text-lg font-semibold transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-lg">
//                   ← Back to Browse
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Outlet />
//     </div>
//   );
// };

// export default MovieDetails;













import { Link, Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IMG_CDN_URL } from "../utils/constants";

const MovieDetails = () => {
  const { id } = useParams();

  const movies = useSelector((store) => store.movies);
  const gptMovieResults = useSelector(
    (store) => store.gpt?.movieResults
  );

  const allMovies = [
    ...(movies?.NowPlayingMovies || []),
    ...(movies?.nowPlayingMovies || []),
    ...(movies?.popularMovies || []),
    ...(movies?.PopularMovies || []),
    ...(movies?.topRatedMovies || []),
    ...(movies?.TopRatedMovies || []),
    ...(movies?.upcomingMovies || []),
    ...(movies?.UpcomingMovies || []),
    ...(movies?.trendingMovies || []),
    ...(movies?.TrendingMovies || []),
    ...(gptMovieResults || []).flat(),
  ];

  const movie = allMovies.find(
    (item) => String(item?.id) === String(id)
  );

  if (!movie) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] px-6 text-center text-white">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-red-500">
            Movie Details
          </p>

          <h1 className="text-2xl font-bold sm:text-3xl">
            Movie not found
          </h1>

          <p className="mt-3 text-sm text-gray-400">
            This movie may not be available in your current list.
          </p>

          <Link
            to="/browse"
            className="mt-6 inline-flex rounded-lg bg-red-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            ← Back to Browse
          </Link>
        </div>
      </main>
    );
  }

  const title = movie.title || movie.original_title || "Untitled";
  const backdropPath = movie.backdrop_path || movie.poster_path;
  const posterPath = movie.poster_path || movie.backdrop_path;

  const rating = Number(movie.vote_average);
  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : null;

  const similarMovies = allMovies
    .filter(
      (item) =>
        item.id !== movie.id &&
        item.poster_path &&
        item.backdrop_path
    )
    .filter(
      (item, index, array) =>
        array.findIndex((other) => other.id === item.id) === index
    )
    .slice(0, 6);

  return (
    <main className="min-h-screen overflow-hidden bg-[#080808] text-white">
      {/* Cinematic movie hero */}
      <section className="relative min-h-[calc(100vh-82px)] pt-24 sm:pt-28">
        {backdropPath && (
          <div className="absolute inset-0">
            <img
              src={`${IMG_CDN_URL}${backdropPath}`}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
        )}

        {/* Overlays for contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/20 to-transparent" />
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative mx-auto flex min-h-[calc(100vh-110px)] max-w-[1400px] items-center px-5 py-12 sm:px-8 lg:px-14">
          <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-[260px_minmax(0,1fr)] md:gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-16">
            {/* Movie poster */}
            <div className="mx-auto w-56 sm:w-64 md:mx-0 md:w-full md:max-w-[300px]">
              {posterPath ? (
                <img
                  src={`${IMG_CDN_URL}${posterPath}`}
                  alt={`${title} poster`}
                  className="w-full rounded-xl border border-white/10 object-cover shadow-2xl shadow-black/60"
                />
              ) : (
                <div className="flex aspect-[2/3] items-center justify-center rounded-xl bg-[#181818] text-gray-500">
                  No poster available
                </div>
              )}
            </div>

            {/* Movie information */}
            <div className="max-w-3xl text-center md:text-left">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/40 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-400">
                  Movie Details
                </span>
              </div>

              <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
                {title}
              </h1>

              {movie.tagline && (
                <p className="mt-3 text-sm italic text-gray-300 sm:text-base">
                  {movie.tagline}
                </p>
              )}

              {/* Metadata */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-sm md:justify-start">
                {releaseYear && (
                  <span className="text-gray-300">
                    {releaseYear}
                  </span>
                )}

                {Number.isFinite(rating) && (
                  <span className="inline-flex items-center gap-1.5 font-semibold text-white">
                    <span className="text-yellow-400">★</span>
                    {rating.toFixed(1)}
                    <span className="font-normal text-gray-400">
                      / 10
                    </span>
                  </span>
                )}

                {movie.original_language && (
                  <span className="rounded border border-white/20 px-2 py-1 text-xs uppercase text-gray-300">
                    {movie.original_language}
                  </span>
                )}
              </div>

              {/* Overview */}
              <div className="mt-7">
                <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                  Overview
                </h2>

                <p className="max-w-2xl text-sm leading-7 text-gray-200 sm:text-base sm:leading-8">
                  {movie.overview ||
                    "No overview is available for this movie yet."}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
                <Link
                  to={`/browse/movietrailer/${movie.id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-950/30 transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <span aria-hidden="true">▶</span>
                  Watch Trailer
                </Link>

                <Link
                  to="/browse"
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-black/30 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  ← Back to Browse
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More movies */}
      {similarMovies.length > 0 && (
        <section className="relative mx-auto max-w-[1400px] px-5 pb-14 sm:px-8 lg:px-14">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-6 w-1 rounded-full bg-red-600" />
            <h2 className="text-xl font-bold sm:text-2xl">
              More to Explore
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {similarMovies.map((item) => (
              <Link
                key={item.id}
                to={`/browse/moviedetails/${item.id}`}
                className="group overflow-hidden rounded-lg bg-[#151515] transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-950/20"
              >
                <img
                  src={`${IMG_CDN_URL}${item.poster_path}`}
                  alt={item.title || item.original_title}
                  loading="lazy"
                  className="aspect-[2/3] w-full object-cover transition duration-300 group-hover:brightness-75"
                />

                <div className="p-3">
                  <h3 className="line-clamp-2 text-sm font-semibold text-gray-200 group-hover:text-white">
                    {item.title || item.original_title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Outlet />
    </main>
  );
};

export default MovieDetails;
