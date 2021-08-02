import { Mail, Home, ShoppingBag, Flag } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'idiomas',
    title: 'Idiomas App',
    icon: <Flag size={20} />,
    navLink: '/idiomasapp'
  },
  {
    id: 'secondPage',
    title: 'Second Page',
    icon: <Mail size={20} />,
    navLink: '/second-page'
  },
  {
    id: 'savearticles',
    title: 'Agregar Articulos',
    icon: <ShoppingBag size={20} />,
    navLink: '/save-articles'
  }
]
