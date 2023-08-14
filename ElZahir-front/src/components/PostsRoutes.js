import style from  '../styles/home.module.css'
import { Routes } from 'react-router-dom'

const PostsRoutes = ({children, sticky})=> {

    return(
        <div className={sticky === false? style.grid : `${style.grid} ${style['sticky-grid']}`}>
            <Routes>
                {children}
            </Routes>
        </div>
    )
}

export default PostsRoutes