// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDL033Po_BBHwJvTqRug52MJAj8dZcLWeM",
  authDomain: "range-f5d6a.firebaseapp.com",
  projectId: "range-f5d6a",
  storageBucket: "range-f5d6a.appspot.com",
  messagingSenderId: "859638295140",
  appId: "1:859638295140:web:fda212ba7bac521ebacd71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth  = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
export { auth, firestore, serverTimestamp, storage };
export default app;