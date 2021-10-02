import React, {useContext} from 'react'

import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { Star, ShoppingCart, Heart } from 'react-feather'
import { Card, CardBody, CardText, Button, Badge } from 'reactstrap'

import {geturlimage } from '../../helpers/geturlimage'
import {getTokenimg } from '../../helpers/getTokenimg'
import Rating from 'react-rating'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { useRTL } from '@hooks/useRTL'

const ProductCards = (props) => {

    const {
        store,
        getProducts,
        products,
        activeView,
        dispatch
      } = props

  //    console.log('getProductscards', getProducts)

      const img = geturlimage()
      const imgtoken = getTokenimg()
      const imgdb = 'huay9s.jpg' // getProducts.imagen[0]
      const themeColors = useContext(ThemeColors)
      const [isRtl, setIsRtl] = useRTL()

        // ** Renders products
  const renderProducts = () => {
    
    if (products.length) {
      return products.map(item => {
        const CartBtnTag = item.isInCart ? Link : 'button'
      //  console.log('item', item.imagen[0], item)

        const urlimage = `${img}${item.imagen[0]}?alt=media&token=${imgtoken}`

        return (
          <Card className='ecommerce-card' key={item.id}>
            <div className='item-img text-center mx-auto'>
              <Link to={`/productodetalle/${item.id}`}>
                <img className='img-fluid card-img-top' src={urlimage} alt={item.imagen[0]} />
              </Link>
            </div>
            <CardBody>
              <div className='item-wrapper'>
                <div className='item-rating'>
                <br></br>
                   <Rating
          emptySymbol={<Star size={20} fill='#babfc7' stroke='#babfc7' />}
          fullSymbol={<Star size={20} fill={themeColors.colors.warning.main} stroke={themeColors.colors.warning.main} />}
          initialRating={item.condicion}
          direction={isRtl ? 'rtl' : 'ltr'}
        />
        {/* 
                  <ul className='unstyled-list list-inline'>
                    {new Array(5).fill().map((listItem, index) => {
                         console.log('listItem start', listItem, index,  item.condicion)
                     return (
                        <li key={index} className='ratings-list-item mr-25'>
                          <Star
                            className={classnames({
                              'filled-star': index + 1 <= item.condicion,
                              'filled-star': index + 1 > item.condicion
                            })}
                          />
                        </li>
                      )
                    })}
                  </ul>
                  */}
                </div>
                <div className='item-cost'>
                  <h6 className='item-price'>l.{item.precio}</h6>
                </div>
              </div>
              <h6 className='item-name'>
                <Link className='text-body' to={`/productodetalle/${item.id}`}>
                  {item.articulo}
                </Link>
                <CardText tag='span' className='item-company'>
                  By{' '}
                  <a className='company-name' href='/' onClick={e => e.preventDefault()}>
                    {item.articulo}
                  </a>
                </CardText>
              </h6>
              <CardText className='item-description'>{item.descripcion}</CardText>
            </CardBody>
            <div className='item-options text-center'>
              <div className='item-wrapper'>
                <div className='item-cost'>
                  <h4 className='item-price'>L.{item.precio}</h4>
                  {item.hasFreeShipping ? (
                    <CardText className='shipping'>
                      <Badge color='light-success'>Free Shipping</Badge>
                    </CardText>
                  ) : null}
                </div>
              </div>
              <Button
                className='btn-wishlist'
                color='light'
                onClick={() => handleWishlistClick(item.id, item.isInWishlist)}
              >
                <Heart
                  className={classnames('mr-50', {
                    'text-danger': item.isInWishlist
                  })}
                  size={14}
                />
                <span>Wishlist</span>
              </Button>
              <Button
                color='primary'
                tag={CartBtnTag}
                className='btn-cart move-cart'
                onClick={() => handleCartBtn(item.id, item.isInCart)}
                /*eslint-disable */
                {...(item.isInCart
                  ? {
                      to: '/apps/ecommerce/checkout'
                    }
                  : {})}
                /*eslint-enable */
              >
                <ShoppingCart className='mr-50' size={14} />
                <span>{item.isInCart ? 'View In Cart' : 'Add To Cart'}</span>
              </Button>
            </div>
          </Card>
        )
      })
    }
  }

   
    return (     
        <div
        className={classnames({
          'grid-view': activeView === 'grid',
          'list-view': activeView === 'list'
        })}
      >
        {renderProducts()}
      </div>
    )

}

export default ProductCards
