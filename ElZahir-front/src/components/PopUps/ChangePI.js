import { useRef, useState }            from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"

import { changeProfileImageFromUrl, changeProfileImageFromFile } from "../../services/userServices"
import { doNothing, isImageInputValid }                          from "../../services/helpers"

import { Uploader, Error, PostUiFooter } from "./PostUiModule"

import style from '../../styles/popups.module.css'

const ChangePI = ({user, setPopUp})=> {

    let [mode,    setMode   ] = useState('idle')
    let [url,     setUrl    ] = useState('')
    let [file,    setFile   ] = useState(false)
    let [loading, setLoading] = useState(false)

    const client   = useQueryClient()
    const fileForm = useRef()

    let error = isImageInputValid(url, file, mode)

    const {mutate: postMutation} = useMutation({
        mutationFn: async()=> {
            if (mode === "url") return await changeProfileImageFromUrl(user, url)
            if (mode === "file") return await changeProfileImageFromFile(user, file)
        },
        onMutate: ()=>setLoading(true),
        onSuccess: (res)=>{
            client.setQueryData(["ME"], (old)=> {
                const copy = {...old}
                copy.data.profileImg = res.data.profileImg
                return copy
            })
            
            handleClose()
        } ,
        onError: ()=>{
            setLoading(false)
        }
    })

    const handleClose = ()=> {
        if (fileForm.current) {
            fileForm.current.value = null
        }

        setPopUp({type: 'none', post: null})
    }

    const submitPostHandler = (e)=> {
        e.preventDefault()
        postMutation()
    }

    const pasteUrlFromClipboard = async (e)=> {
        e.preventDefault()
        setUrl('')
        setMode('url')
        setFile('')
        const urlString = await navigator.clipboard.readText()
        setUrl(urlString)
    }
    const uploadFile = (e)=> {
        setMode('file')
        setUrl(e.target.files[0].name)
        setFile(e.target.files[0])
    }

    return (
        <form className={style.popup} onSubmit={error || mode === "idle"? doNothing: loading? doNothing : submitPostHandler} encType="multipart/form-data">
            <div className={ style['post-ui-header'] }>
                <span>Change profile image</span>
            </div>
            <div className={style.main}>
                <Uploader onPasteUrl={pasteUrlFromClipboard} onUploadFile={uploadFile} isInputValid={error} url={url}/>
                <Error error={error} />
            </div>
            <PostUiFooter onCancel={handleClose} isPostLoading={loading} isPostButtonDisabled={error}/>
        </form>
    )
}

export default ChangePI