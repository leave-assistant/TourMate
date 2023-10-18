import { initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = require('config.json');


const firebaseConfig = {
    apiKey: config.APP_FB_API_KEY,
    authDomain: config.APP_FB_AUTH_DOMAIN,
    projectId: config.APP_FB_PROJECT_ID,
    storageBucket: config.APP_FB_STORAGE_BUCKET,
    messagingSenderId: config.APP_FB_MESSAGING_SENDER_ID,
    appId: config.APP_FB_API_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };