import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import axios from "axios";
import { API_OPTIONS, OPENAI_KEY } from "../utils/constants";
import { addMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    try {
      // Check if TMDB API key is available
      if (!process.env.REACT_APP_TMDB_KEY) {
        console.error("❌ TMDB API key not found. Please add REACT_APP_TMDB_KEY to your .env file");
        return [];
      }

      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      
      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error(`❌ Error searching movie "${movie}":`, error.message);
      return [];
    }
  };

  const handleGptSearchClick = async () => {
    if (!searchText.current?.value) {
      console.warn("⚠️ Please enter a search query");
      return;
    }

    // Check if OpenAI/Groq API key is available
    if (!OPENAI_KEY) {
      console.error("❌ OpenAI/Groq API key not found. Please add REACT_APP_OPENAI_KEY to your .env file");
      return;
    }

    const prompt = `Act as a Movie Recommendation system and suggest some movies for the query: "${searchText.current.value}". Only give me names of 5 movies, comma separated. No introduction. Example: Gadar, Sholay, Don, Koi Mil Gaya, Golmaal.`;

    try {
      console.log("🔍 Searching for movies...");
      
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama3-70b-8192",
          messages: [{ role: "user", content: prompt }],
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const choices = response.data?.choices;
      if (!choices || choices.length === 0) {
        console.error("❌ No movie suggestions returned by Groq.");
        return;
      }

      const gptMovies = choices[0].message.content
        .split(",")
        .map((movie) => movie.trim());

      console.log("🎬 Suggested movies:", gptMovies);

      const movieSearchResults = await Promise.all(
        gptMovies.map(searchMovieTMDB)
      );

      dispatch(
        addMovieResult({
          movieNames: gptMovies,
          movieResults: movieSearchResults,
        })
      );
      
      console.log("✅ Movie search completed successfully");
    } catch (error) {
      console.error("❌ Groq API Error:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        console.error("💡 Check your OpenAI/Groq API key");
      }
    }
  };

  return (
    <div className="pt-32 sm:pt-40 md:pt-48 lg:pt-56 px-4 sm:px-6 lg:px-8 flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full max-w-2xl bg-black rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row gap-4 shadow-2xl"
      >
        <input
          ref={searchText}
          type="text"
          className="flex-1 p-3 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
          placeholder={lang[langKey]?.gptSearchPlaceholder || "What would you like to watch?"}
        />
        <button
          onClick={handleGptSearchClick}
          className="py-3 px-6 bg-red-700 text-white rounded-lg hover:bg-red-600 transition duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          {lang[langKey]?.search || "Search"}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
