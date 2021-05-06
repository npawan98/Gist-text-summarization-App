import firebase from "firebase";

// require('dotenv').config()
const firebaseConfig = {
    apiKey: "AIzaSyCxDi1geX1X_21YKvGZ1NdaPtxNy0p2rzg",
    authDomain: "textsummarization-64542.firebaseapp.com",
    projectId: "textsummarization-64542",
    storageBucket: "textsummarization-64542.appspot.com",
    messagingSenderId: "564369300562",
    appId: "1:564369300562:web:0f79f6a307d22d976fd38b",
    measurementId: "G-S4KFKL0D89"
  };
  //for server side rendering we are initialing in different way (i.e we dont need to initializeApp every hot reload)

  const app = !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

  const db = firebase.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db,auth,provider};