import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
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

export { app, auth };