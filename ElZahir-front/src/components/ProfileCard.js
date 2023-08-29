import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  followUser,
  unfollowUser,
  getCurrentUser,
} from '../services/userServices';

import Header from './Header';
import {
  FollowStats,
  FollowStatus,
  PostingOptions,
  ProfileImg,
  TopCardOptions,
} from './ProfileCardModule';

import style from '../styles/userCard.module.css';

const ProfileCard = ({ otherUser, posts, sticky, setPopUp, mode }) => {
  const { data: { data: user } = {} } = useQuery({
    queryKey: ['ME'],
    queryFn: getCurrentUser,
  });

  const [showPostOptions, setShowPostOptions] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const isMine = !(mode === 'user');

  const client = useQueryClient();

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
    <div
      className={
        sticky === false
          ? style.userCard
          : `${style.userCard} ${style['sticky-userCard']}`
      }>
      <div
        className={style.top}
        style={{
          backgroundImage: `url(${
            mode === 'user' ? otherUser.mainPanelImg : user.mainPanelImg
          })`,
        }}>
        <Header sticky={sticky} mode={'mobile'} />
        <TopCardOptions
          mode={mode}
          onChangeCoverImg={handleShowChangeProfileCoverMenu}
        />
      </div>

      <div
        className={
          isMine ? style.bottom : ` ${style.bottom} ${style.userBottom}`
        }>
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
      </div>
    </div>
  );
};

export default ProfileCard;
