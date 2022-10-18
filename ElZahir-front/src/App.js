// import React from 'react'
import {useEffect, useState } from 'react';
import axios from 'axios'
import Login from './components/Login';
import ProfileMain from './components/ProfileMain'
import RegisterMain from './components/RegisterMain'
import './components/PostBox.css'

import {
  Routes, Route,  Navigate, useNavigate
} from 'react-router-dom'



function App() {
  console.log('APPPP')
  let [username, setUsername] = useState(null)
  let [pass, setPass] = useState(null)
  let [pass2, setPass2] = useState(null)
  let [email, setEmail] = useState(null)
  let [name, setName] = useState(null)
  let [lastname, setLastname] = useState(null)
  let [posts, setPosts] = useState([])

  console.log('APP POSTS', posts)
  
  let [user, setUser] = useState({username: null, loggued:false, userId: null})

  // console.log('1. post hooks - pre use-effect')

  const navegar = useNavigate()


  useEffect(()=> {
    // console.log('AHHHHH AHHH AHHHHH!!!!')
    let loggedUser =  window.localStorage.getItem('loggedUser')
    
    if (loggedUser) {
      const userl = JSON.parse(loggedUser)
      // console.log('VALID USEEFFECT')
      setUser(userl)
      
    } else {
      setUser({username:null, loggued: false})
    }

  }, [])

  useEffect(()=> {
    axios.get('http://localhost:3001/api/post')
      .then(posts => {
        let postslist = posts.data.filter(post => post.user[0] === user.userId)
        if (postslist.length !== posts.length) {
          setPosts(postslist.reverse())
        }
      })
  }, [user])


  // console.log('2. post useEffect')

  let login = (e)=> {
    console.log('LOGIN')
    e.preventDefault()

    axios.post('http://localhost:3001/api/login', {username: username, password:pass})
      .then(user => {
          console.log("LOGIN COMPONENT", user.data)
          setUser({...user.data, loggued: true})
          setPosts([])//////////////
          window.localStorage.setItem('loggedUser', JSON.stringify(user.data))       
      })
  }

  let signin = (e)=> {
    // console.log('SIGNIN')
    e.preventDefault()
    
    if (pass === pass2 && pass.length >= 5) {
      axios.post('http://localhost:3001/api/users', {
        name, lastname, username, email, password:pass
      })

      navegar('/login')
      window.location.reload()
    } else {
      console.log()
    }
  }
  
  let salir = ()=> {
    console.log('LOG OFF')
    window.localStorage.removeItem('loggedUser')
    // setLoggued(false)
    setUser({...user, loggued:false})
    // setPosts([])
  }
  // console.log('3. pre return')
  
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={user.loggued === false? <Login username={(e)=> setUsername(e.target.value)} password={(e)=> setPass(e.target.value)} login={login}/> :<Navigate replace to={`/${user.username}`}/>}/>

        <Route path={`/${user.username}`} element={user.loggued===false? <Navigate replace to='/login'/>:<ProfileMain user={user.username} salir={salir} posts={posts}/>}/>

        <Route path="/" element={user.loggued === false? <Navigate replace to='/login'/>:<Navigate replace to={`/${user.username}`}/>} />
        <Route path='/register' element={<RegisterMain name={(e)=> setName(e.target.value)} lastname={(e)=> setLastname(e.target.value) } username={(e)=> setUsername(e.target.value)} email={(e)=> setEmail(e.target.value)} password={(e)=> setPass(e.target.value)} rpassword={(e)=> setPass2(e.target.value)} signin={signin}/>} />
      </Routes>
    </div>
  ) 
}


export default App;
