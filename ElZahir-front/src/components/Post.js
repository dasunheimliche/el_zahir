import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams }                             from 'react-router-dom'
import {useState}                                from 'react'

import TextPost      from './Posts/TextPost'
import QuotePost     from './Posts/QuotePost'
import ImagePost     from './Posts/ImagePost'
import VideoPost     from './Posts/VideoPost'
import VideoFilePost from './Posts/VideoFilePost'
import PostWrapper   from './PostWrapper'

import { copyToClipboard } from '../services/helpers'
import { getCurrentUser }  from '../services/userServices'
import { toggleLike }      from '../services/postServices'

const Post = ({post, mode, setPopUp, setToFront})=> {

    const postURL = `${"http://localhost:3000"}/#/post/${post.id}`

    const [loading,    setLoading   ] = useState(false)
    const [visibility, setVisibility] = useState(true)

    const {data: {data: user} = {}} = useQuery({queryKey: ['ME'], queryFn: getCurrentUser})

    const client = useQueryClient()
    const {"*": param} = useParams()

    const [liked, setLiked] = useState(post.likes.some(id => id === user.id))

    const {mutate: toggleLikeHandler} = useMutation({
        mutationFn: toggleLike,
        onMutate: ()=> {
            setLoading(true)
            if (liked) setLiked(false)
            if (!liked) setLiked(true)
        },
        onSuccess: ()=> {
            setLoading(false)
            if (param === "") {
                client.invalidateQueries({queryKey: ["userPosts"]})
            }
            if (param === "following") {
                client.invalidateQueries({queryKey: ["followedPosts"]})
            }
            if (param === "discover") {
                client.invalidateQueries({queryKey: ["discoverPosts"]})
            }
        },
        onError: ()=> {
            setLiked((prev)=>!prev)
        }
    })

    const deletePost = async () => {
        setPopUp({type: 'delete', post: post})
    };

    const openComments = ()=> {
        setPopUp({type: 'comments', post: post})

    }

    const p = {
        toggleLike: ()=>toggleLikeHandler({post, user}),
        openComments,
        sharePostURL: ()=>copyToClipboard(postURL),
        deletePost
    }

    
    if (post.type === "image") {
        return(
            <PostWrapper post={post} visibility={visibility}>
                <ImagePost
                    post={post} mode={mode} setPopUp={setPopUp}
                    loading={loading} liked={liked} setToFront={setToFront}
                    p={p} setVisibility={setVisibility} visibility={visibility}
                />
            </PostWrapper>
        )
    }

    if (post.type === "text") {
        return (
            <PostWrapper post={post} visibility={visibility}>
                <TextPost
                    post={post} mode={mode} setPopUp={setPopUp}
                    loading={loading} liked={liked} setToFront={setToFront}
                    p={p} visibility={visibility} setVisibility={setVisibility}
                />
            </PostWrapper>

        )
    }
    if (post.type === "cita") {
        return(
            <PostWrapper post={post} visibility={visibility}>
                <QuotePost
                    post={post} mode={mode} setPopUp={setPopUp}
                    loading={loading} liked={liked} setToFront={setToFront}
                    p={p} visibility={visibility} setVisibility={setVisibility}
                />
            </PostWrapper>
        )
    }
    if (post.type === "video") {
        return(
            <PostWrapper post={post} visibility={visibility}>
                <VideoPost 
                    post={post} mode={mode} setPopUp={setPopUp} 
                    loading={loading} liked={liked} setToFront={setToFront}
                    p={p} visibility={visibility} setVisibility={setVisibility}
                />
            </PostWrapper>
        )
    }
    if (post.type === "video-file") {
        return (
            <PostWrapper post={post} visibility={visibility}>
                <VideoFilePost
                    post={post} mode={mode} setPopUp={setPopUp}
                    loading={loading} liked={liked} setToFront={setToFront}
                    p={p} setVisibility={setVisibility} visibility={visibility}
                />
            </PostWrapper>
        )
    }
}

export default Post