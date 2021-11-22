import { Fragment, useState, useEffect } from 'react'


// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'
import Products from './Products'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/base/pages/app-ecommerce.scss'
import { loadDataArticulos } from '../../helpers/loadDataArticulosUser'
import { leerRegistrosArticleAll  } from '../../redux/actions/auth/article'
import Sidebar from './Sidebar'


const Index = () => {

    const [activeView, setActiveView] = useState('grid')
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const getProductsadd = useSelector(state => state.articuloReducer.articulouserAlldata)
    const getProductstotal = useSelector(state => state.articuloReducer.articulouserAlltotal)
    

    const [params, setparams] = useState({
        q: '',
        sortBy: 'featured',
        perPage: 10,
        page: Number(localStorage.getItem('npagina')) //1

    })
  
    console.log(' localStorage.getItem(npagina)',  localStorage.getItem('npagina'),  params)

    /*
    const params = {
        q: '',
        sortBy: 'featured',
        perPage: 3,
        page: 1
      }

      */
    const dispatch = useDispatch()

    //console.log('params getProductstotal', getProductstotal, params)

    const totalproducts = getProductstotal.length // getProductsadd.length
    const prodcutspage = getProductsadd.slice(0, params.perPage)

    const getProducts = prodcutspage
  console.log('prodcutspage', prodcutspage, totalproducts, getProductstotal) 

     // ** Get products

     const paginas = {
        pagina: 4,
        cantidadpagina: 5
      }

    return (
        <Fragment>
      <Breadcrumbs breadCrumbTitle='tienda' breadCrumbParent='productos' breadCrumbActive='productos' />
      <Products
      store={getProducts}
        getProducts={getProducts}
        activeView={activeView}
        setActiveView={setActiveView}
        dispatch={dispatch}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        params={params}
        totalproducts={totalproducts}
        prodcutspage={prodcutspage}
    
      />
      {/* 
      <Sidebar sidebarOpen={sidebarOpen} />
      */}
    </Fragment>
    )
}

export default Index
