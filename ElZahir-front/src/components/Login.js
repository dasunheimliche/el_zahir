import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Samples from './Samples'
import './Login.css'

const Login = ({setUser})=> {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')

    let login = (e)=> {
        e.preventDefault()
    
        axios.post('http://localhost:3001/api/login', {username, password})
          .then(user => {
              setUser({...user.data, loggued: true})
              window.localStorage.setItem('loggedUser', JSON.stringify(user.data))       
          })
      }


    return (
        <div className="main-login">
            <div className="left-login">
                <div className="card-login">
                    <div className="title-login">Bienvenido a El Zahir</div>
                    <div className="sub-login">Por favor ingrese sus datos</div>
                    <div className="logwgoogle pointer">Log in with google</div>
                    <div className='or-login'>o</div>
                    <form className="login" onSubmit={login}>
                        <input className='form-login'  type='text' onChange={(e)=> setUsername(e.target.value)} placeholder={'username'} />
                        <input className='form-login'  type='password' onChange={(e)=> setPassword(e.target.value)} placeholder={'password'} />
                        <div className='remfor-login'>
                            <div className="rem-login">Recordarme por 30 días</div>
                            <div className="for-login  pointer">¿Olvidaste tu cotnraseña?</div>
                        </div>
                        <button type='submit' className="in-login  pointer" >Log in</button>
                    </form>

                    <div className='qup-login'>
                        <p className="q-login">¿No tienes una cuenta?</p>
                        <Link className="up-login  pointer" to={'/register'}>Regístrate gratis</Link>
                    </div>
                </div>
            </div>
            <div className="right-login">
                <img alt='samples'></img>
                <div className="samples-login">
                    <Samples />
                </div>
            </div>
        </div>
    )
}

export default Login