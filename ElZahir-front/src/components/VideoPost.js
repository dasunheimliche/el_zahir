import axios from 'axios'
import {useEffect, useState } from 'react'
import '../components/post.css'
import baseURL from '../services/baseURL'


const VidePost = ({post, mode, user, setUser, mainUser, postF, setSeeOpt})=>{
    let [liked, setLiked] = useState(false)
    let [loading, setLoading] = useState(false)


    useEffect(()=> {
        if (post.likes.includes(user.userId)) { //
            setLiked(true)
        } else {
            setLiked(false)
        }
    }, [postF])


    const deletePost = (e)=> {
        setLoading(true)
        console.log("POSTTTTTT", post)
        let user = JSON.parse(window.localStorage.getItem('loggedUser'))
        let token = `Bearer ${user.token}`

        let config = {
            data: {imgkitID: post.imgkitID},
            headers: {
                Authorization: token
            }
        }

        console.log("TOKEEEEEEN", token)

        axios.delete(baseURL.concat(`/api/post/${post.id}`), config)
        .then(()=> {
            setLoading(false)
            let loguedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
            loguedUser = {...loguedUser, posts: loguedUser.posts - 1}
            window.localStorage.setItem('loggedUser', JSON.stringify(loguedUser))
            setUser({...user, posts: user.posts - 1})
            
        })
        
    }

    const like = ()=> {
        setLiked(true)
        setLoading(true)
        axios.put(baseURL.concat(`/api/post/${post.id}`), {meId: user.userId, mode: 'like'}) //
        .then(() => {
            setLoading(false)
        })
    }

    const unlike = ()=> {
        setLiked(false)
        setLoading(true)
        axios.put(baseURL.concat(`/api/post/${post.id}`), {meId: user.userId, mode: 'unlike'}) //
        .then(() => {
            setLoading(false)
        })
    }

    const not = (e)=> {
        e.preventDefault()
    }

    let postURL = `http://zahir.onrender.com/#/post/${post.id}`

    const clipboard = ()=> {
        navigator.clipboard.writeText(postURL)
    }


    let idVideo
    if (post.videoPost.startsWith("https://www.youtube.com/watch?")) {
        idVideo = post.videoPost.replace('https://www.youtube.com/watch?v=',"")
    } else if (post.videoPost.startsWith("https://youtu.be/")) {
        idVideo = post.videoPost.replace('https://youtu.be/',"")
    }

    const urlVideo = `https://www.youtube.com/embed/${idVideo}?playlist=${idVideo}&loop=1`
        
        
    let aspectr = post.videoAr.split(':')
    let width = Number(aspectr[1])
    let height = Number(aspectr[0])
    let ar = (width/height) * 100

    return (
        <div className="post-container figure">
            {mode === 'user'? 
                <div className='post-user-info-video'>
                    <div className='post-user-profile'>
                        <img className={'post-user-profile-image'} src={post.profileImg}></img>
                    </div>
                    <div className='post-user-username'>@{post.username}</div>
                </div> : console.log()}
            <div className='dl'>
                <div className="video-container" style={{paddingBottom: `${ar? ar: (1080/1920)*100}%`}}>
                    <iframe style={{width: "100%", height:"100%"}} src={urlVideo} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>
            <div className="post-sub" >
                    
                <div className='post-sub-header'>
                    <i>{post.title}</i> {(post.title && post.subtitle)? "-" : console.log()} <b>{post.subtitle}</b>
                </div>
                <div className='post-sub-text'></div>
                <div className='post-sub-area'>
                    <div className='post-sub-size' onClick={()=>setSeeOpt({type: 'videoPost', post: post})}></div>
                    <div className={'social-icons'}>
                        <span onClick={loading? e=>not(e) : liked? unlike : like} className={liked? 'social-icon social-liked pointer' : 'social-icon social-notliked pointer'}></span>
                        <span className={'social-icon social-comment pointer'} onClick={()=>setSeeOpt({type: 'comments', post: post})}></span>
                        <span className={'social-icon social-share pointer'} onClick={clipboard}></span>
                        {(mode !== 'user' && user? user.userId === post.user: "" === post.user)? <span className={'social-icon social-delete pointer'} onClick={loading? e=>not(e): deletePost}></span> : console.log()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VidePost