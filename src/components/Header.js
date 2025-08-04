import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/appSlice";
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import GptSearch from "./GptSearch";

const Header = () => {
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store)=> store.gpt.showGptSearch)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  //handleGptSearch
  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    //console.log(e.target.value)
    dispatch(changeLanguage(e.target.value));
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser()); //no need to pass anything
        navigate("/");
      }
    });
    return () => unsubscribe(); //unsubscribing onauthstatechange
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 md:justify-between flex flex-col md:flex-row px-4 sm:px-6 lg:px-8 py-2 sm:py-3 bg-black">
      <img className="w-24 sm:w-28 md:w-36 mx-auto md:mx-0 cursor-pointer" src={LOGO} alt="Netflix Logo" />
      {user && (
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-2 sm:gap-3 p-1 sm:p-2">
          {/* language */}
          {showGptSearch && (
            <div className="inline-block">
              <select
                onChange={handleLanguageChange}
                className="bg-gray-900 p-1.5 sm:p-2 text-white px-2 sm:px-3 py-1.5 rounded-md cursor-pointer text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={handleGptSearchClick}
            className="p-1.5 sm:p-2 rounded-lg text-white bg-purple-800 hover:bg-purple-700 transition-all duration-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {showGptSearch?"HomePage":"Gpt Search"}
          </button>

          <img
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md"
            alt="user-icon"
            src={USER_AVATAR}
          />
          <button onClick={handleSignout} className="font-bold text-white text-xs sm:text-sm hover:text-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-1.5 py-1">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
