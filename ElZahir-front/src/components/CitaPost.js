
import '../components/post.css'
import quotes from '../images/quotes.png'
import { Link } from 'react-router-dom'

const CitaPost = ({post, mode, user, setSeeOpt,
    liked, loading,
    deletePost, like, unlike, not, clipboard, openComments})=> {


    return (
        <div className="post-container figure">
            {mode === 'user'? 
                <div className='post-user-info'>
                    <div className='post-user-profile'>
                        <img className={'post-user-profile-image'} src={post.profileImg}></img>
                    </div>
                    <Link className='linknostyle' to={`/user/${post.user}`}>
                        <div className='post-user-username'>@{post.username}</div>
                    </Link>
                </div> : console.log()}
            <div>
                <div className="post-cita-content">
                    <div className='post-text-left'>
                        <img className='post-text-comilla-left' src={quotes}></img>
                    </div>
                
                    <div className='post-cita-text-container'>
                        <div className='post-cita-text'>{post.textPost}</div>
                    </div>
                    <div className='post-text-right'>
                        <img className='post-text-comilla-right' src={quotes}></img>
                    </div>
                </div>
                <div className='post-cita-detail'>
                    <i>{post.title}</i> - <b>{post.subtitle}</b>
                </div>
            </div>

            <div className="post-sub"  >
                <div className='post-sub-text'></div>
                <div className='post-sub-area'>
                    <div className='post-sub-size' onClick={()=>setSeeOpt({type: 'citaPost', post: post})}></div>
                    <div className={'social-icons'}>
                        <span onClick={loading? e=>not(e) : liked? unlike : like} className={liked? 'social-icon social-liked pointer' : 'social-icon social-notliked pointer'}></span>
                        <span className={'social-icon social-comment pointer'} onClick={e=>openComments(e)}></span>
                        <span className={'social-icon social-share pointer'} onClick={e=> clipboard(e)}></span>
                        {(mode !== 'user' && user? user.userId === post.user: "" === post.user)? <span className={'social-icon social-delete pointer'} onClick={loading? e=>not(e): deletePost}></span> : console.log()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CitaPost