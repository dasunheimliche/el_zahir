

import SharedTextPost from './Posts/SharedTextPost'
import SharedQuotePost from './Posts/SharedQuotePost'
import SharedImagePost from './Posts/SharedImagePost'
import SharedVideoPost from './Posts/SharedVideoPost'
import SharedVideoFilePost from './Posts/SharedVideoFilePost'

import {useState, useEffect} from 'react'
import axios from 'axios'
import style from '../styles/post.module.css'
import baseURL from '../services/baseURL'

import { useNavigate, useParams } from 'react-router-dom'

const SharedPost = ()=> {

    let [post, setPost] = useState('')

    // let postURL = `http://zahir.onrender.com/#/post/${post.id}`
    let postURL = `http://localhost:3000/#/post/${post.id}`

    const navigate = useNavigate() // eslint-disable-line
    const { "*": postID } = useParams()

    useEffect(()=> {
        axios.get(baseURL.concat(`/api/post/${postID}`))
        .then(post => setPost(post.data))
    }, []) // eslint-disable-line

    // IMAGE POST
    let [size, setSize] = useState({width: 0, height: 0})
    let [ancho, setAncho] = useState((size.width/size.height)*window.innerHeight)

    const handleResize = () => {
        setAncho((size.width / size.height) * (window.innerHeight - 200));
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        window.addEventListener('load', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('load', handleResize);
        };
    }, [size.width, size.height]); //eslint-disable-line

    useEffect(() => {
        const img = new Image();
        img.addEventListener('load', function () {
          setSize({ width: this.naturalWidth, height: this.naturalHeight });
        });
        img.src = post.imagePost;
      }, [post.imagePost]);

    // VIDEO POST

    let aspectr
    let width
    let height
    let ar

    if (post.type === "video") {
        aspectr = post.videoAr.split(':')
        width = Number(aspectr[1])
        height = Number(aspectr[0])
        ar = (width/height) * 100
    }

    const doNothing = (e)=> {
        e.preventDefault()
    }

    const clipboard = ()=> {
        navigator.clipboard.writeText(postURL)
    }

    const p = {
        share: clipboard,
        doNothing,
    }

    
    if (post.type === "image") {
        return (
            <div className={style.container}>
                <div id={style['mobile-container']} style={{width: `${ancho}px`, maxWidth: '90vw'}}>
                    <div className="logo post-logo">Zahir.</div>
                    <SharedImagePost
                        post={post}  
                        p={p}
                    />
                </div>
            </div>

        )
    }

    if (post.type === "text") {
        return (
            <div className={style.container}>
                <div id={style['mobile-container']} style={{width: "30%"}}>
                    <div className="logo post-logo">Zahir.</div>
                    <SharedTextPost
                        post={post}
                        p={p}
                    />
                </div>
            </div>
        )
    }
    if (post.type === "cita") {
        return(
            <div className={style.container}>
                <div id={style['mobile-container']} style={{width: "30%"}}>
                    <div className="logo post-logo">Zahir.</div>
                    <SharedQuotePost
                        post={post}
                        p={p}
                    />
                </div>
            </div>
        )
    }
    if (post.type === "video") {
        return(
            <div className={style.container}>
                <div id={style['mobile-container']} style={ar >= 100?  (ar >= 170? {width:"23%"}: {width: "32%"}) : {width: "50%"} }>
                    <div className="logo post-logo">Zahir.</div>
                    <SharedVideoPost 
                        post={post}  
                        p={p}
                    />
                </div>
            </div>
        )
    }
    if (post.type === "video-file") {
        return (
            <div className={style.container}>
                <div id={style['mobile-container']} style={{maxWidth: '50vw', maxHeight: '90vh'} }>
                    <div className="logo post-logo">Zahir.</div>
                    <SharedVideoFilePost
                        post={post}
                        p={p}
                    />
                </div>
            </div>

        )
    }
}

export default SharedPost