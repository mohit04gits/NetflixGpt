// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNhCecSqbsr9uJE-xor6CZamvSyOc4VGI",
  authDomain: "netflixgpt-7c2e8.firebaseapp.com",
  projectId: "netflixgpt-7c2e8",
  storageBucket: "netflixgpt-7c2e8.firebasestorage.app",
  messagingSenderId: "567464431912",
  appId: "1:567464431912:web:63bdaa16fc8acd1ca2401d",
  measurementId: "G-C3GB58RZBN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();