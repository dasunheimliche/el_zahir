import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { followUser, unfollowUser } from '../services/userServices';

import Header from './Header';

import TopCardOptions from './ProfileCard/TopCardOptions';
import ProfileImg from './ProfileCard/ProfileImg';
import FollowStatus from './ProfileCard/FollowStatus';
import FollowStats from './ProfileCard/FollowStats';
import PostingOptions from './ProfileCard/PostingOptions';

import useMyUserData from '../hooks/useMyUserData';

import style from '../styles/userCard.module.css';

export default function ProfileCard({
  otherUser,
  posts,
  sticky,
  setPopUp,
  mode,
}) {
  const [showPostOptions, setShowPostOptions] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const client = useQueryClient();

  const user = useMyUserData();

  const isMine = !(mode === 'user');
  const isUserFollowed = otherUser && user.following.includes(otherUser.id);

  const { mutate: followUserHandler } = useMutation({
    mutationFn: () => followUser(user, otherUser),
    onMutate: () => setIsMutating(true),
    onSuccess: () => {
      client.setQueryData(['ME'], (old) => {
        const copy = { ...old };
        copy.data.following = copy.data.following.concat(otherUser.id);
        return copy;
      });
      setIsMutating(false);
    },
  });

  const { mutate: unfollowUserHandler } = useMutation({
    mutationFn: () => unfollowUser(user, otherUser),
    onMutate: () => setIsMutating(true),
    onSuccess: () => {
      client.setQueryData(['ME'], (old) => {
        const copy = { ...old };
        copy.data.following = copy.data.following.filter(
          (id) => id !== otherUser.id
        );
        return copy;
      });
      setIsMutating(false);
    },
  });

  function handleToggleFollow() {
    if (isUserFollowed) {
      unfollowUserHandler();
    } else {
      followUserHandler();
    }
  }

  function handleShowChangeProfileImgMenu() {
    setPopUp({ type: 'changePI', post: null });
  }

  function handleShowChangeProfileCoverMenu() {
    setPopUp({ type: 'changePanImg', post: null });
  }

  return (
    <ProfileCardWrapper sticky={sticky}>
      <TopCard mode={mode} user={user} otherUser={otherUser}>
        <Header sticky={sticky} mode={'mobile'} />
        <TopCardOptions
          mode={mode}
          onChangeCoverImg={handleShowChangeProfileCoverMenu}
        />
      </TopCard>
      <BottomCard isMine={isMine}>
        <ProfileImg
          mode={mode}
          user={user}
          otherUser={otherUser}
          onChangeProfileImg={handleShowChangeProfileImgMenu}
        />
        <FollowStatus
          mode={mode}
          isUserFollowed={isUserFollowed}
          isMutating={isMutating}
          onToggleFollow={handleToggleFollow}
        />
        <FollowStats
          mode={mode}
          user={user}
          otherUser={otherUser}
          posts={posts}
          onShowFollowers={() => setPopUp({ type: 'seeFollowers', post: null })}
          onShowFollowing={() =>
            setPopUp({ type: 'seeFollowings', post: null })
          }
        />
        {mode !== 'user' && (
          <PostingOptions
            showPostOptions={showPostOptions}
            onTogglePostOptionsMenu={() => setShowPostOptions(!showPostOptions)}
            onOpenTextPostMenu={() => setPopUp({ type: 'text', post: null })}
            onOpenQuotePostMenu={() => setPopUp({ type: 'cita', post: null })}
            onOpenImagePostMenu={() => setPopUp({ type: 'image', post: null })}
            onOpenVideoPostMenu={() => setPopUp({ type: 'video', post: null })}
          />
        )}
      </BottomCard>
    </ProfileCardWrapper>
  );
}

//** CONTAINER

function ProfileCardWrapper({ children, sticky }) {
  return (
    <div
      className={
        sticky === false
          ? style.userCard
          : `${style.userCard} ${style['sticky-userCard']}`
      }>
      {children}
    </div>
  );
}

function TopCard({ children, mode, user, otherUser }) {
  return (
    <div
      className={style.top}
      style={{
        backgroundImage: `url(${
          mode === 'user' ? otherUser.mainPanelImg : user.mainPanelImg
        })`,
      }}>
      {children}
    </div>
  );
}

function BottomCard({ children, isMine }) {
  return (
    <div
      className={
        isMine ? style.bottom : ` ${style.bottom} ${style.userBottom}`
      }>
      {children}
    </div>
  );
}
