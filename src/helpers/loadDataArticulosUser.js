import { dbpueblo } from '../redux/actions/firebase/config-firebase'
import axios from 'axios'


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

export const loadDataArticulos = async(paginacion) => {

    console.log('paginacion', paginacion)
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
  //  console.log('articulos totales', paginacion)
  //  console.log('articulos totales', data.slice(paginacion.pagina, paginacion.cantidadpagina))
    return data.slice(paginacion.pagina, paginacion.cantidadpagina)


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