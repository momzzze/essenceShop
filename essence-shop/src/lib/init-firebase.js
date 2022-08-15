import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
    apiKey: "AIzaSyCW8CvnlVVjWYeBJ9UQTPCdoDOvWb297fE",
    authDomain: "essence2-76549.firebaseapp.com",
    databaseURL: "https://essence2-76549-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "essence2-76549",
    storageBucket: "essence2-76549.appspot.com",
    messagingSenderId: "242434598094",
    appId: "1:242434598094:web:d7e2382a16ea307f965c9f",
    measurementId: "G-PN7D5FYTYM"
};

// Initialize Firebase
export const fbApp = initializeApp(firebaseConfig);
export const auth = getAuth(fbApp);
export const db = getFirestore(fbApp);


