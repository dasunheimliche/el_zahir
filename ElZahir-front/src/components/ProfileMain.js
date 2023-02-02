// DEPENDENCIES
import axios from 'axios'
import { useState, useEffect } from "react"
import { useSelector} from 'react-redux'

// COMPONENTES
import Header from '../components/Header'
import ProfilePanel from '../components/ProfilePanel'
import Post from '../components/Post'
import PostImageUi from "../components/PostImageUi"
import PostTextUi from "../components/PostTextUi"
import PostCitaUi from "../components/PostCitaUi"
import PostVideoUi from "../components/PostVideoUi"
import ChangePI from "../components/ChangePI"
import ChangePanImg from '../components/ChangePanImg'

import ShowImagePost from '../components/showImagePost'
import ShowTextPost from '../components/ShowTextPost'
import ShowCitaPost from '../components/ShowCitaPost'
import ShowVideoPost from '../components/ShowVideoPost'
import Comments from '../components/Comments'

import Followers from '../components/Followers'
import Following from '../components/Following'

// BASE URL
import baseURL from '../services/baseURL'

// CSS
import './ProfileMain.css'


const ProfileMain = ()=> {

    // STATES
    let [sticky,     setSticky]     = useState(false)
    let [seeOpt,     setSeeOpt]     = useState({type: 'none', post: null})

    let [myPosts,    setMyPosts]    = useState([])
    let [otherPosts, setOtherPosts] = useState(false)
    let [pestana,    setPestana]    = useState("me")

    // próxima impmenentación
    let [mood, setMood] = useState(0)
    // -------------------------

    // HOOKS
    let user = useSelector(state => state.user.value)

    // USE EFFECTS
    useEffect(()=> {

        axios.get(baseURL.concat('/api/post'))
            .then(allposts => {
                let posts2 = allposts.data.filter(post => post.user === user.userId)
                setMyPosts(posts2.reverse())
            })
    }, [otherPosts, user])


    // ESTO DEBERIA IR EN UN COMPONENTE
    const cargarPosts = (posts)=> {

        if (otherPosts) {
            return posts.map((post) => <Post setSeeOpt={setSeeOpt} key={post.id} post={post} postF={otherPosts} mode={'user'} />)
        } else {
            return posts.map((post) => <Post setSeeOpt={setSeeOpt} key={post.id} post={post} postF={otherPosts} />)
        }
    }

    // EVENT HANDLERS
    const potsSeguidos = ()=> {
       
        axios.get(baseURL.concat('/api/post'))
            .then(allposts => {
                let follows = user.following
                let posts = allposts.data.filter(post => follows.includes(post.user))
                setOtherPosts(posts.reverse())
                setPestana("following")
            })
    }

    const potsDescubrir = ()=> {
        axios.get(baseURL.concat('/api/post'))
            .then(allposts => {
                let follows = user.following
                let posts = allposts.data.filter(post => !follows.includes(post.user))
                let posts2 = posts.filter(post => post.user !== user.userId)
                setOtherPosts(posts2.reverse())
                setPestana("discover")
            })
    }

    const backtome = ()=> {
        setOtherPosts(false)
        axios.get(baseURL.concat('/api/post'))
            .then(allposts => {
                let posts2 = allposts.data.filter(post => post.user === user.userId)
                setMyPosts(posts2.reverse())
                setPestana("me")
            })

    }


    // RENDER
    return (
        <div className={seeOpt.type === 'none'? "profile-main" : 'profile-main noOver'}>

            <div className={seeOpt.type === 'none'? 'poster-container little': seeOpt.post? 'poster-container' : 'poster-container darker'} >
                {seeOpt.type === 'image'        && <PostImageUi   setSeeOpt={setSeeOpt} />}
                {seeOpt.type === 'text'         && <PostTextUi    setSeeOpt={setSeeOpt} />} 
                {seeOpt.type === 'cita'         && <PostCitaUi    setSeeOpt={setSeeOpt} />}
                {seeOpt.type === 'video'        && <PostVideoUi   setSeeOpt={setSeeOpt} />}

                {seeOpt.type === 'changePI'     && <ChangePI      setSeeOpt={setSeeOpt} />}
                {seeOpt.type === 'changePanImg' && <ChangePanImg  setSeeOpt={setSeeOpt} />}
                
                {seeOpt.type === 'comments'     && <Comments      setSeeOpt={setSeeOpt} post={seeOpt.post} />}

                {seeOpt.type === 'imagePost'    && <ShowImagePost setSeeOpt={setSeeOpt} post={seeOpt.post} />}
                {seeOpt.type === 'textPost'     && <ShowTextPost  setSeeOpt={setSeeOpt} post={seeOpt.post} />}
                {seeOpt.type === 'citaPost'     && <ShowCitaPost  setSeeOpt={setSeeOpt} post={seeOpt.post} />}
                {seeOpt.type === 'videoPost'    && <ShowVideoPost setSeeOpt={setSeeOpt} post={seeOpt.post} />}

                {seeOpt.type === 'seeFollowers' && <Followers setSeeOpt={setSeeOpt} />}
                {seeOpt.type === 'seeFollowings' && <Following setSeeOpt={setSeeOpt} />}

            </div>

            <Header seeOpt={seeOpt} sticky={sticky} setSticky={setSticky}/>

            <div className={!seeOpt.post? "main-content" : "main-content notvisible"}>

                <div className={'main-left'}>
                    {!seeOpt.post?
                    <ProfilePanel mood={mood} setMood={setMood} sticky={sticky} setSeeOpt={setSeeOpt} seeOpt={seeOpt} posts={myPosts} />
                    :
                    console.log()
                    }
                </div>

                <div className="main-right">

                    { seeOpt.type === 'none'? <div className={sticky? 'profile-main-pestañas profile-main-pestañas-sticky' : "profile-main-pestañas"}>

                        <span onClick={backtome}      className={pestana === 'me'? 'pestaña pestaña-me neonText pointer': 'pestaña pestaña-me pointer'}>      ME</span>
                        <span onClick={potsSeguidos}  className={pestana === 'following'? 'pestaña pestaña-social neonText pointer': 'pestaña pestaña-me pointer'}>  FOLLOWING</span>
                        <span onClick={potsDescubrir} className={pestana === 'discover'? 'pestaña pestaña-discover neonText pointer': 'pestaña pestaña-me pointer'}>EXPLORE</span>
                                
                    </div> : console.log()}

                    <div className={sticky === false? 'container': 'container container-stickymode'}>
                        {cargarPosts(otherPosts? otherPosts: myPosts)}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProfileMain