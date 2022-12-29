// IMPORTS
import axios from 'axios'
import { useState, useEffect } from "react"
import './ProfileMain.css'
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

import baseURL from '../services/baseURL'

const ProfileMain = ({user, setUser})=> {

    // USESTATES
    let [sticky, setSticky] = useState(false)
    let [seeOpt, setSeeOpt] = useState({type: 'none', post: null})

    let [myPosts, setMyPosts] = useState([])
    let [otherPosts, setOtherPosts] = useState(false)
    let [pestana, setPestana] = useState("me")


    // PROXIMA IMPLEMENTACION
    let [mood, setMood] = useState(0)
    // -------------------------


    useEffect(()=> {

        axios.get(baseURL.concat('/api/post'))
            .then(allposts => {
                let posts2 = allposts.data.filter(post => post.user === user.userId)
                setMyPosts(posts2.reverse())
            })
    }, [otherPosts, user])


    const cargarPosts = (posts)=> {

        if (otherPosts) {
            return posts.map((post) => <Post setSeeOpt={setSeeOpt} key={post.id} user={user} post={post} postF={otherPosts} mode={'user'} />)
        } else {
            return posts.map((post) => <Post setSeeOpt={setSeeOpt} key={post.id} mainUser={user} post={post} postF={otherPosts} user={user} setUser={setUser} />)
        }
    }

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
                {seeOpt.type === 'image'        && <PostImageUi   setSeeOpt={setSeeOpt} setUser={setUser} />}
                {seeOpt.type === 'text'         && <PostTextUi    setSeeOpt={setSeeOpt} setUser={setUser} />} 
                {seeOpt.type === 'cita'         && <PostCitaUi    setSeeOpt={setSeeOpt} setUser={setUser} />}
                {seeOpt.type === 'video'        && <PostVideoUi   setSeeOpt={setSeeOpt} setUser={setUser} />}

                {seeOpt.type === 'changePI'     && <ChangePI      setSeeOpt={setSeeOpt} setUser={setUser} />}
                {seeOpt.type === 'changePanImg' && <ChangePanImg  setSeeOpt={setSeeOpt} setUser={setUser} />}
                
                {seeOpt.type === 'comments'     && <Comments      setSeeOpt={setSeeOpt} post={seeOpt.post} user={user} />}

                {seeOpt.type === 'imagePost'    && <ShowImagePost setSeeOpt={setSeeOpt} post={seeOpt.post} />}
                {seeOpt.type === 'textPost'     && <ShowTextPost  setSeeOpt={setSeeOpt} post={seeOpt.post} />}
                {seeOpt.type === 'citaPost'     && <ShowCitaPost  setSeeOpt={setSeeOpt} post={seeOpt.post} />}
                {seeOpt.type === 'videoPost'    && <ShowVideoPost setSeeOpt={setSeeOpt} post={seeOpt.post} />}

            </div>

            <Header seeOpt={seeOpt} user={user} setUser={setUser} sticky={sticky} setSticky={setSticky}/>


            <div className={!seeOpt.post? "main-content" : "main-content notvisible"}>

                <div className={'main-left'}>
                    {!seeOpt.post?
                    <ProfilePanel mood={mood} setMood={setMood} setUser={setUser} user={user} sticky={sticky} setSeeOpt={setSeeOpt} seeOpt={seeOpt} posts={myPosts} />
                    :
                    console.log()
                    }
                </div>

                <div className="main-right">
                    { seeOpt.type === 'none'? <div className={sticky? 'profile-main-pestañas profile-main-pestañas-sticky' : "profile-main-pestañas"}>

                        <span onClick={backtome} style={pestana === 'me'? { borderBottom: "4px solid rgba(255, 255, 255, 0.25)" }: {}} className='pestaña pestaña-me pointer'>ME</span>
                        <span onClick={potsSeguidos} style={pestana === 'following'? { borderBottom: "4px solid rgba(255, 255, 255, 0.25)" }: {}}  className='pestaña pestaña-social pointer'>FOLLOWING</span>
                        <span onClick={potsDescubrir} style={pestana === 'discover'? { borderBottom: "4px solid rgba(255, 255, 255, 0.25)" }: {}} className='pestaña pestaña-discover pointer' >EXPLORE</span>
                                
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