// DEPENDENCIES

import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// REDUCER
import { userSlice} from '../reducers/userSlice'

// CSS
import style from '../styles/auth.module.css'

// BASE URL
import baseURL from '../services/baseURL'



const Login = ()=> {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [ok, setOk] = useState(true)

    let dispatch = useDispatch()

    let login = (e)=> {
        e.preventDefault()
    
        axios.post(baseURL.concat('/api/login'), {username, password})
            .then(user => {
                dispatch(userSlice.actions.update({...user.data, loggued: true}))
                setOk(true)
                window.localStorage.setItem('loggedUser', JSON.stringify(user.data))
          })
            .catch(() => {
                setOk(false)
            })
    }

    let demoLogin = (e)=> {
        e.preventDefault()
        axios.post(baseURL.concat('/api/login'), {username: "horrorshow", password: "87651234"})
            .then(user => {
                dispatch(userSlice.actions.update({...user.data, loggued: true}))
                setOk(true)
                window.localStorage.setItem('loggedUser', JSON.stringify(user.data))
          })
            .catch(() => {
                setOk(false)
            })
    }


    return (
        <div className={style.main}>

            <div className={style['left-side']}>

                <div className={style.card}>

                    <div>Bienvenido/a</div>
                    <div>Por favor ingrese sus datos</div>

                    <form onSubmit={login}>

                        <input required type='text'     onChange={(e)=> setUsername(e.target.value)} placeholder={'username'} />
                        <input required type='password' onChange={(e)=> setPassword(e.target.value)} placeholder={'password'} />
                        {!ok && <div className={style.failedLogin}></div>}
                        <button type='submit' className="p" >Log in</button>
                        <button type='submit' className="p" onClick={demoLogin}>Demo</button>

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