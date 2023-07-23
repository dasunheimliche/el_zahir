import { useRef, useState } from "react"

import { useQueryClient, useMutation } from "@tanstack/react-query"

import { doNothing, isVideoInputValid } from "../../services/helpers"
import { postVideoFromUrl, postVideoFromFile } from "../../services/postServices"

import videoButton from '../../icons/videoButton.png'

import style from '../../styles/popups.module.css'


const PostVideoUI = ({setPopUp})=> {
    let [mode,        setMode        ] = useState('idle')
    let [file,        setFile        ] = useState(false)
    let [url,         setUrl         ] = useState('')
    let [title,       setTitle       ] = useState('')
    let [subtitle,    setSubtitle    ] = useState('')
    let [aspectRatio, setAspectRatio ] = useState('')
    let [loading,     setLoading     ] = useState(false)

    const error = isVideoInputValid(url, file, mode)

    const client   = useQueryClient()
    const fileForm = useRef()

    const {mutate: postMutation} = useMutation({
        mutationFn: async()=> {
            if (mode === "url") return await postVideoFromUrl(url, title, subtitle, aspectRatio)
            if (mode === "file") return await postVideoFromFile(file, title, subtitle)
        },
        onMutate: ()=>setLoading(true),
        onSuccess: (res)=>{
            client.setQueryData(["userPosts"], (old)=> {
                const copy = {...old}
                copy.data = [res.data, ...copy.data]
                return copy
            })
            close()
        },
        onError: ()=>{
            setLoading(false)
        }
    })

    const submitPostHandler = (e)=> {
        e.preventDefault()
        postMutation()
    }

    const close = ()=> {
        if (fileForm.current.value) {
            fileForm.current.value = null
        }
        setUrl('')
        setTitle('')
        setSubtitle('')
        setFile('')
        setAspectRatio('')
        setLoading(false)
        setPopUp({type: 'none', post: null})
    }

    const upload = (e)=> {
        setMode('file')
        setUrl(e.target.files[0].name)
        setFile(e.target.files[0])
    }

    const pasteUrlFromClipboard = async (e)=> {
        e.preventDefault()
        setUrl('')
        setMode('url')
        setFile('')
        const urlString = await navigator.clipboard.readText()
        setUrl(urlString)
    }

    return (
        <form className={style.popup} onSubmit={error? doNothing: loading? doNothing : submitPostHandler}>
            <div className={style['post-ui-header']}>
                <img id={style['header-img']} className={style['header-img']} src={videoButton} alt="text-button"></img>
            </div>
            <div className={style.main}>
                <input className={`${style.input} ${style.title}`}    placeholder="Title"                              onChange={(e)=> setTitle(e.target.value)}        value={title}       autoComplete='off' required/>
                <input className={`${style.input} ${style.subtitle}`} placeholder="Description"                        onChange={(e)=> setSubtitle(e.target.value)}     value={subtitle}    autoComplete='off'/>
                <input className={`${style.input} ${style.subtitle}`} placeholder="Optional: Aspect ratio (Ej.: 16:9)" onChange={(e)=> setAspectRatio(e.target.value)}  value={aspectRatio} autoComplete='off' disabled={mode !== "url"? true : false} />
                
                <div className={style.uploader}>
                    <textarea className={`${style.input} ${style['file-textarea']}`} style={error? {color: "red"} : {color: "green"}} placeholder={"URL"} onChange={(e)=> setUrl(e.target.value)} value={url} autoComplete='off' disabled />
                    <div className={style.options}>
                        <div className={`${style.clipboard} p`} onClick={pasteUrlFromClipboard}></div>
                        <label className={`${style.upload} p`} >
                            <input style={{display: "none"}} ref={fileForm} type="file" onClick={()=>setUrl('')} onChange={upload} />
                        </label>
                    </div>
                </div>

                <div>
                    {(error && url.length > 0) && <div className={style.error}>{error}</div>}
                </div>
                
            </div>
            <div className={style.footer}>
                <div className={style.loading} style={loading? {display: "block"} : {display: "none"}}></div>
                <button className={`${style.button} p`} type="button" onClick={()=>setPopUp({type: 'none', post: null})} >CLOSE</button>
                <button typeof="submit" className={`${style.button} p`} >POST</button>
            </div>
        </form>
    )
}

export default PostVideoUI