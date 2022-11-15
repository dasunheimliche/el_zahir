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

import { Route, Routes } from 'react-router-dom'

import baseURL from '../services/baseURL'

const ProfileMain = ({user, setUser, posts, setPosts})=> {

    

    // USESTATES
    let [sticky, setSticky] = useState(false)
    let [seeOpt, setSeeOpt] = useState({type: 'none', post: null})

    let [postF, setPostF] = useState(false)
    let [suser, setSuser] = useState({id:null, posts:[], followers: [], following: []})


    // USE EFECTS
    useEffect(()=> {

        let localuser = JSON.parse(window.localStorage.getItem('loggedUser'))

        setTimeout(()=> {
            axios.get(baseURL.concat('/api/post'))
            .then(postss => {

                let postslist = postss.data.filter(post => post.user === localuser.userId)
                setPosts(postslist.reverse())
            })
        }, 500)  
    }, [])

    useEffect(()=> {
        if (suser) {
            let currentSuser = JSON.parse(window.localStorage.getItem('currentSuser'))
            setSuser(currentSuser)
        }
    }, [])



    const cargarPosts = (posts)=> {

        if (postF) {
            return posts.map((post, i) => <Post onClick={setSeeOpt}  mainUser={user} key={i} post={post} type={post.type} mode={'user'} setPostF={setPostF} postF={postF}/>)
        } else {
            return posts.map((post, i) => <Post onClick={setSeeOpt} postF={postF} mainUser={user} user={user} setUser={setUser} key={i} setPostF={setPostF} post={post} type={post.type} />)
        }
    }

    const potsSeguidores = ()=> {
        axios.get(baseURL.concat('/api/post'))
            .then(allposts => {
                let follows = user.following
                let posts = allposts.data.filter(post => follows.includes(post.user))
                // window.localStorage.setItem('postsF', JSON.stringify(posts))
                setPostF(posts.reverse())
            })
    }

    const potsDescubrir = ()=> {
        axios.get(baseURL.concat('/api/post'))
            .then(allposts => {
                let follows = user.following
                let posts = allposts.data.filter(post => !follows.includes(post.user))
                let posts2 = posts.filter(post => post.user !== user.userId)
                // window.localStorage.setItem('postsF', JSON.stringify(posts2))
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
                <PostImageUi setUser={setUser} onClick={setSeeOpt} className={seeOpt.type === 'image'? 'post-image': 'post-image notvisible'}/>
                <PostTextUi setUser={setUser} user={user} onClick={setSeeOpt} className={seeOpt.type === 'text'? 'post-text': 'post-text notvisible'}/> 
                <PostCitaUi setUser={setUser} onClick={setSeeOpt} className={seeOpt.type === 'cita'? 'post-text': 'post-text notvisible'}/>
                <PostVideoUi setUser={setUser} onClick={setSeeOpt} className={seeOpt.type === 'video'? 'post-video': 'post-video notvisible'}/>

                <ChangePI user={user} setUser={setUser} onClick={setSeeOpt} className={seeOpt.type === 'changePI'? 'post-image': 'post-image notvisible'}/>
                <ChangePanImg user={user} setUser={setUser} onClick={setSeeOpt} className={seeOpt.type === 'changePanImg'? 'post-image': 'post-image notvisible'}/>
                
                
                {seeOpt.type === 'comments'? <Comments onClick={setSeeOpt} post={seeOpt.post} user={user} mainUser={user} postF={postF}/>: console.log()}

                {seeOpt.type === 'imagePost'? <ShowImagePost onClick={setSeeOpt} post={seeOpt.post} user={user} mainUser={user} postF={postF}/>: console.log()}
                {seeOpt.type === 'textPost'? <ShowTextPost onClick={setSeeOpt} post={seeOpt.post} user={user} mainUser={user} postF={postF}/>: console.log()}
                {seeOpt.type === 'citaPost'? <ShowCitaPost onClick={setSeeOpt} post={seeOpt.post} user={user} mainUser={user} postF={postF}/>: console.log()}
                {seeOpt.type === 'videoPost'? <ShowVideoPost onClick={setSeeOpt} post={seeOpt.post} mainUser={user} setUser={setUser} postF={postF}/>: console.log()}

            </div>

            <Header seeOpt={seeOpt} user={user} setUser={setUser} sticky={sticky} setSticky={setSticky} setSuser={setSuser}/>

            <Routes>
                <Route path={`/`} element={
                    <div className={!seeOpt.post? "main-content" : "main-content notvisible"}>

                        <div className={'main-left'}>
                            <ProfilePanel setUser={setUser} user={user} sticky={sticky} setSeeOpt={setSeeOpt} seeOpt={seeOpt} posts={posts} />
                        </div>

                        <div className="main-right">
                            <div className={sticky? 'profile-main-pestañas profile-main-pestañas-sticky' : "profile-main-pestañas"}>

                                <span onClick={backtome} className='pestaña pestaña-me pointer'>ME</span>
                                <span onClick={potsSeguidores}  className='pestaña pestaña-social pointer'>FRIENDS</span>
                                <span onClick={potsDescubrir} className='pestaña pestaña-discover pointer' >EXPLORE</span>
                                
                            </div>
                            <div className={sticky === false? 'container': 'container container-stickymode'}>
                                {cargarPosts(postF? postF: posts)}
                            </div>
                        </div>
                    </div>
                }/>
                <Route exact path={`/userId=${suser? suser.id: console.log()}`} element={suser? 
                    <div className="main-content">
                        <div className="main-left">
                            <ProfilePanel setUser={setUser} user={user} setSuser={setSuser} suser={suser} sticky={sticky} setSeeOpt={setSeeOpt} seeOpt={seeOpt} mode={'user'}/>
                        </div>
                        <div className="main-right">
                            <div className={sticky === false? 'container container-user': 'container container-user container-stickymode container-user-stickymode'}>
                                {cargarPosts(suser.posts? suser.posts : [])}
                            </div>
                        </div>
                    </div> 
                    
                    : console.log()}/>
            </Routes>
        </div>
    )
}

export default ProfileMain