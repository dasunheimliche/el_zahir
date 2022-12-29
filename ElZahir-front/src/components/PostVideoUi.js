import axios from "axios"
import { useEffect, useState } from "react"
import baseURL from '../services/baseURL'

const PostVideo = ({setSeeOpt, setUser})=> {
    let [url, setUrl] = useState('')
    let [title, setTitle] = useState('')
    let [sub, setSub] = useState('')
    let [ar, setAr] = useState('')
    let [error, setError] = useState('idle')


    const copyfromcb = (e)=> {
        e.preventDefault()
        navigator.clipboard.readText()
        .then(text => setUrl(text))
    }

    useEffect(()=> {
        if (!url.includes("youtu")) {
            setError(true)
        } else {
            setError(false)
        }
    }, [url])

    const postear = (e)=> {
        e.preventDefault()
        let user = JSON.parse(window.localStorage.getItem('loggedUser'))
        let token = `Bearer ${user.token}`

        let config = {
            headers: {
                Authorization: token
            }
        }
        axios.post(baseURL.concat("/api/post") , {title: title, subtitle:sub, videoPost:url,videoAr: ar, type: 'video'}, config)
            .then(savedPost => {
                setUrl('')
                setTitle('')
                setSub('')
                setAr('')
                let updateUser = JSON.parse(window.localStorage.getItem('loggedUser'))
                updateUser = {...updateUser, posts: updateUser.posts.concat(savedPost.data.id)}
                window.localStorage.setItem('loggedUser', JSON.stringify({...updateUser}))
                setUser({...updateUser})
            })

    }

    return (
        <form className={'post-video'} onSubmit={error? console.log(): (e)=>postear(e)}>
            <div className="postImage-inputs">
                <input required className="postImage-input" id="postImage-title" placeholder="Title" onChange={(e)=> setTitle(e.target.value)} value={title} autoComplete='off'/>
                <input className="postImage-input" id="postImage-sub" placeholder="Description" onChange={(e)=> setSub(e.target.value)} value={sub} autoComplete='off'/>
                <input className="postImage-input" id="postImage-ar" placeholder="Aspect ratio (Ej.: 16:9) optional" onChange={(e)=> setAr(e.target.value)} value={ar} autoComplete='off'/>
                <textarea required className="postImage-input" id="postImage-url" placeholder="URL" onChange={(e)=> setUrl(e.target.value)} value={url} autoComplete='off'/>
                {(error && url.length > 0) && <div className="post-invalid">invalid url</div>}

            </div>
            <div className="postImage-botones">
                <button className="postImage-button pointer" onClick={(e)=>copyfromcb(e)} >CLIPBOARD</button>
                <button className='postImage-button pointer' type="button" onClick={()=>setSeeOpt({type: 'none', post: null})} >CLOSE</button>
                <button typeof="submit" className="postImage-button pointer" >POST</button>
            </div>
        </form>
    )
}

export default PostVideo