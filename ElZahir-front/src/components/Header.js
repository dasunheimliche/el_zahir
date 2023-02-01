import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../icons/search.png'
import baseURL from '../services/baseURL'

import { useSelector, useDispatch} from 'react-redux'
import { userSlice} from '../reducers/userSlice'

const Header = ({sticky, setSticky, setSuser, seeOpt})=> {
    let [see, setSee] = useState(false)
    let [search, setSearch] = useState('')
    let [results, setResults] = useState([])

    let user = useSelector(state => state.user.value)
    let dispatch = useDispatch()

    useEffect(()=> {
        axios.get(baseURL.concat('/api/users'))
            .then(users => {
                if (search.length > 0) {
                    let usuarios = users.data
                    let result =  usuarios.filter(user => user.username.toLowerCase().startsWith(search.toLowerCase()))
                    setResults(result)
                } else {
                    setResults([])
                }
            })    
    }, [search])
    

    useEffect(()=> {

        if (window.innerWidth > 1600) {
            window.addEventListener('scroll', ()=> {
                return (window.scrollY >= 62 && sticky === false)? setSticky(true): console.log()
            })
            
            window.addEventListener('scroll', ()=> {
                return (window.scrollY < 62)?  setSticky(false): console.log()
            })

        } else if (window.innerWidth <= 1366 ) {
            window.addEventListener('scroll', ()=> {
                return (window.scrollY >= 42 && sticky === false)? setSticky(true): console.log()
            })
            
            window.addEventListener('scroll', ()=> {
                return (window.scrollY < 42)?  setSticky(false): console.log()
            })

        } else if (window.innerWidth <= 1600 && window.innerWidth > 1366) {
            window.addEventListener('scroll', ()=> {
                return (window.scrollY >= 50 && sticky === false)? setSticky(true): console.log()
            })
            
            window.addEventListener('scroll', ()=> {
                return (window.scrollY < 50)?  setSticky(false): console.log()
            })
        }

        
    }, [])

    let searchRef = useRef()

    // SUSER ABAJO ES UN USUARIO DE

    let suserfun = (suser)=> {

        axios.get(baseURL.concat('/api/post'))
                .then(posts => {
                    let postslist = posts.data.filter(post => post.user === suser.id)
                    window.localStorage.setItem('currentSuser', JSON.stringify({posts: postslist.reverse(), id:suser.id, username: suser.username, following: suser.following, followers: suser.followers, profileImg: suser.profileImg, mainPanelImg:suser.mainPanelImg}))
                    setSuser({posts: postslist.reverse(), id:suser.id, username: suser.username, following: suser.following, followers: suser.followers, profileImg: suser.profileImg, mainPanelImg:suser.mainPanelImg})
                    setSearch('')
                    searchRef.current.value = ''
                })

        
    }


    const showRes = ()=> {
        
        return results.map((res,i)=> {
            if (user.userId === res.id) {
                return (
                    <Link className='linknostyle' key={i} to={`/home/`}>
                        <div className='pointer' onClick={()=> suserfun(res)}>{res.username}</div>
                    </Link>
                )
                
            } else {
                return (
                    <Link className='linknostyle' key={i} to={`/user/${res.id}`}>
                        <div className='pointer' onClick={()=> suserfun(res)}>{res.username}</div>
                    </Link>
                )
            }
        })
    }




    const notsee = ()=> {
        setSee(!see)
    }

    let salir = ()=> {
        window.localStorage.clear()
        dispatch(userSlice.actions.update({...user, loggued:false}))
      }

    return (
        <div className={!seeOpt.post? "header" : "header notvisible"}>
                <div className="header-image"></div>
                <div className={sticky === false? 'header-bar':'header-bar sticky-bar'}>

                    <div className="header-left">

                        <Link className='linknostyle' to={`/home`}>
                            <div className="logo">Zahir.</div>
                        </Link>
                        
                        <div className="header-search">
                            <div className="header-icon-search">
                                <img className='header-icon-img' alt="searchicon" src={logo} />
                            </div>
                            <form>
                                <input ref={searchRef} className={'header-input'} type={'text'} placeholder={'buscar'} onChange={(e)=> setSearch(e.target.value)}/>
                                <div className={results.length > 0? 'search-opt' : 'search-opt notvisible'}>
                                    {showRes()}
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    <div className="header-right pointer">
                        <div className={!see? 'header-user-menu': 'header-user-menu expanded header-user-menu-s'} onClick={notsee}>
                            <div className="header-user">
                                <div style={{"backgroundImage":`url(${user.profileImg})`}} className="h-user-logo"></div>
                                <div className="h-user-name">{user.username}</div>
                            </div>
                            <div className={see? 'header-user-opt': 'header-user-opt notvisible'}>
                                <span className="signoff" onClick={salir}>Salir</span>
                            </div>
                        </div>
                    </div>
                </div>     
            </div>
    )
}

export default Header