import axios from "axios"
import { useState } from "react"

const PostCita = ({className, onClick})=> {
    let [author, setAuthor] = useState('')
    let [work, setWork] = useState('')
    let [cita, setCita] = useState('')

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
        axios.post("http://localhost:3001/api/post" , {title: author, subtitle:work, textPost:cita, type: 'cita'}, config)
            .then(() => {
                setAuthor('')
                setWork('')
                setCita('')
            })

    }



    return (
        <div className={className}>
            <div className="postText-inputs">
                <input className="postText-input" id="postText-title" placeholder="Author" onChange={(e)=> setAuthor(e.target.value)} value={author} autoComplete='off'/>
                <input className="postText-input" id="postText-sub" placeholder="Work" onChange={(e)=> setWork(e.target.value)} value={work} autoComplete='off'/>
                <textarea className="postText-input" id="postText-url" placeholder="Cita" onChange={(e)=> setCita(e.target.value)} value={cita} autoComplete='off'/>
            </div>



            <div className="postText-botones">
                <button className='postText-button pointer' type="button" onClick={()=>onClick('none')} >CLOSE</button>
                <button className="postText-button pointer" onClick={postear} >POST</button>
            </div>
        </div>
    )
}

export default PostCita