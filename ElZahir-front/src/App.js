// import React from 'react'
import {useState } from 'react';
import axios from 'axios'
import Login from './components/Login';
import ProfileMain from './components/ProfileMain'
import RegisterMain from './components/RegisterMain'

import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate, Navigate
} from 'react-router-dom'


function App() {
  let [username, setUsername] = useState(null)
  let [pass, setPass] = useState(null)

  let [user, setUser] = useState(null)
  
  let login = (e)=> {
    e.preventDefault()
    axios.post('http://localhost:3001/api/login', {username: username, password:pass})
        .then(user => {
            console.log("LOGIN COMPONENT", user.data)
            setUser(user.data)          
        })
}
  

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={user === null? <Login username={(e)=> setUsername(e.target.value)} password={(e)=> setPass(e.target.value)} login={login}/> :<Navigate replace to={`/${user.username}`}/>}/>
        <Route path={user !== null?`/${user.username}`:'/login'} element={user===null? <div></div>:<ProfileMain user={user.username} />}/>
        <Route path="/" element={user === null? <Navigate replace to='/login'/>:<Navigate replace to={`/${user.username}`}/>} />
        <Route path='/register' element={<RegisterMain />} />
      </Routes>
    </div>
  ) 
}

export default App;
