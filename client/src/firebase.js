
import { initializeApp } from "firebase/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "videostreaming-72815.firebaseapp.com",
  projectId: "videostreaming-72815",
  storageBucket: "videostreaming-72815.firebasestorage.app",
  messagingSenderId: "850571908441",
  appId: "1:850571908441:web:0a53c50ddfb92484486848",
  measurementId: "G-WNGQ7GP52B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);