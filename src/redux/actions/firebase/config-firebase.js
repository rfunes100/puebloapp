// This import loads the firebase namespace along with all its type information.
import firebase from 'firebase/app'

// These imports load individual services into the firebase namespace.
import 'firebase/auth'
//import 'firebase/database'

import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDYNCif8uMdxTFkae2EYu_FFyhreeyl5jY",
    authDomain: "redux-react-app-33fba.firebaseapp.com",
    projectId: "redux-react-app-33fba",
    storageBucket: "redux-react-app-33fba.appspot.com",
    messagingSenderId: "130010926772",
    appId: "1:130010926772:web:6b446f302cfb3a6f8e11e1"
}

firebase.initializeApp(firebaseConfig)

//const dbpueblo = firebase.firestore()
const dbpueblo = firebase.firestore()


const googlAuthProvider = new firebase.auth.GoogleAuthProvider()


export { firebase, dbpueblo, googlAuthProvider }

