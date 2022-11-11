// IMPORTS
import {useEffect, useRef, useState } from 'react';
import axios from 'axios'
import Login from './components/Login';
import ProfileMain from './components/ProfileMain'
import RegisterMain from './components/RegisterMain'
import './components/PostBox.css'
import { Routes, Route,  Navigate } from 'react-router-dom'
import baseURL from './services/baseURL'

function App() {
  // USESTATES ---------------------------------------------------------------
  let [posts, setPosts] = useState([])
  
  let [user, setUser] = useState({username: window.localStorage.getItem('loggedUser')? JSON.parse(window.localStorage.getItem('loggedUser')).username : null , loggued:false, userId: null})
  // let [user, setUser] = useState('')

  // USEFFECTS ----------------------------------------------------------------
  useEffect(()=> {
    // Cada vez que recargo la página, se actualiza el estado 'user' con el localStorate, por lo que...
    // ... cada cambio que deba permanecer durante la sesión, debe guardarse en el localStorage
    let loggedUser =  window.localStorage.getItem('loggedUser')
    
    if (loggedUser) {
      const userl = JSON.parse(loggedUser)
      setUser(userl)
      
    } 
  }, [])


  useEffect(()=> {

    setPosts([])
    axios.get(baseURL.concat('/api/post'))
      .then(posts => {
        let postslist = posts.data.filter(post => post.user[0] === user.userId)
        if (postslist.length !== posts.length) {
          setPosts(postslist.reverse())
        }
      })
  }, [user])


  // RENDER ------------------------------------------------------------------
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={user.loggued === false? <Navigate replace to='/login'/>:<Navigate replace to={`/${user.username}`}/>} />

        <Route path="/login" element={user.loggued === false? <Login setUser={setUser} setPosts={setPosts} /> : <Navigate replace to={`/${user.username}`}/>}/>
        <Route path='/register' element={<RegisterMain />} />

        <Route path={`/${user.username}/*`} element={user.loggued===false? <Navigate replace to='/login'/>:<ProfileMain user={user} setUser={setUser} posts={posts} setPosts={setPosts}/>}/>
      </Routes>
    </div>
  ) 
}

export default App;
