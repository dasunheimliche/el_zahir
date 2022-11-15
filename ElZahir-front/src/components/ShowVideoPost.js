import axios from 'axios'
import {useEffect, useState } from 'react'
import '../components/post.css'
import baseURL from '../services/baseURL'

const ShowVideoPost = ({post, mode, mainUser, setUser, postF, onClick})=> {

    let [liked, setLiked] = useState(false)

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

    const idVideo = post.videoPost.replace('https://www.youtube.com/watch?v=',"")
    const urlVideo = `https://www.youtube.com/embed/${idVideo}?playlist=${idVideo}&loop=1`
        
    let aspectr = post.videoAr.split(':')
    let width = Number(aspectr[0])
    let height = Number(aspectr[1])
    let ar = (height/width) * 100

    return (
        <div style={ar >= 100?  (ar >= 170? {width:"23%"}: {width: "32%"}) : {width: "50%"}} className="post-container-videoPost figure-showPost">
            {console.log("3 - VIDEO RENDER STARTS")}
            {console.log("-----------------------")}

            {mode === 'user'? 
                <div className='post-user-info-video'>
                    <div className='post-user-profile'>
                        <img className={'post-user-profile-image'} src={post.profileImg}></img>
                    </div>
                    <div className='post-user-username'>@{post.username}</div>
                </div> : console.log()}
            <div className='dl'>
                {/* <div className="post-image-content"> */}
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


export default ShowVideoPost