// IMPORTS
import axios from 'axios'
import { useState, useEffect } from "react"
import './ProfileMain.css'
import Header from '../components/Header'
import ProfilePanel from '../components/ProfilePanel'
import Post from '../components/Post'
import PostImage from "../components/PostImage"
import PostText from "../components/PostText"
import PostCita from "../components/PostCita"
import PostVideo from "../components/PostVideo"

import { Route, Routes } from 'react-router-dom'

const ProfileMain = ({user, setUser, posts})=> {
    console.log("PROFILE MAIN LOADS WITH USER", user)
    // USESTATES
    let [sticky, setSticky] = useState(false)
    let [seeOpt, setSeeOpt] = useState('none')
    let [update, setUpdate] = useState('no')
    let [acpost, setAcPost] = useState(null)
    let [suser, setSuser] = useState({id:null, posts:[]})

    console.log('1 - SUSSER ', suser)
    // USE EFECTS
    useEffect(()=> {
        console.log("PF USE EFFECT 1")
        if (update !== 'no') {
            let localuser = JSON.parse(window.localStorage.getItem('loggedUser'))
            console.log("PF USE EFFECT 1 - LOCALUSER", localuser)
            setTimeout(()=> {
                axios.get('http://localhost:3001/api/post')
                .then(postss => {
                    let postslist = postss.data.filter(post => post.user[0] === localuser.userId)
                    setAcPost(postslist.reverse())
                    // setUser({...user}) 
                })
            }, 500)  
        }
      }, [update])

    useEffect(()=> {
        console.log("PF USE EFFECT 2")
        if (suser) {
            let currentSuser = JSON.parse(window.localStorage.getItem('currentSuser'))
            setSuser(currentSuser)
        }
    }, [])


    const actualizar = (e)=> {
        e.preventDefault()
        setUpdate(update===''? true: !update)
    }

    const cargarPosts = (posts)=> {
        return posts.map((post, i) => <Post key={i} post={post} type={post.type} />)

    }


    // RENDER
    return (
        <div className='profile-main'> {console.log('PROFILE MAIN STASTS LOADING')}

            <form className={seeOpt === 'none'? 'poster-container little': 'poster-container darker'} onSubmit={actualizar}>
                <PostImage setUser={setUser} onClick={setSeeOpt} className={seeOpt === 'image'? 'post-image': 'post-image notvisible'}/>
                <PostText setUser={setUser} user={user} onClick={setSeeOpt} className={seeOpt === 'text'? 'post-text': 'post-text notvisible'}/> 
                <PostCita setUser={setUser} onClick={setSeeOpt} className={seeOpt === 'cita'? 'post-text': 'post-text notvisible'}/>
                <PostVideo setUser={setUser} onClick={setSeeOpt} className={seeOpt === 'video'? 'post-image': 'post-image notvisible'}/>

            </form>

            <Header user={user} setUser={setUser} sticky={sticky} setSticky={setSticky} setSuser={setSuser}/>

            <Routes>
                <Route path={`/`} element={
                    <div className="main-content"> {console.log("MAIN CONTENT STARTS LOADING")}
                        <div className="main-left">
                            <ProfilePanel setUser={setUser} user={user} sticky={sticky} setSeeOpt={setSeeOpt} posts={posts}/>
                        </div>
                        <div className="main-right">
                            <div className={sticky === false? 'container': 'container container-stickymode'}>
                                {cargarPosts(!acpost? posts: acpost)}
                            </div>
                        </div>
                    </div>
                }/>
                <Route path={`/userId=${suser? suser.id: console.log()}`} element={suser? 
                    <div className="main-content"> {console.log("USER CONTENT START LOADING")}
                        <div className="main-left">
                            <ProfilePanel setUser={setUser} user={user} setSuser={setSuser} suser={suser} sticky={sticky} setSeeOpt={setSeeOpt} mode={'user'}/>
                        </div>
                        <div className="main-right">
                            <div className={sticky === false? 'container': 'container container-stickymode'}>
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