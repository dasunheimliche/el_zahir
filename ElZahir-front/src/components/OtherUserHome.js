// IMPORTS
import axios from 'axios'
import { useState, useEffect, useRef } from "react"
import Header from './Header'
import ProfilePanel from './ProfilePanel'
import Post from './Post'

import Comments from './Comments'

import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';

import useElementAtTopOfPage from '../hooks/useElementAtTopOfPage'


import baseURL from '../services/baseURL'

import Followers from './Followers'
import Following from './Following'

import style from  '../styles/home.module.css'
import getConfig from '../services/getConfig'

const OtherUserHome = ({setUser})=> {

    let user = useSelector(state => state.user.value)

    // USESTATES
    let [sticky,  setSticky]  = useState(false)
    let [popUp,   setPopUp]   = useState({type: 'none', post: null})
    let [toFront, setToFront] = useState(false)

    let [otherUser, setOtherUser] = useState({id:null, posts:[], followers: [], following: []})

    const ref = useRef(null)
    const parentRef = useRef(null)
    const isAtTop = useElementAtTopOfPage(ref, parentRef)

    const navigate = useNavigate()
    const { "*": userID } = useParams()

    const fetchUser = async () => {
        const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'));
        const token = `Bearer ${loggedUser.token}`;

        const config = {
            headers: {
                Authorization: token
            },
            params: {userID}
        }

        try {
            const { data:user } = await axios.get(baseURL.concat(`/api/users/${userID}`), getConfig())
            const { data:allposts} = await axios.get(baseURL.concat('/api/post/user-posts'), config)
            const updatedUser = {...user, posts:allposts.reverse()}
            setOtherUser(updatedUser)
        } catch (error) {
            navigate(`/`)
        }
    }

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
                    {popUp.type === 'comments'      && <Comments      setPopUp={setPopUp} post={popUp.post} />}
                    {popUp.type === 'seeFollowers'  && <Followers     setPopUp={setPopUp} user={otherUser}/>}
                    {popUp.type === 'seeFollowings' && <Following     setPopUp={setPopUp} user={otherUser}/>}
                </div>
                <Header sticky={sticky} setSticky={setSticky} toFront={toFront}/>
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
            <div style={toFront? {display: 'none'} : {}} className={!isAtTop ? 'logo bottom-logo-on p' : 'bottom-logo-off p'} onClick={scrollToTop}>Zahir.</div>
        </div>
    )
}

export default OtherUserHome