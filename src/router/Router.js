
// ** React Imports
import { Suspense, useContext, lazy, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

// ** Utils
import { isUserLoggedIn } from '@utils'
import { useLayout } from '@hooks/useLayout'
import { AbilityContext } from '@src/utility/context/Can'
import { useRouterTransition } from '@hooks/useRouterTransition'

import { firebase } from '../redux/actions/firebase/config-firebase'
import { login } from '../redux/actions/auth/auth'

// ** Custom Components
// import Spinner from '@components/spinner/Loading-spinner' // Uncomment if your require content fallback
import LayoutWrapper from '@layouts/components/layout-wrapper'

// ** Router Components
import { BrowserRouter as AppRouter, Route, Switch, Redirect } from 'react-router-dom'

// ** Routes & Default Routes
import { DefaultRoute, Routes } from './routes'

// ** Layouts
import BlankLayout from '@layouts/BlankLayout'
import VerticalLayout from '@src/layouts/VerticalLayout'
import HorizontalLayout from '@src/layouts/HorizontalLayout'
import { loadDataCategorias } from '../helpers/loadDataCategorias'
import { leerRegistros, leerRegistrosArticle } from '../redux/actions/auth/article'
import { loadDataArticulosUser } from '../helpers/loadDataArticulosUser'
import { getUser } from '../helpers/getUser'

const Router = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(
      async (user) => {
        const usiario = getUser()

        const nominaData = await loadDataCategorias()
        const ArticulosData = await loadDataArticulosUser(usiario)

        //  const nominaData = loadDataCategorias().then(data => console.log('promesa categoria', data))
        console.log('articulo data await', ArticulosData)
        dispatch(leerRegistros(nominaData))
        dispatch(leerRegistrosArticle(ArticulosData))
        //  dispatch(leerRegistros(nominaData))
      }
    )
  }, [dispatch])

  // ** Hooks
  const [layout, setLayout] = useLayout()
  const [transition, setTransition] = useRouterTransition()
  // ** ACL Ability Context
  const ability = useContext(AbilityContext)
  // ** Default Layout
  const DefaultLayout = layout === 'horizontal' ? 'HorizontalLayout' : 'VerticalLayout'

  // ** All of the available layouts
  const Layouts = { BlankLayout, VerticalLayout, HorizontalLayout }

  // ** Current Active Item
  const currentActiveItem = null

  // ** Return Filtered Array of Routes & Paths
  const LayoutRoutesAndPaths = layout => {
    const LayoutRoutes = []
    const LayoutPaths = []

    if (Routes) {
      Routes.filter(route => {
        // ** Checks if Route layout or Default layout matches current layout
        if (route.layout === layout || (route.layout === undefined && DefaultLayout === layout)) {
          LayoutRoutes.push(route)
          LayoutPaths.push(route.path)
        }
      })
    }

    return { LayoutRoutes, LayoutPaths }
  }

  const NotAuthorized = lazy(() => import('@src/views/NotAuthorized'))

  // ** Init Error Component
  const Error = lazy(() => import('@src/views/Error'))


  const FinalRoute = props => {
    const route = props.route
    let action, resource

    // ** Assign vars based on route meta
    if (route.meta) {
      action = route.meta.action ? route.meta.action : null
      resource = route.meta.resource ? route.meta.resource : null
    }

    if (
      (!isUserLoggedIn() && route.meta === undefined) ||
      (!isUserLoggedIn() && route.meta && !route.meta.authRoute && !route.meta.publicRoute)
    ) {

      return <Redirect to='/login' />
    } else if (route.meta && route.meta.authRoute && isUserLoggedIn()) {
      // ** If route has meta and authRole and user is Logged in then redirect user to home page (DefaultRoute)
      return <Redirect to='/' />
    } else if (isUserLoggedIn() && !ability.can(action || 'read', resource)) {
      // ** If user is Logged in and doesn't have ability to visit the page redirect the user to Not Authorized
      return <Redirect to='/misc/not-authorized' />
    } else {
      // ** If none of the above render component
      return <route.component {...props} />
    }
  }

  // ** Return Route to Render
  const ResolveRoutes = () => {
    return Object.keys(Layouts).map((layout, index) => {
      // ** Convert Layout parameter to Layout Component
      // ? Note: make sure to keep layout and component name equal

      const LayoutTag = Layouts[layout]

      // ** Get Routes and Paths of the Layout
      const { LayoutRoutes, LayoutPaths } = LayoutRoutesAndPaths(layout)

      // ** We have freedom to display different layout for different route
      // ** We have made LayoutTag dynamic based on layout, we can also replace it with the only layout component,
      // ** that we want to implement like VerticalLayout or HorizontalLayout
      // ** We segregated all the routes based on the layouts and Resolved all those routes inside layouts

      // ** RouterProps to pass them to Layouts
      const routerProps = {}

      return (
        <Route path={LayoutPaths} key={index}>
          <LayoutTag
            routerProps={routerProps}
            layout={layout}
            setLayout={setLayout}
            transition={transition}
            setTransition={setTransition}
            currentActiveItem={currentActiveItem}
          >
            <Switch>
              {LayoutRoutes.map(route => {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact === true}
                    render={props => {
                      // ** Assign props to routerProps
                      Object.assign(routerProps, {
                        ...props,
                        meta: route.meta
                      })

                      return (
                        <Suspense fallback={null}>

                          <LayoutWrapper
                            layout={DefaultLayout}
                            transition={transition}
                            setTransition={setTransition}

                            {...(route.appLayout ? { appLayout: route.appLayout } : {})}
                            {...(route.meta ? { routeMeta: route.meta } : {})}
                            {...(route.className ? { wrapperClass: route.className } : {})}

                          >
                            <route.component {...props} />

                          </LayoutWrapper>
                        </Suspense >
                      )
                    }}
                  />
                )
              })}
            </Switch >
          </LayoutTag >
        </Route >
      )
    })
  }

  return (
    <AppRouter basename={process.env.REACT_APP_BASENAME}>
      <Switch>

        <Route
          exact
          path='/'
          render={() => {
            return <Redirect to={DefaultRoute} />
          }}
        />

        <Route
          exact
          path='/not-authorized'
          render={props => (
            <Layouts.BlankLayout>
              <NotAuthorized />
            </Layouts.BlankLayout>
          )}
        />
        {ResolveRoutes()}

        <Route path='*' component={Error} />/
      </Switch>
    </AppRouter>
  )
}

export default Router
