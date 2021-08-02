import { tipos } from '../../../tipos/tipos'
import { dbpueblo } from '../firebase/config-firebase'

export const crear = (data) => {
    return {
        type: tipos.articleAdd,
        payload: data
    }
}


export const crearRegistro = (articulo) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth

        console.log(uid)

        const datos = {
            fecha: new Date().toLocaleDateString(),
            pago: 600.00,
            usuarioid: "rgarcia",



        }

        const referencia = await dbpueblo
            .collection(`app/articulos/articulo/`)
            .add(datos)

        const id = await referencia.id
        const newData = {
            ...datos,
            id

        }

        //  console.log(newData.data())
        dispatch(crear(newData))


    }

}