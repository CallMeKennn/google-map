// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfb3xZAr8enDz_eA8NN2wPuVOw92hKc6I",
  authDomain: "map-2ef9f.firebaseapp.com",
  projectId: "map-2ef9f",
  storageBucket: "map-2ef9f.appspot.com",
  messagingSenderId: "217502810877",
  appId: "1:217502810877:web:4b766340224db61ccf3494",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;