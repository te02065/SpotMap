import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    
    apiKey: "AIzaSyAvUZXwwlGCcvB2hF0uC_aDSRISzTcA8F0",
    authDomain: "spotmap-74724.firebaseapp.com",
    projectId: "spotmap-74724",
    storageBucket: "spotmap-74724.firebasestorage.app",
    messagingSenderId: "1048364342383",
    appId: "1:1048364342383:web:69f9934ff5f8178833819a",
    /*
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    */
    measurementId: "G-6FP7MWGLZQ"
};

// Initialize Firebase
// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs, doc, getDoc };