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

const ProfileMain = ({user, setUser, posts, setPosts, moods, setMoods})=> {

    // USESTATES
    let [sticky, setSticky] = useState(false)
    let [seeOpt, setSeeOpt] = useState({type: 'none', post: null})

    let [postF, setPostF] = useState(false)
    let [suser, setSuser] = useState({id:null, posts:[], followers: [], following: []})

    // PROXIMA IMPLEMENTACION
    let [mood, setMood] = useState(0)
    // -------------------------


    // USE EFECTS
    useEffect(()=> {

        let localuser = JSON.parse(window.localStorage.getItem('loggedUser'))

        setTimeout(()=> {
            axios.get(baseURL.concat('/api/post'))
            .then(postss => {

                let postslist = postss.data.filter(post => post.user === localuser.userId)
                setPosts(postslist.reverse())
            })
        })  
        // SI EMPIEZO A TENER ERRORES AGREGO 500 ms al setTimeout()
    }, [])

    useEffect(()=> {
        if (suser) {
            let currentSuser = JSON.parse(window.localStorage.getItem('currentSuser'))
            setSuser(currentSuser)
        }
    }, [])



    const cargarPosts = (posts)=> {

        if (postF) {
            return posts.map((post) => <Post setSeeOpt={setSeeOpt} key={post.id} user={user} post={post} postF={postF} setPostF={setPostF} mode={'user'} />)
        } else {
            return posts.map((post) => <Post setSeeOpt={setSeeOpt} key={post.id} mainUser={user} post={post} postF={postF} setPostF={setPostF} user={user} setUser={setUser} />)
        }
    }

    const potsSeguidores = ()=> {
        axios.get(baseURL.concat('/api/post'))
            .then(allposts => {
                let follows = user.following
                let posts = allposts.data.filter(post => follows.includes(post.user))
                setPostF(posts.reverse())
            })
    }

    const potsDescubrir = ()=> {
        axios.get(baseURL.concat('/api/post'))
            .then(allposts => {
                let follows = user.following
                let posts = allposts.data.filter(post => !follows.includes(post.user))
                let posts2 = posts.filter(post => post.user !== user.userId)
                setPostF(posts2.reverse())
            })
    }

    const backtome = ()=> {
        setPostF(false)
    }



    // RENDER
    return (
        <div className={seeOpt.type === 'none'? "profile-main" : 'profile-main noOver'}>
            <div className={seeOpt.type === 'none'? 'poster-container little': seeOpt.post? 'poster-container' : 'poster-container darker'} >
                <PostImageUi setUser={setUser} setSeeOpt={setSeeOpt} className={seeOpt.type === 'image'? 'post-image': 'post-image notvisible'}/>
                <PostTextUi setUser={setUser} user={user} setSeeOpt={setSeeOpt} className={seeOpt.type === 'text'? 'post-text': 'post-text notvisible'}/> 
                <PostCitaUi setUser={setUser} setSeeOpt={setSeeOpt} className={seeOpt.type === 'cita'? 'post-text': 'post-text notvisible'}/>
                <PostVideoUi setUser={setUser} setSeeOpt={setSeeOpt} className={seeOpt.type === 'video'? 'post-video': 'post-video notvisible'}/>

                <ChangePI user={user} setUser={setUser} setSeeOpt={setSeeOpt} className={seeOpt.type === 'changePI'? 'post-image': 'post-image notvisible'}/>
                <ChangePanImg user={user} setUser={setUser} setSeeOpt={setSeeOpt} className={seeOpt.type === 'changePanImg'? 'post-image': 'post-image notvisible'}/>
                
                
                {seeOpt.type === 'comments'? <Comments setSeeOpt={setSeeOpt} post={seeOpt.post} user={user} mainUser={user} postF={postF}/>: console.log()}

                {seeOpt.type === 'imagePost'? <ShowImagePost setSeeOpt={setSeeOpt} post={seeOpt.post} user={user} mainUser={user} postF={postF}/>: console.log()}
                {seeOpt.type === 'textPost'? <ShowTextPost setSeeOpt={setSeeOpt} post={seeOpt.post} user={user} mainUser={user} postF={postF}/>: console.log()}
                {seeOpt.type === 'citaPost'? <ShowCitaPost setSeeOpt={setSeeOpt} post={seeOpt.post} user={user} mainUser={user} postF={postF}/>: console.log()}
                {seeOpt.type === 'videoPost'? <ShowVideoPost setSeeOpt={setSeeOpt} post={seeOpt.post} mainUser={user} setUser={setUser} postF={postF}/>: console.log()}

            </div>

            {/* <Header seeOpt={seeOpt} user={user} setUser={setUser} sticky={sticky} setSticky={setSticky} setSuser={setSuser}/> */}
            <Header seeOpt={seeOpt} user={user} setUser={setUser} sticky={sticky} setSticky={setSticky}/>


            <div className={!seeOpt.post? "main-content" : "main-content notvisible"}>

                <div className={'main-left'}>
                    {!seeOpt.post?
                    <ProfilePanel mood={mood} setMood={setMood} setUser={setUser} user={user} sticky={sticky} setSeeOpt={setSeeOpt} seeOpt={seeOpt} posts={posts} />
                    :
                    console.log()
                    }
                </div>

                <div className="main-right">
                    { seeOpt.type === 'none'? <div className={sticky? 'profile-main-pestañas profile-main-pestañas-sticky' : "profile-main-pestañas"}>

                        <span onClick={backtome} className='pestaña pestaña-me pointer'>ME</span>
                        <span onClick={potsSeguidores}  className='pestaña pestaña-social pointer'>FRIENDS</span>
                        <span onClick={potsDescubrir} className='pestaña pestaña-discover pointer' >EXPLORE</span>
                                
                    </div> : console.log()}
                    <div className={sticky === false? 'container': 'container container-stickymode'}>
                        {cargarPosts(postF? postF: posts)}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProfileMain