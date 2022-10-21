import axios from 'axios'
import {  useRef, useState, useEffect } from "react"
import Entrada from "./Entrada"
import './ProfileMain.css'
import Post from '../components/Post'
import PostBox from "../components/PostBox"
import PostImage from "../components/PostImage"
import PostText from "../components/PostText"
import PostCita from "../components/PostCita"
import PostVideo from "../components/PostVideo"
import logo from '../icons/search.png'



const ProfileMain = ({user, salir, posts})=> {
    console.log('1 - PRE HOOKS')
    
    let [sticky, setSticky] = useState(false)

    let [see, setSee] = useState(false)
    let [seeOpt, setSeeOpt] = useState('none')
    let [update, setUpdate] = useState('no')
    let [acpost, setAcPost] = useState(null)
    // console.log('1.1 - INITIAL acpost', acpost)
    const useref = useRef(true)

    // console.log('USEREFFF', useref.current)
    // console.log('update !== "no"?', update !== 'no')

    useEffect(()=> {
        
        console.log('START USEFECT')
        if (update !== 'no') {
            console.log('START USEFECT IF')
            let user = JSON.parse(window.localStorage.getItem('loggedUser'))

            setTimeout(()=> {
                axios.get('http://localhost:3001/api/post')
                .then(postss => {
                    let postslist = postss.data.filter(post => post.user[0] === user.userId)
                    setAcPost(postslist.reverse())
                    return 'END AXIOS USEFECT'
                }). then(resultado => {console.log(resultado)})
            }, 1000)
            
            
        }
        console.log('END USEFECT')
      }, [update])


    window.addEventListener('scroll', ()=> {
        
        return (window.scrollY >= 125 && sticky === false)? setSticky(true): console.log()
    })
    
    window.addEventListener('scroll', ()=> {
        return (window.scrollY < 126)? setSticky(false): console.log()
    })

    const notsee = ()=> {
        console.log('NOTSEE')
        setSee(!see)
    }

    const notseeopt = (opt)=> {
        return ()=>{
            // setUpdate(update===''? true: !update)
            setSeeOpt(opt)
        }

    }

    const actualizar = (e)=> {
        console.log('ACTUALIZAAARRRRR')
        e.preventDefault()
        setUpdate(update===''? true: !update)
        setUpdate(update===''? true: !update)

    }

    const cargarPosts = (posts)=> {
        // console.log("FUNCION POSTS", posts)
        return posts.map((post, i) => <Post key={i} post={post} type={post.type} />)

    }

    console.log('2 - PRE RENDER', update, acpost, 'ASDF')
    return (
        <div className='profile-main'>
            <form className={seeOpt === 'none'? 'poster-container little': 'poster-container darker'} onSubmit={actualizar}>
                <PostImage onClick={notseeopt} className={seeOpt === 'image'? 'post-image': 'post-image notvisible'}/>
                <PostText onClick={notseeopt} className={seeOpt === 'text'? 'post-text': 'post-text notvisible'}/> 
                <PostCita onClick={notseeopt} className={seeOpt === 'cita'? 'post-text': 'post-text notvisible'}/>
                <PostVideo onClick={notseeopt} className={seeOpt === 'video'? 'post-image': 'post-image notvisible'}/>

            </form>
            
            <div className="header">
                <div className="header-image"></div>
                <div className={sticky === false? 'header-bar':'header-bar sticky-bar'}>

                    <div className="header-left">

                        <div className="logo">El Zahir.</div>
                        
                        <div className="header-search">
                            <div className="header-icon-search">
                                <img className='header-icon-img' alt="searchicon" src={logo} />
                            </div>
                            <Entrada type={'text'} pl={'buscar'} className={'header-input'}/>
                        </div>
                    </div>
                    <div className="header-right pointer">
                        <div className={!see? 'header-user-menu': 'header-user-menu expanded header-user-menu-s'} onClick={notsee}>
                            <div className="header-user">
                                <div className="h-user-logo"></div>
                                <div className="h-user-name">{user}</div>
                            </div>
                            <div className={see? 'header-user-opt': 'header-user-opt notvisible'}>
                                <span className="signoff" onClick={salir}>Salir</span>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            
            {/* <div className={sticky? 'separador separador-sticky': 'separador'}></div> */}
            <div className="main-content">
                
                <div className="main-left">

                    <div className={sticky === false? 'profile-panel':'profile-panel sticky-panel'} >
                        <div className='profile-panel-up'></div>
                        <div className='profile-panel-profile-image'>
                            <div className='profile-panel-down-username'>@{user}</div>
                        </div>
                        <div className='profile-panel-down'>
                            {/* <div className='profile-panel-down-username'>@{user}</div> */}
                            <div className='profile-panel-down-followers'>
                                <div className='followers stat'>
                                    <span className='stat-title'>FOLLOWERS</span>
                                    <span>20.0 K</span>
                                </div>
                                <div className='following stat'>
                                    <span className='stat-title'>FOLLOWING</span>
                                    <span>568</span>
                                </div>
                                <div className='posts stat'>
                                    <span className='stat-title'>POSTS</span>
                                    <span>89</span>
                                </div>
                            </div>
                            <PostBox onClick={notseeopt}/>
                        </div>
                        
                    </div>
                </div>
                <div className="main-right">
                    
                    <div className={sticky === false? 'container': 'container container-stickymode'}>
                        {console.log(!acpost? 'render post': 'render acpost')}
                        {cargarPosts(!acpost? posts: acpost)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileMain