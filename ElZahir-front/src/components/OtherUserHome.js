// IMPORTS
import axios from 'axios'
import { useState, useEffect, useCallback } from "react"
import Header from './Header'
import ProfilePanel from './ProfilePanel'
import Post from './Post'

import Comments from './Comments'

import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';

import baseURL from '../services/baseURL'

import Followers from './Followers'
import Following from './Following'

import style from  '../styles/home.module.css'

const OtherUserHome = ({setUser})=> {

    let user = useSelector(state => state.user.value)

    // USESTATES
    let [sticky,  setSticky]  = useState(false)
    let [popUp,   setPopUp]   = useState({type: 'none', post: null})
    let [toFront, setToFront] = useState(false) 

    let [otherUser, setOtherUser] = useState({id:null, posts:[], followers: [], following: []})

    const navigate = useNavigate()
    const { "*": userID } = useParams()

    const fetchUser = useCallback(async () => {
        try {
            const { data:user } = await axios.get(baseURL.concat(`/api/users/${userID}`))
            const { data:posts} = await axios.get(baseURL.concat('/api/post'))
            const filteredPosts = posts.filter(post => post.user === userID).reverse()
            const updatedUser = {...user, posts:filteredPosts}
            setOtherUser(updatedUser)
        } catch (error) {
            navigate(`/`)
        }
    }, [userID, navigate])

    useEffect(() => {
        if (userID !== '' && userID.length === 24) {
            fetchUser()
        } else {
            navigate(`/`)
        }
    }, [userID]) //eslint-disable-line
    
    const cargarPosts = (posts)=> {
        return posts.map(post => <Post key={post.id} toFront={toFront} setToFront={setToFront} setPopUp={setPopUp} mainUser={user} user={user} setUser={setUser} post={post} type={post.type} />)
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // RENDER
    return (
        <div className={style.main}>
            
            <div className={popUp.type === 'none'? `${style.popups} ${style.hidden}` : popUp.post? style.popups : `${style.popups} ${style.open}`} >
                {popUp.type === 'comments'      && <Comments      setPopUp={setPopUp} post={popUp.post} />}
                {popUp.type === 'seeFollowers'  && <Followers     setPopUp={setPopUp} />}
                {popUp.type === 'seeFollowings' && <Following     setPopUp={setPopUp} />}
            </div>

            <div className={sticky?  'logo bottom-logo-on p' : 'logo bottom-logo-off'} onClick={scrollToTop}>Zahir.</div>


            <Header popUp={popUp} user={user} setUser={setUser} sticky={sticky} setSticky={setSticky} />

            <div className={!toFront? style.content : `${style.content} ${style.toFront}`}>

                <div className={style['left-side']}>
                    <ProfilePanel setUser={setUser} user={user} setOtherUser={setOtherUser} otherUser={otherUser} sticky={sticky} setPopUp={setPopUp} popUp={popUp} mode={'user'}/>
                </div>

                <div className={style['right-side']}>
                    <div className={sticky === false? `${style.grid} ${style.noTab}` : `${style.grid} ${style['sticky-grid']} ${style['other-user-sticky-grid']}`}>
                        {cargarPosts(otherUser.posts? otherUser.posts : [])}
                    </div>
                </div>

            </div> 
        </div>
    )
}

export default OtherUserHome