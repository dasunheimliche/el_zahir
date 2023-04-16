import axios from "axios"
import { useEffect, useRef, useState } from "react"
import baseURL from '../services/baseURL'

import { useDispatch } from "react-redux"
import { userSlice } from "../reducers/userSlice"

// CSS
import style from '../styles/popups.module.css'

const updateLocalStorage = (url) => {
    const user = JSON.parse(window.localStorage.getItem('loggedUser'))
    const updatedUser = {...user, profileImg: url}
    window.localStorage.setItem('loggedUser', JSON.stringify(updatedUser))
    return updatedUser
}

const postWithUrl = async (user, url, token) => {
    let config = {
        headers: {
            Authorization: token
        }
    }

    return await axios.put(baseURL.concat(`/api/users/profile-image/${user.userId}`), {profileImg: url, mode:'profileImgURL'}, config)
}
  
const postWithFile = async (user, formData, token) => {
    let config = {
        headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data"
        }
    }
    
    return await axios.put(baseURL.concat(`/api/users/profile-image/${user.userId}`), formData, config)
}


const ChangePI = ({setPopUp})=> {

    let [mode, setMode] = useState('idle')
    let [url, setUrl] = useState('')
    let [error, setError] = useState(false)
    let [file, setFile] = useState(false)
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
        setError(false)
        setMode('file')
        setUrl(e.target.files[0].name)
        setFile(e.target.files[0])
    }

    const close = ()=> {
        if (fileForm.current.value) {
            fileForm.current.value = null
        }
        setUrl('')
        setFile('')
        setError(false)
        setPopUp({type: 'none', post: null})
    }

    const doNothing = (e)=> {
        e.preventDefault()
    }

    const postear = async (e) => {
        setLoading(true)
        e.preventDefault()
        const formData = new FormData()
        formData.append("image", file)
        formData.append("mode", "profileImgURL")
        
        let user = JSON.parse(window.localStorage.getItem('loggedUser'))
        let token = `Bearer ${user.token}`
      
        let updatedUser;
        let savedUser;

        try {
            if (mode === 'url') {
                savedUser = await postWithUrl(user, url, token);
            } else if (mode === 'file') {
                savedUser = await postWithFile(user, formData, token);
            }
            updatedUser = updateLocalStorage(savedUser.data.profileImg);
            dispatch(userSlice.actions.update({...updatedUser}));
      
            if (fileForm.current.value) {
                fileForm.current.value = null;
            }
      
            setLoading(false);
            setError(false);
            setUrl('');
            setFile('');
      
        } catch (error) {
            console.log(error);
            setError(true);
            setLoading(false);
        }
    };

    return (
        <form className={style.popup} onSubmit={error? doNothing: loading? doNothing : postear} encType="multipart/form-data">
            <div className={style.main}>
                <div className={ style['post-ui-header'] }>
                    <span>Change profile image</span>
                </div>
                <div className={style.uploader}>
                    <textarea className={`${style.input} ${style['file-textarea']}`} style={error? {color: "red"} : {color: "green"}} placeholder={"URL"} onChange={(e)=> setUrl(e.target.value)} value={url} autoComplete='off' disabled required  />
                    <div className={style.options}>
                        <div className={`${style.clipboard} p`} onClick={copyClipboard}></div>
                        <label className={`${style.upload} p`} >
                            <input style={{display: "none"}} ref={fileForm} type="file" onClick={()=>setUrl('')} onChange={upload} />
                        </label>
                    </div>
                </div>
                <div>
                    {(error && url.length > 0) && <div className={style.error}>{error === "invalid link" && error !== false? "invalid link": "invalid file"}</div>}
                </div>
            </div>
            <div className={style.footer}>
                <div className={style.loading} style={loading? {display: "block"} : {display: "none"}}></div>
                <button className={`${style.button} p`} type="button" onClick={close} >CLOSE</button>
                <button className={`${style.button} p`} >POST</button>
            </div>
        </form>
    )
}

export default ChangePI