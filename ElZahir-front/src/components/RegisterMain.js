import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Samples from './Samples'
import './Login.css'

const Register = ()=> {

    let [inputs, setInputs] = useState({ name: null, lastname: null, username: null, email: null, password: null, password2: null })

    const navegar = useNavigate()

    let signin = (e)=> {
        e.preventDefault()
        
        if (inputs.password === inputs.password2 && inputs.password.length >= 5) {
          axios.post('http://localhost:3001/api/users', {
            name: inputs.name, lastname: inputs.lastname, username: inputs.username, email: inputs.email, password: inputs.password
          })
          navegar('/login')
        } 
    }


    return (
        <div className="main-login">

            <div className="left-login">

                <div className="card-login">

                    <div className="title-login">Bienvenido a El Zahir</div>
                    <div className="sub-login">Por favor ingrese sus datos</div>
                    <div className="logwgoogle pointer">Log in with google</div>
                    <div className='or-login'>o</div>

                    <form className="login"  onSubmit={signin}>

                        <input className='form-login'  type='text' onChange={(e)=> setInputs({...inputs, name: e.target.value})} placeholder={'name'} />
                        <input className='form-login'  type='text' onChange={(e)=> setInputs({...inputs, lastname: e.target.value})} placeholder={'lastname'} />
                        <input className='form-login'  type='text' onChange={(e)=> setInputs({...inputs, username: e.target.value})} placeholder={'username'} />
                        <input className='form-login'  type='email' onChange={(e)=> setInputs({...inputs, email: e.target.value})} placeholder={'e-mail'} />
                        <input className='form-login'  type='password' onChange={(e)=> setInputs({...inputs, password: e.target.value})} placeholder={'password'} />
                        <input className='form-login'  type='password' onChange={(e)=> setInputs({...inputs, password2: e.target.value})} placeholder={'repeat password'} />
                        
                        <button type='submit' className="in-login  pointer">Sign in</button>
                    </form>

                </div>

            </div>

            <div className="right-login">

                <img alt='profile'></img>
                <div className="samples-login">
                    <Samples />
                </div>
                
            </div>
        </div>
    )
}

export default Register