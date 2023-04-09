import axios from "axios"
import { useEffect, useState } from "react"
import baseURL from '../services/baseURL'

import { useSelector} from 'react-redux'

import style from '../styles/comments.module.css'

const Comment = ({post, comment, setReload, setPlaceholder, setCommentID, reload, setValue})=> {

    let [subComments, setSubComments] = useState('')
    let user = useSelector(state => state.user.value)

    useEffect(()=> {
        axios.get(baseURL.concat('/api/comment'))
        .then(comments => {
            let resultados = comments.data.filter(comment0 => comment0.commentID === comment.id)
            setSubComments(resultados)
        })
    }, [reload])


    const sets = (commentID, user)=> {

        setCommentID(commentID)
        setPlaceholder(`responder a @${user}`)
        setValue('')
    }

    const borrar = (id)=> {
        axios.delete(baseURL.concat(`/api/comment/${id}`))
        .then(res=> setReload(!reload))

    }

    const cargarComments = ()=> {
        return subComments.map((comment0, i) => {
            return (
                <div key={i} className={style['sub-comment']}>
                    <div className={style['sub-username']}>@{comment0.username}</div>
                    <div className={style['sub-content']}>{comment0.comment}</div>
                    <div className={style['comment-socials']}>
                        <div className="p" onClick={()=> sets(comment.id, comment0.username)}>Answer</div>
                        {comment0.username === user.username || post.username === user.username? <div className="p" onClick={()=>borrar(comment0.id)}>Delete</div> : console.log}
                    </div>
                </div>
            )
        })
    }

    return (
        <div className={style['comment-container']}>
            <div className={style['comment-username']}>@{comment.username}</div>
            <div className={style['comment-content']}>{comment.comment}</div>
            <div className={style['comment-socials']}>
                <div className="p" onClick={()=> sets(comment.id, comment.username)}>Answer</div>
                {comment.username === user.username || post.username === user.username? <div className="p" onClick={()=>borrar(comment.id)}>Delete</div> : console.log}
            </div>
            {subComments !== ''? cargarComments() : console.log()}
        </div>
    )
}

export default Comment