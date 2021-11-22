// ** Third Party Components
import classnames from 'classnames'
import { Menu, Grid, List, Star, Clipboard } from 'react-feather'
import {
  Row,
  Col,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Button,
  ButtonGroup
} from 'reactstrap'

import { useState } from 'react'
import { refresharticulos} from '../../redux/actions/auth/article'
import { useDispatch } from 'react-redux'


const ProductsHeader = props => {
  // ** Props
  const { activeView, setActiveView,  dispatch, getProducts, store, setSidebarOpen } = props
  const [activeprodView, setActiveprodView] = useState("all")
  const dispatches = useDispatch()


   const handlefavoritos = () => {
    //  console.log('favoritos')
      localStorage.setItem('paginaarticulofinal', 10)
      localStorage.setItem('paginaarticulo', 0)
      localStorage.setItem("filfavorito", true)
      localStorage.setItem("npagina", 1)
      setActiveprodView('favoritos')
     dispatches(refresharticulos())
    
   }

   const handleproductos = () => {
  //  console.log(' no aplica favoritos')
    localStorage.setItem("filfavorito", false)
    setActiveprodView('all')
    localStorage.setItem('paginaarticulofinal', 10)
    localStorage.setItem('paginaarticulo', 0)
    const aplica = localStorage.getItem("filfavorito")
    localStorage.setItem("npagina", 1)
  //  console.log(' no aplica favoritos', aplica)
    dispatches(refresharticulos())
    

   }

  // ** Sorting obj
  const sortToggleText = {
    'price-desc': 'Highest',
    'price-asc': 'Lowest',
    featured: 'Featured'
  }

  return (
    <div className='ecommerce-header'>
      <Row>
        <Col sm='12'>
          <div className='ecommerce-header-items'>
            <div className='result-toggler'>
              <button className='navbar-toggler shop-sidebar-toggler' onClick={() => setSidebarOpen(true)}>
                <span className='navbar-toggler-icon d-block d-lg-none'>
                  <Menu size={14} />
                </span>
              </button>
              <span className='search-results'>{store.totalProducts} Results Found</span>
            </div>
            <div className='view-options d-flex'>
                {/* 
              <UncontrolledButtonDropdown className='dropdown-sort'>
                <DropdownToggle className='text-capitalize mr-1' color='primary' outline caret>
                   {sortToggleText[store.params.sortBy]}
                
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    className='w-100'
                    onClick={() => dispatch(getProducts({ ...store.params, sortBy: 'featured' }))}
                  >
                    Featured
                  </DropdownItem>
                  <DropdownItem
                    className='w-100'
                    onClick={() => dispatch(getProducts({ ...store.params, sortBy: 'price-asc' }))}
                  >
                    Lowest
                  </DropdownItem>
                  <DropdownItem
                    className='w-100'
                    onClick={() => dispatch(getProducts({ ...store.params, sortBy: 'price-desc' }))}
                  >
                    Highest
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            */}


              <ButtonGroup className='btn-group-toggle'>
              <Button
                  tag='label'
                  className={classnames('btn-icon view-btn grid-view-btn', {
                    active: activeprodView === 'all'
                  })}
                  color='info'
                  outline
                  onClick={() => handleproductos()}
                >
                  <Clipboard size={18} />
                </Button>
              <Button
                  tag='label'
                  className={classnames('btn-icon view-btn grid-view-btn', {
                    active: activeprodView === 'favoritos'
                  })}
                  color='info'
                  outline
                  onClick={() => handlefavoritos()}
                >
                  <Star size={18} />
                </Button>
                <Button
                  tag='label'
                  className={classnames('btn-icon view-btn grid-view-btn', {
                    active: activeView === 'grid'
                  })}
                  color='primary'
                  outline
                  onClick={() => setActiveView('grid')}
                >
                  <Grid size={18} />
                </Button>
                <Button
                  tag='label'
                  className={classnames('btn-icon view-btn list-view-btn', {
                    active: activeView === 'list'
                  })}
                  color='primary'
                  outline
                  onClick={() => setActiveView('list')}
                >
                  <List size={18} />
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ProductsHeader
