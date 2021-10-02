// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import { authReducer } from './auth/authReducer'
import { categoriaReducer } from './auth/categoriaReducer'
import { articuloReducer } from './auth/articuloReducer'
import {userReducer } from './auth/userReducer'


const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  categoriaReducer,
  articuloReducer,
  userReducer,
  auth: authReducer
})

/*
articuloReducer: [
  { fecha: '',
usuarioid: localStorage.getItem("userid"),
  departamento: "cortes",
  municipio: "potrerillos",
  categoria: '',
  precio: '',
  descripcion: '',
  estado: "venta",
  // imagen: "url",
  // imagen: ["100", "101", articulo.image[0][0].name],
  imagen: '',
  vendedor: "ritchie",
  articulo: ''}
]*/

export default rootReducer
