// import { useDispatch } from "react-redux";
// import { API_OPTIONS } from "../utils/constants";
// import { addTrailerVideo } from "../utils/moviesSlice";
// import { useCallback, useEffect } from "react";

// const useMovieTrailer = (movieId) => {
//   const dispatch = useDispatch();
//   // const [trailerId,setTrailerId] = useState(null);
//   const getMovieVideos = async () => {
//     const data = await fetch(
//       `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
//       API_OPTIONS
//     );
//     const json = await data.json();
//     //console.log(json);

//     const filterData = json.results.filter((video) => video.type === "Trailer");
//     const trailer = filterData.length ? filterData[0] : json.results[0];
//     //console.log(trailer);
//     // setTrailerId(trailer.key)

//     dispatch(addTrailerVideo(trailer));
//   };

//   useEffect(() => {
//     getMovieVideos();
//   }, []); // also added movieId as dependency
// };

// export default useMovieTrailer;



import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useCallback, useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMovieVideos = useCallback(async () => {
    if (!movieId) return;

    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );

      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }

      const json = await data.json();

      const filterData = json.results.filter(
        (video) => video.type === "Trailer"
      );

      const trailer = filterData.length
        ? filterData[0]
        : json.results[0];

      if (trailer) {
        dispatch(addTrailerVideo(trailer));
      }
    } catch (error) {
      console.error("Error fetching movie trailer:", error);
    }
  }, [dispatch, movieId]);

  useEffect(() => {
    getMovieVideos();
  }, [getMovieVideos]);
};

export default useMovieTrailer;