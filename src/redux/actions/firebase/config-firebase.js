// This import loads the firebase namespace along with all its type information.
import firebase from 'firebase/app'

// These imports load individual services into the firebase namespace.
import 'firebase/auth'
//import 'firebase/database'

import   'firebase/firestore'
import 'firebase/storage'

//import  from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDYNCif8uMdxTFkae2EYu_FFyhreeyl5jY",
    authDomain: "redux-react-app-33fba.firebaseapp.com",
    projectId: "redux-react-app-33fba",
    storageBucket: "redux-react-app-33fba.appspot.com",
    messagingSenderId: "130010926772",
    appId: "1:130010926772:web:6b446f302cfb3a6f8e11e1"
}

firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()

// Get a reference to the storage service, which is used to create references in your storage bucket
//const storage = firebase.storage()

// Create a storage reference from our storage service
//const storageRef = storage.ref('/Articulos')

//const dbpueblo = firebase.firestore()
const dbpueblo = firebase.firestore()

const googlAuthProvider = new firebase.auth.GoogleAuthProvider()

export {  firebase, dbpueblo, googlAuthProvider, storage }

