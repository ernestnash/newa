import firebase from 'firebase';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAB9TDycHQkVfKuyh-pnFu9RU1lrLKUM7U",
  authDomain: "simple-academic-survey.firebaseapp.com",
  projectId: "simple-academic-survey",
  storageBucket: "simple-academic-survey.appspot.com",
  messagingSenderId: "328819484044",
  appId: "1:328819484044:web:6e8f83ed4a96b1aafea2a9",
  measurementId: "G-KK9NWW9DW3"
};

  const firebaseSApp = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
   const db = firebaseSApp.firestore();
   const googleProvider = new firebase.auth.GoogleAuthProvider();
   const facebookProvider = new firebase.auth.FacebookAuthProvider();
   const TwitterProvider = new firebase.auth.TwitterAuthProvider();
   const GithubProvider = new firebase.auth.GithubAuthProvider();
   const storage = firebase.storage();
  export default {auth, db, storage};
  export  {db, googleProvider, facebookProvider, TwitterProvider,GithubProvider};
  export  {auth};
  export  {storage};