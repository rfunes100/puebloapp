
//import { firebase } from '../firebase/config-firebase'
import { tipos } from '../../../tipos/tipos'
import { firebase } from '../firebase/config-firebase'
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


export const emailAndPasswordLogin = (email, password) => {


    return (dispatch) => {

        // const history = useHistory()

        firebase.auth().signInWithEmailAndPassword(email, password).
            then(({ user }) => {
                console.log(user)
                dispatch(
                    login(user.uid, user.displayName),
                    localStorage.setItem("userid", user.uid),
                    localStorage.setItem("nameuser", user.displayName)

                )
                window.location = 'home'
                // history.push('home')

            }

            )
    }

}

