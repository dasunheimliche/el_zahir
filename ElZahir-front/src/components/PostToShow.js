import axios from "axios"
import { useEffect, useState } from "react"
import baseURL from '../services/baseURL'

import ShowTextPost from './ShowTextPost'
import ShowCitaPost from './ShowCitaPost'
import ShowImagePost from './showImagePost'
import ShowVideoPost from './ShowVideoPost'

const PostToShow = ()=> {

    let [post, setPost] = useState('')

    let postID = window.location.href.split('/')[5]
    console.log("POST ID", postID)

    useEffect(()=> {
        axios.get(baseURL.concat(`/api/post/${postID}`))
        .then(post => setPost(post.data))
    }, [])

    if (post.type === 'text') {
        return (
            <div className='ShowPostOut'>
                <ShowTextPost post={post} mode={'out'}/>
            </div>
        )
    } else if (post.type === 'cita') {
        return (
            <div className='ShowPostOut'>
                <ShowCitaPost post={post} mode={'out'}/>
            </div>
        )
    } else if (post.type === 'image') {
        return (
            <div className='ShowPostOut'>
                <ShowImagePost post={post} mode={'out'}/>
            </div>
        )
    } else if (post.type === 'video') {
        return (
            <div className='ShowPostOut'>
                <ShowVideoPost post={post} mode={'out'}/>
            </div>
        )
    } 
}

export default PostToShow