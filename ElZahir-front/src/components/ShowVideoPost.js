
import '../components/post.css'
import { Link } from 'react-router-dom'

const ShowVideoPost = ({post, mode, setSeeOpt})=> {

    let idVideo
        if (post.videoPost.startsWith("https://www.youtube.com/watch?")) {
            idVideo = post.videoPost.replace('https://www.youtube.com/watch?v=',"")
        } else if (post.videoPost.startsWith("https://youtu.be/")) {
            idVideo = post.videoPost.replace('https://youtu.be/',"")
        }
        
    const urlVideo = `https://www.youtube.com/embed/${idVideo}?playlist=${idVideo}&loop=1`
        
    let aspectr = post.videoAr.split(':')
    let width = Number(aspectr[0])
    let height = Number(aspectr[1])
    let ar = (height/width) * 100

    return (
            <div id='post-container-videoPost' style={ar >= 100?  (ar >= 170? {width:"23%"}: {width: "32%"}) : {width: "50%"}} className="post-container-videoPost figure-showPost">
                {mode === 'out' && <div className="logo logo-out">Zahir</div>}
                {mode === 'user' || mode === 'out'?
                    <div className='post-user-info-video'>
                        <div className='post-user-profile'>
                            <img className={'post-user-profile-image'} src={post.profileImg}></img>
                        </div>

                        <div className='post-user-username'>@{post.username}</div>

                    </div> : console.log()}
                <div className='dl'>
                    <div className="video-container" style={{paddingBottom: `${ar? ar: (1080/1920)*100}%`}}>
                        <iframe style={{width: "100%", height:"100%"}} src={urlVideo} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                </div>
                <div className="post-sub">
            
                    <div className='post-sub-header'>
                        <i>{post.title}</i> {(post.title && post.subtitle)? "-" : console.log()} <b>{post.subtitle}</b>
                    </div>
                    <div className='post-sub-text'></div>
                    <div className='post-sub-area'>
                        {mode !== 'out' && <div className='post-sub-size' onClick={()=>setSeeOpt({type: 'none', post: null})}></div> }
                        <div className={'social-icons'}>
                        </div>
                    </div>
                </div>
            </div>
    )    
}


export default ShowVideoPost