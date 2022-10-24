import axios from "axios"
import { useState } from "react"

const PostText = ({className, onClick})=> {
    let [title, setTitle] = useState('')
    let [text, setText] = useState('')

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
        axios.post("http://localhost:3001/api/post" , {title: title, textPost:text, type: 'text'}, config)
            .then(() => {
                setText('')
                setTitle('')
            })

    }



    return (
        <div className={className}>
            <div className="postText-inputs">
                <input className="postText-input" id="postText-title" placeholder="Title" onChange={(e)=> setTitle(e.target.value)} value={title} autoComplete='off'/>
                <textarea className="postText-input" id="postText-url" placeholder="Text" onChange={(e)=> setText(e.target.value)} value={text} autoComplete='off'/>
            </div>
            <div className="postText-botones">
                <button className='postText-button pointer' type="button" onClick={()=>onClick('none')} >CLOSE</button>
                <button className="postText-button pointer" onClick={postear} >POST</button>
            </div>
        </div>
    )
}

export default PostText