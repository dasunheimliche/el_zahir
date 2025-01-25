import style from '../../styles/post.module.css';
import quotes from '../../images/quotes.png';

const SharedQuotePost = ({ post, p }) => {
  return (
    <div
      className={`${style.post} ${style.figure} ${style.shadows} ${style['mobile-post']}`}>
      <div className={style.user}>
        <div className={style['user-profile']}>
          <img
            className={style['profile-image']}
            src={post.profileImg}
            alt="profile img"></img>
        </div>
        <div>@{post.username}</div>
      </div>

      <div>
        <div className={style['quote-post']}>
          <div className={style['left-side']}>
            <img
              className={style['left-comilla']}
              src={quotes}
              alt="quotes"></img>
          </div>

          <div className={style['quote-container']}>
            <div className={style.quote}>{post.textPost}</div>
          </div>
          <div className={style['right-side']}>
            <img
              className={style['right-comilla']}
              src={quotes}
              alt="quotes"></img>
          </div>
        </div>
        <div className={style['quote-detail']}>
          <i>{post.title}</i> - <b>{post.subtitle}</b>
        </div>
      </div>

      <div className={style.footer}>
        <div className={style['footer-middle']}></div>
        <div className={style['footer-icons']}>
          <div></div>
          <div className={style['social-icons']}>
            <span
              onClick={p.doNothing}
              className={`${style.icon} ${style.notliked} p`}></span>
            <span
              className={`${style.icon} ${style.comment} p`}
              onClick={p.doNothing}></span>
            <span
              className={`${style.icon} ${style.share} p`}
              onClick={p.doNothing}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedQuotePost;
