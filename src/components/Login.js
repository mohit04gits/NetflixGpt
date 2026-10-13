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
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { checkValidInput } from "../utils/validate";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const email = useRef(null);
  const password = useRef(null);
  const firstName = useRef(null);

  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignInForm((prev) => !prev);
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    const emailValue = email.current?.value.trim() || "";
    const passwordValue = password.current?.value || "";
    const firstNameValue = firstName.current?.value.trim() || "";

    const message = checkValidInput(emailValue, passwordValue);

    if (message) {
      setErrorMessage(message);
      return;
    }

    if (!isSignInForm && !firstNameValue) {
      setErrorMessage("Please enter your name.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      if (isSignInForm) {
        await signInWithEmailAndPassword(
          auth,
          emailValue,
          passwordValue
        );
      } else {
        const credential = await createUserWithEmailAndPassword(
          auth,
          emailValue,
          passwordValue
        );

        await updateProfile(credential.user, {
          displayName: firstNameValue,
        });
      }

      navigate("/browse", { replace: true });
    } catch (error) {
      console.error("Authentication error:", error.code);

      const messages = {
        "auth/invalid-credential":
          "Invalid email or password.",
        "auth/invalid-email":
          "Please enter a valid email address.",
        "auth/user-not-found":
          "No account found with these details.",
        "auth/wrong-password":
          "Incorrect email or password.",
        "auth/email-already-in-use":
          "This email is already registered.",
        "auth/weak-password":
          "Password must contain at least 6 characters.",
        "auth/too-many-requests":
          "Too many attempts. Please try again later.",
        "auth/network-request-failed":
          "Network error. Check your connection.",
        "auth/operation-not-allowed":
          "This authentication method is disabled.",
      };

      setErrorMessage(
        messages[error.code] ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090b18] px-4 py-10 text-white">

      {/* Original ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />

        <div className="absolute -bottom-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-cyan-500/15 blur-[120px]" />

        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[100px]" />
      </div>

      <section className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#111426]/90 shadow-2xl shadow-black/40 backdrop-blur-xl md:grid-cols-2">

        {/* Left: Project identity */}
        <div className="relative flex min-h-[260px] flex-col justify-between overflow-hidden border-b border-white/10 p-7 sm:p-10 md:border-b-0 md:border-r md:p-12">

          <div
            aria-hidden="true"
            className="absolute -right-12 top-10 h-48 w-48 rounded-full border border-violet-300/10"
          />

          <div
            aria-hidden="true"
            className="absolute -right-4 top-20 h-32 w-32 rounded-full border border-cyan-300/10"
          />

          <div>
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-400/10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6 text-violet-300"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2.8 14.7 9.3 21.2 12 14.7 14.7 12 21.2 9.3 14.7 2.8 12 9.3 9.3 12 2.8Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="18.5"
                    cy="5.5"
                    r="1.5"
                    fill="currentColor"
                  />
                </svg>
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  Netflix<span className="text-violet-300">GPT</span>
                </h1>
                <p className="text-xs text-slate-500">
                  AI Movie Discovery
                </p>
              </div>
            </div>

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/10 px-3 py-1.5 text-xs font-medium text-violet-200">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                Discover something extraordinary
              </span>

              <h2 className="mt-6 max-w-sm text-3xl font-bold leading-tight sm:text-4xl">
                Your next favorite movie is a
                <span className="text-violet-300"> prompt away.</span>
              </h2>

              <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
                Explore movies, discover hidden gems, and get
                AI-powered recommendations tailored to your mood.
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-slate-100">
                Smart discovery
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Find movies you'll love.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-slate-100">
                AI suggestions
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Explore by mood and taste.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Authentication */}
        <div className="flex items-center p-7 sm:p-10 md:p-12">
          <div className="w-full">

            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Your personal movie space
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                {isSignInForm
                  ? "Welcome back"
                  : "Create your account"}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {isSignInForm
                  ? "Sign in to continue exploring your next watch."
                  : "Create an account to begin your discovery journey."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {!isSignInForm && (
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Your name
                  </label>

                  <input
                    ref={firstName}
                    id="firstName"
                    name="name"
                    type="text"
                    autoComplete="given-name"
                    placeholder="Enter your name"
                    maxLength={80}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#0b0e1b] px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-600 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Email address
                </label>

                <input
                  ref={email}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0b0e1b] px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-600 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Password
                </label>

                <input
                  ref={password}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={
                    isSignInForm
                      ? "current-password"
                      : "new-password"
                  }
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0b0e1b] px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-600 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
                />
              </div>

              {errorMessage && (
                <p
                  role="alert"
                  aria-live="polite"
                  className="rounded-xl border border-rose-400/20 bg-rose-500/10 p-3 text-sm text-rose-300"
                >
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-3.5 font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:from-violet-400 hover:to-indigo-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2 focus:ring-offset-[#111426] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading
                  ? "Please wait..."
                  : isSignInForm
                  ? "Sign in to NetflixGPT"
                  : "Create account"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-slate-600">
                OR
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <p className="text-center text-sm text-slate-400">
              {isSignInForm
                ? "New here?"
                : "Already have an account?"}{" "}

              <button
                type="button"
                onClick={toggleForm}
                className="font-semibold text-cyan-300 transition hover:text-cyan-200 focus:outline-none focus:underline"
              >
                {isSignInForm
                  ? "Create an account"
                  : "Sign in"}
              </button>
            </p>

            <p className="mt-7 text-center text-xs leading-5 text-slate-500">
              Independent educational AI movie discovery project.
              Not affiliated with Netflix.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;