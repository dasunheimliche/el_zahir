import { useEffect } from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'

import { getCurrentUser, getUserList } from '../services/userServices'
import { LARGE_WIDTH, MEDIUM_WIDTH }   from '../services/constants'

import { ProfileDropdown, SearchUsersInput, ZahirLogo } from './HeaderModule'

import style from '../styles/header.module.css'

const HeaderWrapper = ( {children, mode, sticky, toFront})=> {

    return(
        <div className={(mode === "desktop")? style['desktop-bar'] : style['mobile-bar']}>
            <div className={sticky? `${style.bar} ${style['sticky-bar']}`: style.bar} style={toFront? {display: `none`} : {}}>
                {children}
            </div>
        </div>  
    )
}

const Header = ({sticky, setSticky, toFront, mode})=> {

    const queryClient = useQueryClient()

    const {data: {data: me} = {}} = useQuery({queryKey: ['ME'], queryFn: getCurrentUser,})
    const {data: {data: searchResults} = {}} = useQuery({queryKey: ["GET_USER_LIST"], queryFn: getUserList,})
    
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
        <HeaderWrapper mode={mode} sticky={sticky} toFront={toFront}>
            <div className={style['left-side']}>
                <ZahirLogo />
                <SearchUsersInput me={me} searchResults={searchResults} />
            </div>
            <div className={`${style['right-side']}`}>
                <ProfileDropdown me={me} queryClient={queryClient} />
            </div>
        </HeaderWrapper>
    )
}

export default Header