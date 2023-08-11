
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import style from '../styles/auth.module.css'

import { login } from '../services/authServices'

const Login = ({navigate})=> {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error,    setError   ] = useState(false)

    const isInputValid = (username.length > 0 && password.length > 0)

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

    const handleDemoLogin = (e)=> {
        e.preventDefault()
        mutation.mutate({username: "horrorshow", password: "87651234"})
    }

    const handleUsernameChange = (e)=> {
        setError(false)
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e)=> {
        setError(false)
        setPassword(e.target.value)
    }

    useEffect(()=> {
        // la unica función de esto es despertar a uno de los host
        axios.get('https://zahir-api.onrender.com/api/register')
	}, []); 

    return (
        <div className={style.main}>
            <div className={style.leftSide}>
                <div className={style.authCard}>
                    <div>Bienvenido/a</div>
                    <div>Por favor ingrese sus datos:</div>
                    <form >
                        <input type='text'     onChange={handleUsernameChange} placeholder={'username'} required/>
                        <input type='password' onChange={handlePasswordChange} placeholder={'password'} required/>

                        {error && <div className={style.failedLogin}></div>}

                        <div className={style.buttons}>
                            <button type='submit' className="p" onClick={handleDemoLogin}>Demo</button>
                            <button type='submit' className="p" onClick={handleLogin} disabled={!isInputValid}>Log in</button>
                        </div>
                    </form>
                    <div className={style.toRegister}>
                        <p >¿No tienes una cuenta?</p>
                        <Link className="p" to={'/register'}>Regístrate gratis</Link>
                    </div>
                </div>
            </div>
            <div className={style.rightSide}>
            </div>
        </div>
    )
}

export default Login