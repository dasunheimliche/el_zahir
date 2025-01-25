import style from '../../styles/userCard.module.css';

export default function FollowStatus({
  mode,
  isUserFollowed,
  isMutating,
  onToggleFollow,
}) {
  return (
    <div
      className={
        mode === 'user'
          ? `${style.separator} ${style['mobile-separator']}`
          : style.separator
      }>
      {mode === 'user' && (
        <button
          className={
            isUserFollowed
              ? `${style.followed} ${style.unfollow} p`
              : `${style.notFollowed} p`
          }
          onClick={onToggleFollow}
          disabled={isMutating}>
          {isUserFollowed ? 'Followed' : 'Follow'}
        </button>
      )}
    </div>
  );
}
