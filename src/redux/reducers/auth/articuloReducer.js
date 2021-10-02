import { tipos } from '../../../tipos/tipos'

const initialState = {
    // data: []
    articulouserdata: [],
    articulouserAlldata: [],
    articulouserAlltotal: []

}


export const articuloReducer = (state = initialState, action) => {

    switch (action.type) {
        case tipos.articleAdd:
            return {
                ...state,
                articulouserdata: [...state.articulouserdata, action.payload]
            }
        case tipos.articleRead:
            return {
                ...state,
                articulouserdata: action.payload
              //  articulouserdata: [...state.articulouserdata, action.payload]
            }
            case tipos.articleReadAll:
                return {
                    ...state,
                    articulouserAlldata: action.payload
                  //  articulouserdata: [...state.articulouserdata, action.payload]
                }   
            case tipos.articleReadAlltotal:
                    return {
                        ...state,
                        articulouserAlltotal: action.payload
                      //  articulouserdata: [...state.articulouserdata, action.payload]
                    }   
            case tipos.articleDetails:
                return {
                    ...state,
                    articulouserdata: state.articulouserdata.filter((nomina) => {
                        return nomina.id === action.payload
    
                    })
                }
            case tipos.articleDelete:
                return {
                    ...state,
                    articulouserdata: state.articulouserdata.filter((nomina) => {
                        return nomina.id !== action.payload
    
                    })
    
                }

        default:
            return state
    }
}
