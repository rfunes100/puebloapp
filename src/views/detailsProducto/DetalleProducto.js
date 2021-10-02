import React, {useContext, useState } from 'react'
import {
    Row,
    Col,
    CardText,
    Button,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    Card,
    CardHeader,
    CardTitle,
    CardBody
  } from 'reactstrap'
  import { Swiper, SwiperSlide } from 'swiper/react'

  
import {  Star, ArrowLeft, Smartphone, User } from 'react-feather'
import { useRTL } from '@hooks/useRTL'

  import {geturlimage } from '../../helpers/geturlimage'
import {getTokenimg } from '../../helpers/getTokenimg'
import Rating from 'react-rating'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { useHistory, Link } from 'react-router-dom'


import '@styles/react/libs/swiper/swiper.scss'

/*
const params = {
    lazy: true,
    navigation: true,
    pagination: {
      clickable: true
    }
  }
*/

  const params = {
    navigation: true
  }

const DetalleProducto = ({datas}) => {
    const history = useHistory()
    console.log('datas detalle', datas)
    const { articulo, imagen, precio, condicion, descripcion, vendedor, telefono } = datas[0]
    const themeColors = useContext(ThemeColors)
    const [isRtl, setIsRtl] = useRTL()
    

    const img = geturlimage()
    const imgtoken = getTokenimg()
    const imgdb = imagen[0]
    const array = [{ }]
    const [thumbsSwiper, setThumbsSwiper] = useState(null)

    
    const urlimage = `${img}${imgdb}?alt=media&token=${imgtoken}`
 //   console.log('urlimage', imgdb,  urlimage)
    
 //console.log('array obj', datas[0].imagen)

 imagen.forEach(element => {
     array.push(element)
 })
 array.shift()

 //  console.log('array obj', array)

   const handleBack  = () => {
    history.goBack()
}


    return (
        <div>
   

<Row className='my-2'>

<Col className='d-flex align-items-center justify-content-center mb-2 mb-md-0' md='5' xs='12'>
    
<Swiper dir={isRtl ? 'rtl' : 'ltr'} {...params}>
{

array.map((filteredItem) => (console.log('MAPEO imagenes data filteredItem'))),

   array.map((data, i) => (

   // console.log('MAPEO imagenes data',  data, i),
     <SwiperSlide key={i}> 
       <div className='img-container w-50 mx-auto py-75'>
     <img src={  `${img}${data}?alt=media&token=${imgtoken}` } alt='swiper 1'  className='swiper-lazy img-fluid align-items-center' />
      </div>
           </SwiperSlide>
        
     
     ))
   
                                                    
 }
    </Swiper>
      </Col>

    <Col md='7' xs='12'>
    <h4>{articulo}</h4>
    <div className='ecommerce-details-price d-flex flex-wrap mt-1'>
          <h4 className='item-price mr-1'>L.{precio}</h4>
          <ul className='unstyled-list list-inline'>
          <Rating
          emptySymbol={<Star size={20} fill='#babfc7' stroke='#babfc7' />}
          fullSymbol={<Star size={20} fill={themeColors.colors.warning.main} stroke={themeColors.colors.warning.main} />}
          initialRating={condicion}
          direction={isRtl ? 'rtl' : 'ltr'}
        />

          </ul>
        </div>
        <CardText>{descripcion}</CardText>

        <hr />
        <div className='product-color-options'>
          <h6>Imagenes</h6> <h6> <User size={14} /> Vendedor:  <Link> {vendedor}  </Link> <Smartphone size={14} /> Telefono: {telefono}</h6>
          <ul className='list-unstyled mb-0'></ul>
        </div>
        <hr />
        <div className='d-flex flex-column flex-sm-row pt-1'>
          <Button
            className='btn-cart mr-0 mr-sm-1 mb-1 mb-sm-0'
            color='warning'
            onClick={handleBack}
            /*eslint-enable */
          >
            <ArrowLeft className='mr-50' size={14} />
             Regresar
          </Button>
        </div>
        <hr />

    </Col>
</Row>


        </div>
    )
}

export default DetalleProducto
