import style from '../../styles/post.module.css'
import { doNothing } from '../../services/helpers';

const PostFooter = ({loading, p, liked, user, post, mode, visibility, setVisibility, setToFront})=> {

    return(
        <div className={style.footer}>
            <div>
                <div className={style['footer-middle']}></div>
                <div className={style['footer-icons']}>
                    <div className={style.open} onClick={visibility? ()=>{setVisibility(false); setToFront(true)} : ()=>{setVisibility(true);setToFront(false)}}></div> 
                    <div className={style['social-icons']}>
                        <span onClick={loading? doNothing : p.toggleLike} className={liked? `${style.icon} ${style.liked} p` : `${style.icon} ${style.notliked} p`}></span>
                        <span className={`${style.icon} ${style.comment} p`} onClick={p.openComments}></span>
                        <span className={`${style.icon} ${style.share} p`} onClick={p.sharePostURL}></span>
                        {(mode !== 'user' && user? user.id === post.user: "" === post.user)? <span className={`${style.icon} ${style.delete} p`} onClick={loading? doNothing: p.deletePost}></span> : console.log()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostFooter