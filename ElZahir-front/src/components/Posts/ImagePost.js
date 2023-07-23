import { useQuery } from '@tanstack/react-query'

import PostHeader  from '../Post/PostHeader'
import PostContent from '../Post/PostContent'
import PostTitle   from '../Post/PostTitle'
import PostFooter  from '../Post/PostFooter'

import { getCurrentUser } from '../../services/userServices'

import style from '../../styles/post.module.css'

const ImagePost = ({
    post, 
    mode,
    liked, 
    loading, 
    setToFront,
    p, 
    visibility, 
    setVisibility
  })=> {

  const {data: {data: user} = {}} = useQuery({queryKey: ['ME'], queryFn: getCurrentUser,})

  return (
    <div className={!visibility? `${style.post} ${style.figure} ${style.shadows} ${style['mobile-post']}` : `${style.post} ${style.figure}`}>
      <PostHeader post={post} mode={mode} />
      <PostContent post={post} />
      <PostTitle post={post} />
      <PostFooter loading={loading} p={p} liked={liked} user={user} post={post} mode={mode} visibility={visibility} setVisibility={setVisibility} setToFront={setToFront}/>
    </div>
  )
}

export default ImagePost