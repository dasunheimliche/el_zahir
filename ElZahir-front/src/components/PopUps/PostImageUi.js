import { useRef, useState }            from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"

import { doNothing, isImageInputValid }        from "../../services/helpers"
import { postImageFromUrl, postImageFromFile } from "../../services/postServices"

import imageButton from '../../icons/imageButton.png'

import style from '../../styles/popups.module.css'


const PostImageUI = ({setPopUp})=> {
    let [mode,     setMode     ] = useState('idle')
    let [url,      setUrl      ] = useState('')
    let [file,     setFile     ] = useState(false)
    let [title,    setTitle    ] = useState('')
    let [subtitle, setSubtitle ] = useState('')
    let [loading,  setLoading  ] = useState(false)

    const client   = useQueryClient()
    let fileForm = useRef()

    let error = isImageInputValid(url, file, mode)

    const {mutate: postMutation} = useMutation({
        mutationFn: async()=> {
            if (mode === "url") return await postImageFromUrl(url, title, subtitle)
            if (mode === "file") return await postImageFromFile(file, title, subtitle)
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


    const pasteUrlFromClipboard = async (e)=> {
        e.preventDefault()
        setUrl('')
        setMode('url')
        setFile('')
        const urlString = await navigator.clipboard.readText()
        setUrl(urlString)
    }

    const uploadFile = (e)=> {
        setMode('file');
        setUrl(e.target.files[0].name);
        setFile(e.target.files[0]);
    }

    const close = ()=> {
        if (fileForm.current.value) {
            fileForm.current.value = null
        }
        setUrl('')
        setTitle('')
        setSubtitle('')
        setFile('')
        setLoading(false)
        setPopUp({type: 'none', post: null})
    }

    return (
        <form className={ style.popup } onSubmit={error? doNothing: loading? doNothing : submitPostHandler}>

            <div className={ style['post-ui-header'] }>
                <img id={ style['header-img'] } className={ style['header-img'] } src={imageButton} alt="text-button"></img>
            </div>

            <div className={ style.main }>
                <input required className={ `${style.input} ${style.title}` } placeholder="Title" onChange={(e)=> setTitle(e.target.value)} value={title} autoComplete='off'/>
                <input className={ `${style.input} ${style.subtitle}` } placeholder="Description" onChange={(e)=> setSubtitle(e.target.value)} value={subtitle} autoComplete='off'/>
                <div className={ style.uploader }>
                    <textarea disabled  className={ `${style.input} ${style['file-textarea']}` } style={error? {color: "red"} : {color: "green"}} placeholder={"URL"} onChange={(e)=> setUrl(e.target.value)} value={url} autoComplete='off'/>
                    <div className={ style.options }>
                        <div className={ `${style.clipboard} p` } onClick={pasteUrlFromClipboard}></div>
                        <label className={ `${style.upload} p` } >
                            <input style={{display: "none"}} ref={fileForm} type="file" onClick={()=>setUrl('')} onChange={uploadFile} />
                        </label>
                    </div>
                </div>
                <div>
                    {(error && url.length > 0) && <div className={ style.error }>{error}</div>}
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