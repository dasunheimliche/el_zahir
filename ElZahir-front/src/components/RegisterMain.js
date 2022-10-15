import React from 'react'
import Samples from './Samples'
import './Login.css'

const Register = React.forwardRef((props,ref)=> {



    


    return (
        <div className="main-login">
            <div className="left-login">
                <div className="card-login">
                    <div className="title-login">Bienvenido a El Zahir</div>
                    <div className="sub-login">Por favor ingrese sus datos</div>
                    <div className="logwgoogle pointer">Log in with google</div>
                    <div className='or-login'>o</div>

                    <form className="login"  onSubmit={props.signin}>
                        <input className='form-login'  type='text' onChange={props.name} placeholder={'name'} />
                        <input className='form-login'  type='text' onChange={props.lastname} placeholder={'lastname'} />
                        <input className='form-login'  type='text' onChange={props.username} placeholder={'username'} />
                        <input className='form-login'  type='email' onChange={props.email} placeholder={'e-mail'} />
                        <input className='form-login'  type='password' onChange={props.password} placeholder={'password'} />
                        <input className='form-login'  type='password' onChange={props.rpassword} placeholder={'repeat password'} />
                        
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
})

export default Register