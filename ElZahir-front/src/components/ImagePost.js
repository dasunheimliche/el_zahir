
import '../components/post.css'
import { Link } from 'react-router-dom'

import { useSelector} from 'react-redux'


const ImagePost = ({post, mode, setSeeOpt,
    liked, loading,
    p})=> {

    let user = useSelector(state => state.user.value)

    return (
        <div className="post-container figure">
            {mode === 'user'? 
                <div className='post-user-info'>
                    <div className='post-user-profile'>
                        <img className={'post-user-profile-image'} src={post.profileImg} alt="profile img"></img>
                    </div>
                    <Link className='linknostyle' to={`/user/${post.user}`}>
                        <div className='post-user-username'>@{post.username}</div>
                    </Link>
                </div> : console.log()}
            <div className="post-image-content">
                <img className='img' src={post.imagePost} alt="A windmill" />
            </div>
            <div className="post-sub">
                <div className='post-sub-header' >
                    <i>{post.title}</i> {(post.title && post.subtitle)? "-" : console.log()} <b>{post.subtitle}</b>
                </div>
                <div>
                    <div className='post-sub-text'></div>
                    <div className='post-sub-area'>
                        <div className='post-sub-size' onClick={()=>setSeeOpt({type: 'imagePost', post: post})}></div> 
                        <div className={'social-icons'}>
                            <span onClick={loading? e=>p.doNothing(e) : liked? p.dislike : p.like} className={liked? 'social-icon social-liked pointer' : 'social-icon social-notliked pointer'}></span>
                            <span className={'social-icon social-comment pointer'} onClick={p.comments}></span>
                            <span className={'social-icon social-share pointer'} onClick={p.share}></span>
                            {(mode !== 'user' && user? user.userId === post.user: "" === post.user)? <span className={'social-icon social-delete pointer'} onClick={loading? e=>p.doNothing(e): p.del}></span> : console.log()}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ImagePost