export const LOGO =
  "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png";
export const USER_AVATAR =
  "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg";

// Check if TMDB API key exists
const TMDB_API_KEY = process.env.REACT_APP_TMDB_KEY;
if (!TMDB_API_KEY) {
  console.warn("⚠️ TMDB API key not found. Please add REACT_APP_TMDB_KEY to your .env file");
}

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: TMDB_API_KEY ? `Bearer ${TMDB_API_KEY}` : "",
  },
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";
export const BG_IMG_URL =
  "https://assets.nflxext.com/ffe/siteui/vlv3/fbf440b2-24a0-49f5-b2ba-a5cbe8ea8736/web/IN-en-20250324-TRIFECTA-perspective_d7c906ec-0531-47de-8ece-470d5061c88a_large.jpg";
export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "spanish", name: "Spanish" },
];

// Check if OpenAI/Groq API key exists
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_KEY;
if (!OPENAI_API_KEY) {
  console.warn("⚠️ OpenAI/Groq API key not found. Please add REACT_APP_OPENAI_KEY to your .env file");
}

export const OPENAI_KEY = OPENAI_API_KEY || "";

// Log for debugging (remove in production)
console.log("🔧 Environment Check:");
console.log("TMDB Key:", TMDB_API_KEY ? "✅ Found" : "❌ Missing");
console.log("OpenAI Key:", OPENAI_API_KEY ? "✅ Found" : "❌ Missing");
