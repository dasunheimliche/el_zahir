import axios from "axios"
import { useEffect, useState } from "react"
import baseURL from '../services/baseURL'
import Comment from '../components/Comment'


const Comments = ({post, user, setSeeOpt})=> {
    let [reload, setReload] = useState(false)
    let [comments, setComments] = useState('')
    let [value, setValue] = useState('')
    let [placeholder, setPlaceholder] = useState('')
    let [commentID, setCommentID] = useState('')


    useEffect(()=> {
        axios.get(baseURL.concat('/api/comment'))
        .then(comments => {
            // console.log(comments.data)
            let resultados = comments.data.filter(comment => (comment.postID === post.id && !comment.commentID))
            setComments(resultados)
        })
    }, [reload])

    const send = (e)=> {
        e.preventDefault()
        let person = `@${placeholder.split('@')[1]}`
        let toSend

        toSend = {
            username: user.username,
            comment: placeholder? `${person} ${value}` : value,
            postID: post.id,
            commentID: commentID
        }

        axios.post(baseURL.concat('/api/comment'), toSend)
        .then(res => {
            setPlaceholder('')
            setCommentID('')
            setReload(!reload)
            setValue('')
        })
    }

    const sets = ()=> {

        setCommentID('')
        setPlaceholder(``)
        setValue('')
    }

    const cargarComments = ()=> {
        
        return comments.map((comment, i) => {
            return <Comment key={i} post={post} setReload={setReload} setValue={setValue} comment={comment} user={user}  setPlaceholder={setPlaceholder} placeholder={placeholder} reload={reload} setCommentID={setCommentID}/>
        })
    }

    return (
        <div className="comments-container">
            <div className="comments-salir-container">
                <div className="comments-salir" onClick={()=>setSeeOpt({type:'none', post:null})}></div>
            </div>
            <div className="comments-header-container">
                <span className="comments-header">Comments  </span>
                <span className="comments-number">{comments.length}</span>
            </div>

            <form className="comments-input-container" onSubmit={send}>
                {placeholder || value !== '' ? <div className={placeholder || value !== '' ? "comment-cancel" : "comment-cancel comment-cancel-off" } onClick={sets}></div> : <div></div>}
                <form action="">
                    <input className={placeholder || value !== ''? "comments-input" : "comments-input comments-input-off" } value={value} type={'text'} placeholder={placeholder === ''? 'comenta algo...' : placeholder} onChange={(e)=>setValue(e.target.value)} />
                </form>
                <button className="comments-send">SEND</button>
            </form>
            <div className="comments-square">
                {comments !== '' ? cargarComments(): console.log()}
            </div>
        </div>
    )
}

export default Comments