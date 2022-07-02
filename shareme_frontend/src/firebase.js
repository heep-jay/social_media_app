import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDA_8r7-RapYQB5jLPPSR9Hj7uKS7L_590",
    authDomain: "share-pin-13665.firebaseapp.com",
    projectId: "share-pin-13665",
    storageBucket: "share-pin-13665.appspot.com",
    messagingSenderId: "827738898002",
    appId: "1:827738898002:web:583ce05a0ad81abb00698b",
    measurementId: "G-VKKZGVNB3E"
  };

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};