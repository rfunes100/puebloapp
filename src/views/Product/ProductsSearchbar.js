// ** Third Party Components
import { Search } from 'react-feather'
import { Row, Col, InputGroup, InputGroupAddon, Input, InputGroupText, Button } from 'reactstrap'

import { buscadorartculos } from  '../../redux/actions/auth/article'

const ProductsSearchbar = props => {
  // ** Props
  const { dispatch, getProducts, store } = props

  console.log('getProducts buscador', getProducts,  store)

  const handlebuscador = (e) => {
      console.log(e.target.value)
  }

  const handleclkbuscar = () => {
      console.log('buscar')
      buscadorartculos()
  }
  return (
    <div id='ecommerce-searchbar' className='ecommerce-searchbar'>
      <Row className='mt-1'>
        <Col sm='12'>
          <InputGroup className='input-group-merge'>
            <Input
              className='search-product'
              placeholder='Buscar Product'
              onChange={e => handlebuscador(e) }
            //  onChange={e => dispatch(getProducts({ ...store.params, q: e.target.value }))}
            />
            <InputGroupAddon addonType='append'>
              <InputGroupText>
              <Button.Ripple className='btn-icon' outline color='primary' onClick={ () => handleclkbuscar() }>
        <Search size={16} />
      </Button.Ripple>
            
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
    </div>
  )
}

export default ProductsSearchbar
