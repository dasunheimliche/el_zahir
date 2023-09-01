import style from '../../styles/comments.module.css';

export default function CommentsHeader({ onCloseComments }) {
  return (
    <div className={style.header}>
      <div className={style.close} onClick={onCloseComments} />
    </div>
  );
}
