import React, { useState } from 'react'

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
import { User, Mail, Smartphone, Lock } from 'react-feather'

import Uppy from '@uppy/core'
import thumbnailGenerator from '@uppy/thumbnail-generator'
import { DragDrop } from '@uppy/react'
import { useDispatch } from 'react-redux'
import { crearRegistro } from '../redux/actions/auth/article'


const SaveArticulos = () => {

    const [previewArr, setPreviewArr] = useState([])

    const dispatch = useDispatch()

    const uppy = new Uppy({
        meta: { type: 'avatar' },
        autoProceed: true,
        restrictions: { maxNumberOfFiles: 2, allowedFileTypes: ['image/*'] }
    })

    uppy.use(thumbnailGenerator)

    uppy.on('thumbnail:generated', (file, preview) => {
        const arr = previewArr
        arr.push(preview)
        setPreviewArr([...arr])
    })

    const renderPreview = () => {
        if (previewArr.length) {
            return previewArr.map((src, index) => <img key={index} className='rounded mt-2 mr-1' src={src} alt='avatar' />)
        } else {
            return null
        }
    }

    const handleaddarticle = () => {
        console.log('agregar ')
        dispatch(crearRegistro(100))


    }

    return (
        <div>

            <Card>
                <CardHeader>
                    <CardTitle tag='h4'>Agregar Articulos</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form>
                        <Row>
                            <Col sm='12'>
                                <Label for='nameVerticalIcons'>Articulo</Label>
                                <InputGroup className='input-group-merge' tag={FormGroup}>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <User size={15} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type='text' name='Articulo' id='ArticuloVerticalIcons' placeholder='Articulo' />
                                </InputGroup>
                            </Col>
                            <Col sm='12'>
                                <Label for='EmailVerticalIcons'>Categoria</Label>
                                <InputGroup className='input-group-merge' tag={FormGroup}>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Mail size={15} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type='text' name='Categoria' id='CategoriaVerticalIcons' placeholder='Categoria' />
                                </InputGroup>
                            </Col>
                            <Col sm='12'>
                                <Label for='IconsMobile'>Precio</Label>
                                <InputGroup className='input-group-merge' tag={FormGroup}>
                                    <InputGroupAddon addonType='prepend'>
                                        <InputGroupText>
                                            <Smartphone size={15} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type='number' name='Precio' id='IconsPrecio' placeholder='Precio' />
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
                                    <Input type='text' name='Descripcion' id='IconsDescripcion' placeholder='Descripcion' />
                                </InputGroup>
                            </Col>


                            <Col sm='12'>
                                <Label for='IconsPassword'>Imagenes</Label>
                                <DragDrop uppy={uppy} />
                                {renderPreview()}

                            </Col>

                            <Col sm='12'>
                                <FormGroup className='d-flex mb-0'>
                                    <Button.Ripple className='mr-1' color='sucess' onClick={handleaddarticle}>
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
            </Card>


        </div>
    )
}

export default SaveArticulos
