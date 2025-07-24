// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_PRgRCMOvDGjJOT9l40Zp5EuR_NvncsI",
  authDomain: "venezolario-web.firebaseapp.com",
  projectId: "venezolario-web",
  storageBucket: "venezolario-web.firebasestorage.app",
  messagingSenderId: "395904195793",
  appId: "1:395904195793:web:338b8d18f09776a23a39f0",
  measurementId: "G-XCH1CSPHXF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser environment)
let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics }; 