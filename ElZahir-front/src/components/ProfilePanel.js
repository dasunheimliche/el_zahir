import axios from 'axios'
import { useEffect, useState } from "react"
// import PostBox from "../components/PostBox"
import baseURL from '../services/baseURL'
import './PostBox.css'

const ProfilePanel = ({setUser, setSuser, user, suser, posts, sticky, setSeeOpt, seeOpt, mode, mood, setMood})=> {
    let [following, setFollowing] = useState(suser? user.following.includes(suser.id): false)
    let [show, setShow] = useState(false)
    let [loading, setLoading] = useState(false)

    useEffect(()=> {
        if (mode === 'user') {
            if (user.following.includes(suser.id)) {
                setFollowing(true)
            }
        }
    })

    const follow = ()=> {
        setLoading(true)
        if (following === false) {
            axios.put(baseURL.concat(`/api/users/${suser.id}`), {id:user.userId, mode:'follow'})
                .then(respuesta => {
                setLoading(false)
                window.localStorage.setItem('loggedUser', JSON.stringify({...user, following: respuesta.data.me.following}))
                window.localStorage.setItem('currentSuser', JSON.stringify({...suser, followers: respuesta.data.user.followers}))
                setUser({...user, following: respuesta.data.me.following})
                setSuser({...suser, followers: respuesta.data.user.followers})
                setFollowing(!following)
            })
        } else if (following === true) {
            axios.put(baseURL.concat(`/api/users/${suser.id}`), {id:user.userId, mode:'unfollow'})
            .then(respuesta => {
                setLoading(false)
                window.localStorage.setItem('loggedUser', JSON.stringify({...user, following: respuesta.data.me.following}))
                window.localStorage.setItem('currentSuser', JSON.stringify({...suser, followers: respuesta.data.user.followers}))
                setUser({...user, following: respuesta.data.me.following})
                setSuser({...suser, followers: respuesta.data.user.followers})
                setFollowing(!following)
        })
        }
    }

    const not = (e)=> {
        e.preventDefault()
    }

    return (
        <div className={sticky === false? 'profile-panel':'profile-panel sticky-panel'} >
            <div style={{"backgroundImage":`url(${mode === 'user'? suser.mainPanelImg: user.mainPanelImg})`}}  className='profile-panel-up'>
                <div className='panel-options'>
                    <div className='panel-options-left' >{''}</div>
                    <div onClick={mode === 'user'? ()=>console.log():()=>setSeeOpt({type: 'changePanImg', post: null})} className={mode === 'user'? 'panel-options-middle' : 'panel-options-middle pointer'}>{''}</div>
                    <div className='panel-options-right' >{''}</div>
                </div>
            </div>

            <div className='profile-panel-down'>
                <div style={{"backgroundImage":`url(${mode === 'user'? suser.profileImg: user.profileImg})`}} className={mode === 'user'? 'profile-panel-profile' : 'profile-panel-profile pointer'} onClick={mode === 'user'? ()=>console.log():()=>setSeeOpt({type: 'changePI', post: null})}>
                    <div className={'profile-panel-down-username'}>@{mode === 'user'? suser.username: user.username}</div>
                </div>

                <div className='profile-panel-down-first'></div>

                <div className='profile-panel-down-followers'>
                    <div className='followers stat'>
                        <span className='stat-title'>FOLLOWERS</span>
                        <span>{mode === 'user'? String(suser.followers.length) : String(user.followers.length)}</span>
                    </div>
                    <div className='following stat'>
                        <span className='stat-title'>FOLLOWING</span>
                        <span>{mode === 'user'? String(suser.following.length) : String(user.following.length)}</span>
                    </div>
                    <div className='posts stat'>
                        <span className='stat-title'>POSTS</span>
                        <span>{mode === 'user'? (suser? String(suser.posts.length):"0"):(posts? String(user.posts):"0")}</span>
                    </div>
                </div>
                {mode === 'user' || seeOpt.post? 
                    <div></div>
                    :
                    <div className={'postbox-container'}>
                        <div className={show? 'postbox-post-minus pointer':'postbox-post-plus pointer'} onClick={()=> setShow(!show)}></div>
                    </div>
                }
            </div>

            {show? <div className={show? 'postbox-buttons mirar': 'postbox-buttons'}>
                <div className={show? 'button-post-text pointer seebutton' : 'button-post-text pointer'} onClick={()=>setSeeOpt({type: 'text', post: null})}></div>
                <div className={show? 'button-post-cita pointer seebutton' : 'button-post-cita pointer'} onClick={()=>setSeeOpt({type: 'cita', post: null})}></div>
                <div className={show? 'button-post-image pointer seebutton' : 'button-post-image pointer'} onClick={()=>setSeeOpt({type: 'image', post: null})}></div>
                <div className={show? 'button-post-video pointer seebutton' : 'button-post-video pointer'} onClick={()=>setSeeOpt({type: 'video', post: null})}></div>
            </div> : console.log()}  
            {mode === 'user'? <div className={following === true? "profile-panel-down-follow pointer unfollow" : "profile-panel-down-follow pointer"} onClick={loading? e=>not(e):follow}>{following? 'Followed': 'Follow'}</div>: console.log()}

        </div>
    )
}

export default ProfilePanel