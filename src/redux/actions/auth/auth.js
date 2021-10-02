
//import { firebase } from '../firebase/config-firebase'
import { tipos } from '../../../tipos/tipos'
import { firebase } from '../firebase/config-firebase'
import { crearRegistro } from '../../../redux/actions/auth/usuario'
import {loadDataUsers} from '../../../helpers/loadDataUsers'

//import { Link, useHistory } from 'react-router-dom'


/*const historys = () => {
    history = useHistory()
}*/

export const login = (uid, displayname) => {

    return {
        type: tipos.login,
        payload: {
            uid,
            displayname

        }

    }
}


export const logout = () => {
    return async (dispatch) => {

        
        await firebase.auth().signOut()
        localStorage.setItem("nameuser", '')
        localStorage.setItem("userid", '')
        localStorage.setItem("avatar", '')
        localStorage.setItem("logged", false)
        dispatch({
            type: tipos.logout

        })
    }

}


export const registrar = (email, password, username, articulo) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(async ({ user }) => {

            await user.updateProfile({
                displayName: username
            })
           // console.log('articulo', articulo)
            dispatch(crearRegistro(articulo))

            dispatch(
                login(user.uid, user.displayName),
              //  console.log('user.uid', user.uid),
                localStorage.setItem("useridcreate", user.uid),
                localStorage.setItem("nameusercreate", user.displayName)
            )

        })


    }
}


export const emailAndPasswordLogin = (email, password) => {

   
    return (dispatch) => {

        // const history = useHistory()

        firebase.auth().signInWithEmailAndPassword(email, password).
            then(({ user }) => {
              
             //   loadDataUsers().then((response) => { console.log('response', response) })

               
            //    console.log('user logea', user)
                dispatch(
                   login(user.uid, user.displayName),
                    localStorage.setItem("userid", user.uid),
                    localStorage.setItem("nameuser", user.displayName),
                    localStorage.setItem("logged", true)
                    
                )
                window.location = 'productall'      

            }

            )
    }

}

