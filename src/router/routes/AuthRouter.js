import React from 'react'
import { Route } from 'react-router'
//import LoginScreen from '../pages/LoginScreen'
//import RegsiterScreen from '../pages/RegsiterScreen'
import Login from '../../views/Login'


const AuthRouter = () => {

    return (

        <>

            <Route exact path="/auth/login" component={Login} />


        </>
    )
}

export default AuthRouter
