import { BG_IMG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
  return (
    <>
      <div className="relative min-h-screen w-full">
        <div className="fixed inset-0 -z-10">
          <img
            src={BG_IMG_URL}
            alt="Netflix Background"
            className="w-full h-full object-cover"
          />
        </div>
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  );
};

export default GptSearch;
