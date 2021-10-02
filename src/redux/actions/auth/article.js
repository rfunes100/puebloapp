import { tipos } from '../../../tipos/tipos'
import { dbpueblo } from '../firebase/config-firebase'
import Swal from 'sweetalert2'

//const MySwal = withReactContent(Swal)

const handleSuccess = () => {
    return Swal.fire({
        title: 'Guardado exitosamente!',
        text: 'Articulo creado!',
        icon: 'success',
        customClass: {
            confirmButton: 'btn btn-success'
        },
        buttonsStyling: false
    })
}


const handleSuccessimage = () => {
    return Swal.fire({
        title: 'Guardado exitosamente!',
        text: 'Imagenes almacenadas!',
        icon: 'success',
        customClass: {
            confirmButton: 'btn btn-success'
        },
        buttonsStyling: false
    })
}

export const crear = (data) => {
    return {
        type: tipos.articleAdd,
        payload: data
    }
}


export const borrar = (id) => {
    return {
        type: tipos.articleDelete,
        payload: id
    }
}


export const leerRegistros = (data) => {
    return {
        type: tipos.categoriaRead,
        payload: data
    }
}

export const borrarArticulo = (id) => {

  //  console.log('id action', id)
    return async (dispatch, getState) => {
       // const { uid } = getState().auth;
        //    const state = getState().nomina;

        await dbpueblo
            .doc(`app/articulos/articulo/${id}`).delete()

        dispatch(borrar(id))


    }

}


export const leerRegistrosArticle = (data) => {

    return  {
        type: tipos.articleRead,
        payload:   data
    }
}

export const leerRegistrosArticleAll = (data) => {
    return  {
        type: tipos.articleReadAll,
        payload:   data
    }
}

export const leerRegistrosArticleAlltotal = (data) => {
    return  {
        type: tipos.articleReadAlltotal,
        payload:   data
    }
}

export const cargarimagenes = () => {
    handleSuccessimage()
}

export const crearRegistro = (articulo) => {
     console.log('info articulo', articulo, articulo)
    const imagen = []

    articulo.image.forEach((element, index) => imagen.push(articulo.image[index][0].name.replace(/\s+/g, ''))
    )

    return async (dispatch, getState) => {

        const datos = {
            fecha: new Date().toLocaleDateString(),
            usuarioid: localStorage.getItem("userid"),
            departamento: "cortes",
            municipio: "potrerillos",
            categoria: articulo.category,
            precio: articulo.precio,
            descripcion: articulo.descripcion,
            estado: "venta",
            // imagen: "url",
            // imagen: ["100", "101", articulo.image[0][0].name],
            imagen,
            telefono: articulo.telefono,
            vendedor: articulo.vendedor, //: "ritchie",
            articulo:  articulo.marca,
            condicion: articulo.estadopro
          //  created: firebase.firestore.Timestamp()
            

        }

        const referencia = await dbpueblo
            .collection(`app/articulos/articulo/`)
            .add(datos)

        const id = await referencia.id
        const newData = {
            ...datos,
            id

        }
        handleSuccess()
        dispatch(crear(newData))


    }

}