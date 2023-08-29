import style from '../../styles/post.module.css';

const PostFooter = ({
  isMutating,
  isPostLiked,
  isPostMine,
  onDeletePost,
  onSharingPost,
  onOpenComments,
  onToggleLike,
  onToggleFullscrenMode,
}) => {
  return (
    <div className={style.footer}>
      <div className={style['footer-middle']}></div>
      <div className={style['footer-icons']}>
        <button className={style.open} onClick={onToggleFullscrenMode} />
        <div className={style['social-icons']}>
          <button
            onClick={onToggleLike}
            className={
              isPostLiked
                ? `${style.icon} ${style.liked} p`
                : `${style.icon} ${style.notliked} p`
            }
            disabled={isMutating}
          />
          <button
            className={`${style.icon} ${style.comment} p`}
            onClick={onOpenComments}
          />
          <button
            className={`${style.icon} ${style.share} p`}
            onClick={onSharingPost}
          />
          {isPostMine && (
            <button
              className={`${style.icon} ${style.delete} p`}
              onClick={onDeletePost}
              disabled={isMutating}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostFooter;
