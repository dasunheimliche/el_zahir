import axios from 'axios'
import {useEffect, useState } from 'react'
import '../components/post.css'
import quotes from '../images/quotes.png'

import baseURL from '../services/baseURL'

const ShowCitaPost = ({post})=> {
    let mode = 'user'
    

    return (
        <div className='ShowPostOut'>
            <div className="post-container-citaPost figure-showPost">
                {/* {console.log("3 - CITA RENDER STARTS")}
                {console.log("-----------------------")} */}
                {mode === 'user'?
                    <div className='post-user-info'>
                        <div className='post-user-profile'>
                            <img className={'post-user-profile-image'} src={post.profileImg}></img>
                        </div>
                        <div className='post-user-username'>@{post.username}</div>
                    </div> : console.log()}
                <div>
                    <div className="post-cita-content">
                        <div className='post-text-left'>
                            <img className='post-text-comilla-left' src={quotes}></img>
                        </div>
            
                        <div className='post-cita-text-container'>
                            <div className='post-cita-text'>{post.textPost}</div>
                        </div>
                        <div className='post-text-right'>
                            <img className='post-text-comilla-right' src={quotes}></img>
                        </div>
                    </div>
                    <div className='post-cita-detail'>
                        <i>{post.title}</i> - <b>{post.subtitle}</b>
                    </div>
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


export default ShowCitaPost