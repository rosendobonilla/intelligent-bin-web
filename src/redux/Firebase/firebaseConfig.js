import firebase from "firebase";
// replace this variable, with your own config variable
// from your firebase project
var config = {
    apiKey: "AIzaSyAGw0iFSYsCOOzcw0ecdq4s9xzofwXKe-8",
    authDomain: "intelligent-bin-ca982.firebaseapp.com",
    databaseURL: "https://intelligent-bin-ca982.firebaseio.com",
    projectId: "intelligent-bin-ca982",
    storageBucket: "intelligent-bin-ca982.appspot.com",
    messagingSenderId: "926361634326",
    appId: "1:926361634326:web:9c9390833a3985cd"
  };

let firebaseConfig = firebase.initializeApp(config);

export default firebaseConfig;