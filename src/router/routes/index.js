

import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/login'

// ** Merge Routes
const Routes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/Home'))
   

  },
  {
    path: '/second-page',
    component: lazy(() => import('../../views/SecondPage'))
  },
  {
    path: '/save-articles',
    component: lazy(() => import('../../views/Crudrticle'))
  },
  {
    path: '/idiomasapp',
    component: lazy(() => import('../../views/Idiomas'))
  },
  {
    path: '/productodetalle/:id',
    component: lazy(() => import('../../views/detailsProducto/Index'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/regsiter',
    component: lazy(() => import('../../views/user/Register')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/productall',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/Product/Index'))
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }
