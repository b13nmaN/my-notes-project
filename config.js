// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCt9XC-CdhsJ6GMPwGehL99I7ggsigGf3I",
  authDomain: "note-app-1f3a4.firebaseapp.com",
  projectId: "note-app-1f3a4",
  storageBucket: "note-app-1f3a4.appspot.com",
  messagingSenderId: "521291440467",
  appId: "1:521291440467:web:529d8fc62dd2d7e6c401a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app)
