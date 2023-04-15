// DEPENDENCIES
import axios from 'axios'
import { useState, useEffect, useRef } from "react"
import { useSelector} from 'react-redux'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import React from 'react';

// COMPONENTES
import Header from './Header'
import ProfilePanel from './ProfilePanel'
import Post from './Post'
import PostImageUi from "./PostImageUi"
import PostTextUi from "./PostTextUi"
import PostCitaUi from "./PostCitaUi"
import PostVideoUi from "./PostVideoUi"
import ChangePI from "./ChangePI"
import ChangePanImg from './ChangePanImg'

import Comments from './Comments'
import Delete from './Delete'

import Followers from './Followers'
import Following from './Following'


// CUSTOM HOOKS

import useElementAtTopOfPage from '../hooks/useElementAtTopOfPage'

// BASE URL
import baseURL from '../services/baseURL'
import getConfig from '../services/getConfig'

// CSS
import style from  '../styles/home.module.css'

const Home = ()=> {

    // STATES
    let [sticky,     setSticky]     = useState(false)
    let [popUp,      setPopUp]      = useState({type: 'none', post: null})

    let [toFront,    setToFront]    = useState(false) 

    let [myPosts,    setMyPosts]    = useState([])
    let [tab,        setTab]        = useState("me")


    let [disPosts, setDiscoverPosts] = useState([])
    let [follPosts, setFollPosts] = useState([])


    // próxima impmenentación
    let [mood,       setMood]       = useState(0)
    
    // -------------------------

    // HOOKS
    const ref = useRef(null)
    const parentRef = useRef(null)
    let user = useSelector(state => state.user.value)
    const isAtTop = useElementAtTopOfPage(ref, parentRef)
    let navigate = useNavigate()
    let { "*" : params} = useParams()

    const myImage = new Image();
    myImage.src = '../images/trippy-back3.gif';

    // USE EFFECTS
    const fetchUserPosts = async () => {
        try {
          const { data:allposts } = await axios.get(baseURL.concat('/api/post/my-posts'), getConfig());
          setMyPosts(allposts.reverse());
        } catch (error) {
          console.error(error)
        }
    };

    useEffect(()=> {
        fetchUserPosts()
        fetchFollowingPosts()
        fecthDiscoverPosts()
    }, [user]) // eslint-disable-line

    useEffect(()=> {
        if (params === "me") {
            setTab("me")
            navigate('/home')
        } else if (params === "following") {
            navigate('/home/following')
            setTab("following")
        } else if (params === "discover") {
            setTab("discover")
            navigate('/home/discover')
        }
    }, []) // eslint-disable-line


    // ESTO DEBERIA IR EN UN COMPONENTE

    const renderPosts = (posts) => {
        return posts.map((post) => (
          <Post
            setToFront={setToFront}
            setPopUp={setPopUp}
            key={post.id}
            post={post}
            mode={tab !== "me" ? 'user' : undefined}
          />
        ));
    };


    // EVENT HANDLERS
    const fetchFollowingPosts = async()=> {
        try {
            const { data: allposts } = await axios.get(baseURL.concat('/api/post/following-posts'), getConfig())
            const reversedPosts = allposts.slice().reverse()
            setFollPosts(reversedPosts)
        } catch (error) {
            console.error(error)
        }
    }
    const fecthDiscoverPosts = async()=> {
        try {
            const { data: allposts } = await axios.get(baseURL.concat('/api/post/discover-posts'), getConfig())
            const follows = user.following
            const posts = allposts.filter(post => !follows.includes(post.user) && post.user !== user.userId)
            const reversedPosts = posts.slice().reverse()
            setDiscoverPosts(reversedPosts)
        } catch (error) {
            console.error(error)
        }
    }

    const toFollowing = ()=> {
        setTab('following')
        navigate('/home/following')
    }

    const backtome = async()=> {
        setTab("me")
        navigate('/home')
    }

    const toDiscover = ()=> {
        setTab('discover')
        navigate('/home/discover')
    }

    const scrollToTop = () => {
        parentRef.current.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // RENDER
    return (
        <div className={style.main}>            
            <div ref={parentRef} className={style['mobile-main']}>
                <div ref={ref}></div>
                <div className={popUp.type === 'none'? `${style.popups} ${style.hidden}` : popUp.post? style.popups : `${style.popups} ${style.open}`} >
                    {popUp.type === 'image'         && <PostImageUi   setPopUp={setPopUp} />}
                    {popUp.type === 'text'          && <PostTextUi    setPopUp={setPopUp} />}
                    {popUp.type === 'cita'          && <PostCitaUi    setPopUp={setPopUp} />}
                    {popUp.type === 'video'         && <PostVideoUi   setPopUp={setPopUp} />}
                    {popUp.type === 'changePI'      && <ChangePI      setPopUp={setPopUp} />}
                    {popUp.type === 'changePanImg'  && <ChangePanImg  setPopUp={setPopUp} />}
                
                    {popUp.type === 'comments'      && <Comments      setPopUp={setPopUp} post={popUp.post} />}
                    {popUp.type === 'delete'        && <Delete        setPopUp={setPopUp} post={popUp.post}/>}
                    {popUp.type === 'seeFollowers'  && <Followers     setPopUp={setPopUp} />}
                    {popUp.type === 'seeFollowings' && <Following     setPopUp={setPopUp} />}
                </div>
                
                <Header popUp={popUp} sticky={sticky} setSticky={setSticky} toFront={toFront} />

                <div  className={!toFront? style.content : `${style.content} ${style.toFront}`}>
                    <div className={style['left-side']}>
                        <ProfilePanel mood={mood} setMood={setMood} sticky={sticky} setPopUp={setPopUp} popUp={popUp} posts={myPosts} />
                    </div>
                    <div  className={style['right-side']}>
                        <div className={sticky? `${style.tabs} ${style['sticky-tabs']}` : style.tabs}>
                            <span onClick={backtome}        className={tab === 'me'?        `${style.tab} ${style['neonText']} p` : `${style.tab} p`}>ME</span>
                            <span onClick={toFollowing}  className={tab === 'following'? `${style.tab} ${style['neonText']} p` : `${style.tab} p`}>FOLLOWING</span>
                            <span onClick={toDiscover}   className={tab === 'discover'?  `${style.tab} ${style['neonText']} p` : `${style.tab} p`}>EXPLORE</span>
                        </div>
                        <div className={sticky === false? style.grid : `${style.grid} ${style['sticky-grid']}`}>
                            <Routes>
                                <Route  path="/" element={renderPosts(myPosts)} />
                                <Route  path="/following" element={renderPosts(follPosts)} />
                                <Route  path="/discover" element={renderPosts(disPosts)} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
            <div style={toFront? {display: 'none'} : {}} className={!isAtTop ? 'logo bottom-logo-on p' : 'bottom-logo-off p'} onClick={scrollToTop}>Zahir.</div>
        </div>
    )
}

export default Home