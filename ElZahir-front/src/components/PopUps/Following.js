
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { getUserList } from '../../services/userServices'

import style from '../../styles/popups.module.css'

const Followers = ({setPopUp, user})=> {

    const {data: {data: users} = {}, isLoading} = useQuery({
        queryKey: ["GET_USER_LIST"], 
        queryFn: async ()=> await getUserList()
    })

    const following = users?.filter(person => user.following.includes(person.id))

    const loadUserList = (list)=> {

        if (!list) return

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
                <span className='followers-header-title'>Followers: </span>
                {isLoading && <div className={ `${style.loading} ${style['little-loading']}` } >{" "}</div>}
                {!isLoading && <span>{following.length}</span>}
            </div>
            <div className={style['list-container']}>
                {loadUserList(following)}
            </div>
            
        </div>
    )
}


export default Followers