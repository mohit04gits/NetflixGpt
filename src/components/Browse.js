// // import { useSelector } from "react-redux";
// // import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
// // import usePopularMovies from "../hooks/UsePopularMovies";
// // import useTopRatedMovies from "../hooks/useTopRatedMovies";
// // import useTrendingMovies from "../hooks/useTrendingMovies";
// // import useUpcomingMovies from "../hooks/useUpcomingMovies";
// // import Header from "./Header";
// // import MainContainer from "./MainContainer";
// // import SecondaryContainer from "./SecondaryContainer";
// // import GptSearch from "./GptSearch";

// // const Browse = () => {
// //   const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

// //   useNowPlayingMovies();
// //   usePopularMovies();
// //   useUpcomingMovies();
// //   useTrendingMovies();
// //   useTopRatedMovies();
// //   return (
// //     <div className="relative h-screen w-screen">
// //       {/* <div className="absolute inset-0"> */}
// //       <Header />
// //       {showGptSearch ? (
// //         <GptSearch />
// //       ) : (
// //         <>
// //           <MainContainer />
// //           <SecondaryContainer />
// //         </>
// //       )}
// //       {/* </div> */}
// //     </div>
// //   );
// // };

// // export default Browse;


// // Browse.js
// import { useSelector } from "react-redux";
// import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
// import usePopularMovies from "../hooks/UsePopularMovies";
// import useTopRatedMovies from "../hooks/useTopRatedMovies";
// import useTrendingMovies from "../hooks/useTrendingMovies";
// import useUpcomingMovies from "../hooks/useUpcomingMovies";
// import MainContainer from "./MainContainer";
// import SecondaryContainer from "./SecondaryContainer";
// import GptSearch from "./GptSearch";

// const Browse = () => {
//   const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

//   useNowPlayingMovies();
//   usePopularMovies();
//   useUpcomingMovies();
//   useTrendingMovies();
//   useTopRatedMovies();

//   return (
//     <>
//       {showGptSearch ? (
//         <GptSearch />
//       ) : (
//         <>
//           <MainContainer />
//           <SecondaryContainer />
//         </>
//       )}
//     </>
//   );
// };

// export default Browse;









import { useSelector } from "react-redux";

import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/UsePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";

import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";

const Browse = () => {
  const showGptSearch = useSelector(
    (store) => store.gpt.showGptSearch
  );

  useNowPlayingMovies();
  usePopularMovies();
  useUpcomingMovies();
  useTrendingMovies();
  useTopRatedMovies();

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#080808] text-white">
      {showGptSearch ? (
        <section className="min-h-screen">
          <GptSearch />
        </section>
      ) : (
        <>
          {/* Featured movie section */}
          <section className="relative">
            <MainContainer />
          </section>

          {/* Movie categories */}
          <section className="relative z-10 -mt-10 space-y-2 pb-12 sm:-mt-14 md:-mt-20">
            <SecondaryContainer />
          </section>
        </>
      )}
    </main>
  );
};

export default Browse;
