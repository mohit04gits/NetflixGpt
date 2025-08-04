import { Link, Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IMG_CDN_URL } from "../utils/constants";

const MovieDetails = () => {
  const { id } = useParams();
  const movies = useSelector((store) => store.movies);

  const allMovies = [
    ...(movies?.nowPlayingMovies || []),
    ...(movies?.popularMovies || []),
    ...(movies?.topRatedMovies || []),
    ...(movies?.upcomingMovies || []),
    ...(movies?.trendingMovies || []),
  ];

  const movie = allMovies.find((m) => m.id.toString() === id);

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="text-lg sm:text-xl md:text-2xl font-semibold text-white text-center">
          Movie not found!
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 pt-16 sm:pt-20 md:pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row items-start justify-center gap-6 sm:gap-8 lg:gap-12">
          {/* Poster */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="relative">
              <img
                src={IMG_CDN_URL + movie.poster_path}
                alt={movie.original_title}
                className="rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg sm:shadow-xl lg:shadow-2xl max-w-full h-auto w-auto max-h-[80vh]"
              />
            </div>
          </div>

          {/* Details */}
          <div className="w-full lg:w-1/2 text-white space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 leading-tight">
                {movie.title}
              </h1>
              
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4 sm:mb-6 lg:mb-8">
                <span className="text-yellow-400 text-lg sm:text-xl md:text-2xl">⭐</span>
                <span className="text-lg sm:text-xl md:text-2xl font-semibold text-yellow-400">
                  {movie.vote_average}/10
                </span>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300 leading-relaxed max-w-4xl">
                {movie.overview}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-4 sm:pt-6">
              <Link to={`/browse/movietrailer/${movie.id}`}>
                <button className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-red-600 hover:bg-red-700 transition-all duration-200 rounded-full text-sm sm:text-base md:text-lg font-semibold transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-lg">
                  🎬 Watch Trailer
                </button>
              </Link>
              
              <Link to="/browse">
                <button className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-gray-600 hover:bg-gray-700 transition-all duration-200 rounded-full text-sm sm:text-base md:text-lg font-semibold transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-lg">
                  ← Back to Browse
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetails;












