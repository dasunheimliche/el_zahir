import style from '../styles/home.module.css'

import { useNavigate, useParams } from 'react-router-dom'


const Tabs = ({ sticky })=> {

    const navigate        = useNavigate()
    const {"*": segment}  = useParams()

    const toFollowing = ()=> {
        navigate('/home/following')
    }

    const toHome = ()=> {
        navigate('/home')
    }

    const toDiscover = ()=> {
        navigate('/home/discover')
    }

    return(
        <div className={sticky? `${style.tabs} ${style['sticky-tabs']}` : style.tabs}>
            <span onClick={toHome}       className={segment === ''?          `${style.tab} ${style['neonText']} p` : `${style.tab} p`}>ME</span>
            <span onClick={toFollowing}  className={segment === 'following'? `${style.tab} ${style['neonText']} p` : `${style.tab} p`}>FOLLOWING</span>
            <span onClick={toDiscover}   className={segment === 'discover'?  `${style.tab} ${style['neonText']} p` : `${style.tab} p`}>EXPLORE</span>
        </div>
    )
}

export default Tabs