

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import baseURL from '../services/baseURL'
import getConfig from '../services/getConfig'


import axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import style from '../styles/popups.module.css'


const Followers = ({setPopUp})=> {

    let [users, setUsers] = useState([])
    let user = useSelector(state => state.user.value)
    let params = useParams()

    // const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'));
    // const token = `Bearer ${loggedUser.token}`;

    // let config = {
    //     headers: {
    //         Authorization: token
    //     }
    // }

    useEffect(()=> {
        axios.get(baseURL.concat('/api/users'), getConfig())
        .then(users => {
            
            if (params["*"]) {
                const user = users.data.find(person => person.id === params["*"])
                let followers = users.data.filter(person => user.following.includes(person.id))
                setUsers(followers)
            } else {
                let followers = users.data.filter(person => user.following.includes(person.id))
                setUsers(followers)
            }

        })
    }, []) // eslint-disable-line

    const loadUserList = (list)=> {

        return list.map((person, i) => {
            return (
                <Link className='linknostyle' to={`/user/${person.id}`}>
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
                <span className='followers-header-number'>{users.length}</span>
            </div>
            <div className={style['list-container']}>
                {loadUserList(users)}
            </div>
            
        </div>
    )
}


export default Followers