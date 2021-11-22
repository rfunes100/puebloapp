import { Fragment } from 'react'
import ProductCards from './ProductCards'
import ProductsHeader from './ProductsHeader'
import ProductsSearchbar from './ProductsSearchbar'

// ** Third Party Components
import classnames from 'classnames'

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import { loadDataArticulos } from '../../helpers/loadDataArticulosUser'
import { leerRegistrosArticleAll  } from '../../redux/actions/auth/article'
import { relativeTimeRounding } from 'moment'

const Products = (props) => {


    const {
        activeView,
        setActiveView,
        store,
        getProducts,
        dispatch,
        sidebarOpen,
        setSidebarOpen,
        params,
        prodcutspage,
        totalproducts

      } = props

 //   console.log('prodcutspage producto', totalproducts, prodcutspage)
  
    
    const paginas = {
        pagina: 0,
        cantidadpagina: 10
      }


         // ** Handles pagination
  const handlePageChange = (val) => {
    if (val === 'next') {
     //   getProducts = getProducts.slice(3, params.perPage)
 // console.log('siguiente')
    const articuloall =   loadDataArticulos(paginas)

      console.log('articuloall 4 a 6', articuloall.then((res) => /*console.log('res', res),*/ dispatch(leerRegistrosArticleAll(res))))
     //  params.page =  params.page + 1
      // console.log('arrLength page siguiente', params.page)
      localStorage.setItem("paginaarticulo", paginas.pagina)
      localStorage.setItem("paginaarticulofinal", paginas.cantidadpagina)
     // dispatch(getProducts({ ...params, page: params.page + 1 }))
    } else if (val === 'prev') {
      //  console.log('previo')  
      localStorage.setItem("npagina", params.page - 1)
        params.page =  params.page - 1
       // console.log('params.page prev', params.page)
        paginas.pagina =  paginas.cantidadpagina * (params.page - 1)
        
      //console.log('paginas.cantidadpagina cantidad prev', paginas.cantidadpagina, paginas.pagina)

        paginas.cantidadpagina =  paginas.cantidadpagina * (params.page)
        
   //   console.log('paginas.cantidadpagina cantidad prev', paginas.cantidadpagina, paginas.pagina)
      const articuloall =   loadDataArticulos(paginas)
      localStorage.setItem("paginaarticulo", paginas.pagina)
      localStorage.setItem("paginaarticulofinal", paginas.cantidadpagina)
     console.log('articuloall 4 a 6', articuloall.then((res) => /*console.log('res', res),*/ dispatch(leerRegistrosArticleAll(res))))
     

   }

  }

      // ** Render pages
  const renderPageItems = () => {
     params.page  = Number(localStorage.getItem('npagina'))
    console.log('params', params)

   // console.log('totalproducts divisibles', prodcutspage.length, totalproducts, Math.ceil(Number(totalproducts) / prodcutspage.length))   

    if (prodcutspage.length < 10) {  
        prodcutspage.length = 10
    }
    const arrLength =
      totalproducts !== 0 && prodcutspage.length !== 0 ?    Math.ceil(Number(totalproducts) / prodcutspage.length) : 3
    return new Array(Math.trunc(arrLength)).fill().map((item, index) => {
      //  console.log('index', index, totalproducts)
      //  console.log('arrLength', arrLength)
      //  console.log('arrLength page', params.page)
     //   params.page  = 2
      return (
        <PaginationItem
          key={index}
          active={params.page === index + 1}
          onClick={() => handlePageChange(index + 1)}
        >
          <PaginationLink href='/' onClick={e => e.preventDefault()}>
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      )
    })
  }

    
        // ** handle next page click
        const handleNext = () => {
          //  handlePageChange('next')
            if (params.page !== Number(totalproducts) / prodcutspage.length) {
              //  console.log('params.page', params.page + 1)
                paginas.pagina =  paginas.cantidadpagina * (params.page)
                localStorage.setItem("npagina", params.page + 1)
                params.page =  params.page + 1
                paginas.cantidadpagina =  paginas.cantidadpagina * (params.page)
           //   console.log('paginas.cantidadpagina cantidad ', paginas.cantidadpagina, paginas.pagina)
           console.log('params.page', params.page)
              handlePageChange('next')           
                
            }
          }
      
  
     // console.log('params prdo', params)
    return (
        <div className='content-detached content-right'>
        <div className='content-body'>
           <ProductsHeader
            store={store}
            dispatch={dispatch}
            activeView={activeView}
            getProducts={getProducts}
            setActiveView={setActiveView}
            setSidebarOpen={setSidebarOpen}
          /> 
           
          <div
            className={classnames('body-content-overlay', {
              show: sidebarOpen
            })}
            onClick={() => setSidebarOpen(false)}
          ></div>
        
          {/* 
          <ProductsSearchbar dispatch={dispatch} getProducts={store} store={store} />
          */}
         
            <Fragment>
              <ProductCards
              store={store}
              activeView={activeView}
              getProducts={getProducts}
              products={store}
            
              />
             
             <Pagination className='d-flex justify-content-center'>
              <PaginationItem
                disabled={params.page === 1}
                className='prev-item'
                onClick={() => (params.page !== 1 ? handlePageChange('prev') : null)}
              >
                <PaginationLink href='/' onClick={e => e.preventDefault()}></PaginationLink>
              </PaginationItem>
              {renderPageItems()}
              <PaginationItem
                className='next-item'
                onClick={() => handleNext()}
                disabled={params.page === Number(totalproducts) / prodcutspage.length}
              >
                <PaginationLink href='/' onClick={e => e.preventDefault()}></PaginationLink>
              </PaginationItem>
            </Pagination>
            
            </Fragment>
          
        </div>
      </div>

    )
}

export default Products
