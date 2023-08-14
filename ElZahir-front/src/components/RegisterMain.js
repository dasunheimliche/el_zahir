import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'

import { fetchInvalidUsernames, signUp } from '../services/authServices'

import style from '../styles/auth.module.css'

const Register = ()=> {

    const [ inputs, setInputs ] = useState({ 
        name: null, 
        lastname: null, 
        username: null, 
        email: null, 
        password: '', 
        password2: '' 
    })

    const [ loading, setLoading ] = useState(false)

    const navegar = useNavigate()

    const {data: {data: invalidUsernames} = {}} = useQuery({
        queryKey: ["INVALID_USERNAMES"],
        queryFn: ()=>fetchInvalidUsernames()
    })

    const isUsernameInputValid = !(invalidUsernames?.includes(inputs.username))
    const isPasswordShort = inputs.password.length < 5? true : false
    const isPasswordTheSame = inputs.password === inputs.password2? true : false
    const isPasswordInputValid = isPasswordTheSame && !isPasswordShort
    const isInputEmpty = Object.values(inputs).some(value => !value);
    const isSignUpButtonDisabled = !isPasswordInputValid || !isUsernameInputValid || loading || isInputEmpty

    console.log("==========================================")
    console.log("IS USERNAME INVALID ", isUsernameInputValid)
    console.log("IS PASSWORD SHORT ", isPasswordShort)
    console.log("IS PASSWORD SAME ", isPasswordTheSame)
    console.log("IS SOME INPUT EMPTY", isInputEmpty)
    console.log("==========================================")

    const {mutate: signUpMutation} = useMutation({
        mutationFn: ()=>signUp(inputs),
        onMutate: ()=>setLoading(true),
        onSuccess: ()=>{
            setLoading(false)
            navegar('/login');
        },
        onError: ()=>setLoading(false)
    }) 

    const handleInputChange = (fieldName, fieldValue) => {
        setInputs(prevInputs => ({ ...prevInputs, [fieldName]: fieldValue }));
      };

    function handleSignUp (e) {
        e.preventDefault()
        signUpMutation()
    }

    return (
        <div className={style.main}>
            <div className={style.leftSide}>
                <div className={style.authCard}>
                    <div>Bienvenido a Zahir</div>
                    <div>Por favor ingrese sus datos:</div>
                    <form onSubmit={handleSignUp}>
                        <input type='text' onChange={e=>handleInputChange("name", e.target.value)}     placeholder={'name'} required/>
                        <input type='text' onChange={e=>handleInputChange("lastname", e.target.value)} placeholder={'lastname'} required/>
                        <input type='text' onChange={e=>handleInputChange("username", e.target.value)} placeholder={'username'} required/>

                        <div className={!isUsernameInputValid?  style.invalidUser : undefined}></div>

                        <input type='email'    onChange={e=>handleInputChange("email", e.target.value)}     placeholder={'e-mail'} required/>
                        <input type='password' onChange={e=>handleInputChange("password", e.target.value)}  placeholder={'password'} required/>
                        <input type='password' onChange={e=>handleInputChange("password2", e.target.value)} placeholder={'repeat password'} required/>

                        <div className={inputs.password? (isPasswordShort? style.tooShort : (!isPasswordTheSame?  style.notSamePass: undefined)) : undefined}></div>

                        <button type='submit' className="p" disabled={isSignUpButtonDisabled}>Sign in</button>
                    </form>
                </div>
            </div>
            <div className={style.rightSide}>
            </div>
        </div>
    )
}

export default Register