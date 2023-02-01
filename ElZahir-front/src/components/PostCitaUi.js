import axios from "axios"
import { useState } from "react"
import baseURL from '../services/baseURL'

import { userSlice} from '../reducers/userSlice'
import { useDispatch} from 'react-redux'

import citaButton from '../icons/citaButton.png'

const PostCita = ({setSeeOpt})=> {
    let [author, setAuthor] = useState('')
    let [work, setWork] = useState('')
    let [cita, setCita] = useState('')

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
        axios.post(baseURL.concat("/api/post"), {title: author, subtitle:work, textPost:cita, type: 'cita'}, config)
            .then(savedPost => {
                setLoading(false)
                setAuthor('')
                setWork('')
                setCita('')
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
                <img className="postUI-header-img" src={citaButton} alt="text-button"></img>
            </div>

            <div className="postText-inputs">
                <input required className="postText-input" id="postText-title" placeholder="Author" onChange={(e)=> setAuthor(e.target.value)} value={author} autoComplete='off'/>
                <input required className="postText-input" id="postText-sub" placeholder="Work" onChange={(e)=> setWork(e.target.value)} value={work} autoComplete='off'/>
                <textarea required className="postText-input" id="postText-url" placeholder="Cita" onChange={(e)=> setCita(e.target.value)} value={cita} autoComplete='off'/>
            </div>

            <div className="postText-botones">
                <div className="loadingGif" style={loading? {display: "block"} : {display: "none"}}></div>
                <button className='postUI-button pointer' type="button" onClick={()=>setSeeOpt({type: 'none', post:null})} >CLOSE</button>
                <button className="postUI-button pointer" type="submit"  >POST</button>
            </div>
        </form>
    )
}

export default PostCita