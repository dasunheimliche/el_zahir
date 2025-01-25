import style from '../../styles/comments.module.css';

export default function CommentsCounter({ comments }) {
  return (
    <div className={style.counter}>
      <span className={style.title}>Comments </span>
      <span className={style.count}>{comments?.length}</span>
    </div>
  );
}
