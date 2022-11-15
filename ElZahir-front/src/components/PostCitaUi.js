import axios from "axios"
import { useState } from "react"
import baseURL from '../services/baseURL'

const PostCita = ({className, onClick, setUser})=> {
    let [author, setAuthor] = useState('')
    let [work, setWork] = useState('')
    let [cita, setCita] = useState('')

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
        axios.post(baseURL.concat("/api/post"), {title: author, subtitle:work, textPost:cita, type: 'cita'}, config)
            .then(() => {
                setAuthor('')
                setWork('')
                setCita('')
                let updateUser = JSON.parse(window.localStorage.getItem('loggedUser'))
                window.localStorage.setItem('loggedUser', JSON.stringify({...updateUser, posts: updateUser.posts + 1}))
                setUser({...user, posts: updateUser.posts + 1})
            })

    }



    return (
        <form className={className} onSubmit={(e=>postear(e))}>
            <div className="postText-inputs">
                <input required className="postText-input" id="postText-title" placeholder="Author" onChange={(e)=> setAuthor(e.target.value)} value={author} autoComplete='off'/>
                <input required className="postText-input" id="postText-sub" placeholder="Work" onChange={(e)=> setWork(e.target.value)} value={work} autoComplete='off'/>
                <textarea required className="postText-input" id="postText-url" placeholder="Cita" onChange={(e)=> setCita(e.target.value)} value={cita} autoComplete='off'/>
            </div>



            <div className="postText-botones">
                <button className='postText-button pointer' type="button" onClick={()=>onClick({type: 'none', post:null})} >CLOSE</button>
                <button type="submit" className="postText-button pointer" >POST</button>
            </div>
        </form>
    )
}

export default PostCita