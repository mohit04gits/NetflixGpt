// import { IMG_CDN_URL } from "../utils/constants";
// import { Link } from "react-router-dom";

// const MovieCard = ({ id, posterPath }) => {
//   if (!posterPath) return null;

//   return (
//     <div className="w-28 sm:w-32 md:w-40 lg:w-48 flex-shrink-0">
//       <Link to={`/browse/moviedetails/${id}`}>
//         <img 
//           alt="Movie Card" 
//           src={IMG_CDN_URL + posterPath}
//           className="w-full h-auto object-cover rounded-md shadow-lg transition-transform duration-200 hover:scale-105"
//         />
//       </Link>
//     </div>
//   );
// };

// export default MovieCard;






import { IMG_CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const MovieCard = ({ id, posterPath }) => {
  if (!posterPath) return null;

  return (
    <Link
      to={`/browse/moviedetails/${id}`}
      aria-label={`View movie details`}
      className="group relative block w-32 flex-shrink-0 overflow-hidden rounded-xl bg-[#151515] shadow-lg shadow-black/30 outline-none transition-all duration-300 ease-out hover:z-10 hover:scale-105 hover:shadow-xl hover:shadow-red-950/50 focus-visible:ring-2 focus-visible:ring-red-500 sm:w-36 md:w-44 lg:w-48"
    >
      <img
        alt="Movie poster"
        src={IMG_CDN_URL + posterPath}
        loading="lazy"
        className="aspect-[2/3] w-full object-cover transition duration-500 ease-out group-hover:brightness-75"
      />

      {/* Cinematic bottom gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Red accent */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-1 w-0 bg-red-600 transition-all duration-300 group-hover:w-full" />

      {/* Hover indicator */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-black/50 text-xl text-white shadow-xl backdrop-blur-sm">
          ▶
        </span>
      </div>
    </Link>
  );
};

export default MovieCard;
