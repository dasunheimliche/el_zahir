
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import style from '../styles/auth.module.css'

import { login } from '../services/authServices'

const Login = ({navigate})=> {

    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [error, setError] = useState(false)

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data)=> {
            window.localStorage.setItem('token', data.data);
            navigate("/home")
            setError(false)
        },
        onError: ()=>setError(true)
    })


    const handleLogin = (e)=> {
        e.preventDefault()
        mutation.mutate({username, password})
    }

    const handleDemoLogging = (e)=> {
        e.preventDefault()
        mutation.mutate({username: "horrorshow", password: "87651234"})
    }

    useEffect(()=> {
        // la unica función de esto es despertar a uno de los host
        axios.get('https://zahir-api.onrender.com/api/register')
	}, []); 

    return (
        <div className={style.main}>
            <div className={style['left-side']}>
                <div className={style.card}>
                    <div>Bienvenido/a</div>
                    <div>Por favor ingrese sus datos</div>
                    <form >
                        <input type='text'     onChange={(e)=> setUsername(e.target.value)} placeholder={'username'} required/>
                        <input type='password' onChange={(e)=> setPassword(e.target.value)} placeholder={'password'} required/>
                        {error && <div className={style.failedLogin}></div>}
                        <button type='submit' className="p" onClick={handleLogin}>Log in</button>
                        <button type='submit' className="p" onClick={handleDemoLogging}>Demo</button>
                    </form>
                    <div className={style.toRegister}>
                        <p >¿No tienes una cuenta?</p>
                        <Link className="p" to={'/register'}>Regístrate gratis</Link>
                    </div>
                </div>
            </div>
            <div className={style['right-side']}>
            </div>
        </div>
    )
}

export default Login