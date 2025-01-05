// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBDZh4ggUgxEjabGQuUN00s4Kb7KTb3KY0",
    authDomain: "easymeet-a3ac8.firebaseapp.com",
    projectId: "easymeet-a3ac8",
    storageBucket: "easymeet-a3ac8.firebasestorage.app",
    messagingSenderId: "222316472675",
    appId: "1:222316472675:web:c3388cfe0b4f4499c34b56",
    measurementId: "G-HYJTV3LY4C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };