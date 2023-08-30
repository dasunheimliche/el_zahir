import React, { useState, useRef } from 'react';

import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';

import Header from './Header';
import ProfileCard from './ProfileCard';
import PopUps from './PopUps';
import Tabs from './Tabs';
import BottomLogo from './BottomLogo';
import PostList from './PostList';

import useMyUserData from '../hooks/useMyUserData';
import useGetMyPosts from '../hooks/useGetMyPosts';
import useGetFollowingPosts from '../hooks/useGetFollowingPosts';
import useGetDiscoveryPosts from '../hooks/useGetDiscoveryPosts';
import useWakeUpOnrenderServer from '../hooks/useWakeUpOnrenderServer';
import useElementAtTopOfPage from '../hooks/useElementAtTopOfPage';

import style from '../styles/home.module.css';

export default function Home() {
  const [sticky, setSticky] = useState(false);
  const [popUp, setPopUp] = useState({ type: 'none', post: null });
  const [toFront, setToFront] = useState(false);

  const user = useMyUserData();
  const myPosts = useGetMyPosts();
  const followingPosts = useGetFollowingPosts();
  const discoverPosts = useGetDiscoveryPosts();

  useWakeUpOnrenderServer();

  return (
    <HomeWrapper toFront={toFront}>
      <PopUps popUp={popUp} setPopUp={setPopUp} user={user} />
      <Header
        sticky={sticky}
        setSticky={setSticky}
        toFront={toFront}
        mode={'desktop'}
      />
      <Main>
        <LeftSide>
          <ProfileCard sticky={sticky} setPopUp={setPopUp} posts={myPosts} />
        </LeftSide>
        <RightSide>
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
        </RightSide>
      </Main>
    </HomeWrapper>
  );
}

//** CONTAINERS

function HomeWrapper({ children, toFront }) {
  const childRef = useRef(null);
  const parentRef = useRef(null);

  const isAtTop = useElementAtTopOfPage(childRef, parentRef);

  return (
    <div className={style.main}>
      <div ref={parentRef} className={style['mobile-main']}>
        <div ref={childRef}></div>
        {children}
      </div>
      <BottomLogo reference={parentRef} toFront={toFront} isAtTop={isAtTop} />
    </div>
  );
}

function Main({ children, toFront }) {
  return (
    <div
      className={
        !toFront ? style.content : `${style.content} ${style.toFront}`
      }>
      {children}
    </div>
  );
}

function LeftSide({ children }) {
  return <div className={style['left-side']}>{children}</div>;
}

function RightSide({ children }) {
  return <div className={style['right-side']}>{children}</div>;
}

function PostsRoutes({ children, sticky }) {
  return (
    <div
      className={
        sticky === false ? style.grid : `${style.grid} ${style['sticky-grid']}`
      }>
      <Routes>{children}</Routes>
    </div>
  );
}
