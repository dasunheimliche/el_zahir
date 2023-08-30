import style from '../../styles/userCard.module.css';

export default function PostingOptions({
  showPostOptions,
  onTogglePostOptionsMenu,
  onOpenTextPostMenu,
  onOpenQuotePostMenu,
  onOpenImagePostMenu,
  onOpenVideoPostMenu,
}) {
  return (
    <div className={style.postbox}>
      <button
        className={showPostOptions ? `${style.hide} p` : `${style.open} p`}
        onClick={onTogglePostOptionsMenu}></button>
      <div
        className={
          showPostOptions ? `${style.buttons} ${style.visible}` : style.buttons
        }>
        <button
          className={
            showPostOptions
              ? `${style['post-text']}  ${style.seeButton} p`
              : `${style['post-text']} p`
          }
          onClick={onOpenTextPostMenu}
        />
        <button
          className={
            showPostOptions
              ? `${style['post-quote']} ${style.seeButton} p`
              : `${style['post-quote']} p`
          }
          onClick={onOpenQuotePostMenu}></button>
        <button
          className={
            showPostOptions
              ? `${style['post-image']} ${style.seeButton} p`
              : `${style['post-image']} p`
          }
          onClick={onOpenImagePostMenu}></button>
        <button
          className={
            showPostOptions
              ? `${style['post-video']} ${style.seeButton} p`
              : `${style['post-video']} p`
          }
          onClick={onOpenVideoPostMenu}></button>
      </div>
    </div>
  );
}
