
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import lang from "../utils/languageConstants";
import { API_OPTIONS, OPENAI_KEY } from "../utils/constants";
import { addMovieResult } from "../utils/gptSlice";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "openai/gpt-oss-20b";

// Clean and deduplicate titles.
const cleanMovieTitles = (titles) => {
  const seen = new Set();

  return titles
    .filter((title) => typeof title === "string")
    .map((title) => title.trim().replace(/^["'`]+|["'`]+$/g, ""))
    .filter((title) => {
      if (!title) return false;

      const key = title.toLowerCase();
      if (seen.has(key)) return false;

      seen.add(key);
      return true;
    })
    .slice(0, 5);
};

// Parse either JSON or comma-separated model output.
const parseMovieTitles = (content) => {
  if (typeof content !== "string" || !content.trim()) {
    throw new Error("The AI returned no movie titles.");
  }

  const cleaned = content
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const start = cleaned.indexOf("[");
  const end = cleaned.lastIndexOf("]");

  if (start !== -1 && end > start) {
    try {
      const parsed = JSON.parse(cleaned.slice(start, end + 1));

      if (Array.isArray(parsed)) {
        const titles = cleanMovieTitles(parsed);
        if (titles.length > 0) return titles;
      }
    } catch (error) {
      console.warn("Could not parse JSON; trying plain text.");
    }
  }

  const titles = cleanMovieTitles(
    cleaned
      .split(/,|\n/)
      .map((title) => title.replace(/^\s*(?:\d+[.)]|[-*])\s*/, ""))
  );

  if (titles.length === 0) {
    throw new Error("Could not extract movie titles from the AI response.");
  }

  return titles;
};

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);

  const searchText = useRef(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Search a movie title using TMDB.
  const searchMovieTMDB = async (movie) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          movie
        )}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );

      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`);
      }

      const data = await response.json();
      const results = data.results || [];

      const normalize = (title = "") =>
        title.toLowerCase().replace(/[^a-z0-9]/g, "");

      const requestedTitle = normalize(movie);

      const exactMatch = results.find(
        (item) =>
          normalize(item.title || "") === requestedTitle ||
          normalize(item.original_title || "") === requestedTitle
      );

      return exactMatch ? [exactMatch] : results.slice(0, 5);
    } catch (error) {
      console.error(`TMDB search failed for "${movie}":`, error.message);
      return [];
    }
  };

  // Retry only when the model response was truncated.
  const requestMovieRecommendations = async (query) => {
    const prompt = `
Recommend exactly 5 real, released movies for this user request:
"${query}"

Understand the requested genre, mood, language, country, themes, and taste.
If a specific movie is mentioned, recommend similar films.
Respect requests for Indian cinema, regional films, underrated movies,
classics, comedy, romance, horror, action, sci-fi, or other preferences.
Prioritize relevance over popularity. Never invent titles.

Return ONLY a JSON array of 5 movie title strings.
Example: ["Hera Pheri", "Welcome", "Dhamaal", "Chup Chup Ke", "Bhagam Bhag"]
`;

    // A retry gets a larger token budget if the first response is truncated.
    const tokenBudgets = [800, 1400];

    for (let attempt = 0; attempt < tokenBudgets.length; attempt++) {
      const response = await axios.post(
        GROQ_API_URL,
        {
          model: GROQ_MODEL,
          messages: [
            {
              role: "system",
              content:
                "You are a movie recommendation assistant. Return only a valid JSON array of movie titles.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.6,
          max_tokens: tokenBudgets[attempt],
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 45000,
        }
      );

      const choice = response.data?.choices?.[0];
      const content = choice?.message?.content;

      console.log("Groq finish reason:", choice?.finish_reason);

      if (choice?.finish_reason === "length") {
        if (attempt < tokenBudgets.length - 1) continue;

        throw new Error(
          "The AI response was truncated twice. Please try again."
        );
      }

      if (typeof content !== "string" || !content.trim()) {
        console.error("Unexpected Groq response:", response.data);
        throw new Error(
          "The AI returned no text. Please try again."
        );
      }

      return parseMovieTitles(content);
    }

    throw new Error("Could not generate recommendations. Please try again.");
  };

  const handleGptSearchClick = async (event) => {
    event.preventDefault();

    const query = searchText.current?.value?.trim();

    // No search counter: user may submit again after each request completes.
    if (!query || loading) return;

    if (!OPENAI_KEY) {
      setErrorMessage("Groq API key is missing. Check your configuration.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const movieNames = await requestMovieRecommendations(query);

      console.log("Recommended movies:", movieNames);

      const movieResults = await Promise.all(
        movieNames.map((movie) => searchMovieTMDB(movie))
      );

      dispatch(
        addMovieResult({
          movieNames,
          movieResults,
        })
      );

      if (movieResults.every((results) => results.length === 0)) {
        setErrorMessage(
          "AI generated recommendations, but TMDB could not find matching movies. Try another query."
        );
      }
    } catch (error) {
      console.error(
        "NetflixGPT search error:",
        error.response?.data || error.message
      );

      const status = error.response?.status;
      const apiMessage = error.response?.data?.error?.message;

      if (status === 401) {
        setErrorMessage("Groq authentication failed. Check your API key.");
      } else if (status === 429) {
        setErrorMessage(
          "Groq rate limit or quota reached. Please wait and try again."
        );
      } else if (status === 400) {
        setErrorMessage(apiMessage || "Groq rejected the request.");
      } else if (error.code === "ECONNABORTED") {
        setErrorMessage("The request timed out. Please try again.");
      } else {
        setErrorMessage(
          apiMessage || error.message || "Something went wrong. Try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center px-4 pb-8 pt-32 sm:px-6 sm:pt-36 md:pt-40">
      <form
        onSubmit={handleGptSearchClick}
        className="w-full max-w-3xl rounded-xl border border-white/10 bg-[#101010]/95 p-4 shadow-2xl shadow-black/40 sm:p-6"
      >
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-red-500">
          AI Movie Discovery
        </p>

        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          What are you in the mood for?
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Discover movies that match your taste.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input
            ref={searchText}
            type="text"
            aria-label="Movie search"
            autoComplete="off"
            disabled={loading}
            className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/60 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 disabled:opacity-60 sm:text-base"
            placeholder={
              lang[langKey]?.gptSearchPlaceholder ||
              "What would you like to watch?"
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-red-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
          >
            {loading
              ? "Finding movies..."
              : lang[langKey]?.search || "Search"}
          </button>
        </div>

        {errorMessage && (
          <p role="alert" className="mt-4 text-sm text-red-400">
            {errorMessage}
          </p>
        )}

        <p className="mt-4 text-xs text-gray-500">
          Powered by AI · Discover your next favorite movie
        </p>
      </form>
    </div>
  );
};

export default GptSearchBar;
