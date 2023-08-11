
import { useEffect, useState } from 'react'

import style from '../styles/post.module.css'

const PostWrapper = ({children, post, visibility})=>{

    const size = {width: post.mediaWidth, height: post.mediaHeight}

    const [ancho, setAncho] = useState((size.width/size.height) * window.innerHeight)

    const aspectRatioString = post.type === "video" && post.videoAr?.split(':')
    const aspectRatioNumber = post.type === "video" && (Number(aspectRatioString[1])/Number(aspectRatioString[0])) * 100

    const handleResize = () => {
        setAncho((size.width / size.height) * (window.innerHeight - 200));
    };

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize);
        window.addEventListener('load', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('load', handleResize);
        };
    }, []); //eslint-disable-line

    if (post.type === "image") {
        return(
            <div className={visibility? {} : style.container}>
                <div id={!visibility && style['mobile-image-container']} style={(size.height > (window.innerHeight - 150) && !visibility)? {width: `${ancho}px`, maxWidth: '90vw'} : {}}>
                    {!visibility && <div className="logo post-logo">Zahir.</div>}
                    {children}
                </div>
            </div>
        )
    }

    if (post.type === "text" || post.type === "cita") {
        return(
            <div className={visibility? {} : style.container}>
                <div id={!visibility && style['mobile-container']} style={!visibility? {width: "30%"} : {}}>
                    {!visibility && <div className="logo post-logo">Zahir.</div>}
                    {children}
                </div>
            </div>
        )
    }

    if (post.type === "video") {
        return(
            <div className={visibility? {} : style.container}>
                <div id={!visibility && style['mobile-container']} style={!visibility?  aspectRatioNumber >= 100?  (aspectRatioNumber >= 170? {width:"23%"}: {width: "32%"}) : {width: "50%"} : {}}>
                    {!visibility && <div className="logo post-logo">Zahir.</div>}
                    {children}
                </div>
            </div>
        )
    }

    if (post.type === "video-file") {
        return (
            <div className={visibility? {} : style.container}>
                <div id={!visibility && style['mobile-container']} style={!visibility? {maxWidth: '50vw', maxHeight: '90vh'} : {}}>
                    {!visibility && <div className="logo post-logo">Zahir.</div>}
                    {children}
                </div>
            </div>
        )
    }
}

export default PostWrapper