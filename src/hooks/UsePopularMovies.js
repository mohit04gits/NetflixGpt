import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  
  const getPopularMovies = async () => {
    try {
      // Check if API key is available
      if (!process.env.REACT_APP_TMDB_KEY) {
        console.error("❌ TMDB API key not found. Please add REACT_APP_TMDB_KEY to your .env file");
        return;
      }

      const data = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        API_OPTIONS
      );
      
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      
      const json = await data.json();
      console.log("✅ Popular Movies loaded:", json.results?.length || 0, "movies");
      dispatch(addPopularMovies(json.results));
    } catch (error) {
      console.error("❌ Error fetching popular movies:", error.message);
      if (error.message.includes("Failed to fetch")) {
        console.error("💡 Check your internet connection and try again");
      }
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);
};

export default usePopularMovies;
