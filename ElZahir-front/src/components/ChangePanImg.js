import axios from "axios"
import { useEffect, useRef, useState } from "react"
import baseURL from '../services/baseURL'

// const ChangePanImg = ({className, onClick, user, setUser})=> {
const ChangePanImg = ({className, onClick, setUser})=> {
    // --------------------------------
    // let [url, setUrl] = useState('')
    // --------------------------------
    let [mode, setMode] = useState('idle')
    let [url, setUrl] = useState('')
    let [error, setError] = useState(false)
    let [file, setFile] = useState(false)

    let fileForm = useRef()

    console.log("FILE FOOOORM",fileForm)

    useEffect(()=> {
        if ((url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.bmp') || url.endsWith('.gif') || url.endsWith('.webp') || url.endsWith('.tiff')) && url.length > 0) {
            setError(false)
        } else {
            setError("invalid link")
        }
    }, [url])

    useEffect(()=> {
        if (file.type !== "image/png" && file !== false) {
            setError("invalid file")
        } else {
            setError(false)
        }
        
    }, [file])


    const copyfromcb = (e)=> {
        e.preventDefault()
        setMode('url')
        setFile('')
        navigator.clipboard.readText()
        .then(text => {
            setUrl(text)
        })
    }
    const upload = (e)=> {
        setMode('file')
        setUrl(e.target.files[0].name)
        setFile(e.target.files[0])
    }


    const postear = ()=> {
       
        const formData = new FormData()
        formData.append("image", file)
        formData.append("mode", "panelImgUrl")
        
        let user = JSON.parse(window.localStorage.getItem('loggedUser'))
        let token = `Bearer ${user.token}`


        if (mode === 'url') {
            console.log("URL MODE")
            let config = {
                headers: {
                    Authorization: token
                }
            }
            axios.put(baseURL.concat(`/api/users/${user.userId}`), {mainPanelImg: url, mode:'panelImgUrl'}, config)
            .then((respuesta)=> {
                setUrl('')
                if (fileForm.current.value) {
                    fileForm.current.value = null
                }
                window.localStorage.setItem('loggedUser', JSON.stringify({...user, mainPanelImg: respuesta.data.mainPanelImg}))
                setUser({...user, mainPanelImg: respuesta.data.mainPanelImg})
            })

            // axios.post(baseURL.concat("/api/post") , {title: title, subtitle:sub, imagePost:url, type: 'image'}, config)
            //     .then(() => {
            //         setUrl('')
            //         if (fileForm.current.value) {
            //             fileForm.current.value = null
            //         }
            //         let updateUser = JSON.parse(window.localStorage.getItem('loggedUser'))
            //         window.localStorage.setItem('loggedUser', JSON.stringify({...updateUser, posts: updateUser.posts + 1}))
            //         setUser({...user, posts: updateUser.posts + 1})
            //     })
        } else if (mode === 'file') {
            console.log("FILE MODE")
            let config = {
                headers: {
                    Authorization: token,
                    "Content-Type": "multipart/form-data"
                }
            }
            axios.put(baseURL.concat(`/api/users/${user.userId}`), formData, config)
            .then((respuesta)=> {
                setUrl('')
                setFile('')
                if (fileForm.current.value) {
                    fileForm.current.value = null
                }
                window.localStorage.setItem('loggedUser', JSON.stringify({...user, mainPanelImg: respuesta.data.mainPanelImg}))
                setUser({...user, mainPanelImg: respuesta.data.mainPanelImg})

            })

            // axios.post(baseURL.concat("/api/post") , formData, config)
            //     .then(() => {
            //         console.log("ALGOOOOOOOOOOO", e.target[3])
            //         if (fileForm.current.value) {
            //             fileForm.current.value = null
            //         }
            //         // e.target[3].value = null
            //         setUrl('')
            //         setTitle('')
            //         setSub('')
            //         setFile('')
            //         let updateUser = JSON.parse(window.localStorage.getItem('loggedUser'))
            //         window.localStorage.setItem('loggedUser', JSON.stringify({...updateUser, posts: updateUser.posts + 1}))
            //         setUser({...user, posts: updateUser.posts + 1})

            //     })
        }

    }

    

    const close = ()=> {
        if (fileForm.current.value) {
            fileForm.current.value = null
        }
        setUrl('')
        setFile('')
        setError(false)
        onClick({type: 'none', post: null})
    }


    // --------------------------------
    // const postear = ()=> {
    //     axios.put(baseURL.concat(`/api/users/${user.userId}`), {mainPanelImg: url, mode:'panelImgUrl'})
    //         .then(respuesta => {
    //             window.localStorage.setItem('loggedUser', JSON.stringify({...user, mainPanelImg: respuesta.data.mainPanelImg}))
    //             setUser({...user, mainPanelImg: respuesta.data.mainPanelImg})

    //         })
    // }
    // ---------------------------------

    return (
        <form className={className} onSubmit={error? console.log(): e=>postear(e)}>
            <div className="postImage-inputs">
                {/* <input required className="postImage-input" id="postImage-title" placeholder="Title" onChange={(e)=> setTitle(e.target.value)} value={title} autoComplete='off'/>
                <input required className="postImage-input" id="postImage-sub" placeholder="Description" onChange={(e)=> setSub(e.target.value)} value={sub} autoComplete='off'/> */}
                <div className="post-options">
                    <textarea disabled  className="postImage-input" id="postImage-url" style={error? {color: "red"} : {color: "green"}} placeholder={"URL"} onChange={(e)=> setUrl(e.target.value)} value={url} autoComplete='off'/>
                    <div className="clip-up">
                        <div className="clipboard pointer" onClick={(e)=>copyfromcb(e)}></div>
                        <label className="upload pointer">
                            <input style={{display: "none"}} ref={fileForm} type="file" onClick={()=>setUrl('')} onChange={(e)=>upload(e)} />
                        </label>
                    </div>
                </div>
                {(error && url.length > 0) && <div className="post-invalid">{error === "invalid link" && error !== false? "invalid link": "invalid file"}</div>}
            </div>
            <div className="postImage-botones">
                <button className='postImage-button pointer' type="button" onClick={close} >CLOSE</button>
                <button className="postImage-button pointer" >POST</button>
            </div>
        </form>

        // -------------------------------------------
        // <div className={className}>
        //     <div className="postImage-inputs">
        //         <textarea className="postImage-input" id="postImage-url" placeholder="URL" onChange={(e)=> setUrl(e.target.value)} value={url} autoComplete='off'/>
        //     </div>
        //     <div className="postImage-botones">
        //         <button className='postImage-button pointer' type="button" onClick={()=>onClick({type: 'none', post: null})} >CLOSE</button>
        //         <button className="postImage-button pointer" onClick={postear} >POST</button>
        //     </div>
        // </div>
        // -------------------------------------------
    )
}

export default ChangePanImg