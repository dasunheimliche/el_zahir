import axios from "axios"
import { useEffect, useState } from "react"
import baseURL from '../../services/baseURL'
import Comment from '../Comment'
import { useSelector} from 'react-redux'

import style from '../../styles/comments.module.css'

const Comments = ({post, setPopUp})=> {
    let [reload,      setReload     ] = useState(false)
    let [comments,    setComments   ] = useState('')
    let [value,       setValue      ] = useState('')
    let [placeholder, setPlaceholder] = useState('')
    let [commentID,   setCommentID  ] = useState('')
    let [loading,     setLoading    ] = useState(false)

    let user = useSelector(state => state.user.value)

    useEffect(() => {
        axios.get(baseURL.concat('/api/comment'), { params: { postId: post.id } })
            .then( ({ data: comments }) => {
                const resultados = comments.filter(comment => (comment.postID === post.id && !comment.commentID));
                setComments(resultados);
            })
            .catch(error => {
                console.error(error);
            });
    }, [reload]); //eslint-disable-line

    const handleSubmit = async (e)=> {
        e.preventDefault();
        setLoading(true)
        const person = `@${placeholder.split('@')[1]}`;
        const commentText = placeholder ? `${person} ${value}` : value;
        const comment = {
            username: user.username,
            comment: commentText,
            postID: post.id,
            commentID: commentID,
            userID: post.user
        };

        try {
            await axios.post(baseURL.concat('/api/comment'), comment);
            setPlaceholder('');
            setCommentID('');
            setReload((prev) => !prev);
            setValue('');
            setLoading(false)
        } catch (error) {
            console.error(error);
            setLoading(false)
        }
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
        <div className={style.background}>
            <div className={style['comments-container']}>
                <div className={style.header}>
                    <div className={style.close} onClick={()=>setPopUp({type:'none', post:null})}></div>
                </div>
                <div className={style.counter}>
                    <span className={style.title}>Comments  </span>
                    <span className={style.count}>{comments.length}</span>
                </div>
                <form className={style['input-container']} onSubmit={loading? undefined :  handleSubmit}>
                    <div className={style.testear} >
                        {(placeholder || value !== '') && <div className={placeholder || value !== '' ? style.cancel : `${style.cancel} ${style['cancel-off']}` } onClick={sets}></div> }

                        <input className={placeholder || value !== ''? style.input : `${style.input} ${style['input-off']}` } value={value} type={'text'} placeholder={placeholder === ''? 'comenta algo...' : placeholder} onChange={(e)=>setValue(e.target.value)} />
                    </div>
                    <button className={style.send}>SEND</button>
                </form>
                <div className={style.comments}>
                    {comments !== '' ? cargarComments(): ""}
                </div>
            </div>
        </div>
    )
}

export default Comments