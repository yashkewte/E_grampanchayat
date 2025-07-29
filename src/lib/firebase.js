import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgNgm3y7pNRkj0ODvdF35RwtwY6fvBIJo",
  authDomain: "e-grampanchayat-c8a61.firebaseapp.com",
  projectId: "e-grampanchayat-c8a61",
  storageBucket: "e-grampanchayat-c8a61.firebasestorage.app",
  messagingSenderId: "741523048533",
  appId: "1:741523048533:web:bd810515fb903147c0ecdc",
  measurementId: "G-SQ7P4H6ESL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

export {app, db, auth}