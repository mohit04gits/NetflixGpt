// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { auth } from "../utils/firebase";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { addUser, removeUser } from "../utils/appSlice";
// import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constants";
// import { toggleGptSearchView } from "../utils/gptSlice";
// import { changeLanguage } from "../utils/configSlice";
// import GptSearch from "./GptSearch";

// const Header = () => {
//   const user = useSelector((store) => store.user);
//   const showGptSearch = useSelector((store)=> store.gpt.showGptSearch)
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const handleSignout = () => {
//     signOut(auth)
//       .then(() => {})
//       .catch((error) => {
//         // An error happened.
//         navigate("/error");
//       });
//   };

//   //handleGptSearch
//   const handleGptSearchClick = () => {
//     dispatch(toggleGptSearchView());
//   };

//   const handleLanguageChange = (e) => {
//     //console.log(e.target.value)
//     dispatch(changeLanguage(e.target.value));
//   };
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         const { uid, email, displayName } = user;
//         dispatch(addUser({ uid, email, displayName }));
//         navigate("/browse");
//       } else {
//         // User is signed out
//         dispatch(removeUser()); //no need to pass anything
//         navigate("/");
//       }
//     });
//     return () => unsubscribe(); //unsubscribing onauthstatechange
//   }, []);

//   return (
//     <div className="fixed top-0 left-0 right-0 z-50 md:justify-between flex flex-col md:flex-row px-4 sm:px-6 lg:px-8 py-2 sm:py-3 bg-black">
//       <img className="w-24 sm:w-28 md:w-36 mx-auto md:mx-0 cursor-pointer" src={LOGO} alt="Netflix Logo" />
//       {user && (
//         <div className="flex flex-wrap justify-center md:justify-end items-center gap-2 sm:gap-3 p-1 sm:p-2">
//           {/* language */}
//           {showGptSearch && (
//             <div className="inline-block">
//               <select
//                 onChange={handleLanguageChange}
//                 className="bg-gray-900 p-1.5 sm:p-2 text-white px-2 sm:px-3 py-1.5 rounded-md cursor-pointer text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
//               >
//                 {SUPPORTED_LANGUAGES.map((lang) => (
//                   <option key={lang.identifier} value={lang.identifier}>
//                     {lang.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}

//           <button
//             onClick={handleGptSearchClick}
//             className="p-1.5 sm:p-2 rounded-lg text-white bg-purple-800 hover:bg-purple-700 transition-all duration-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
//           >
//             {showGptSearch?"HomePage":"Gpt Search"}
//           </button>

//           <img
//             className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md"
//             alt="user-icon"
//             src={USER_AVATAR}
//           />
//           <button onClick={handleSignout} className="font-bold text-white text-xs sm:text-sm hover:text-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-1.5 py-1">
//             Sign Out
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Header;

import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/appSlice";
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isComparePage = location.pathname === "/browse/compare";
  const isBrowsePage =
    location.pathname === "/browse" || location.pathname === "/browse/";

  const handleSignout = () => {
    signOut(auth).catch((error) => {
      console.error("Sign out failed:", error);
    });
  };

  const handleGptSearchClick = () => {
    if (!isBrowsePage) {
      navigate("/browse");
    }

    if (!showGptSearch) {
      dispatch(toggleGptSearchView());
    } else if (!isBrowsePage) {
      dispatch(toggleGptSearchView());
    }
  };

  const handleHomeClick = () => {
    if (showGptSearch) {
      dispatch(toggleGptSearchView());
    }
    navigate("/browse");
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const { uid, email, displayName } = firebaseUser;
        dispatch(addUser({ uid, email, displayName }));
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Cinematic background */}
      <div className="absolute inset-0 border-b border-white/10 bg-[#080808]/90 shadow-2xl shadow-black/30 backdrop-blur-2xl" />

      {/* Netflix red accent */}
      <div className="relative h-[3px] bg-gradient-to-r from-transparent via-red-600 to-transparent" />

      <div className="relative mx-auto flex min-h-[76px] max-w-[1920px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3 sm:px-7 lg:px-12">
        {/* Brand */}

        <button
          type="button"
          onClick={handleHomeClick}
          aria-label="NetflixGPT home"
          className="group shrink-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <p className="text-2xl font-extrabold tracking-tight text-red-600 transition duration-300 group-hover:scale-105 sm:text-3xl">
            NetflixGPT
          </p>
        </button>

        {user && (
          <>
            {/* Main navigation */}
            <nav
              aria-label="Main navigation"
              className="order-3 flex w-full items-center justify-center gap-2 sm:order-none sm:w-auto sm:flex-1 sm:justify-center sm:gap-3"
            >
              <button
                type="button"
                onClick={handleHomeClick}
                className={`rounded-full px-4 py-2 text-sm font-medium transition duration-200 ${
                  isBrowsePage && !showGptSearch
                    ? "bg-white/10 text-white ring-1 ring-white/10"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                Home
              </button>

              <button
                type="button"
                onClick={() => navigate("/browse/compare")}
                className={`group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition duration-200 ${
                  isComparePage
                    ? "bg-red-600 text-white shadow-lg shadow-red-950/40"
                    : "text-gray-400 hover:bg-red-600/10 hover:text-white"
                }`}
              >
                <span aria-hidden="true">⇄</span>
                Compare Movies
              </button>

              <button
                type="button"
                onClick={handleGptSearchClick}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition duration-200 ${
                  showGptSearch && isBrowsePage
                    ? "bg-white/10 text-white ring-1 ring-white/15"
                    : "bg-gradient-to-r from-red-700 to-red-600 text-white shadow-lg shadow-red-950/30 hover:from-red-600 hover:to-red-500"
                }`}
              >
                <span aria-hidden="true">✦</span>
                AI Search
              </button>
            </nav>

            {/* Right-side controls */}
            <div className="ml-auto flex shrink-0 items-center gap-2 sm:ml-0 sm:gap-3">
              {showGptSearch && isBrowsePage && (
                <select
                  aria-label="Choose language"
                  onChange={handleLanguageChange}
                  className="max-w-[115px] cursor-pointer rounded-xl border border-white/10 bg-[#171717] px-2 py-2.5 text-xs text-white outline-none transition hover:border-red-500 focus:border-red-500 sm:max-w-none sm:px-3 sm:text-sm"
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.identifier} value={lang.identifier}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              )}

              {/* Profile */}
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1 pr-3 transition hover:border-white/20">
                <img
                  src={USER_AVATAR}
                  alt="User profile"
                  className="h-8 w-8 rounded-full object-cover ring-1 ring-white/10 sm:h-9 sm:w-9"
                />
                <span className="hidden max-w-[110px] truncate text-sm font-medium text-gray-200 md:block">
                  {user.displayName || "Member"}
                </span>
              </div>

              {/* Sign out */}
              <button
                type="button"
                onClick={handleSignout}
                className="rounded-xl border border-white/10 px-3 py-2.5 text-xs font-medium text-gray-300 transition hover:border-red-500/40 hover:bg-red-600/10 hover:text-white sm:px-4 sm:text-sm"
              >
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
