import { dbpueblo } from '../redux/actions/firebase/config-firebase'
import axios from 'axios'
import arrayjoin  from  'array-join' 
import { getusername } from '../helpers/getusername'
import { boolean } from 'yup/lib/locale'


export const loadDataArticulosUser = async (usiario) => {


    const response = await
        dbpueblo.collection(`app/articulos/articulo`).
            where("estado", '==', 'venta')
            .where('usuarioid', '==', usiario)
            .get()
    const data = []

    response.forEach(
        (nomina) => {
            //   console.log('categoria', nomina.data())
            const nominaData = nomina.data()
            //   console.log('nomina data', nominaData)
                      
            data.push({
                 id: nomina.id,
                ...nominaData

            })


        }
    )
  //  console.log('articulos', data)
    return data


}

export const loadDataArticulosCategoria = async(paginacion, categoria) => {

    const datosproductos = []

    console.log('paginacion, categoria', categoria, paginacion)
    const response = await
        dbpueblo.collection(`app/articulos/articulo`)
        //.orderBy('fecha', 'desc')
            .where("estado", '==', 'venta')
            .where("categoria", '==', categoria)
            .get()

            response.forEach(
                (nomina) => {
                     // console.log('categoria', index, nomina.data())
                    const nominaData = nomina.data()
                  
        
                    datosproductos.push({
                        id: nomina.id,
                       ...nominaData
                    //  ,  favor: false
        
                   })
                
        
                }
            )

            return datosproductos.slice(paginacion.pagina, paginacion.cantidadpagina)


}


export const loadArticulosFavoritos = async() => {
    const usenombre = getusername() 
    const favoritos = []

    const responsefavorito = await
    dbpueblo.collection(`app/articulos/articulo`)
    //.orderBy('fecha', 'desc')
        .where("estado", '==', 'venta')
        .where("favoritos", 'array-contains', usenombre)
     // .where("favoritos.correo", '==', usenombre)
    // .limit(2)
    // .startAfter('2')
        .get()
  
    responsefavorito.forEach(
        (nomina) => {
             // console.log('categoria', index, nomina.data())
            const nominaData = nomina.data()
    
            
            favoritos.push({
                 id: nomina.id,
                ...nominaData,
                favor: true

            })


        }
    )

    return favoritos.slice(0, 20)


}

export const loadDataArticulos = async(paginacion, escogidos) => {
    const _ = require('underscore')
    const usenombre = getusername() 
    //const bool = favoritos

    // const  escogido = Boolean(localStorage.getItem('filfavorito'))
     const escogido  = localStorage.getItem('filfavorito')

    const consultafovirots =  false 

    console.log('paginacion', escogido, paginacion)
    const response = await
        dbpueblo.collection(`app/articulos/articulo`)
        //.orderBy('fecha', 'desc')
           .where("estado", '==', 'venta')
         //  .where("favoritos", 'not in', usenombre)
            .get()

          
            const responsefavorito = await
            dbpueblo.collection(`app/articulos/articulo`)
            //.orderBy('fecha', 'desc')
                .where("estado", '==', 'venta')
                .where("favoritos", 'array-contains', usenombre)
             // .where("favoritos.correo", '==', usenombre)
            // .limit(2)
            // .startAfter('2')
                .get()

            
    const datafavoritos = []
    const datatotal = []
    const datosproductos = []
    const datosArtordenados = []

    responsefavorito.forEach(
        (nomina) => {
             // console.log('categoria', index, nomina.data())
            const nominaData = nomina.data()
    
            
             datafavoritos.push({
                 id: nomina.id,
                ...nominaData,
                favor: true

            })

            datosproductos.push({
                id: nomina.id,
               ...nominaData,
                 favor: true

           })


        }
    )

    //console.log('datafavoritos',   datafavoritos)

    let datos = []

    let contado = 0 
    response.forEach(
        (nomina) => {
            const nominaData = nomina.data()

            datos =  datafavoritos.filter(item => item.id.includes(nomina.id))

       if (datos.length === 0) {
      //  console.log('datos', nomina.id, datos)

        datatotal.push({
            id: nomina.id,
           ...nominaData,
           favor: false

       })

       
       datosproductos.push({
        id: nomina.id,
       ...nominaData,
       favor: false

   })

     //  console.log('incluye articulos', contado, nomina.id) 
       contado++
       }
     
        }  
    )

      _.sortBy(datosproductos, "fecha").forEach(elemento => {

     //   console.log('elemento', escogido)
        if (escogido === 'true') {
         //  console.log('elemento', elemento.favor, elemento)

         if (elemento.favor === true) {
            datosArtordenados.push({
                id: elemento.id,
               ...elemento
              // elemento.favor
          })
         }
     
        } else {
            datosArtordenados.push({
                id: elemento.id,
               ...elemento
              // elemento.favor
          })
        }

      })


         console.log('datosArtordenados', datosArtordenados)
         //  datosproductos.sort()
        // return datosArtordenados
        return datosArtordenados.slice(paginacion.pagina, paginacion.cantidadpagina)
   // return  _.sortBy(datosproductos.slice(paginacion.pagina, paginacion.cantidadpagina), "fecha")
}


export const loadDataArticulosAll = async() => {

    const response = await
        dbpueblo.collection(`app/articulos/articulo`)
        //.orderBy('fecha', 'desc')
            .where("estado", '==', 'venta')
        // .limit(2)
        // .startAfter('2')
            .get()
    const data = []

    response.forEach(
        (nomina) => {
             // console.log('categoria', index, nomina.data())
            const nominaData = nomina.data()
            //   console.log('nomina data', nominaData)
                      
            data.push({
                 id: nomina.id,
                ...nominaData

            })


        }
    )
  //  console.log('articulos total', data)
    return data


}


export const getProducts = params => {
    return dispatch => {
      return axios.get(`app/articulos/articulo`, { params }).then(res => {
        dispatch({ type: 'GET_PRODUCTS', data: res.data, params })
      })
    }
  }
  

export const loadDataArticulosdetaild = id => {
    return dispatch => {
      return axios.get(`app/articulos/articulo/${id}`).then(res => {
        console.log('detalle', res.data)
        dispatch({ type: 'GET_PRODUCTDETAIL', data: res.data  })
      })
    }
  }


export const loadDataArticulosdetail = async (id) => {

    const response = await
        dbpueblo.collection(`app/articulos/articulo`)
            .get()
    const data = []
console.log('response', response)
    response.forEach(
        (nomina) => {
            //   console.log('categoria', nomina.data())
            const nominaData = nomina.data()
            //   console.log('nomina data', nominaData)
                      
            data.push({
                 id: nomina.id,
                ...nominaData

            })

        //   const datas = data.filter(item => item.id === '7YP5L3aHNmDejO1RbBnl')
//  console.log('datas', datas)


        }
    )
  //  console.log('articulo', data)
    return data


}

