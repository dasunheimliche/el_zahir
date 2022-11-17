import axios from 'axios'
import {useEffect, useState } from 'react'
import '../components/post.css'
import baseURL from '../services/baseURL'

const ShowTextPost = ({post, mainUser, onClick})=> {
    let mode = 'user'
    // let [liked, setLiked] = useState(false)

    
    // const like = ()=> {
    //     console.log("LIKE POST ID:", post.id)
    //     setLiked(true)
    //     axios.put(baseURL.concat(`/api/post/${post.id}`), {meId: mainUser.userId, mode: 'like'})
    // }

    // const unlike = ()=> {
    //     console.log("UNLIKE POST ID", post.id)
    //     setLiked(false)
    //     axios.put(baseURL.concat(`/api/post/${post.id}`), {meId: mainUser.userId, mode: 'unlike'})
    // }

    return (
        <div className='ShowPostOut'>
            <div className="post-container-textPost figure-showPost">
                {/* {console.log("3 - TEXT RENDER STARTS")}
                {console.log("-----------------------")} */}
                {mode === 'user'?
                    <div className='post-user-info'>
                        <div className='post-user-profile'>
                            <img className={'post-user-profile-image'} src={post.profileImg}></img>
                        </div>
                        <div className='post-user-username'>@{post.username}</div>
                    </div> : console.log()}
                <div className="post-text-content">
                    <div className='post-text-title'>{post.title}</div>
                    <div className='post-text-text'>{post.textPost}</div>
                </div>
                <div className="post-sub">
                    <div className='post-sub-text'></div>
                    <div className='post-sub-area'>
                        <div className='post-sub-size' style={{backgroundImage: "url()"}}></div>
                        <div className={'social-icons'}>
                            <span className={'social-icon social-notliked pointer'}></span>
                            <span className={'social-icon social-comment pointer'}></span>
                            <span className={'social-icon social-share pointer'}></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ShowTextPost