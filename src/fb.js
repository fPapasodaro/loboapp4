import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyCNx3aANTEE-mAyJ5VGxX3QahrWTYDaHIA",
    authDomain: "querysaver.firebaseapp.com",
    databaseURL: "https://querysaver.firebaseio.com",
    projectId: "querysaver",
    storageBucket: "querysaver.appspot.com",
    messagingSenderId: "213666203470",
    appId: "1:213666203470:web:657ccbae223c078162801f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  export default db;