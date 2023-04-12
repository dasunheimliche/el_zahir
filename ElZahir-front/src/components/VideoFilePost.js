import { Link } from 'react-router-dom'
import { useSelector} from 'react-redux'
import style from '../styles/post.module.css'

const VideoFilePost = ({post, mode,
    liked, loading, setToFront,
    p, visibility, setVisibility})=> {

    let user = useSelector(state => state.user.value)

    return  (
        <div className={!visibility? `${style.post} ${style.figure} ${style.shadows} ${style['mobile-post']}` : `${style.post} ${style.figure}`}>
            {mode === 'user' &&
                <div className={style.user}>
                    <div className={style['user-profile']}>
                        <img className={style['profile-image']} src={post.profileImg} alt="profile img"></img>
                    </div>
                    <Link className='linknostyle' to={`/user/${post.user}`}>
                        <div>@{post.username}</div>
                    </Link>
                </div>}
                <video muted autoPlay controls loop>
                    <source src={post.videoPost} type="video/webm"/>
                </video>
            <div className={style.footer}>
                <div className={style['footer-header']}>
                    <i>{post.title}</i> {(post.title && post.subtitle)? "-" : ""} <b>{post.subtitle}</b>
                </div>
                <div>
                    <div className={style['footer-middle']}></div>
                    <div className={style['footer-icons']}>
                        <div className={style.open} onClick={visibility? ()=>{setVisibility(false);setToFront(true)} : ()=>{setVisibility(true);setToFront(false)}}></div> 
                        <div className={style['social-icons']}>
                            <span onClick={loading? e=>p.doNothing(e) : liked? p.dislike : p.like} className={liked? `${style.icon} ${style.liked} p` : `${style.icon} ${style.notliked} p`}></span>
                            <span className={`${style.icon} ${style.comment} p`} onClick={p.comments}></span>
                            <span className={`${style.icon} ${style.share} p`} onClick={p.share}></span>
                            {(mode !== 'user' && user? user.userId === post.user: "" === post.user)? <span className={`${style.icon} ${style.delete} p`} onClick={loading? e=>p.doNothing(e): p.del}></span> : console.log()}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default VideoFilePost