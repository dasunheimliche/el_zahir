import axios from "axios"
import { useState } from "react"
import baseURL from '../services/baseURL'


const ChangePI = ({className, onClick, user, setUser})=> {
    let [url, setUrl] = useState('')

    // let baseURL = "http://localhost:3001"
    // let baseURL = ""

    const postear = ()=> {
        axios.put(baseURL.concat(`/api/users/${user.userId}`), {profileImg: url, mode:'profileImgURL'})
            .then(respuesta => {
                window.localStorage.setItem('loggedUser', JSON.stringify({...user, profileImg: respuesta.data.profileImg}))
                setUser({...user, profileImg: respuesta.data.profileImg})

            })
    }


    return (
        <div className={className}>
            <div className="postImage-inputs">
                <textarea className="postImage-input" id="postImage-url" placeholder="URL" onChange={(e)=> setUrl(e.target.value)} value={url} autoComplete='off'/>
            </div>
            <div className="postImage-botones">
                <button className='postImage-button pointer' type="button" onClick={()=>onClick({type: 'none', post: null})} >CLOSE</button>
                <button className="postImage-button pointer" onClick={postear} >POST</button>
            </div>
        </div>
    )
}

export default ChangePI