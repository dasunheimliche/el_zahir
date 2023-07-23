
import { useState }              from "react"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { followUser, unfollowUser, getCurrentUser } from '../services/userServices'

import Header from './Header'

import style from '../styles/userCard.module.css'

const ProfilePanel = ({otherUser, posts, sticky, setPopUp, mode})=> {

    const {data: {data: user} = {}} = useQuery({queryKey: ['ME'], queryFn: getCurrentUser,})

    const [toggleShowButtons, setToggleShowButtons ] = useState(false)
    const [loadingState,      setLoadingState      ] = useState(false)

    const client = useQueryClient()

    const isUserFollowed = otherUser && user.following.includes(otherUser.id)

    const { mutate: followUserHandler} = useMutation({
        mutationFn: ()=>followUser(user, otherUser),
        onMutate: ()=>setLoadingState(true),
        onSuccess: ()=>{
            client.setQueryData(["ME"], (old)=>{
                const copy = {...old}
                copy.data.following = copy.data.following.concat(otherUser.id)
                return copy
            })
            setLoadingState(false)
        }
        
    })

    const { mutate: unfollowUserHandler} = useMutation({
        mutationFn: ()=>unfollowUser(user, otherUser),
        onMutate: ()=>setLoadingState(true),
        onSuccess: ()=>{
            client.setQueryData(["ME"], (old)=>{
                const copy = {...old}
                copy.data.following = copy.data.following.filter(id=> id !== otherUser.id)
                return copy
            })
            setLoadingState(false)
        }
        
    })

    function toggleFollow () {
        if (isUserFollowed) {
            unfollowUserHandler()
        } else {
            followUserHandler()
        }
    }

    return (
        <div className={sticky === false? style.userCard : `${style.userCard} ${style['sticky-userCard']}`}>

            <div className={style.top} style={{"backgroundImage":`url(${mode === 'user'? otherUser.mainPanelImg : user.mainPanelImg})`}} >

                <Header sticky={sticky} mode={"mobile"} />

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
                    {mode === 'user'&& <div className={isUserFollowed? `${style.follow} ${style.unfollow} p`  : `${style.follow} p` } onClick={!loadingState && toggleFollow}>{isUserFollowed? 'Followed': 'Follow'}</div>}
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