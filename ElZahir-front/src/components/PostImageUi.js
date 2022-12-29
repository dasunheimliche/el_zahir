import axios from "axios"
import { useEffect, useRef, useState } from "react"
import baseURL from '../services/baseURL'

const PostImage = ({setSeeOpt, setUser})=> {
    let [mode, setMode] = useState('idle')
    let [url, setUrl] = useState('')
    let [title, setTitle] = useState('')
    let [sub, setSub] = useState('')
    let [error, setError] = useState(false)
    let [file, setFile] = useState(false)
    let [loading, setLoading] = useState(false)

    let fileForm = useRef()

    useEffect(()=> {
        if ((url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.bmp') || url.endsWith('.gif') || url.endsWith('.webp') || url.endsWith('.tiff')) && url.length > 0) {
            setError(false)
        } else {
            setError("invalid link")
        }
    }, [url])

    useEffect(()=> {
        if (file.type) {
            if (!file.type.startsWith('image/') && file !== false) {
                setError("invalid file")
            } else {
                setError(false)
            }
        }
    }, [file])


    const copyfromcb = (e)=> {
        e.preventDefault()
        setError(false)
        setUrl('')
        setMode('url')
        setFile('')
        navigator.clipboard.readText()
        .then(text => {
            setUrl(text)
        })
    }
    const upload = (e)=> {
        setError(false)
        setMode('file')
        setUrl(e.target.files[0].name)
        setFile(e.target.files[0])
    }

    const not = (e)=> {
        e.preventDefault()
    }


    const postear = (e)=> {
        setLoading(true)
        e.preventDefault()
        const formData = new FormData()
        formData.append("image", file)
        formData.append("title", title)
        formData.append("subtitle", sub)
        formData.append("type", 'image')
        
        let user = JSON.parse(window.localStorage.getItem('loggedUser'))
        let token = `Bearer ${user.token}`

        if (mode === 'url') {
            let config = {
                headers: {
                    Authorization: token
                }
            }
            axios.post(baseURL.concat("/api/post") , {title: title, subtitle:sub, imagePost:url, type: 'image'}, config)
                .then(savedPost => {
                    console.log("SAVEDPOST URL", savedPost)
                    setLoading(false)
                    setUrl('')
                    setTitle('')
                    setSub('')
                    if (fileForm.current.value) {
                        fileForm.current.value = null
                    }
                    let updateUser = JSON.parse(window.localStorage.getItem('loggedUser'))
                    updateUser = {...updateUser, posts: updateUser.posts.concat(savedPost.data.id)}
                    window.localStorage.setItem('loggedUser', JSON.stringify({...updateUser}))
                    setUser({...updateUser})
                    setError(false)
                })
        } else if (mode === 'file') {
            let config = {
                headers: {
                    Authorization: token,
                    "Content-Type": "multipart/form-data"
                }
            }
            axios.post(baseURL.concat("/api/post") , formData, config)
                .then(savedPost => {
                    console.log("SAVEPOST FILEE", savedPost)
                    setLoading(false)
                    if (fileForm.current.value) {
                        fileForm.current.value = null
                    }
                    setUrl('')
                    setTitle('')
                    setSub('')
                    setFile('')
                    let updateUser = JSON.parse(window.localStorage.getItem('loggedUser'))
                    updateUser = {...updateUser, posts: updateUser.posts.concat(savedPost.data.id)}
                    window.localStorage.setItem('loggedUser', JSON.stringify({...updateUser}))
                    setUser({...updateUser})
                    setError(false)
                })
        }

    }

    

    const close = ()=> {
        if (fileForm.current.value) {
            fileForm.current.value = null
        }
        setUrl('')
        setTitle('')
        setSub('')
        setFile('')
        setError(false)
        setSeeOpt({type: 'none', post: null})
    }

    return (
        <form className={'post-image'} onSubmit={error? e=>not(e): loading? e=>not(e) : e=>postear(e)}>
            <div className="postImage-inputs">
                <input required className="postImage-input" id="postImage-title" placeholder="Title" onChange={(e)=> setTitle(e.target.value)} value={title} autoComplete='off'/>
                <input className="postImage-input" id="postImage-sub" placeholder="Description" onChange={(e)=> setSub(e.target.value)} value={sub} autoComplete='off'/>
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
            </div>
            <div className="postImage-botones">
                <div className="loadingGif" style={loading? {display: "block"} : {display: "none"}}></div>
                <button className='postImage-button pointer' type="button" onClick={close} >CLOSE</button>
                <button className="postImage-button pointer" >POST</button>
            </div>
        </form>
    )
}

export default PostImage