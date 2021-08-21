import React, {useContext} from 'react'
import {
    CardDeck,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardText,
    CardFooter,
    CardGroup,
    
    CardHeader,
    Button
    
} from 'reactstrap'


import {  Star, Trash2, Info } from 'react-feather'

import { useDispatch } from 'react-redux'
import { borrarArticulo } from '../redux/actions/auth/article'
import {geturlimage } from '../helpers/geturlimage'
import {getTokenimg } from '../helpers/getTokenimg'
import Rating from 'react-rating'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { useRTL } from '@hooks/useRTL'
import { useHistory } from 'react-router-dom'


const ShowArticle = ({props}) => {

    const {  id } = props
    const img = geturlimage()
    const imgtoken = getTokenimg()
    const imgdb = props.imagen[0]
    const themeColors = useContext(ThemeColors)
    const [isRtl, setIsRtl] = useRTL()
    const history = useHistory()
 
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(borrarArticulo(id))
    }

    const handledetalle = () => {
        history.push(`/productodetalle/${id}`)
     //   history.push({
       //     pathname: '/productodetalle/',
          //  search: `${id}`
       //   })
       
    }

    const urlimage = `${img}${imgdb}?alt=media&token=${imgtoken}`
   console.log('urlimage', imgdb,  urlimage)

    return (

        <div>
            <Card  >
            <CardImg top width="100%"  src={urlimage} alt='card1' />
              {/*   <CardImg top width="100%" src="https://firebasestorage.googleapis.com/v0/b/redux-react-app-33fba.appspot.com/o/Articulos%2Fhuawei%20pro30.jpg?alt=media&token=b0c367de-5720-4ecb-a72e-b5026853608b" alt="Card image cap" /> */}
                <CardHeader>{props.articulo}</CardHeader>
                <CardBody>
                <CardTitle tag='h4'>{props.descripcion}</CardTitle>
                  
                  <CardText>

                            <a href='/' onClick={e => e.preventDefault()}>
                                L.{props.precio} 
                            </a>
                   <br></br>
                   <Rating
          emptySymbol={<Star size={32} fill='#babfc7' stroke='#babfc7' />}
          fullSymbol={<Star size={32} fill={themeColors.colors.warning.main} stroke={themeColors.colors.warning.main} />}
          initialRating={props.condicion}
          direction={isRtl ? 'rtl' : 'ltr'}
        />

                  
                  </CardText>
                  <Button.Ripple color='info' outline
                  onClick={handledetalle} >
                  <Info
                  size={18}
                />
                Informacion
            </Button.Ripple>
            <Button.Ripple color='danger' outline
             onClick={handleDelete} >
                  <Trash2
                  size={18}
                />
              Borrar
            </Button.Ripple>

                </CardBody>
                <CardFooter>
          <small className='text-muted'>{props.categoria} </small>
       
        </CardFooter>
 

              </Card>

        </div>


    )
}

export default ShowArticle
