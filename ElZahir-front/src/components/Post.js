

import '../components/post.css'

import TextPost from '../components/TextPost'
import CitaPost from '../components/CitaPost'
import ImagePost from '../components/ImagePost'
import VideoPost from '../components/VideoPost'


const Post = ({post, mode, user, setUser, postF, setSeeOpt})=> {

    if (post.type === "image") {
        return (
            <ImagePost post={post} mode={mode} user={user} setUser={setUser} postF={postF} setSeeOpt={setSeeOpt} />
        )
    }
    if (post.type === "text") {
        return (
            <TextPost post={post} mode={mode} user={user} setUser={setUser} postF={postF} setSeeOpt={setSeeOpt} />
        )
    }
    if (post.type === "cita") {
        return(
            <CitaPost post={post} mode={mode} user={user} setUser={setUser} postF={postF} setSeeOpt={setSeeOpt} />
        )
    }
    if (post.type === "video") {
        return(
            <VideoPost post={post} mode={mode} user={user} setUser={setUser} postF={postF} setSeeOpt={setSeeOpt} />
        )
    }
}

export default Post