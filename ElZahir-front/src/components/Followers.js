
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import baseURL from '../services/baseURL'

import axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'


const Following = ({setSeeOpt})=> {
    
    let [users, setUsers] = useState([])
    let user = useSelector(state => state.user.value)

    let params = useParams()

    useEffect(()=> {
        axios.get(baseURL.concat('/api/users'))
        .then(users => {
            
            if (params["*"]) {
                const user = users.data.find(person => person.id === params["*"])
                console.log("USERRRRRRRRRRRRRRRRRRRRRRRR", user)
                let followers = users.data.filter(person => user.followers.includes(person.id))
                setUsers(followers)
            } else {
                let followers = users.data.filter(person => user.followers.includes(person.id))
                setUsers(followers)
            }

        })
    }, [])

    console.log(users)

    const loadUserList = (list)=> {

        return list.map((person, i) => {
            return (
                <Link className='linknostyle' to={`/user/${person.id}`}>
                    <div className='follower' key={i}>
                        <img  className='follower-profile-img' src={person.profileImg} alt='profile-pic' />
                        <span className='follower-username'>{`@${person.username}`}</span>
                    </div>
                </Link>
                )
                
        })
    }

    return(
        <div className='followers-container'>
            <div className="comments-salir-container">
                <div className="comments-salir" onClick={()=>setSeeOpt({type:'none', post:null})}></div>
            </div>
            <div className='followers-header'>
                <span className='followers-header-title'>Followers: </span>
                <span className='followers-header-number'>{users.length}</span>
            </div>
            <div className='followers-list-container'>
                {loadUserList(users)}
            </div>
            
        </div>
    )
}

export default Following