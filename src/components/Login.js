// import { useState, useRef } from "react";
// import Header from "./Header";
// import { checkValidInput } from "../utils/validate";
// import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../utils/firebase";
// import { BG_IMG_URL } from "../utils/constants";

// const Login = () => {
//   const [isSignInForm, setIsSignInForm] = useState(true);
//   const [errorMessage, setErrorMessage] = useState();
//   const email = useRef(null);
//   const password = useRef(null);
//   const firstName = useRef(null);


//   const toggleSigInForm = () => {
//     setIsSignInForm(!isSignInForm);
//   };

//   const handleButtonClick = () => {
//     console.log(email.current.value);
//     console.log(password.current.value);
//     const message = checkValidInput(
//       email.current.value,
//       password.current.value
//     );

//     // console.log(message);
//     setErrorMessage(message);
//     if (message) return;

//     //siginin/signup logic
//     if (!isSignInForm) {
//       //signup logic
//       createUserWithEmailAndPassword(
//         auth,
//         email.current.value,
//         password.current.value,
//         firstName.current.value
//       )
//         .then((userCredential) => {
//           // Signed up
//           const user = userCredential.user;
          
//           console.log(user);
//           console.log(firstName.current.value)
          
//         })
        
//         .catch((error) => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           setErrorMessage(errorCode + " " + errorMessage);
//         });
//     } else {
//       //signin logic
//       signInWithEmailAndPassword(auth, email.current.value, password.current.value)
//         .then((userCredential) => {
//           // Signed in
//           const user = userCredential.user;
//           console.log(user);
          
//         })
//         .catch((error) => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           setErrorMessage(errorCode + " " + errorMessage);
//         });
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <div className="relative h-screen w-screen">
//         {/* Background Image */}
//         <img
//           className="h-full w-full absolute object-cover"
//           src={BG_IMG_URL}
//           alt="Netflix Background"
//         />

//         <div className="absolute inset-0 flex justify-center items-center px-4 sm:px-6 lg:px-8">
//           <form
//             onSubmit={(e) => e.preventDefault()}
//             className="flex gap-4 flex-col p-6 sm:p-8 lg:p-10 w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl items-center bg-black bg-opacity-80 rounded-lg shadow-2xl"
//           >
//             <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4 lg:mb-6">
//               {isSignInForm ? "Sign In" : "Sign Up"}
//             </h2>

//             {!isSignInForm && (
//               <input
//                 ref={firstName}
//                 type="text"
//                 placeholder="First Name"
//                 className="p-3 sm:p-4 w-full border border-gray-500 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
//               />
//             )}

//             <input
//               type="text"
//               ref={email}
//               placeholder="Email Address"
//               className="p-3 sm:p-4 w-full border border-gray-500 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
//             />
//             <input
//               type="password"
//               ref={password}
//               placeholder="Password"
//               className="p-3 sm:p-4 w-full border border-gray-500 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
//             />
//             {/* //showing error */}
//             <p className="text-red-500 text-sm sm:text-base font-semibold text-center min-h-[1.5rem]">
//               {errorMessage}
//             </p>

//             <button
//               onClick={handleButtonClick}
//               className="p-3 sm:p-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
//             >
//               {isSignInForm ? "Sign In" : "Sign Up"}
//             </button>
//             <p
//               className="text-white py-2 sm:py-3 lg:py-4 cursor-pointer text-sm sm:text-base hover:text-gray-300 transition-colors duration-200"
//               onClick={toggleSigInForm}
//             >
//               {isSignInForm
//                 ? "New to Netflix? Sign Up"
//                 : "Already a user? Sign In"}
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login; 



import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { checkValidInput } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { BG_IMG_URL } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const email = useRef(null);
  const password = useRef(null);
  const firstName = useRef(null);

  const navigate = useNavigate();

  const toggleSigInForm = () => {
    setIsSignInForm((prev) => !prev);
    setErrorMessage("");
  };

  const handleButtonClick = async () => {
    const emailValue = email.current?.value.trim();
    const passwordValue = password.current?.value;
    const firstNameValue = firstName.current?.value.trim();

    const message = checkValidInput(emailValue, passwordValue);
    setErrorMessage(message || "");

    if (message) return;

    if (!isSignInForm && !firstNameValue) {
      setErrorMessage("Please enter your first name.");
      return;
    }

    setIsLoading(true);

    try {
      if (!isSignInForm) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          emailValue,
          passwordValue
        );

        await updateProfile(userCredential.user, {
          displayName: firstNameValue,
        });
      } else {
        await signInWithEmailAndPassword(
          auth,
          emailValue,
          passwordValue
        );
      }

      navigate("/browse", { replace: true });
    } catch (error) {
      console.error("Authentication error:", error.code, error.message);

      const messages = {
        "auth/invalid-credential": "Invalid email or password.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect password.",
        "auth/email-already-in-use": "This email is already registered.",
        "auth/weak-password": "Password should be at least 6 characters.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
        "auth/network-request-failed":
          "Network error. Check your internet connection.",
      };

      setErrorMessage(
        messages[error.code] || error.message || "Authentication failed."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />

      <div className="relative h-screen w-screen">
        <img
          className="absolute h-full w-full object-cover"
          src={BG_IMG_URL}
          alt="Netflix Background"
        />

        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleButtonClick();
            }}
            className="flex w-full max-w-sm flex-col items-center gap-4 rounded-lg bg-black bg-opacity-80 p-6 shadow-2xl sm:max-w-md sm:p-8 lg:max-w-lg"
          >
            <h2 className="mb-2 text-xl font-bold text-white sm:text-2xl lg:text-3xl">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </h2>

            {!isSignInForm && (
              <input
                ref={firstName}
                type="text"
                placeholder="First Name"
                required
                className="w-full rounded-md border border-gray-500 bg-gray-800 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 sm:p-4"
              />
            )}

            <input
              ref={email}
              type="email"
              placeholder="Email Address"
              required
              className="w-full rounded-md border border-gray-500 bg-gray-800 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 sm:p-4"
            />

            <input
              ref={password}
              type="password"
              placeholder="Password"
              required
              className="w-full rounded-md border border-gray-500 bg-gray-800 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 sm:p-4"
            />

            <p className="min-h-6 text-center text-sm font-semibold text-red-500">
              {errorMessage}
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-red-600 p-3 font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:p-4"
            >
              {isLoading
                ? "Please wait..."
                : isSignInForm
                ? "Sign In"
                : "Sign Up"}
            </button>

            <p
              className="cursor-pointer py-2 text-sm text-white transition hover:text-gray-300 sm:text-base"
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