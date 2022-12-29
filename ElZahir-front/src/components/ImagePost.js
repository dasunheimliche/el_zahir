
import '../components/post.css'
import { Link } from 'react-router-dom'

const ImagePost = ({post, mode, user, setSeeOpt,
    liked, loading,
    deletePost, like, unlike, not, clipboard, openComments})=> {
    

    return (
        <div className="post-container figure">
            {mode === 'user'? 
                <div className='post-user-info-image'>
                    <img className={'post-user-profile-image'} src={post.profileImg} />
                    <Link className='linknostyle' to={`/user/${post.user}`}>
                        <div className='post-user-username'>@{post.username}</div>
                    </Link>
                    <div></div>
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
                            <span onClick={loading? e=>not(e) : liked? e=>unlike(e) : e=>like(e)} className={liked? 'social-icon social-liked pointer' : 'social-icon social-notliked pointer'}></span>
                            <span className={'social-icon social-comment pointer'} onClick={e=>openComments(e)}></span>
                            <span className={'social-icon social-share pointer'} onClick={e=> clipboard(e)}></span>
                            {(mode !== 'user' && user? user.userId === post.user: "" === post.user)? <span className={'social-icon social-delete pointer'} onClick={loading? e=>not(e): e=>deletePost(e)}></span> : console.log()}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ImagePost