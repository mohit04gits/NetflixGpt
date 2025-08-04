import React from "react";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const movies = useSelector((store) => store?.movies?.NowPlayingMovies);
  
  if (!movies || movies.length === 0) {
    return (
      <div className="pt-12 sm:pt-16 md:pt-20 h-[60vh] md:h-[80vh] bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">Welcome to Netflix GPT</h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg">
            Loading your entertainment experience...
          </p>
        </div>
      </div>
    );
  }
  
  const mainMovie = movies[5];
  const { original_title, overview, id } = mainMovie;
  
  return (
    <div className="relative pt-12 sm:pt-16 md:pt-20 h-[60vh] md:h-[80vh] w-full overflow-hidden">
      <VideoBackground movieId={id} />
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
      <VideoTitle title={original_title} overview={overview} />
    </div>
  );
};

export default MainContainer;
