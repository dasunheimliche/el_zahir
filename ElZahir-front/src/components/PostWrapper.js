

import style from '../styles/post.module.css'


const PostWrapper = ({children, post, ar, size, ancho, visibility})=>{

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
                <div id={!visibility && style['mobile-container']} style={!visibility?  ar >= 100?  (ar >= 170? {width:"23%"}: {width: "32%"}) : {width: "50%"} : {}}>
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