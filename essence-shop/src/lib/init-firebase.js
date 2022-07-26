import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
    apiKey: "AIzaSyAKtkSqfuYcZ_5s6i0XBsEh1lPkNLSNUBc",
    authDomain: "essence-930bc.firebaseapp.com",
    projectId: "essence-930bc",
    storageBucket: "essence-930bc.appspot.com",
    messagingSenderId: "201274163915",
    appId: "1:201274163915:web:e110a69b3d7ad26b8a114e",
    measurementId: "G-4WX55LPVZS"
};

// Initialize Firebase
export const fbApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Initialize firestore
export const auth = getAuth(fbApp);
export const db = getFirestore(fbApp);

