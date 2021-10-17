import React, {createContext} from "react"
import firebase from 'firebase'
import "firebase/auth"
import "firebase/firestore"
import config from "../context/config/firebase"



const FirebaseContext = createContext();

if(!firebase.apps.length){
    firebase.initializeApp(config)
}
const db = firebase.firestore();

const Firebase = {

     getCurrentUser: () => {
        return firebase.auth().currentUser
     },

     add: async (user) =>{
       try{
        const uid = Firebase.getCurrentUser().uid;
         let photo = "default"
         
       }catch(error){
           console.log("Error @uploading image: ",error.message)
       }

     },


};

const FirebaseProvider = (props) => {
    return <FirebaseContext.Provider value={Firebase}>{props.children}</FirebaseContext.Provider>
}

export {FirebaseContext,FirebaseProvider};