import { useState }              from "react"
import Comment                   from '../Comment'
import { useMutation, useQuery } from "@tanstack/react-query"

import { getCurrentUser }             from "../../services/userServices"
import { fetchComments, sendComment } from "../../services/commentServices"

import { useQueryClient } from "@tanstack/react-query"

import style from '../../styles/comments.module.css'

const Comments = ({post, setPopUp})=> {
    let [value,       setValue      ] = useState('')
    let [placeholder, setPlaceholder] = useState('')
    let [commentID,   setCommentID  ] = useState('')
    let [loading,     setLoading    ] = useState(false)

    const client = useQueryClient()

    const {data: {data: user} = {}} = useQuery({ queryKey: ['ME'], queryFn: getCurrentUser})
    const {data: {data: comments} = {}} = useQuery({ queryKey: ["GET_COMMENTS", post.id], queryFn: ()=>fetchComments(post)})

    const {mutate: sendCommentMutation} = useMutation({
        mutationFn: ()=>sendComment(post, user, value, placeholder, commentID),
        onMutate: ()=>setLoading(true),
        onSuccess: (data)=> {

            if (commentID) {
                client.setQueryData(["GET_SUBCOMMENTS", commentID], (old)=>{
                    let copy = {...old}
                    copy.data = copy.data.concat(data.data)
                    return copy
                })
            } else {
                client.setQueryData(["GET_COMMENTS", post.id], (old)=>{
                    let copy = {...old}
                    copy.data = copy.data.concat(data.data)
                    return copy
                })
            }
            
            clearInput()
        }
    })

    const handleSubmitComment = (e)=> {
        e.preventDefault()
        sendCommentMutation()
    }

    function clearInput () {
        setPlaceholder('')
        setCommentID('')
        setValue('')
        setLoading(false)
    }

    const loadComments = ()=> {
        if (!comments) return
        
        return comments.map((comment, i) => {
            return <Comment 
                key={i} 
                post={post}  
                setValue={setValue} 
                comment={comment} 
                setPlaceholder={setPlaceholder} 
                placeholder={placeholder}  
                commentID={commentID}
                setCommentID={setCommentID}/>
        })
    }

    return (
        <div className={style.background}>
            <div className={style['comments-container']}>
                <div className={style.header}>
                    <div className={style.close} onClick={()=>setPopUp({type:'none', post:null})}></div>
                </div>
                <div className={style.counter}>
                    <span className={style.title}>Comments  </span>
                    <span className={style.count}>{comments?.length}</span>
                </div>
                <form className={style['input-container']} onSubmit={loading? undefined :  handleSubmitComment}>
                    <div className={style.testear} >
                        {(placeholder || value !== '') && <div className={placeholder || value !== '' ? style.cancel : `${style.cancel} ${style['cancel-off']}` } onClick={clearInput}></div> }

                        <input className={placeholder || value !== ''? style.input : `${style.input} ${style['input-off']}` } value={value} type={'text'} placeholder={placeholder === ''? 'comenta algo...' : placeholder} onChange={(e)=>setValue(e.target.value)} />
                    </div>
                    <button className={style.send}>SEND</button>
                </form>
                <div className={style.comments}>
                    {comments !== '' ? loadComments(): ""}
                </div>
            </div>
        </div>
    )
}

export default Comments