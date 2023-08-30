import style from '../../styles/userCard.module.css';

export default function FollowStats({
  mode,
  otherUser,
  posts,
  user,
  onShowFollowers,
  onShowFollowing,
}) {
  return (
    <div className={style.stats}>
      <div className={style.stat}>
        <span className={style['stat-title']}>Followers</span>
        <span className="p" onClick={onShowFollowers}>
          {mode === 'user'
            ? String(otherUser.followers.length)
            : String(user.followers.length)}
        </span>
      </div>

      <div className={style.stat}>
        <span className={style['stat-title']}>Following</span>
        <span className="p" onClick={onShowFollowing}>
          {mode === 'user'
            ? String(otherUser.following.length)
            : String(user.following.length)}
        </span>
      </div>

      <div className={style.stat}>
        <span className={style['stat-title']}>Posts</span>
        <span>
          {mode === 'user'
            ? otherUser
              ? String(otherUser.posts.length)
              : '0'
            : posts
            ? String(user.posts.length)
            : '0'}
        </span>
      </div>
    </div>
  );
}
