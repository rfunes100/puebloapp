
import { tipos } from '../../../tipos/tipos'

const initialState = {
    // data: []
    userdata: []

}


 export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case tipos.userAdd:
            return {
                ...state,
                userdata: [...state.userdata, action.payload]
            }
        case tipos.userRead:
            return {
                ...state,
                userdata: action.payload
            }
        default:
            return state
}
}
