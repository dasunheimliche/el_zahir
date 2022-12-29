import axios from "axios"
import { useEffect, useState } from "react"
import baseURL from '../services/baseURL'


const Comment = ({post, comment, setReload, setPlaceholder, setCommentID, reload, setValue, user})=> {

    let [subComments, setSubComments] = useState('')

    // console.log("COMMMENT", comment)

    const sets = (commentID, user)=> {
        // console.log(commentID)
        setCommentID(commentID)
        // console.log(user)
        setPlaceholder(`responder a @${user}`)
        setValue('')
    }

    useEffect(()=> {
        axios.get(baseURL.concat('/api/comment'))
        .then(comments => {
            let resultados = comments.data.filter(comment0 => comment0.commentID === comment.id)
            setSubComments(resultados)
        })
    }, [reload])

    const borrar = (id)=> {
        axios.delete(baseURL.concat(`/api/comment/${id}`))
        .then(res=> setReload(!reload))

    }

    const cargarComments = ()=> {
        return subComments.map((comment0, i) => {
            return (
                <div key={i} className="sub-comment-contaner">
                    <div className="sub-comment-username">@{comment0.username}</div>
                    <div className="sub-comment-content">{comment0.comment}</div>
                    <div className="comment-socials">
                        <div className="comment-socials-answ pointer" onClick={()=> sets(comment.id, comment0.username)}>Responder</div>
                        {/* <div className="comment-socials-like pointer">Like</div> */}
                        {comment0.username === user.username || post.username === user.username? <div className="comment-socials-del pointer" onClick={()=>borrar(comment0.id)}>Delete</div> : console.log}
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="comment-container">
            <div className="comment-username">@{comment.username}</div>
            <div className="comment-content">{comment.comment}</div>
            <div className="comment-socials">
                <div className="comment-socials-answ pointer" onClick={()=> sets(comment.id, comment.username)}>Responder</div>
                {/* <div className="comment-socials-like pointer">Like</div> */}
                {comment.username === user.username || post.username === user.username? <div className="comment-socials-del pointer" onClick={()=>borrar(comment.id)}>Delete</div> : console.log}
            </div>
            {subComments !== ''? cargarComments() : console.log()}
        </div>
    )
}

export default Comment