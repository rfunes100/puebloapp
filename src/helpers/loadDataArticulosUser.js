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
               console.log('nomina data', nominaData)
                      
            data.push({
                 id: nomina.id,
                ...nominaData

            })

        //   const datas = data.filter(item => item.id === '7YP5L3aHNmDejO1RbBnl')
//  console.log('datas', datas)


        }
    )
    console.log('articulo', data)
    return data


}