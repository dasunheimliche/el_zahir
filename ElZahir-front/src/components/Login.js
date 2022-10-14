import React, { useEffect, useImperativeHandle, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Samples from './Samples'
import './Login.css'

const Login = React.forwardRef((props,ref)=> {



    


    return (
        <div className="main-login">
            <div className="left-login">
                <div className="card-login">
                    <div className="title-login">Bienvenido a El Zahir</div>
                    <div className="sub-login">Por favor ingrese sus datos</div>
                    <div className="logwgoogle pointer">Log in with google</div>
                    <div className='or-login'>o</div>

                    <form className="login" onSubmit={props.login}>
                        <input className='form-login'  type='text' onChange={props.username} placeholder={'username'} />
                        <input className='form-login'  type='password' onChange={props.password} placeholder={'password'} />
                        
                        <div className='remfor-login'>
                            <div className="rem-login">Recordarme por 30 días</div>
                            <div className="for-login  pointer">¿Olvidaste tu cotnraseña?</div>
                        </div>
                        <button type='submit' className="in-login  pointer" onSubmit={props.login}>Log in</button>
                    </form>

                    <div className='qup-login'>
                        <p className="q-login">¿No tienes una cuenta?</p>
                        <a className="up-login  pointer">Regístrate grátis</a>
                    </div>
                </div>
            </div>
            <div className="right-login">
                <img></img>
                <div className="samples-login">
                    <Samples />
                </div>
            </div>
        </div>
    )
})

export default Login