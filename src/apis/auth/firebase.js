// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMhj-qJqBqsZvm45wUJSrCC0ICg0eKU-M",
  authDomain: "wc2023-fpt.firebaseapp.com",
  projectId: "wc2023-fpt",
  storageBucket: "wc2023-fpt.appspot.com",
  messagingSenderId: "956880722114",
  appId: "1:956880722114:web:0690aa38086d577877835b",
  measurementId: "G-8TRJ8GKNYF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
