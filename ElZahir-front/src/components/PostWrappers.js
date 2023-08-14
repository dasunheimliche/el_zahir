import { useEffect, useState } from 'react'
import { Suspense } from 'react'
import Loading from './Loading'

import style from '../styles/post.module.css'


function PostWrapper ({children, isFullscreen}) {

    return(
        <div className={isFullscreen? `${style.post} ${style.figure} ${style.shadows} ${style['mobile-post']}` : `${style.post} ${style.figure}`}>
            {children}
        </div>
    )
}

function FullscreenPostBackground ({children, isFullscreen}) {

    return(
        <Suspense fallback={<Loading />}>
            <div className={isFullscreen? style.fullscreenBackground : undefined}>
                {children}
            </div>
        </Suspense>
    )
}

export function TextPostWrapper ({children, isFullscreen}) {
    return(
        <FullscreenPostBackground isFullscreen={isFullscreen}>
                <div className={isFullscreen? `${style['mobile-container']} ${style.resizeHandler}` : undefined}>
                    {isFullscreen && <div className="logo post-logo">Zahir.</div>}
                    <PostWrapper isFullscreen={isFullscreen}>
                        {children}
                    </PostWrapper>
                </div>
        </FullscreenPostBackground>
    )
}

export function QuotePostWrapper ({children, isFullscreen}) {
    return(
        <FullscreenPostBackground isFullscreen={isFullscreen}>
                <div className={isFullscreen? `${style['mobile-container']} ${style.resizeHandler}` : undefined}>
                    {isFullscreen && <div className="logo post-logo">Zahir.</div>}
                    <PostWrapper isFullscreen={isFullscreen}>
                        {children}
                    </PostWrapper>
                </div>
        </FullscreenPostBackground>
    )
}

export function ImagePostWrapper ({children, post, isFullscreen}) {

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
        <FullscreenPostBackground isFullscreen={isFullscreen}>
                <div className={isFullscreen? style['mobile-image-container'] : undefined} style={(size.height > (window.innerHeight - 150) && isFullscreen)? {width: `${ancho}px`, maxWidth: '90vw'} : undefined}>
                    {isFullscreen && <div className="logo post-logo">Zahir.</div>}
                    <PostWrapper isFullscreen={isFullscreen}>
                        {children}
                    </PostWrapper>
                </div>
        </FullscreenPostBackground>
    )
}

export function VideoPostWrapper ({children, post, isFullscreen}) {

    const aspectRatioString = post.type === "video" && post.videoAr?.split(':')
    const aspectRatioNumber = post.type === "video" && (Number(aspectRatioString[1])/Number(aspectRatioString[0])) * 100

    return(
        <FullscreenPostBackground isFullscreen={isFullscreen}>
                <div className={isFullscreen? style['mobile-container'] : undefined} style={isFullscreen?  aspectRatioNumber >= 100?  (aspectRatioNumber >= 170? {width:"23%"}: {width: "32%"}) : {width: "50%"} : {}}>
                    {isFullscreen && <div className="logo post-logo">Zahir.</div>}
                    <PostWrapper isFullscreen={isFullscreen}>
                        {children}
                    </PostWrapper>
                </div>
        </FullscreenPostBackground>
    )
}

export function VideoFilePostWrapper ({children, isFullscreen}) {
    return (
        <FullscreenPostBackground isFullscreen={isFullscreen}>
                <div className={isFullscreen? `${style['mobile-container']} ${style.videoFileResizeHandler}` : undefined} >
                    {isFullscreen && <div className="logo post-logo">Zahir.</div>}
                    <PostWrapper isFullscreen={isFullscreen}>
                        {children}
                    </PostWrapper>
                </div>
        </FullscreenPostBackground>
    )
}