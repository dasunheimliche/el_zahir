import { useRef, useState }            from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"

import { changeProfileImageFromUrl, changeProfileImageFromFile } from "../../services/userServices"
import { doNothing, isImageInputValid }                          from "../../services/helpers"

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
            
            close()
        } ,
        onError: ()=>{
            setLoading(false)
        }
    })

    const close = ()=> {
        if (fileForm.current.value) {
            fileForm.current.value = null
        }
        setUrl('')
        setFile('')
        setPopUp({type: 'none', post: null})
        setLoading(false)
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
            <div className={style.main}>
                <div className={ style['post-ui-header'] }>
                    <span>Change profile image</span>
                </div>
                <div className={style.uploader}>
                    <textarea className={`${style.input} ${style['file-textarea']}`} style={error? {color: "red"} : {color: "green"}} placeholder={"URL"} onChange={(e)=> setUrl(e.target.value)} value={url} autoComplete='off' disabled required  />
                    <div className={style.options}>
                        <div className={`${style.clipboard} p`} onClick={pasteUrlFromClipboard}></div>
                        <label className={`${style.upload} p`} >
                            <input style={{display: "none"}} ref={fileForm} type="file" onClick={()=>setUrl('')} onChange={uploadFile} />
                        </label>
                    </div>
                </div>
                <div>
                    {((error) && url.length > 0) && <div className={style.error}>{error}</div>}
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