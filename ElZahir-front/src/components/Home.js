// DEPENDENCIES
import axios from 'axios'
import React, { useState, useEffect, useRef } from "react"
import { useSelector} from 'react-redux'
import { Route, useNavigate, useParams } from 'react-router-dom'

// COMPONENTES
import Header       from './Header'
import ProfilePanel from './ProfilePanel'
import Post         from './Post'
import PopUps       from './PopUps';
import Tabs from './Tabs'

// CUSTOM HOOKS

import useElementAtTopOfPage from '../hooks/useElementAtTopOfPage'
import useInnerHeight from '../hooks/userInnerHeight';

// BASE URL
import baseURL from '../services/baseURL'
import getConfig from '../services/getConfig'

// CSS
import style from  '../styles/home.module.css'
import Posts from './Posts'
import BottomLogo from './BottomLogo'

const Home = ()=> {

    // STATES
    let [sticky,     setSticky       ] = useState(false)
    let [popUp,      setPopUp        ] = useState({type: 'none', post: null})

    let [toFront,    setToFront      ] = useState(false) 

    let [tab,        setTab          ] = useState("me")

    let [myPosts,    setMyPosts      ] = useState([])
    let [disPosts,   setDiscoverPosts] = useState([])
    let [follPosts,  setFollPosts    ] = useState([])


    // próxima implenentación
    let [mood,       setMood         ] = useState(0)
    
    // -------------------------

    // HOOKS
    const ref           = useRef(null)
    const parentRef     = useRef(null)
    let user            = useSelector(state => state.user.value)
    const isAtTop       = useElementAtTopOfPage(ref, parentRef)
    const innerHeight   = useInnerHeight()
    let navigate        = useNavigate()
    let { "*" : params} = useParams()

    const myImage = new Image();
    myImage.src = '../images/trippy-back3.gif';

    // USE EFFECTS
    // ! hacer el fetch en un componente separado
    useEffect(()=> {
        fetchUserPosts()
        fetchFollowingPosts()
        fecthDiscoverPosts()
    }, [user]) // eslint-disable-line


    // ! eliminar este useEffect
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

    // ! reemplazar con react query
    useEffect(()=> {
        axios.get('https://zahir-api.onrender.com/api/register')
            .then(()=> {
                console.log("waking up zahir onrender server")
            })
	}, []);

    // ! separar en un componente
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

    const fetchUserPosts = async () => {
        try {
            const { data:allposts } = await axios.get(baseURL.concat('/api/post/my-posts'), getConfig());
            setMyPosts(allposts.reverse());
        } catch (error) {
            
        }
    };

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

    const scrollToTop = () => {
        parentRef.current.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

    // RENDER
    return (
        <div className={style.main}>     
            <div ref={parentRef} className={style['mobile-main']}>
                <div ref={ref}></div>
                <PopUps popUp={popUp} setPopUp={setPopUp} user={user} />
                <Header sticky={sticky} setSticky={setSticky} toFront={toFront} mode={"desktop"}/>
                <div  className={!toFront? style.content : `${style.content} ${style.toFront}`}>
                    <div className={style['left-side']}>
                        <ProfilePanel mood={mood} setMood={setMood} sticky={sticky} setPopUp={setPopUp} popUp={popUp} posts={myPosts} />
                    </div>
                    <div  className={style['right-side']}>
                        <Tabs sticky={sticky} tab={tab} setTab={setTab} />
                        <Posts sticky={sticky} >
                            <Route  path="/"          element={renderPosts(myPosts)} />
                            <Route  path="/following" element={renderPosts(follPosts)} />
                            <Route  path="/discover"  element={renderPosts(disPosts)} />
                        </Posts>
                    </div>
                </div>
            </div>
            <BottomLogo toFront={toFront} innerHeight={innerHeight} isAtTop={isAtTop} scrollToTop={scrollToTop} />
        </div> 
    )
}

export default Home