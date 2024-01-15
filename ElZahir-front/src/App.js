import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import Login from './components/Login';
import Home from './components/Home';
import OtherUserHome from './components/OtherUserHome';
import RegisterMain from './components/RegisterMain';
import SharedPost from './components/SharedPost';
import Loading from './components/Loading';

import { getConfig } from './services/helpers';
import { getCurrentUser } from './services/userServices';

/** TESTING :DDDDDD */
/** PLEASEEEE */

function App() {
  const navigate = useNavigate();

  const tokenExists = !!getConfig();

  const { data: { data: me } = {}, isFetching } = useQuery({
    queryKey: ['ME'],
    queryFn: getCurrentUser,
    enabled: tokenExists,
  });

  if (isFetching && !me) return <Loading />;

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            !tokenExists ? (
              <Navigate replace to="/login" />
            ) : (
              <Navigate replace to={`/home`} />
            )
          }
        />
        <Route
          path="/login"
          element={
            !tokenExists ? (
              <Login navigate={navigate} />
            ) : (
              <Navigate replace to={`/home`} />
            )
          }
        />
        <Route path="/register" element={<RegisterMain />} />
        <Route
          path={`/home/*`}
          element={!tokenExists ? <Navigate replace to="/login" /> : <Home />}
        />
        <Route
          path={'/user/*'}
          element={
            !tokenExists ? (
              <Navigate replace to="/login" />
            ) : (
              <OtherUserHome me={me} />
            )
          }
        />
        <Route path={`/post/*`} element={<SharedPost />} />
      </Routes>
    </div>
  );
}

export default App;
