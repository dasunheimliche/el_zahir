import style from '../../styles/comments.module.css';

export default function Comment({
  comment,
  user,
  post,
  isMutating,
  onAnswerComment,
  onDeleteComment,
}) {
  return (
    <>
      <div className={style['comment-username']}>@{comment.username}</div>
      <div className={style['comment-content']}>{comment.comment}</div>
      <div className={style['comment-socials']}>
        <div className="p" onClick={onAnswerComment}>
          Answer
        </div>
        {comment.username === user.username ||
        post.username === user.username ? (
          <div className="p" onClick={isMutating ? undefined : onDeleteComment}>
            Delete
          </div>
        ) : (
          console.log
        )}
      </div>
    </>
  );
}
