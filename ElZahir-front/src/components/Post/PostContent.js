import style from '../../styles/post.module.css'
import quotes from '../../images/quotes.png'

function TextPostContent({post}) {

    return(
        <div className={style['text-post']}>
            <div className={style['text-title']}>{post.title}</div>
            <div className={style['text-content']}>{post.textPost}</div>
        </div>
    )
}

function QuotePostContent({post}) {

    return(
        <div>
            <div className={style['quote-post']}>
                <div className={style['left-side']}>
                    <img className={style['left-comilla']} src={quotes} alt="quotes"></img>
                </div>
                
                <div className={style['quote-container']}>
                    <div className={style.quote}>{post.textPost}</div>
                </div>

                <div className={style['right-side']}>
                    <img className={style['right-comilla']} src={quotes} alt="quotes"></img>
                </div>
            </div>
            <div className={style['quote-detail']}>
                <i>{post.title}</i> - <b>{post.subtitle}</b>
            </div>
        </div>
    )
}

function ImagePostContent ({post}) {

    return <img className={style.img} src={post.imagePost} alt="post" />
}

function VideoPostContent ({aspectRatio, videoUrl}) {

    const defaultAspectRatio = (9/16) * 100

    return(
        <div className={style['video-post']}>
            <div className={style['video-container']} style={{paddingBottom: `${aspectRatio? aspectRatio : defaultAspectRatio}%`}}>
                <iframe title='youtube video post' style={{width: "100%", height:"100%"}} src={videoUrl} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
        </div>
    )
}

function VideFilePostContent ({post}) {
    return(
        <video muted autoPlay controls loop>
            <source src={post.videoPost} type="video/webm"/>
        </video>
    )
}

const PostContent = ({post, aspectRatio, urlVideo})=> {

    if (post.type === 'text') return <TextPostContent post={post}/>

    if (post.type === 'cita') return <QuotePostContent post={post} />

    if (post.type === 'image') return <ImagePostContent post={post} />

    if (post.type === 'video') return <VideoPostContent aspectRatio={aspectRatio} videoUrl={urlVideo}/>

    if (post.type === 'video-file') return <VideFilePostContent post={post} />

}

export default PostContent