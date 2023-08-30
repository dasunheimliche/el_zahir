import style from '../../styles/userCard.module.css';

export default function ProfileImg({
  mode,
  otherUser,
  user,
  onChangeProfileImg,
}) {
  return (
    <div
      style={{
        backgroundImage: `url(${
          mode === 'user' ? otherUser.profileImg : user.profileImg
        })`,
      }}
      className={mode === 'user' ? style.profile : `${style.profile} p`}
      onClick={mode === 'user' ? null : onChangeProfileImg}>
      <div className={style.username}>
        @{mode === 'user' ? otherUser.username : user.username}
      </div>
    </div>
  );
}
