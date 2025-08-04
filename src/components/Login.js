import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidInput } from "../utils/validate";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { BG_IMG_URL } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const email = useRef(null);
  const password = useRef(null);
  const firstName = useRef(null);


  const toggleSigInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    console.log(email.current.value);
    console.log(password.current.value);
    const message = checkValidInput(
      email.current.value,
      password.current.value
    );

    // console.log(message);
    setErrorMessage(message);
    if (message) return;

    //siginin/signup logic
    if (!isSignInForm) {
      //signup logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
        firstName.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          
          console.log(user);
          console.log(firstName.current.value)
          
        })
        
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    } else {
      //signin logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="relative h-screen w-screen">
        {/* Background Image */}
        <img
          className="h-full w-full absolute object-cover"
          src={BG_IMG_URL}
          alt="Netflix Background"
        />

        <div className="absolute inset-0 flex justify-center items-center px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-4 flex-col p-6 sm:p-8 lg:p-10 w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl items-center bg-black bg-opacity-80 rounded-lg shadow-2xl"
          >
            <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4 lg:mb-6">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </h2>

            {!isSignInForm && (
              <input
                ref={firstName}
                type="text"
                placeholder="First Name"
                className="p-3 sm:p-4 w-full border border-gray-500 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              />
            )}

            <input
              type="text"
              ref={email}
              placeholder="Email Address"
              className="p-3 sm:p-4 w-full border border-gray-500 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            />
            <input
              type="password"
              ref={password}
              placeholder="Password"
              className="p-3 sm:p-4 w-full border border-gray-500 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            />
            {/* //showing error */}
            <p className="text-red-500 text-sm sm:text-base font-semibold text-center min-h-[1.5rem]">
              {errorMessage}
            </p>

            <button
              onClick={handleButtonClick}
              className="p-3 sm:p-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <p
              className="text-white py-2 sm:py-3 lg:py-4 cursor-pointer text-sm sm:text-base hover:text-gray-300 transition-colors duration-200"
              onClick={toggleSigInForm}
            >
              {isSignInForm
                ? "New to Netflix? Sign Up"
                : "Already a user? Sign In"}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 