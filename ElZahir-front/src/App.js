// IMPORTS
import { useEffect } from 'react';
import { Routes, Route,  Navigate } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { userSlice} from './reducers/userSlice'

// COMPONENTES
import Login from './components/Login';
import ProfileMain from './components/ProfileMain'
import ProfileMainOut from './components/ProfileMainOut';
import RegisterMain from './components/RegisterMain'
import PostToShow from './components/PostToShow';

// CSS
import './components/PostBox.css'

// APP

function App() {
  // STATE ---------------------------------------------------------------
  
  let user = useSelector(state => state.user.value)
  let dispatch =  useDispatch()


  // USEFFECTS ----------------------------------------------------------------

  useEffect(()=> {
    // Cada vez que recargo la página, se actualiza el estado 'user' con el localStorate, por lo que...
    // ... cada cambio que deba permanecer durante la sesión, debe guardarse en el localStorage
    let loggedUser =  window.localStorage.getItem('loggedUser')
    
    // Lo siguiente corre solo si existe loggedUser
    if (loggedUser) {
      const userFromLocalStorate = JSON.parse(loggedUser)
      dispatch(userSlice.actions.update(userFromLocalStorate))
    } 
  }, [dispatch])

  // RENDER ------------------------------------------------------------------


  return (
    <div className="App">
      <div className='svg'></div>

      <Routes>
        <Route path="/" element={user.loggued === false? <Navigate replace to='/login'/>:<Navigate replace to={`/home`}/>} />

        <Route path="/login" element={user.loggued === false? <Login /> : <Navigate replace to={`/home`}/>}/>
        <Route path='/register' element={<RegisterMain />} />
 
        <Route path={`/home/*`} element={user.loggued===false? <Navigate replace to='/login'/>:<ProfileMain />} /> 
        <Route path={'/user/*'}  element={user.loggued === false? <Navigate replace to='/login'/> : <ProfileMainOut />}/>
        <Route path={`/post/*`} element={<PostToShow />} />
      </Routes>
    </div>
  ) 
}

export default App;
