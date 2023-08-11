import axios                                  from 'axios'
import React, { useState, useEffect, useRef } from "react"
import { Route }                              from 'react-router-dom'
import { useQuery }                           from '@tanstack/react-query'

import Header       from './Header'
import ProfilePanel from './ProfilePanel'
import Post         from './Post'
import PopUps       from './PopUps'
import Tabs         from './Tabs'
import BottomLogo   from './BottomLogo'
import Posts        from './Posts'

import useElementAtTopOfPage from '../hooks/useElementAtTopOfPage'
import useInnerHeight        from '../hooks/userInnerHeight';

import { getCurrentUser }                                       from '../services/userServices'
import { fetchMyPosts, fetchFollowingPosts, fecthExplorePosts } from '../services/postServices'
import { scrollToTop }                                          from '../services/helpers'

import style from  '../styles/home.module.css'

const Home = ()=> {

    const [ sticky,  setSticky  ] = useState(false)
    const [ popUp,   setPopUp   ] = useState({type: 'none', post: null})
    const [ toFront, setToFront ] = useState(false) 

    const childRef    = useRef(null)
    const parentRef   = useRef(null)
    const isAtTop     = useElementAtTopOfPage(childRef, parentRef)
    const innerHeight = useInnerHeight()

    const {data: {data: user} = {}}           = useQuery({ queryKey: ['ME'], queryFn: getCurrentUser})
    const {data: {data: myPosts} = {}}        = useQuery({ queryKey: ['userPosts'], queryFn: fetchMyPosts})
    const {data: {data: followingPosts} = {}} = useQuery({ queryKey: ['followedPosts'], queryFn: fetchFollowingPosts})
    const {data: {data: discoverPosts} = {}}  = useQuery({ queryKey: ['discoverPosts'], queryFn: fecthExplorePosts})

    const renderPosts = (posts) => {
        if (!posts) return
        return posts.map((post) => (
          <Post
            setToFront={setToFront}
            setPopUp={setPopUp}
            key={post.id}
            post={post}
          />
        ));
    };

    useEffect(()=> {
        axios.get('https://zahir-api.onrender.com/api/register')
	}, []);

    return (
        <div className={style.main}>
            <div ref={parentRef} className={style['mobile-main']}>
                <div ref={childRef}></div>
                <PopUps popUp={popUp} setPopUp={setPopUp} user={user} />
                <Header sticky={sticky} setSticky={setSticky} toFront={toFront} mode={"desktop"}/>
                <div  className={!toFront? style.content : `${style.content} ${style.toFront}`}>
                    <div className={style['left-side']}>
                        <ProfilePanel sticky={sticky} setPopUp={setPopUp} posts={myPosts} />
                    </div>
                    <div  className={style['right-side']}>
                        <Tabs sticky={sticky}  />
                        <Posts sticky={sticky} >
                            <Route path="/"          element={renderPosts(myPosts)} />
                            <Route path="/following" element={renderPosts(followingPosts)} />
                            <Route path="/discover"  element={renderPosts(discoverPosts)} />
                        </Posts>
                    </div>
                </div>
            </div>
            <BottomLogo reference={parentRef} toFront={toFront} innerHeight={innerHeight} isAtTop={isAtTop} scrollToTop={scrollToTop} />
        </div> 
    )
}

export default Home