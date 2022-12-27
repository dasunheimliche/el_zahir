import axios from "axios"
import { useState } from "react"
import baseURL from '../services/baseURL'

const PostText = ({className, setSeeOpt, setUser})=> {
    let [title, setTitle] = useState('')
    let [text, setText] = useState('')

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
        axios.post(baseURL.concat("/api/post") , {title: title, textPost:text, type: 'text'}, config)
            .then(() => {
                setText('')
                setTitle('')
                let updateUser = JSON.parse(window.localStorage.getItem('loggedUser'))
                window.localStorage.setItem('loggedUser', JSON.stringify({...updateUser, posts: updateUser.posts + 1}))
                setUser({...user, posts: updateUser.posts + 1})
            })

    }



    return (
        <form className={className} onSubmit={(e)=>postear(e)}>
            <div className="postText-inputs">
                <input required className="postText-input" id="postText-title" placeholder="Title" onChange={(e)=> setTitle(e.target.value)} value={title} autoComplete='off'/>
                <textarea required className="postText-input" id="postText-url" placeholder="Text" onChange={(e)=> setText(e.target.value)} value={text} autoComplete='off'/>
            </div>
            <div className="postText-botones">
                <button className='postText-button pointer' type="button" onClick={()=>setSeeOpt({type: 'none', post: null})} >CLOSE</button>
                <button type="submit" className="postText-button pointer" >POST</button>
            </div>
        </form>
    )
}

export default PostText