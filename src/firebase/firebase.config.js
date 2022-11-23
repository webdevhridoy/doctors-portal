// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBRRpKOsDkWCynepXU3UPOtRxWpT5YNS-4",
    authDomain: "doctors-portal-5581d.firebaseapp.com",
    projectId: "doctors-portal-5581d",
    storageBucket: "doctors-portal-5581d.appspot.com",
    messagingSenderId: "756462348486",
    appId: "1:756462348486:web:e59003f862e4c175b88fc7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;