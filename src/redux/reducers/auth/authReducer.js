import { tipos } from "../../../tipos/tipos"

export const authReducer = (state = {}, action) => {

    switch (action.type) {
        case tipos.login:
            return action.payload

        case tipos.logout:
            return {

            }


        default:
            return state
    }
}