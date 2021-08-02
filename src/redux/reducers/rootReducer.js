// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import { authReducer } from './auth/authReducer'

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  auth: authReducer
})

export default rootReducer
