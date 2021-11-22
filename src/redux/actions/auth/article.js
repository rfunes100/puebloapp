import { tipos } from '../../../tipos/tipos'
import { dbpueblo } from '../firebase/config-firebase'
import Swal from 'sweetalert2'


import { doc, setDoc } from    'firebase/firestore'
import { setOptions } from 'leaflet'
import { loadDataArticulos, loadDataArticulosUser } from '../../../helpers/loadDataArticulosUser'
import {getpaginas, getpaginasfinal } from '../../../helpers/getpaginas'
import { getUser } from '../../../helpers/getUser'


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

const swalvalidacantidad = () => {
    return Swal.fire({
        title: 'No puede agregar mas Articulos!',
        text: 'limite 5 favor comunincarse con admin para extender!',
        icon: 'error',
        customClass: {
            confirmButton: 'btn btn-info'
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

export const cleanRegustrosArticuleuser = () => {
    return  {
    type: tipos.articleUserDataClean,
    payload:   []
    }
}


export const leerRegistrosArticle = (data) => {

    return  {
        type: tipos.articleRead,
        payload:   data
    }
}


export const borrarArticulo = (id) => {

    const usuario = getUser()

    console.log('borrarArticulo', usuario)
  //  console.log('id action', id)
    return async (dispatch, getState) => {
        console.log('delete articule getstate')
       // const { uid } = getState().auth;
        //    const state = getState().nomina;

        await dbpueblo
            .doc(`app/articulos/articulo/${id}`).delete()
        dispatch(borrar(id))
      //  const articuloall = await  loadDataArticulos(paginas)
        const ArticulosData = await loadDataArticulosUser(usuario)

            console.log('ArticulosData', ArticulosData)
        dispatch(leerRegistrosArticle(ArticulosData))

       // dispatch(cleanRegustrosArticuleuser())

    
    }

}


export const leerRegistrosArticleAll = (data) => {
    return  {
        type: tipos.articleReadAll,
        payload:   data
    }
}


export const cleanRegistrosArticleAll = () => {
    return  {
        type: tipos.articleClean,
        payload:   []
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

export const crearfavoritos = (id, favorito, datas) => {

   const paginaini = getpaginas()
   const paginafin = getpaginasfinal()
  
   console.log('paginaini', paginaini, 'paginafin', paginafin)
   const favoritos = []
   const favor = true 

   favorito.forEach((element, index) => favoritos.push(element))

      return async (dispatch, getState) => {

   //   console.log('id favoritos', paginaini, favoritos)
   
          await dbpueblo
              .doc(`app/articulos/articulo/${id}`)
              //.push(favoritos)
              //.set(favoritos, SetOptions.merge())
              .update({favoritos/*"rfunes"*/})
  
              const paginas = {
                pagina: paginaini,
                cantidadpagina: paginafin
              }
          //    console.log('paginas ini y fin', paginas)
              const articuloall = await  loadDataArticulos(paginas)

              dispatch(leerRegistrosArticleAll(articuloall))

          //  dispatch(leerRegistrosArticle(id))
           //   dispatch(leerRegistrosArticleAlltotal(id))    
             
      }
  
  }


  export const borrarfavoritos = (id, usuario) => {
    return async (dispatch, getState) => {
        const datosfavoritos = []
        const arrayfavoritos = []
        const favoritos = []
        const paginaini = getpaginas()
        const paginafin = getpaginasfinal()
        
        const response =  await dbpueblo.collection(`app/articulos/articulo`)
        //.orderBy('fecha', 'desc')
            .where("estado", '==', 'venta')
            .get()

            response.forEach(
                (nomina) => {
                     // console.log('categoria', index, nomina.data())
                    const nominaData = nomina.data()
                 
                    datosfavoritos.push({
                     //   nominaData.favoritos
                     id: nomina.id,
                     ...nominaData
                     }
                    )
        
        
                }
            )

       const   arrayallfovirtos =  datosfavoritos.filter(e => e.id.includes(id))
        
       arrayallfovirtos.forEach((element, index) => /*console.log('element', element.favoritos)*/ arrayfavoritos.push(element.favoritos))
          //  console.log('arrayfavoritos', arrayfavoritos, favoritos)
           // const  objIndex = arrayfavoritos.findIndex((obj => obj.id === 'marciofunes46@gmail.com'))

         //   arrayfavoritos.forEach((element, index) => console.log(element)/*(element === arrayfavoritos[0])*/) 
          
            for (let i = 0; i <= arrayfavoritos.length; i++) {
            //    console.log('arreglo igual', arrayfavoritos[0][i], arrayfavoritos.length,  i)
                 if (arrayfavoritos[0][i] !== usuario) {
               //  console.log('arreglo iguales ', usuario,  arrayfavoritos[0][i], arrayfavoritos.length,  i)
                 favoritos.push(arrayfavoritos[0][i])
                }
              }

              await dbpueblo
              .doc(`app/articulos/articulo/${id}`)
              //.push(favoritos)
              //.set(favoritos, SetOptions.merge())
              .update({favoritos/*"rfunes"*/})
          
              const paginas = {
                pagina: paginaini,
                cantidadpagina: paginafin
              }
              const articuloall = await  loadDataArticulos(paginas)

              dispatch(leerRegistrosArticleAll(articuloall))
         //   dispatch(leerRegistrosArticle(id))
          //    dispatch(leerRegistrosArticleAlltotal(id))    
     // 
           }

  }


  export const refresharticulos = () => {
    const paginaini = getpaginas()
    const paginafin = getpaginasfinal()

     // console.log('busqueda favoritos', paginaini, paginafin)
      
    return async (dispatch, getState) => {
        dispatch(cleanRegistrosArticleAll())
    const paginas = {
        pagina: paginaini,
        cantidadpagina: paginafin
      }
    //  console.log('busqueda favoritos aiculo', paginas)
      const articuloall = await  loadDataArticulos(paginas, true)

    //  console.log('articuloall', articuloall)
      dispatch(leerRegistrosArticleAll(articuloall))

    }
  }

  export const buscadorartculos = () => {
      console.log('buscadorartculos')
      const datosbuscador = []

    return async (dispatch, getState) => {

    
        const response =  await dbpueblo.collection(`app/articulos/articulo`)
        //.orderBy('fecha', 'desc')
            .where("estado", '==', 'venta')
            .where("categoria", '==', 'TELEVISION')
            .get()

            response.forEach(
                (nomina) => {
                     // console.log('categoria', index, nomina.data())
                    const nominaData = nomina.data()
                 
                    datosbuscador.push({
                     //   nominaData.favoritos
                     id: nomina.id,
                     ...nominaData
                     }
                    )
        
        
                }
            )

            console.log('datosbuscador', datosbuscador)

        const paginas = {
        pagina: 0,
        cantidadpagina: 10
      }
      const articuloall = await  loadDataArticulosCategoria(paginas, 'TELEVISION')

      console.log('art buscar', articuloall)
      dispatch(leerRegistrosArticleAll(articuloall))

    }

  }


export const crearRegistro = (articulo) => {
   //  console.log('info articulo', articulo, articulo)

    // console.log('getusuario', getusuario)
    const imagen = []
    const favoritos = ['vacio']

   // const favoritos = {correo: '', favor: false }

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
            condicion: articulo.estadopro,
            favoritos
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

export const validacantidadarticulos = () => {
        swalvalidacantidad()
  

  }
