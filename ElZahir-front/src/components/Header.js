import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { getCurrentUser, getUserList } from '../services/userServices'
import { LARGE_WIDTH, MEDIUM_WIDTH }   from '../services/constants'

import style from '../styles/header.module.css'
import logo from '../icons/search.png'

const Header = ({sticky, setSticky, toFront, mode})=> {

    let [isMenuOpen,    setIsMenuOpen   ] = useState(false)
    let [searchQuery,   setSearchQuery  ] = useState('')

    const queryClient = useQueryClient()
    const navigate    = useNavigate()
    const searchRef   = useRef()

    const {data: {data: me} = {}} = useQuery({queryKey: ['ME'], queryFn: getCurrentUser,})
    const {data: {data: searchResults} = {}} = useQuery({queryKey: ["GET_USER_LIST"], queryFn: getUserList,})

    const showSearchResult = ()=> {
        if (!searchResults) return
        if (searchQuery <= 0) return

        const validResults = searchResults.filter(user => user.username.toLowerCase().startsWith(searchQuery.toLowerCase()))

        if (validResults <= 0 ) return

        return validResults.map((res,i)=> {
            if (me.userId === res.id) {
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

    const clearSearch = ()=> {
        setSearchQuery('')
        searchRef.current.value = ''
    }

    const toggleUserMenu = ()=> {
        setIsMenuOpen(!isMenuOpen)
    }

    const signOffHandler = async()=> {
        window.localStorage.clear()
        queryClient.removeQueries()
        navigate("/")
    }
    
    const handleScroll = () => {
        const stickyValue =
            window.innerWidth > LARGE_WIDTH ? 62 :
            window.innerWidth <= MEDIUM_WIDTH ? 42 :
            50;
      
        setSticky(window.scrollY >= stickyValue && !sticky);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, []) // eslint-disable-line

    return (

        <div className={(mode === "desktop")? style['desktop-bar'] : style['mobile-bar']}>
            <div className={sticky? `${style.bar} ${style['sticky-bar']}`: style.bar} style={toFront? {display: `none`} : {}}>
                <div className={style['left-side']}>
                    <Link className='linknostyle' to={`/home`}>
                        <div className='logo'>Zahir.</div>
                    </Link>
            
                    <div className={style.search}>
                        <img className={style['search-img']} alt='searchicon' src={logo} />
                        <input ref={searchRef} className={style['search-input']} type={'text'} placeholder={'@user'} onChange={(e)=> setSearchQuery(e.target.value)}/>
                        <div className={showSearchResult()? style['user-list'] : `${style[`user-list`]} invisible`}>
                            {showSearchResult()}
                        </div>
                    </div>
            
                </div>
            
                <div className={`${style['right-side']}`}>
                    <div className={!isMenuOpen? style['user-container'] : `${style['user-container']} ${style['expanded-user-menu']}`} onClick={toggleUserMenu}>
                        <div className={style.user}>
                            <div style={{'backgroundImage':`url(${me.profileImg})`}} className={style['user-logo']}></div>
                            <div className={style.username}>{me.username}</div>
                        </div>
                        <div className={isMenuOpen? style['user-menu'] : `${style['user-menu']} invisible`}>
                            <span className={style.signOff} onClick={signOffHandler}>Log Off</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>     

    )
}

export default Header