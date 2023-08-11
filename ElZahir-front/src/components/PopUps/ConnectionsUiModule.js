
import { Link } from 'react-router-dom'

import style from '../../styles/popups.module.css'

export function UserTile ({onClick, user, person}) {

    return(
        <Link className='linknostyle' onClick={onClick} to={user.userId === person.id? '/home'  :`/user/${person.id}`}>
            <div className={style.user}>
                <img  className={style['profile-img']} src={person.profileImg} alt='profile-pic' />
                <span className={style.username}>{`@${person.username}`}</span>
            </div>
        </Link>
    )
}
