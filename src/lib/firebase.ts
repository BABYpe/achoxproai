
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmo6oykjhmjq2zKRokuxFj_OAiT7kJfzQ",
  authDomain: "achox-pro.firebaseapp.com",
  databaseURL: "https://achox-pro-default-rtdb.firebaseio.com",
  projectId: "achox-pro",
  storageBucket: "achox-pro.firebasestorage.app",
  messagingSenderId: "25667835163",
  appId: "1:25667835163:web:fafe4897001a75f3822fbe",
  measurementId: "G-D57PQVJXJW"
};

// Initialize Firebase for SSR and client-side
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
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
