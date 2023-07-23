import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import style from '../styles/auth.module.css'

import { useMutation, useQuery } from '@tanstack/react-query'
import { fetchInvalidUsernames, signUp } from '../services/authServices'

const Register = ()=> {

    const [ inputs, setInputs   ] = useState({ name: null, lastname: null, username: null, email: null, password: '', password2: '' })
    const [ loading, setLoading ] = useState(false)

    const navegar = useNavigate()

    const {data: {data: invalidUsernames} = {}} = useQuery({
        queryKey: ["INVALID_USERNAMES"],
        queryFn: ()=>fetchInvalidUsernames()
    })

    const isUsernameOk = !(invalidUsernames?.includes(inputs.username))
    const isPasswordOk = (inputs.password === inputs.password2 || inputs.password.length > 0)

    const {mutate: signUpMutation} = useMutation({
        mutationFn: ()=>signUp(inputs),
        onMutate: ()=>setLoading(true),
        onSuccess: ()=>{
            setLoading(false)
            navegar('/login');
        },
        onError: ()=>setLoading(false)
    }) 

    function signUpHandler (e) {
        e.preventDefault()
        signUpMutation()
    }

    return (
        <div className={style.main}>

            <div className={style['left-side']}>

                <div className={style.card}>

                    <div>Bienvenido a Zahir</div>
                    <div>Por favor ingrese sus datos</div>
                    <form onSubmit={isPasswordOk && isUsernameOk && !loading? signUpHandler : undefined}>

                        <input required  type='text' onChange={(e)=> setInputs({...inputs, name: e.target.value})}     placeholder={'name'} />
                        <input required  type='text' onChange={(e)=> setInputs({...inputs, lastname: e.target.value})} placeholder={'lastname'} />
                        <input required  type='text' onChange={(e)=> setInputs({...inputs, username: e.target.value})} placeholder={'username'} />
                        <div className={!isUsernameOk && style.invalidUser}></div>

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