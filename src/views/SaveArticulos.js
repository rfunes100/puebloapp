import React, { useState, useEffect, useContext } from 'react'

import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    FormGroup,
    Row,
    Col,
    Input,
    Form,
    Button,
    Label,
    CustomInput,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    CardText
} from 'reactstrap'
import { User, Mail, Smartphone, Lock, Facebook, Tv, Grid, Star } from 'react-feather'
import Rating from 'react-rating'

import Uppy from '@uppy/core'
import thumbnailGenerator from '@uppy/thumbnail-generator'
import { useDispatch, useSelector } from 'react-redux'
import { crearRegistro, cargarimagenes, leerRegistros } from '../redux/actions/auth/article'
import { storage } from '../redux/actions/firebase/config-firebase'
import Select, { components } from 'react-select'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { useRTL } from '@hooks/useRTL'
import { getusername } from '../helpers/getusername'


const SaveArticulos = () => {

    const [previewArr, setPreviewArr] = useState([])
    const [image, setImage] = useState([])
    const [category, setcategory] = useState("")
    const [viewArticle, setviewArticle] = useState(false)
    const [estadopro, setestadopro] = useState(0)
    const [isRtl, setIsRtl] = useRTL()
    const dispatch = useDispatch()
    const themeColors = useContext(ThemeColors)

    const categoriadata = useSelector(state => state.categoriaReducer.categoriadata)
    const userdata = useSelector(state => state.userReducer.userdata)
    const usiario = getusername()
    const userdataid = userdata.filter(item => item.usuario === usiario)

   console.log('userdata', userdata)
   
   console.log('userdataid', userdataid[0].telefono, userdataid)

    const [articulo, setarticulo] = useState({
        precio: 0,
        descripcion: "",
        marca: ""
    })

    const { precio, descripcion, marca } = articulo

    const infoarticulo = {
        precio,
        descripcion,
        marca,
        image,
        category,
        estadopro,
        telefono: userdataid[0].telefono,
        vendedor: usiario
           
    }

    const limpiar = () => {
        setarticulo({
            precio: 0,
            descripcion: "",
            marca: ""
        })
        setImage([])
        setPreviewArr([])
        setestadopro(0)

    }

    const uppy = new Uppy({
        meta: { type: 'avatar' },
        autoProceed: true,
        restrictions: { maxNumberOfFiles: 2, allowedFileTypes: ['image/*'] }
    })

    uppy.use(thumbnailGenerator)

    uppy.on('thumbnail:generated', (file, preview) => {

    })

    const renderPreview = () => {
        if (previewArr.length) {

            return previewArr.map((previewA) => <img key={previewA[0].index} className='rounded mt-2 mr-1' src={previewA[0].src} alt={previewA[0].name} />)
            //  return previewArr.map((previewA) => console.log('previea', previewA[0].name, previewA))
            // return previewArr.map((src, index, previewA) => <img key={index} className='rounded mt-2 mr-1' src={src} alt={previewA[0].name} />, console.log('previea'))
        } else {
            return null
        }
    }

    const changeimage = (e) => {

        e.preventDefault()
        const arrimage = image
        arrimage.push([e.target.files[0]])
        setImage([...arrimage])

        const arr = previewArr
        arr.push([e.target.files[0]])
        setPreviewArr([...arr])
    }

    const upload = (e) => {
        e.preventDefault()
        if (image === null) {
            return
        }

        image.forEach((element, index) => storage.ref(`/Articulos/${image[index][0].name.replace(/\s+/g, '')}`).put(image[index][0]).on("state_changed", console.log('agregado'), alert),
            cargarimagenes()

        )

    }


    const handlechange = (e) => {
        //  console.log(e.target.value)
        setarticulo({
            ...articulo,
            [e.target.name]: e.target.value
        })
    }

    const handlecategoria = (e) => {
        setcategory(e.value)

    }


    const handleaddarticle = () => {
        //  console.log(category)
        dispatch(crearRegistro(infoarticulo))
        limpiar()

    }


    const OptionComponent = ({ data, ...props }) => {
        //  console.log('Icon', data.icon)
        const iconos = data.icon
        const Icon = Grid // data.icon
        //  console.log('Icon', Icon)

        return (
            <components.Option {...props}>
                <Icon className='mr-50' size={14} />
                {data.label}
            </components.Option>
        )
    }

    const handlesshowarticle = () => {
        setviewArticle(!viewArticle)
    }

    return (
        <div>

            <Card>
                <CardHeader>
                    <CardTitle tag='h4'>Agregar Articulos </CardTitle>
                </CardHeader>

                <Col sm='12'>
                    <FormGroup className='d-flex mb-0' onClick={handlesshowarticle}>
                        <Button.Ripple className='mr-1' color='primary' >
                            {
                                !viewArticle ? "Agregar" : "Cerrar"
                            }

                        </Button.Ripple>
                    </FormGroup>
                </Col>

                {
                    viewArticle && (
                        <CardBody>
                            <Form>
                                <Row>

                                    <Col sm='12'>
                                        <Label for='nameVerticalIcons'>Articulo</Label>
                                        <InputGroup className='input-group-merge' tag={FormGroup}>
                                            <InputGroupAddon addonType='prepend'>
                                                <InputGroupText>
                                                    <Lock size={15} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type='text'
                                                name='marca'
                                                id='Iconsartmarca'
                                                onChange={handlechange}
                                                value={marca}
                                                placeholder='Articulo' />
                                        </InputGroup>
                                    </Col>
                                    <Col sm='12'>
                                        <Label for='EmailVerticalIcons'>Categorias  </Label>

                                        {
                                            categoriadata.map((categoria, index) => {
                                                //  console.log('map', index, categoria[0].label, categoria)

                                                return <Select key={index}
                                                    options={categoria}
                                                    className='react-select'
                                                    classNamePrefix='select'
                                                    value={categoria.value}
                                                    name='categoria'
                                                    onChange={handlecategoria}
                                                    components={{
                                                        Option: OptionComponent
                                                    }}

                                                />

                                            })
                                        }


                                    </Col>
                                    <Col sm='12'>
                                        <Label for='IconsMobile'>Precio</Label>
                                        <InputGroup className='input-group-merge' tag={FormGroup}>
                                            <InputGroupAddon addonType='prepend'>
                                                <InputGroupText>
                                                    <Smartphone size={15} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type='number' name='precio' id='IconsPrecio'
                                                onChange={handlechange}
                                                value={precio}
                                                placeholder='precio' />
                                        </InputGroup>
                                    </Col>
                                    <Col sm='12'>
                                        <Label for='IconsPassword'>Descripcion</Label>
                                        <InputGroup className='input-group-merge' tag={FormGroup}>
                                            <InputGroupAddon addonType='prepend'>
                                                <InputGroupText>
                                                    <Lock size={15} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type='text'
                                                name='descripcion'
                                                id='IconsDescripcion'
                                                onChange={handlechange}
                                                value={descripcion}
                                                placeholder='descripcion' />
                                        </InputGroup>
                                    </Col>

                                    <Col sm='12'>

                                        <input type="file" onChange={changeimage} multiple />
                                        <button onClick={upload}>Upload</button>

                                    </Col>


                                    <Col sm='12'>
                                        <Label for='IconsPassword'>Imagenes</Label>
                                        {renderPreview()}
                                        {/*    <DragDrop uppy={uppy} /> */}

                                    </Col>

                                    <Col sm='12'>
                                    <Label for='IconsPassword'>Estado: </Label>

                                    <Rating
          emptySymbol={<Star size={32} fill='#babfc7' stroke='#babfc7' />}
          fullSymbol={<Star size={32} fill={themeColors.colors.warning.main} stroke={themeColors.colors.warning.main} />}
          initialRating={estadopro}
          onChange={e => setestadopro(e)}
          direction={isRtl ? 'rtl' : 'ltr'}
        />

                                    </Col>
                           
                                    <Col sm='12'>
                                        <FormGroup className='d-flex mb-0'>
                                            <Button.Ripple className='mr-1' color='primary' onClick={handleaddarticle}>
                                                Submit
                                            </Button.Ripple>
                                            <Button.Ripple outline color='secondary' type='reset'>
                                                Reset
                                            </Button.Ripple>
                                        </FormGroup>
                                    </Col>

                                </Row>
                            </Form>
                        </CardBody>

                    )
                }
            </Card>


        </div >
    )
}

export default SaveArticulos
