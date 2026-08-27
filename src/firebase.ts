import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  User 
} from "firebase/auth";
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
// Client Environment Safeguard
if (!firebaseConfig.apiKey) {
  console.warn("⚠️ VITE_FIREBASE_API_KEY is missing in .env.local!");
}

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

// Authenticate with Google
export async function signInWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Firebase auth error:", error);
    throw error;
  }
}

// Helper to fetch the current ID token for server API calls
export async function getIdToken(): Promise<string | null> {
  const currentUser = auth.currentUser;
  if (!currentUser) return null;
  return await currentUser.getIdToken();
}

export async function signOutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
}

export { onAuthStateChanged };