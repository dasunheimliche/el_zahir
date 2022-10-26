import axios from "axios"
import { useState } from "react"

const PostImage = ({className, onClick, setUser})=> {
    let [url, setUrl] = useState('')
    let [title, setTitle] = useState('')
    let [sub, setSub] = useState('')

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
        axios.post("http://localhost:3001/api/post" , {title: title, subtitle:sub, imagePost:url, type: 'image'}, config)
            .then(() => {
                setUrl('')
                setTitle('')
                setSub('')
                let updateUser = JSON.parse(window.localStorage.getItem('loggedUser'))
                console.log("UPDATE USERRR WHEN POSTIIIIIN", updateUser.posts)
                window.localStorage.setItem('loggedUser', JSON.stringify({...updateUser, posts: updateUser.posts + 1}))
                setUser({...user, posts: updateUser.posts + 1})
            })

    }

    return (
        <div className={className}>
            <div className="postImage-inputs">
                <input className="postImage-input" id="postImage-title" placeholder="Title" onChange={(e)=> setTitle(e.target.value)} value={title} autoComplete='off'/>
                <input className="postImage-input" id="postImage-sub" placeholder="Description" onChange={(e)=> setSub(e.target.value)} value={sub} autoComplete='off'/>
                <textarea className="postImage-input" id="postImage-url" placeholder="URL" onChange={(e)=> setUrl(e.target.value)} value={url} autoComplete='off'/>
            </div>
            <div className="postImage-botones">
                <button className='postImage-button pointer' type="button" onClick={()=>onClick('none')} >CLOSE</button>
                <button className="postImage-button pointer" onClick={postear} >POST</button>
            </div>
        </div>
    )
}

export default PostImage