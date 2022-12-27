import axios from 'axios'
import {useEffect, useState } from 'react'
import '../components/post.css'
import baseURL from '../services/baseURL'

const ImagePost = ({post, mode, user, setUser, mainUser, postF, setSeeOpt})=> {

    console.log("MAINUSER", mainUser)
    console.log("USERRRR", user)

    let [liked, setLiked] = useState(false)
    let [loading, setLoading] = useState(false)

    useEffect(()=> {
        if (post.likes.includes(user.userId)) {//
            setLiked(true)
        } else {
            setLiked(false)
        }
    }, [postF])


    const deletePost = (e)=> {
        e.stopPropagation()
        setLoading(true)
        let user = JSON.parse(window.localStorage.getItem('loggedUser'))
        let token = `Bearer ${user.token}`

        let config = {
            data: {imgkitID: post.imgkitID},
            headers: {
                Authorization: token
            }
        }

        axios.delete(baseURL.concat(`/api/post/${post.id}`), config)
        .then(()=> {
            setLoading(false)
            let loguedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
            // console.log(loguedUser)
            // loguedUser.posts = loguedUser.posts.filter(singlePost => singlePost.id !== post.id)
            loguedUser = {...loguedUser, posts: loguedUser.posts - 1}
            window.localStorage.setItem('loggedUser', JSON.stringify(loguedUser))
            setUser({...user, posts: user.posts - 1})
            
        })
        
    }

    const like = (e)=> {
        e.stopPropagation()
        setLiked(true)
        setLoading(true)
        axios.put(baseURL.concat(`/api/post/${post.id}`), {meId: user.userId, mode: 'like'}) //
        .then(() => {
            setLoading(false)
        })
    }

    const unlike = (e)=> {
        e.stopPropagation()
        setLiked(false)
        setLoading(true)
        axios.put(baseURL.concat(`/api/post/${post.id}`), {meId: user.userId, mode: 'unlike'}) //
        .then(() => {
            setLoading(false)
        })
    }

    const not = (e)=> {
        e.stopPropagation()
        e.preventDefault()
    }

    let postURL = `http://zahir.onrender.com/#/post/${post.id}`

    const clipboard = (e)=> {
        e.stopPropagation()
        navigator.clipboard.writeText(postURL)
    }

    const openComments = (e)=> {
        e.stopPropagation()
        setSeeOpt({type: 'comments', post: post})

    }



    return (
        <div className="post-container figure">
            {mode === 'user'? 
                <div className='post-user-info-image'>
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
                <div onClick={()=>setSeeOpt({type: 'imagePost', post: post})} className={'pointer'}>
                    <div className='post-sub-text'></div>
                    <div className='post-sub-area'>
                        <div>{/*BORRAR ESTO*/}</div> 
                        <div className={'social-icons'}>
                            <span onClick={loading? e=>not(e) : liked? e=>unlike(e) : e=>like(e)} className={liked? 'social-icon social-liked pointer' : 'social-icon social-notliked pointer'}></span>
                            <span className={'social-icon social-comment pointer'} onClick={e=>openComments(e)}></span>
                            <span className={'social-icon social-share pointer'} onClick={e=> clipboard(e)}></span>
                            {(mode !== 'user' && user? user.userId === post.user: "" === post.user)? <span className={'social-icon social-delete pointer'} onClick={loading? e=>not(e): e=>deletePost(e)}></span> : console.log()}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ImagePost