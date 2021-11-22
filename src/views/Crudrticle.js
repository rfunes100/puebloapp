import React, {  useEffect, useState }  from 'react'
import SaveArticulos from './SaveArticulos'
import ShowArticle from './ShowArticle'

import { useDispatch, useSelector } from 'react-redux'

import {
    CardDeck,
    Row, 
    Col, Container, CardColumns,
    Pagination, PaginationItem, PaginationLink
 
} from 'reactstrap'

import { ChevronLeft, ChevronRight } from 'react-feather'

// ** React Imports
import {leerRegistrosArticle, leerRegistros} from '../redux/actions/auth/article'

import { firebase } from '../redux/actions/firebase/config-firebase'
import { getUser } from '../helpers/getUser'
import { loadDataCategorias } from '../helpers/loadDataCategorias'
import { loadDataArticulosUser } from '../helpers/loadDataArticulosUser'
import { isObjEmpty } from '@utils'


const Crudrticle = () => {

    
    const articulouserdata = useSelector(state => state.articuloReducer.articulouserdata)
    const [items, setItems] = useState()
  const dispatch = useDispatch()


    return (
        <div>

            <SaveArticulos></SaveArticulos>

            <h1>Muestra los Articulos</h1>


       <Row>
      
          {
            
            articulouserdata.map((data, i) => (
                console.log('MAPEO', data),
            
                <Col key={i} className="spacing" lg="4" sm="6" xs="12">
            
                 <ShowArticle  props={data}/> 
                </Col>
              ))
            
                                                             
          }
         
       </Row>
      
{/*}
       <Pagination className='d-flex mt-3'>
       <PaginationItem>
        <PaginationLink className='text-nowrap' href='#' first>
          <ChevronLeft className='align-middle' size={15} />
          <span className='align-middle'>Prev</span>
        </PaginationLink>
      </PaginationItem>
       {
           
            articulouserdata.map((data, i) => (
                console.log('MAPEO', data),
                
                
                <PaginationItem active={i === 1} key={i}>
                <PaginationLink onClick={e => handlePageClick(e, i)} href="#">
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
              
              ))
            
                                                             
          }
            <PaginationItem>
        <PaginationLink className='text-nowrap' href='#' last>
          <span className='align-middle'>Next</span>
          <ChevronRight className='align-middle' size={15} />
        </PaginationLink>
      </PaginationItem>

</Pagination>

*/}

        </div>
    )
}

export default Crudrticle
