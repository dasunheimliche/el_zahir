import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Route } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Header from './Header';
import ProfileCard from './ProfileCard';
import PopUps from './PopUps';
import Tabs from './Tabs';
import BottomLogo from './BottomLogo';
import PostsRoutes from './PostsRoutes';
import PostList from './PostList';

import useElementAtTopOfPage from '../hooks/useElementAtTopOfPage';

import { getCurrentUser } from '../services/userServices';
import {
  fetchMyPosts,
  fetchFollowingPosts,
  fecthExplorePosts,
} from '../services/postServices';

import style from '../styles/home.module.css';

const Home = () => {
  const [sticky, setSticky] = useState(false);
  const [popUp, setPopUp] = useState({ type: 'none', post: null });
  const [toFront, setToFront] = useState(false);

  const childRef = useRef(null);
  const parentRef = useRef(null);
  const isAtTop = useElementAtTopOfPage(childRef, parentRef);

  const { data: { data: user } = {} } = useQuery({
    queryKey: ['ME'],
    queryFn: getCurrentUser,
  });
  const { data: { data: myPosts } = {} } = useQuery({
    queryKey: ['userPosts'],
    queryFn: fetchMyPosts,
  });
  const { data: { data: followingPosts } = {} } = useQuery({
    queryKey: ['followedPosts'],
    queryFn: fetchFollowingPosts,
  });
  const { data: { data: discoverPosts } = {} } = useQuery({
    queryKey: ['discoverPosts'],
    queryFn: fecthExplorePosts,
  });

  useEffect(() => {
    axios.get('https://zahir-api.onrender.com/api/register');
  }, []);

  return (
    <div className={style.main}>
      <div ref={parentRef} className={style['mobile-main']}>
        <div ref={childRef}></div>
        <PopUps popUp={popUp} setPopUp={setPopUp} user={user} />
        <Header
          sticky={sticky}
          setSticky={setSticky}
          toFront={toFront}
          mode={'desktop'}
        />
        <div
          className={
            !toFront ? style.content : `${style.content} ${style.toFront}`
          }>
          <div className={style['left-side']}>
            <ProfileCard sticky={sticky} setPopUp={setPopUp} posts={myPosts} />
          </div>
          <div className={style['right-side']}>
            <Tabs sticky={sticky} />
            <PostsRoutes sticky={sticky}>
              <Route
                path="/"
                element={
                  <PostList
                    posts={myPosts}
                    setToFront={setToFront}
                    setPopUp={setPopUp}
                  />
                }
              />
              <Route
                path="/following"
                element={
                  <PostList
                    posts={followingPosts}
                    setToFront={setToFront}
                    setPopUp={setPopUp}
                    mode={'user'}
                  />
                }
              />
              <Route
                path="/discover"
                element={
                  <PostList
                    posts={discoverPosts}
                    setToFront={setToFront}
                    setPopUp={setPopUp}
                    mode={'user'}
                  />
                }
              />
            </PostsRoutes>
          </div>
        </div>
      </div>
      <BottomLogo reference={parentRef} toFront={toFront} isAtTop={isAtTop} />
    </div>
  );
};

export default Home;
