

import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
//import AppScreen from '../pages/AppScreen'
import PrivateRouter from './PrivateRouter'
import AuthRouter from './AuthRouter'
import { firebase } from '../../redux/actions/firebase/config-firebase'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/actions/auth/auth'
import PublicRouter from './PublicRouter'
import Login from '../../views/Login'
import { Route } from 'react-router'
import Home from '../../views/Home'

const AppRouter = () => {

    const dispatch = useDispatch()

    const [log, setLog] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    dispatch(login(user.uid, user.displayName))
                    setLog(true)
                    //   const nominaData = await loadData(user.uid)    //  dispatch(leerRegistros(nominaData));
                } else {
                    setLog(false)
                }
            }
        )

    }, [dispatch])

    return (
        <Router>
            <Switch>

                {/*  <PublicRouter path="/auth" component={AuthRouter} log={log} /> */}
                <Route exact path="/auth/login" component={Login} />
                <Route exact path="/home" component={Home} />


            </Switch>
        </Router>

    )


}

export default AppRouter
