import { dbpueblo } from '../redux/actions/firebase/config-firebase'
import { getusername } from '../helpers/getusername'


export const loadDataUsers = async() => {


   const usenombre = getusername() // localStorage.nameuser 

  // console.log('usenombre', localStorage.nameuser, localStorage)

    const response = await
        dbpueblo.collection(`app/articulos/usuarios`)
        //.orderBy('fecha', 'desc')
            .where("estado", '==', 'Activo')
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
    console.log('usuarios total', data)
    const datas = data.filter(item => item.usuario === usenombre)
    console.log('usuarios total datas',  datas)

    console.log('usenombre', usenombre.IsEmpty)
    if (datas.length > 0) {
        
        console.log('usuarios total datas', datas[0].imagen, datas)
        localStorage.setItem("avatar", datas[0].imagen)
        
// console.log('vacia vacia o undefined')
    }

    return data


}