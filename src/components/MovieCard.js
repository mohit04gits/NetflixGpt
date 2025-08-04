import { IMG_CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const MovieCard = ({ id, posterPath }) => {
  if (!posterPath) return null;

  return (
    <div className="w-28 sm:w-32 md:w-40 lg:w-48 flex-shrink-0">
      <Link to={`/browse/moviedetails/${id}`}>
        <img 
          alt="Movie Card" 
          src={IMG_CDN_URL + posterPath}
          className="w-full h-auto object-cover rounded-md shadow-lg transition-transform duration-200 hover:scale-105"
        />
      </Link>
    </div>
  );
};

export default MovieCard;
