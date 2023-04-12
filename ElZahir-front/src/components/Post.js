
import TextPost from '../components/TextPost'
import QuotePost from './QuotePost'
import ImagePost from '../components/ImagePost'
import VideoPost from '../components/VideoPost'
import VideoFilePost from '../components/VideoFilePost'

import getConfig from '../services/getConfig'

import {useState, useEffect} from 'react'
import axios from 'axios'
import style from '../styles/post.module.css'
import baseURL from '../services/baseURL'

import { useSelector, useDispatch} from 'react-redux'
import { userSlice} from '../reducers/userSlice'

const Post = ({post, mode, setPopUp, setToFront})=> {

    // let postURL = `http://zahir.onrender.com/#/post/${post.id}`
    let postURL = `http://localhost:3000/#/post/${post.id}`


    let [liked, setLiked] = useState(false)
    let [loading, setLoading] = useState(false)
    let [visibility, setVisibility] = useState(true)

    let user = useSelector(state => state.user.value)
    let dispatch = useDispatch()

    // IMAGE POST
    let [size] = useState({width: post.width, height: post.height})
    let [ancho, setAncho] = useState((size.width/size.height)*window.innerHeight)

    const handleResize = () => {
        setAncho((size.width / size.height) * (window.innerHeight - 200));
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        window.addEventListener('load', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('load', handleResize);
        };
    }, [size.width, size.height]); //eslint-disable-line

    // VIDEO POST

    let aspectr
    let width
    let height
    let ar

    if (post.type === "video") {
        aspectr = post.videoAr.split(':')
        width = Number(aspectr[1])
        height = Number(aspectr[0])
        ar = (width/height) * 100
    }
        
    useEffect(()=> {
        console.log("USER", user)
        console.log("POST", post)
        console.log("POST LIKES", post.likes)
        console.log("USER ID", user.userId)
        // if (post.likes && post.likes.includes(user.userId)) { 
        if (user.likedPosts && user.likedPosts.includes(post.id)) { // test
            setLiked(true)
        } else {
            setLiked(false)
        }
    }, []) //eslint-disable-line

    const deletePost = async () => {
        setPopUp({type: 'delete', post: post})
        // try {
        //     setLoading(true);
        //     const { imgkitID, id } = post;
        //     const { token } = JSON.parse(window.localStorage.getItem('loggedUser'));
      
        //     const config = {
        //         data: { imgkitID },
        //         headers: { Authorization: `Bearer ${token}` },
        //     };
      
        //     await axios.delete(`${baseURL}/api/post/${id}`, config);
      
        //     const loguedUser = JSON.parse(window.localStorage.getItem('loggedUser'));
        //     const updatedPostList = loguedUser.posts.filter((singlePost) => singlePost !== id);
      
        //     window.localStorage.setItem('loggedUser', JSON.stringify({ ...loguedUser, posts: updatedPostList }));
        //     dispatch(userSlice.actions.update({ ...loguedUser, posts: updatedPostList }));
        // } catch (error) {
        //     console.error(error);
        // } finally {
        //     setLoading(false);
        // }
    };

    const toggleLike = async(mode) => {
        const newLikedState = mode === 'like' ? true : false;
        setLiked(newLikedState);
        setLoading(true);

        try {
            await axios.put(baseURL.concat(`/api/post/like/${post.id}`), { meId: user.userId, mode }, getConfig())

            if (mode === "like") {
                dispatch(userSlice.actions.update({ ...user, likedPosts: [...user.likedPosts, post.id] })); // test
                const loguedUser = JSON.parse(window.localStorage.getItem('loggedUser'));
                window.localStorage.setItem('loggedUser', JSON.stringify({ ...loguedUser, likedPosts: [...user.likedPosts, post.id] }));
            } else {
                const updatedLikedPosts = user.likedPosts.filter((postId) => postId !== post.id);
                dispatch(userSlice.actions.update({ ...user, likedPosts: updatedLikedPosts })); // test
                const loguedUser = JSON.parse(window.localStorage.getItem('loggedUser'));
                window.localStorage.setItem('loggedUser', JSON.stringify({ ...loguedUser, likedPosts: updatedLikedPosts }));
            }

            setLoading(false)
        } catch(error) {
            console.error(error)
            setLoading(false)
        }

    };

    const doNothing = (e)=> {
        e.preventDefault()
    }

    const clipboard = ()=> {
        navigator.clipboard.writeText(postURL)
    }

    const openComments = ()=> {
        setPopUp({type: 'comments', post: post})

    }

    const p = {
        like: ()=>toggleLike('like'),
        dislike: ()=>toggleLike('unlike'),
        comments: openComments,
        share: clipboard,
        del: deletePost,
        doNothing,
    }

    
    if (post.type === "image") {
        return (
            <div className={visibility? {} : style.container}>
                <div id={!visibility && style['mobile-container']} style={(size.height > (window.innerHeight - 150) && !visibility)? {width: `${ancho}px`, maxWidth: '90vw'} : {}}>
                    {!visibility && <div className="logo post-logo">Zahir.</div>}
                    <ImagePost
                        post={post} mode={mode} setPopUp={setPopUp}
                        loading={loading} liked={liked} setToFront={setToFront}
                        p={p} setVisibility={setVisibility} visibility={visibility}
                    />
                </div>
            </div>

        )
    }

    if (post.type === "text") {
        return (
            <div className={visibility? {} : style.container}>
                <div id={!visibility && style['mobile-container']} style={!visibility? {width: "30%"} : {}}>
                    {!visibility && <div className="logo post-logo">Zahir.</div>}
                    <TextPost
                        post={post} mode={mode} setPopUp={setPopUp}
                        loading={loading} liked={liked} setToFront={setToFront}
                        p={p} visibility={visibility} setVisibility={setVisibility}
                    />
                </div>
            </div>
        )
    }
    if (post.type === "cita") {
        return(
            <div className={visibility? {} : style.container}>
                <div id={!visibility && style['mobile-container']} style={!visibility? {width: "30%"} : {}}>
                    {!visibility && <div className="logo post-logo">Zahir.</div>}
                    <QuotePost
                        post={post} mode={mode} setPopUp={setPopUp}
                        loading={loading} liked={liked} setToFront={setToFront}
                        p={p} visibility={visibility} setVisibility={setVisibility}
                    />
                </div>
            </div>
        )
    }
    if (post.type === "video") {
        return(
            <div className={visibility? {} : style.container}>
                <div id={!visibility && style['mobile-container']} style={!visibility?  ar >= 100?  (ar >= 170? {width:"23%"}: {width: "32%"}) : {width: "50%"} : {}}>
                    {!visibility && <div className="logo post-logo">Zahir.</div>}
                    <VideoPost 
                        post={post} mode={mode} setPopUp={setPopUp} 
                        loading={loading} liked={liked} setToFront={setToFront}
                        p={p} visibility={visibility} setVisibility={setVisibility}
                    />
                </div>
            </div>
        )
    }
    if (post.type === "video-file") {
        return (
            <div className={visibility? {} : style.container}>
                <div id={!visibility && style['mobile-container']} style={!visibility? {maxWidth: '50vw', maxHeight: '90vh'} : {}}>
                    {!visibility && <div className="logo post-logo">Zahir.</div>}
                    <VideoFilePost
                        post={post} mode={mode} setPopUp={setPopUp}
                        loading={loading} liked={liked} setToFront={setToFront}
                        p={p} setVisibility={setVisibility} visibility={visibility}
                    />
                </div>
            </div>

        )
    }
}

export default Post