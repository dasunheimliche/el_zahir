import style from '../styles/home.module.css'

import { useNavigate } from 'react-router-dom'


const Tabs = ({sticky, tab, setTab})=> {

    const navigate = useNavigate()

    const toFollowing = ()=> {
        setTab('following')
        navigate('/home/following')
    }

    const backtome = async()=> {
        setTab("me")
        navigate('/home')
    }

    const toDiscover = ()=> {
        setTab('discover')
        navigate('/home/discover')
    }

    return(
        <div className={sticky? `${style.tabs} ${style['sticky-tabs']}` : style.tabs}>
            <span onClick={backtome}     className={tab === 'me'?        `${style.tab} ${style['neonText']} p` : `${style.tab} p`}>ME</span>
            <span onClick={toFollowing}  className={tab === 'following'? `${style.tab} ${style['neonText']} p` : `${style.tab} p`}>FOLLOWING</span>
            <span onClick={toDiscover}   className={tab === 'discover'?  `${style.tab} ${style['neonText']} p` : `${style.tab} p`}>EXPLORE</span>
        </div>
    )
}

export default Tabs