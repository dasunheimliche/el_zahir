import { useQuery } from '@tanstack/react-query'

import PostHeader  from '../Post/PostHeader'
import PostContent from '../Post/PostContent'
import PostTitle   from '../Post/PostTitle'
import PostFooter  from '../Post/PostFooter'

import { getCurrentUser } from '../../services/userServices'

import style from '../../styles/post.module.css'

const VidePost = ({
    post, 
    mode,
    liked, 
    loading, 
    p, 
    visibility, 
    setVisibility, 
    setToFront
  })=>{
  
  const {data: {data: user} = {}} = useQuery({queryKey: ['ME'], queryFn: getCurrentUser,})

  let idVideo
  if (post.videoPost.startsWith("https://www.youtube.com/watch?")) {
    idVideo = post.videoPost.replace('https://www.youtube.com/watch?v=',"")
  } else if (post.videoPost.startsWith("https://youtu.be/")) {
    idVideo = post.videoPost.replace('https://youtu.be/',"")
  }

  const urlVideo = `https://www.youtube.com/embed/${idVideo}?playlist=${idVideo}&loop=1`
        
  const aspectr = post.videoAr.split(':')
  const width = Number(aspectr[1])
  const height = Number(aspectr[0])
  const ar = (width/height) * 100
  const defaultAr = (9/16) * 100

  return (
    <div className={!visibility? `${style.post} ${style.figure} ${style.shadows} ${style['mobile-post']}` : `${style.post} ${style.figure}`}>
      <PostHeader post={post} mode={mode} />
      <PostContent post={post} ar={ar} defaultAr={defaultAr} urlVideo={urlVideo} />
      <PostTitle post={post} />
      <PostFooter loading={loading} p={p} liked={liked} user={user} post={post} mode={mode} visibility={visibility} setVisibility={setVisibility} setToFront={setToFront}/>
    </div>
  )
}

export default VidePost