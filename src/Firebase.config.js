// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDSGbceYJ5LhIwqFOB_OTWmP6JuanZi0k",
  authDomain: "email-password-auth-f2bf3.firebaseapp.com",
  projectId: "email-password-auth-f2bf3",
  storageBucket: "email-password-auth-f2bf3.firebasestorage.app",
  messagingSenderId: "34914156544",
  appId: "1:34914156544:web:c3806d784b90ce912098e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth;