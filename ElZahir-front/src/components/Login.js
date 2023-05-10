// DEPENDENCIES

import axios from 'axios'
import React, { useState, useEffect } from 'react'
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

    useEffect(()=> {
        axios.get('https://zahir-api.onrender.com/api/register')
            .then(()=> {
                console.log("waking up zahir onrender server")
            })
	}, []);

    let login = async (e) => {
        e.preventDefault();
      
        try {
            const user = await axios.post(`${baseURL}/api/login`, { username, password });
            dispatch(userSlice.actions.update({ ...user.data, loggued: true }));
            setOk(true);
            window.localStorage.setItem('loggedUser', JSON.stringify(user.data));
        } catch (error) {
            setOk(false);
            console.error('ERROR LOGGING IN:', error);
        }
    };

    let demoLogin = async (e) => {
        e.preventDefault();
      
        try {
            const user = await axios.post(`${baseURL}/api/login`, { username: 'horrorshow', password: '87651234' });
            dispatch(userSlice.actions.update({ ...user.data, loggued: true }));
            setOk(true);
            window.localStorage.setItem('loggedUser', JSON.stringify(user.data));
        } catch (error) {
            setOk(false);
            console.error('ERROR DEMO LOGIN:', error);
        }
    };


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