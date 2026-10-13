
import { useState } from "react";
import { API_OPTIONS, IMG_CDN_URL } from "../utils/constants";

// Search movies using your existing TMDB configuration
const searchMovies = async (query) => {
  const params = new URLSearchParams({
    query,
    include_adult: "false",
    language: "en-US",
    page: "1",
  });

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?${params}`,
    API_OPTIONS
  );

  if (!response.ok) {
    throw new Error(`Movie search failed (${response.status})`);
  }

  const data = await response.json();
  return data.results || [];
};

// Movie search and selection component
const MoviePicker = ({ label, number, selected, onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setError("Please enter a movie title.");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const movies = await searchMovies(query.trim());
      setResults(movies);

      if (movies.length === 0) {
        setError("No movies found. Try another title.");
      }
    } catch (err) {
      setError(err.message || "Unable to search movies.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-w-0 overflow-hidden rounded-xl border border-white/10 bg-[#111113]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
            {label}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {selected ? "Selected movie" : "Search and select a movie"}
          </p>
        </div>

        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.05] text-sm font-semibold text-gray-400">
          {number}
        </span>
      </div>

      <div className="p-4 sm:p-5">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movie title..."
            aria-label={`Search ${label}`}
            className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/40 px-3 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-red-500 sm:px-4"
          />

          <button
            type="submit"
            disabled={loading}
            className="shrink-0 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-wait disabled:opacity-60"
          >
            {loading ? "..." : "Search"}
          </button>
        </form>

        {error && (
          <p role="status" className="mt-3 text-sm text-amber-400">
            {error}
          </p>
        )}

        {results.length > 0 && (
          <div className="mt-4 max-h-64 space-y-2 overflow-y-auto rounded-lg">
            {results.map((movie) => (
              <button
                key={movie.id}
                type="button"
                onClick={() => {
                  onSelect(movie);
                  setResults([]);
                  setQuery("");
                  setError("");
                }}
                className="flex w-full min-w-0 items-center gap-3 rounded-lg border border-white/[0.07] p-2 text-left transition hover:border-red-500/40 hover:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {movie.poster_path ? (
                  <img
                    src={`${IMG_CDN_URL}${movie.poster_path}`}
                    alt=""
                    loading="lazy"
                    className="h-16 w-11 shrink-0 rounded object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-11 shrink-0 items-center justify-center rounded bg-white/5 text-xs text-gray-500">
                    N/A
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">
                    {movie.title}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {movie.release_date?.slice(0, 4) || "Year unknown"}
                  </p>
                </div>

                <span className="shrink-0 text-xs text-amber-300">
                  ★ {Number(movie.vote_average || 0).toFixed(1)}
                </span>
              </button>
            ))}
          </div>
        )}

        {selected ? (
          <div className="mt-5 flex min-w-0 items-center gap-3 rounded-lg border border-white/10 bg-black/30 p-3">
            {selected.poster_path ? (
              <img
                src={`${IMG_CDN_URL}${selected.poster_path}`}
                alt={`${selected.title} poster`}
                className="h-24 w-16 shrink-0 rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-24 w-16 shrink-0 items-center justify-center rounded-lg bg-white/5 text-xs text-gray-500">
                No poster
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="break-words text-sm font-semibold text-white sm:text-base">
                {selected.title}
              </p>
              <p className="mt-2 text-xs text-gray-400">
                {selected.release_date || "Release date unavailable"}
              </p>
              <p className="mt-2 text-sm text-amber-300">
                ★ {Number(selected.vote_average || 0).toFixed(1)} / 10
              </p>
            </div>

            <button
              type="button"
              onClick={() => onSelect(null)}
              aria-label={`Remove ${selected.title}`}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="mt-5 flex min-h-24 items-center justify-center rounded-lg border border-dashed border-white/10 px-4 text-center">
            <p className="text-sm text-gray-500">
              Your selected movie will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

// Main comparison page
const CompareMovies = () => {
  const [firstMovie, setFirstMovie] = useState(null);
  const [secondMovie, setSecondMovie] = useState(null);

  const ready =
    firstMovie &&
    secondMovie &&
    firstMovie.id !== secondMovie.id;

  const sameMovie =
    firstMovie &&
    secondMovie &&
    firstMovie.id === secondMovie.id;

  const stats = ready
    ? [
        {
          label: "TMDB rating",
          first: Number(firstMovie.vote_average || 0).toFixed(1) + " / 10",
          second: Number(secondMovie.vote_average || 0).toFixed(1) + " / 10",
          a: Number(firstMovie.vote_average || 0),
          b: Number(secondMovie.vote_average || 0),
          higher: true,
        },
        {
          label: "Release date",
          first: firstMovie.release_date || "Not available",
          second: secondMovie.release_date || "Not available",
        },
        {
          label: "Audience votes",
          first: Number(firstMovie.vote_count || 0).toLocaleString(),
          second: Number(secondMovie.vote_count || 0).toLocaleString(),
          a: Number(firstMovie.vote_count || 0),
          b: Number(secondMovie.vote_count || 0),
          higher: true,
        },
        {
          label: "Popularity",
          first: Number(firstMovie.popularity || 0).toFixed(1),
          second: Number(secondMovie.popularity || 0).toFixed(1),
          a: Number(firstMovie.popularity || 0),
          b: Number(secondMovie.popularity || 0),
          higher: true,
        },
        {
          label: "Original language",
          first: firstMovie.original_language?.toUpperCase() || "N/A",
          second: secondMovie.original_language?.toUpperCase() || "N/A",
        },
      ]
    : [];

  return (
    <main className="min-h-screen bg-[#09090B] px-4 pb-16 pt-32 text-white sm:px-6 sm:pt-36 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <header className="mb-8 border-b border-white/[0.08] pb-7 sm:mb-10 sm:pb-9">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-400">
            Movie database
          </p>

          <div className="mt-3 flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Compare Movies
            </h1>

            <p className="max-w-lg text-sm leading-6 text-gray-400">
              Compare ratings, release dates, audience votes and popularity
              side by side.
            </p>
          </div>
        </header>

        {/* Search panels */}
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          <MoviePicker
            label="First movie"
            number="01"
            selected={firstMovie}
            onSelect={setFirstMovie}
          />

          <MoviePicker
            label="Second movie"
            number="02"
            selected={secondMovie}
            onSelect={setSecondMovie}
          />
        </section>

        {sameMovie && (
          <p
            role="status"
            className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-sm text-amber-300"
          >
            Please select two different movies.
          </p>
        )}

        {/* Comparison table */}
        <section className="mt-9 sm:mt-12">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold sm:text-2xl">
                Comparison overview
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {ready
                  ? "Movie information at a glance"
                  : "Select two movies to view their comparison"}
              </p>
            </div>

            {ready && (
              <button
                type="button"
                onClick={() => {
                  setFirstMovie(null);
                  setSecondMovie(null);
                }}
                className="rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-300 transition hover:border-red-500/40 hover:text-white"
              >
                Clear comparison
              </button>
            )}
          </div>

          {ready ? (
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111113]">
              <div className="grid grid-cols-[minmax(0,1fr)_100px_minmax(0,1fr)] border-b border-white/10 bg-white/[0.03] sm:grid-cols-[minmax(0,1fr)_180px_minmax(0,1fr)]">
                <div className="min-w-0 px-3 py-4 sm:px-5">
                  <p className="break-words text-sm font-semibold text-white sm:text-base">
                    {firstMovie.title}
                  </p>
                </div>

                <div className="flex items-center justify-center px-1 py-4 text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:text-xs">
                  Metric
                </div>

                <div className="min-w-0 px-3 py-4 sm:px-5">
                  <p className="break-words text-sm font-semibold text-white sm:text-base">
                    {secondMovie.title}
                  </p>
                </div>
              </div>

              {stats.map((stat) => {
                const firstWins =
                  stat.higher && stat.a !== undefined && stat.a > stat.b;

                const secondWins =
                  stat.higher && stat.b !== undefined && stat.b > stat.a;

                return (
                  <div
                    key={stat.label}
                    className="grid grid-cols-[minmax(0,1fr)_100px_minmax(0,1fr)] border-b border-white/[0.06] last:border-b-0 sm:grid-cols-[minmax(0,1fr)_180px_minmax(0,1fr)]"
                  >
                    <div
                      className={`flex min-w-0 items-center justify-end px-3 py-4 text-right sm:px-5 ${
                        firstWins ? "text-emerald-400" : "text-gray-200"
                      }`}
                    >
                      <span className="break-words text-sm sm:text-base">
                        {stat.first}
                      </span>
                    </div>

                    <div className="flex items-center justify-center px-1 py-4 text-center">
                      <span className="text-[10px] leading-4 text-gray-500 sm:text-xs">
                        {stat.label}
                      </span>
                    </div>

                    <div
                      className={`flex min-w-0 items-center px-3 py-4 sm:px-5 ${
                        secondWins ? "text-emerald-400" : "text-gray-200"
                      }`}
                    >
                      <span className="break-words text-sm sm:text-base">
                        {stat.second}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-5 py-12 text-center sm:py-16">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-xl text-gray-400">
                ⇄
              </div>
              <p className="mt-4 text-base font-medium text-gray-200">
                No comparison yet
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                Search for two different movies above. Their statistics will
                appear here automatically.
              </p>
            </div>
          )}
        </section>

        {/* Movie descriptions */}
        {ready && (
          <section className="mt-9 sm:mt-12">
            <h2 className="mb-4 text-xl font-semibold sm:text-2xl">
              Movie overview
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
              {[firstMovie, secondMovie].map((movie) => (
                <article
                  key={movie.id}
                  className="min-w-0 rounded-xl border border-white/10 bg-[#111113] p-5 sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    {movie.poster_path && (
                      <img
                        src={`${IMG_CDN_URL}${movie.poster_path}`}
                        alt={`${movie.title} poster`}
                        loading="lazy"
                        className="w-20 shrink-0 rounded-lg object-cover sm:w-24"
                      />
                    )}

                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-white sm:text-lg">
                        {movie.title}
                      </h3>
                      <p className="mt-2 text-xs text-gray-500">
                        {movie.release_date || "Release date unavailable"}
                      </p>
                      <p className="mt-2 text-sm text-amber-300">
                        ★ {Number(movie.vote_average || 0).toFixed(1)} / 10
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-gray-400">
                    {movie.overview || "No overview is available for this movie."}
                  </p>
                </article>
              ))}
            </div>

            <p className="mt-5 text-xs leading-5 text-gray-600">
              Data provided by TMDB. Higher ratings and vote counts reflect
              audience data; popularity is a separate platform metric.
            </p>
          </section>
        )}
      </div>
    </main>
  );
};

export default CompareMovies;
