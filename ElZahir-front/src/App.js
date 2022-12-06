// IMPORTS
import {useEffect, useRef, useState } from 'react';
import axios from 'axios'
import Login from './components/Login';
import ProfileMain from './components/ProfileMain'
import ProfileMainOut from './components/ProfileMainOut';
import RegisterMain from './components/RegisterMain'
import PostToShow from './components/PostToShow';
import './components/PostBox.css'
import { Routes, Route,  Navigate } from 'react-router-dom'
import baseURL from './services/baseURL'

function App() {
  // USESTATES ---------------------------------------------------------------
  let [posts, setPosts] = useState([])
  let [moods, setMoods] = useState([])
  
  let [user, setUser] = useState(window.localStorage.getItem('loggedUser')? JSON.parse(window.localStorage.getItem('loggedUser')) : {username:null, loggued:false, userId: null})
  // let [user, setUser] = useState('')

  // console.log("APP STARTS WITH USER:", user.loggued)

  // let loggued = JSON.parse(window.localStorage.getItem('loggedUser'))
  // console.log("LOGGUEDDDDDD", loggued)


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
        let postslist = posts.data.filter(post => post.user === user.userId)
        if (postslist.length !== posts.length) {
          setPosts(postslist.reverse())
        }
      })
  }, [user])


  // RENDER ------------------------------------------------------------------
  return (
    <div className="App">
      <div className='svg'></div>
      <Routes>
        <Route path="/" element={user.loggued === false? <Navigate replace to='/login'/>:<Navigate replace to={`/home`}/>} />

        <Route path="/login" element={user.loggued === false? <Login setUser={setUser} setPosts={setPosts} /> : <Navigate replace to={`/home`}/>}/>
        <Route path='/register' element={<RegisterMain />} />
 
        <Route path={`/home/*`} element={user.loggued===false? <Navigate replace to='/login'/>:<ProfileMain moods={moods} setMoods={setMoods} user={user} setUser={setUser} posts={posts} setPosts={setPosts}/>} /> 

        <Route path={'/user/*'}  element={user.loggued === false? <Navigate replace to='/login'/> : <ProfileMainOut user={user} setUser={setUser} />}/>

        <Route path={`/post/*`} element={<PostToShow />} />
      </Routes>
    </div>
  ) 
}

export default App;
