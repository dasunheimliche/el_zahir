
// import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { getUserList } from '../../services/userServices'

import { UserTile } from './ConnectionsUiModule'

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
            return <UserTile key={i} onClick={()=>setPopUp({type:'none', post:null})} user={user} person={person}/>
            
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