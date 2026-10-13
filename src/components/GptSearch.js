// import { BG_IMG_URL } from "../utils/constants";
// import GptMovieSuggestions from "./GptMovieSuggestions";
// import GptSearchBar from "./GptSearchBar";

// const GptSearch = () => {
//   return (
//     <>
//       <div className="relative min-h-screen w-full">
//         <div className="fixed inset-0 -z-10">
//           <img
//             src={BG_IMG_URL}
//             alt="Netflix Background"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <GptSearchBar />
//         <GptMovieSuggestions />
//       </div>
//     </>
//   );
// };

// export default GptSearch;



import { BG_IMG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#080808] text-white">
      {/* Background image */}
      <div className="fixed inset-0 -z-10">
        <img
          src={BG_IMG_URL}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      <GptSearchBar />
      <GptMovieSuggestions />
    </main>
  );
};

export default GptSearch;
