import style from '../../styles/post.module.css'
import quotes from '../../images/quotes.png'

const PostContent = ({post, ar, defaultAr, urlVideo})=> {

    if (post.type === 'text') {
        return(
            <div className={style['text-post']}>
                <div className={style['text-title']}>{post.title}</div>
                <div className={style['text-content']}>{post.textPost}</div>
            </div>
        )
    }

    if (post.type === 'cita') {
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

    if (post.type === 'image') return <img className={style.img} src={post.imagePost} alt="post" />

    if (post.type === 'video') {
        return(
            <div className={style['video-post']}>
                <div className={style['video-container']} style={{paddingBottom: `${ar? ar : defaultAr}%`}}>
                    <iframe title='youtube video post' style={{width: "100%", height:"100%"}} src={urlVideo} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>
        )
    }

    if (post.type === 'video-file') {
        return(
            <video muted autoPlay controls loop>
                <source src={post.videoPost} type="video/webm"/>
            </video>
        )
    }
}

export default PostContent