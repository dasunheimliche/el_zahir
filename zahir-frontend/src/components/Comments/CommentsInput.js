import style from '../../styles/comments.module.css';

export default function CommentInput({
  userInput,
  isMutating,
  placeholder,
  onSubmitComment,
  onCancelComment,
  onTyping,
}) {
  return (
    <form className={style['input-container']} onSubmit={onSubmitComment}>
      <div className={style.testear}>
        {(placeholder || userInput !== '') && (
          <div
            className={
              placeholder || userInput !== ''
                ? style.cancel
                : `${style.cancel} ${style['cancel-off']}`
            }
            onClick={onCancelComment}></div>
        )}

        <input
          className={
            placeholder || userInput !== ''
              ? style.input
              : `${style.input} ${style['input-off']}`
          }
          value={userInput}
          type={'text'}
          placeholder={placeholder === '' ? 'comenta algo...' : placeholder}
          onChange={onTyping}
        />
      </div>
      <button className={style.send} disabled={isMutating}>
        SEND
      </button>
    </form>
  );
}
