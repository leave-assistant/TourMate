import { initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    // apiKey: process.env.NEXT_PUBLIC_API_KEY,
    // authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    // projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    // storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    // messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    // appId: process.env.NEXT_PUBLIC_APP_ID
    apiKey: "AIzaSyAIvqCoGGm4ZahB2V4rh9pCVf3KjRxBoMM",
    authDomain: "tourmate-44ac3.firebaseapp.com",
    projectId: "tourmate-44ac3",
    storageBucket: "tourmate-44ac3.appspot.com",
    messagingSenderId: "721656296022",
    appId: "1:721656296022:web:b45ef5f79de72eaf31c1f7"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };