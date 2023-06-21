
// DEPENDENCIES
import axios from 'axios'
import { useEffect, useState } from "react"
import { useSelector, useDispatch} from 'react-redux'
import { userSlice} from '../reducers/userSlice'

import Header from './Header'

// BSE URL
import baseURL from '../services/baseURL'

// CSS
import style from '../styles/userCard.module.css'
import getConfig from '../services/getConfig'


const ProfilePanel = ({setOtherUser, otherUser, posts, sticky, setPopUp, mode})=> {

    // STATES
    let user = useSelector(state => state.user.value)
    let dispatch = useDispatch()

    let [following, setFollowing] = useState(otherUser? user.following.includes(otherUser.id) : false)
    let [toggleShowButtons, setToggleShowButtons] = useState(false)
    let [loadingState, setLoadingState] = useState(false)

    // USE EFFECTS
    useEffect(()=> {

        if (!user || !otherUser) {
            return
        }
        if (mode === 'user') {
            if (user.following.includes(otherUser.id)) {
                setFollowing(true)
            }
        }
    },[otherUser]) //eslint-disable-line

    // EVENT HANDLERS

    const toggleFollow = async () => {
        
        setLoadingState(true);
        try {
            let userData

            if (following) {
                userData = await axios.put(`${baseURL}/api/users/unfollow/${otherUser.id}`, { id: user.userId }, getConfig());
                userData = userData.data
            } else {
                userData = await axios.put(`${baseURL}/api/users/follow/${otherUser.id}`, { id: user.userId }, getConfig());
                userData = userData.data
            }
        
            const loggedUser = { ...user, following: userData.me.following };
            window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
            dispatch(userSlice.actions.update(loggedUser));
        
            const currentSuser = { ...otherUser, followers: userData.user.followers };
            window.localStorage.setItem('currentSuser', JSON.stringify(currentSuser));
            setOtherUser(currentSuser);
        
            setFollowing((prevState) => !prevState);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingState(false);
        }
      };

    return (
        <div className={sticky === false? style.userCard : `${style.userCard} ${style['sticky-userCard']}`}>

            <div className={style.top} style={{"backgroundImage":`url(${mode === 'user'? otherUser.mainPanelImg : user.mainPanelImg})`}} >

                {/* <div className={style['mobile-bar']}> */}
                    <Header sticky={sticky} mode={"mobile"} />
                {/* </div> */}

                <div className={style.options}>

                    <div className={style['left-options']} >{''}</div>
                    <div className={mode === 'user'? `${style['middle-options']}` : `${style['middle-options']} p`} onClick={mode === 'user'? null :()=>setPopUp({type: 'changePanImg', post: null})} >{''}</div>
                    <div className={style['right-options']} >{''}</div>

                </div>

            </div>

            <div className={style.bottom}>

                <div style={{"backgroundImage":`url(${mode === 'user'? otherUser.profileImg :  user.profileImg})`}} className={mode === 'user'? style.profile  : `${style.profile} p`} onClick={mode === 'user'? null : ()=>setPopUp({type: 'changePI', post: null})}>
                    <div className={style.username}>@{mode === 'user'? otherUser.username   : user.username}</div>
                </div>

                <div className={mode === 'user'? `${style.separator} ${style['mobile-separator']}` :style.separator}>
                    {mode === 'user'&& <div className={following === true? `${style.follow} ${style.unfollow} p`  : `${style.follow} p` } onClick={!loadingState && toggleFollow}>{following? 'Followed': 'Follow'}</div>}
                </div>

                <div className={style.stats}>

                    <div className={style.stat}>
                        <span className={style['stat-title']}>Followers</span>
                        <span className='p' onClick={()=>setPopUp({type: 'seeFollowers' , post: null})}>{mode === 'user'? String(otherUser.followers.length) : String(user.followers.length)}</span>
                    </div>

                    <div className={style.stat}>
                        <span className={style['stat-title']}>Following</span>
                        <span className='p' onClick={()=>setPopUp({type: 'seeFollowings' , post: null})}>{mode === 'user'? String(otherUser.following.length) : String(user.following.length)}</span>
                    </div>

                    <div className={style.stat}>
                        <span className={style['stat-title']}>Posts</span>
                        <span>{mode === 'user'? (otherUser? String(otherUser.posts.length):"0"):(posts? String(user.posts.length):"0")}</span>
                    </div>

                </div>

                {(mode !== 'user' ) && (
                    <div className={style.postbox}>
                        <div className={toggleShowButtons ? `${style.hide} p` : `${style.open} p`} onClick={()=> setToggleShowButtons(!toggleShowButtons)}></div>
                    </div>
                )}
            </div>

            <div className={toggleShowButtons? `${style.buttons} ${style.visible}` : style.buttons }>

                <div className={toggleShowButtons? `${style['post-text']}  ${style.seeButton} p` : `${style['post-text']} p` }  onClick={()=>setPopUp({type: 'text' , post: null})}></div>
                <div className={toggleShowButtons? `${style['post-quote']} ${style.seeButton} p` : `${style['post-quote']} p` } onClick={()=>setPopUp({type: 'cita' , post: null})}></div>
                <div className={toggleShowButtons? `${style['post-image']} ${style.seeButton} p` : `${style['post-image']} p` } onClick={()=>setPopUp({type: 'image', post: null})}></div>
                <div className={toggleShowButtons? `${style['post-video']} ${style.seeButton} p` : `${style['post-video']} p` } onClick={()=>setPopUp({type: 'video', post: null})}></div>
                
            </div> 
        </div>
    )
}

export default ProfilePanel