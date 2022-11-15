import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Samples from './Samples'
import './Login.css'
import baseURL from '../services/baseURL'


const Register = ()=> {

    let [inputs, setInputs] = useState({ name: null, lastname: null, username: null, email: null, password: '', password2: '' })
    let [validUsers, setValidUsers] = useState('')
    let [ok, setOk] = useState('')


    const navegar = useNavigate()

    console.log("VALID USERSS", validUsers)
    console.log("INCUDES", validUsers.includes(inputs.username))
    // console.log("OKKK?", ok)

    useEffect(()=> {
        axios.get(baseURL.concat('/api/users'))
        .then(users => {
            let usernames = users.data.map(user => user.username)
            setValidUsers(usernames)
        })
    }, [])

    useEffect(()=> {
        if (validUsers.includes(inputs.username) || inputs.password !== inputs.password2) {
            setOk(false)
        } else {
            setOk(true)
        }
    }, [inputs])

    let signin = (e)=> {
        e.preventDefault()
        
        if (inputs.password === inputs.password2 && inputs.password.length >= 5) {
          axios.post(baseURL.concat('/api/users'), {
            name: inputs.name, lastname: inputs.lastname, username: inputs.username, email: inputs.email, password: inputs.password
          })
          navegar('/login')
        } 
    }


    return (
        <div className="main-login">
            {console.log("STARTS RENDER")}
            <div className="left-login">

                <div className="card-login">

                    <div className="title-login">Bienvenido a El Zahir</div>
                    <div className="sub-login">Por favor ingrese sus datos</div>
                    {/* <div className="logwgoogle pointer">Log in with google</div> */}
                    {/* <div className='or-login'>o</div> */}

                    <form className="login"  onSubmit={ok? (e)=>signin(e) : console.log()}>

                        <input required className='form-login'  type='text' onChange={(e)=> setInputs({...inputs, name: e.target.value})} placeholder={'name'} />
                        <input required className='form-login'  type='text' onChange={(e)=> setInputs({...inputs, lastname: e.target.value})} placeholder={'lastname'} />
                        <input required className='form-login'  type='text' onChange={(e)=> setInputs({...inputs, username: e.target.value})} placeholder={'username'} />
                        <div className={validUsers.includes(inputs.username)? 'invalidUser' : ''}></div>
                        <input required className='form-login'  type='email' onChange={(e)=> setInputs({...inputs, email: e.target.value})} placeholder={'e-mail'} />
                        <input required className='form-login'  type='password' onChange={(e)=> setInputs({...inputs, password: e.target.value})} placeholder={'password'} />
                        <input required className='form-login'  type='password' onChange={(e)=> setInputs({...inputs, password2: e.target.value})} placeholder={'repeat password'} />
                        <div className={inputs.password? (inputs.password !== inputs.password2? 'notpass': (inputs.password.length < 5? 'tooShort' : '')) : ''}></div>
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