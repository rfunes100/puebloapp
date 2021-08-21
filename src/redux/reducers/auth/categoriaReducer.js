import { tipos } from '../../../tipos/tipos'

const initialState = {
    // data: []
    categoriadata: []

}


export const categoriaReducer = (state = initialState, action) => {

    switch (action.type) {
        case tipos.categoriaRead:
            return {
                ...state,
                categoriadata: [...state.categoriadata, action.payload]
            }

        case tipos.categoriaAdd:
            return {}

        default:
            return state
    }
}
