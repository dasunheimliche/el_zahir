// IMPORTS
import { useEffect } from 'react';
import { Routes, Route,  Navigate } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { userSlice} from './reducers/userSlice'

// COMPONENTES
import Login from './components/Login';
import Home from './components/Home'
import OtherUserHome from './components/OtherUserHome';
import RegisterMain from './components/RegisterMain'
import SharedPost from './components/SharedPost';

// APP

function App() {
  // STATE ---------------------------------------------------------------
  
  let user = useSelector(state => state.user.value)
  let dispatch =  useDispatch()


  // USEFFECTS ----------------------------------------------------------------

  useEffect(()=> {
    let loggedUser =  window.localStorage.getItem('loggedUser')
    
    if (loggedUser) {
      const userFromLocalStorate = JSON.parse(loggedUser)
      dispatch(userSlice.actions.update(userFromLocalStorate))
    } 
  }, [dispatch])

  // RENDER ------------------------------------------------------------------


  return (
    <div className="App background">
      <div></div>
      <Routes>
        <Route path="/"          element={user.loggued === false? <Navigate replace to='/login'/>:<Navigate replace to={`/home`}/>} />

        <Route path="/login"     element={user.loggued === false? <Login/> : <Navigate replace to={`/home`}/>}/>
        <Route path='/register'  element={<RegisterMain />} />
 
        <Route path={`/home/*`}  element={user.loggued === false? <Navigate replace to='/login'/>:<Home />} /> 
        <Route path={'/user/*'}  element={user.loggued === false? <Navigate replace to='/login'/> : <OtherUserHome />}/>
        <Route path={`/post/*`}  element={<SharedPost />} />
      </Routes>
    </div>
  ) 
}

export default App;
