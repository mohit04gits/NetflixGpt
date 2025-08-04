import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrendingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useTrendingMovies = () => {
  const dispatch = useDispatch();
  
  const getTrendingMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
        API_OPTIONS
      );
      
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      
      const json = await data.json();
      // console.log(json.results);
      dispatch(addTrendingMovies(json.results));
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      // You could dispatch an error action here if you want to show error states in the UI
    }
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);
};

export default useTrendingMovies;
