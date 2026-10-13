// import React from "react";
// import VideoTitle from "./VideoTitle";
// import VideoBackground from "./VideoBackground";
// import { useSelector } from "react-redux";

// const MainContainer = () => {
//   const movies = useSelector((store) => store?.movies?.NowPlayingMovies);
  
//   if (!movies || movies.length === 0) {
//     return (
//       <div className="pt-12 sm:pt-16 md:pt-20 h-[60vh] md:h-[80vh] bg-black flex items-center justify-center">
//         <div className="text-white text-center">
//           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">Welcome to Netflix GPT</h1>
//           <p className="text-gray-400 text-sm sm:text-base md:text-lg">
//             Loading your entertainment experience...
//           </p>
//         </div>
//       </div>
//     );
//   }
  
//   const mainMovie = movies[5];
//   const { original_title, overview, id } = mainMovie;
  
//   return (
//     <div className="relative pt-12 sm:pt-16 md:pt-20 h-[60vh] md:h-[80vh] w-full overflow-hidden">
//       <VideoBackground movieId={id} />
//       <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
//       <VideoTitle title={original_title} overview={overview} />
//     </div>
//   );
// };

// export default MainContainer;






import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector(
    (store) => store?.movies?.NowPlayingMovies
  );

  // Wait for TMDB movies to load
  if (!movies || movies.length === 0) return null;

  const mainMovie = movies[5] || movies[0];

  if (!mainMovie) return null;

  const { original_title, overview, id } = mainMovie;

  return (
    <section className="relative isolate h-[78vh] min-h-[540px] max-h-[850px] overflow-hidden bg-[#080808] md:h-[88vh]">
      {/* Cinematic background */}
      <div className="absolute inset-0 z-0">
        <VideoBackground movieId={id} />
      </div>

      {/* Dark cinematic overlays */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black via-black/65 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black via-black/15 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-transparent" />

      {/* Hero content */}
      <div className="relative z-20 flex h-full items-end pb-24 sm:pb-28 md:items-center md:pb-0">
        <VideoTitle
          title={original_title}
          overview={overview}
        />
      </div>

      {/* Subtle red cinematic accent */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-1 w-2/5 bg-gradient-to-r from-red-700 via-red-500/50 to-transparent" />
    </section>
  );
};

export default MainContainer;
