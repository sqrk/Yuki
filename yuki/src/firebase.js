import firebase from "firebase";

var config = {
  apiKey: "AIzaSyAMifs7hCXFXMGhYfTZVJoH8h_IE8uh5pQ",
  authDomain: "yuki-a30e7.firebaseapp.com",
  databaseURL: "https://yuki-a30e7.firebaseio.com",
  projectId: "yuki-a30e7",
  storageBucket: "yuki-a30e7.appspot.com",
  messagingSenderId: "351318698761",
  appId: "1:351318698761:web:fbef6a0c612169e24e01d8",
  measurementId: "G-EZ9JRL6LD8"
};

const fb = firebase.initializeApp(config);

export {fb};
