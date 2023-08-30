import style from '../../styles/userCard.module.css';

export default function TopCardOptions({ mode, onChangeCoverImg }) {
  return (
    <div className={style.options}>
      <div className={style['left-options']}>{''}</div>
      <div
        className={
          mode === 'user'
            ? `${style['middle-options']}`
            : `${style['middle-options']} p`
        }
        onClick={mode === 'user' ? null : onChangeCoverImg}>
        {''}
      </div>
      <div className={style['right-options']}>{''}</div>
    </div>
  );
}
