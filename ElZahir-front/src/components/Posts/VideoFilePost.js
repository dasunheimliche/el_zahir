import { useSelector} from 'react-redux'
import style from '../../styles/post.module.css'
import PostHeader from '../Post/PostHeader'
import PostContent from '../Post/PostContent'
import PostTitle from '../Post/PostTitle'
import PostFooter from '../Post/PostFooter'

const VideoFilePost = ({post, mode,
    liked, loading, setToFront,
    p, visibility, setVisibility})=> {

    let user = useSelector(state => state.user.value)

    return  (
        <div className={!visibility? `${style.post} ${style.figure} ${style.shadows} ${style['mobile-post']}` : `${style.post} ${style.figure}`}>
            <PostHeader post={post} mode={mode} />
            <PostContent post={post}/>
            <PostTitle post={post} />
            <PostFooter loading={loading} p={p} liked={liked} user={user} post={post} mode={mode} visibility={visibility} setVisibility={setVisibility} setToFront={setToFront}/>
        </div>
    )
}

export default VideoFilePost