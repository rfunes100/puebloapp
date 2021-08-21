import React, {useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'
// ** Third Party Components
import { Card, CardBody, Row, Col, CardText} from 'reactstrap'

import { loadDataArticulosdetail, loadDataArticulosUser } from '../../helpers/loadDataArticulosUser'
import DetalleProducto from './DetalleProducto'
import {geturlimage } from '../../helpers/geturlimage'
import {getTokenimg } from '../../helpers/getTokenimg'

const Index = ({history}) => {

const img = geturlimage()
const imgtoken = getTokenimg()

    const {id} = useParams()
    const dispatch = useDispatch()
    
    const articulouserdata = useSelector(state => state.articuloReducer.articulouserdata)

      const datas = articulouserdata.filter(item => item.id === id)
 
    return (
        <>
             <BreadCrumbs breadCrumbTitle='Product Details' breadCrumbParent='eCommerce' breadCrumbActive='Details' />
             <div className='app-ecommerce-details'>
          <Card>
            <CardBody>
                <DetalleProducto datas={datas}>

                </DetalleProducto>
             
            </CardBody>
            <CardBody>

           
            </CardBody>


          </Card>
        
      </div>


        </>
    )
}

export default Index
