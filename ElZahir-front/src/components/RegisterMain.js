// DEPENDENCIES
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// CSS
import style from '../styles/auth.module.css'

// BASE URL
import baseURL from '../services/baseURL'


const Register = ()=> {

    // STATES
    let [inputs, setInputs] = useState({ name: null, lastname: null, username: null, email: null, password: '', password2: '' })
    let [validUsers, setValidUsers] = useState([])

    let [isPassOk, setIsPassOk] = useState(false)
    let [isUsernameOk, setIsUserameOk] = useState(false) 

    // HOOKS
    const navegar = useNavigate()

    // USE EFFECTS
    useEffect(()=> {
        axios.get(baseURL.concat('/api/register'))
            .then( ({data: usernames}) => {
                setValidUsers(usernames)
            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    useEffect(()=> {
        if (inputs.password !== inputs.password2 || inputs.password.length < 1) {
            setIsPassOk(false)
        } else {
            setIsPassOk(true)
        }
    }, [inputs.password, inputs.password2])

    useEffect(()=> {
        if (!validUsers) return

        if (validUsers.includes(inputs.username)) {
            setIsUserameOk(false)
        } else {
            setIsUserameOk(true)
        }

    }, [inputs.username, validUsers])

    // EVENT HANDLERS
    let signin = async (e) => {
        e.preventDefault();
      
        const { name, lastname, username, email, password, password2 } = inputs;
      
        if (password === password2 && password.length >= 5) {
            try {
                await axios.post(`${baseURL}/api/register`, { name, lastname, username, email, password });
                navegar('/login');
            } catch (error) {
                console.error('ERROR REGISTERING:', error);
            }
        }
    };

    return (
        <div className={style.main}>

            <div className={style['left-side']}>

                <div className={style.card}>

                    <div>Bienvenido a Zahir</div>
                    <div>Por favor ingrese sus datos</div>
                    <form onSubmit={isPassOk && isUsernameOk? signin : undefined}>

                        <input required  type='text' onChange={(e)=> setInputs({...inputs, name: e.target.value})}     placeholder={'name'} />
                        <input required  type='text' onChange={(e)=> setInputs({...inputs, lastname: e.target.value})} placeholder={'lastname'} />
                        <input required  type='text' onChange={(e)=> setInputs({...inputs, username: e.target.value})} placeholder={'username'} />
                        <div className={validUsers.includes(inputs.username) && style.invalidUser}></div>

                        <input required  type='email'    onChange={(e)=> setInputs({...inputs, email: e.target.value})}     placeholder={'e-mail'} />
                        <input required  type='password' onChange={(e)=> setInputs({...inputs, password: e.target.value})}  placeholder={'password'} />
                        <input required  type='password' onChange={(e)=> setInputs({...inputs, password2: e.target.value})} placeholder={'repeat password'} />
                        <div className={inputs.password? (inputs.password !== inputs.password2? style.notPass: (inputs.password.length < 5? style.tooShort : '')) : ''}></div>

                        <button type='submit' className="p">Sign in</button>

                    </form>

                </div>

            </div>

            <div className="right-login">
                
            </div>
        </div>
    )
}

export default Register