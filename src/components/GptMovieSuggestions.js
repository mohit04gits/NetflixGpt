// import React from "react";
// import { useSelector } from "react-redux";
// import MovieList from "./MovieList";

// const GptMovieSuggestions = () => {
//   const { movieResults, movieNames } = useSelector((store) => store.gpt);
//   if (!movieNames) return;

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 mt-16 sm:mt-20 md:mt-24 bg-black bg-opacity-90 text-white">
//       <div className="space-y-6 sm:space-y-8 lg:space-y-10">
//         {movieNames.map((movieName,index) => (
//           <MovieList
//             key={movieName}
//             title={movieName}
//             movies={movieResults[index]}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GptMovieSuggestions;




import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector(
    (store) => store.gpt
  );

  if (!movieNames?.length) return null;

  return (
    <section className="relative mx-auto w-full max-w-[1920px] px-2 pb-12 text-white sm:px-4">
      <div className="mb-6 flex items-center gap-3 px-4 sm:px-6">
        <span className="h-6 w-1 rounded-full bg-red-600" />

        <div>
          <h2 className="text-lg font-bold sm:text-xl">
            Your AI Recommendations
          </h2>
          <p className="mt-1 text-xs text-gray-400 sm:text-sm">
            Curated suggestions based on your search
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {movieNames.map((movieName, index) => (
          <MovieList
            key={`${movieName}-${index}`}
            title={movieName}
            movies={movieResults?.[index] || []}
          />
        ))}
      </div>
    </section>
  );
};

export default GptMovieSuggestions;
