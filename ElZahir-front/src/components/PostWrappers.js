import { useEffect, useState } from 'react'

import style from '../styles/post.module.css'


function PostWrapper ({children, visibility}) {

    return(
        <div className={!visibility? `${style.post} ${style.figure} ${style.shadows} ${style['mobile-post']}` : `${style.post} ${style.figure}`}>
            {children}
        </div>
    )
}

export function TextPostWrapper ({children, visibility}) {
    return(
        <div className={visibility? {} : style.container}>
            <div id={!visibility && style['mobile-container']} style={!visibility? {width: "30%"} : {}}>
                {!visibility && <div className="logo post-logo">Zahir.</div>}
                <PostWrapper visibility={visibility}>
                    {children}
                </PostWrapper>
            </div>
        </div>
    )
}

export function QuotePostWrapper ({children, visibility}) {
    return(
        <div className={visibility? {} : style.container}>
            <div id={!visibility && style['mobile-container']} style={!visibility? {width: "30%"} : {}}>
                {!visibility && <div className="logo post-logo">Zahir.</div>}
                <PostWrapper visibility={visibility}>
                    {children}
                </PostWrapper>
            </div>
        </div>
    )
}

export function ImagePostWrapper ({children, post, visibility}) {

    const size = {width: post.mediaWidth, height: post.mediaHeight}

    const [ancho, setAncho] = useState((size.width/size.height) * window.innerHeight)

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

    return(
        <div className={visibility? {} : style.container}>
            <div id={!visibility && style['mobile-image-container']} style={(size.height > (window.innerHeight - 150) && !visibility)? {width: `${ancho}px`, maxWidth: '90vw'} : {}}>
                {!visibility && <div className="logo post-logo">Zahir.</div>}
                <PostWrapper visibility={visibility}>
                    {children}
                </PostWrapper>
            </div>
        </div>
    )
}

export function VideoPostWrapper ({children, post, visibility}) {

    const aspectRatioString = post.type === "video" && post.videoAr?.split(':')
    const aspectRatioNumber = post.type === "video" && (Number(aspectRatioString[1])/Number(aspectRatioString[0])) * 100

    return(
        <div className={visibility? {} : style.container}>
            <div id={!visibility && style['mobile-container']} style={!visibility?  aspectRatioNumber >= 100?  (aspectRatioNumber >= 170? {width:"23%"}: {width: "32%"}) : {width: "50%"} : {}}>
                {!visibility && <div className="logo post-logo">Zahir.</div>}
                <PostWrapper visibility={visibility}>
                    {children}
                </PostWrapper>
            </div>
        </div>
    )
}

export function VideoFilePostWrapper ({children, visibility}) {
    return (
        <div className={visibility? {} : style.container}>
            <div id={!visibility && style['mobile-container']} style={!visibility? {maxWidth: '50vw', maxHeight: '90vh'} : {}}>
                {!visibility && <div className="logo post-logo">Zahir.</div>}
                <PostWrapper visibility={visibility}>
                    {children}
                </PostWrapper>
            </div>
        </div>
    )
}