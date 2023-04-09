// DEPENDENCIES
import axios from 'axios'
import { useState, useEffect } from "react"
import { useSelector} from 'react-redux'

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

import Followers from './Followers'
import Following from './Following'

// BASE URL
import baseURL from '../services/baseURL'

// CSS
import style from  '../styles/home.module.css'

const Home = ()=> {

    // STATES
    let [sticky,     setSticky]     = useState(false)
    let [popUp,      setPopUp]      = useState({type: 'none', post: null})

    let [toFront,    setToFront]    = useState(false) 

    let [myPosts,    setMyPosts]    = useState([])
    let [otherPosts, setOtherPosts] = useState(false)
    let [tab,        setTab]        = useState("me")

    let [postBackImg ,setPostBackImg] = useState()

    // próxima impmenentación
    let [mood,       setMood]       = useState(0)
    // -------------------------

    // HOOKS
    let user = useSelector(state => state.user.value)


    // USE EFFECTS
    const fetchUserPosts = async () => {
        try {
          const { data:allposts } = await axios.get(baseURL.concat('/api/post'));
          const posts = allposts.filter(post => post.user === user.userId);
          setMyPosts(posts.reverse());
        } catch (error) {
          console.error(error)
        }
    };

    useEffect(()=> {
        fetchUserPosts()
    }, [otherPosts, user]) // eslint-disable-line


    // ESTO DEBERIA IR EN UN COMPONENTE

    const renderPosts = (posts) => {
        return posts.map((post) => (
          <Post
            toFront={toFront}
            setToFront={setToFront}
            setPopUp={setPopUp}
            key={post.id}
            post={post}
            postF={otherPosts}
            mode={otherPosts ? 'user' : undefined}
          />
        ));
      };

    // EVENT HANDLERS
    const followingPosts = async()=> {
        try {
            const { data: allposts } = await axios.get(baseURL.concat('/api/post'))
            const follows = user.following
            const posts = allposts.filter(post => follows.includes(post.user))
            const reversedPosts = posts.slice().reverse()
            setOtherPosts(reversedPosts)
            setTab("following")
        } catch (error) {
            console.error(error)
        }
    }

    const discoverPosts = async()=> {
        try {
            const { data: allposts } = await axios.get(baseURL.concat('/api/post'))
            const follows = user.following
            const posts = allposts.filter(post => !follows.includes(post.user) && post.user !== user.userId)
            const reversedPosts = posts.slice().reverse()
            setOtherPosts(reversedPosts)
            setTab("discover")
        } catch (error) {
            console.error(error)
        }
    }

    const backtome = async()=> {
        try {
            setOtherPosts(false)
            const { data: allposts } = await axios.get(baseURL.concat('/api/post'))
            const posts = allposts.filter(post => post.user === user.userId)
            const reversedPosts = posts.slice().reverse()
            setMyPosts(reversedPosts)
            setTab("me")
        } catch (error) {
            console.error(error)
        }

    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const img = new Image();
    img.src = '../images//trippy-back3.gif';
    img.onload = ()=> {
        setPostBackImg(img)
    }

    // RENDER
    return (
        <div className={style.main}>

            <div className={popUp.type === 'none'? `${style.popups} ${style.hidden}` : popUp.post? style.popups : `${style.popups} ${style.open}`} >
                {popUp.type === 'image'         && <PostImageUi   setPopUp={setPopUp} />}
                {popUp.type === 'text'          && <PostTextUi    setPopUp={setPopUp} />} 
                {popUp.type === 'cita'          && <PostCitaUi    setPopUp={setPopUp} />}
                {popUp.type === 'video'         && <PostVideoUi   setPopUp={setPopUp} />}

                {popUp.type === 'changePI'      && <ChangePI      setPopUp={setPopUp} />}
                {popUp.type === 'changePanImg'  && <ChangePanImg  setPopUp={setPopUp} />}
                
                {popUp.type === 'comments'      && <Comments      setPopUp={setPopUp} post={popUp.post} />}

                {popUp.type === 'seeFollowers'  && <Followers     setPopUp={setPopUp} />}
                {popUp.type === 'seeFollowings' && <Following     setPopUp={setPopUp} />}

            </div>

            

            <Header popUp={popUp} sticky={sticky} setSticky={setSticky}/>

            <div className={sticky?  'logo bottom-logo-on p' : 'logo bottom-logo-off'} onClick={scrollToTop}>Zahir.</div>

            <div className={!toFront? style.content : `${style.content} ${style.toFront}`}>

                <div className={style['left-side']}>
                    <ProfilePanel mood={mood} setMood={setMood} sticky={sticky} setPopUp={setPopUp} popUp={popUp} posts={myPosts} />
                </div>

                <div  className={style['right-side']}>

                    <div className={sticky? `${style.tabs} ${style['sticky-tabs']}` : style.tabs}>
                        <span onClick={backtome}        className={tab === 'me'?        `${style.tab} ${style['neonText']} p` : `${style.tab} p`}>ME</span>
                        <span onClick={followingPosts}  className={tab === 'following'? `${style.tab} ${style['neonText']} p` : `${style.tab} p`}>FOLLOWING</span>
                        <span onClick={discoverPosts}   className={tab === 'discover'?  `${style.tab} ${style['neonText']} p` : `${style.tab} p`}>EXPLORE</span>    
                    </div> 

                    <div className={sticky === false? style.grid : `${style.grid} ${style['sticky-grid']}`}>
                        {renderPosts(otherPosts? otherPosts: myPosts)}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home