// IMPORTS
import {useEffect, useState } from 'react';

import Login from './components/Login';
import ProfileMain from './components/ProfileMain'
import ProfileMainOut from './components/ProfileMainOut';
import RegisterMain from './components/RegisterMain'
import PostToShow from './components/PostToShow';
import './components/PostBox.css'
import { Routes, Route,  Navigate } from 'react-router-dom'

import { useSelector, useDispatch} from 'react-redux'
import { userSlice} from './reducers/userSlice'

function App() {
  // USESTATES ---------------------------------------------------------------

  let [user, setUser] = useState(window.localStorage.getItem('loggedUser')? JSON.parse(window.localStorage.getItem('loggedUser')) : {username:null, loggued:false, userId: null})
  
  const user1 = useSelector(state => state.user.value)
  let dispatch =  useDispatch()

  console.log("USER SLICE" , userSlice)
  console.log("STORE USER STATE", user1)

  // dispatch(update({hola: "nada"}))

  console.log("STORE USER STATE", user1)





  // USEFFECTS ----------------------------------------------------------------

  useEffect(()=> {
    // Cada vez que recargo la página, se actualiza el estado 'user' con el localStorate, por lo que...
    // ... cada cambio que deba permanecer durante la sesión, debe guardarse en el localStorage
    let loggedUser =  window.localStorage.getItem('loggedUser')
    
    // Lo siguiente corre solo si existe loggedUser
    if (loggedUser) {
      const userFromLocalStorate = JSON.parse(loggedUser)
      setUser(userFromLocalStorate)
    } 
  }, [])

  // RENDER ------------------------------------------------------------------

  return (
    <div className="App">
      <div className='svg'></div>

      <Routes>
        <Route path="/" element={user.loggued === false? <Navigate replace to='/login'/>:<Navigate replace to={`/home`}/>} />

        <Route path="/login" element={user.loggued === false? <Login setUser={setUser}  /> : <Navigate replace to={`/home`}/>}/>
        <Route path='/register' element={<RegisterMain />} />
 
        <Route path={`/home/*`} element={user.loggued===false? <Navigate replace to='/login'/>:<ProfileMain user={user} setUser={setUser} />} /> 
        <Route path={'/user/*'}  element={user.loggued === false? <Navigate replace to='/login'/> : <ProfileMainOut user={user} setUser={setUser} />}/>
        <Route path={`/post/*`} element={<PostToShow />} />
      </Routes>
    </div>
  ) 
}

export default App;
