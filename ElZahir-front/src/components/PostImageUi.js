import axios from "axios"
import { useState } from "react"
import baseURL from '../services/baseURL'

const PostImage = ({className, onClick, setUser})=> {
    let [url, setUrl] = useState('')
    let [title, setTitle] = useState('')
    let [sub, setSub] = useState('')

    // let baseURL = "http://localhost:3001"
    // let baseURL = ""

    const postear = (e)=> {
        e.preventDefault()
        let user = JSON.parse(window.localStorage.getItem('loggedUser'))
        let token = `Bearer ${user.token}`

        let config = {
            headers: {
                Authorization: token
            }
        }
        axios.post(baseURL.concat("/api/post") , {title: title, subtitle:sub, imagePost:url, type: 'image'}, config)
            .then(() => {
                setUrl('')
                setTitle('')
                setSub('')
                let updateUser = JSON.parse(window.localStorage.getItem('loggedUser'))
                window.localStorage.setItem('loggedUser', JSON.stringify({...updateUser, posts: updateUser.posts + 1}))
                setUser({...user, posts: updateUser.posts + 1})
            })

    }

    return (
        <form className={className} onSubmit={(e=>postear(e))}>
            <div className="postImage-inputs">
                <input required className="postImage-input" id="postImage-title" placeholder="Title" onChange={(e)=> setTitle(e.target.value)} value={title} autoComplete='off'/>
                <input required className="postImage-input" id="postImage-sub" placeholder="Description" onChange={(e)=> setSub(e.target.value)} value={sub} autoComplete='off'/>
                <textarea required className="postImage-input" id="postImage-url" placeholder="URL" onChange={(e)=> setUrl(e.target.value)} value={url} autoComplete='off'/>
            </div>
            <div className="postImage-botones">
                <button className='postImage-button pointer' type="button" onClick={()=>onClick({type: 'none', post: null})} >CLOSE</button>
                <button className="postImage-button pointer" >POST</button>
            </div>
        </form>
    )
}

export default PostImage