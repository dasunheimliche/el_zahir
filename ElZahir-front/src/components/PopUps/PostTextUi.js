import axios from "axios"
import { useState } from "react"
import baseURL from '../../services/baseURL'

import { userSlice} from '../../reducers/userSlice'
import { useDispatch} from 'react-redux'

import textButton from '../../icons/textButton.png'

// CSS
import style from '../../styles/popups.module.css'

const postText = async (title, text, token) => {
    try {
      const config = {
        headers: {
          Authorization: token
        }
      }
      const response = await axios.post(baseURL.concat("/api/post"), {title, textPost: text, type: 'text'}, config)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
  
  const updateLocalStorage = (postId) => {
    const user = JSON.parse(window.localStorage.getItem('loggedUser'))
    const updatedUser = {...user, posts: user.posts.concat(postId)}
    window.localStorage.setItem('loggedUser', JSON.stringify(updatedUser))
    return updatedUser
  }

const PostTextUI = ({setPopUp})=> {
    let [title, setTitle] = useState('')
    let [text, setText] = useState('')

    let [loading, setLoading] = useState(false)

    let dispatch = useDispatch()

    const postear = async (e, title, text, dispatch) => {
        e.preventDefault()
        setLoading(true)
        try {
            const user = JSON.parse(window.localStorage.getItem('loggedUser'))
            const token = `Bearer ${user.token}`
            const savedPost = await postText(title, text, token)
            setText('')
            setTitle('')
            setLoading(false)
            const updatedUser = updateLocalStorage(savedPost.id)
            dispatch(userSlice.actions.update(updatedUser))
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    const doNothing = (e)=> {
        e.preventDefault()
    }

    return (
        <form className={style.popup} onSubmit={loading? doNothing : e=>postear(e, title, text, dispatch)}>
            <div className={style['post-ui-header']}>
                <img className={style['header-img']} src={textButton} alt="text-button"></img>
            </div>
            <div className={style.main}>
                <input  className={`${style.input} ${style.title}`} placeholder="Title" onChange={(e)=> setTitle(e.target.value)} value={title} autoComplete='off' required/>
                <textarea  className={`${style.input} ${style['url-textarea']}`} placeholder="Text" onChange={(e)=> setText(e.target.value)} value={text} autoComplete='off' required/>
            </div>
            <div className={style.footer}>
                <div className={style.loading} style={loading? {display: "block"} : {display: "none"}}></div>
                <button className={`${style.button} p`} type="button" onClick={()=>setPopUp({type: 'none', post: null})} >CLOSE</button>
                <button className={`${style.button} p`} type="submit" >POST</button>
            </div>
        </form>
    )
}

export default PostTextUI