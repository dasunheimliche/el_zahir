// IMPORTS
import axios from 'axios'
import { useState, useEffect } from "react"
import './ProfileMain.css'
import Header from '../components/Header'
import ProfilePanel from '../components/ProfilePanel'
import Post from '../components/Post'

const UserMain = ({user, setUser, posts})=> {

    // USESTATES
    let [sticky, setSticky] = useState(false)
    let [seeOpt, setSeeOpt] = useState('none')
    let [update, setUpdate] = useState('no')
    let [acpost, setAcPost] = useState(null)

    // USE EFECTS
    useEffect(()=> {
        
        if (update !== 'no') {
            let localuser = JSON.parse(window.localStorage.getItem('loggedUser'))
            setTimeout(()=> {
                axios.get('http://localhost:3001/api/post')
                .then(postss => {
                    let postslist = postss.data.filter(post => post.user[0] === localuser.userId)
                    setAcPost(postslist.reverse())
                })
            }, 500)  
        }
      }, [update])


    const cargarPosts = (posts)=> {
        return posts.map((post, i) => <Post key={i} post={post} type={post.type} />)
    }

    // RENDER
    return (
        <div className='profile-main'>
            <Header user={user} setUser={setUser} sticky={sticky} setSticky={setSticky}/>

            <div className="main-content">
                <div className="main-left">
                    <ProfilePanel user={user} sticky={sticky} setSeeOpt={setSeeOpt}/>
                </div>
                <div className="main-right">
                    <div className={sticky === false? 'container': 'container container-stickymode'}>
                        {cargarPosts(!acpost? posts: acpost)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserMain