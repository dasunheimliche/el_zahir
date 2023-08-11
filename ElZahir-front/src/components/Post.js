import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams }                             from 'react-router-dom'
import {useState}                                from 'react'

import PostHeader  from '../components/Post/PostHeader'
import PostContent from './Post/PostContent'
import PostFooter  from './Post/PostFooter'
import PostTitle   from './Post/PostTitle'

import { copyToClipboard } from '../services/helpers'
import { getCurrentUser }  from '../services/userServices'
import { toggleLike }      from '../services/postServices'
import { ImagePostWrapper, QuotePostWrapper, TextPostWrapper, VideoFilePostWrapper, VideoPostWrapper } from './PostWrappers'

const Post = ({post, mode, setPopUp, setToFront})=> {

    const {data: {data: user} = {}} = useQuery({queryKey: ['ME'], queryFn: getCurrentUser})

    const [isMutating, setIsMutating ] = useState(false)
    const [visibility, setVisibility ] = useState(true)
    const [liked,      setLiked      ] = useState(post.likes.some(id => id === user.id))
    

    const client = useQueryClient()
    const {"*": param} = useParams()

    const isPostMine = (mode !== 'user' && user? user.id === post.user: "" === post.user)
    const postURL = `${"http://localhost:3000"}/#/post/${post.id}`

    const handleToggleFullscreenMode = ()=> {
        if (visibility) {
            setVisibility(false)
            setToFront(true)
            return
        }
        setVisibility(true)
        setToFront(false)
    }



    const {mutate: handleToggleLike} = useMutation({
        mutationFn: toggleLike,
        onMutate: ()=> {
            setIsMutating(true)
            if (liked) setLiked(false)
            if (!liked) setLiked(true)
        },
        onSuccess: ()=> {
            setIsMutating(false)
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

    const handleOpenComments = ()=> {
        setPopUp({type: 'comments', post: post})

    }

    const handleDeletePost = async () => {
        setPopUp({type: 'delete', post: post})
    };


    if (post.type === "text") {
        return(
            <TextPostWrapper visibility={visibility}>
                <PostHeader post={post} mode={mode} />
                <PostContent post={post} />
                <PostFooter 
                    isMutating={isMutating} 
                    isPostLiked={liked} 
                    isPostMine={isPostMine}
                    onToggleFullscrenMode={handleToggleFullscreenMode}
                    onToggleLike={()=>handleToggleLike({post, user})}
                    onOpenComments={handleOpenComments}
                    onSharingPost={()=>copyToClipboard(postURL)}
                    onDeletePost={handleDeletePost}
                />
            </TextPostWrapper>
        )
    } 

    if (post.type === "cita") {
        return(
            <QuotePostWrapper visibility={visibility}>
                <PostHeader post={post} mode={mode} />
                <PostContent post={post}/>
                <PostFooter 
                    isMutating={isMutating} 
                    isPostLiked={liked} 
                    isPostMine={isPostMine}
                    onToggleFullscrenMode={handleToggleFullscreenMode}
                    onToggleLike={()=>handleToggleLike({post, user})}
                    onOpenComments={handleOpenComments}
                    onSharingPost={()=>copyToClipboard(postURL)}
                    onDeletePost={handleDeletePost}
                />
            </QuotePostWrapper>
        )
    }

    if (post.type === "image") {
        return(
            <ImagePostWrapper visibility={visibility} post={post}>
                <PostHeader post={post} mode={mode} />
                <PostContent post={post} />
                <PostTitle post={post} />
                <PostFooter 
                    isMutating={isMutating} 
                    isPostLiked={liked} 
                    isPostMine={isPostMine}
                    onToggleFullscrenMode={handleToggleFullscreenMode}
                    onToggleLike={()=>handleToggleLike({post, user})}
                    onOpenComments={handleOpenComments}
                    onSharingPost={()=>copyToClipboard(postURL)}
                    onDeletePost={handleDeletePost}
                />
            </ImagePostWrapper>
        )
    }

    if (post.type === "video") {

        const idVideo = post.videoPost.includes("https://www.youtube.com/watch?v=")
        ? post.videoPost.replace('https://www.youtube.com/watch?v=', "")
        : post.videoPost.includes("https://youtu.be/")
        ? post.videoPost.replace('https://youtu.be/', "")
        : null;

        if (!idVideo) return

        const urlVideo = `https://www.youtube.com/embed/${idVideo}?playlist=${idVideo}&loop=1`

        const aspectRatioString = post.videoAr.split(':')
        const width = Number(aspectRatioString[1])
        const height = Number(aspectRatioString[0])
        const aspectRatio = (width/height) * 100

        return(
            <VideoPostWrapper post={post} visibility={visibility}>
                <PostHeader post={post} mode={mode} />
                <PostContent post={post} aspectRatio={aspectRatio} urlVideo={urlVideo} />
                <PostTitle post={post} />
                <PostFooter 
                    isMutating={isMutating} 
                    isPostLiked={liked} 
                    isPostMine={isPostMine}
                    onToggleFullscrenMode={handleToggleFullscreenMode}
                    onToggleLike={()=>handleToggleLike({post, user})}
                    onOpenComments={handleOpenComments}
                    onSharingPost={()=>copyToClipboard(postURL)}
                    onDeletePost={handleDeletePost}
                />
            </VideoPostWrapper>
        )
    }

    if (post.type === "video-file") {
        return(
            <VideoFilePostWrapper visibility={visibility}>
                <PostHeader post={post} mode={mode} />
                <PostContent post={post}/>
                <PostTitle post={post} />
                <PostFooter 
                    isMutating={isMutating} 
                    isPostLiked={liked} 
                    isPostMine={isPostMine}
                    onToggleFullscrenMode={handleToggleFullscreenMode}
                    onToggleLike={()=>handleToggleLike({post, user})}
                    onOpenComments={handleOpenComments}
                    onSharingPost={()=>copyToClipboard(postURL)}
                    onDeletePost={handleDeletePost}
                />
            </VideoFilePostWrapper>
        )
    }
}

export default Post