import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import useMovieTrailer from "../hooks/useMovieTrailer";

const MovieTrailer = () => {
  const { id } = useParams();          
  const navigate = useNavigate();
  useMovieTrailer(id);                 
  const trailer = useSelector((s) => s.movies.trailerVideo);

  const src = trailer
    ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&controls=0&modestbranding=0&rel=0&iv_load_policy=3`
    : "";

  if (!trailer) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <p className="text-white text-base sm:text-lg md:text-xl animate-pulse px-4 text-center">Loading trailer…</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-2 sm:p-4 lg:p-6">
      {/* Close button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white text-2xl sm:text-3xl md:text-4xl font-bold hover:text-red-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full p-1 sm:p-2"
      >
        ✕
      </button>

      {/* Video Container */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl max-h-[80vh] sm:max-h-[85vh] lg:max-h-[90vh] aspect-video rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl lg:shadow-2xl">
        <iframe
          className="w-full h-full"
          src={src}
          title="Movie Trailer"
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default MovieTrailer;
