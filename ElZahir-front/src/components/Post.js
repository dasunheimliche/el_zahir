
import '../components/post.css'

import TextPost from '../components/TextPost'
import CitaPost from '../components/CitaPost'
import ImagePost from '../components/ImagePost'
import VideoPost from '../components/VideoPost'

import {useState, useEffect} from 'react'
import axios from 'axios'
import '../components/post.css'
import baseURL from '../services/baseURL'

import { useSelector, useDispatch} from 'react-redux'
import { userSlice} from '../reducers/userSlice'

const Post = ({post, mode, postF, setSeeOpt})=> {

    let [liked, setLiked] = useState(false)
    let [loading, setLoading] = useState(false)

    let user = useSelector(state => state.user.value)
    let dispatch = useDispatch()

    let postURL = `http://zahir.onrender.com/#/post/${post.id}`
    // let postURL = `http://localhost:3000/#/post/${post.id}`

    useEffect(()=> {
        if (post.likes && post.likes.includes(user.userId)) { //
            setLiked(true)
        } else {
            setLiked(false)
        }
    }, [postF])


    const deletePost = ()=> {
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
            
            dispatch(userSlice.actions.update({...loguedUser}))

            
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

    const clipboard = ()=> {
        navigator.clipboard.writeText(postURL)
    }

    const openComments = ()=> {
        setSeeOpt({type: 'comments', post: post})

    }

    const p = {
        like: like,
        dislike: unlike,
        comments: openComments,
        share: clipboard,
        del: deletePost,
        doNothing: not,
    }

    
    if (post.type === "image") {
        return (

            <ImagePost
                post={post} mode={mode} setSeeOpt={setSeeOpt}
                loading={loading} liked={liked}
                p={p}
            />

        )
    }
    if (post.type === "text") {
        return (
            <TextPost 
                post={post} mode={mode} postF={postF} setSeeOpt={setSeeOpt} 
                loading={loading} liked={liked}
                p={p}
            />
        )
    }
    if (post.type === "cita") {
        return(
            <CitaPost 
                post={post} mode={mode} postF={postF} setSeeOpt={setSeeOpt} 
                loading={loading} liked={liked}
                p={p}
            />
        )
    }
    if (post.type === "video") {
        return(
            <VideoPost 
                post={post} mode={mode} postF={postF} setSeeOpt={setSeeOpt} 
                loading={loading} liked={liked}
                p={p}
            />
        )
    }
}

export default Post