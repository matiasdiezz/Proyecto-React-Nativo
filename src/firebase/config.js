import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDs3eTB5elHJEarxJIlQXzcMg24GSR2UVk",
    authDomain: "rebelion-prog3.firebaseapp.com",
    projectId: "rebelion-prog3",
    storageBucket: "rebelion-prog3.appspot.com",
    messagingSenderId: "702540965979",
    appId: "1:702540965979:web:902f81ef0df099b1f1b77e",
    measurementId: "G-JKL8WGK4ZM"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();