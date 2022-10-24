import axios from "axios"
import { useState } from "react"

const PostVideo = ({className, onClick})=> {
    let [url, setUrl] = useState('')
    let [title, setTitle] = useState('')
    let [sub, setSub] = useState('')
    let [ar, setAr] = useState('')

    const postear = ()=> {
        let user = JSON.parse(window.localStorage.getItem('loggedUser'))
        console.log(user)
        let token = `Bearer ${user.token}`
        console.log(token, typeof(token))

        let config = {
            headers: {
                Authorization: token
            }
        }
        axios.post("http://localhost:3001/api/post" , {title: title, subtitle:sub, videoPost:url,videoAr: ar, type: 'video'}, config)
            .then(() => {
                setUrl('')
                setTitle('')
                setSub('')
            })

    }

    return (
        <div className={className}>
            <div className="postImage-inputs">
                <input className="postImage-input" id="postImage-title" placeholder="Title" onChange={(e)=> setTitle(e.target.value)} value={title} autoComplete='off'/>
                <input className="postImage-input" id="postImage-sub" placeholder="Description" onChange={(e)=> setSub(e.target.value)} value={sub} autoComplete='off'/>
                <input className="postImage-input" id="postImage-ar" placeholder="Aspect ratio" onChange={(e)=> setAr(e.target.value)} value={ar} autoComplete='off'/>
                <textarea className="postImage-input" id="postImage-url" placeholder="URL" onChange={(e)=> setUrl(e.target.value)} value={url} autoComplete='off'/>
            </div>
            <div className="postImage-botones">
                <button className='postImage-button pointer' type="button" onClick={()=>onClick('none')} >CLOSE</button>
                <button className="postImage-button pointer" onClick={postear} >POST</button>
            </div>
        </div>
    )
}

export default PostVideo