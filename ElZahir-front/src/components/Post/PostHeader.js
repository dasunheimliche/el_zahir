import style from '../../styles/post.module.css'

import { Link } from 'react-router-dom'


const PostHeader = ({post, mode})=> {

    if (mode === 'user') {
        return(
 
            <div className={style.user}>
                <div className={style['user-profile']}>
                    <img className={style['profile-image']} src={post.profileImg} alt="profile img"></img>
                </div>
                <Link className='linknostyle' to={`/user/${post.user}`}>
                    <div>@{post.username}</div>
                </Link>
            </div>
        )
    } else {
        return null
    }
}

export default PostHeader