// IMPORTS
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from "react"
import './ProfileMain.css'
import Header from './Header'
import ProfilePanel from './ProfilePanel'
import Post from './Post'
import PostImageUi from "./PostImageUi"
import PostTextUi from "./PostTextUi"
import PostCitaUi from "./PostCitaUi"
import PostVideoUi from "./PostVideoUi"
import ChangePI from "./ChangePI"
import ChangePanImg from './ChangePanImg'

import ShowImagePost from './showImagePost'
import ShowTextPost from './ShowTextPost'
import ShowCitaPost from './ShowCitaPost'
import ShowVideoPost from './ShowVideoPost'
import Comments from './Comments'


import baseURL from '../services/baseURL'

const ProfileMainOut = ({user, setUser})=> {

    // USESTATES
    let [sticky, setSticky] = useState(false)
    let [seeOpt, setSeeOpt] = useState({type: 'none', post: null})
    let [postF, setPostF] = useState(false)
    // let [suser, setSuser] = useState({id:null, posts:[], followers: [], following: []})
    let [suser, setSuser] = useState({id:null, posts:[], followers: [], following: []})
    let [url, setURL] = useState('')
    // console.log("SUSER", suser)
    // let [showPost, setShowPost] = useState({type: null, post: null})

    const navegar = useNavigate()

    // console.log("STRIIIIIIIIIIIIIIIIIIIIIIING", window.location.href.split('/')[5])

    let userID = window.location.href.split('/')[5]

    // console.log("USER IDD", userID, userID.length)

    window.addEventListener('popstate', ()=> {
        // console.log("POPSTATEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
        if (userID.length === 24) {
            setURL(userID)
        } 
    })

    

    useEffect(()=>{
        if (userID !== '' && userID.length === 24) {
            axios.get(baseURL.concat(`/api/users/${userID}`))
            .then(user => {
            let usuario = user.data
            axios.get(baseURL.concat('/api/post'))
            .then(posts => {
                let sposts = posts.data.filter(post => post.user === userID)
                usuario = {...usuario, posts: sposts.reverse()}
                window.localStorage.setItem('newSuser', JSON.stringify(usuario))
                setSuser(usuario)
                })
            })
        } else {
            navegar(`/`)
        }
        
    }, [url])

    // useEffect(()=> {
    //     if (suser) {
    //         let currentSuser = JSON.parse(window.localStorage.getItem('newSuser'))
    //         setSuser(currentSuser)
    //     }
    // }, [])

    
    const cargarPosts = (posts)=> {
        return posts.map((post, i) => <Post onClick={setSeeOpt} postF={postF} mainUser={user} user={user} setUser={setUser} key={i} setPostF={setPostF} post={post} type={post.type} />)
    }

    // const potsSeguidores = ()=> {
    //     axios.get(baseURL.concat('/api/post'))
    //         .then(allposts => {
    //             let follows = user.following
    //             let posts = allposts.data.filter(post => follows.includes(post.user))
    //             // window.localStorage.setItem('postsF', JSON.stringify(posts))
    //             setPostF(posts)
    //         })
    // }

    // const potsDescubrir = ()=> {
    //     axios.get(baseURL.concat('/api/post'))
    //         .then(allposts => {
    //             let follows = user.following
    //             let posts = allposts.data.filter(post => !follows.includes(post.user))
    //             let posts2 = posts.filter(post => post.user !== user.userId)
    //             // window.localStorage.setItem('postsF', JSON.stringify(posts2))
    //             setPostF(posts2)
    //         })
    // }

    // const backtome = ()=> {
    //     setPostF(false)
    // }



    // RENDER
    return (
        <div className={seeOpt.type === 'none'? "profile-main" : 'profile-main noOver'}>
            <div className={seeOpt.type === 'none'? 'poster-container little': seeOpt.post? 'poster-container' : 'poster-container darker'} >
                <PostImageUi setUser={setUser} onClick={setSeeOpt} className={seeOpt.type === 'image'? 'post-image': 'post-image notvisible'}/>
                <PostTextUi setUser={setUser} user={user} onClick={setSeeOpt} className={seeOpt.type === 'text'? 'post-text': 'post-text notvisible'}/> 
                <PostCitaUi setUser={setUser} onClick={setSeeOpt} className={seeOpt.type === 'cita'? 'post-text': 'post-text notvisible'}/>
                <PostVideoUi setUser={setUser} onClick={setSeeOpt} className={seeOpt.type === 'video'? 'post-image': 'post-image notvisible'}/>

                <ChangePI user={user} setUser={setUser} onClick={setSeeOpt} className={seeOpt.type === 'changePI'? 'post-image': 'post-image notvisible'}/>
                <ChangePanImg user={user} setUser={setUser} onClick={setSeeOpt} className={seeOpt.type === 'changePanImg'? 'post-image': 'post-image notvisible'}/>
                
                
                {seeOpt.type === 'comments'? <Comments onClick={setSeeOpt} post={seeOpt.post} user={user} mainUser={user} postF={postF}/>: console.log()}

                {seeOpt.type === 'imagePost'? <ShowImagePost onClick={setSeeOpt} post={seeOpt.post} user={user} mainUser={user} postF={postF}/>: console.log()}
                {seeOpt.type === 'textPost'? <ShowTextPost onClick={setSeeOpt} post={seeOpt.post} user={user} mainUser={user} postF={postF}/>: console.log()}
                {seeOpt.type === 'citaPost'? <ShowCitaPost onClick={setSeeOpt} post={seeOpt.post} user={user} mainUser={user} postF={postF}/>: console.log()}
                {seeOpt.type === 'videoPost'? <ShowVideoPost onClick={setSeeOpt} post={seeOpt.post} user={user} mainUser={user} postF={postF}/>: console.log()}

            </div>

            <Header seeOpt={seeOpt} user={user} setUser={setUser} sticky={sticky} setSticky={setSticky} setSuser={setSuser}/>

           
              
            <div className={!seeOpt.post? "main-content": "main-content notvisible"}>
                <div className="main-left">
                    <ProfilePanel setUser={setUser} user={user} setSuser={setSuser} suser={suser} sticky={sticky} setSeeOpt={setSeeOpt} seeOpt={seeOpt} mode={'user'}/>
                </div>
                <div className="main-right">
                    <div className={sticky === false? 'container container-user': 'container container-user container-stickymode container-user-stickymode'}>
                        {cargarPosts(suser.posts? suser.posts : [])}
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default ProfileMainOut