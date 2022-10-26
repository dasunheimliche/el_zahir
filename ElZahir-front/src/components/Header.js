import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../icons/search.png'


const Header = ({user, setUser, sticky, setSticky, setSuser})=> {
    let [see, setSee] = useState(false)
    let [search, setSearch] = useState('')
    let [results, setResults] = useState([])

    useEffect(()=> {
        axios.get('http://localhost:3001/api/users')
            .then(users => {
                if (search.length > 0) {
                    let usuarios = users.data
                    let result =  usuarios.filter(user => user.username.startsWith(search))
                    setResults(result)
                } else {
                    setResults([])
                }
            })    
    }, [search])
    

    useEffect(()=> {
        window.addEventListener('scroll', ()=> {
            return (window.scrollY >= 125 && sticky === false)? setSticky(true): console.log()
        })
        
        window.addEventListener('scroll', ()=> {
            return (window.scrollY < 125)? setSticky(false): console.log()
        })
    }, [])

    let searchRef = useRef()
    console.log("SEARCH REFFFF:", searchRef)


    let suserfun = (suser)=> {
        axios.get('http://localhost:3001/api/post')
                .then(posts => {
                    let postslist = posts.data.filter(post => post.user[0] === suser.id)
                    window.localStorage.setItem('currentSuser', JSON.stringify({posts: postslist.reverse(), id:suser.id, username: suser.username, following: suser.following, followers: suser.followers}))
                    setSuser({posts: postslist.reverse(), id:suser.id, username: suser.username, following: suser.following, followers: suser.followers})
                    setSearch('')
                    searchRef.current.value = ''
                })

        
    }


    const showRes = ()=> {
        console.log(results)
        
        return results.map((res,i)=> {
            console.log("RESSSSS", res)
            if (user.userId === res.id) {
                return (
                    <Link className='linknostyle' key={i} to={`/${user.username}/`}>
                        <div className='pointer' onClick={()=> suserfun(res)}>{res.username}</div>
                    </Link>
                )
                
            } else {
                return (
                    <Link className='linknostyle' key={i} to={`/${user.username}/userId=${res.id}`}>
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
        window.localStorage.removeItem('loggedUser')
        setUser({...user, loggued:false})
      }

    return (
        <div className="header">
                <div className="header-image"></div>
                <div className={sticky === false? 'header-bar':'header-bar sticky-bar'}>

                    <div className="header-left">

                        <Link className='linknostyle' to={`/${user.username}`}>
                            <div className="logo">El Zahir.</div>
                        </Link>
                        
                        <div className="header-search">
                            <div className="header-icon-search">
                                <img className='header-icon-img' alt="searchicon" src={logo} />
                            </div>
                            <form onChange={()=> {console.log('form changed')}}>
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
                                <div className="h-user-logo"></div>
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