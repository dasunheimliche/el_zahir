
import { useEffect, useState } from 'react'
import baseURL from '../../services/baseURL'
import getConfig from '../../services/getConfig'

import axios from 'axios'
import { Link } from 'react-router-dom'

import style from '../../styles/popups.module.css'


const Following = ({setPopUp, user})=> {
    
    let [users, setUsers] = useState([])
    let [loading, setLoading] = useState(true)
    // let user = useSelector(state => state.user.value)
    // let params = useParams()

    useEffect(()=> {
        axios.get(baseURL.concat('/api/users'), getConfig())
        .then(users => {
            
            if (user.followers) {
                // const user = users.data.find(person => person.id === params["*"])
                let followers = users.data.filter(person => user.followers.includes(person.id))
                setUsers(followers)
            } else {
                let followers = users.data.filter(person => user.followers.includes(person.id))
                setUsers(followers)
            }

            setLoading(false)

        })
    }, []) // eslint-disable-line

    const loadUserList = (list)=> {

        return list.map((person, i) => {
            return (
                <Link className='linknostyle' onClick={()=>setPopUp({type:'none', post:null})} to={user.userId === person.id? '/home'  :`/user/${person.id}`}>
                    <div className={style.user} key={i}>
                        <img  className={style['profile-img']} src={person.profileImg} alt='profile-pic' />
                        <span className={style.username}>{`@${person.username}`}</span>
                    </div>
                </Link>
            )
                
        })
    }

    return(
        <div className={style['user-list']}>
            <div className={style.header}>
                <div className={style.close} onClick={()=>setPopUp({type:'none', post:null})}></div>
            </div>
            <div className={style.counter}>
                <span>Followers: </span>
                {loading && <div className={ `${style.loading} ${style['little-loading']}` } >{" "}</div>}
                {!loading && <span>{users.length}</span>}
            </div>
            <div className={style['list-container']}>
                {loadUserList(users)}
            </div>
            
        </div>
    )
}

export default Following