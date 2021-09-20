import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAr7SueTWjwVPSfBvNnPoAA5rKMKM3RU9k",
    authDomain: "whatsapp-clone21-a0359.firebaseapp.com",
    projectId: "whatsapp-clone21-a0359",
    storageBucket: "whatsapp-clone21-a0359.appspot.com",
    messagingSenderId: "327369192977",
    appId: "1:327369192977:web:3027a72979703eaad3e3b0",
    measurementId: "G-5Q5NLJ7QC9"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;