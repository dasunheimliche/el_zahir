import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Samples from './Samples'
import './Login.css'
import baseURL from '../services/baseURL'

const Login = ({setUser})=> {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [ok, setOk] = useState('')
    console.log("OKKK????", ok)
    // let baseURL = "http://localhost:3001"
    // let baseURL = ""

    let login = (e)=> {
        e.preventDefault()
    
        axios.post(baseURL.concat('/api/login'), {username, password})
          .then(user => {
              setUser({...user.data, loggued: true})
              setOk(true)
              window.localStorage.setItem('loggedUser', JSON.stringify(user.data))

          })
          .catch(res=> {
            setOk(false)
          })
      }


    return (
        <div className="main-login">
            <div className="left-login">
                <div className="card-login">
                    <div className="title-login">Bienvenido/a</div>
                    <div className="sub-login">Por favor ingrese sus datos</div>
                    {/* <div className="logwgoogle pointer">Log in with google</div> */}
                    {/* <div className='or-login'>o</div> */}
                    <form className="login" onSubmit={login}>
                        <input required className='form-login'  type='text' onChange={(e)=> setUsername(e.target.value)} placeholder={'username'} />
                        <input required className='form-login'  type='password' onChange={(e)=> setPassword(e.target.value)} placeholder={'password'} />
                        {/* <div className='remfor-login'>
                            <div className="rem-login">Recordarme por 30 días</div>
                            <div className="for-login  pointer">¿Olvidaste tu cotnraseña?</div>
                        </div> */}
                        <div className={ok === false? 'failedLogin': ''}></div>
                        <button type='submit' className="in-login  pointer" >Log in</button>
                    </form>

                    <div className='qup-login'>
                        <p className="q-login">¿No tienes una cuenta?</p>
                        <Link className="up-login  pointer" to={'/register'}>Regístrate gratis</Link>
                    </div>
                </div>
            </div>
            <div className="right-login">
                {/* <img alt='samples'></img> */}
                {/* <div className="samples-login">
                    <Samples />
                </div> */}
                <div className='right-login-text'>
                    <h1 className='right-login-title'>ZAHIR</h1>
                    <p className='right-login-quote'>"Noches hubo en que me creí tan seguro de poder olvidar El Zahir, que voluntariamente lo recordaba. Lo cierto es que abusé de esos ratos: darles principio resultaba más fácil que darles fin"</p>
                    <b>El Zahir - </b><i>Jorge Luis Borges</i>
                </div>
            </div>
        </div>
    )
}

export default Login