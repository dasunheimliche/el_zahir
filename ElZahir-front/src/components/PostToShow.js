import axios from "axios"
import { useEffect, useState } from "react"
import baseURL from '../services/baseURL'

import ShowTextPost from '../components/ShowTextPostOut'
import ShowCitaPost from '../components/ShowCitaPostOut'
import ShowImagePost from '../components/showImagePostOut'
import ShowVideoPost from '../components/ShowVideoPostOut'

const PostToShow = ()=> {

    let [post, setPost] = useState('')

    let postID = window.location.href.split('/')[5]
    // console.log(postID)

    useEffect(()=> {
        axios.get(baseURL.concat(`/api/post/${postID}`))
        .then(post => setPost(post.data))
    }, [])

    if (post.type === 'text') {
        return (
            <ShowTextPost post={post} />
        )
    } else if (post.type === 'cita') {
        return (
            <ShowCitaPost post={post} />
        )
    } else if (post.type === 'image') {
        return (
            <ShowImagePost post={post} />
        )
    } else if (post.type === 'video') {
        return (
            <ShowVideoPost post={post} />
        )
    } 

    
}

export default PostToShow