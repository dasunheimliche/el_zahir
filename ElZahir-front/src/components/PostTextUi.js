import axios from "axios"
import { useState } from "react"
import baseURL from '../services/baseURL'

import { userSlice} from '../reducers/userSlice'
import { useDispatch} from 'react-redux'

import textButton from '../icons/textButton.png'

const PostText = ({setSeeOpt})=> {
    let [title, setTitle] = useState('')
    let [text, setText] = useState('')

    let [loading, setLoading] = useState(false)

    let dispatch = useDispatch()

    const postear = (e)=> {
        setLoading(true)
        e.preventDefault()
        let user = JSON.parse(window.localStorage.getItem('loggedUser'))
        let token = `Bearer ${user.token}`

        let config = {
            headers: {
                Authorization: token
            }
        }
        axios.post(baseURL.concat("/api/post") , {title: title, textPost:text, type: 'text'}, config)
            .then(savedPost => {
                setText('')
                setTitle('')
                setLoading(false)
                let updateUser = JSON.parse(window.localStorage.getItem('loggedUser'))
                updateUser = {...updateUser, posts: updateUser.posts.concat(savedPost.data.id)}
                window.localStorage.setItem('loggedUser', JSON.stringify({...updateUser}))
                dispatch(userSlice.actions.update({...updateUser}))
            })

    }

    const not = (e)=> {
        e.preventDefault()
    }


    return (
        <form className={'post-text'} onSubmit={loading? e=>not(e) : e=>postear(e)}>
            <div class="postUI-header">
                <img className="postUI-header-img" src={textButton} alt="text-button"></img>
            </div>
            <div className="postText-inputs">
                <input required className="postText-input" id="postText-title" placeholder="Title" onChange={(e)=> setTitle(e.target.value)} value={title} autoComplete='off'/>
                <textarea required className="postText-input" id="postText-url" placeholder="Text" onChange={(e)=> setText(e.target.value)} value={text} autoComplete='off'/>
            </div>
            <div className="postText-botones">
                <div className="loadingGif" style={loading? {display: "block"} : {display: "none"}}></div>
                <button className='postUI-button pointer' type="button" onClick={()=>setSeeOpt({type: 'none', post: null})} >CLOSE</button>
                <button className="postUI-button pointer" type="submit" >POST</button>
            </div>
        </form>
    )
}

export default PostText