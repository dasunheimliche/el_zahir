import { useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"

import { getCurrentUser }   from "../services/userServices"
import { fetchSubComments, deleteComment } from "../services/commentServices"

import { useQueryClient } from "@tanstack/react-query"

import style   from '../styles/comments.module.css'

const Comment = ({post, comment, setPlaceholder, setCommentID, commentID,  setValue})=> {

    let [loading, setLoading] = useState(false)

    const {data: {data: user} = {}} = useQuery({ queryKey: ['ME'], queryFn: getCurrentUser})
    const {data: {data: subComments} = {}} = useQuery({queryKey: ["GET_SUBCOMMENTS", comment.id], queryFn: ()=>fetchSubComments(comment)})

    const client = useQueryClient()

    const { mutate: handleDeleteComment } = useMutation({
        mutationFn: deleteComment,
        onMutate: ()=> setLoading(true),
        onSuccess: (_, variables)=>{
            
            if (variables.comment.commentID) {
                client.setQueryData(["GET_SUBCOMMENTS", comment.id], (old)=> {
                    const copy = {...old}
                    copy.data = copy.data.filter(c=>c.id !== variables.comment.id)
                    return copy
                })
            } else {
                client.setQueryData(["GET_COMMENTS", post.id], (old)=> {
                    const copy = {...old}
                    copy.data = copy.data.filter(c=>c.id !== variables.comment.id)
                    return copy
                })
            }

            setLoading(false)
        }
    })

    const sets = (commentID, user)=> {

        setCommentID(commentID)
        setPlaceholder(`responder a @${user}`)
        setValue('')
    }


    const cargarComments = ()=> {
        if (!subComments) return
        return subComments.map((comment0, i) => {
            return (
                <div key={i} className={style['sub-comment']}>
                    <div className={style['sub-username']}>@{comment0.username}</div>
                    <div className={style['sub-content']}>{comment0.comment}</div>
                    <div className={style['comment-socials']}>
                        <div className="p" onClick={()=> sets(comment.id, comment0.username)}>Answer</div>
                        {comment0.username === user.username || post.username === user.username? <div className="p" onClick={loading? undefined : ()=>handleDeleteComment({post, comment: comment0})}>Delete</div> : console.log}
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
                {comment.username === user.username || post.username === user.username? <div className="p" onClick={loading? undefined : ()=>handleDeleteComment({post, comment})}>Delete</div> : console.log}
            </div>
            {subComments !== ''? cargarComments() : console.log()}
        </div>
    )
}

export default Comment