import axios from 'axios'
import { useEffect, useState } from "react"
import PostBox from "../components/PostBox"
import baseURL from '../services/baseURL'

const ProfilePanel = ({setUser, setSuser, user, suser, posts, sticky, setSeeOpt, seeOpt, mode})=> {
    let [following, setFollowing] = useState(suser? user.following.includes(suser.id): false)


    useEffect(()=> {
        if (mode === 'user') {
            if (user.following.includes(suser.id)) {
                setFollowing(true)
            }
        }
    })

    const follow = ()=> {
        if (following === false) {
            axios.put(baseURL.concat(`/api/users/${suser.id}`), {id:user.userId, mode:'follow'})
                .then(respuesta => {
                window.localStorage.setItem('loggedUser', JSON.stringify({...user, following: respuesta.data.me.following}))
                window.localStorage.setItem('currentSuser', JSON.stringify({...suser, followers: respuesta.data.user.followers}))
                setUser({...user, following: respuesta.data.me.following})
                setSuser({...suser, followers: respuesta.data.user.followers})
                setFollowing(!following)
            })
        } else if (following === true) {
            axios.put(baseURL.concat(`/api/users/${suser.id}`), {id:user.userId, mode:'unfollow'})
            .then(respuesta => {
                window.localStorage.setItem('loggedUser', JSON.stringify({...user, following: respuesta.data.me.following}))
                window.localStorage.setItem('currentSuser', JSON.stringify({...suser, followers: respuesta.data.user.followers}))
                setUser({...user, following: respuesta.data.me.following})
                setSuser({...suser, followers: respuesta.data.user.followers})
                setFollowing(!following)
        })
        }
    }

    return (
        <div className={sticky === false? 'profile-panel':'profile-panel sticky-panel'} >
                        <div style={{"backgroundImage":`url(${mode === 'user'? suser.mainPanelImg: user.mainPanelImg})`}}  className='profile-panel-up'>
                            <div className='panel-options'>
                                <div className='panel-options-left'>{''}</div>
                                <div onClick={mode === 'user'? ()=>console.log():()=>setSeeOpt({type: 'changePanImg', post: null})} className={mode === 'user'? 'panel-options-middle' : 'panel-options-middle pointer'}>{''}</div>
                                <div className='panel-options-right'>{''}</div>
                            </div>

                        </div>
                        <div style={{"backgroundImage":`url(${mode === 'user'? suser.profileImg: user.profileImg})`}} className={mode === 'user'? 'profile-panel-profile' : 'profile-panel-profile pointer'} onClick={mode === 'user'? ()=>console.log():()=>setSeeOpt({type: 'changePI', post: null})}>
                            <div className={'profile-panel-down-username'}>@{mode === 'user'? suser.username: user.username}</div>
                            {mode === 'user'? <div className={following === true? "profile-panel-down-follow pointer unfollow" : "profile-panel-down-follow pointer"} onClick={follow}>{following? 'Followed': 'Follow'}</div>: console.log()}
                        </div>
                        <div className='profile-panel-down'>
                           
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
                            {mode === 'user' || seeOpt.post? <div></div>:<PostBox onClick={setSeeOpt} seeOpt={seeOpt}/>}
                        </div>
                        
                    </div>
    )
}

export default ProfilePanel