
import '../components/post.css'

import TextPost from '../components/TextPost'
import CitaPost from '../components/CitaPost'
import ImagePost from '../components/ImagePost'
import VideoPost from '../components/VideoPost'

import {useState, useEffect} from 'react'
import axios from 'axios'
import '../components/post.css'
import baseURL from '../services/baseURL'

const Post = ({post, mode, user, setUser, postF, setSeeOpt})=> {

    let [liked, setLiked] = useState(false)
    let [loading, setLoading] = useState(false)

    let postURL = `http://zahir.onrender.com/#/post/${post.id}`
    // let postURL = `http://localhost:3000/#/post/${post.id}`

    useEffect(()=> {
        if (post.likes && post.likes.includes(user.userId)) { //
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
            let updatedPostList = loguedUser.posts.filter(singlePost => singlePost !== post.id)
            loguedUser.posts = updatedPostList

            window.localStorage.setItem('loggedUser', JSON.stringify(loguedUser))
            
            setUser({...loguedUser})

            
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

    const clipboard = (e)=> {
        e.stopPropagation()
        navigator.clipboard.writeText(postURL)
    }

    const openComments = (e)=> {
        e.stopPropagation()
        setSeeOpt({type: 'comments', post: post})

    }

    
    if (post.type === "image") {
        return (
            <ImagePost 
                post={post} mode={mode} user={user} setSeeOpt={setSeeOpt} 
                loading={loading} liked={liked}
                deletePost={deletePost} like={like} unlike={unlike} not={not} clipboard={clipboard} openComments={openComments}
            />
        )
    }
    if (post.type === "text") {
        return (
            <TextPost 
                post={post} mode={mode} user={user} setUser={setUser} postF={postF} setSeeOpt={setSeeOpt} 
                loading={loading} liked={liked}
                deletePost={deletePost} like={like} unlike={unlike} not={not} clipboard={clipboard} openComments={openComments}
            />
        )
    }
    if (post.type === "cita") {
        return(
            <CitaPost 
                post={post} mode={mode} user={user} setUser={setUser} postF={postF} setSeeOpt={setSeeOpt} 
                loading={loading} liked={liked}
                deletePost={deletePost} like={like} unlike={unlike} not={not} clipboard={clipboard} openComments={openComments}
            />
        )
    }
    if (post.type === "video") {
        return(
            <VideoPost 
                post={post} mode={mode} user={user} setUser={setUser} postF={postF} setSeeOpt={setSeeOpt} 
                loading={loading} liked={liked}
                deletePost={deletePost} like={like} unlike={unlike} not={not} clipboard={clipboard} openComments={openComments}
            />
        )
    }
}

export default Post