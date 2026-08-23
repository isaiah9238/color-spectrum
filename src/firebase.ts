// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "....",
  authDomain: "gen-lang-client-0032157533.firebaseapp.com",
  projectId: "gen-lang-client-0032157533",
  storageBucket: "gen-lang-client-0032157533.firebasestorage.app",
  messagingSenderId: "235561049191",
  appId: "1:235561049191:web:22e836514a2a89d6d048c2",
  measurementId: "G-LED5ZZ7EX9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);