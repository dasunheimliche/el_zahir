import axios from "axios"
import { useEffect, useState } from "react"
import baseURL from '../services/baseURL'

import { userSlice} from '../reducers/userSlice'
import { useDispatch} from 'react-redux'

import videoButton from '../icons/videoButton.png'

const PostVideo = ({setSeeOpt})=> {
    let [mode, setMode] = useState('idle')

    let [url, setUrl] = useState('')
    let [title, setTitle] = useState('')
    let [sub, setSub] = useState('')
    let [ar, setAr] = useState('')
    let [error, setError] = useState(false)

    let [loading, setLoading] = useState(false)
    let [file, setFile] = useState(false)

    let dispatch = useDispatch()

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
        setLoading(true)
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
                setLoading(false)
                setUrl('')
                setTitle('')
                setSub('')
                setAr('')
                let updateUser = JSON.parse(window.localStorage.getItem('loggedUser'))
                updateUser = {...updateUser, posts: updateUser.posts.concat(savedPost.data.id)}
                window.localStorage.setItem('loggedUser', JSON.stringify({...updateUser}))
                dispatch(userSlice.actions.update({...updateUser}))

            })

    }

    const not = (e)=> {
        e.preventDefault()
    }

    let fileForm
    let upload

    return (
        <form className={'post-video'} onSubmit={error? e=>not(e): loading? e=>not(e) : e=>postear(e)}>
            <div class="postUI-header">
                <img id="postUI-image-button" className="postUI-header-img" src={videoButton} alt="text-button"></img>
            </div>
            <div className="postImage-inputs">
                <input required className="postImage-input" id="postImage-title" placeholder="Title" onChange={(e)=> setTitle(e.target.value)} value={title} autoComplete='off'/>
                <input className="postImage-input" id="postImage-sub" placeholder="Description" onChange={(e)=> setSub(e.target.value)} value={sub} autoComplete='off'/>
                <input className="postImage-input" id="postImage-ar" placeholder="Aspect ratio (Ej.: 16:9) optional" onChange={(e)=> setAr(e.target.value)} value={ar} autoComplete='off'/>
                {/* <textarea required className="postImage-input" id="postImage-url" placeholder="URL" onChange={(e)=> setUrl(e.target.value)} value={url} autoComplete='off'/> */}
                


                <div className="post-options">
                    <textarea disabled  className="postImage-input" id="postImage-url" style={error? {color: "red"} : {color: "green"}} placeholder={"URL"} onChange={(e)=> setUrl(e.target.value)} value={url} autoComplete='off'/>
                    <div className="clip-up">
                        <div className="clipboard pointer" onClick={(e)=>copyfromcb(e)}></div>
                        <label className="upload pointer">
                            <input style={{display: "none"}} ref={fileForm} type="file" onClick={()=>setUrl('')} onChange={(e)=>upload(e)} />
                        </label>
                    </div>
                </div>

                <div>
                    {(error && url.length > 0) && <div className="post-invalid">{error === "invalid link" && error !== false? "invalid link": "invalid file"}</div>}
                </div>

                
                
                {/* {(error && url.length > 0) && <div className="post-invalid">invalid url</div>} */}

            </div>
            <div className="postImage-botones">
                {/* <button className="postUI-button pointer" onClick={(e)=>copyfromcb(e)} >CLIPBOARD</button> */}
                <div className="loadingGif" style={loading? {display: "block"} : {display: "none"}}></div>
                <button className='postUI-button pointer' type="button" onClick={()=>setSeeOpt({type: 'none', post: null})} >CLOSE</button>
                <button typeof="submit" className="postUI-button pointer" >POST</button>
            </div>
        </form>
    )
}

export default PostVideo