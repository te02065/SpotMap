import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvUZXwwlGCcvB2hF0uC_aDSRISzTcA8F0",
  authDomain: "spotmap-74724.firebaseapp.com",
  projectId: "spotmap-74724",
  storageBucket: "spotmap-74724.firebasestorage.app",
  messagingSenderId: "1048364342383",
  appId: "1:1048364342383:web:69f9934ff5f8178833819a",
  measurementId: "G-6FP7MWGLZQ"
};

// Initialize Firebase
// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs };