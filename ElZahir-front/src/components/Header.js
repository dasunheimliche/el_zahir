import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../icons/search.png'
import baseURL from '../services/baseURL'
import getConfig from '../services/getConfig'

import { useSelector, useDispatch} from 'react-redux'
import { userSlice} from '../reducers/userSlice'

import style from '../styles/header.module.css'

const SEARCH_URL = `${baseURL}/api/users`;
const LARGE_WIDTH = 1600;
const MEDIUM_WIDTH = 1366;

const Header = ({sticky, setSticky, toFront})=> {
    let [isMenuOpen,    setIsMenuOpen   ] = useState(false)
    let [searchQuery,   setSearchQuery  ] = useState('')
    let [searchResults, setSearchResults] = useState([])

    let user = useSelector(state => state.user.value)
    
    let dispatch = useDispatch()
    let searchRef = useRef()

    const searchUsers = async (query) => {

        try {
            const { data : users } = await axios.get(SEARCH_URL, getConfig());
            // Debería hacer lo siguiente en el backend, en lugar de aquí
            const results = query.length > 0
                ? users.filter(user => user.username.toLowerCase().startsWith(query.toLowerCase()))
                : [];
      
            setSearchResults(results);
        } catch (error) {
            console.error(error);
        }
    };

    const handleScroll = () => {
        const stickyValue =
            window.innerWidth > LARGE_WIDTH ? 62 :
            window.innerWidth <= MEDIUM_WIDTH ? 42 :
            50;
      
        setSticky(window.scrollY >= stickyValue && !sticky);
      };

    useEffect(() => {
        searchUsers(searchQuery)
    }, [searchQuery])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, []) // eslint-disable-line

    let clearSearch = ()=> {
        setSearchQuery('')
        searchRef.current.value = ''
    }

    const showSearchResult = ()=> {
        return searchResults.map((res,i)=> {
            if (user.userId === res.id) {
                return (
                    <Link className='linknostyle' key={i} to={`/home/`}>
                        <div className='p' onClick={clearSearch}>{res.username}</div>
                    </Link>
                )
            } else {
                return (
                    <Link className='linknostyle' key={i} to={`/user/${res.id}`}>
                        <div className='p' onClick={clearSearch}>{res.username}</div>
                    </Link>
                )
            }
        })
    }

    const toggleUserMenu = ()=> {
        setIsMenuOpen(!isMenuOpen)
    }

    let handlerSignOff = ()=> {
        window.localStorage.clear()
        dispatch(userSlice.actions.update({...user, loggued:false}))
    }

    return (

        <div className={sticky? `${style.bar} ${style['sticky-bar']}`: style.bar} style={toFront? {display: `none`} : {}}>

            <div className={style['left-side']}>

                <Link className='linknostyle' to={`/home`}>
                    <div className='logo'>Zahir.</div>
                </Link>
                        
                <div className={style.search}>
                    <img className={style['search-img']} alt='searchicon' src={logo} />
                    <input ref={searchRef} className={style['search-input']} type={'text'} placeholder={'@user'} onChange={(e)=> setSearchQuery(e.target.value)}/>
                    <div className={searchResults.length > 0? style['user-list'] : `${style[`user-list`]} invisible`}>
                        {showSearchResult()}
                    </div>    
                </div>
                
            </div>
                    
            <div className={`${style['right-side']}`}>
                <div className={!isMenuOpen? style['user-container'] : `${style['user-container']} ${style['expanded-user-menu']}`} onClick={toggleUserMenu}>
                    <div className={style.user}>
                        <div style={{'backgroundImage':`url(${user.profileImg})`}} className={style['user-logo']}></div>
                        <div className={style.username}>{user.username}</div>
                    </div>
                    <div className={isMenuOpen? style['user-menu'] : `${style['user-menu']} invisible`}>
                        <span className={style.signOff} onClick={handlerSignOff}>Log Off</span>
                    </div>
                </div>
            </div>
        </div>     

    )
}

export default Header