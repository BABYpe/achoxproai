// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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


// Initialize Firebase for client-side
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Analytics only on the client and if supported
let analytics;
if (typeof window !== 'undefined') {
  isSupported().then(yes => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, db, storage, analytics };
