import {useState, useEffect} from 'react'
import { useParams }         from 'react-router-dom'
import { useQuery }          from '@tanstack/react-query'

import SharedTextPost      from './Posts/SharedTextPost'
import SharedQuotePost     from './Posts/SharedQuotePost'
import SharedImagePost     from './Posts/SharedImagePost'
import SharedVideoPost     from './Posts/SharedVideoPost'
import SharedVideoFilePost from './Posts/SharedVideoFilePost'

import { doNothing }                       from '../services/helpers'
import { fetchPost }                       from '../services/postServices'
import { LOCAL_URL_POST, VERCEL_URL_POST } from '../services/constants'

import style from '../styles/post.module.css'

const postURL = LOCAL_URL_POST || VERCEL_URL_POST

const SharedPost = ()=> {

    const { "*": postID } = useParams()

    const {data: {data: post} = {}} = useQuery({
        queryKey: ["POST", postID],
        queryFn: ()=>fetchPost(postID)
    })

    const URL = `http://${postURL}/${post?.id}`

    const size = {width: post?.mediaWidth, height: post?.mediaHeight}
    const [ancho, setAncho] = useState((size.width/size.height)*window.innerHeight)

    const handleResize = () => {
        setAncho((size.width / size.height) * (window.innerHeight - 200));
    };

    const aspectRatioString = post?.type === "video" && post?.videoAr.split(':')
    const aspectRatioNumber = post?.type === "video" && (Number(aspectRatioString[1])/Number(aspectRatioString[0])) * 100

    const sharePost = ()=> {
        navigator.clipboard.writeText(URL)
    }

    const p = {
        share: sharePost,
        doNothing,
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        window.addEventListener('load', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('load', handleResize);
        };
    }, [size.width, size.height]); //eslint-disable-line

 
    if (post?.type === "text") {
        return (
            <div className={style.fullscreenBackground}>
                <div className={`${style['mobile-container']} ${style.resizeHandler}`}>
                    <div className="logo post-logo">Zahir.</div>
                    <SharedTextPost post={post} p={p}/>
                </div>
            </div>
        )
    }
    if (post?.type === "cita") {
        return(
            <div className={style.fullscreenBackground}>
                <div className={`${style['mobile-container']} ${style.resizeHandler}`}>
                    <div className="logo post-logo">Zahir.</div>
                    <SharedQuotePost post={post} p={p}/>
                </div>
            </div>
        )
    }

    if (post?.type === "image") {
        return (
            <div className={style.fullscreenBackground}>
                <div className={style['mobile-image-container']} style={(size.height > (window.innerHeight - 150))? {width: `${ancho}px`, maxWidth: '90vw'} : {}}>
                    <div className="logo post-logo">Zahir.</div>
                    <SharedImagePost post={post}  p={p}/>
                </div>
            </div>
        )
    }

    if (post?.type === "video") {
        return(
            <div className={style.fullscreenBackground}>
                <div className={style['mobile-container']} style={aspectRatioNumber >= 100?  (aspectRatioNumber >= 170? {width:"23%"}: {width: "32%"}) : {width: "50%"} }>
                    <div className="logo post-logo">Zahir.</div>
                    <SharedVideoPost post={post} p={p}/>
                </div>
            </div>
        )
    }
    if (post?.type === "video-file") {
        return (
            <div className={style.fullscreenBackground}>
                <div className={style['mobile-container']} style={{maxWidth: '50vw', maxHeight: '90vh'} }>
                    <div className="logo post-logo">Zahir.</div>
                    <SharedVideoFilePost post={post} p={p}/>
                </div>
            </div>
        )
    }
}

export default SharedPost