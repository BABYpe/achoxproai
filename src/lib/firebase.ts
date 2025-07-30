
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY, // Use the unified key
  authDomain: "achox-pro.firebaseapp.com",
  databaseURL: "https://achox-pro-default-rtdb.firebaseio.com",
  projectId: "achox-pro",
  storageBucket: "achox-pro.appspot.com",
  messagingSenderId: "25667835163",
  appId: "1:25667835163:web:2a1f1826ff5de9b8822fbe",
  measurementId: "G-X458VWZEGW"
};

// Initialize Firebase for SSR and client-side
let app: FirebaseApp;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

// Initialize Analytics only on the client and if supported
let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  isSupported().then(yes => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, db, storage, analytics };
