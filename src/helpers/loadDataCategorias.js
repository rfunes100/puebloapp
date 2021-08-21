import { dbpueblo } from '../redux/actions/firebase/config-firebase'

export const loadDataCategorias = async () => {

    const response = await
        dbpueblo.collection(`app/articulos/categoria`).get()
    const data = []
   // response.json()
    

    response.forEach(
        (nomina) => {
            //   console.log('categoria', nomina.data())
            const nominaData = nomina.data()
             //  console.log('nomina data', nominaData)
            data.push({
                id: nomina.id,
                ...nominaData

            })

        }
    )


    //  console.log('data', data)
    return data

}
