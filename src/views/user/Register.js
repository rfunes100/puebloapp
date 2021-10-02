import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub, User } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button,
    InputGroup, InputGroupAddon, InputGroupText, FormFeedback  } from 'reactstrap'
    import Cleave from 'cleave.js/react'
    import 'cleave.js/dist/addons/cleave-phone.hn'
import '@styles/base/pages/page-auth.scss'
import * as yup from 'yup'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { crearRegistro } from '../../redux/actions/auth/usuario'
import { useDispatch } from 'react-redux'
import { registrar } from '../../redux/actions/auth/auth'


const Register = () => {

    const options = { phone: true, phoneRegionCode: 'HN' }
    const dispatch = useDispatch()
    const phoneRegExp = /[0-9]/


    const SignupSchema = yup.object().shape({
       correo: yup.string().email().required(),
        usuario: yup.string().min(5).required(),
        password: yup.string().min(6).required(),
        telefono:  yup.string().matches(phoneRegExp, 'Phone number is not valid').min(8, "faltan digitos").max(8, "demasiados numeros"),
        passwordconfirm:  yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match') 
        
      })

    
  const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
 

  const onSubmit = (data) => {
    console.log('datos ini', data)
    dispatch(registrar(data.correo, data.passwordconfirm, data.usuario, data))
    dispatch(crearRegistro(data))


  }
  

    const RememberMe = () => {
        return (
          <>
            Acepta 
            <a className='ml-25' href='/' onClick={e => e.preventDefault()}>
              Terminos y politicas
            </a>
          </>
        )
      }


    return (
        <>
        <div className='auth-wrapper auth-v1 px-2'>
        <div className='auth-inner py-2'>
          <Card className='mb-0'>
            <CardBody>
              <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                <svg viewBox='0 0 139 95' version='1.1' height='28'>
                  <defs>
                    <linearGradient x1='100%' y1='10.5120544%' x2='50%' y2='89.4879456%' id='linearGradient-1'>
                      <stop stopColor='#000000' offset='0%'></stop>
                      <stop stopColor='#FFFFFF' offset='100%'></stop>
                    </linearGradient>
                    <linearGradient x1='64.0437835%' y1='46.3276743%' x2='37.373316%' y2='100%' id='linearGradient-2'>
                      <stop stopColor='#EEEEEE' stopOpacity='0' offset='0%'></stop>
                      <stop stopColor='#FFFFFF' offset='100%'></stop>
                    </linearGradient>
                  </defs>
                  <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                    <g id='Artboard' transform='translate(-400.000000, -178.000000)'>
                      <g id='Group' transform='translate(400.000000, 178.000000)'>
                        <path
                          d='M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z'
                          id='Path'
                          className='text-primary'
                          style={{ fill: 'currentColor' }}
                        ></path>
                        <path
                          d='M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z'
                          id='Path'
                          fill='url(#linearGradient-1)'
                          opacity='0.2'
                        ></path>
                        <polygon
                          id='Path-2'
                          fill='#000000'
                          opacity='0.049999997'
                          points='69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325'
                        ></polygon>
                        <polygon
                          id='Path-2'
                          fill='#000000'
                          opacity='0.099999994'
                          points='69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338'
                        ></polygon>
                        <polygon
                          id='Path-3'
                          fill='url(#linearGradient-2)'
                          opacity='0.099999994'
                          points='101.428699 0 83.0667527 94.1480575 130.378721 47.0740288'
                        ></polygon>
                      </g>
                    </g>
                  </g>
                </svg>
                <h2 className='brand-text text-primary ml-1'>Vuexy</h2>
              </Link>
              <CardTitle tag='h4' className='mb-1'>
               La aventura inicia aqui 🚀
              </CardTitle>
              <CardText className='mb-2'>Adminsitrar esta app sera facil y divertido!</CardText>
              <Form className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}  >
                <FormGroup>
                  <Label className='form-label' for='register-username'>
                    Usuario
                  </Label>
                  <Input type='text' id='usuario'  name="usuario" 
                    innerRef={register({ required: true })}
                    invalid={errors.usuario && true}
                  placeholder='username' autoFocus />
                              {errors && errors.usuario && <FormFeedback>{errors.usuario.message}</FormFeedback>}

                </FormGroup>
                <FormGroup>
                  <Label className='form-label' for='register-email'>
                    Correo
                  </Label>
                  <Input type='email' id='correo' name="correo" 
                  innerRef={register({ required: true })}
                  invalid={errors.correo && true}
                  placeholder='john@example.com' />
                    {errors && errors.correo && <FormFeedback>{errors.correo.message}</FormFeedback>}
                </FormGroup>
                <FormGroup>
                <label htmlFor='phone-number'>Telefono</label>
                <Input type='tel' id='telefono'  name="telefono" 
                    innerRef={register({ required: true })}
                    invalid={errors.telefono && true}
                  placeholder='9709 0582' autoFocus />
               
               {/* 
      <InputGroup className='input-group-merge'>
        <InputGroupAddon addonType='prepend'>
          <InputGroupText>HN (+504)</InputGroupText>
        </InputGroupAddon>
        <Cleave className='form-control' placeholder='9700 9582' options={options} id='telefono' name="telefono" 
        
        />
         
      </InputGroup>
      */}

      
      {errors && errors.telefono && <FormFeedback>{errors.telefono.message}</FormFeedback>}
     
                </FormGroup>
                <FormGroup>
                  <Label className='form-label' for='register-password'>
                    Password
                  </Label>
                  <InputPasswordToggle className='input-group-merge' id='password' name="password" 
                   innerRef={register({ required: true })}
                   invalid={errors.password && true}
                   />
                        {errors && errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}     
                </FormGroup>
                <FormGroup>
                  <Label className='form-label' for='register-password'>
                    Confirmar password
                  </Label>
                  <InputPasswordToggle className='input-group-merge' id='passwordconfirm' name="passwordconfirm"
                  innerRef={register({ required: true })}
                  invalid={errors.passwordconfirm && true}
                  />
                  {errors && errors.passwordconfirm && <FormFeedback>{errors.passwordconfirm.message}</FormFeedback>}
                </FormGroup>
                <Button.Ripple color='success' block  type='submit' >
                 Registrarse
                </Button.Ripple>
              </Form>
              <p className='text-center mt-2'>
                <span className='mr-25'>Ya tiene una cuenta?</span>
                <Link to='/pages/login-v1'>
                <User size={20} />   <span>Iniciar sesion</span>
                </Link>
              </p>
              <div className='divider my-2'>
                <div className='divider-text'>o</div>
              </div>
              <div className='auth-footer-btn d-flex justify-content-center'>
                <Button.Ripple color='facebook'>
                  <Facebook size={14} />
                </Button.Ripple>
                <Button.Ripple color='twitter'>
                  <Twitter size={14} />
                </Button.Ripple>
                <Button.Ripple color='google'>
                  <Mail size={14} />
                </Button.Ripple>
                <Button.Ripple className='mr-0' color='github'>
                  <GitHub size={14} />
                </Button.Ripple>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      </>
    )
}

export default Register
