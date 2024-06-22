// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD03UQJVf7mB3lXUVVsCAiO3JQW_5DqFzE",
  authDomain: "range-b10ab.firebaseapp.com",
  projectId: "range-b10ab",
  storageBucket: "range-b10ab.appspot.com",
  messagingSenderId: "744986694362",
  appId: "1:744986694362:web:282fb7487d7434cd0bcbe3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth  = getAuth(app);
const firestore = getFirestore(app);
export { auth, firestore, serverTimestamp };
export default app;