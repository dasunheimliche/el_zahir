
import axios from 'axios'
import {useEffect, useState } from 'react'
import '../components/post.css'
import quotes from '../images/quotes.png'
import baseURL from '../services/baseURL'


const Post = ({post, type, mode, user, setUser, mainUser, postF, onClick})=> {
    // console.log(`1 - POST STARTS WITH POST:`, post)
    // console.log(`1 - POST STARTS WITH MAINUSER:`, mainUser.username, mainUser.userId)

    // console.log("1.1 - post.likes.includes(mainUser.userId", post.likes.includes(mainUser.userId))
    let [liked, setLiked] = useState(false)
    let [loading, setLoading] = useState(false)
    // console.log("1.9 - post.likes.includes(mainUser.userId", post.likes.includes(mainUser.userId))

    // console.log(`2 - WITH POST LIKES: ${post.likes} ${typeof post.likes[0]} AND MAIN USER ID: ${mainUser.userId} ${typeof(mainUser.userId)} POST LIKED? = ${liked}`)

    // const image = new image()
    // image.src = post.imagePost

    // image.onload = function() {
    //     alert(this.width + 'x' + this.height);
    //   }


    useEffect(()=> {
        // console.log("USE EFFECT STARTS")
        if (post.likes.includes(mainUser.userId)) {
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
        // console.log("LIKE POST ID:", post.id)
        setLiked(true)
        setLoading(true)
        axios.put(baseURL.concat(`/api/post/${post.id}`), {meId: mainUser.userId, mode: 'like'})
        .then(() => {
            setLoading(false)
        })
    }

    const unlike = ()=> {
        // console.log("UNLIKE POST ID", post.id)
        setLiked(false)
        setLoading(true)
        axios.put(baseURL.concat(`/api/post/${post.id}`), {meId: mainUser.userId, mode: 'unlike'})
        .then(() => {
            setLoading(false)
        })
    }

    const not = (e)=> {
        e.preventDefault()
    }

    // let postURL = `http://localhost:3000/#/post/${post.id}`
    let postURL = `http://zahir.onrender.com/#/post/${post.id}`

    const clipboard = ()=> {
        navigator.clipboard.writeText(postURL)
    }


    if (type === "image") {
        return (
            <div className="post-container figure">
                {/* <div className='post-screen'></div> */}
                {/* {console.log("3 - IMAGE RENDER STARTS")}
                {console.log("-----------------------")} */}
                {mode === 'user'? 
                    <div className='post-user-info-image'>
                        
                        {/* <img className={'post-user-profile-image'} src={profileImg}></img> */}
                        <img className={'post-user-profile-image'} src={post.profileImg} />
                   
                        <div className='post-user-username'>@{post.username}</div>
                        <div></div>
                    </div> : console.log()}
                <div className="post-image-content">
                    <img className='img' src={post.imagePost} alt="A windmill" />
                </div>
                <div className="post-sub">
                    <div className='post-sub-header' >
                        <i>{post.title}</i> {(post.title && post.subtitle)? "-" : console.log()} <b>{post.subtitle}</b>
                    </div>
                    <div className='post-sub-text' ></div>
                    <div className='post-sub-area'>
                        <div className='post-sub-size' onClick={()=>onClick({type: 'imagePost', post: post})}></div>
                        <div className={'social-icons'}>
                            <span onClick={loading? e=>not(e) : liked? unlike : like} className={liked? 'social-icon social-liked pointer' : 'social-icon social-notliked pointer'}></span>
                            <span className={'social-icon social-comment pointer'} onClick={()=>onClick({type: 'comments', post: post})}></span>
                            <span className={'social-icon social-share pointer'} onClick={clipboard}></span>
                            {(mode !== 'user' && user? user.userId === post.user: "" === post.user)? <span className={'social-icon social-delete pointer'} onClick={loading? e=>not(e): deletePost}></span> : console.log()}
                        </div>
                    </div>
  
                </div>
            </div>
        )
    }
    if (type === "text") {
        return (
            <div className="post-container figure">
                {/* {console.log("3 - TEXT RENDER STARTS")}
                {console.log("-----------------------")} */}

                {mode === 'user'? 
                    <div className='post-user-info'>
                        <div className='post-user-profile'>
                            <img className={'post-user-profile-image'} src={post.profileImg}></img>
                        </div>
                        <div className='post-user-username'>@{post.username}</div>
                    </div> : console.log()}
                <div className="post-text-content">
                    <div className='post-text-title'>{post.title}</div>
                    <div className='post-text-text'>{post.textPost}</div>
                </div>
                <div className="post-sub">
                    <div className='post-sub-text'></div>
                    <div className='post-sub-area'>
                        <div className='post-sub-size' onClick={()=>onClick({type: 'textPost', post: post})}></div>
                        <div className={'social-icons'}>
                            <span onClick={loading? e=>not(e) : liked? unlike : like} className={liked? 'social-icon social-liked pointer' : 'social-icon social-notliked pointer'}></span>
                            <span className={'social-icon social-comment pointer'} onClick={()=>onClick({type: 'comments', post: post})}></span>
                            <span className={'social-icon social-share pointer'} onClick={clipboard}></span>
                            {(mode !== 'user' && user? user.userId === post.user: "" === post.user)? <span className={'social-icon social-delete pointer'} onClick={loading? e=>not(e): deletePost}></span> : console.log()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    if (type === "cita") {
        return (
            <div className="post-container figure">
                {/* {console.log("3 - CITA RENDER STARTS")}
                {console.log("-----------------------")} */}

                {mode === 'user'? 
                    <div className='post-user-info'>
                        <div className='post-user-profile'>
                            <img className={'post-user-profile-image'} src={post.profileImg}></img>
                        </div>
                        <div className='post-user-username'>@{post.username}</div>
                    </div> : console.log()}
                <div>
                    <div className="post-cita-content">
                        <div className='post-text-left'>
                            <img className='post-text-comilla-left' src={quotes}></img>
                        </div>
                    
                        <div className='post-cita-text-container'>
                            <div className='post-cita-text'>{post.textPost}</div>
                        </div>
                        <div className='post-text-right'>
                            <img className='post-text-comilla-right' src={quotes}></img>
                        </div>
                    </div>
                    <div className='post-cita-detail'>
                        <i>{post.title}</i> - <b>{post.subtitle}</b>
                    </div>
                </div>

                <div className="post-sub"  >
                    <div className='post-sub-text'></div>
                    <div className='post-sub-area'>
                        <div className='post-sub-size' onClick={()=>onClick({type: 'citaPost', post: post})}></div>
                        <div className={'social-icons'}>
                            <span onClick={loading? e=>not(e) : liked? unlike : like} className={liked? 'social-icon social-liked pointer' : 'social-icon social-notliked pointer'}></span>
                            <span className={'social-icon social-comment pointer'} onClick={()=>onClick({type: 'comments', post: post})}></span>
                            <span className={'social-icon social-share pointer'} onClick={clipboard}></span>
                            {(mode !== 'user' && user? user.userId === post.user: "" === post.user)? <span className={'social-icon social-delete pointer'} onClick={loading? e=>not(e): deletePost}></span> : console.log()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    if (type === "video") {

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
                {/* {console.log("3 - VIDEO RENDER STARTS")}
                {console.log("-----------------------")} */}

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
                <div className="post-sub" >
                    
                    <div className='post-sub-header'>
                        <i>{post.title}</i> {(post.title && post.subtitle)? "-" : console.log()} <b>{post.subtitle}</b>
                    </div>
                    <div className='post-sub-text'></div>
                    <div className='post-sub-area'>
                        <div className='post-sub-size' onClick={()=>onClick({type: 'videoPost', post: post})}></div>
                        <div className={'social-icons'}>
                            <span onClick={loading? e=>not(e) : liked? unlike : like} className={liked? 'social-icon social-liked pointer' : 'social-icon social-notliked pointer'}></span>
                            <span className={'social-icon social-comment pointer'} onClick={()=>onClick({type: 'comments', post: post})}></span>
                            <span className={'social-icon social-share pointer'} onClick={clipboard}></span>
                            {(mode !== 'user' && user? user.userId === post.user: "" === post.user)? <span className={'social-icon social-delete pointer'} onClick={loading? e=>not(e): deletePost}></span> : console.log()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Post