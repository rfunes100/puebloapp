import { tipos } from '../../../tipos/tipos'
import { dbpueblo } from '../firebase/config-firebase'
import { cifrar, descifrar  } from '../../../helpers/encriptacion'


export const crear = (data) => {
    return {
        type: tipos.userAdd,
        payload: data
    }
}


export const leerRegistrosuser = (data) => {
    return {
        type: tipos.userRead,
        payload: data
    }
}


export const crearRegistro = (articulo) => {
  
//console.log('usuarios', cifrar(articulo.passwordconfirm), "desifrada: ", descifrar('U2FsdGVkX18apdTNM442'), articulo.passwordconfirm,  articulo)
    return async (dispatch, getState) => {

        const datos = {
            fecha: new Date().toLocaleDateString(),
            fechaexpiracion: new Date().toLocaleDateString(),
            usuario: articulo.usuario,
            departamento: "cortes",
            municipio: "potrerillos",
            causerid: articulo.correo,
            imagen: 'foto-perfil.jpg',
            telefono: articulo.telefono,
            correo: articulo.correo,
            estado: "Activo",
            politicas: true,
            clave: cifrar(articulo.passwordconfirm),
            cantidadArticulos: 5

        }
       // console.log('datos', datos)

        const referencia = await dbpueblo
            .collection(`app/articulos/usuarios/`)
            .add(datos)
            
        const id = await referencia.id
      //  console.log('datos', id, datos)
        const newData = {
            ...datos,
            id

        }
      //  console.log('newData', newData)
        dispatch(crear(newData))
        window.location = 'login'


    }

}
