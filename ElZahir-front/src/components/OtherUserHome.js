// IMPORTS
import { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import Header from './Header';
import ProfileCard from './ProfileCard';
import Comments from './PopUps/Comments';
import Followers from './PopUps/Followers';
import Following from './PopUps/Following';
import BottomLogo from './BottomLogo';
import PostList from './PostList';

import useElementAtTopOfPage from '../hooks/useElementAtTopOfPage';
import useInnerHeight from '../hooks/userInnerHeight';

import { getUser } from '../services/userServices';
import { fetchUserPosts } from '../services/postServices';
import { scrollToTop } from '../services/helpers';

import style from '../styles/home.module.css';

const OtherUserHome = ({ me }) => {
  const [sticky, setSticky] = useState(false);
  const [popUp, setPopUp] = useState({ type: 'none', post: null });
  const [toFront, setToFront] = useState(false);

  const { '*': userID } = useParams();
  const childRef = useRef(null);
  const parentRef = useRef(null);
  const isAtTop = useElementAtTopOfPage(childRef, parentRef);
  const innerHeight = useInnerHeight();

  const { data: { data: otherUser } = {} } = useQuery({
    queryKey: ['USER', userID],
    queryFn: () => getUser(userID),
  });

  const { data: { data: allposts } = {} } = useQuery({
    queryKey: ['USER_POSTS', userID],
    queryFn: () => fetchUserPosts(userID),
  });

  return (
    <div className={style.main}>
      <div ref={parentRef} className={style['mobile-main']}>
        <div ref={childRef}></div>
        <div
          className={
            popUp.type === 'none'
              ? `${style.popups} ${style.hidden}`
              : popUp.post
              ? style.popups
              : `${style.popups} ${style.open}`
          }>
          {popUp.type === 'comments' && (
            <Comments setPopUp={setPopUp} post={popUp.post} />
          )}
          {popUp.type === 'seeFollowers' && (
            <Followers setPopUp={setPopUp} user={otherUser} />
          )}
          {popUp.type === 'seeFollowings' && (
            <Following setPopUp={setPopUp} user={otherUser} />
          )}
        </div>

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
          {otherUser && (
            <div className={style['left-side']}>
              <ProfileCard
                key={userID}
                user={me}
                otherUser={otherUser}
                sticky={sticky}
                setPopUp={setPopUp}
                mode={'user'}
              />
            </div>
          )}
          <div className={style['right-side']}>
            <div
              className={
                sticky === false
                  ? `${style.grid} ${style.noTab}`
                  : `${style.grid} ${style['sticky-grid']} ${style['other-user-sticky-grid']}`
              }>
              <PostList
                posts={allposts}
                setToFront={setToFront}
                setPopUp={setPopUp}
                mode={'user'}
              />
            </div>
          </div>
        </div>
      </div>
      <BottomLogo
        reference={parentRef}
        toFront={toFront}
        innerHeight={innerHeight}
        isAtTop={isAtTop}
        scrollToTop={scrollToTop}
      />
    </div>
  );
};

export default OtherUserHome;
