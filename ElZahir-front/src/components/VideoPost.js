
import '../components/post.css'
import { Link } from 'react-router-dom'

const VidePost = ({post, mode, user, setSeeOpt,
    liked, loading,
    deletePost, like, unlike, not, clipboard, openComments})=>{

    
    let idVideo
    if (post.videoPost.startsWith("https://www.youtube.com/watch?")) {
        idVideo = post.videoPost.replace('https://www.youtube.com/watch?v=',"")
    } else if (post.videoPost.startsWith("https://youtu.be/")) {
        idVideo = post.videoPost.replace('https://youtu.be/',"")
    }

    const urlVideo = `https://www.youtube.com/embed/${idVideo}?playlist=${idVideo}&loop=1`
        
        
    let aspectr = post.videoAr.split(':')
    let width = Number(aspectr[1])
    let height = Number(aspectr[0])
    let ar = (width/height) * 100


    return (
        <div className="post-container figure">
            {mode === 'user'? 
                <div className='post-user-info-video'>
                    <div className='post-user-profile'>
                        <img className={'post-user-profile-image'} src={post.profileImg}></img>
                    </div>
                    <Link className='linknostyle' to={`/user/${post.user}`}>
                        <div className='post-user-username'>@{post.username}</div>
                    </Link>
                </div> : console.log()}
            <div className='dl'>
                <div className="video-container" style={{paddingBottom: `${ar? ar: (1080/1920)*100}%`}}>
                    <iframe style={{width: "100%", height:"100%"}} src={urlVideo} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>
            <div className="post-sub" >
                    
                <div className='post-sub-header'>
                    <i>{post.title}</i> {(post.title && post.subtitle)? "-" : console.log()} <b>{post.subtitle}</b>
                </div>
                <div className='post-sub-text'></div>
                <div className='post-sub-area'>
                    <div className='post-sub-size' onClick={()=>setSeeOpt({type: 'videoPost', post: post})}></div>
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

export default VidePost