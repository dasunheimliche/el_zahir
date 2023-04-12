import axios from "axios"
import { useEffect, useRef, useState } from "react"
import baseURL from '../services/baseURL'

import { userSlice} from '../reducers/userSlice'
import { useDispatch} from 'react-redux'

import imageButton from '../icons/imageButton.png'

// CSS
import style from '../styles/popups.module.css'

const updateLocalStorage = (postId) => {
    const user = JSON.parse(window.localStorage.getItem('loggedUser'))
    const updatedUser = {...user, posts: user.posts.concat(postId)}
    window.localStorage.setItem('loggedUser', JSON.stringify(updatedUser))
    return updatedUser
  }

const postWithUrl = async (title, subtitle, url, token) => {
    let config = {
        headers: {
            Authorization: token
        }
    }

    return await axios.post(baseURL.concat("/api/post/image-url"), {title, subtitle, imagePost:url, type: 'image'}, config)
}
  
const postWithFile = async (formData, token) => {
    let config = {
        headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data"
        }
    }
    
    return await axios.post(baseURL.concat("/api/post/image-file"), formData, config)
}

const PostImageUI = ({setPopUp})=> {
    let [mode, setMode] = useState('idle')
    let [file, setFile] = useState(false)
    
    let [url, setUrl] = useState('')
    let [title, setTitle] = useState('')
    let [subtitle, setSubtitle] = useState('')
    let [error, setError] = useState(false)
    
    let [loading, setLoading] = useState(false)
    let dispatch = useDispatch()

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
            const isImage = file.type.startsWith('image/');
            setError(!isImage && file !== false ? "invalid file" : false);
        }
    }, [file])


    const copyClipboard = (e)=> {
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
        setError(false);
        setMode('file');
        setUrl(e.target.files[0].name);
        setFile(e.target.files[0]);
    }

    const doNothing = (e)=> {
        e.preventDefault()
    }

    const postear = async (e) => {
        e.preventDefault();
        setLoading(true);
      
        const formData = new FormData();
        formData.append("image", file);
        formData.append("title", title);
        formData.append("subtitle", subtitle);
        formData.append("type", 'image');
        
        const user = JSON.parse(window.localStorage.getItem('loggedUser'));
        const token = `Bearer ${user.token}`;
      
        let updatedUser;
        let savedPost;
      
        try {
            if (mode === 'url') {
                savedPost = await postWithUrl(title, subtitle, url, token);
            } else if (mode === 'file') {
                savedPost = await postWithFile(formData, token);
            }
      
            updatedUser = updateLocalStorage(savedPost.data.id);
            dispatch(userSlice.actions.update({...updatedUser}));
      
            if (fileForm.current.value) {
                fileForm.current.value = null;
            }
      
            setLoading(false);
            setError(false);
            setUrl('');
            setTitle('');
            setSubtitle('');
            setFile('');
      
        } catch (error) {
            console.log(error);
            setError(true);
            setLoading(false);
        }
    };

    const close = ()=> {
        if (fileForm.current.value) {
            fileForm.current.value = null
        }
        setUrl('')
        setTitle('')
        setSubtitle('')
        setFile('')
        setError(false)
        setPopUp({type: 'none', post: null})
    }

    return (
        <form className={ style.popup } onSubmit={error? doNothing: loading? doNothing : postear}>

            <div className={ style['post-ui-header'] }>
                <img id={ style['header-img'] } className={ style['header-img'] } src={imageButton} alt="text-button"></img>
            </div>

            <div className={ style.main }>
                <input required className={ `${style.input} ${style.title}` } placeholder="Title" onChange={(e)=> setTitle(e.target.value)} value={title} autoComplete='off'/>
                <input className={ `${style.input} ${style.subtitle}` } placeholder="Description" onChange={(e)=> setSubtitle(e.target.value)} value={subtitle} autoComplete='off'/>
                <div className={ style.uploader }>
                    <textarea disabled  className={ `${style.input} ${style['file-textarea']}` } style={error? {color: "red"} : {color: "green"}} placeholder={"URL"} onChange={(e)=> setUrl(e.target.value)} value={url} autoComplete='off'/>
                    <div className={ style.options }>
                        <div className={ `${style.clipboard} p` } onClick={copyClipboard}></div>
                        <label className={ `${style.upload} p` } >
                            <input style={{display: "none"}} ref={fileForm} type="file" onClick={()=>setUrl('')} onChange={upload} />
                        </label>
                    </div>
                </div>
                <div>
                    {(error && url.length > 0) && <div className={ style.error }>{error === "invalid link" && error !== false? "invalid link": "invalid file"}</div>}
                </div>
            </div>

            <div className={ style.footer }>
                <div className={ style.loading } style={loading? {display: "block"} : {display: "none"}}></div>
                <button className={ `${style.button} p` } type="button" onClick={close} >CLOSE</button>
                <button className={ `${style.button} p` } >POST</button>
            </div>

        </form>
    )
}

export default PostImageUI