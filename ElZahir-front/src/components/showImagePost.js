import axios from 'axios'
import {useEffect, useState } from 'react'
import '../components/post.css'
import baseURL from '../services/baseURL'

const ShowImagePost = ({post, mode, mainUser, postF, onClick})=> {

    let [liked, setLiked] = useState(false)
    let [size, setSize] = useState({width: 0, height: 0})
    let [ancho, setAncho] = useState((size.width/size.height)*window.innerHeight)

    window.addEventListener('resize', function() {
        console.log("INNER WIDHT, INNER HEIGHT", window.innerWidth, window.innerHeight)
        setAncho((size.width/size.height)*(window.innerHeight - 200))
    });

    window.addEventListener('load', function() {
        console.log("INNER WIDHT, INNER HEIGHT", window.innerWidth, window.innerHeight)
        setAncho((size.width/size.height)*(window.innerHeight - 200))
    });

    ancho = ((size.width/size.height)*(window.innerHeight - 200))

    console.log("ANCHOOOO", ancho)

    const img = new Image();


    useEffect(()=> {
        img.addEventListener("load", function() {
            console.log("USE EFFECT", this.naturalWidth +' '+ this.naturalHeight )
            setSize({width: this.naturalWidth, height: this.naturalHeight})
        })
        img.src = post.imagePost

    },[])


    useEffect(()=> {
        console.log("USE EFFECT STARTS")
        if (post.likes.includes(mainUser.userId)) {
            setLiked(true)
        } else {
            setLiked(false)
        }
    }, [postF])


    const like = ()=> {
        console.log("LIKE POST ID:", post.id)
        setLiked(true)
        axios.put(baseURL.concat(`/api/post/${post.id}`), {meId: mainUser.userId, mode: 'like'})
    }

    const unlike = ()=> {
        console.log("UNLIKE POST ID", post.id)
        setLiked(false)
        axios.put(baseURL.concat(`/api/post/${post.id}`), {meId: mainUser.userId, mode: 'unlike'})
    }

    return (

            <div style={size.height > (window.innerHeight - 150)? {width: `${ancho}px`, maxWidth: '90%'} : console.log()} className= {size.width !==0? "post-container-imagePost figure-showPost" : ''}>
                {/* <div className='post-screen'></div> */}
                {/* {console.log("3 - IMAGE RENDER STARTS")}
                {console.log("-----------------------")} */}
                {mode === 'user'?
                    <div className='post-user-info-image'>
                        <div className='post-user-profile'>
                            {/* <img className={'post-user-profile-image'} src={profileImg}></img> */}
                            <img className={'post-user-profile-image'} src={post.profileImg} />
                        </div>
                        <div className='post-user-username'>@{post.username}</div>
                        <div></div>
                    </div> : console.log()}
                <div className="post-image-content-show">
                    <img className='img' src={post.imagePost} alt="A windmill" />
                </div>
                <div className="post-sub">
                    <div className='post-sub-header' >
                        <i>{post.title}</i> {(post.title && post.subtitle)? "-" : console.log()} <b>{post.subtitle}</b>
                    </div>
                    <div className='post-sub-text'></div>
                    <div className='post-sub-area'>
                        <div className='post-sub-size' onClick={()=>onClick({type: 'none', post: null})}></div>
                        <div className={'social-icons'}>
                            {/* <span onClick={liked? unlike : like} className={liked? 'social-icon social-liked pointer' : 'social-icon social-notliked pointer'}></span>
                            <span className={'social-icon social-comment pointer'}></span>
                            <span className={'social-icon social-share pointer'}></span> */}
                        </div>
                    </div>
                </div>
            </div>
    )
}


export default ShowImagePost