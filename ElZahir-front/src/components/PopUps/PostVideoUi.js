import { useRef, useState } from "react"

import { useQueryClient, useMutation } from "@tanstack/react-query"

import { isVideoInputValid } from "../../services/helpers"
import { postVideoFromUrl, postVideoFromFile } from "../../services/postServices"

import videoButton from '../../icons/videoButton.png'

import { PostUIHeader, MainInput, SubInput, Uploader, Error, PostUiFooter } from "./PostUiModule"

import style from '../../styles/popups.module.css'

const PostVideoUI = ({setPopUp})=> {
    const [mode,        setMode        ] = useState('idle')
    const [file,        setFile        ] = useState(false)
    const [url,         setUrl         ] = useState('')
    const [title,       setTitle       ] = useState('')
    const [subtitle,    setSubtitle    ] = useState('')
    const [aspectRatio, setAspectRatio ] = useState('')
    const [isMutating,  setIsMutating     ] = useState(false)

    const error = isVideoInputValid(url, file, mode)

    const client   = useQueryClient()
    const fileForm = useRef()

    const {mutate: postMutation} = useMutation({
        mutationFn: async()=> {
            if (mode === "url") return await postVideoFromUrl(url, title, subtitle, aspectRatio)
            if (mode === "file") return await postVideoFromFile(file, title, subtitle)
        },
        onMutate: ()=>setIsMutating(true),
        onSuccess: (res)=>{
            client.setQueryData(["userPosts"], (old)=> {
                const copy = {...old}
                copy.data = [res.data, ...copy.data]
                return copy
            })
            handleClose()
        },
        onError: ()=>{
            setIsMutating(false)
        }
    })

    const submitPostHandler = (e)=> {
        e.preventDefault()
        postMutation()
    }

    const handleClose = ()=> {
        if (fileForm.current) {
            fileForm.current.value = null
        }
        setPopUp({type: 'none', post: null})
    }

    const uploadFile = (e)=> {
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
        <form className={style.popup} onSubmit={submitPostHandler}>
            <PostUIHeader imageSource={videoButton} />

            <div className={style.main}>
                <MainInput value={title}       onChange={e=>setTitle(e.target.value)}       placeholder={"Title"}/>
                <SubInput  value={subtitle}    onChange={e=>setSubtitle(e.target.value)}    placeholder={"Description"}/>
                <SubInput  value={aspectRatio} onChange={e=>setAspectRatio(e.target.value)} placeholder={"Optional: Aspect ratio (Ej.: 16:9)"}/>
                
                <Uploader onPasteUrl={pasteUrlFromClipboard} onUploadFile={uploadFile} isInputValid={error} url={url}/>

                <Error error={error} />
            </div>

            <PostUiFooter onCancel={handleClose} isMutating={isMutating} isPostButtonDisabled={error}/>
        </form>
    )
}

export default PostVideoUI